/* =========================================================
   JOHN WAYNE PORTFOLIO — EXTRA FEATURES
   ========================================================= */
(() => {
  "use strict";

  const css = document.createElement("style");
  css.textContent = `
    .extra-section{width:min(1200px,90%);margin:auto;padding:110px 0}
    .extra-section.alt{width:100%;padding-left:5%;padding-right:5%;background:#0d0d0d}
    .extra-inner{width:min(1200px,100%);margin:auto}
    .extra-title{text-align:center;margin-bottom:50px}
    .extra-title p{color:var(--accent,#00e5ff);font-size:12px;letter-spacing:3px;font-weight:700;margin-bottom:10px}
    .extra-title h2{font-size:clamp(34px,5vw,50px)}
    .extra-title h2 span{color:var(--accent,#00e5ff)}

    .dev-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
    .dev-stat{position:relative;overflow:hidden;background:linear-gradient(145deg,#171717,#0d0d0d);
      border:1px solid rgba(255,255,255,.1);border-radius:22px;padding:28px 22px;text-align:center;transition:.35s}
    .dev-stat:hover{transform:translateY(-7px);border-color:rgba(0,229,255,.5);box-shadow:0 18px 45px rgba(0,0,0,.3)}
    .dev-stat-icon{font-size:28px;margin-bottom:10px}
    .dev-stat-number{color:#fff;font-size:30px;font-weight:800;line-height:1;margin-bottom:8px}
    .dev-stat-label{color:#888;font-size:11px;letter-spacing:1px;text-transform:uppercase}

    .terminal-wrap{max-width:900px;margin:auto}
    .terminal{overflow:hidden;border:1px solid rgba(0,229,255,.22);border-radius:20px;background:#080b0e;
      box-shadow:0 25px 70px rgba(0,0,0,.45),0 0 35px rgba(0,229,255,.05)}
    .terminal-head{display:flex;align-items:center;gap:7px;padding:14px 17px;background:#11161b;border-bottom:1px solid rgba(255,255,255,.07)}
    .terminal-dot{width:10px;height:10px;border-radius:50%;background:#444}
    .terminal-title{margin-left:8px;color:#777;font:11px/1 monospace}
    .terminal-body{padding:25px;min-height:330px;font:13px/1.8 "SFMono-Regular",Consolas,Monaco,monospace;color:#c8d1d9}
    .terminal-line{margin:4px 0;word-break:break-word}
    .terminal-prompt{color:var(--accent,#00e5ff)}
    .terminal-command{color:#fff}
    .terminal-output{color:#929aa3}
    .terminal-form{display:flex;align-items:center;gap:8px;margin-top:14px}
    .terminal-form span{color:var(--accent,#00e5ff);white-space:nowrap}
    .terminal-input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:#fff;font:inherit;caret-color:var(--accent,#00e5ff)}
    .terminal-help{margin-top:14px;color:#555;font-size:11px}

    .project-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}
    .project-action{display:inline-flex;align-items:center;justify-content:center;padding:8px 13px;border-radius:999px;
      border:1px solid rgba(255,255,255,.1);background:#1c1c1c;color:#aaa;font-size:10px;font-weight:700;transition:.3s}
    .project-action:hover{color:var(--accent,#00e5ff);border-color:rgba(0,229,255,.5);transform:translateY(-2px)}
    .project-action.primary{background:var(--accent,#00e5ff);color:#000;border-color:transparent}
    .project-action.primary:hover{color:#000;box-shadow:0 8px 25px rgba(0,229,255,.2)}

    .extra-reveal{opacity:0;transform:translateY(25px);transition:opacity .7s ease,transform .7s ease}
    .extra-reveal.visible{opacity:1;transform:translateY(0)}

    @media(max-width:900px){.dev-stats{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:650px){
      .extra-section{padding:85px 0}.extra-section.alt{padding-left:5%;padding-right:5%}
      .dev-stats{grid-template-columns:1fr 1fr}.terminal-body{padding:18px;min-height:300px}
    }
    @media(max-width:430px){.dev-stats{grid-template-columns:1fr}.terminal-body{font-size:11px}}
    @media(prefers-reduced-motion:reduce){.extra-reveal{opacity:1;transform:none;transition:none}}
  `;
  document.head.appendChild(css);

  const title = (eyebrow, a, b) => `
    <div class="extra-title"><p>${eyebrow}</p><h2>${a} <span>${b}</span></h2></div>
  `;

  const projects = document.getElementById("projects");
  if (projects && !document.getElementById("developer-stats")) {
    const stats = document.createElement("section");
    stats.className = "extra-section alt";
    stats.id = "developer-stats";
    stats.innerHTML = `
      <div class="extra-inner">
        ${title("DEVELOPER PROFILE","My","Stats")}
        <div class="dev-stats">
          <article class="dev-stat"><div class="dev-stat-icon">🚀</div><div class="dev-stat-number" data-count="3">0</div><div class="dev-stat-label">Featured Projects</div></article>
          <article class="dev-stat"><div class="dev-stat-icon">🎮</div><div class="dev-stat-number" data-count="5">0</div><div class="dev-stat-label">Games Showcased</div></article>
          <article class="dev-stat"><div class="dev-stat-icon">💻</div><div class="dev-stat-number" data-count="5">0</div><div class="dev-stat-label">Tech Interests</div></article>
          <article class="dev-stat"><div class="dev-stat-icon">⚡</div><div class="dev-stat-number" data-count="100" data-suffix="%">0%</div><div class="dev-stat-label">Learning Mindset</div></article>
        </div>
      </div>`;
    projects.insertAdjacentElement("afterend", stats);

    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el=e.target, target=+el.dataset.count, suffix=el.dataset.suffix||"", start=performance.now();
      const tick=now=>{const p=Math.min((now-start)/900,1), eased=1-Math.pow(1-p,3); el.textContent=Math.round(target*eased)+suffix; if(p<1) requestAnimationFrame(tick)};
      requestAnimationFrame(tick); obs.unobserve(el);
    }), {threshold:.4});
    stats.querySelectorAll("[data-count]").forEach(e=>obs.observe(e));
  }

  const stats = document.getElementById("developer-stats");
  if (stats && !document.getElementById("terminal")) {
    const sec=document.createElement("section");
    sec.className="extra-section";
    sec.id="terminal";
    sec.innerHTML=`
      <div class="extra-inner">
        ${title("COMMAND LINE","Developer","Terminal")}
        <div class="terminal-wrap">
          <div class="terminal">
            <div class="terminal-head">
              <span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-dot"></span>
              <span class="terminal-title">Wayne@portfolio:~</span>
            </div>
            <div class="terminal-body" id="terminalBody">
              <div class="terminal-line"><span class="terminal-prompt">$</span> <span class="terminal-command">welcome</span></div>
              <div class="terminal-line terminal-output">Welcome to John Wayne's portfolio terminal.</div>
              <div class="terminal-line terminal-output">Type <strong style="color:#fff">help</strong> to see available commands.</div>
              <form class="terminal-form" id="terminalForm">
                <span>Wayne@portfolio:~$</span>
                <input id="terminalInput" class="terminal-input" type="text" autocomplete="off" spellcheck="false" aria-label="Terminal command">
              </form>
              <div class="terminal-help">Commands: help · whoami · status · github · about · skills · projects · games · contact · clear</div>
            </div>
          </div>
        </div>
      </div>`;
    stats.insertAdjacentElement("afterend",sec);

    const body=document.getElementById("terminalBody"), form=document.getElementById("terminalForm"), input=document.getElementById("terminalInput");
    const out=t=>{const x=document.createElement("div");x.className="terminal-line terminal-output";x.innerHTML=t;body.insertBefore(x,form)};
    const cmd=t=>{const x=document.createElement("div");x.className="terminal-line";x.innerHTML=`<span class="terminal-prompt">$</span> <span class="terminal-command">${t}</span>`;body.insertBefore(x,form)};
    form.addEventListener("submit",e=>{
      e.preventDefault(); const c=input.value.trim().toLowerCase(); if(!c)return; cmd(c); input.value="";
      if(c==="help") out("Available: <strong style='color:#fff'>whoami</strong>, <strong style='color:#fff'>status</strong>, <strong style='color:#fff'>github</strong>, <strong style='color:#fff'>about</strong>, <strong style='color:#fff'>skills</strong>, <strong style='color:#fff'>projects</strong>, <strong style='color:#fff'>games</strong>, <strong style='color:#fff'>contact</strong>, <strong style='color:#fff'>clear</strong>");
      else if(c==="whoami") out("John Wayne Atienza");
      else if(c==="status") out("Currently learning...");
      else if(c==="github") out("Opening GitHub... <a href='https://github.com/Wayne-beep-desu/john-wayne-portfolio' target='_blank' rel='noopener noreferrer' style='color:#00e5ff;text-decoration:underline'>View repository</a>");
      else if(c==="about") out("John Wayne Atienza — BS Information System student and aspiring developer.");
      else if(c==="skills") out("HTML · CSS · JavaScript · Python · C++ · Editing · Content Creation");
      else if(c==="projects") out("Interactive Bear Animation · Merry Christmas Lyrics Studio · Programming Projects");
      else if(c==="games") out("Mobile Legends · Call of Duty: Mobile · Roblox · VALORANT · Summertime Saga");
      else if(c==="contact") out("Email: john.atienza@my.nst.edu.ph");
      else if(c==="clear") [...body.querySelectorAll(".terminal-line")].forEach(x=>{if(x!==form) x.remove()});
      else out(`Command not found: <strong style="color:#fff">${c}</strong>. Type <strong style="color:#fff">help</strong>.`);
      body.scrollTop=body.scrollHeight;
    });
  }

  document.querySelectorAll(".project-card").forEach((card,i)=>{
    const content=card.querySelector(".project-content");
    if(!content || content.querySelector(".project-actions")) return;
    const actions=document.createElement("div"); actions.className="project-actions";
    const view=document.createElement("a"); view.className="project-action primary"; view.href="#contact"; view.textContent="VIEW PROJECT";
    const code=document.createElement("a"); code.className="project-action"; code.href="https://github.com/Wayne-beep-desu/john-wayne-portfolio"; code.target="_blank"; code.rel="noopener noreferrer"; code.textContent="</> CODE";
    actions.append(view,code); content.appendChild(actions);
  });

  const nav=document.getElementById("navLinks");
  if(nav){
    [["#developer-stats","Stats"],["#terminal","Terminal"]].forEach(([href,text])=>{
      if(nav.querySelector(`a[href="${href}"]`)) return;
      const li=document.createElement("li"); li.innerHTML=`<a href="${href}">${text}</a>`; nav.appendChild(li);
      li.querySelector("a").addEventListener("click",()=>{
        nav.classList.remove("open"); const b=document.getElementById("menuBtn"); if(b)b.textContent="☰";
      });
    });
  }
})();
