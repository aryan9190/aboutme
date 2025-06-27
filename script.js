document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("mode-toggle");

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    );
  });

  const username = "aryan9190";
  const projectGrid = document.getElementById("project-grid");

  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      const filtered = repos
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => {
          const scoreA = (a.stargazers_count || 0) + (a.forks_count || 0);
          const scoreB = (b.stargazers_count || 0) + (b.forks_count || 0);
          return scoreB - scoreA;
        })
        .slice(0, 6);

      projectGrid.innerHTML = "";
      if (!filtered.length) {
        projectGrid.innerHTML = "<p>No public projects found.</p>";
        return;
      }

      filtered.forEach((repo) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h4>${repo.name}</h4>
          <p>${repo.description || "No description available."}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub 🡕</a>
        `;
        projectGrid.appendChild(card);
      });
    })
    .catch((err) => {
      projectGrid.innerHTML = "<p>⚠️ Failed to load projects.</p>";
      console.error(err);
    });
});
