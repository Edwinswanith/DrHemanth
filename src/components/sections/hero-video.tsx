"use client";

import Image from "next/image";
import { useState } from "react";

const videoId = "Q__rvX_EEGQ";
const videoTitle = "WATCH: Ealing Hospital breaks national record for robotic surgeries";

export function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={videoTitle}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <div className="relative h-full w-full" data-testid="hero-video">
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Video thumbnail: Ealing Hospital breaks national record for robotic surgeries"
        fill
        sizes="(min-width: 1024px) 50vw, 90vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink-950/20" aria-hidden="true" />
      <button
        type="button"
        className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-steel-400"
        onClick={() => setIsPlaying(true)}
        aria-label="Play video: Ealing Hospital breaks national record for robotic surgeries"
      >
        <span
          className="flex h-12 w-[4.25rem] items-center justify-center rounded-[14px] bg-brand-youtube shadow-raised transition hover:scale-105 hover:bg-brand-youtube-hover sm:h-14 sm:w-20"
          aria-hidden="true"
        >
          <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[18px] border-y-transparent border-l-white sm:border-y-[12px] sm:border-l-[22px]" />
        </span>
      </button>
    </div>
  );
}
