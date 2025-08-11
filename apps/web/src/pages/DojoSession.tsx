import { useParams } from "react-router-dom";
import Layout from "./_Layout";
import { useState } from "react";

function mockSenseiReply(user: string) {
  const base = user?.trim()
    ? `なるほど。「${user}」ですね。いい表現です！`
    : "こんにちは！準備はいいですか？";
  return `${base} 次は自己紹介を一文でお願いできますか？`;
}

export default function DojoSession() {
  const { id } = useParams();
  const [log, setLog] = useState<string[]>([
    "（Sensei）こんにちは！今日は何を話しますか？",
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const user = `（You）${input}`;
    const reply = `（Sensei）${mockSenseiReply(input)}`;
    setLog((prev) => [...prev, user, reply]);
    setInput("");
  };

  return (
    <Layout>
      <div className="mb-4 text-sm text-gray-500">
        Session: <span className="font-medium">{id}</span>
      </div>
      <div className="rounded-2xl border bg-white p-4 h-[50vh] overflow-y-auto space-y-2">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-xl border px-3 py-2"
          placeholder="Type Japanese here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-xl bg-black text-white"
        >
          Send
        </button>
      </div>
    </Layout>
  );
}
