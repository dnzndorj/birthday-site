// Edit this file to personalise the whole site.
window.CONFIG = {
  // What you call her. Shows up in the headline and the letter.
  name: "Babe",

  // Signed at the bottom of the report and the letter.
  from: "Dnzn",

  // Her birthday as "MM-DD" (example: "11-23"). Leave empty to hide the countdown.
  birthday: "10-16",

  // Optional secret question before the gift opens. Set both to enable it.
  // Answers are not case sensitive. Leave both empty to skip it.
  gate: {
    question: "",
    answer: ""
  },

  // The day you got together, as "YYYY-MM-DD" (add a time like "2024-02-14T19:30" if you know it).
  // This drives the live "Together for" counter on the home page. Leave empty to hide it.
  together: "2023-12-17",

  // Background song. Put the audio file in /audio and write its name here (example: "audio/song.mp3").
  // Leave src empty to hide the player. The player remembers if it was playing between pages.
  music: {
    src: "",
    title: "Our song",
    artist: ""
  },

  // Optional Spotify card on the Gift page. Paste only the track ID.
  // Example: for open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC the ID is 4uLU6hMCjMI75M1A2tKUQC.
  spotifyTrack: "7wi7Cw5SfFAKJhc0usNpcc",

  // Photos for the Memories page. Put the files in /images and write the file name in src.
  // Leave src empty to show a placeholder.
  photos: [
    { src: "photo-01.jpg", caption: "Exhibit A: the car" },
    { src: "photo-02.jpg", caption: "Same night, better subject" },
    { src: "photo-03.jpg", caption: "What is this face?" },
    { src: "photo-04.jpg", caption: "Hearts included at no extra charge" },
    { src: "photo-05.jpg", caption: "Cheek check:passed, lips?" },
    { src: "photo-06.jpg", caption: "Blurry, loud and authentic" },
    { src: "photo-07.jpg", caption: "After a long time" },
    { src: "photo-08.jpg", caption: "Blue hour" },
    { src: "photo-09.jpg", caption: "Action shot" },
    { src: "photo-10.jpg", caption: "Another selfie" },
    { src: "photo-11.jpg", caption: "Coffee&Matcha, You&Me" },
    { src: "photo-12.jpg", caption: "Sideways, tongue to tongue" }
  ]
};
