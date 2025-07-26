# SecureSight - CCTV Monitoring Dashboard

A comprehensive CCTV monitoring software built with Next.js 15, featuring AI-powered threat detection and real-time incident management.

## Features

### Mandatory Features ✅
- **Navbar**: Clean navigation with user profile and menu items
- **Incident Player**: Video player with controls and camera thumbnails
- **Incident List**: Real-time incident feed with resolve functionality
- **Database Integration**: PostgreSQL with Camera and Incident models
- **API Routes**: RESTful endpoints for incident management
- **Optimistic UI**: Smooth user experience with instant feedback

### Optional Features ✅
- **Interactive Timeline**: 24-hour timeline with incident markers
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live incident feed updates

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Neon PostgreSQL
- **UI Components**: shadcn/ui, Lucide React icons
- **Database**: PostgreSQL with Neon serverless driver

## Database Schema

### Cameras Table
\`\`\`sql
- id (Primary Key)
- name (VARCHAR)
- location (VARCHAR)
- created_at (TIMESTAMP)
\`\`\`

### Incidents Table
\`\`\`sql
- id (Primary Key)
- camera_id (Foreign Key → cameras.id)
- type (VARCHAR) - Threat type
- ts_start (TIMESTAMP) - Incident start time
- ts_end (TIMESTAMP) - Incident end time
- thumbnail_url (VARCHAR) - Thumbnail image path
- resolved (BOOLEAN) - Resolution status
- created_at (TIMESTAMP)
\`\`\`

## API Endpoints

- `GET /api/incidents?resolved=false` - Fetch unresolved incidents
- `PATCH /api/incidents/:id/resolve` - Toggle incident resolution status

## Installation & Setup

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd securesight-dashboard
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
# Create .env.local file
DATABASE_URL="postgresql://username:password@host:port/database"
\`\`\`

4. **Set up database**
\`\`\`bash
# Run the schema and seed scripts
# Execute scripts/schema.sql and scripts/seed.sql in your PostgreSQL database
\`\`\`

5. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

6. **Open your browser**
Navigate to `http://localhost:3000`

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add the `DATABASE_URL` environment variable
3. Deploy automatically on push to main branch

## Tech Decisions

### Why Next.js 15?
- **App Router**: Modern routing with server components
- **API Routes**: Built-in backend functionality
- **TypeScript**: Type safety and better developer experience
- **Performance**: Optimized builds and caching

### Why Neon PostgreSQL?
- **Serverless**: Auto-scaling and cost-effective
- **Edge**: Low latency with global distribution
- **Developer Experience**: Easy setup and management

### Why Tailwind CSS?
- **Utility-first**: Rapid UI development
- **Responsive**: Mobile-first design approach
- **Customizable**: Easy theming and component styling

### Why shadcn/ui?
- **Accessible**: ARIA compliant components
- **Customizable**: Full control over component styling
- **Modern**: Latest React patterns and best practices

## If I Had More Time...

### Performance Optimizations
- [ ] Implement WebSocket connections for real-time updates
- [ ] Add Redis caching for frequently accessed data
- [ ] Optimize image loading with next/image blur placeholders
- [ ] Implement virtual scrolling for large incident lists

### Enhanced Features
- [ ] **3D Dashboard**: React Three Fiber implementation
- [ ] **Advanced Timeline**: Draggable scrubber with video sync
- [ ] **Multi-camera View**: Grid layout with simultaneous feeds
- [ ] **AI Integration**: Real-time threat detection with confidence scores
- [ ] **Export Functionality**: PDF reports and video clips
- [ ] **User Management**: Role-based access control
- [ ] **Mobile App**: React Native companion app
- [ ] **Analytics Dashboard**: Incident trends and statistics

### Technical Improvements
- [ ] **Testing**: Unit tests with Jest and React Testing Library
- [ ] **E2E Testing**: Playwright for integration testing
- [ ] **Monitoring**: Error tracking with Sentry
- [ ] **Logging**: Structured logging with Winston
- [ ] **Documentation**: API documentation with OpenAPI
- [ ] **CI/CD**: GitHub Actions for automated testing and deployment

### Security Enhancements
- [ ] **Authentication**: NextAuth.js with multiple providers
- [ ] **Authorization**: RBAC with middleware protection
- [ ] **Rate Limiting**: API protection against abuse
- [ ] **Input Validation**: Zod schemas for type-safe validation
- [ ] **HTTPS**: SSL certificate and security headers

### UX/UI Improvements
- [ ] **Dark/Light Mode**: Theme switching capability
- [ ] **Keyboard Shortcuts**: Power user navigation
- [ ] **Accessibility**: Screen reader support and WCAG compliance
- [ ] **Animations**: Smooth transitions with Framer Motion
- [ ] **Notifications**: Toast messages and browser notifications
