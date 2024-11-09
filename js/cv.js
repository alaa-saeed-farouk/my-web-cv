window.addEventListener("scroll", scrollProgress);
// Page Scroll Progress
function scrollProgress() {
  let scrollProg = document.querySelector(".scroller");
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  scrollProg.style.width = `${(scrollY / height) * 100}%`;
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-box");
let mainNav = document.querySelector(".main-nav");
toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  // Toggle Class menu-open on Button
  this.classList.toggle("menu-open");
  // Toggle Class open on Links
  mainNav.classList.toggle("open");
};
// Click Anywhere Outside Menu and Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== mainNav) {
    // Check if Menu Is Open
    if (mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      toggleBtn.classList.remove("menu-open");
    }
  }
});
// Stop Propagation on Menu
mainNav.onclick = function (e) {
  e.stopPropagation();
};

// Fetch My Projects From Github
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.addEventListener("click", () => {
  getRepos();
});

// Get Repos Function
async function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = `<span>Please Write Github Username.</span>`;
  } else {
    try {
      let myData = await fetch(
        `https://api.github.com/users/${theInput.value}/repos`
      );
      let repositories = await myData.json();
      // Empty The Container
      reposData.innerHTML = "";
      // Loop On Repositories
      repositories.forEach((repo) => {
        // Create The Main Div Element
        let mainDiv = document.createElement("div");
        // Create Repo Name Text
        let repoName = document.createTextNode(repo.name);
        // Create Repo URL Anchor Tag
        let theUrl = document.createElement("a");
        // Create Repo Url Text
        let theUrlText = document.createTextNode("Visit Repo");
        // Append The Repo Url Text To Anchor Tag
        theUrl.append(theUrlText);
        // Add The href Attribute
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
        // Set The Target Attribute
        theUrl.setAttribute("target", "_blank");
        // Create Site URL
        let siteUrl = document.createElement("a");
        // Create Site Url Text
        let siteUrlText = document.createTextNode("Visit Site");
        // Add Site Url Text To Anchor Tag
        siteUrl.append(siteUrlText);
        // Add The href Attribute To The Site Url
        siteUrl.href = `https://${theInput.value}.github.io/${repo.name}`;
        // Set The Target Attribute
        siteUrl.setAttribute("target", "_blank");
        //  Append The Text, The Url Anchor and the Site Url To Main Div
        mainDiv.append(repoName, siteUrl, theUrl);
        // Add Class To Main Div
        mainDiv.className = "repo-box";
        // Append the Main Div To Container
        reposData.appendChild(mainDiv);
      });
    } catch (reason) {
      console.log(reason);
      reposData.innerHTML = `<span>Please Write a Valid Github Username.</span>`;
    }
  }
}

// Handling CV Download
let btnPDF = document.getElementById("cv-pdf");
btnPDF.addEventListener("click", () => {
  let link = document.createElement("a");
  link.href = "files/alaa-saeed.pdf";
  link.download = "alaa saeed.pdf";
  link.click();
});

// Scroll To Top
window.addEventListener("scroll", scrollToTop);
function scrollToTop() {
  let btn = document.querySelector(".scroll-top");
  if (window.scrollY >= 500) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}

// Set The Year Of Copy Right
let dateNow = new Date();
let updateYear = document.querySelector(".copy-right .year");
updateYear.innerHTML = `${dateNow.getFullYear()}`;
