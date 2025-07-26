import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const incidentId = Number.parseInt(params.id)

    if (isNaN(incidentId)) {
      return NextResponse.json({ error: "Invalid incident ID" }, { status: 400 })
    }

    // Toggle resolved status using template literal syntax
    const result = await sql`
      UPDATE incidents 
      SET resolved = NOT resolved 
      WHERE id = ${incidentId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Incident not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating incident:", error)
    return NextResponse.json({ error: "Failed to update incident" }, { status: 500 })
  }
}
