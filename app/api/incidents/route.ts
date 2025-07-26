import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const resolved = searchParams.get("resolved")

    let incidents

    if (resolved !== null) {
      const resolvedBool = resolved === "true"
      incidents = await sql`
        SELECT 
          i.*,
          c.name as camera_name,
          c.location as camera_location
        FROM incidents i
        JOIN cameras c ON i.camera_id = c.id
        WHERE i.resolved = ${resolvedBool}
        ORDER BY i.ts_start DESC
      `
    } else {
      incidents = await sql`
        SELECT 
          i.*,
          c.name as camera_name,
          c.location as camera_location
        FROM incidents i
        JOIN cameras c ON i.camera_id = c.id
        ORDER BY i.ts_start DESC
      `
    }

    // Ensure we always return an array
    const result = Array.isArray(incidents) ? incidents : []

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching incidents:", error)
    // Return empty array on error to prevent frontend crashes
    return NextResponse.json([], { status: 500 })
  }
}
