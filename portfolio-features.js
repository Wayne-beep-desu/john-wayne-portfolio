
/* =========================================================
   PORTFOLIO FEATURES JS
   ========================================================= */
(() => {
  "use strict";

  /* ---------- THEME ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("wayne-theme");
  if (savedTheme === "light") document.body.classList.add("light-mode");

  const updateThemeIcon = () => {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
  };
  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "wayne-theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
    updateThemeIcon();
  });

  /* ---------- MUSIC ---------- */
  /* Music is handled by the single backgroundMusic controller below. */

  /* ---------- GAMES ---------- */
  const modal = document.getElementById("gameModal");
  const title = document.getElementById("gameModalTitle");
  const desc = document.getElementById("gameModalDescription");
  const genre = document.getElementById("gameModalGenre");
  const genre2 = document.getElementById("gameModalGenre2");
  const platform = document.getElementById("gameModalPlatform");
  const rating = document.getElementById("gameModalRating");
  const icon = document.getElementById("gameModalIcon");
  const play = document.getElementById("gameModalPlay");

  const icons = {
    "Mobile Legends":"⚔️",
    "Call of Duty: Mobile":"🔫",
    "Roblox":"🧱",
    "VALORANT":"🎯",
    "Summertime Saga":"📖"
  };

  document.querySelectorAll(".game-card").forEach(card => {
    const name = card.dataset.gameName || card.querySelector("h3")?.textContent?.trim() || "Game";
    const data = {
      name,
      genre: card.dataset.gameGenre || "Game",
      platform: card.dataset.gamePlatform || "Various",
      rating: card.dataset.gameRating || "N/A",
      description: card.dataset.gameDescription || "Featured game in the portfolio.",
      play: card.dataset.gamePlay || "#"
    };

    // Add visible metadata if not already present.
    const content = card.querySelector(".game-content");
    if (content && !content.querySelector(".game-meta")) {
      const meta = document.createElement("div");
      meta.className = "game-meta";
      meta.innerHTML = `
        <span>${data.platform}</span>
        <span>${data.genre}</span>
        <span class="rating">★ ${data.rating}</span>
      `;
      const tags = content.querySelector(".game-tags");
      if (tags) tags.insertAdjacentElement("afterend", meta);
      else content.appendChild(meta);
    }

    if (content && !content.querySelector(".game-play-btn")) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "game-play-btn";
      button.textContent = "▶ PLAY";
      content.appendChild(button);
      button.addEventListener("click", e => {
        e.stopPropagation();
        if (modal) {
          icon.textContent = icons[data.name] || "🎮";
          title.textContent = data.name;
          genre.textContent = data.genre.toUpperCase();
          genre2.textContent = data.genre;
          platform.textContent = data.platform;
          rating.textContent = `★ ${data.rating}`;
          desc.textContent = data.description;
          play.href = data.play;
          modal.classList.add("open");
          modal.setAttribute("aria-hidden", "false");
        }
      });
    }
  });

  const closeGame = () => {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll("[data-close-game]").forEach(el => el.addEventListener("click", closeGame));

  /* ---------- CONTACT FORM ---------- */
  const contactModal = document.getElementById("contactFormModal");
  const openContact = document.getElementById("openContactForm");
  const form = document.getElementById("portfolioContactForm");

  openContact?.addEventListener("click", () => {
    contactModal?.classList.add("open");
    contactModal?.setAttribute("aria-hidden", "false");
    document.getElementById("contactName")?.focus();
  });

  const closeContact = () => {
    contactModal?.classList.remove("open");
    contactModal?.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll("[data-close-contact]").forEach(el => el.addEventListener("click", closeContact));

  form?.addEventListener("submit", async e => {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const submitLabel = submitButton?.querySelector(".contact-submit-label");
    const spinner = submitButton?.querySelector(".contact-spinner");
    const status = document.getElementById("contactFormStatus");
    const name = document.getElementById("contactName")?.value.trim();
    const email = document.getElementById("contactEmail")?.value.trim();
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.className = "contact-form-status error";
        status.textContent = "Please complete all fields first.";
      }
      return;
    }

    const originalText = submitLabel ? submitLabel.textContent : "SEND MESSAGE";
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    if (submitLabel) submitLabel.textContent = "SENDING...";
    if (spinner) spinner.hidden = false;
    if (status) {
      status.className = "contact-form-status loading";
      status.textContent = "Sending your message...";
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("_subject", `Portfolio message from ${name}`);
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_honey", "");

    try {
      const response = await fetch("https://formsubmit.co/ajax/john.atienza@my.nst.edu.ph", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      const raw = await response.text();
      let result = {};
      try { result = raw ? JSON.parse(raw) : {}; } catch (_) {}

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error("Message could not be sent.");
      }

      form.reset();
      if (status) {
        status.className = "contact-form-status success";
        status.textContent = "✓ Message sent successfully!";
      }
      if (submitLabel) submitLabel.textContent = "SENT ✓";

      setTimeout(() => {
        closeContact();
        submitButton.disabled = false;
        submitButton.classList.remove("is-loading");
        if (spinner) spinner.hidden = true;
        if (submitLabel) submitLabel.textContent = originalText;
        if (status) {
          status.className = "contact-form-status";
          status.textContent = "";
        }
      }, 1400);
    } catch (error) {
      console.error("Contact form error:", error);
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      if (spinner) spinner.hidden = true;
      if (submitLabel) submitLabel.textContent = originalText;
      if (status) {
        status.className = "contact-form-status error";
        status.textContent = "✕ Message could not be sent. Please check your connection and try again.";
      }
    }
  });

  /* ---------- ESCAPE ---------- */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeGame();
      closeContact();
    }
  });
})();



  /* ---------- ESCAPE PROJECT MODAL ---------- */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.getElementById("projectDetailsModal")?.classList.remove("open");
      document.getElementById("projectDetailsModal")?.setAttribute("aria-hidden","true");
    }
  });

  /* ---------- PROJECT FILTERS ---------- */
  const projectFilters = document.querySelectorAll(".project-filter");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  projectFilters.forEach(filter => {
    filter.addEventListener("click", () => {
      projectFilters.forEach(btn => btn.classList.remove("active"));
      filter.classList.add("active");
      const selected = filter.dataset.filter;
      projectCards.forEach(card => {
        card.classList.toggle("project-hidden", selected !== "all" && card.dataset.category !== selected);
      });
    });
  });

  /* ---------- PROJECT DETAILS MODAL ---------- */
  const projectModal = document.getElementById("projectDetailsModal");
  const projectTitle = document.getElementById("projectDetailsTitle");
  const projectDescription = document.getElementById("projectDetailsDescription");
  const projectTags = document.getElementById("projectDetailsTags");

  const projectData = {
    "Interactive Bear Animation": {
      description: "An interactive front-end animation built to practice DOM events, CSS animation, layering, and user interaction.",
      tags: ["HTML","CSS","JavaScript","Animation"]
    },
    "Merry Christmas Lyrics Studio": {
      description: "A desktop-focused project for synchronizing lyrics with music and exporting a vertical 9:16 MP4 video workflow.",
      tags: ["Python","FFmpeg","Video","Desktop"]
    },
    "Programming Projects": {
      description: "A collection of programming exercises focused on algorithms, problem solving, programming fundamentals, C++, and Python.",
      tags: ["C++","Python","Algorithms","Problem Solving"]
    }
  };

  const closeProjectModal = () => {
    projectModal?.classList.remove("open");
    projectModal?.setAttribute("aria-hidden","true");
  };

  document.querySelectorAll(".project-details-btn").forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      const card = button.closest(".project-card");
      const name = card?.dataset.project || "Project";
      const data = projectData[name] || {description:"Featured project in the portfolio.",tags:[]};
      if (!projectModal) return;
      projectTitle.textContent = name;
      projectDescription.textContent = data.description;
      projectTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
      projectModal.classList.add("open");
      projectModal.setAttribute("aria-hidden","false");
    });
  });

  document.querySelectorAll("[data-close-project]").forEach(el => {
    el.addEventListener("click", closeProjectModal);
  });

  /* ---------- SCROLL PROGRESS ---------- */
  const scrollProgress = document.getElementById("scrollProgress");
  const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    scrollProgress.style.width = `${Math.min((window.scrollY / max) * 100, 100)}%`;
  };
  window.addEventListener("scroll", updateScrollProgress, {passive:true});
  updateScrollProgress();



  /* ---------- MARK SECTIONS FOR REVEAL ---------- */
  document.querySelectorAll("section").forEach(section => {
    if (section.id) section.classList.add("scroll-reveal");
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealItems = document.querySelectorAll(
    "section.scroll-reveal, .scroll-reveal"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {threshold:0.12, rootMargin:"0px 0px -50px 0px"});

    revealItems.forEach((item,index) => {
      if (index % 3 === 1) item.classList.add("from-right");
      else if (index % 3 === 2) item.classList.add("from-left");
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }


  /* ---------- TERMINAL ENTRY ANIMATION ---------- */
  const terminalSection = document.querySelector("#terminal");

  if (terminalSection && "IntersectionObserver" in window) {
    const terminalObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          terminalSection.classList.add("is-visible");
        } else {
          terminalSection.classList.remove("is-visible");
        }
      });
    }, {
      threshold: 0.22,
      rootMargin: "0px 0px -80px 0px"
    });

    terminalObserver.observe(terminalSection);
  } else if (terminalSection) {
    terminalSection.classList.add("is-visible");
  }


  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("show", window.scrollY > 500);
    };
    window.addEventListener("scroll", updateBackToTop, {passive:true});
    updateBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  /* ---------- BACKGROUND MUSIC ---------- */
  const backgroundMusic = document.getElementById("backgroundMusic");
  const soundToggle = document.querySelector(
    '#soundToggle, #musicToggle, .sound-toggle, .music-toggle, [aria-label*="sound" i], [aria-label*="music" i]'
  );

  if (backgroundMusic && soundToggle) {
    backgroundMusic.volume = 0.35;
    setTimeout(() => {
      soundToggle.textContent = backgroundMusic.paused ? "🔇" : "🔊";
    }, 0);

    const setSoundState = (playing) => {
      soundToggle.classList.toggle("active", playing);
      soundToggle.setAttribute("aria-pressed", playing ? "true" : "false");
      soundToggle.setAttribute("aria-label", playing ? "Mute background music" : "Play background music");
      soundToggle.title = playing ? "Mute music" : "Play music";
      soundToggle.textContent = playing ? "🔊" : "🔇";
    };

    const playMusic = () => {
      backgroundMusic.play().then(() => {
        setSoundState(true);
        localStorage.setItem("portfolioMusic", "on");
      }).catch(() => setSoundState(false));
    };

    soundToggle.addEventListener("click", () => {
      if (backgroundMusic.paused) {
        playMusic();
      } else {
        backgroundMusic.pause();
        setSoundState(false);
        localStorage.setItem("portfolioMusic", "off");
      }
    });

    if (localStorage.getItem("portfolioMusic") === "on") {
      const unlock = () => {
        playMusic();
        document.removeEventListener("click", unlock);
        document.removeEventListener("touchstart", unlock);
      };
      document.addEventListener("click", unlock, {once:true});
      document.addEventListener("touchstart", unlock, {once:true});
    }
  }
