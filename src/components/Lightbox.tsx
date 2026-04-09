import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, isOpen, onClose, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const imgRef = useRef<HTMLImageElement>(null);
  const pinchZoomRef = useRef<any>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Reset zoom when image changes or lightbox opens handled by 'key' prop on QuickPinchZoom
  const onUpdate = useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    if (imgRef.current) {
      const value = make3dTransformValue({ x, y, scale });
      imgRef.current.style.setProperty('transform', value);
    }
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    if (onIndexChange) onIndexChange(nextIndex);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    if (onIndexChange) onIndexChange(prevIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center overflow-hidden touch-none"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-[1010] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
        >
          <X size={24} />
        </motion.button>

        {/* Navigation Buttons */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handlePrev}
          className="absolute left-6 z-[1010] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex backdrop-blur-md border border-white/10"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleNext}
          className="absolute right-6 z-[1010] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex backdrop-blur-md border border-white/10"
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Image Viewer */}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible" onClick={(e) => e.stopPropagation()}>
          <div className="w-full h-full flex items-center justify-center overflow-visible">
            <QuickPinchZoom 
              key={currentIndex}
              ref={pinchZoomRef}
              onUpdate={onUpdate} 
              wheelScaleFactor={0.01} 
              draggableUnZoomed={false}
              enforceBounds={true}
              containerProps={{ className: 'w-full h-full flex items-center justify-center overflow-visible touch-none' }}
            >
              <div className="flex items-center justify-center w-full h-full overflow-visible">
                <img
                  ref={imgRef}
                  src={images[currentIndex]}
                  alt={`Project Image ${currentIndex + 1}`}
                  className="w-full h-full object-contain select-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] rounded-lg transition-shadow duration-300"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </div>
            </QuickPinchZoom>
          </div>
        </div>

        {/* Image Counter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1010] text-white/80 text-sm font-bold tracking-widest px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full select-none cursor-default"
        >
          {currentIndex + 1} / {images.length}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
