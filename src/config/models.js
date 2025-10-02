/**
 * FAL.AI Model Configuration
 * 
 * To add new models:
 * 1. Find the model ID from https://fal.ai/models
 * 2. Add a new entry to the AVAILABLE_MODELS array
 * 3. Include id, name, and description
 * 
 * Note: FAL.AI doesn't provide a public API to fetch available models,
 * so we maintain this list manually. Check fal.ai/models for new releases.
 */

export const AVAILABLE_MODELS = [
  // FLUX Family - Latest and most powerful
  {
    id: 'fal-ai/flux-pro/v1.1-ultra',
    name: 'FLUX Pro 1.1 Ultra',
    description: 'Latest FLUX with 2K resolution and improved photo realism'
  },
  {
    id: 'fal-ai/flux-pro/v1.1',
    name: 'FLUX Pro 1.1',
    description: 'Enhanced image generation with superior composition'
  },
  {
    id: 'fal-ai/flux-pro/new',
    name: 'FLUX Pro New',
    description: 'Accelerated version with faster generation'
  },
  {
    id: 'fal-ai/flux-pro',
    name: 'FLUX Pro',
    description: 'High-quality professional image generation'
  },
  {
    id: 'fal-ai/flux-pro/kontext',
    name: 'FLUX Pro Kontext',
    description: 'Context-aware image generation'
  },
  {
    id: 'fal-ai/flux/dev',
    name: 'FLUX Dev',
    description: 'Development version with guidance distillation'
  },
  {
    id: 'fal-ai/flux/schnell',
    name: 'FLUX Schnell',
    description: '1-4 step generation optimized for speed'
  },
  {
    id: 'fal-ai/flux-realism',
    name: 'FLUX Realism',
    description: 'Specialized for hyper-realistic images'
  },
  {
    id: 'fal-ai/flux-lora',
    name: 'FLUX LoRA',
    description: 'FLUX with custom LoRA support'
  },

  // Google Models
  {
    id: 'fal-ai/imagen4/preview',
    name: 'Imagen 4 (Preview)',
    description: "Google's latest text-to-image model"
  },

  // Ideogram - Best for text in images
  {
    id: 'fal-ai/ideogram/v2',
    name: 'Ideogram v2',
    description: 'Advanced text rendering in images'
  },
  {
    id: 'fal-ai/ideogram/v2-turbo',
    name: 'Ideogram v2 Turbo',
    description: 'Fast text rendering generation'
  },

  // Specialized Models
  {
    id: 'fal-ai/recraft-v3',
    name: 'Recraft V3',
    description: 'SOTA model for vector art, brand styles, and long texts'
  },
  {
    id: 'fal-ai/aura-flow',
    name: 'AuraFlow v0.3',
    description: 'State-of-the-art flow-based generation'
  },
  {
    id: 'fal-ai/hidream-i1-full',
    name: 'HiDream I1 Full',
    description: 'High-quality dream-like image generation'
  },

  // Stable Diffusion Family
  {
    id: 'fal-ai/stable-diffusion-v35-large',
    name: 'SD 3.5 Large',
    description: 'Large MMDiT model with improved quality'
  },
  {
    id: 'fal-ai/stable-diffusion-v35-medium',
    name: 'SD 3.5 Medium',
    description: 'Balanced model with good speed and quality'
  },
  {
    id: 'fal-ai/stable-diffusion-v3-medium',
    name: 'SD 3 Medium',
    description: 'Versatile Stable Diffusion 3 model'
  },

  // Fast Models
  {
    id: 'fal-ai/pixart-sigma',
    name: 'PixArt Sigma',
    description: '4K text-to-image generation'
  },
  {
    id: 'fal-ai/realistic-vision',
    name: 'Realistic Vision',
    description: 'Focused on realistic image generation'
  },
  {
    id: 'fal-ai/fast-sdxl',
    name: 'Fast SDXL',
    description: 'High-speed SDXL generation'
  },
  {
    id: 'fal-ai/fast-turbo-diffusion',
    name: 'Fast Turbo Diffusion',
    description: 'Ultra-fast generation with turbo model'
  },
  {
    id: 'fal-ai/hyper-sdxl',
    name: 'Hyper SDXL',
    description: 'Hyper-fast SDXL with 1-step generation'
  },

  // Other Notable Models
  {
    id: 'fal-ai/omnigen-v1',
    name: 'OmniGen',
    description: 'Multi-modal generation with editing capabilities'
  },
  {
    id: 'fal-ai/fooocus',
    name: 'Fooocus',
    description: 'Optimized parameters for quality improvements'
  },
  {
    id: 'fal-ai/kolors',
    name: 'Kolors',
    description: 'Photorealistic image generation'
  },
  {
    id: 'fal-ai/stable-cascade',
    name: 'Stable Cascade',
    description: 'Efficient latent space generation'
  },
  {
    id: 'fal-ai/playground-v25',
    name: 'Playground v2.5',
    description: 'High-quality aesthetic generation'
  }
];

// Image size presets
export const IMAGE_SIZES = [
  {
    id: 'square_hd',
    name: 'Square HD',
    description: '1024x1024'
  },
  {
    id: 'square',
    name: 'Square',
    description: '512x512'
  },
  {
    id: 'portrait_4_3',
    name: 'Portrait 4:3',
    description: '768x1024'
  },
  {
    id: 'portrait_16_9',
    name: 'Portrait 16:9',
    description: '1080x1920'
  },
  {
    id: 'landscape_4_3',
    name: 'Landscape 4:3',
    description: '1024x768'
  },
  {
    id: 'landscape_16_9',
    name: 'Landscape 16:9',
    description: '1920x1080'
  }
];