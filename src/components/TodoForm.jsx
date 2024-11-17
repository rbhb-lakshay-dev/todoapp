import React, { useState } from "react";
import { databases } from "../appwrite/appwriteConfig"; // Make sure Appwrite is correctly imported

function TodoForm({ onAddTodo }) {
  const [todo, setTodo] = useState(""); // State to manage the input value

  // Handle the change in the input field
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo) return; // Don't submit if the todo is empty

    try {
      // Call Appwrite API to create a new todo document
      const response = await databases.createDocument(
        "6738c2fb000c0ee4a82a", // Database ID
        "6738c30c0016080e3370", // Collection ID
        "unique()", // Generate a unique ID for the todo
        {
          todo, // Add the new todo's content
        }
      );
      // After creating, pass the new todo to the parent via onAddTodo
      onAddTodo(response); // Callback to update the todos list in Profile
      setTodo(""); // Clear the input field after adding
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
