"use client";
import { useEffect, useState } from "react";

import ProjectCard from "../components/ProjectCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Image from "next/image"; // Removed unused import

interface Repo {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  topics?: string[];
  html_url?: string;
  homepage?: string;
}

export default function CatalogPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("stars");
  const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const basePath = process.env.NODE_ENV === 'production' ? '/oss_catalog' : '';
  useEffect(() => {
    fetch(`${basePath}/repos.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load repositories...");
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [basePath]);

  const filteredRepos = repos
    .filter((repo: Repo) =>
      (repo.name.toLowerCase().includes(search.toLowerCase()) ||
       (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))) &&
      (language ? repo.language === language : true) &&
      (topic ? repo.topics && repo.topics.includes(topic) : true)
    )
    .sort((a: Repo, b: Repo) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "forks") return b.forks_count - a.forks_count;
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / pageSize));
  const pagedRepos = filteredRepos.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, sort, language, topic]);

  const languages = Array.from(new Set(repos.map((r: Repo) => r.language))).filter((lang): lang is string => !!lang);
  const topics = Array.from(new Set(repos.flatMap((r: Repo) => r.topics || []))).sort();

  // Removed unused variables: repoCount, totalStars, totalForks, mostPopularLanguage

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Inter, Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3eaf2 100%)",
      }}
    >
      <Header />
      {/* Hero Section without summary stats box */}
      <section
        style={{
          width: "100%",
          padding: "2.5rem 2rem 2rem 2rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
          backgroundImage:
            `linear-gradient(90deg, rgba(245, 247, 250, 0.95) 0%, rgba(227, 234, 242, 0.85) 30%, rgba(227, 234, 242, 0.0) 80%), url(${process.env.NODE_ENV === 'production' ? '/oss_catalog/img/bg_3.jpg' : '/img/bg_3.jpg'})`,
          backgroundSize: "100%",
          backgroundPosition: "0% 68%",
          backgroundRepeat: "no-repeat",
          position: "relative",
          minHeight: 250,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontFamily: "Segoe UI",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#15353F",
              margin: 0,
              marginBottom: "0.75rem",
              letterSpacing: "-0.5px",
            }}
          >
            Explore Open Source Projects
          </h2>
          <p
            style={{
              fontFamily: "Segoe UI",
              fontSize: "1rem",
              color: "#444",
              maxWidth: 700,
              marginBottom: "1.25rem",
              fontWeight: 400,
            }}
          >
            Browse, filter, and learn about open source software created by our company. Find projects by topic, language, and popularity. Click a project card to learn more about the open source project. You can browse the code on GitHub and learn how to contribute.
          </p>
        </div>
      </section>
      <main
        style={{
          backgroundColor: "white",
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "2rem",
          width: "100%",
        }}
      >
        {/* Left navigation */}
        <nav
          style={{
            minWidth: 260,
            maxWidth: 300,
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(25,118,210,0.07)",
            padding: "2rem 1.5rem",
            marginRight: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            border: "1px solid #e0e0e0",
            height: "fit-content",
            fontFamily: "Segoe UI, Inter, Arial, sans-serif",
          }}
        >
          <div>
            <label
              htmlFor="search"
              style={{
                fontWeight: 700,
                color: "#222",
                fontSize: "1em",
                letterSpacing: "0.5px",
              }}
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects or descriptions..."
              style={{
                width: "100%",
                marginTop: 6,
                padding: "0.35rem 0.75rem",
                borderRadius: 6,
                border: "1px solid #d0d7de",
                fontSize: "0.95rem",
                fontFamily: "Segoe UI, Inter, Arial, sans-serif",
                color: "#222",
                background: "#fff",
                outline: "none",
                boxShadow: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#15353F")}
              onBlur={(e) => (e.target.style.borderColor = "#d0d7de")}
            />
          </div>
          <div>
            <label
              htmlFor="sort"
              style={{
                fontWeight: 700,
                color: "#222",
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Sort By
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "0.35rem 0.75rem",
                borderRadius: 6,
                border: "1px solid #d0d7de",
                fontSize: "0.95rem",
                fontFamily: "Segoe UI, Inter, Arial, sans-serif",
                color: "#222",
                background: "#fff",
                outline: "none",
                boxShadow: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#15353F")}
              onBlur={(e) => (e.target.style.borderColor = "#d0d7de")}
            >
              <option value="name">Name</option>
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="language"
              style={{
                fontWeight: 700,
                color: "#222",
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Filter by Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "0.35rem 0.75rem",
                borderRadius: 6,
                border: "1px solid #d0d7de",
                fontSize: "0.95rem",
                fontFamily: "Segoe UI, Inter, Arial, sans-serif",
                color: "#222",
                background: "#fff",
                outline: "none",
                boxShadow: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#15353F")}
              onBlur={(e) => (e.target.style.borderColor = "#d0d7de")}
            >
              <option value="">All</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="topic"
              style={{
                fontWeight: 700,
                color: "#222",
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Filter by Topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{
                width: "100%",
                marginTop: 6,
                padding: "0.35rem 0.75rem",
                borderRadius: 6,
                border: "1px solid #d0d7de",
                fontSize: "0.95rem",
                fontFamily: "Segoe UI, Inter, Arial, sans-serif",
                color: "#222",
                background: "#fff",
                outline: "none",
                boxShadow: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#15353F")}
              onBlur={(e) => (e.target.style.borderColor = "#d0d7de")}
            >
              <option value="">All</option>
              {topics.map((t: string) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </nav>
        {/* Main content */}
        <section
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            fontFamily: "Segoe UI, Inter, Arial, sans-serif",
          }}
        >
          {loading && (
            <p style={{ fontSize: "1.1rem", color: "#15353F", fontWeight: 500 }}>
              Loading catalog...
            </p>
          )}
          {error && (
            <p style={{ color: "#d32f2f", fontWeight: 600 }}>Error: {error}</p>
          )}
          {!loading && !error && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2rem",
                  width: "100%",
                  maxWidth: "1200px",
                  gridAutoRows: "1fr"
                }}
              >
                {pagedRepos.map((repo: Repo) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    topic={topic}
                    setTopic={setTopic}
                  />
                ))}
              </div>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    margin: "2rem 0",
                  }}
                >
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="site-pagination-nav-btn"
                  >
                    Previous
                  </button>
                  {/* Page number buttons with ellipsis */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {(() => {
                      const pageButtons = [];
                      const siblings = 2;
                      if (totalPages <= 7) {
                        for (let p = 1; p <= totalPages; p++) {
                          pageButtons.push(p);
                        }
                      } else {
                        // Always show first, last, current, and 2 siblings
                        pageButtons.push(1);
                        if (page > siblings + 2) pageButtons.push('...');
                        for (let p = Math.max(2, page - siblings); p <= Math.min(totalPages - 1, page + siblings); p++) {
                          if (p === 2 && page > siblings + 2) pageButtons.push(2);
                          pageButtons.push(p);
                        }
                        if (page < totalPages - siblings - 1) pageButtons.push('...');
                        pageButtons.push(totalPages);
                      }
                      return pageButtons.map((p, idx) =>
                        p === '...'
                          ? <span key={"ellipsis-" + idx} style={{ padding: "0.5rem 0.75rem", color: "#888", fontWeight: 600 }}>...</span>
                          : <button
                              key={p}
                              onClick={() => typeof p === 'number' && setPage(p)}
                              disabled={p === page}
                              className={p === page ? "site-pagination-btn site-pagination-btn-active" : "site-pagination-btn"}
                            >
                              {p}
                            </button>
                      );
                    })()}
                  </div>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="site-pagination-nav-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
