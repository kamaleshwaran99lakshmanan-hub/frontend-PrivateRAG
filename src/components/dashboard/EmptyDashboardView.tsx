import { CloudUpload } from 'lucide-react'
import Button from '../ui/Button'

function EmptyDashboardView() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-semibold text-slate-800">
          Welcome to SecureRAG!
        </h1>
        <p className="mt-2 text-slate-600">
          Start by uploading your first document.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-xs">
            <Button
              type="button"
              variant="primary"
              icon={<CloudUpload className="h-5 w-5" aria-hidden />}
            >
              Upload Document
            </Button>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          No documents processed yet.
        </p>
      </div>
    </div>
  )
}

export default EmptyDashboardView
