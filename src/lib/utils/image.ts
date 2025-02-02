import { ImageBrightness } from '$lib/types/common';

export async function getImageBrightness(imageUrl: string): Promise<ImageBrightness> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return resolve(ImageBrightness.DARK);
      
      let brightness = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        brightness += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      }
      brightness = brightness / (imageData.width * imageData.height);
      
      resolve(brightness > 128 ? ImageBrightness.LIGHT : ImageBrightness.DARK);
    };
    
    img.onerror = () => resolve(ImageBrightness.DARK);
    img.src = imageUrl;
  });
} 