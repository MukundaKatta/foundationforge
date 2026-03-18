# FoundationForge

> End-to-end foundation model training platform with data pipeline management and scaling law analysis.

## Features

- **Data Pipeline** -- Manage multi-source training data (CommonCrawl, Wikipedia, GitHub, etc.) with quality scoring and processing status
- **Training Dashboard** -- Real-time loss curves, throughput metrics, learning rate schedules, and ETA estimation
- **Scaling Laws** -- Chinchilla-optimal compute analysis with parameter-to-loss projections from 125M to 175B parameters
- **Checkpoint Management** -- Track, compare, and manage model checkpoints with loss metrics and status labels
- **Data Quality Monitoring** -- Per-source quality scores with visual indicators and processing status tracking

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 14 (App Router)             |
| Language  | TypeScript                          |
| UI        | Tailwind CSS, Lucide React          |
| Charts    | Recharts                            |
| State     | Zustand                             |
| Backend   | Supabase (Auth + Database)          |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
foundationforge/
├── src/
│   └── app/
│       └── page.tsx          # Main app with pipeline, training, scaling, checkpoints
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## License

MIT
