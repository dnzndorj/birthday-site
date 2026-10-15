// Floating music player. Shows only when CONFIG.music.src is set.
// Remembers whether the music was on and where it was, so the next page can pick it up.
(function () {
  var C = window.CONFIG || {};
  var M = C.music || {};
  if (!M.src) return;

  var KEY_ON = "bd-music-on", KEY_T = "bd-music-t";
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var audio = new Audio(M.src);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.8;

  var ICON_PLAY = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>';

  var box = document.createElement("div");
  box.className = "player";
  box.innerHTML = '<button class="p-btn" type="button" aria-label="Play music"></button>' +
    '<div class="p-meta"><span class="p-title"></span><span class="p-sub mono"></span></div>';
  var btn = box.querySelector(".p-btn");
  var title = box.querySelector(".p-title");
  var sub = box.querySelector(".p-sub");
  title.textContent = M.title || "Our song";
  var artist = M.artist || "";
  sub.textContent = artist;

  function render() {
    var playing = !audio.paused;
    btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
    btn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
    box.classList.toggle("playing", playing);
    if (playing) { box.classList.remove("attn"); sub.textContent = artist; }
  }

  function start() {
    set(KEY_ON, "1");
    var p = audio.play();
    if (p && p.then) return p.then(render).catch(function () { needTap(); });
    render();
  }

  function needTap() {
    box.classList.add("attn");
    sub.textContent = "Tap to play";
    render();
  }

  btn.addEventListener("click", function () {
    if (audio.paused) { start(); }
    else { audio.pause(); set(KEY_ON, "0"); render(); }
  });

  audio.addEventListener("error", function () { if (box.parentNode) box.parentNode.removeChild(box); });
  audio.addEventListener("timeupdate", function () { set(KEY_T, String(audio.currentTime)); });
  window.addEventListener("pagehide", function () { set(KEY_T, String(audio.currentTime)); });

  var resumeAt = parseFloat(get(KEY_T)) || 0;
  audio.addEventListener("loadedmetadata", function () {
    if (resumeAt > 0 && resumeAt < audio.duration - 1) {
      try { audio.currentTime = resumeAt; } catch (e) {}
    }
  });

  function mount() {
    document.body.appendChild(box);
    document.body.classList.add("has-player");
    render();
    if (get(KEY_ON) === "1") {
      var p = audio.play();
      if (p && p.then) p.then(render).catch(function () { needTap(); });
    }
  }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  // lets other scripts (like the scan page) start the music from a tap or hold
  window.BDPlayer = { play: start };
})();
