export default function Ideas() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Ideas & Playground</h1>
      <p className="text-gray-600 mb-6">Creative tests & future experiments</p>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Flash Battle Page</h2>
          <p className="text-gray-600">
            Host unique user feedback points on grammar and vocab turned into
            audio-driven flash cards. Face off against the flash battle dojo
            master with anki-style spaced repetition.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Voice Input/Output</h2>
          <p className="text-gray-600">
            Real-time voice recording and AI speech synthesis for natural
            conversation flow.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
          <p className="text-gray-600">
            User accounts, session history, and skill progression analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
