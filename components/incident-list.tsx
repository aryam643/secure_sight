"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Eye, Car, Activity } from "lucide-react"
import Image from "next/image"
import type { Incident } from "@/types"

const getIncidentIcon = (type: string) => {
  switch (type) {
    case "Unauthorised Access":
      return <Shield className="w-4 h-4" />
    case "Gun Threat":
      return <AlertTriangle className="w-4 h-4" />
    case "Face Recognised":
      return <Eye className="w-4 h-4" />
    case "Traffic Congestion":
      return <Car className="w-4 h-4" />
    case "Motion Detected":
      return <Activity className="w-4 h-4" />
    default:
      return <AlertTriangle className="w-4 h-4" />
  }
}

const getIncidentColor = (type: string) => {
  switch (type) {
    case "Unauthorised Access":
      return "bg-orange-500"
    case "Gun Threat":
      return "bg-red-500"
    case "Face Recognised":
      return "bg-blue-500"
    case "Traffic Congestion":
      return "bg-green-500"
    case "Motion Detected":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

export function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvingIds, setResolvingIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      setError(null)
      const response = await fetch("/api/incidents?resolved=false")

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
    } finally {
      setLoading(false)
    }
  }

  const handleResolve = async (incidentId: number) => {
    setResolvingIds((prev) => new Set(prev).add(incidentId))

    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
      })

      if (response.ok) {
        // Optimistic UI update - remove from list
        setIncidents((prev) => prev.filter((incident) => incident.id !== incidentId))
      }
    } catch (error) {
      console.error("Error resolving incident:", error)
    } finally {
      setResolvingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(incidentId)
        return newSet
      })
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-16 h-12 bg-slate-700 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="text-center">
          <div className="text-red-400 mb-2">⚠️ Error Loading Incidents</div>
          <div className="text-slate-400 text-sm mb-4">{error}</div>
          <Button onClick={fetchIncidents} variant="outline" className="text-slate-300 border-slate-600 bg-transparent">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const unresolvedCount = incidents.length
  const resolvedCount = 4 // Mock resolved count

  return (
    <div className="bg-slate-900 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-white font-semibold">{unresolvedCount} Unresolved Incidents</h2>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-400 ml-2">{resolvedCount} resolved incidents</span>
            </div>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="max-h-96 overflow-y-auto">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`p-4 border-b border-slate-700 last:border-b-0 transition-opacity duration-300 ${
              resolvingIds.has(incident.id) ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Thumbnail */}
              <div className="relative w-16 h-12 bg-slate-800 rounded overflow-hidden flex-shrink-0">
                {incident.thumbnail_url && (
                  <Image
                    src={incident.thumbnail_url || "/placeholder.svg"}
                    alt="Incident thumbnail"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${getIncidentColor(incident.type)}`}></div>
                      <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">
                        {getIncidentIcon(incident.type)}
                        <span className="ml-1">{incident.type}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-slate-400 mb-1">
                      <span>📍 {incident.camera_location || incident.camera?.location || "Unknown Location"}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <span>
                        🕐 {formatTime(incident.ts_start)} - {formatTime(incident.ts_end)} on{" "}
                        {formatDate(incident.ts_start)}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black ml-4 bg-transparent"
                    onClick={() => handleResolve(incident.id)}
                    disabled={resolvingIds.has(incident.id)}
                  >
                    {resolvingIds.has(incident.id) ? "Resolving..." : "Resolve"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {incidents.length === 0 && !loading && !error && (
          <div className="p-8 text-center text-slate-400">
            <div className="mb-2">📭</div>
            <div>No unresolved incidents</div>
          </div>
        )}
      </div>
    </div>
  )
}
