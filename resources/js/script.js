// DECLARATIONS
// navigation
const navToggle = document.querySelector("#nav-toggle");
const navClose = document.querySelector("#nav-close");
const navContainer = document.querySelector("#nav-container");

// shorten
const shortenBtn = document.querySelector("#shorten-btn");

//generated link
const generatedLink = document.querySelector(".generated-link");
const generatedUserLink = document.querySelector(".generated-link__user-link");
const generatedShortenLink = document.querySelector(
  ".generated-link__shorten-link"
);
const generatedCopyLinkBtn = document.querySelector("#btn-copy");

// FUNCTIONS
// navigation
const toggleMenu = () => {
  navContainer.classList.toggle("show-menu");
  navToggle.classList.toggle("display-none");
  navClose.classList.toggle("display-block");
};

// shorten
const getInputValue = (e) => {
  e.preventDefault();
  const shortenInput = document.querySelector("#shorten-input");
  const warningInformation = document.querySelector(".shorten__form");

  const getShortUrl = async () => {
    URL_API = `https://api.shrtco.de/v2/shorten?url=${shortenInput.value}`;
    try {
      const response = await fetch(URL_API);
      const data = await response.json();

      fullShortLink = data.result.full_short_link;
      originalLink = data.result.original_link;
      console.log(fullShortLink);
      shortenInput.value = "";

      if (fullShortLink) {
        generatedLink.style.display = "flex";
        generatedUserLink.textContent = originalLink;
        generatedShortenLink.textContent = fullShortLink;

        warningInformation.style.setProperty("--pseudo-display", "none");
        shortenInput.style.border = "none";
        shortenInput.classList.remove("red-color");

        generatedCopyLinkBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(fullShortLink);
        });
      }
    } catch (error) {
      console.log("Whooops!", error);
      warningInformation.style.setProperty("--pseudo-display", "block");
      shortenInput.style.border = "3px solid var(--red-color)";
      shortenInput.classList.add("red-color");
    }
  };
  getShortUrl();
};

// CALLS
// navigation
navToggle.addEventListener("click", toggleMenu);
navClose.addEventListener("click", toggleMenu);

// shorten
shortenBtn.addEventListener("click", getInputValue);
