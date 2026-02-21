

# AI Assistant Chat Window

## Overview
Add a floating AI chat window to the portfolio that visitors can use to ask questions about your work, skills, and projects. It will use Lovable AI (Gemini Flash) with streaming responses and be fully responsive across all devices and browsers.

## What Visitors Can Do
- Ask about your skills, projects, services, and experience
- Get instant AI-powered responses with streaming text
- Open/close the chat from a floating button
- Use the chat on any device -- phones, tablets, desktops

## Architecture

### Backend: Edge Function (`supabase/functions/chat/index.ts`)
- Streams responses from Lovable AI gateway using SSE
- System prompt is defined on the backend containing your portfolio context (skills, projects, services, tools, role)
- Handles CORS, rate limit errors (429), and payment errors (402) gracefully
- No JWT required (public-facing)

### Frontend: Two New Components

**1. `src/components/AIChatWindow.tsx`** -- The main chat panel
- On desktop: floating card (fixed position, bottom-right, above taskbar) with glassmorphism styling matching the window system
- On mobile: full-screen overlay (100svh) with safe-area padding for iPhones (notch + home indicator)
- Features:
  - Message list with markdown rendering via simple formatting
  - Auto-scroll to latest message
  - Input bar pinned to bottom with send button
  - Loading indicator while streaming
  - Welcome message on first open
  - Close button (X) in header
  - Error handling with user-friendly toasts for rate limits

**2. `src/components/AIChatButton.tsx`** -- Floating action button
- Sparkle/MessageCircle icon toggle
- Positioned above the mobile hamburger menu (bottom-right)
- On desktop: sits near the taskbar area
- Animated entrance with Framer Motion
- Unread indicator dot when AI responds while chat is closed

### Integration Points
- `AIChatButton` + `AIChatWindow` added to `src/pages/Index.tsx`
- Chat state (open/closed, messages) managed locally via useState
- `supabase/config.toml` updated with `[functions.chat]` entry

## Mobile and Cross-Browser Details
- Uses `100svh` and `env(safe-area-inset-bottom)` for correct iPhone rendering
- Touch-friendly tap targets (min 44px)
- Input uses `type="text"` with `enterkeyhint="send"` for mobile keyboards
- `overflow-y: auto` with `-webkit-overflow-scrolling: touch` for smooth iOS scrolling
- No drag behavior on mobile -- static full-screen panel
- Works on Safari, Chrome, Firefox, Samsung Internet

## Technical Details

### System Prompt (backend-only)
Contains a summary of your portfolio: role as AI Engineer and UX Designer, three featured projects (AI Health Companion, Smart Document Parser, Accessibility Audit Tool), skills (TensorFlow, PyTorch, React, Figma, etc.), and services. Instructs the AI to be friendly, concise, and encourage visitors to get in touch.

### Files to Create
1. `supabase/functions/chat/index.ts` -- Edge function with streaming
2. `src/components/AIChatWindow.tsx` -- Chat panel UI
3. `src/components/AIChatButton.tsx` -- Floating trigger button

### Files to Modify
1. `src/pages/Index.tsx` -- Add chat components
2. `supabase/config.toml` -- Register chat function (auto-managed)

### Model
- `google/gemini-3-flash-preview` (default, fast and cost-effective)

### Styling
- Matches existing glassmorphism theme (`glass-strong`, `bg-card/80`, `backdrop-blur`)
- Uses existing color tokens (`primary`, `muted-foreground`, `border`)
- Font-mono for headers consistent with window system
- Dark/light mode compatible via existing CSS variables

