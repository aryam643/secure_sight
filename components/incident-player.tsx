"use client"

import { Play, Pause, SkipBack, SkipForward, RotateCcw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

export function IncidentPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      {/* Timestamp */}
      <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm">📅 11/7/2025 - 03:12:37</div>

      {/* Main Video Area */}
      <div className="relative aspect-video bg-slate-800">
        <Image src="/images/jewelry-store.png" alt="CCTV Feed" fill className="object-cover" />

        {/* Camera Label */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Camera - 01</span>
        </div>

        {/* Additional Camera Thumbnails */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <div className="relative w-20 h-12 bg-slate-700 rounded overflow-hidden">
            <Image src="/images/jewelry-store.png" alt="Camera 02" fill className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-xs">Camera - 02</span>
            </div>
          </div>
          <div className="relative w-20 h-12 bg-slate-700 rounded overflow-hidden">
            <Image src="/images/jewelry-store.png" alt="Camera 03" fill className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-xs">Camera - 03</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-slate-300 hover:text-white"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
            <RotateCcw className="w-4 h-4 rotate-180" />
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-slate-300 text-sm">03:12:37 (15-Jun-2025)</div>

        <div className="flex items-center space-x-2">
          <span className="text-slate-300 text-sm">1x</span>
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
