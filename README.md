# T-Shirt Size Registration — Corporate Buyings

A Next.js application for managing employee T-shirt size registrations. Features employee registration, admin dashboard with data analytics, and Excel export functionality.

## Features

- **Employee Registration Form** — Simple registration with name and T-shirt size selection
- **Admin Dashboard** — View all registrations with search and filter capabilities
- **Statistics Panel** — Track total entries and most popular size
- **Excel Export** — Export registration data in formatted Excel spreadsheet
- **Responsive Design** — Works seamlessly on desktop and mobile devices
- **JSON-based Storage** — Lightweight file-based database (data/entries.json)

## Tech Stack

- **Framework:** Next.js 16.2.6
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4
- **Data Export:** XLSX 0.18.5
- **Node.js:** Required for API routes

## Project Structure

```
├── app/
│   ├── page.js                 # Employee registration form
│   ├── admin/
│   │   └── page.js             # Admin dashboard
│   ├── api/
│   │   ├── entries/
│   │   │   ├── route.js        # POST/GET entries
│   │   │   └── clear/
│   │   │       └── route.js    # DELETE all entries
│   ├── globals.css             # Global styles
│   └── layout.js               # Root layout
├── components/
│   ├── Alert.js                # Alert notifications
│   ├── Layout.js               # Layout wrapper
│   └── SizeSelector.js         # T-shirt size selector
├── lib/
│   ├── db.js                   # Database operations
│   └── storage.js              # Shared utilities (size constants, calculations)
├── data/
│   └── entries.json            # Data storage file
└── public/                      # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
cd tshirtsize
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:
   - **Employee Registration:** [http://localhost:3000](http://localhost:3000)
   - **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

## Usage

### Employee Registration

1. Navigate to the homepage
2. Enter your full name
3. Select your T-shirt size (XS, S, M, L, XL, XXL, 3XL)
4. Click "Submit Registration"
5. Confirmation message will display

### Admin Dashboard

1. Navigate to `/admin`
2. View all registrations with:
   - Search by name
   - Filter by T-shirt size
   - Statistics panel showing totals and trends
3. **Export Data:** Click "📄 Export Excel" to download registrations as XLSX
4. **Refresh:** Click "↻ Refresh" to reload data
5. **Clear All:** Delete all registration data (with confirmation)

## API Routes

### `POST /api/entries`

Submit a new registration

```json
{
  "name": "John Doe",
  "size": "L"
}
```

### `GET /api/entries`

Retrieve all registrations (admin)

### `DELETE /api/entries/clear`

Delete all entries (requires admin password)

## Data Storage

Registrations are stored in `data/entries.json`. Each entry contains:

```json
{
  "name": "John Doe",
  "size": "L",
  "submittedAt": "08 May, 2026 10:30"
}
```

## Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Available T-Shirt Sizes

- XS — Extra Small
- S — Small
- M — Medium
- L — Large
- XL — Extra Large
- XXL — Double XL
- 3XL — Triple XL

## Notes

- Registrations are persistent and stored locally
- Use admin dashboard to manage and export data
- Excel export includes formatted headers and is ready for distribution
- Data persists across server restarts

## License

Private project for Corporate Buyings
