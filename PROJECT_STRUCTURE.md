# Project Structure - Updated

## Current Directory Structure

```
Medical_report_project/
│
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # Backend API for image analysis
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main page (home)
│
├── lib/                         # Shared utilities
│   ├── gemini.ts               # Google Gemini AI configuration
│   └── pdf-generator.ts        # PDF generation utility
│
├── public/                      # Static assets
│   ├── Background.png          # Background image
│   ├── gettyimages-...jpg      # Sample medical images
│   └── premium_photo-...jpeg
│
├── .env.example                # Environment variables template
├── .env.local                  # Your local environment (create this)
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── MIGRATION_GUIDE.md          # Python to Next.js migration guide
├── next.config.mjs             # Next.js configuration
├── package.json                # Node.js dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Main documentation
├── setup.ps1                   # Windows PowerShell setup script
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration

```

## Path Aliases

The project uses path aliases configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

This means you can import from anywhere using:
- `@/lib/gemini` instead of `../../../lib/gemini`
- `@/app/api/...` instead of relative paths
- `@/lib/pdf-generator` from any component

## Import Examples

### In Components (app/page.tsx)
```typescript
import { generatePDF } from '@/lib/pdf-generator';
```

### In API Routes (app/api/analyze/route.ts)
```typescript
import { analyzeImage } from '@/lib/gemini';
```

## Key Files Explained

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main UI component (replaces Streamlit UI) |
| `app/api/analyze/route.ts` | Backend API (handles image analysis) |
| `lib/gemini.ts` | Google AI integration |
| `lib/pdf-generator.ts` | PDF creation logic |
| `.env.local` | Your API keys (not in git) |
| `package.json` | Dependencies and scripts |

## Quick Start Commands

All commands run from the project root:

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local to add your GOOGLE_API_KEY

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Variables

Create `.env.local` in the root directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

## Development Workflow

1. Make changes to files in `app/` or `lib/`
2. The dev server auto-reloads (`npm run dev`)
3. Test at http://localhost:3000
4. Build for production when ready (`npm run build`)

## Deployment

This structure is ready for deployment to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Render**
- Any Node.js hosting platform

Remember to set `GOOGLE_API_KEY` in your deployment platform's environment variables!

---

Last updated: March 6, 2026
