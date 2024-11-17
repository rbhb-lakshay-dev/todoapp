import React, { useState, useEffect } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import { databases } from "../appwrite/appwriteConfig"; // import databases from appwriteConfig

function Profile() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null); // Initialize state for user details
  const [todos, setTodos] = useState([]); // State to manage todos
  const [loader, setLoader] = useState(true); // State for loading status

  // Fetch user details
  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (response) {
        setUserDetails(response); // Set the user details after fetching
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  // Fetch todos when the component is mounted
  useEffect(() => {
    setLoader(true);
    const getTodos = databases.listDocuments(
      "6738c2fb000c0ee4a82a", // Your collection ID
      "6738c30c0016080e3370" // Your database ID
    );

    getTodos.then(
      function (response) {
        setTodos(response.documents); // Set the todos once fetched
        setLoader(false); // Hide the loader after the todos are loaded
      },
      function (error) {
        console.log(error);
        setLoader(false); // Hide the loader even if there's an error
      }
    );
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Log out the current user
      navigate("/"); // Redirect to the login page after logging out
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete todo
  const deleteTodo = (id) => {
    const promise = databases.deleteDocument(
      "6738c2fb000c0ee4a82a", // Your collection ID
      "6738c30c0016080e3370", // Your database ID
      id
    );

    promise.then(
      function (response) {
        console.log(response);
        // Remove the deleted todo from the state
        setTodos(todos.filter((todo) => todo.$id !== id));
      },
      function (error) {
        console.log(error);
      }
    );
  };

  // Handle adding a new todo
  const handleAddTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]); // Update the state to include the new todo
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetails.name}</p>
            </div>
            <div>
              <button
                className="bg-red-400 text-white p-1 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* TODO FORM */}
          <TodoForm onAddTodo={handleAddTodo} />

          {/* TODOS BOX */}
          <Todos todos={todos} loader={loader} deleteTodo={deleteTodo} />
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  );
}

export default Profile;
