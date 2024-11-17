import React from "react";

function Todos({ todos, loader, deleteTodo }) {
  // If the todos are still loading, show a loading message
  if (loader) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {/* If there are no todos, show a message */}
      {todos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <div>
          {todos.map((item) => (
            <div
              key={item.$id}
              className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1"
            >
              <div>
                <p>{item.todo}</p>
              </div>
              <div>
                <span
                  className="text-red-400 cursor-pointer"
                  onClick={() => {
                    deleteTodo(item.$id); // Trigger the delete function passed from the parent
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
