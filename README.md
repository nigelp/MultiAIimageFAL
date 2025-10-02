# AI Image Generator PWA

A Progressive Web App for generating AI images using FAL.AI's powerful image generation models. Create stunning images with state-of-the-art models like FLUX Pro, Stable Diffusion 3.5, and more.

## 🌟 Features

- **23+ AI Models** - Access to the latest text-to-image models including FLUX Pro 1.1 Ultra, Recraft V3, SD 3.5, and more
- **User-Managed API Keys** - Secure, local storage of your FAL.AI API key
- **PWA Support** - Install as an app on any device, works offline
- **Batch Generation** - Generate multiple images simultaneously
- **CSV Import** - Bulk upload prompts from CSV files
- **Individual Control** - Customize model and size per prompt
- **Real-time Progress** - Track generation status for each image
- **One-Click Download** - Save generated images instantly
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile

## 🚀 Quick Start

### For Users (Public Deployment)

1. **Visit the App** - Navigate to the deployed URL on Netlify
2. **Get Your API Key**:
   - Go to [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys)
   - Sign up or log in to your FAL.AI account
   - Create a new API key
   - Copy the key
3. **Configure the App**:
   - Click "API Settings" in the top right
   - Paste your API key
   - Click "Save API Key"
4. **Start Creating**:
   - Enter your prompt
   - Select a model and image size
   - Click "Generate"

Your API key is stored securely in your browser's local storage and never sent to our servers.

### For Developers (Local Development)

1. **Clone the Repository**
```bash
git clone [repository-url]
cd MultiImage
npm install
```

2. **Install PWA Plugin** (if not already installed)
```bash
npm install -D vite-plugin-pwa
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Build for Production**
```bash
npm run build
```

## 📦 Deployment to Netlify

### Option 1: Deploy via Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Netlify will auto-detect the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

The `netlify.toml` file is already configured with optimal settings.

## 🔑 Getting Your FAL.AI API Key

1. **Create Account**: Visit [fal.ai](https://fal.ai) and sign up
2. **Navigate to Dashboard**: Go to [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys)
3. **Create API Key**: Click "Create new key"
4. **Copy Key**: Save the key securely
5. **Add to App**: Use the "API Settings" button in the app

**Important**: 
- Your API key is stored only in your browser
- Never share your API key with others
- You can revoke and regenerate keys anytime from the FAL.AI dashboard
- FAL.AI offers free credits for new users

## 🎨 Available Models

The app includes 23 powerful text-to-image models:

### FLUX Family
- FLUX Pro 1.1 Ultra - 2K resolution, photorealistic
- FLUX Pro 1.1 - Enhanced composition
- FLUX Pro - Professional quality
- FLUX Dev - Development version
- FLUX Schnell - Ultra-fast generation
- FLUX Realism - Hyper-realistic images
- FLUX LoRA - Custom LoRA support

### Stable Diffusion
- SD 3.5 Large - Latest large model
- SD 3.5 Medium - Balanced performance
- SD 3 Medium - Versatile generation
- Fast SDXL - High-speed generation
- Hyper SDXL - 1-step generation

### Specialized Models
- Recraft V3 - Vector art, brand styles
- AuraFlow v0.3 - Flow-based generation
- PixArt Sigma - 4K resolution
- Realistic Vision - Photorealism
- Fast Turbo Diffusion - Ultra-fast
- OmniGen - Multi-modal capabilities
- Fooocus - Optimized quality
- Kolors - Photorealistic images
- Stable Cascade - Efficient latent space
- Playground v2.5 - Aesthetic generation

## 🛠️ Technologies

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **FAL.AI Client** - Official FAL.AI SDK
- **Vite PWA Plugin** - Progressive Web App support
- **Workbox** - Service worker and caching
- **Papa Parse** - CSV parsing
- **Lucide React** - Beautiful icons

## 📱 PWA Features

- **Installable** - Add to home screen on any device
- **Offline Capable** - Core functionality works without internet
- **Auto-Updates** - Automatically updates when new versions deploy
- **Fast Loading** - Cached assets for instant loading
- **Image Caching** - Generated images cached for 7 days
- **App-Like Experience** - Full-screen mode, no browser UI

## 🔒 Security & Privacy

- API keys stored locally in browser (localStorage)
- No server-side key storage
- Direct communication with FAL.AI API
- No tracking or analytics
- HTTPS enforced
- Security headers configured in Netlify

## 📄 Project Structure

```
MultiImage/
├── public/
│   ├── icon-192.png        # PWA icon (192x192)
│   ├── icon-512.png        # PWA icon (512x512)
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ApiKeySettings.jsx
│   ├── App.jsx             # Main application
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── netlify.toml            # Netlify configuration
├── package.json
├── tailwind.config.js
├── vite.config.js          # Vite + PWA config
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT

## 🆘 Support

For issues or questions:
- FAL.AI API: [fal.ai/docs](https://fal.ai/docs)
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## 🔄 Version History

### v2.0.0 (Current)
- Added user-managed API keys
- Implemented PWA support
- Added 8 new AI models (23 total)
- Netlify deployment configuration
- Enhanced error handling
- Improved UI/UX

### v1.0.0
- Initial release
- 15 AI models
- Basic image generation
- CSV import support
