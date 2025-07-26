export interface Camera {
  id: number
  name: string
  location: string
  created_at?: string
}

export interface Incident {
  id: number
  camera_id: number
  type: string
  ts_start: string
  ts_end: string
  thumbnail_url: string | null
  resolved: boolean
  created_at?: string
  camera?: Camera
  camera_name?: string
  camera_location?: string
}

export type IncidentType =
  | "Unauthorised Access"
  | "Gun Threat"
  | "Face Recognised"
  | "Motion Detected"
  | "Traffic Congestion"
