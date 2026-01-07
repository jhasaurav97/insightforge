import { Send } from "lucide-react";
import api from "../services/api.js";
import { useState } from "react";

const AiInput = ({onSuccess}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    try {
      await api.post("/ai/analyze", { text });
      setText("");
      onSuccess();
      window.dispatchEvent(new Event("refresh-insights"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
              placeholder="Type something you want AI to analyze..."
              className="w-full resize-none bg-transparent outline-none text-sm"
              rows={3}
          />
          <div className="flex justify-end mt-3">
              <button
                  disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-600">
                  <Send size={16} />
                  {loading ? "Analyzing..." : "Analyze"}
              </button>
          </div>
    </form>
  );
};

export default AiInput;
