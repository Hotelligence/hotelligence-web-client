'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import mediumZoom from 'medium-zoom';
import { ImageOff } from 'lucide-react'

export default function ZoomableImage({ src, alt, width, height, className }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const zoom = mediumZoom(imgRef.current, {
      background: 'rgba(0, 0, 0, 0.7)', 
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return (
    <>
    {src ? (
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />) : (
        <div className="flex flex-col items-center gap-1">
            <p className='body5 italic'>Chưa có hình ảnh</p>
            <ImageOff size={60} />
        </div>
    )}
    </>
  );
};
