(function () {
  var C = window.CONFIG || {};
  var name = C.name || "Babe";

  var rack = document.getElementById("rack");
  var status = document.getElementById("status");
  var found = document.getElementById("found");
  var lead = document.getElementById("lead");
  if (!rack) return;

  var colors = ["var(--accent)", "var(--mint)", "var(--muted)", "var(--fg)", "var(--accent)", "var(--mint)"];
  var decoys = ["Dupe", "Replica", "Fast fashion", "Knockoff", "Reseller"];
  var lines = [
    "Dupe. The stitching gives it away.",
    "Wrong label. Keep looking.",
    "I only deal in originals.",
    "Replica. The zipper is off.",
    "Not that one either. You can do it."
  ];

  var items = decoys.map(function (t) { return { label: t, gold: false }; });
  items.push({ label: name, gold: true });

  // shuffle so the real one hangs somewhere different each visit
  for (var i = items.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = items[i]; items[i] = items[j]; items[j] = t;
  }

  var svg = '<svg class="hanger" viewBox="0 0 64 44" aria-hidden="true" focusable="false">' +
    '<path d="M32 16 C32 8 40 9 40 4 C40 1 36 0 33.5 2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M32 16 L6 38 L58 38 Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>';

  var tries = 0;
  items.forEach(function (it, idx) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "item";
    b.style.setProperty("--c", colors[idx % colors.length]);
    b.setAttribute("aria-label", "Tag: " + it.label);
    b.innerHTML = svg + '<span class="garment" aria-hidden="true"></span><span class="tag-s"></span>';
    b.querySelector(".tag-s").textContent = it.label;
    b.addEventListener("click", function () {
      if (it.gold) {
        rack.classList.add("done");
        b.classList.add("picked");
        status.textContent = "";
        lead.hidden = true;
        found.hidden = false;
        found.querySelector("a").focus({ preventScroll: false });
      } else {
        b.classList.remove("nope");
        void b.offsetWidth;
        b.classList.add("nope");
        status.textContent = lines[tries % lines.length];
        tries++;
      }
    });
    rack.appendChild(b);
  });

  document.querySelectorAll(".name").forEach(function (el) { el.textContent = name; });
})();
