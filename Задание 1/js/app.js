(function () {
  let mode = localStorage.getItem("mode");
  if (!mode) {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDarkMode) {
      mode = "dark";
    } else {
      mode = "light";
    }
    localStorage.setItem("mode", mode);
  }
  if (mode === "dark") {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.add("light-mode");
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".main-menu");
  const headerOffset = header.offsetTop;
  window.addEventListener("scroll", () => {
    if (window.scrollY >= headerOffset) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
});

const today = new Date();

// Format Gregorian date
const gregorianFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const gregorianDate = gregorianFormatter.format(today);

// Format Hijri (Umm al-Qura)
const hijriFormatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const hijriParts = hijriFormatter.formatToParts(today);

const hijriDay = hijriParts.find((p) => p.type === "day")?.value;
const hijriYear = hijriParts.find((p) => p.type === "year")?.value;

// Map month names to traditional Arabic transliterations
const hijriMonthNames = {
  Muharram: "Muharram",
  Safar: "Safar",
  "Rabiʻ I": "Rabi al-awwal",
  "Rabiʻ II": "Rabi al-thani",
  "Jumada I": "Jumada al-ula",
  "Jumada II": "Jumada al-akhirah",
  Rajab: "Rajab",
  Shaʻban: "Sha'ban",
  Ramadan: "Ramadan",
  Shawwal: "Shawwal",
  "Dhuʻl-Qiʻdah": "Dhu al-Qi'dah",
  "Dhuʻl-Hijjah": "Dhu al-Hijjah",
};

const hijriMonthRaw = hijriParts.find((p) => p.type === "month")?.value;
const hijriMonth = hijriMonthNames[hijriMonthRaw] || hijriMonthRaw;

// Combine formatted date
const fullDate = `${gregorianDate} / ${hijriDay}, ${hijriMonth}, ${hijriYear}`;

// Insert it into the DOM
document.addEventListener("DOMContentLoaded", () => {
  const dateDiv = document.querySelector(
    ".desktop-nav .date > div:first-child",
  );
  if (dateDiv) dateDiv.textContent = fullDate;

  // Cache DOM elements
  const html = document.documentElement;
  const elements = {
    logoDesktop: document.getElementById("logoDesktop"),
    logoDesktopSidebar: document.getElementById("logoDesktopSidebar"),
    logoMobile: document.getElementById("logoMobile"),
    footerLogo: document.getElementById("footerLogo"),
    iconNewspaper: document.getElementById("iconNewspaper"),
    iconEmail: document.getElementById("iconEmail"),
    iconNewspaperMobile: document.getElementById("iconNewspaperMobile"),
    iconEmailMobile: document.getElementById("iconEmailMobile"),
    iconUser: document.getElementById("iconUser"),
    iconBurger: document.getElementById("burger"),
    iconSearch: document.getElementById("mobile-search"),
    darkBtn: document.getElementById("darkModeBtn"),
    darkBtnMobile: document.getElementById("darkModeBtnMobile"),
    iconYouTube: document.querySelector(".social-youtube img"),
    iconFacebook: document.querySelector(".social-fb img"),
    iconInstagram: document.querySelector(".social-insta img"),
    iconTwitter: document.querySelector(".social-tw img"),
    iconLinkedin: document.querySelector(".social-linkedin img"),
    iconYouTubeMobile: document.querySelector(
      "#footer-social-mobile .social-youtube img",
    ),
    iconFacebookMobile: document.querySelector(
      "#footer-social-mobile .social-fb img",
    ),
    iconInstagramMobile: document.querySelector(
      "#footer-social-mobile .social-insta img",
    ),
    iconTwitterMobile: document.querySelector(
      "#footer-social-mobile .social-tw img",
    ),
    iconLinkedinMobile: document.querySelector(
      "#footer-social-mobile .social-linkedin img",
    ),
    iconYouTubeSidebar: document.querySelector(".youtube-s img"),
    iconFacebookSidebar: document.querySelector(".fb-s img"),
    iconInstagramSidebar: document.querySelector(".insta-s img"),
    iconTwitterSidebar: document.querySelector(".twitter-s img"),
    iconLinkedinSidebar: document.querySelector(".linkedin-s img"),
  };

  // Icon paths
  const icons = {
    light: {
      logo: "/images/logo.svg",
      newspaper: "/images/newspaper.svg",
      email: "/images/email.svg",
      dark: "/images/dark.svg",
      user: "/images/user.svg",
      burger: "/images/burger.png",
      search: "/images/mobile-search.png",
      youtube: "/images/social.svg",
      facebook: "/images/fb.svg",
      instagram: "/images/insta.svg",
      twitter: "/images/twitter.svg",
      linkedin: "/images/linkedin.svg",
    },
    dark: {
      logo: "/images/white-logo.svg",
      newspaper: "/images/newspaper-white.svg",
      email: "/images/email-white.svg",
      dark: "/images/dark-white.svg",
      user: "/images/user-white.svg",
      search: "/images/search-white.svg",
      burger: "/images/white-burger.svg",
      youtube: "/images/social-white.svg",
      facebook: "/images/white-fb.svg",
      instagram: "/images/white-insta.svg",
      twitter: "/images/white-twitter.svg",
      linkedin: "/images/white-linkedin.svg",
    },
  };

  // Apply theme to all elements
  function applyTheme() {
    const isDark = html.classList.contains("dark-mode");
    const theme = isDark ? icons.dark : icons.light;

    // Update logos
    [
      elements.logoDesktop,
      elements.logoDesktopSidebar,
      elements.logoMobile,
      elements.footerLogo,
    ].forEach((el) => el && (el.src = theme.logo));

    // Update icons with mapping
    const iconMap = [
      [elements.iconNewspaper, theme.newspaper],
      [elements.iconEmail, theme.email],
      [elements.iconNewspaperMobile, theme.newspaper],
      [elements.iconEmailMobile, theme.email],
      [elements.darkBtn, theme.dark],
      [elements.iconBurger, theme.burger],
      [elements.iconSearch, theme.search],
      [elements.darkBtnMobile, theme.dark],
      [elements.iconYouTube, theme.youtube],
      [elements.iconFacebook, theme.facebook],
      [elements.iconInstagram, theme.instagram],
      [elements.iconTwitter, theme.twitter],
      [elements.iconLinkedin, theme.linkedin],
      [elements.iconYouTubeSidebar, theme.youtube],
      [elements.iconFacebookSidebar, theme.facebook],
      [elements.iconInstagramSidebar, theme.instagram],
      [elements.iconTwitterSidebar, theme.twitter],
      [elements.iconLinkedinSidebar, theme.linkedin],
      [elements.iconYouTubeMobile, theme.youtube],
      [elements.iconFacebookMobile, theme.facebook],
      [elements.iconInstagramMobile, theme.instagram],
      [elements.iconTwitterMobile, theme.twitter],
      [elements.iconLinkedinMobile, theme.linkedin],
    ];

    iconMap.forEach(([el, src]) => el && (el.src = src));
  }

  // Toggle dark mode
  function toggleDarkMode() {
    const isDark = html.classList.toggle("dark-mode");
    localStorage.setItem("mode", isDark ? "dark" : "light");
    applyTheme();
  }

  // Load saved mode
  if (localStorage.getItem("mode") === "dark") {
    html.classList.add("dark-mode");
  }

  // Apply theme on load
  applyTheme();

  // Add event listeners
  elements.darkBtn?.addEventListener("click", toggleDarkMode);
  elements.darkBtnMobile?.addEventListener("click", toggleDarkMode);
});

document.addEventListener("DOMContentLoaded", function () {
  addImageErrorHandlers();
});

// Also call after dynamic content updates
function addImageErrorHandlers() {
  const defaultImage = "/images/no-image.jpg"; // Replace with your default image path

  const images = document.querySelectorAll(".home-videos .layoutRatio img");

  images.forEach(function (img) {
    // Remove any existing error handler to avoid duplicates
    img.onerror = null;

    // Add error handler
    img.onerror = function () {
      this.src = defaultImage;
      this.onerror = null; // Prevent infinite loop
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll(".filter-btn");
  const responseContainer = document.querySelector(".articles-response");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      // Toggle active class
      filters.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      const days = button.getAttribute("data-days");
      const sections = button.getAttribute("data-section");

      fetch(
        `/api/pb/getMostReadArticles?limit=5&blade_name=most-read-articles&days=${days}&sections=${sections}&image_thumbs=120,120`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.html) {
            responseContainer.innerHTML = data.html;
          } else {
            responseContainer.innerHTML = `<div class="error">No articles found</div>`;
          }
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
          responseContainer.innerHTML = `<div class="error">Error while loading articles</div>`;
        });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  const footerLogo = document.getElementById("footerLogo");

  const lightLogo = "/images/logo.svg";
  const darkLogo = "/images/white-logo.svg";

  const lightSocialIcons = {
    youtube: "/images/social.svg",
    facebook: "/images/fb.svg",
    instagram: "/images/insta.svg",
    twitter: "/images/twitter.svg",
    linkedin: "/images/linkedin.svg",
  };

  const darkSocialIcons = {
    youtube: "/images/social-white.svg",
    facebook: "/images/white-fb.svg",
    instagram: "/images/white-insta.svg",
    twitter: "/images/white-twitter.svg",
    linkedin: "/images/white-linkedin.svg",
  };

  const iconYouTube = document.querySelector(".social-youtube img");
  const iconFacebook = document.querySelector(".social-fb img");
  const iconInstagram = document.querySelector(".social-insta img");
  const iconTwitter = document.querySelector(".social-tw img");
  const iconLinkedin = document.querySelector(".social-linkedin img");

  const iconYouTubeMobile = document.querySelector(
    "#footer-social-mobile .social-youtube img",
  );
  const iconFacebookMobile = document.querySelector(
    "#footer-social-mobile .social-fb img",
  );
  const iconInstagramMobile = document.querySelector(
    "#footer-social-mobile .social-insta img",
  );
  const iconTwitterMobile = document.querySelector(
    "#footer-social-mobile .social-tw img",
  );
  const iconLinkedinMobile = document.querySelector(
    "#footer-social-mobile .social-linkedin img",
  );

  function applySocialIconsMode() {
    const isDark = html.classList.contains("dark-mode");

    iconYouTube.src = isDark
      ? darkSocialIcons.youtube
      : lightSocialIcons.youtube;
    iconFacebook.src = isDark
      ? darkSocialIcons.facebook
      : lightSocialIcons.facebook;
    iconInstagram.src = isDark
      ? darkSocialIcons.instagram
      : lightSocialIcons.instagram;
    iconTwitter.src = isDark
      ? darkSocialIcons.twitter
      : lightSocialIcons.twitter;
    iconLinkedin.src = isDark
      ? darkSocialIcons.linkedin
      : lightSocialIcons.linkedin;

    iconYouTubeMobile.src = isDark
      ? darkSocialIcons.youtube
      : lightSocialIcons.youtube;
    iconFacebookMobile.src = isDark
      ? darkSocialIcons.facebook
      : lightSocialIcons.facebook;
    iconInstagramMobile.src = isDark
      ? darkSocialIcons.instagram
      : lightSocialIcons.instagram;
    iconTwitterMobile.src = isDark
      ? darkSocialIcons.twitter
      : lightSocialIcons.twitter;
    iconLinkedinMobile.src = isDark
      ? darkSocialIcons.linkedin
      : lightSocialIcons.linkedin;
  }

  function applyLogoMode() {
    const isDark = html.classList.contains("dark-mode");
    const newLogo = isDark ? darkLogo : lightLogo;

    if (logoDesktop) logoDesktop.src = newLogo;
    if (logoMobile) logoMobile.src = newLogo;
    if (footerLogo) footerLogo.src = newLogo; // ← FOOTER LOGO UPDATE
  }

  applyLogoMode();
  applySocialIconsMode();
});

function todayDate(delta) {
  var ld = new Date(Date.now() + 86400000 * delta);
  return document.write(ld.toLocaleDateString());
}
