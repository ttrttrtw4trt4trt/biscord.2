# Design Guidelines: School Discord Clone

## Design Approach

**Reference-Based Approach**: Primary inspiration from Discord, with influences from Slack and Microsoft Teams for educational context. Focus on utility, clarity, and real-time communication efficiency.

**Key Principles**:
- Clean, distraction-free messaging interface
- Instant visual feedback for real-time interactions
- Clear information hierarchy prioritizing active conversations
- Familiar patterns for quick onboarding

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (Default):
- Background Primary: 220 13% 13%
- Background Secondary: 223 7% 20%
- Background Tertiary: 225 6% 25%
- Text Primary: 210 20% 98%
- Text Secondary: 215 16% 65%
- Text Muted: 215 10% 45%
- Brand Accent: 235 86% 65%
- Interactive Hover: 235 86% 70%
- Active Channel: 235 85% 92%
- Danger/Alert: 0 84% 60%

**Light Mode** (Alternative):
- Background Primary: 0 0% 100%
- Background Secondary: 220 13% 97%
- Text Primary: 220 13% 13%
- Brand Accent: 235 86% 55%

### B. Typography

**Font Stack**: 
- Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Monospace: 'Consolas', 'Monaco', monospace (for code snippets)

**Type Scale**:
- Channel Names: text-sm font-medium (14px, 500 weight)
- Message Author: text-sm font-semibold (14px, 600 weight)
- Message Body: text-base (16px, 400 weight)
- Timestamps: text-xs (12px, 400 weight)
- Section Headers: text-xs font-semibold uppercase tracking-wide (12px, 600 weight)
- App Title: text-lg font-bold (18px, 700 weight)

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 1, 2, 3, 4, 6, 8, 12 for consistency
- Component padding: p-3, p-4
- Section gaps: gap-2, gap-4
- Message spacing: space-y-2, space-y-4
- Icon spacing: gap-2, gap-3

**Grid Structure**:
- Sidebar: Fixed width 240px (w-60) - collapsible on mobile
- Chat Area: Flex-1 with max-width container
- Message List: Full width with py-4 px-6 padding
- Input Area: Fixed bottom, full width

---

## D. Component Library

### 1. Navigation & Structure

**Left Sidebar**:
- Server icon/logo at top (h-12 w-12, rounded)
- Channel list below with category grouping
- Each channel: flex items, hash icon, hover state with bg-tertiary
- Active channel: bg-brand/10 with left border-l-4 border-brand
- User profile at bottom (avatar, name, status indicator)

**Top Bar**:
- Current channel name with hash icon (text-base font-semibold)
- Channel description (text-sm text-muted)
- Right-aligned utilities: search icon, notifications, settings

### 2. Message Display

**Message Container**:
- Avatar (h-10 w-10 rounded-full) on left
- Message content area on right
- Hover state: subtle bg-secondary/50 with timestamp reveal
- Grouping: messages from same user within 5min merge (no avatar repeat)

**Message Structure**:
- Author name + timestamp on first line (flex items-baseline gap-2)
- Message text with proper line height (leading-relaxed)
- Markdown support styling (bold, italic, code blocks)
- Link previews with border-l-4 accent

**Timestamp Display**:
- Hover: show exact time (text-xs text-muted)
- Recent: "Just now", "2m ago"
- Older: "Yesterday at 3:42 PM"

### 3. Input Area

**Message Input**:
- Fixed bottom position with backdrop-blur
- Rounded-lg container (bg-tertiary)
- Multi-line textarea with max-height
- Placeholder: "Message #channel-name" (text-muted)
- Send button (brand accent) on right, enabled when text present
- File upload icon (optional) on left

**Input States**:
- Focus: ring-2 ring-brand
- Typing indicator: subtle pulse animation below
- Character limit warning at high count

### 4. Channel List Items

**Channel Pattern**:
- Hash icon + channel name (text-secondary)
- Hover: text-primary, bg-tertiary transition
- Active: text-active-channel, bg-brand/10, bold
- Unread indicator: white dot on right
- Icon size: h-5 w-5

### 5. User Profile Card

**Bottom Profile**:
- Avatar with online status (green dot overlay)
- Username (text-sm font-medium)
- User tag/ID (text-xs text-muted)
- Hover: bg-tertiary for settings access

### 6. Empty States

**No Messages**:
- Centered icon (chat bubble, h-16 w-16, text-muted)
- "No messages yet" (text-lg font-medium)
- "Start the conversation" (text-sm text-muted)

**No Channels**:
- "Create your first channel to get started"
- Subtle call-to-action button

---

## E. Interaction Patterns

**Real-time Updates**:
- New messages: smooth slide-in from bottom (translate-y animation)
- Typing indicators: pulsing dots in channel
- Online status: instant color updates (green/gray)

**Micro-interactions** (minimal):
- Message send: subtle scale feedback on button
- Channel hover: smooth bg transition (150ms)
- Scroll behavior: smooth auto-scroll to new messages

**Responsive Behavior**:
- Mobile: Sidebar toggles via hamburger menu
- Tablet: Sidebar persistent, narrower chat area
- Desktop: Full three-column potential (sidebar, chat, member list)

---

## Images

**User Avatars**: Required throughout
- Message avatars: 40x40px circles
- Profile avatars: 32x32px circles
- Use placeholder services or initials with generated background colors

**Optional Server Icon**: 
- Top of sidebar: 48x48px rounded logo
- Can use school emblem or custom icon

**No Hero Image**: This is a utility application, not a marketing page - focus on functional interface

---

## Technical Notes

**Icons**: Use Heroicons (outline variant) via CDN for all UI icons
**Performance**: Virtualized scrolling for message lists with 50+ messages
**Accessibility**: ARIA labels on all interactive elements, keyboard navigation for channels, focus management
