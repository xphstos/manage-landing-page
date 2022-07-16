import { Splide } from "@splidejs/splide";

const HEADER = document.querySelector("body > .header");
const TOGGLE = document.querySelector(".toggle");
const BODY = document.body;
const HTML = document.documentElement;
const SPLIDE = document.querySelector(".splide");
const mediaQueryList = window.matchMedia("(max-width: 820px)");

const slider = new Splide(SPLIDE, {
  type: "loop",
  perPage: 3,
  arrows: false,
  pagination: false,
  label: "testimonials",
  rope: "group",
  breakpoints: {
    1024: {
      perPage: 2,
    },
    768: {
      perPage: 1,
      pagination: true,
    },
  },
}).mount();

function getHeaderHeight() {
  HTML.style.cssText += `--header-height: ${
    HEADER.getBoundingClientRect().height
  }px`;
}

function toggleMenu() {
  BODY.classList.toggle(
    "no-scroll",
    mediaQueryList.matches && !HEADER.classList.contains("header--is-open")
  );
  HEADER.classList.toggle(
    "header--is-open",
    mediaQueryList.matches && !HEADER.classList.contains("header--is-open")
  );
}

function handleScroll() {
  const { scrollY } = this;

  HEADER.classList.toggle("header--scrolling", scrollY > 0);
}

function handleMediaQueryList() {
  HEADER.classList.toggle("header--is-open", false);
  BODY.classList.toggle("no-scroll", false);
  getHeaderHeight();
}

TOGGLE.addEventListener("click", toggleMenu);
mediaQueryList.addEventListener("change", handleMediaQueryList);
window.addEventListener("scroll", handleScroll);

getHeaderHeight();
