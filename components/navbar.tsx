import { Camera, Grid3X3, Shield, Users, Video } from "lucide-react"

export function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-white font-semibold text-lg">MANDLACX</span>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded">
              <Grid3X3 className="w-4 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-1.5 rounded hover:bg-slate-700">
              <Camera className="w-4 h-4" />
              <span className="text-sm">Cameras</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-1.5 rounded hover:bg-slate-700">
              <Video className="w-4 h-4" />
              <span className="text-sm">Scenes</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-1.5 rounded hover:bg-slate-700">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Incidents</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-1.5 rounded hover:bg-slate-700">
              <Users className="w-4 h-4" />
              <span className="text-sm">Users</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">MA</span>
          </div>
          <div className="text-right">
            <div className="text-white text-sm font-medium">Mohammed Ajhas</div>
            <div className="text-slate-400 text-xs">ajhas@mandlac.com</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
