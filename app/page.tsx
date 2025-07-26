import { Navbar } from "@/components/navbar"
import { IncidentPlayer } from "@/components/incident-player"
import { IncidentList } from "@/components/incident-list"
import { Timeline } from "@/components/timeline"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="p-6 space-y-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Incident Player */}
          <div className="lg:col-span-2">
            <IncidentPlayer />
          </div>

          {/* Right Side - Incident List */}
          <div className="lg:col-span-1">
            <IncidentList />
          </div>
        </div>

        {/* Bottom - Timeline */}
        <Timeline />
      </div>
    </div>
  )
}
