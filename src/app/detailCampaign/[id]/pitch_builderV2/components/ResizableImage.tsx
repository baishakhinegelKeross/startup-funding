"use client";

import React,{ useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface ResizableImageProps {
  src: string;
  alt?: string;
  initialWidth?: number;
  initialHeight?: number;
  minConstraints?: [number, number];
  maxConstraints?: [number, number];
}

export default function ResizableImage({
  src,
  alt = '',
  initialWidth = 400,
  initialHeight = 900,
  minConstraints = [100, 100],
  maxConstraints = [1000, 1000],
}: ResizableImageProps) {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const onResize = (event: any, { size }: { size: { width: number; height: number } }) => {
    debugger
    setDimensions({
      width: size.width,
      height: size.height,
    });
  };

  return (
    <div className="group relative mb-4">
      <ResizableBox
        width={dimensions.width}
        height={dimensions.height}
        onResize={onResize}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
        
      >
        <div className="relative w-full h-full">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded-lg"
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 border-2 border-blue-400 border-dashed rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </ResizableBox>
    </div>
  );
}