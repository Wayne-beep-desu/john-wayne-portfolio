/* =========================================================
   JOHN WAYNE PORTFOLIO — UPDATED SCRIPT
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const topBtn = document.getElementById("topBtn");

/* MOBILE MENU */
if(menuBtn && navLinks){
  menuBtn.addEventListener("click",()=>{
    navLinks.classList.toggle("open");
    menuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });
}

links.forEach(link=>{
  link.addEventListener("click",()=>{
    navLinks.classList.remove("open");
    menuBtn.textContent="☰";
  });
});

/* ACTIVE NAV + TOP BUTTON */
window.addEventListener("scroll",()=>{
  let current="";

  sections.forEach(section=>{
    if(window.scrollY >= section.offsetTop - 160){
      current=section.id;
    }
  });

  links.forEach(link=>{
    link.classList.toggle(
      "active",
      link.getAttribute("href")==="#"+current
    );
  });

  if(topBtn){
    topBtn.classList.toggle("show",window.scrollY>500);
  }
});

/* BACK TO TOP */
if(topBtn){
  topBtn.addEventListener("click",()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  });
}

/* YEAR */
const year=document.getElementById("year");
if(year){
  year.textContent=new Date().getFullYear();
}

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements=document.querySelectorAll(
  ".skill-card,.project-card,.game-card,.about-container,.contact-container"
);

revealElements.forEach(el=>el.classList.add("reveal"));

const observer=new IntersectionObserver(
  entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {threshold:.12}
);

revealElements.forEach(el=>observer.observe(el));

/* =========================================================
   GAMES — CLICK / TOUCH ZOOM
   ========================================================= */

const gameCards=document.querySelectorAll(".game-card");

gameCards.forEach(card=>{

  /* Mouse hover is handled by CSS.
     This JS adds a stronger click/tap animation. */

  card.addEventListener("click",()=>{
    card.classList.add("is-clicked");

    setTimeout(()=>{
      card.classList.remove("is-clicked");
    },450);
  });

  /* Keyboard accessibility */
  card.addEventListener("keydown",event=>{
    if(event.key==="Enter" || event.key===" "){
      card.classList.add("is-clicked");

      setTimeout(()=>{
        card.classList.remove("is-clicked");
      },450);
    }
  });

  /* Make sure cards can receive keyboard focus */
  card.setAttribute("tabindex","0");
});

/* =========================================================
   BUTTON PRESS FEEDBACK
   ========================================================= */

document.querySelectorAll(".btn").forEach(button=>{
  button.addEventListener("click",()=>{
    button.style.transform="scale(.96)";

    setTimeout(()=>{
      button.style.transform="";
    },120);
  });
});

/* =========================================================
   SMALL PARALLAX EFFECT FOR GAME CHARACTER
   Does NOT move the image outside its card.
   ========================================================= */

gameCards.forEach(card=>{

  const character=card.querySelector(".game-character img");

  if(!character) return;

  card.addEventListener("mousemove",event=>{

    const rect=card.getBoundingClientRect();

    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;

    const moveX=x*8;
    const moveY=y*5;

    character.style.transform=
      `scale(1.09) translate(${moveX}px,${moveY}px)`;
  });

  card.addEventListener("mouseleave",()=>{
    character.style.transform="";
  });

});

/* Respect reduced-motion accessibility preference */
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){

  document.documentElement.style.scrollBehavior="auto";

  gameCards.forEach(card=>{
    const img=card.querySelector(".game-character img");
    if(img){
      img.style.transition="none";
    }
  });
}


// Cursor glow — follows the mouse like a live radial light.
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  const animateCursorGlow = () => {
    glowX += (mouseX - glowX) * 0.16;
    glowY += (mouseY - glowY) * 0.16;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    requestAnimationFrame(animateCursorGlow);
  };

  animateCursorGlow();
}
