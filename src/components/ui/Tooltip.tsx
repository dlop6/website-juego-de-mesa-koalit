"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export function Tooltip({ 
  content, 
  children, 
  position = "top",
  delay = 300 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-elevated border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-elevated border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-elevated border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-elevated border-y-transparent border-l-transparent",
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap rounded-2 bg-elevated px-3 py-1.5 text-400 text-text shadow-lg border border-border ${positionClasses[position]}`}
        >
          {content}
          <div 
            className={`absolute h-0 w-0 border-4 ${arrowClasses[position]}`} 
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
