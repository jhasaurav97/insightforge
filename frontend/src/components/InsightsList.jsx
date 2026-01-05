import { useEffect, useState } from 'react';
import api from '../services/api';
import { Brain } from 'lucide-react';

const InsightsList = () => {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInsights = async () => {
        setLoading(true);

        try {
            const res = await api.get("ai/insights?page=1&limit=5");
            setInsights(res.data.data.insights);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInsights();
        window.addEventListener("refresh-insights", fetchInsights);
        return () =>
            window.removeEventListener("refresh-insights", fetchInsights);
    }, []);

    if (loading) {
        return (
            <div className='text-sm text-gray-500'>Loading insights...</div>
        )
    }

    if(insights.length === 0){
        return (
            <div className='rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-500'>
                No insights yet. Try analyzing something.
            </div>
        )
    }

  return (
    <div className='space-y-4'>
          {insights.map((item) => (
              <div
                  key={item.id}
              className='rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                      <Brain size={16} className='text-indigo-600' />
                      <span className='text-sm font-medium'>AI Insight</span>
                  </div>

                  <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
                      {item.input}
                  </p>

                  <pre className='text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto'>
                      {item.output}
                  </pre>

                  <div className='text-xs text-gray-500 mt-2'>
                      {new Date(item.createdAt).toLocaleString()}
                  </div>
          </div>
      ))}
    </div>
  )
}

export default InsightsList;
