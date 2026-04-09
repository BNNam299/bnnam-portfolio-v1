import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isExternalLink, setIsExternalLink] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Trailing effect using spring
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const linkElement = target.closest('a');
      const buttonElement = target.closest('button');
      const labeledElement = target.closest('[data-cursor-label]') as HTMLElement;
      
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || linkElement || buttonElement || target.classList.contains('cursor-pointer') || labeledElement;
      
      setIsHovering(!!isClickable);
      
      if (labeledElement) {
        setCursorLabel(labeledElement.getAttribute('data-cursor-label'));
      } else {
        setCursorLabel(null);
      }
      
      if (linkElement) {
        const href = linkElement.getAttribute('href') || '';
        const isExternal = href.startsWith('http') && !href.includes(window.location.host);
        setIsExternalLink(isExternal);
      } else {
        setIsExternalLink(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none fixed inset-0 z-[99999]"
    >
      {/* Follower Circle - Blue with blending effect */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-accent/40 blur-[2px] mix-blend-multiply dark:mix-blend-screen"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%',
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
        }}
      />

      {/* Main Cursor Dot - Exact pointer position */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(0,163,255,0.8)]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Cursor Label / Tooltip */}
      <AnimatePresence>
        {cursorLabel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 20, y: 20 }}
            exit={{ opacity: 0, scale: 0.8, x: 10, y: 10 }}
            className="absolute top-0 left-0 flex items-center pointer-events-none"
            style={{
              translateX: cursorX,
              translateY: cursorY,
            }}
          >
            {/* The pill label */}
            <div className="bg-gradient-to-r from-[#0056FF] via-[#00A3FF] to-[#0056FF] animate-wave-gradient text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-xl flex items-center gap-2">
              {cursorLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* External Link Indicator (if no label) - Removed as requested */}
    </motion.div>
  );
};
