(function () {
  var C = window.CONFIG || {};
  var name = C.name || "Babe";
  document.querySelectorAll(".name").forEach(function (el) { el.textContent = name; });

  var btn = document.getElementById("scanner");
  var fill = document.getElementById("fill");
  var status = document.getElementById("status");
  var stamp = document.getElementById("stamp");
  var found = document.getElementById("found");
  var lead = document.getElementById("lead");
  if (!btn) return;

  var HOLD = 2400; // milliseconds she has to hold the barcode
  var steps = [
    "Checking the stitching...",
    "Reading the label...",
    "Testing the hardware...",
    "Comparing with the originals..."
  ];

  var raf = null, t0 = 0, progress = 0, done = false, lastStep = -1;

  function setStatus(text, warn) {
    status.textContent = text;
    status.classList.toggle("warn", !!warn);
  }

  function tick(now) {
    progress = Math.min((now - t0) / HOLD, 1);
    fill.style.transform = "scaleX(" + progress + ")";
    var s = Math.min(Math.floor(progress * steps.length), steps.length - 1);
    if (s !== lastStep) { lastStep = s; setStatus(steps[s]); }
    if (progress >= 1) finish();
    else raf = requestAnimationFrame(tick);
  }

  function start() {
    if (done || raf) return;
    lastStep = -1;
    t0 = performance.now();
    btn.classList.add("scanning");
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    if (done || !raf) return;
    cancelAnimationFrame(raf);
    raf = null;
    btn.classList.remove("scanning");
    fill.style.transform = "scaleX(0)";
    setStatus("Hold steady. Try again.", true);
  }

  function finish() {
    done = true;
    cancelAnimationFrame(raf);
    raf = null;
    btn.classList.remove("scanning");
    btn.classList.add("done");
    btn.setAttribute("aria-disabled", "true");
    fill.style.transform = "scaleX(1)";
    stamp.classList.add("slam");
    var cap = btn.querySelector(".cap");
    if (cap) cap.textContent = "Scan complete";
    document.querySelectorAll(".specs dd").forEach(function (dd) {
      if (dd.textContent === "Unverified") dd.textContent = "Verified";
    });
    setStatus("Authentic. One of one.");
    try { if (window.BDPlayer) window.BDPlayer.play(); } catch (e) {}
    try { if (navigator.vibrate) navigator.vibrate([40, 60, 40]); } catch (e) {}
    lead.hidden = true;
    found.hidden = false;
    var link = found.querySelector("a");
    if (link) link.focus();
  }

  btn.addEventListener("pointerdown", function (e) { e.preventDefault(); start(); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) { btn.addEventListener(ev, stop); });
  btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  btn.addEventListener("blur", stop);
  btn.addEventListener("keydown", function (e) {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(); }
  });
  btn.addEventListener("keyup", function (e) {
    if (e.key === " " || e.key === "Enter") stop();
  });
})();
