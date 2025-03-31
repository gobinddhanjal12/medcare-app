"use client";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard/BlogCard";
import styles from "./styles.module.css";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?category=health&country=us&pageSize=10&apiKey=${API_KEY}`;

const HealthBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === "ok") {
          const formattedBlogs = data.articles.map((article) => ({
            title: article.title,
            description: article.description || "No description available.",
            image: article.urlToImage || "/placeholder.png",
            url: article.url,
            source: article.source.name,
          }));
          setBlogs(formattedBlogs);
        } else {
          throw new Error("Failed to fetch blogs");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading health blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.blogContainer}>
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
};

export default HealthBlogs;
