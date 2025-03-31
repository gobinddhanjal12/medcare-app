"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ setFilters }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("name") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get("name") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("name", query.trim());
    } else {
      params.delete("name");
    }

    router.push(`?${params.toString()}`, { scroll: false });

    setFilters((prev) => ({
      ...prev,
      name: query.trim() || undefined,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <Search className={styles.icon} />
      <input
        type="text"
        placeholder="Search doctors by name..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;