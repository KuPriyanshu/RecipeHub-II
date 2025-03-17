document.addEventListener("DOMContentLoaded", function () {
    // Sidebar Toggle
    const menuIcon = document.getElementById("menuIcon");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");

    if (menuIcon && sidebar && closeSidebar) {
        menuIcon.addEventListener("click", () => sidebar.classList.add("show"));
        closeSidebar.addEventListener("click", () => sidebar.classList.remove("show"));
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        const body = document.body;
        if (localStorage.getItem("darkMode") === "enabled") body.classList.add("dark-mode");

        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });
    }

    // Checkbox Line-Through Effect
    document.querySelectorAll("#ingredient-list input").forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            checkbox.parentElement.style.textDecoration = checkbox.checked ? "line-through" : "none";
        });
    });

    // Search Bar Toggle
    const searchButton = document.getElementById("searchButton");
    const searchContainer = document.getElementById("searchContainer");

    if (searchButton && searchContainer) {
        searchButton.addEventListener("click", function () {
            searchContainer.style.display = (searchContainer.style.display === "none" || searchContainer.style.display === "") ? "block" : "none";
        });
    }

    // Filter Handling
    const filterDropdown = document.getElementById("filter");
    const filterSidebar = document.getElementById("filterSidebar");

    function applyFilter(selectedFilter) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("q");

        if (selectedFilter === "no-filter") {
            urlParams.delete("filter");
        } else {
            urlParams.set("filter", selectedFilter);
        }

        const newUrl = searchQuery ? `search.html?q=${encodeURIComponent(searchQuery)}&${urlParams.toString()}` : `search.html?${urlParams.toString()}`;
        window.location.href = newUrl;
    }

    function setDefaultFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        const currentFilter = urlParams.get("filter") || "no-filter";

        [filterDropdown, filterSidebar].forEach(filterElement => {
            if (filterElement) {
                filterElement.innerHTML = `
                    <option value="no-filter">Select Filter</option>
                    <option value="all">All</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="fastfood">Fast Food</option>
                `;
                filterElement.value = currentFilter;
            }
        });
    }

    function moveFilter() {
        if (window.innerWidth <= 768 && filterSidebar) {
            filterSidebar.innerHTML = filterDropdown.innerHTML;
            filterSidebar.addEventListener("change", () => applyFilter(filterSidebar.value));
        } else if (filterDropdown) {
            filterDropdown.addEventListener("change", () => applyFilter(filterDropdown.value));
        }
    }

    setDefaultFilter();
    moveFilter();
    window.addEventListener("resize", moveFilter);

    // Favorites Handling
    const favButtons = document.querySelectorAll(".fav-btn");
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favButtons.forEach(button => {
        let recipeTitle = button.getAttribute("data-title");

        if (savedFavorites.includes(recipeTitle)) button.textContent = "❤️";

        button.addEventListener("click", function () {
            if (savedFavorites.includes(recipeTitle)) {
                savedFavorites = savedFavorites.filter(fav => fav !== recipeTitle);
                button.textContent = "🤍";
            } else {
                savedFavorites.push(recipeTitle);
                button.textContent = "❤️";
            }
            localStorage.setItem("favorites", JSON.stringify(savedFavorites));
        });
    });
    
});

    // Search Icon Toggle
document.getElementById("searchIcon").addEventListener("click", function () {
    let searchContainer = document.querySelector(".search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
        searchContainer.style.display = "block";
    } else {
        searchContainer.style.display = "none";
    }
});
