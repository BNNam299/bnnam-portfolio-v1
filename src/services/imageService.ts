import { projects } from '../data/projects.config';

export function getProjectImages(category: string, folder: string): string[] {
  const project = projects.find(p => p.folder === folder);
  if (!project) return [];
  
  const images: string[] = [];
  const ext = project.ext || 'jpg';
  
  for (let i = 1; i <= project.frameCount; i++) {
    const frameExt = project.overrides?.[i] || ext;
    images.push(`./image/${category}/${folder}/${i}.${frameExt}`);
  }
  
  return images;
}

export function getSingleImage(path: string): string {
  // path should be like 'UIUX_Project/Zoner/thumbnail.webp'
  return `./image/${path}`;
}
