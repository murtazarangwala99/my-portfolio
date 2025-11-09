export default function TodoStats({ todos, active, completed }) {
  const total = todos.length;
  const progress = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  return (
    <div className="mt-8 bg-neutral-900 border border-neutral-700 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-neutral-800 rounded-xl">
          <div className="text-2xl font-bold text-white mb-1">{total}</div>
          <div className="text-sm text-neutral-400">Total Tasks</div>
        </div>

        <div className="text-center p-4 bg-neutral-800 rounded-xl">
          <div className="text-2xl font-bold text-orange-500 mb-1">{active.length}</div>
          <div className="text-sm text-neutral-400">Active Tasks</div>
        </div>

        <div className="text-center p-4 bg-neutral-800 rounded-xl">
          <div className="text-2xl font-bold text-green-500 mb-1">{completed.length}</div>
          <div className="text-sm text-neutral-400">Completed</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm text-neutral-400 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="w-full bg-neutral-700 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
