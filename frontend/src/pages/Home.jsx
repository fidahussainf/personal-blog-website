import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blog";
import BlogList from "../components/BlogList";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
  getAllBlogs()
    .then((res) => {
      setBlogs(res);
    })
    .catch((err) => {   
      console.error("Failed to fetch blogs:", err);
    });
  }, []);

  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
}