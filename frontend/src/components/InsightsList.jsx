import { useEffect, useState } from "react";
import api from "../services/api";
import InsightCard from "./InsightCard";
import InsightSkeleton from "./InsightSkeleton";
import Pagination from "./Pagination";
import { Brain } from "lucide-react";

const InsightsList = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchInsights = async () => {
    setLoading(true);

    try {
      const res = await api.get(`ai/insights?page=${page}&limit=3`);
      setInsights(res.data.data.insights);
      setPagination(res.data.data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [page]);

  const handleDelete = async (id) => {
    await api.delete(`/ai/insights/${id}`);
    setInsights((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading insights...</div>;
  }

  if (insights.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-500">
        No insights yet. Try analyzing something.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <InsightSkeleton key={i} />)
        : insights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onDelete={handleDelete}
            />
          ))}

      {pagination.totalPages > 1 && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default InsightsList;
