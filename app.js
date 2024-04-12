const apiKey = "Z2iBWKF78oajXc1XfSQ1gOKkW9zsGq0oTsPvdvLQYRQ";
const form = document.querySelector("form");
const userInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.querySelector('#show-more-btn');
let inputData;
let page = 1;

async function searchImages() {
    inputData = userInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
    // console.log(url);
    const result = await fetch(url);
    const data = await result.json();

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imgWraper = document.createElement("div");
        imgWraper.classList.add("result-card");
        const imgae = document.createElement("img");
        imgae.src = result.urls.small;
        imgae.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imgWraper.appendChild(imgae);
        imgWraper.appendChild(imgLink);
        searchResults.appendChild(imgWraper);
    });
    page++;

    // console.log(page);

    // console.log(results);
    if (page > 1) {
        showMoreBtn.style.display = "block";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () => {
    searchImages();
})

document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchImages();
    }
})