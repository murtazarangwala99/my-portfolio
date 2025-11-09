export default function TodoFooter({
  todos,
  active,
  completed,
  markAllComplete,
  clearCompleted,
  clearAll,
}) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="text-neutral-400 text-sm">
        {active.length} of {todos.length} tasks remaining
      </div>

      <div className="flex flex-wrap gap-3 justify-end">
        <button
          onClick={markAllComplete}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-600 hover:border-neutral-500 rounded-lg font-medium transition-colors">
          Mark All Complete
        </button>

        {completed.length > 0 && (
          <button
            onClick={clearCompleted}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
            Clear Completed ({completed.length})
          </button>
        )}

        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors">
          Delete All Tasks
        </button>
      </div>
    </div>
  );
}
