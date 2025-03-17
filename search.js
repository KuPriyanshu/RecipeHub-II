document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const searchContainer = document.getElementById("searchContainer");
    const searchIcon = document.getElementById("searchIcon"); // ✅ Corrected selector

    // Enter key to search
    searchBar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {  
            const query = searchBar.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });

    // Click search icon to toggle search bar
    searchIcon.addEventListener("click", function () {
        if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
            searchContainer.style.display = "block"; // ✅ Show search bar
        } else {
            searchContainer.style.display = "none"; // ✅ Hide search bar
        }
    });
});

