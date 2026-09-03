# SalesPro Dashboard

A professional, responsive admin dashboard built with React, designed to showcase modern frontend development skills. SalesPro demonstrates a complete SaaS-style business application with multiple pages, interactive charts, data tables, search, filtering, dark/light mode, and full mobile responsiveness.

## Features

### Pages

- **Dashboard** — KPI cards (revenue, orders, customers, conversion rate), interactive revenue line/area chart with time range selector, sales vs target bar chart, recent orders table, and top products ranking
- **Orders** — Full orders table with search, status filter, sortable columns, pagination, and order detail modal with complete order information
- **Products** — Product catalog with table/grid view toggle, search, category filter, add/edit product modal with form validation, and delete confirmation modal
- **Customers** — Customer table with search, segment filter (VIP/Regular/New), status filter, sortable columns, and pagination
- **Analytics** — Revenue trend, monthly sales vs target, customer growth, conversion rate charts, and traffic sources pie chart with breakdown
- **Settings** — Profile, account/security, notification preferences, and general preferences (theme, language, timezone, currency) with form validation

### UI & Interaction

- Dark/light mode toggle with localStorage persistence
- Responsive sidebar (desktop) / drawer (mobile) navigation
- Top navbar with search, notification dropdown, and user profile menu
- Interactive Recharts-based charts (area, bar, line, pie)
- Sortable table columns across all data tables
- Client-side search and filtering
- Pagination UI on all data tables
- Modal dialogs for order details, product add/edit, and delete confirmation
- Toast notifications for user actions
- Form validation on settings and product forms

### Design

- Clean, modern SaaS aesthetic
- Custom brand color palette (blue)
- Professional typography with Inter font
- Consistent spacing and visual hierarchy
- Subtle borders, shadows, and hover states
- Status badges with distinct colors per status
- Responsive grid layouts that adapt from 320px to 1440px+

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool and dev server |
| JavaScript (ES Modules) | Language |
| Tailwind CSS 4 | Utility-first styling |
| React Router 7 | Client-side routing |
| Recharts | Chart components |
| Lucide React | Icon library |

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/SalesPro.git

# Navigate to the project directory
cd SalesPro

# Install dependencies
npm install
```

## Running Locally

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:5173
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint to check for code issues |

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

1. Push to GitHub
2. Connect the repository in Netlify dashboard
3. Set build command to `npm run build`
4. Set publish directory to `dist`

### GitHub Pages

1. Install the Vite base path plugin if needed
2. Set `base` in `vite.config.js` to your repo name
3. Build and deploy the `dist/` folder

### Any Static Host

```bash
npm run build
# Upload the dist/ directory to your hosting provider
```

## Project Structure

```
SalesPro/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # Static assets (images, SVGs)
│   ├── components/
│   │   ├── charts/          # Chart wrapper components
│   │   │   ├── ChartTooltip.jsx
│   │   │   ├── RangeSelector.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   └── SalesBarChart.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── tables/          # Table helper components
│   │   │   └── SortHeader.jsx
│   │   └── ui/              # Reusable UI components
│   │       ├── Avatar.jsx
│   │       ├── Button.jsx
│   │       ├── ChartCard.jsx
│   │       ├── EmptyState.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── Pagination.jsx
│   │       ├── SearchInput.jsx
│   │       ├── Select.jsx
│   │       ├── StatCard.jsx
│   │       └── StatusBadge.jsx
│   ├── data/                # Mock data files
│   │   ├── analytics.js
│   │   ├── customers.js
│   │   ├── notifications.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── hooks/               # Custom React hooks
│   │   ├── usePagination.js
│   │   ├── useSortableData.js
│   │   └── useTheme.js
│   ├── layouts/             # Page layout wrappers
│   │   └── AppLayout.jsx
│   ├── pages/               # Route page components
│   │   ├── Analytics.jsx
│   │   ├── Customers.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── Products.jsx
│   │   └── Settings.jsx
│   ├── utils/               # Utility functions
│   │   ├── cn.js
│   │   ├── format.js
│   │   └── styles.js
│   ├── App.jsx              # Root component with router
│   ├── index.css            # Global styles and Tailwind config
│   └── main.jsx             # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Key Design Decisions

- **No backend required** — All data is realistic mock data in `src/data/`, making this a pure frontend showcase
- **Modular components** — Every UI element is a standalone, reusable component with clear props
- **Custom hooks** — Sorting, pagination, and theme logic are extracted into custom hooks for reuse
- **Tailwind CSS 4** — Uses the latest Tailwind with `@theme` for custom design tokens and `@utility` for custom utilities
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, focus management, and proper contrast ratios
- **Mobile-first responsive** — Layout adapts from a single column at 320px to a full sidebar + content layout at 1024px+

## License

This project is for portfolio purposes.
