import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";
import TodoStats from "./TodoStats";

export default function SimpleTodo() {
  // ---------- State ----------
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  // ---------- Persist data ----------
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ---------- Core logic ----------
  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text: text.trim(), completed: false };
    setTodos([newTask, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id, newText) => {
    if (!newText.trim()) return;
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t)));
  };

  const clearCompleted = () => setTodos(todos.filter((t) => !t.completed));
  const markAllComplete = () => setTodos(todos.map((t) => ({ ...t, completed: true })));

  // 🆕 Clear All Tasks (with confirmation)
  const clearAll = () => {
    if (todos.length === 0) return;
    const confirmClear = window.confirm(
      "Are you sure you want to delete ALL tasks? This cannot be undone."
    );
    if (confirmClear) setTodos([]);
  };

  // ---------- Filters ----------
  const getFilteredTodos = () => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  };

  const filtered = getFilteredTodos();
  const active = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Todo List</h1>
          <p className="text-neutral-400">
            Stay organized and get things done over a cup of chai
          </p>
        </div>

        {/* Input Section */}
        <TodoInput addTodo={addTodo} />

        {/* Filter Tabs */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-2 mb-6">
          <div className="flex space-x-1">
            {[
              { key: "all", label: "All", count: todos.length },
              { key: "active", label: "Active", count: active.length },
              { key: "completed", label: "Completed", count: completed.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={
                  "flex-1 px-4 py-2.5 rounded-xl font-medium flex justify-center space-x-2 transition-colors " +
                  (filter === tab.key
                    ? "bg-orange-500 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800")
                }>
                <span>{tab.label}</span>
                <span
                  className={
                    "px-2 py-0.5 rounded-full text-xs " +
                    (filter === tab.key
                      ? "bg-orange-600 text-white"
                      : "bg-neutral-700 text-neutral-300")
                  }>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No todos found</h3>
            <p className="text-neutral-400">
              {filter === "all" && "Add your first todo to get started"}
              {filter === "active" && "All tasks completed! Great job!"}
              {filter === "completed" && "No completed tasks yet"}
            </p>
          </div>
        ) : (
          <TodoList
            todos={filtered}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )}

        {/* Footer Actions + Stats */}
        {todos.length > 0 && (
          <>
            <TodoFooter
              todos={todos}
              active={active}
              completed={completed}
              markAllComplete={markAllComplete}
              clearCompleted={clearCompleted}
              clearAll={clearAll}
            />

            {/* 🆕 Restored Statistics Card */}
            <TodoStats todos={todos} active={active} completed={completed} />
          </>
        )}
      </div>
    </div>
  );
}
