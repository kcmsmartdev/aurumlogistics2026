"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_URL =
  "https://video.gumlet.io/6ae2e40a4001d74c28a280bc/6ae2e4634001d74c28a2818d/main.m3u8";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_URL; // Safari
    }

    return () => {
      hls?.destroy();
    };
  }, []);

  return (
    
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      />

  );
}