# School Discord Clone

## Overview

A real-time chat application for educational environments, inspired by Discord's interface and communication patterns. The application provides channel-based messaging with WebSocket support for instant message delivery, built with a modern React frontend and Express backend architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and API data fetching

**UI Component System**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for styling with custom design tokens matching Discord/Slack aesthetic
- Custom theme system supporting dark mode (default) and light mode
- Design tokens configured for Discord-inspired color palette (backgrounds, accents, borders)

**State Management**
- Local component state with React hooks
- WebSocket connection managed via useRef for real-time message synchronization
- React Query for caching and synchronizing channel and message data from REST endpoints

**Real-time Communication**
- WebSocket client for bidirectional communication
- Automatic message broadcasting to all connected clients
- Graceful fallback to REST API for initial data loading

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe server-side code
- HTTP server with WebSocket upgrade support using 'ws' library
- Custom Vite middleware integration for development hot-reloading

**API Design**
- RESTful endpoints for initial data fetching:
  - `GET /api/channels` - Retrieve all channels
  - `GET /api/channels/:channelId/messages` - Retrieve messages for specific channel
- WebSocket endpoint at `/ws` for real-time message broadcasting
- Input validation using Zod schemas derived from Drizzle ORM models

**Data Storage**
- In-memory storage implementation (MemStorage class) for development
- Schema designed for PostgreSQL with Drizzle ORM
- Database schema includes:
  - Channels table (id, name, description)
  - Messages table (id, channelId, username, content, timestamp)
- Schema uses UUIDs for primary keys with automatic generation

**Message Flow Architecture**
1. Client sends message via WebSocket with validation
2. Server validates against Drizzle-generated Zod schema
3. Message persisted to storage with auto-generated ID and timestamp
4. Server broadcasts message to all connected WebSocket clients
5. Clients update UI in real-time without page refresh

### External Dependencies

**Core Runtime Dependencies**
- @neondatabase/serverless - PostgreSQL serverless driver for Neon database
- drizzle-orm - TypeScript ORM for type-safe database queries
- drizzle-zod - Generate Zod validation schemas from Drizzle schemas
- ws - WebSocket server implementation for real-time messaging

**UI & Component Libraries**
- @radix-ui/* - Accessible, unstyled UI primitives (25+ components)
- @tanstack/react-query - Server state management and caching
- @hookform/resolvers - Form validation integration
- class-variance-authority - Type-safe variant styling
- tailwindcss - Utility-first CSS framework
- lucide-react - Icon library

**Development Tools**
- TypeScript - Type safety across full stack
- Vite - Build tool and dev server
- tsx - TypeScript execution for Node.js
- esbuild - Production bundling for server code
- drizzle-kit - Database migration and schema management

**Database Configuration**
- PostgreSQL as the target database dialect
- Migration output directory: `./migrations`
- Schema location: `./shared/schema.ts`
- Connection via DATABASE_URL environment variable

**Session & Storage**
- connect-pg-simple - PostgreSQL session store for Express sessions (listed in dependencies but not actively used in current implementation)
