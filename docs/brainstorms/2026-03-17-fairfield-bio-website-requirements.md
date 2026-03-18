---
date: 2026-03-17
topic: fairfield-bio-website
---

# Fairfield Bio Website

## Problem Frame
Fairfield Bio has no web presence. The company is actively fundraising, meeting with potential data providers (nations, institutions) and users (pharma, biotech, AI companies), and has a Q2 OKR to "Make Fairfield visible." Without a website, the company lacks a credible digital home for conversations with providers, users, investors, press, and policymakers.

## Requirements
- R1. Home page with clear company positioning, the genomic data sharing problem, and Fairfield's solution
- R2. Distinct provider-facing page explaining value prop (sovereignty, revenue sharing, free bioinformatics pipeline)
- R3. Distinct user-facing page explaining value prop (access to locked data, legal clarity, Fairfield Select)
- R4. About page with company mission, founding story, and team bios
- R5. Blog/news section ready for thought leadership content and press mentions
- R6. Contact page with form (name, email, org, role, message)
- R7. Visual design conveys institutional trust — polished but not flashy, closer to NGO than startup
- R8. Responsive across mobile, tablet, and desktop
- R9. SEO metadata on all pages

## Success Criteria
- Website is live at fairfieldbio.com (or staging URL) and functional across all pages
- A provider visiting the site understands how Fairfield protects their sovereignty and generates revenue
- A user visiting the site understands how to access genomic data through Fairfield Select
- An investor or journalist visiting the site sees a credible, well-designed institutional presence
- Kevin and Mitch can share the URL in meetings and on LinkedIn

## Scope Boundaries
- No login/auth or Fairfield Select product functionality (that's a separate effort)
- No CMS — blog posts are MDX files in the repo for now
- No payment processing
- Logo is a text placeholder until a proper logo is designed
- Photography uses stock/placeholder images initially

## Key Decisions
- **Stack:** Next.js 16 + Tailwind + shadcn/ui + Geist fonts (modern, fast, Vercel-optimized)
- **Design tone:** Institutional trust, not startup flash. Light mode default. Earth tones / deep greens + slate.
- **Two-audience architecture:** Separate /providers and /users pages with tailored messaging
- **Blog:** MDX-based, no external CMS dependency
- **Brand assets:** Minimal — text logo, color palette, and Geist fonts. Proper logo deferred.

## Outstanding Questions

### Deferred to Planning
- [Affects R6][Technical] Which email service for contact form? (Resend recommended, can stub initially)
- [Affects R5][Needs research] Any existing blog content or drafts to seed the blog section?

## Next Steps
→ Implementation plan is ready. Proceed to build.
