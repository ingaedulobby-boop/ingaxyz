

# Plan: SmartParserHero Keyboard Accessibility + Chat Endpoint Security

## Part 1: SmartParserHero File List Keyboard-Focusable Metadata

Add metadata details to each file item that expand on hover AND keyboard focus, matching the AccessibilityHero pattern.

### Changes to `src/components/project-hero/SmartParserHero.tsx`

**1. Update the `files` data array** to include metadata fields:
```
{ name: "Invoice #4821", type: "PDF", pages: 3, size: "1.2 MB", extracted: "12 fields" }
{ name: "Contract_v2.pdf", type: "PDF", pages: 18, size: "4.7 MB", extracted: "34 fields" }
{ name: "Report_Q4.docx", type: "DOCX", pages: 9, size: "2.1 MB", extracted: "21 fields" }
```

**2. Update each file list `motion.div`** to add:
- `tabIndex={0}`, `role="button"`, and `focus:ring-1 focus:ring-cyan-400/40 focus:outline-none`
- Add `focus-within` variants alongside existing hover styles for border/background changes
- Add an expandable metadata row using the same `max-h-0 -> max-h-12` pattern with `group-hover` AND `group-focus-within` triggers
- Metadata shows: pages, file size, extracted fields count in a compact mono layout

---

## Part 2: Chat Endpoint Security Hardening

The current chat edge function has no rate limiting or input validation. Anyone can inspect the anon key from client-side code and call the endpoint directly at scale. The fix adds server-side rate limiting and input sanitization.

### Changes to `supabase/functions/chat/index.ts`

**1. Add IP-based in-memory rate limiting:**
- Track requests per IP using a Map with timestamps
- Limit to 10 requests per minute per IP
- Clean up expired entries periodically
- Return 429 with clear error message when exceeded

**2. Add input validation:**
- Validate that `messages` is an array with max 50 entries
- Validate each message has `role` (user/assistant only) and `content` (string, max 2000 chars)
- Strip any `system` role messages from user input (prevent prompt injection)
- Return 400 with error for invalid input

**3. Add `verify_jwt = false` to config.toml** for the chat function (it's a public endpoint but we validate in code).

### Changes to `src/components/AIChatWindow.tsx`

**No changes needed** -- the client already sends the anon key as Authorization header which is required by the edge function gateway. The security improvements are all server-side.

### Security Summary

| Threat | Mitigation |
|--------|-----------|
| Direct endpoint abuse | IP-based rate limiting (10 req/min) |
| Prompt injection via system role | Strip system messages from user input |
| Oversized payloads | Message count limit (50) and content length limit (2000 chars) |
| Bot spam | Rate limiting + input validation |

