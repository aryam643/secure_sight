"use client"

import { useState, useEffect } from "react"
import type { Incident } from "@/types"

export function Timeline() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllIncidents()
  }, [])

  const fetchAllIncidents = async () => {
    try {
      setError(null)
      const response = await fetch("/api/incidents")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Ensure data is an array
      if (Array.isArray(data)) {
        setIncidents(data)
      } else {
        console.error("API returned non-array data:", data)
        setIncidents([])
        setError("Invalid data format received from server")
      }
    } catch (error) {
      console.error("Error fetching incidents:", error)
      setIncidents([])
      setError(error instanceof Error ? error.message : "Failed to fetch incidents")
    }
  }

  // Generate 24-hour timeline
  const generateTimeMarkers = () => {
    const markers = []
    for (let i = 0; i < 24; i++) {
      markers.push({
        hour: i,
        label: `${i.toString().padStart(2, "0")}:00`,
      })
    }
    return markers
  }

  const getIncidentPosition = (timestamp: string) => {
    const date = new Date(timestamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return ((hours * 60 + minutes) / (24 * 60)) * 100
  }

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "Unauthorised Access":
        return "#f97316" // orange
      case "Gun Threat":
        return "#ef4444" // red
      case "Face Recognised":
        return "#3b82f6" // blue
      case "Traffic Congestion":
        return "#10b981" // green
      case "Motion Detected":
        return "#8b5cf6" // purple
      default:
        return "#6b7280" // gray
    }
  }

  const timeMarkers = generateTimeMarkers()

  return (
    <div className="bg-slate-900 rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-white font-medium mb-2">Camera List</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-4 h-4 bg-slate-600 rounded flex items-center justify-center">
              <span className="text-xs">📹</span>
            </div>
            <span className="text-sm">Camera - 01</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-4 h-4 bg-slate-600 rounded flex items-center justify-center">
              <span className="text-xs">📹</span>
            </div>
            <span className="text-sm">Camera - 02</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-4 h-4 bg-slate-600 rounded flex items-center justify-center">
              <span className="text-xs">📹</span>
            </div>
            <span className="text-sm">Camera - 03</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Time markers */}
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          {timeMarkers
            .filter((_, i) => i % 3 === 0)
            .map((marker) => (
              <span key={marker.hour}>{marker.label}</span>
            ))}
        </div>

        {/* Timeline bar */}
        <div className="relative h-8 bg-slate-800 rounded">
          {/* Current time indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10"
            style={{ left: `${((currentTime.getHours() * 60 + currentTime.getMinutes()) / (24 * 60)) * 100}%` }}
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>

          {/* Incident markers */}
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="absolute top-1 bottom-1 rounded px-1 text-xs text-white flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                left: `${getIncidentPosition(incident.ts_start)}%`,
                width: `${Math.max(2, ((new Date(incident.ts_end).getTime() - new Date(incident.ts_start).getTime()) / (1000 * 60 * 60 * 24)) * 100)}%`,
                backgroundColor: getIncidentColor(incident.type),
              }}
              title={`${incident.type} - ${incident.camera_location || incident.camera?.location || "Unknown"}`}
            >
              <span className="truncate">{incident.type}</span>
            </div>
          ))}
        </div>

        {/* Hour markers */}
        <div className="flex justify-between mt-1">
          {timeMarkers.map((marker) => (
            <div key={marker.hour} className="w-px h-2 bg-slate-600"></div>
          ))}
        </div>
      </div>
      {error && <div className="text-red-500 mt-2">Error: {error}</div>}
    </div>
  )
}
