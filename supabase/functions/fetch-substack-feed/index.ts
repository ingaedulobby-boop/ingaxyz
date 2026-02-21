import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function extractItems(xml: string) {
  const items: Array<{
    title: string;
    link: string;
    pubDate: string;
    excerpt: string;
    categories: string[];
    thumbnail: string | null;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
    const itemXml = match[1];

    const title = itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1]
      || itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]
      || '';

    const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '';

    const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '';

    const descriptionRaw = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
      || itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1]
      || '';

    const plainText = stripHtml(descriptionRaw);
    const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '…' : plainText;

    const categories: string[] = [];
    const catRegex = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>|<category>([\s\S]*?)<\/category>/g;
    let catMatch;
    while ((catMatch = catRegex.exec(itemXml)) !== null) {
      categories.push(catMatch[1] || catMatch[2]);
    }

    // Extract thumbnail from enclosure, media:content, or first img in description
    const thumbnail = itemXml.match(/<enclosure[^>]+url="([^"]+)"[^>]*type="image/)?.[1]
      || itemXml.match(/<media:content[^>]+url="([^"]+)"/)?.[1]
      || itemXml.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1]
      || descriptionRaw.match(/<img[^>]+src="([^"]+)"/)?.[1]
      || null;

    items.push({ title: title.trim(), link: link.trim(), pubDate: pubDate.trim(), excerpt, categories, thumbnail });
  }

  return items;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const feedRes = await fetch('https://ingakali.substack.com/feed', {
      headers: { 'User-Agent': 'Lovable/1.0 RSS Reader' },
    });

    if (!feedRes.ok) {
      throw new Error(`RSS fetch failed: ${feedRes.status}`);
    }

    const xml = await feedRes.text();
    const posts = extractItems(xml);

    return new Response(JSON.stringify({ posts }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    return new Response(JSON.stringify({ posts: [], error: 'Failed to fetch feed' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
