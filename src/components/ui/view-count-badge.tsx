import { Eye } from "lucide-react"

const ViewCountBadge = ({ count }: { count: number }) => (
  <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
    <Eye className="w-4 h-4 text-gray-400" />
    <span className="text-xs font-medium text-gray-400">Total Views:</span>
    <span className="text-base font-bold text-white">{count}</span>
  </div>
)

export default ViewCountBadge 