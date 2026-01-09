import { Trash2 } from "lucide-react";

const InsightCard = ({ insight, onDelete }) => {
  let parsedOutput = {};

  try {
    parsedOutput =
      typeof insight.output === "string"
        ? JSON.parse(insight.output)
        : insight.output;
  } catch {
    parsedOutput = {};
  }

  const {
    summary = "",
    sentiment = "",
    keywords = [],
    action_items = [],
  } = parsedOutput;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm">
      {/* Summary */}
      <h3 className="text-lg font-semibold mb-2">{summary}</h3>

      {/* Sentiment */}
      {/* Sentiment */}
      {sentiment && (
        <span
          className={`inline-block mb-3 px-3 py-1 text-sm rounded-full
            ${sentiment === "negative" && "bg-red-100 text-red-700"}
            ${sentiment === "positive" && "bg-green-100 text-green-700"}
            ${sentiment === "neutral" && "bg-gray-100 text-gray-700"}
          `}
        >
          {sentiment}
        </span>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((k, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
            >
              {k}
            </span>
          ))}
        </div>
      )}

      {/* Actions Items */}
      {action_items.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {action_items.map((item, i) => (
            <li key={i}>{typeof item === "string" ? item : item.item}</li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>{new Date(insight.createdAt).toLocaleString()}</span>

        <button
          onClick={() => onDelete(insight.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default InsightCard;
