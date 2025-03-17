document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q")?.toLowerCase();
    const filter = urlParams.get("filter") || "no-filter"; // ✅ Default "No Filter" if empty
    const searchQuerySpan = document.getElementById("searchQuery");
    const searchResultsDiv = document.getElementById("searchResults");
    const filterDropdown = document.getElementById("filter");
    const filterSidebar = document.getElementById("filterSidebar");

    // ✅ Ensure filter dropdown exists before setting value
    function setDropdownOptions(dropdown) {
        if (!dropdown) return;
        dropdown.innerHTML = `
            <option value="no-filter">No Filter</option>
            <option value="all">All</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="fastfood">Fast Food</option>
        `;
        dropdown.value = filter;
    }

    setDropdownOptions(filterDropdown);
    setDropdownOptions(filterSidebar);

    // ✅ Display correct search query or filter
    if (query) {
        searchQuerySpan.textContent = `Results for: "${query}"`;
    } else if (filter !== "all" && filter !== "no-filter") {
        searchQuerySpan.textContent = `Filtered by: "${filter}"`;
    } else {
        searchQuerySpan.textContent = "All Recipes"; // ✅ Default when no filter
    }

    // ✅ Sample Recipe Data
    const recipes = [
        { title: "Pasta Primavera", image: "./image/pasta.jpg", link: "viewRecipePasta.html", category: "vegetarian" },
        { title: "Classic Margherita Pizza", image: "./image/pizza.jpg", link: "viewRecipePizza.html", category: "vegetarian" },
        { title: "Gourmet Cheeseburger", image: "./image/burger.jpg", link: "viewRecipeBurger.html", category: "fastfood" }
    ];

    let filteredRecipes = recipes;

    // ✅ Apply search filter if there's a query
    if (query) {
        filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(query));
    }

    // ✅ Apply category filter if selected and not "all" or "no-filter"
    if (filter !== "all" && filter !== "no-filter") {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.category === filter);
    }

    // ✅ Display Results
    searchResultsDiv.innerHTML = "";
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => {
            const recipeCard = `
                <div class="home-recipe-card">
                    <a href="${recipe.link}">
                        <img src="${recipe.image}" alt="${recipe.title}" />
                    </a>
                    <h3>${recipe.title}</h3>
                </div>
            `;
            searchResultsDiv.innerHTML += recipeCard;
        });
    } else {
        searchResultsDiv.innerHTML = "<p>No results found.</p>";
    }

    // ✅ Handle filter change event for both dropdowns
    function handleFilterChange(event) {
        const selectedFilter = event.target.value;
        const searchQuery = urlParams.get("q");

        if (selectedFilter === "no-filter") {
            urlParams.delete("filter"); // ✅ Remove filter if "No Filter" selected
        } else {
            urlParams.set("filter", selectedFilter);
        }

        // ✅ Maintain search query if present
        const newUrl = searchQuery ? `search.html?q=${encodeURIComponent(searchQuery)}&${urlParams.toString()}` : `search.html?${urlParams.toString()}`;
        window.location.href = newUrl;
    }

    if (filterDropdown) filterDropdown.addEventListener("change", handleFilterChange);
    if (filterSidebar) filterSidebar.addEventListener("change", handleFilterChange);
});
