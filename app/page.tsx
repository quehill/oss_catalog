
"use client";
import { useEffect, useState } from "react";

// Internal components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import Image from "next/image";
const basePath = process.env.NODE_ENV === 'production' ? '/oss_catalog' : '';

// Type for repository objects
interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  topics?: string[];
  html_url?: string;
  homepage?: string;
}


function SummaryStatsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    fetch("/repos.json")
      .then(res => res.json())
      .then(data => setRepos(data));
  }, []);
  const repoCount = repos.length;
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const languageCounts: Record<string, number> = {};
  repos.forEach((r: Repo) => {
    if (r.language) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
    }
  });
  const mostPopularLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  return (
  <div style={{ flex: 1.1, minWidth: 260, maxWidth: 380 }}>
      <h2 style={{
        fontFamily: "Segoe UI",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#15353F",
        margin: 0,
        marginBottom: "1.25rem",
        letterSpacing: "-0.5px",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}>
  <Image src={`${basePath}/img/chart.svg`} alt="Summary Statistics" width={28} height={28} style={{ verticalAlign: "middle" }} />
        Summary Statistics
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.7rem 1.1rem",
        width: "100%"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <Image src={`${basePath}/img/star-solid-full.svg`} alt="Total Stars" width={28} height={28} />
          <div>
            <span style={{ fontSize: "0.8rem", color: "#444" }}>Total Stars</span><br />
            <span style={{ fontSize: "1.08rem", fontWeight: 700, color: "#15353F" }}>{totalStars}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <Image src={`${basePath}/img/code-fork-solid-full.svg`} alt="Total Forks" width={28} height={28} />
          <div>
            <span style={{ fontSize: "0.8rem", color: "#444" }}>Total Forks</span><br />
            <span style={{ fontSize: "1.08rem", fontWeight: 700, color: "#15353F" }}>{totalForks}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <Image src={`${basePath}/img/github-dark.svg`} alt="Total Repos" width={28} height={28} />
          <div>
            <span style={{ fontSize: "0.8rem", color: "#444" }}>Total Repos</span><br />
            <span style={{ fontSize: "1.08rem", fontWeight: 700, color: "#15353F" }}>{repoCount}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <Image src={`${basePath}/img/code-solid-full.svg`} alt="Most Popular Language" width={28} height={28} />
          <div>
            <span style={{ fontSize: "0.8rem", color: "#444" }}>Most Popular Language</span><br />
            <span style={{ fontSize: "0.98rem", fontWeight: 700, color: "#15353F" }}>{mostPopularLanguage}</span>
          </div>
        </div>
      </div>
    </div>
  );
// ...existing code...
}


function FeaturedProjectsGrid({ repos }: { repos: Repo[] }) {
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      {topRepos.map((repo) => (
        <ProjectCard
          key={repo.id}
          repo={{
            ...repo,
            topics: repo.topics ?? [],
            html_url: repo.html_url ?? ""
          }}
          topic=""
          setTopic={() => {}}
        />
      ))}
    </div>
  );
}



function FeaturedProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/repos.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load repositories...");
        return res.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p style={{ color: "#1976d2", fontWeight: 500 }}>Loading featured projects...</p>;
  if (error)
    return <p style={{ color: "#d32f2f", fontWeight: 600 }}>Error: {error}</p>;

  return (
    <div>
      {!loading && !error && <FeaturedProjectsGrid repos={repos} />}
    </div>
  );
}

// Helper/stateless components are defined above

export default function Home() {

  return (
    <div className="homepage-root">
      <Header />
      {/* Hero Section */}
      <section className="hero">
        <h2 className="hero-title">
          Open Source at Our Company
        </h2>
        <p className="hero-desc">
          Explore our open data, research, and knowledge resources. We champion transparency and collaboration by making high-quality information and open source tools accessible to all. Harness our data and research to drive evidence-based solutions and advance innovation.
        </p>
      </section>
      {/* Explore Projects Section with side-by-side layout */}
      <section className="featured-section">
        <div style={{ flex: "0 1 420px", maxWidth: 420 }}>
          <h2 className="featured-title">Featured Open Source Projects</h2>
          <p className="featured-desc">
            Browse and discover open source projects created by our company. Use the full catalog to see more projects and to filter by topic, language, and popularity, and find projects that match your interests.
          </p>
          <a href="/catalog" className="catalog-btn">Browse the Catalog &rarr;</a>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <FeaturedProjects />
        </div>
      </section>
      {/* Call to Action + News Section */}
      <section className="homepage-bottom-section" style={{
        display: "flex",
        flexDirection: "row",
        gap: "2.5rem",
        width: "100%",
        background: "#fff",
        padding: "2rem 2rem 2rem 2rem",
        boxShadow: "0 2px 8px rgba(25,118,210,0.10)",
        borderBottom: "1px solid #e3eaf2",
        marginTop: "0.75rem"
      }}>
        {/* Get Involved Section */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="cta-section-title" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image src={`${basePath}/img/comments.svg`} alt="Get Involved" width={26} height={26} style={{ verticalAlign: "middle" }} />
            Get Involved!
          </h2>
          <p className="cta-section-desc">
            Interested in contributing, collaborating, or learning more? Explore our catalog, join the community, or reach out to help us build open solutions for global development. Your expertise and ideas can make a difference!
          </p>
          <div className="cta-section-btns">
            <a href="https://github.com/company" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-github">GitHub Community</a>
            <a href="mailto:opensource@company.com" className="cta-btn cta-btn-contact">Contact Us</a>
          </div>
        </div>
        {/* Divider */}
        <div style={{ width: "1px", background: "#e3eaf2", margin: "0 1.25rem", alignSelf: "stretch" }} />
        {/* Summary Statistics Section */}
        <SummaryStatsSection />
        {/* Divider */}
        <div style={{ width: "1px", background: "#e3eaf2", margin: "0 1.25rem", alignSelf: "stretch" }} />
        {/* Latest News and Updates Section */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{
            fontFamily: "Segoe UI",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#15353F",
            margin: 0,
            marginBottom: "1.25rem",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <Image src={`${basePath}/img/newspaper.svg`} alt="Latest News" width={26} height={26} style={{ verticalAlign: "middle" }} />
            Latest News & Updates
          </h2>
          <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
            <li style={{
              marginBottom: "1.25rem",
              padding: "0.25rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#1976d2",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1.08rem",
                  transition: "color 0.2s",
                  marginBottom: "0.25rem",
                  letterSpacing: "-0.5px"
                }}
                onMouseOver={e => (e.currentTarget.style.color = "#0d47a1")}
                onMouseOut={e => (e.currentTarget.style.color = "#1976d2")}
              >
                Opening Code, Opening Access: Our First Open Source Project
              </a>
              <span style={{
                color: "#888",
                fontSize: "0.97rem",
                fontWeight: 500,
                marginBottom: "0.15rem"
              }}>
                May 22, 2025
              </span>
              <span style={{
                color: "#444",
                fontSize: "0.97rem",
                marginTop: "0.15rem"
              }}>
                Read about our journey to open source in this blog post.
              </span>
            </li>
          </ul>
        </div>
      </section>
        <Footer />
      </div>
    );
  }