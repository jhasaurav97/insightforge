import AiInput from "../components/AiInput";
import InsightsList from "../components/InsightsList";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze your thoughts and track AI insights
        </p>
      </div>
      <AiInput />
      <InsightsList />
    </div>
  );
};

export default Dashboard;