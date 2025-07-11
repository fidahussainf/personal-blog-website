import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import SignUp from "./pages/SignUp";
import EditBlog from "./pages/EditBlog";
import UserList from "./pages/UserList";
import BlogDetails from "./pages/BlogDetails";
import MainLayout from "./components/MainLayout";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {user && (
        <Route element={<MainLayout />}>
          <Route
            path="/create-blog"
            element={user.role === "ADMIN" && <CreateBlog />}
          />
          <Route
            path="/edit-blog/:id"
            element={user.role === "ADMIN" && <EditBlog />}
          />
          <Route
            path="/users"
            element={user.role === "ADMIN" && <UserList />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;