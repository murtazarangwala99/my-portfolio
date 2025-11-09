import { useState } from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    editTodo(todo.id, text);
    setIsEditing(false);
  };

  return (
    <div
      className={
        "p-4 flex items-center space-x-4 hover:bg-neutral-800/50 transition-colors duration-200 " +
        (todo.completed ? "opacity-60" : "")
      }>
      <button
        onClick={() => toggleTodo(todo.id)}
        className={
          "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors duration-200 " +
          (todo.completed
            ? "bg-orange-500 border-orange-500 text-white"
            : "border-neutral-600 hover:border-orange-500")
        }>
        {todo.completed && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex space-x-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setIsEditing(false);
              }}
              className="flex-1 px-3 py-2 bg-neutral-800 border-2 border-orange-500 rounded-lg text-white outline-none"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <p
            className={
              "text-base cursor-pointer " +
              (todo.completed ? "line-through text-neutral-500" : "text-white")
            }
            onClick={() => toggleTodo(todo.id)}>
            {todo.text}
          </p>
        )}
      </div>

      {!isEditing && (
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
