import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import InsightCard from "./InsightCard";
import InsightSkeleton from "./InsightSkeleton";
import Pagination from "./Pagination";

const LIMIT = 3;

const InsightsList = ({ refreshKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [insights, setInsights] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/ai/insights?page=${page}&limit=${LIMIT}`
      );

      setInsights(res.data.data.insights);
      setPagination(res.data.data.pagination);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [page, refreshKey]);

  const handleDelete = async (id) => {
    await api.delete(`/ai/insights/${id}`);

    // Optimistic UI update
    setInsights((prev) => prev.filter((i) => i.id !== id));

    // If last item deleted on page, move back one page
    if (insights.length === 1 && page > 1) {
      setSearchParams({ page: page - 1 });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: LIMIT }).map((_, i) => (
          <InsightSkeleton key={i} />
        ))}
      </div>
    );
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
      {insights.map((insight) => (
        <InsightCard
          key={insight.id}
          insight={insight}
          onDelete={handleDelete}
        />
      ))}

      {pagination.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={(p) => setSearchParams({ page: p })}
        />
      )}
    </div>
  );
};

export default InsightsList;