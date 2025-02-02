export interface ImageInfo {
  id: string;
  author: string;
  url: string;
}

async function loadImage(url: string): Promise<string> {
  const response = await fetch(url);
  const finalUrl = response.url;
  
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = finalUrl;
  });

  return finalUrl;
}

async function getImageInfo(url: string): Promise<ImageInfo | null> {
  const match = url.match(/\/id\/(\d+)\//);
  if (!match) return null;

  const imageId = match[1];
  const response = await fetch(`https://picsum.photos/id/${imageId}/info`);
  const info = await response.json();
  
  return {
    id: info.id,
    author: info.author,
    url: info.url
  };
}

export async function updateBackground(): Promise<{
  finalUrl: string;
  imageInfo: ImageInfo | null;
}> {
  const newUrl = `https://picsum.photos/3024/1964?random=${Date.now()}`;
  const finalUrl = await loadImage(newUrl);
  const imageInfo = await getImageInfo(finalUrl);
  
  return { finalUrl, imageInfo };
} 