document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menuIcon");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");


    // ✅ Open Sidebar
    menuIcon.addEventListener("click", function () {
        sidebar.classList.add("show");
    });

    // ✅ Close Sidebar
    closeSidebar.addEventListener("click", function () {
        sidebar.classList.remove("show");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // ✅ Check if dark mode is already enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // ✅ Toggle Dark Mode on Button Click
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // ✅ Save user preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

// for checkbox
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("#ingredient-list input");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                checkbox.parentElement.style.textDecoration = "line-through";
            } else {
                checkbox.parentElement.style.textDecoration = "none";
            }
        });
    });
});

// for filter
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.getElementById("menuIcon");
    const closeSidebar = document.getElementById("closeSidebar");
    const searchContainer = document.getElementById("searchContainer");
    const searchButton = document.getElementById("searchButton");
    const searchBar = document.getElementById("searchBar");
    const filterDropdown = document.getElementById("filter");
    const filterSidebar = document.getElementById("filterSidebar");

    // ✅ Open Sidebar on Menu Click
    menuIcon.addEventListener("click", function () {
        sidebar.classList.add("show");
    });

    // ✅ Close Sidebar on Close Button Click
    closeSidebar.addEventListener("click", function () {
        sidebar.classList.remove("show");
    });

    // ✅ Toggle Search Bar on Small Screens
    searchButton.addEventListener("click", function () {
        if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
            searchContainer.style.display = "block";
        } else {
            searchContainer.style.display = "none";
        }
    });

    // ✅ Function to Apply Filter
    function applyFilter(selectedFilter) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("q");

        if (selectedFilter === "no-filter") {
            // ✅ Remove filter from URL if "No Filter" is selected
            urlParams.delete("filter");
        } else {
            // ✅ Set new filter in URL
            urlParams.set("filter", selectedFilter);
        }

        // ✅ Maintain search query if it exists
        const newUrl = searchQuery ? `search.html?q=${encodeURIComponent(searchQuery)}&${urlParams.toString()}` : `search.html?${urlParams.toString()}`;
        window.location.href = newUrl;
    }

    // ✅ Set Default Selected Filter Based on URL (Fix for Retaining Selection)
    function setDefaultFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        const currentFilter = urlParams.get("filter") || "no-filter"; // ✅ Default "No Filter" if no filter applied

        // ✅ Set filter in Navbar Dropdown
        if (filterDropdown) {
            filterDropdown.innerHTML = `
                <option value="no-filter">Select Filter</option>
                <option value="all">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="fastfood">Fast Food</option>
            `;
            filterDropdown.value = currentFilter;
        }

        // ✅ Set filter in Sidebar Dropdown
        if (filterSidebar) {
            filterSidebar.innerHTML = `
                <option value="no-filter">Select Filter</option>
                <option value="all">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="fastfood">Fast Food</option>
            `;
            filterSidebar.value = currentFilter;
        }
    }

    // ✅ Move Filter to Sidebar on Small Screens
    function moveFilter() {
        if (window.innerWidth <= 768) {
            filterSidebar.innerHTML = filterDropdown.innerHTML;
            filterSidebar.addEventListener("change", function () {
                applyFilter(filterSidebar.value);
            });
        } else {
            filterDropdown.addEventListener("change", function () {
                applyFilter(filterDropdown.value);
            });
        }
    }

    // ✅ Initialize Functions on Page Load
    setDefaultFilter();
    moveFilter();
    window.addEventListener("resize", moveFilter);
});



// for favrites
document.addEventListener("DOMContentLoaded", function () {
    const favButtons = document.querySelectorAll(".fav-btn");

    // ✅ Load saved favorites from localStorage
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favButtons.forEach(button => {
        let recipeTitle = button.getAttribute("data-title");

        // ✅ If already favorite, show red heart ❤️
        if (savedFavorites.includes(recipeTitle)) {
            button.textContent = "❤️";
        }

        // ✅ Toggle Favorite on Click
        button.addEventListener("click", function () {
            if (savedFavorites.includes(recipeTitle)) {
                // Remove from favorites
                savedFavorites = savedFavorites.filter(fav => fav !== recipeTitle);
                button.textContent = "🤍"; // White heart
            } else {
                // Add to favorites
                savedFavorites.push(recipeTitle);
                button.textContent = "❤️"; // Red heart
            }

            // ✅ Save updated favorites to localStorage
            localStorage.setItem("favorites", JSON.stringify(savedFavorites));
        });
    });
});




document.getElementById("searchIcon").addEventListener("click", function () {
    let searchContainer = document.querySelector(".search-container");
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
        searchContainer.style.display = "block";
    } else {
        searchContainer.style.display = "none";
    }
});
