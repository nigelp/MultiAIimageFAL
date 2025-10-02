import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, AlertCircle, Settings, X } from 'lucide-react';

const API_KEY_STORAGE_KEY = 'fal_api_key';

const ApiKeySettings = ({ onApiKeyChange, isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', null

  useEffect(() => {
    // Load API key from localStorage on mount
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
      setSaveStatus('success');
      onApiKeyChange(apiKey.trim());
      setTimeout(() => {
        setSaveStatus(null);
        onClose?.();
      }, 1500);
    } catch (error) {
      console.error('Error saving API key:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    onApiKeyChange(null);
    setSaveStatus(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold text-white">API Key Settings</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            FAL.AI API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your FAL.AI API key"
              className="w-full p-3 pr-10 rounded bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Get your API key from{' '}
            <a
              href="https://fal.ai/dashboard/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              fal.ai/dashboard/keys
            </a>
          </p>
        </div>

        {saveStatus && (
          <div
            className={`mb-4 p-3 rounded flex items-center gap-2 ${
              saveStatus === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {saveStatus === 'success' ? (
              <>
                <Check size={18} />
                <span>API key saved successfully!</span>
              </>
            ) : (
              <>
                <AlertCircle size={18} />
                <span>Please enter a valid API key</span>
              </>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-medium transition-colors"
          >
            Save API Key
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-700/50 rounded border border-gray-600">
          <h3 className="text-sm font-semibold text-white mb-2">Why do I need an API key?</h3>
          <p className="text-xs text-gray-300">
            Your API key is stored locally in your browser and never sent to our servers. 
            It's used directly to authenticate with FAL.AI for image generation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySettings;
export { API_KEY_STORAGE_KEY };