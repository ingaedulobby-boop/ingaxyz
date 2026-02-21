
# Substack RSS Integration for Blog Section

## Overview
Replace the hardcoded blog posts with live data fetched from your Substack RSS feed (`https://ingakali.substack.com/feed`). Posts will be fetched via a backend function to avoid CORS issues and parsed into JSON for display. The existing BlogSection UI will be enhanced with loading/error states and a "Subscribe on Substack" CTA.

## Architecture

The approach uses a backend function to fetch and parse the RSS feed server-side, avoiding CORS restrictions and keeping the API clean.

```text
User visits site
      |
      v
BlogSection mounts
      |
      v
React Query calls backend function: /fetch-substack-feed
      |
      v
Backend function fetches https://ingakali.substack.com/feed
      |
      v
Parses XML RSS to JSON (title, date, excerpt, link, categories)
      |
      v
Returns JSON array of posts to frontend
      |
      v
BlogSection renders live posts with loading skeleton fallback
```

## Changes

### 1. Create backend function: `supabase/functions/fetch-substack-feed/index.ts`
- Fetches `https://ingakali.substack.com/feed`
- Parses the RSS XML manually (Deno has no native XML parser, so we use regex extraction on the well-structured RSS)
- Extracts: title, link, pubDate, description (trimmed to excerpt), categories
- Returns JSON array of the latest 5 posts
- Adds CORS headers
- Caches with a 1-hour `Cache-Control` header

### 2. Update `src/components/sections/BlogSection.tsx`
- Replace hardcoded `posts` array with a `useQuery` call to the backend function
- Add loading state using Skeleton components for 3 placeholder rows
- Add error fallback that shows the existing hardcoded posts if the fetch fails
- Each post links out to the Substack article (`target="_blank"`)
- Add estimated read time calculation from the description content length
- Add a "Subscribe on Substack" button at the bottom, styled consistently with the site theme

### 3. No database changes required
This is a read-only RSS integration with no persistent storage needed.

## Technical Details

**Backend function response shape:**
```text
{
  "posts": [
    {
      "title": "Post Title",
      "link": "https://ingakali.substack.com/p/...",
      "pubDate": "2026-02-15T00:00:00Z",
      "excerpt": "First ~200 chars of content...",
      "categories": ["UX", "AI"]
    }
  ]
}
```

**Frontend query key:** `["substack-posts"]` with `staleTime: 30 minutes` and `gcTime: 1 hour` to minimize refetching.

**Fallback behavior:** If the fetch fails or returns empty, the current hardcoded posts are shown so the section is never blank.

**Mobile considerations:** The existing responsive layout is preserved. The "Subscribe" CTA uses full-width on mobile (`w-full sm:w-auto`).
