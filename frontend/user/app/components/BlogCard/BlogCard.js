"use client";
import styles from "./BlogCard.module.css";

const BlogCard = ({ blog }) => {
  return (
    <div
      className={styles.card}
      onClick={() => window.open(blog.url, "_blank")}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.description}>{blog.description}</p>
        <span className={styles.source}>Source: {blog.source}</span>
      </div>
    </div>
  );
};

export default BlogCard;
