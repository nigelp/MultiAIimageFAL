import React, { useState, useRef } from 'react';
import { Upload, Trash2, Loader2, ImagePlus, X, Download } from 'lucide-react';
import Papa from 'papaparse';
import { fal } from '@fal-ai/client';

// Configure FAL client with your API key
const FAL_KEY = import.meta.env.VITE_FAL_KEY;

if (!FAL_KEY) {
  console.error('FAL_KEY not found in environment variables');
}

fal.config({
  credentials: FAL_KEY
});

// Available FAL.ai models
const AVAILABLE_MODELS = [
  {
    id: 'fal-ai/flux-pro/v1.1-ultra',
    name: 'FLUX Pro 1.1 Ultra',
    description: 'Latest FLUX with 2K resolution and improved photo realism'
  },
  {
    id: 'fal-ai/recraft-v3',
    name: 'Recraft V3',
    description: 'SOTA model for vector art, brand styles, and long texts'
  },
  {
    id: 'fal-ai/aura-flow',
    name: 'AuraFlow v0.3',
    description: 'State-of-the-art flow-based generation (Beta)'
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
    id: 'fal-ai/stable-diffusion-v35-large',
    name: 'SD 3.5 Large',
    description: 'Large MMDiT model with improved quality'
  },
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
  }
];

// Add this near your AVAILABLE_MODELS constant
const IMAGE_SIZES = [
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

const ImageGenerator = () => {
  const [inputMethod, setInputMethod] = useState('manual');
  const [numPrompts, setNumPrompts] = useState(1);
  const [prompts, setPrompts] = useState(['']);
  const [selectedModels, setSelectedModels] = useState(['fal-ai/flux-pro/v1.1']);
  const [globalModel, setGlobalModel] = useState('fal-ai/flux-pro/v1.1');
  const [globalImageSize, setGlobalImageSize] = useState('landscape_4_3');
  const [selectedImageSizes, setSelectedImageSizes] = useState(['landscape_4_3']);
  const [generatedImages, setGeneratedImages] = useState([null]);
  const [generatingStates, setGeneratingStates] = useState([false]);
  const [progress, setProgress] = useState({});
  const fileInputRef = useRef(null);

  
  // Update handleNumPromptsChange
  const handleNumPromptsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumPrompts(num);
    setPrompts(Array(num).fill(''));
    setSelectedModels(Array(num).fill(globalModel));
    setSelectedImageSizes(Array(num).fill(globalImageSize)); // Add this line
    setGeneratingStates(Array(num).fill(false));
    setGeneratedImages(Array(num).fill(null));
  };

  // Handle global model change
  const handleGlobalModelChange = (e) => {
    const modelId = e.target.value;
    setGlobalModel(modelId);
    setSelectedModels(Array(prompts.length).fill(modelId));
  };

 // Handle individual model change
 const handleModelChange = (index, modelId) => {
  const newSelectedModels = [...selectedModels];
  newSelectedModels[index] = modelId;
  setSelectedModels(newSelectedModels);
};

  // Update handleFileUpload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      Papa.parse(text, {
        complete: (results) => {
          const newPrompts = results.data.flat().filter(prompt => prompt.trim());
          setPrompts(newPrompts);
          setNumPrompts(newPrompts.length);
          setSelectedModels(Array(newPrompts.length).fill(globalModel));
          setSelectedImageSizes(Array(newPrompts.length).fill(globalImageSize)); // Add this line
          setGeneratingStates(Array(newPrompts.length).fill(false));
          setGeneratedImages(Array(newPrompts.length).fill(null));
        }
      });
    }
  };

    // Handle global image size change
    const handleGlobalImageSizeChange = (e) => {
      const sizeId = e.target.value;
      setGlobalImageSize(sizeId);
      setSelectedImageSizes(Array(prompts.length).fill(sizeId));
    };
  
    // Handle individual image size change
    const handleImageSizeChange = (index, sizeId) => {
      const newSelectedSizes = [...selectedImageSizes];
      newSelectedSizes[index] = sizeId;
      setSelectedImageSizes(newSelectedSizes);
    };
  


  // Handle prompt text changes
  const handlePromptChange = (index, value) => {
    const newPrompts = [...prompts];
    newPrompts[index] = value;
    setPrompts(newPrompts);
  };

  // Update handleDeletePrompt
  const handleDeletePrompt = (index) => {
    const newPrompts = prompts.filter((_, i) => i !== index);
    const newSelectedModels = selectedModels.filter((_, i) => i !== index);
    const newSelectedSizes = selectedImageSizes.filter((_, i) => i !== index); // Add this line
    const newGeneratingStates = generatingStates.filter((_, i) => i !== index);
    const newGeneratedImages = generatedImages.filter((_, i) => i !== index);
    setPrompts(newPrompts);
    setSelectedModels(newSelectedModels);
    setSelectedImageSizes(newSelectedSizes); // Add this line
    setGeneratingStates(newGeneratingStates);
    setGeneratedImages(newGeneratedImages);
    setNumPrompts(newPrompts.length);
  };

// Function to download image
const downloadImage = async (url, promptText) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

 // Update handleGenerateSingle
 const handleGenerateSingle = async (promptIndex) => {
  const newGeneratingStates = [...generatingStates];
  newGeneratingStates[promptIndex] = true;
  setGeneratingStates(newGeneratingStates);
  
  setProgress(prev => ({
    ...prev,
    [promptIndex]: { status: 'starting', message: 'Initializing generation...' }
  }));

  try {
    setProgress(prev => ({
      ...prev,
      [promptIndex]: { status: 'processing', message: 'Processing prompt...' }
    }));

    const result = await fal.subscribe(selectedModels[promptIndex], {
      input: {
        prompt: prompts[promptIndex],
        num_images: 1,
        image_size: selectedImageSizes[promptIndex],
        num_inference_steps: 28,
        safety_tolerance: "4",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          setProgress(prev => ({
            ...prev,
            [promptIndex]: { 
              status: 'generating', 
              message: update.logs[update.logs.length - 1]?.message || 'Generating...'
            }
          }));
        }
      },
    });

    setGeneratedImages(prevImages => {
      const newImages = [...prevImages];
      newImages[promptIndex] = {
        url: result.data.images[0].url,
        prompt: prompts[promptIndex],
        model: selectedModels[promptIndex],
        imageSize: selectedImageSizes[promptIndex]
      };
      return newImages;
    });
    
    setProgress(prev => ({
      ...prev,
      [promptIndex]: { status: 'complete', message: 'Generation complete!' }
    }));
  } catch (error) {
    console.error('Error generating image:', error);
    setProgress(prev => ({
      ...prev,
      [promptIndex]: { status: 'error', message: 'Error generating image' }
    }));
  } finally {
    setGeneratingStates(prev => {
      const newStates = [...prev];
      newStates[promptIndex] = false;
      return newStates;
    });
  }
};


  // Generate all images
  const handleGenerateAll = async () => {
    const allPrompts = [...Array(prompts.length).keys()];
    setGeneratingStates(Array(prompts.length).fill(true));
    
    await Promise.all(
      allPrompts.map(async (promptIndex) => {
        if (prompts[promptIndex].trim()) {
          await handleGenerateSingle(promptIndex);
        }
      })
    );
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'starting': return 'text-yellow-500';
      case 'processing': return 'text-blue-500';
      case 'generating': return 'text-purple-500';
      case 'complete': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI image generator comparison
          </h1>
          <p className="text-gray-400 mb-6">Create stunning AI-generated images from your prompts</p>
          
          {/* Input Method and Global Model Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-gray-800 p-6 rounded-lg shadow-xl">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Input Method</label>
              <select 
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={inputMethod}
                onChange={(e) => setInputMethod(e.target.value)}
              >
                <option value="manual">Manual Entry</option>
                <option value="csv">CSV Upload</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Global Model Selection</label>
              <select 
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={globalModel}
                onChange={handleGlobalModelChange}
              >
                {AVAILABLE_MODELS.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Global Image Size</label>
              <select 
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={globalImageSize}
                onChange={handleGlobalImageSizeChange}
              >
                {IMAGE_SIZES.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.name} ({size.description})
                  </option>
                ))}
              </select>
            </div>

            {inputMethod === 'manual' ? (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Number of Prompts</label>
                <select 
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                  value={numPrompts}
                  onChange={handleNumPromptsChange}
                >
                  {[1, 2, 3, 4, 5, 6, 9, 12].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Upload CSV</label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
                >
                  <Upload size={20} />
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>

          {/* Prompt Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {prompts.map((prompt, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-xl p-4 relative group">
                <button 
                  onClick={() => handleDeletePrompt(index)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Prompt {index + 1}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => handlePromptChange(index, e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white h-24 resize-none mb-3"
                  placeholder="Enter your prompt here..."
                />

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Model Selection
                  </label>
                  <select
                    value={selectedModels[index]}
                    onChange={(e) => handleModelChange(index, e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white text-sm"
                  >
                    {AVAILABLE_MODELS.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Image Size
            </label>
            <select
              value={selectedImageSizes[index]}
              onChange={(e) => handleImageSizeChange(index, e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white text-sm"
            >
              {IMAGE_SIZES.map(size => (
                <option key={size.id} value={size.id}>
                  {size.name} ({size.description})
                </option>
              ))}
            </select>
          </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleGenerateSingle(index)}
                    disabled={generatingStates[index]}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                  >
                    {generatingStates[index] ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ImagePlus size={16} />
                    )}
                    Generate
                  </button>
                  
                  {progress[index] && (
                    <span className={`text-sm ${getProgressColor(progress[index].status)}`}>
                      {progress[index].message}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Generate All Button */}
          <button
            onClick={handleGenerateAll}
            disabled={generatingStates.some(state => state)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-colors mb-8"
          >
            {generatingStates.some(state => state) ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                Generating Images...
              </span>
            ) : (
              'Generate All Images'
            )}
          </button>

          {/* Results Grid */}
          {generatedImages.some(img => img) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image, index) => {
                if (!image) return null;
                return (
                  <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl group">
                    <div className="relative">
                      <img
                        src={image.url}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => downloadImage(image.url, image.prompt)}
                          className="flex items-center gap-2 px-4 py-2 rounded bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                    <p className="text-sm text-gray-300 mb-2">{image.prompt}</p>
                    <p className="text-xs text-gray-400">
                      Model: {AVAILABLE_MODELS.find(m => m.id === image.model)?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Size: {IMAGE_SIZES.find(s => s.id === image.imageSize)?.description}
                    </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;