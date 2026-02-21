import { useParams } from 'react-router-dom'

function InsightEnginePage() {
  const { documentId } = useParams<{ documentId: string }>()

  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-gray-800">Regulatory Insight Engine</h1>
      <p className="mt-2 text-gray-600">
        Placeholder — document viewer + chat to be built. Document ID: <code className="bg-gray-200 px-1 rounded">{documentId ?? '—'}</code>
      </p>
    </div>
  )
}

export default InsightEnginePage
