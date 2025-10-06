# Open Source Catalog

A modern web app for browsing, searching, and discovering open source projects. Built with Next.js and React, this catalog features project cards, summary statistics, filtering, and more.

## 1. Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/quehill/oss-catalog.git
cd oss-catalog
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

### Static Data

The app uses a static `repos.json` file in the `public/` directory for repository data. Update this file to change the catalog contents.

## 2. Documentation

### Project Structure

- `app/` — Main Next.js app directory
  - `components/` — Reusable React components (Header, Footer, ProjectCard, etc.)
  - `catalog/` — Catalog page with search, filter, and sort features
  - `page.tsx` — Homepage with featured projects and summary statistics
- `public/` — Static assets (images, `repos.json`)
- `package.json` — Project dependencies and scripts

### Features

- **Homepage:** Highlights featured projects, summary statistics, and latest news.
- **Catalog:** Browse all projects, filter by language/topic, search, and sort.
- **Responsive Design:** Works well on desktop and mobile.
- **Easy Customization:** Update `repos.json` and images in `public/img/` as needed.

### Customization

- To add or update projects, edit `public/repos.json`.
- To change branding or images, update files in `public/img/`.
- For advanced filtering or UI changes, modify components in `app/components/` and `app/catalog/`.

### Deployment

You can deploy this app to Vercel, Netlify, or any static hosting provider that supports Next.js.
