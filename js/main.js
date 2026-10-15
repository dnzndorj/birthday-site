(function () {
  var C = window.CONFIG || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Decorative side details stay outside the reading column on wide screens.
  if (!document.querySelector(".side-celebration")) {
    var celebration = document.createElement("div");
    celebration.className = "side-celebration";
    celebration.setAttribute("aria-hidden", "true");
    celebration.innerHTML = '<span class="balloon one"></span><span class="balloon two"></span><span class="balloon three"></span><span class="floating-heart left">&hearts;</span><span class="floating-heart right">&hearts;</span>';
    document.body.insertBefore(celebration, document.body.firstChild);
  }

  document.querySelectorAll(".name").forEach(function (el) { el.textContent = C.name || "Babe"; });
  document.querySelectorAll(".from").forEach(function (el) { el.textContent = C.from || ""; });

  // Countdown on the home page
  var cd = document.getElementById("countdown");
  if (cd && /^\d{2}-\d{2}$/.test(C.birthday || "")) {
    var parts = C.birthday.split("-");
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var next = new Date(now.getFullYear(), Number(parts[0]) - 1, Number(parts[1]));
    if (next < today) next.setFullYear(next.getFullYear() + 1);
    var days = Math.round((next - today) / 86400000);
    cd.textContent = days === 0 ? "It is today" : days === 1 ? "1 day to go" : days + " days to go";
    cd.hidden = false;
  }


  // Together-for counter on the home page
  var tg = document.getElementById("together");
  var ISO = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?$/.exec(C.together || "");
  if (tg && ISO) {
    var start = new Date(+ISO[1], +ISO[2] - 1, +ISO[3], +(ISO[4] || 0), +(ISO[5] || 0));
    var nums = {};
    tg.querySelectorAll(".num").forEach(function (el) { nums[el.getAttribute("data-u")] = el; });
    var label = document.getElementById("sinceLabel");
    var note = document.getElementById("clockNote");
    try {
      label.textContent = "Authenticated since " + start.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) {}
    var tick = function () {
      var n = new Date();
      if (n < start) { tg.hidden = true; return; }
      var y = n.getFullYear() - start.getFullYear(), mo = n.getMonth() - start.getMonth(), d = n.getDate() - start.getDate();
      var h = n.getHours() - start.getHours(), mi = n.getMinutes() - start.getMinutes(), s = n.getSeconds() - start.getSeconds();
      if (s < 0) { s += 60; mi--; }
      if (mi < 0) { mi += 60; h--; }
      if (h < 0) { h += 24; d--; }
      if (d < 0) { d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); mo--; }
      if (mo < 0) { mo += 12; y--; }
      var vals = { y: y, mo: mo, d: d, h: h, mi: mi, s: s };
      Object.keys(vals).forEach(function (k) { if (nums[k]) nums[k].textContent = vals[k]; });
      var total = Math.floor((n - start) / 86400000);
      note.textContent = total.toLocaleString("en-US") + " days so far, and I would do every one again.";
      tg.hidden = false;
    };
    tick();
    setInterval(tick, 1000);
  }

  // Optional Spotify card on the Gift page
  var song = document.getElementById("song");
  if (song && /^[A-Za-z0-9]{10,30}$/.test(C.spotifyTrack || "")) {
    var f = document.createElement("iframe");
    f.src = "https://open.spotify.com/embed/track/" + C.spotifyTrack;
    f.width = "100%"; f.height = "152"; f.loading = "lazy"; f.title = "Our song on Spotify";
    f.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture");
    f.style.border = "0"; f.style.borderRadius = "12px";
    document.getElementById("songFrame").appendChild(f);
    song.hidden = false;
  }

  // Photo wall on the Memories page
  var wall = document.getElementById("shots");
  if (wall) {
    (C.photos || []).forEach(function (p) {
      var fig = document.createElement("figure");
      fig.className = "polaroid";
      if (p.src) {
        var img = document.createElement("img");
        img.src = "images/" + p.src;
        img.alt = p.caption || "";
        img.loading = "lazy";
        fig.appendChild(img);
      } else {
        var slot = document.createElement("div");
        slot.className = "slot mono";
        slot.textContent = "Photo goes here";
        fig.appendChild(slot);
      }
      var cap = document.createElement("figcaption");
      cap.textContent = p.caption || "";
      fig.appendChild(cap);
      wall.appendChild(fig);
    });
  }

  // Gift page
  var btn = document.getElementById("openBtn");
  var letter = document.getElementById("letter");
  var gate = document.getElementById("gate");
  var canvas = document.getElementById("confetti");
  if (btn && letter && canvas) {
    var ctx = canvas.getContext("2d");

    var unlocked = true;
    if (gate && C.gate && C.gate.question && C.gate.answer) {
      unlocked = false;
      gate.hidden = false;
      btn.hidden = true;
      document.getElementById("gateQ").textContent = C.gate.question;
      gate.addEventListener("submit", function (e) {
        e.preventDefault();
        var v = document.getElementById("gateA").value.trim().toLowerCase();
        var msg = document.getElementById("gateMsg");
        if (v === String(C.gate.answer).trim().toLowerCase()) {
          unlocked = true; gate.hidden = true; btn.hidden = false; msg.textContent = "";
        } else {
          msg.textContent = "Not quite. Try again.";
        }
      });
    }

    var colors = function () {
      var s = getComputedStyle(document.documentElement);
      return ["--accent", "--tag", "--mint", "--fg"].map(function (v) { return s.getPropertyValue(v).trim() || "#d42a52"; });
    };

    var burst = function () {
      var w = canvas.width = window.innerWidth;
      var h = canvas.height = window.innerHeight;
      var palette = colors();
      var parts = [];
      for (var i = 0; i < 150; i++) {
        parts.push({ x: w / 2, y: h * 0.55, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 15 - 4, s: Math.random() * 7 + 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: palette[i % palette.length] });
      }
      var start = null;
      var frame = function (t) {
        if (start === null) start = t;
        ctx.clearRect(0, 0, w, h);
        parts.forEach(function (p) {
          p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
          ctx.restore();
        });
        if (t - start < 3200) requestAnimationFrame(frame); else ctx.clearRect(0, 0, w, h);
      };
      requestAnimationFrame(frame);
    };

    btn.addEventListener("click", function () {
      if (!unlocked) return;
      var open = letter.hidden;
      letter.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close it" : "Open your letter";
      if (open) {
        if (!reduce) burst();
        letter.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      }
    });
  }
})();
