// API (JSON dataset)
const API_URL = "./data.json";

let tools = [];
let filteredTools = [];

const container = document.getElementById("toolsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortOption = document.getElementById("sortOption");

// Fetch Data
async function fetchTools() {
  try {
    container.innerHTML = "<p>Loading AI Tools...</p>";

    const res = await fetch(API_URL);
    const data = await res.json();

    tools = data;
    filteredTools = [...tools];

    displayTools(tools);
  } catch (error) {
    container.innerHTML = "<p>Error loading data</p>";
  }
}

// Display
function displayTools(data) {
  container.innerHTML = "";

  data.forEach(tool => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p><b>Category:</b> ${tool.category || "General"}</p>
      <p>${tool.description || "No description available"}</p>
    `;

    container.appendChild(card);
  });
}

// Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(value)
  );

  applyFilters();
});

// Filter + Sort
categoryFilter.addEventListener("change", applyFilters);
sortOption.addEventListener("change", applyFilters);

function applyFilters() {
  let result = [...filteredTools];

  // Category Filter
  if (categoryFilter.value !== "all") {
    result = result.filter(tool =>
      (tool.category || "").toLowerCase().includes(categoryFilter.value)
    );
  }

  // Sort
  if (sortOption.value === "az") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption.value === "za") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  displayTools(result);
}

// Start
fetchTools();