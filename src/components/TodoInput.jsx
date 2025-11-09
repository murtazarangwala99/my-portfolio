import { useState } from "react";
import { Plus } from "lucide-react";

export default function TodoInput({ addTodo }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    addTodo(value);
    setValue("");
  };

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 mb-6">
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a new todo..."
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="w-full px-4 py-3.5 bg-neutral-800 border-2 border-neutral-600 hover:border-neutral-500 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none transition-colors"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
}
