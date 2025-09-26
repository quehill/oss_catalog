import fs from 'fs';
import fetch from 'node-fetch';

async function fetchAllRepos() {
  let allRepos = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`https://api.github.com/orgs/github/repos?per_page=100&page=${page}`, {
      headers: { Accept: "application/vnd.github.mercy-preview+json" }
    });
    if (!res.ok) throw new Error("Failed to fetch repositories");
    const data = await res.json();
    allRepos = allRepos.concat(data);
    if (data.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }
  fs.writeFileSync('public/repos.json', JSON.stringify(allRepos, null, 2));
  console.log(`Saved ${allRepos.length} repos to public/repos.json`);
}

fetchAllRepos().catch(err => {
  console.error(err);
  process.exit(1);
});
