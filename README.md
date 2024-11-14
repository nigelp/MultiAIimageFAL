# Multi AI Image Generator

A React application for generating AI images using FAL.ai's models.

## Features

- Multiple AI model selection
- Single or batch image generation
- CSV prompt upload support
- Individual model selection per prompt
- Progress tracking
- Image download functionality

## Setup

1. Install Node.js from [nodejs.org](https://nodejs.org/)

2. Clone and install dependencies:
```bash
git clone [repository-url]
cd flux-generator
npm install
```

3. Create `.env` file in project root:
```
VITE_FAL_KEY=your_fal_api_key_here
```

Get your API key from [FAL.ai](https://fal.ai)

4. Start development server:
```bash
npm run dev
```

## Usage

- Select input method (manual entry or CSV upload)
- Choose number of prompts
- Select AI model for each prompt
- Enter prompts
- Generate individual images or all at once
- Download generated images

## Technologies

- React
- Vite
- Tailwind CSS
- FAL.ai API
- Papa Parse (CSV parsing)

## Dependencies

```json
{
  "@fal-ai/client": "^0.8.5",
  "lucide-react": "^0.309.0",
  "papaparse": "^5.4.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

## Development

Built with Vite. Available scripts:
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## License

MIT
