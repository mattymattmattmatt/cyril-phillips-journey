/* Behaviour for the family site. The story itself is in the HTML. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var PLACES = {
    mallee: { map: "world", x: 560, y: 470, z: 2.7 },
    woodside: { map: "world", x: 575, y: 478, z: 3.15 },
    embark: { map: "world", x: 590, y: 490, z: 2.85 },
    fremantle: { map: "world", x: 470, y: 450, z: 2.35 },
    colombo40: { map: "world", x: 290, y: 210, z: 2.15 },
    suez: { map: "world", x: 120, y: 110, z: 2.15 },
    helwan: { map: "me", x: 430, y: 250, z: 2.15 },
    desert: { map: "me", x: 250, y: 185, z: 1.55 },
    tobruk: { map: "me", x: 190, y: 155, z: 2.35 },
    greece: { map: "me", x: 300, y: 55, z: 1.35 },
    levant: { map: "me", x: 520, y: 150, z: 1.45 },
    ceylon42: { map: "world", x: 300, y: 220, z: 2.2 },
    home42: { map: "world", x: 600, y: 470, z: 2.45 },
    townsville: { map: "world", x: 610, y: 390, z: 2.35 },
    moresby: { map: "world", x: 600, y: 330, z: 2.25 },
    home44: { map: "world", x: 630, y: 430, z: 2.2 },
    whole: { map: "world", x: 350, y: 280, z: 1 }
  };

  var ROUTES = [
    { map: "world", color: "#5b6237", width: 2.4, from: "mallee", to: "embark", d: "M573.0,484.6 L587.5,498.0 L604.8,507.9" },
    { map: "world", color: "#8a2f2a", width: 2.6, from: "embark", to: "fremantle", d: "M604.5,511.6 C601.2,513.7 595.8,526.0 585.0,524.0 C574.2,521.9 558.3,504.4 540.0,499.6 C521.7,494.7 489.2,499.5 475.0,494.8 C460.8,490.1 457.5,476.8 454.5,471.5 C451.5,466.2 456.6,464.5 457.0,463.2" },
    { map: "world", color: "#8a2f2a", width: 2.6, from: "fremantle", to: "suez", d: "M457.0,463.2 C450.8,451.1 439.5,420.3 420.0,390.6 C400.5,360.9 362.5,315.3 340.0,285.0 C317.5,254.7 303.3,226.0 285.0,208.9 C266.7,191.8 251.7,189.9 230.0,182.4 C208.3,175.0 176.7,166.7 155.0,164.2 C133.3,161.7 111.7,171.0 100.0,167.5 C88.3,164.0 91.7,155.7 85.0,143.1 C78.3,130.6 66.2,105.5 60.0,92.2 C53.8,78.9 50.8,70.8 48.0,63.2 C45.2,55.6 43.8,49.2 43.0,46.4" },
    { map: "me", color: "#8a2f2a", width: 2.6, from: "helwan", to: "tobruk", d: "M421.7,269.3 C416.5,263.1 399.0,242.0 390.4,232.4 C381.8,222.9 384.0,215.6 370.2,211.7 C356.3,207.8 321.6,212.0 307.3,209.2 C292.9,206.5 293.7,199.3 284.0,195.4 C274.3,191.4 261.2,188.8 249.0,185.4 C236.9,182.0 223.9,179.4 211.3,174.9 C198.8,170.5 183.6,162.4 173.7,159.0 C163.7,155.5 158.8,160.2 151.4,154.5 C144.0,148.7 142.9,127.0 129.2,124.3 C115.6,121.6 79.6,136.0 69.7,138.4" },
    { map: "me", color: "#2f5470", width: 2.4, from: "tobruk", to: "levant", d: "M178.4,158.0 C197.4,162.1 254.1,177.1 292.8,182.9 C331.5,188.7 383.7,187.9 410.6,192.9 C437.5,197.8 436.9,211.0 454.3,212.7 C471.7,214.4 502.0,207.8 514.9,202.8 C527.8,197.8 528.9,186.2 531.7,182.9" },
    { map: "me", color: "#2f5470", width: 2.4, from: "tobruk", to: "levant", d: "M531.7,180.4 C535.7,170.8 547.7,141.1 555.3,122.8 C562.9,104.5 573.5,79.2 577.2,70.5" },
    { map: "world", color: "#2f5470", width: 2.4, from: "levant", to: "ceylon42", d: "M42.5,48.6 C43.9,51.8 45.9,56.0 51.0,67.5 C56.1,79.0 65.4,101.4 73.0,117.6 C80.6,133.9 87.0,156.9 96.5,164.9 C106.0,172.8 111.9,161.5 130.0,165.5 C148.1,169.5 180.8,182.0 205.0,188.9 C229.2,195.8 263.3,203.9 275.0,207.0" },
    { map: "world", color: "#2f5470", width: 2.6, from: "ceylon42", to: "home42", d: "M282.0,210.8 C294.2,229.6 330.3,284.3 355.0,323.8 C379.7,363.2 410.8,417.3 430.0,447.5 C449.2,477.7 451.7,495.8 470.0,505.2 C488.3,514.5 520.8,500.1 540.0,503.6 C559.2,507.0 574.5,524.3 585.0,525.6 C595.5,527.0 600.0,514.0 603.0,511.6" },
    { map: "world", color: "#5b6237", width: 2.3, from: "home42", to: "home42", d: "M606.0,506.8 L622.5,489.3 L636.0,469.2" },
    { map: "world", color: "#5b6237", width: 2.3, from: "home42", to: "townsville", d: "M637.0,466.9 L642.5,431.5 L627.5,390.6 L614.5,372.9" },
    { map: "world", color: "#8a2f2a", width: 2.6, from: "townsville", to: "moresby", d: "M615.5,370.8 L621.0,343.5 L616.5,309.5" },
    { map: "world", color: "#3b3a33", width: 2.2, from: "moresby", to: "home44", d: "M617.0,308.2 C620.4,314.1 631.8,327.4 637.5,343.5 C643.2,359.5 650.0,390.4 651.5,404.5 C653.0,418.6 647.3,424.0 646.5,427.9" }
  ];

  var PINS = [
    { id: "mallee", map: "world", x: 573, y: 485, label: "Adelaide" },
    { id: "embark", map: "world", x: 605, y: 508, label: "Melbourne" },
    { id: "fremantle", map: "world", x: 459, y: 462, label: "Fremantle" },
    { id: "colombo40", map: "world", x: 279, y: 202, label: "Colombo" },
    { id: "suez", map: "world", x: 43, y: 46, label: "Suez" },
    { id: "home42", map: "world", x: 637, y: 468, label: "Greta" },
    { id: "townsville", map: "world", x: 614, y: 372, label: "Townsville" },
    { id: "moresby", map: "world", x: 616, y: 307, label: "Port Moresby" },
    { id: "home44", map: "world", x: 645, y: 429, label: "Brisbane" },
    { id: "helwan", map: "me", x: 422, y: 269, label: "Helwan" },
    { id: "desert", map: "me", x: 307, y: 209, label: "Fuka" },
    { id: "tobruk", map: "me", x: 174, y: 159, label: "Tobruk" },
    { id: "levant", map: "me", x: 577, y: 71, label: "Ablah" }
  ];

  var QUIZ = [
    {
      q: "Where was Cyril born?",
      choices: ["Lowaldie, in the Murray Mallee", "Port Broughton, South Australia", "Adelaide", "Woodside Camp"],
      answer: 1,
      why: "His service record says he was born at Port Broughton on 9 August 1917. Lowaldie is where he was working as a blacksmith in 1940, and where his mother lived."
    },
    {
      q: "What was his service number?",
      choices: ["VX8216", "SX8126", "SX8216", "NX8216"],
      answer: 2,
      why: "He was enlisted at Adelaide on 6 July 1940 as SX8216. The S is South Australia. The number is on every page of his file."
    },
    {
      q: "What trade was he graded on the day he enlisted?",
      choices: ["Group I Fitter", "Group I Blacksmith", "Driver", "Signaller"],
      answer: 1,
      why: "From 6 July 1940 he was a Group I Blacksmith. He was re-graded Group I Fitter on 1 February 1944. The word written after Fitter is 'Ins', which the file does not spell out."
    },
    {
      q: "Which ship is the very probable one for his 1940 voyage?",
      choices: ["HMT Ekma, named in his record", "The hospital ship Manunda", "MV Nieuw Holland, in convoy US 5", "The Duntroon"],
      answer: 2,
      why: "His own record does not name the 1940 ship. Moran names the Nieuw Holland. Convoy US 5 left Fremantle on 22 September 1940. The fact-checked edition calls this very probable, not certain."
    },
    {
      q: "Which recovery section was he in?",
      choices: ["No. 5, the one that went to Greece", "No. 4, raised in Victoria", "6 Australian Recovery Section, named by Bert Evans", "The service record prints the section on the first page"],
      answer: 2,
      why: "Bert Evans, SX4626, wrote in 1971 that Cyril was of 6 Aust Recovery Section, and that they served together from June 1940 to September 1942. That replaces the old estimate of about 80 percent. The full letter is on the Virtual War Memorial, not reprinted here."
    },
    {
      q: "What establishes that he was inside Tobruk during the siege?",
      choices: [
        "The service record prints the word Tobruk on 14 June",
        "Only a guess from the unit diary",
        "Evans’s account, the 4 AGH admission, and the Rats of Tobruk register",
        "He was wounded in the Easter Battle"
      ],
      answer: 2,
      why: "On 14 June 1941 he was admitted to 4 Aust Gen Hosp, inside the siege, and rejoined his unit on 17 June. Evans describes the siege from inside. The Rats of Tobruk Association register lists SX8216. The windmill site is still unlocated."
    },
    {
      q: "Where does the war diary put 6 Recovery Section on 11 April 1941?",
      choices: [
        "On a map square that marks a windmill by name",
        "On the Derna Road, about 1 mile west of Tobruk",
        "At Woodside, still training",
        "In Greece with No. 5 Section"
      ],
      answer: 1,
      why: "The 2/1st Army Field Workshops diary says No. 6 Recovery Section moved to a position on the Derna Road about 1 mile west of Tobruk. Moran says their site was at the windmill. No wartime map marking that windmill has been found, so the exact spot stays an inference."
    },
    {
      q: "Where is Cyril's own name written in the unit papers?",
      choices: [
        "Only in his NAA service record",
        "On the Nieuw Holland passenger list in his file",
        "On the guard at Khassa and at Ablah, 1941",
        "In a Tobruk nominal roll"
      ],
      answer: 2,
      why: "Routine Orders name SX8216 Phillips, C.R. on the guard at Khassa on 22 and 29 September 1941, and at Ablah on 29 October and 6 November 1941. Three of those guards were drawn from 6 Recovery Section."
    },
    {
      q: "Which ship carried him home from Port Moresby in February 1944?",
      choices: ["MV Nieuw Holland", "HMT Ekma", "The Duntroon", "The hospital ship Manunda"],
      answer: 3,
      why: "On 13 February 1944 he was carried aboard the 2/1st Australian Hospital Ship Manunda at Port Moresby. Ekma had brought him back from Ceylon in 1942. The Duntroon took him up to New Guinea in December 1942."
    },
    {
      q: "What is true of the Rats of Tobruk and his medals?",
      choices: [
        "Rat of Tobruk was a seventh medal, posted to Borrika in 1954",
        "Six medals are ticked. The association register lists him. That is not a medal",
        "He was not eligible for the Africa Star",
        "The Pacific Star was for the Middle East"
      ],
      answer: 1,
      why: "The card is ticked for six awards. The Rats of Tobruk Association register lists SX8216. The name is a veteran identity, not a medal. His overseas days add as 692 plus 437, which is the official 1,129."
    }
  ];

  var DAYS = {
    leave: "5 April 1941. No. 6 Recovery Section left Amiriya for Tobruk. This is the unit diary, not a line that names Cyril.",
    arrive: "8 April 1941. The 2/1st Army Field Workshops diary places 6 Recovery Section, under Captain J. W. Redpath, in Tobruk.",
    siege: "Background. The Australian War Memorial dates the start of the siege to 10-11 April 1941, when German troops cut the land route. This is the story of the fortress, not an entry in Cyril's file.",
    road: "11 April 1941. 'No. 6 Recovery Section moved out to position on Derna Road about 1 mile West of Tobruk.' Moran later wrote that their site was at the windmill.",
    easter: "Background. On 13-14 April the garrison defeated an attack the Memorial calls the Easter Battle. Nothing in Cyril's record describes that night.",
    letter: "22 April 1941. Captain Redpath writes from Tobruk that the section has had no losses. On 27 April the unit diary still has him in 'Tobruch'.",
    salient: "Background. From 30 April to 4 May the Memorial records the Battle of the Salient, another attack on the perimeter. It is not in Cyril's papers.",
    hosp: "14 June 1941, from his own record. Admitted to 4 Aust Gen Hosp with influenza. The 2/4th AGH was inside the siege.",
    back: "17 June 1941, from his own record. Discharged (the diagnosis now written as enteritis) and rejoined his unit the same day.",
    out: "11 July 1941. The diary records Captain Redpath and No. 6 Recovery Section marching in at Barbara, from Tobruk. Evans's night sailing sits after 17 June, when Cyril was back with his unit inside the fortress, and by about the first week of July."
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* Intro and sound */
  var soundOn = false;
  var placeSounds = false;
  var tracks = {};

  function track(name, loop) {
    if (!tracks[name]) {
      var a = new Audio("assets/audio/" + name + ".m4a");
      a.loop = !!loop;
      a.preload = "none";
      tracks[name] = a;
    }
    return tracks[name];
  }

  function safePlay(a) {
    var p = a.play();
    if (p && p.catch) p.catch(function () { /* a browser may still refuse */ });
  }

  var musicOn = true;
  var targetVol = 0.7;
  var currentMusic = null;
  var fadeTimer = 0;

  function musicFor(stopId) {
    var home = { mallee: 1, woodside: 1, embark: 1, home42: 1, home44: 1, whole: 1 };
    return home[stopId] ? "waltzing-matilda" : "well-meet-again";
  }

  function setMusic(on) {
    musicOn = !!on;
    var box = $("#musicBox");
    if (box) box.checked = musicOn;
    if (!musicOn || !soundOn) {
      ["waltzing-matilda", "well-meet-again"].forEach(function (name) {
        if (tracks[name]) tracks[name].pause();
      });
      return;
    }
    fadeTo(currentMusic || "waltzing-matilda");
  }

  function fadeTo(name) {
    if (!name) return;
    currentMusic = name;
    if (!soundOn || !musicOn) return;
    var next = track(name, true);
    var prevName = name === "waltzing-matilda" ? "well-meet-again" : "waltzing-matilda";
    var prev = tracks[prevName];
    if (fadeTimer) cancelAnimationFrame(fadeTimer);
    var start = performance.now();
    if (next.paused) {
      next.volume = 0;
      safePlay(next);
    }
    function step(now) {
      var p = Math.min(1, (now - start) / 1400);
      next.volume = targetVol * p;
      if (prev && prev !== next) prev.volume = Math.max(0, targetVol * (1 - p));
      if (p < 1) fadeTimer = requestAnimationFrame(step);
      else if (prev && prev !== next) prev.pause();
    }
    fadeTimer = requestAnimationFrame(step);
  }

  function setWind(on) {
    var wind = track("wind", true);
    wind.volume = 0.28;
    if (on && soundOn && placeSounds) {
      if (wind.paused) safePlay(wind);
    } else wind.pause();
  }

  function playOnce(name, vol) {
    if (!soundOn) return;
    var a = track(name, false);
    a.volume = vol;
    a.currentTime = 0;
    safePlay(a);
  }

  function syncMuteButton() {
    var btn = $("#muteBtn");
    if (!btn) return;
    btn.setAttribute("aria-pressed", soundOn ? "false" : "true");
    btn.textContent = soundOn ? "Sound on" : "Sound off";
  }

  function master(on) {
    soundOn = on;
    if (!on) {
      Object.keys(tracks).forEach(function (k) { tracks[k].pause(); });
    } else if ($("#musicBox") && $("#musicBox").checked) {
      setMusic(true);
    }
    syncMuteButton();
    var status = $("#soundStatus");
    if (status) status.textContent = on ? "Sound is on. You can change each layer." : "Sound is off.";
  }

  var intro = $("#intro");
  document.body.style.overflow = "hidden";
  function closeIntro(withSound) {
    if (!intro || intro.hidden) return;
    document.body.style.overflow = "";
    placeSounds = !!withSound;
    var placeBox = $("#placeBox");
    if (placeBox) placeBox.checked = !!withSound;
    var musicBox = $("#musicBox");
    if (musicBox) musicBox.checked = !!withSound;
    master(!!withSound);
    if (withSound) setMusic(true);
    intro.classList.add("is-leaving");
    intro.setAttribute("aria-hidden", "true");
    var done = function () {
      intro.hidden = true;
      var main = $("#main");
      if (main) main.focus({ preventScroll: true });
    };
    if (reduced) done();
    else setTimeout(done, 700);
    var dock = $("#dock");
    if (dock) dock.hidden = false;
  }

  var beginSound = $("#beginSound");
  var beginQuiet = $("#beginQuiet");
  if (beginSound) beginSound.addEventListener("click", function () { closeIntro(true); });
  if (beginQuiet) beginQuiet.addEventListener("click", function () { closeIntro(false); });

  var muteBtn = $("#muteBtn");
  if (muteBtn) {
    muteBtn.addEventListener("click", function () {
      if (soundOn) master(false);
      else {
        master(true);
        if ($("#musicBox") && $("#musicBox").checked) setMusic(true);
      }
    });
  }
  var dockToggle = $("#dockToggle");
  var dockPanel = $("#dockPanel");
  if (dockToggle && dockPanel) {
    dockToggle.addEventListener("click", function () {
      var open = dockPanel.classList.toggle("is-open");
      dockToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var musicBox = $("#musicBox");
  if (musicBox) musicBox.addEventListener("change", function () { setMusic(musicBox.checked); });
  var volume = $("#volume");
  if (volume) {
    volume.addEventListener("input", function () {
      targetVol = Number(volume.value) / 100;
      if (currentMusic && tracks[currentMusic] && !tracks[currentMusic].paused) {
        tracks[currentMusic].volume = targetVol;
      }
    });
  }
  var placeBox = $("#placeBox");
  if (placeBox) {
    placeBox.addEventListener("change", function () {
      placeSounds = placeBox.checked;
      if (!placeSounds) setWind(false);
    });
  }
  $all("[data-once]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!soundOn) master(true);
      playOnce(btn.getAttribute("data-once"), 0.7);
    });
  });

  /* Nav */
  var navToggle = $("#navToggle");
  var navLinks = $("#navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var progress = $("#progress");
  function onScrollProgress() {
    if (!progress) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }

  /* Current section in the nav */
  var navAnchors = $all("#navLinks a");
  function markNav() {
    var current = "";
    navAnchors.forEach(function (a) {
      var id = (a.getAttribute("href") || "").slice(1);
      var el = id && document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top < 120) current = a;
    });
    navAnchors.forEach(function (a) {
      if (a === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  /* Portrait slider */
  var compare = $("#compare");
  var compareTop = $("#compareTop");
  var compareRange = $("#compareRange");
  function layoutCompare() {
    if (!compare || !compareTop) return;
    var img = compareTop.querySelector("img");
    if (img) img.style.width = compare.clientWidth + "px";
    var pct = compareRange ? Number(compareRange.value) : 50;
    compareTop.style.width = pct + "%";
  }
  if (compareRange) {
    compareRange.addEventListener("input", layoutCompare);
    window.addEventListener("resize", layoutCompare);
    layoutCompare();
  }

  /* Lightbox */
  var dialog = $("#lightbox");
  var lightImg = $("#lightImg");
  var lightCap = $("#lightCap");
  var zoom = 1;
  function applyZoom() {
    if (lightImg) lightImg.style.transform = "scale(" + zoom + ")";
  }
  function openZoom(src, caption) {
    if (!dialog || !lightImg) return;
    zoom = 1;
    applyZoom();
    lightImg.src = src;
    lightImg.alt = caption || "Enlarged record";
    if (lightCap) lightCap.textContent = caption || "";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  document.addEventListener("click", function (e) {
    var modeBtn = e.target.closest("[data-mode]");
    if (modeBtn) {
      var wrap = modeBtn.closest("[data-photo]");
      var img = wrap && wrap.querySelector("img");
      var mode = modeBtn.getAttribute("data-mode");
      if (img && img.getAttribute("data-" + mode)) {
        img.src = img.getAttribute("data-" + mode);
        $all("[data-mode]", wrap).forEach(function (b) {
          b.setAttribute("aria-pressed", b === modeBtn ? "true" : "false");
        });
      }
      return;
    }
    var btn = e.target.closest(".shot");
    if (!btn) return;
    var img = btn.querySelector("img");
    if (!img) return;
    var fig = btn.closest("figure");
    var cap = fig && fig.querySelector("figcaption");
    openZoom(img.currentSrc || img.src, cap ? cap.textContent.trim() : img.alt);
  });
  $all("[data-zoom-btn]").forEach(function (b) {
    b.addEventListener("click", function () { zoom = Math.min(4, zoom + 0.35); applyZoom(); });
  });
  var zoomOut = $("#zoomOut");
  var zoomReset = $("#zoomReset");
  if (zoomOut) zoomOut.addEventListener("click", function () { zoom = Math.max(1, zoom - 0.35); applyZoom(); });
  if (zoomReset) zoomReset.addEventListener("click", function () { zoom = 1; applyZoom(); });
  if (lightImg) {
    lightImg.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoom = Math.min(4, Math.max(1, zoom + (e.deltaY < 0 ? 0.15 : -0.15)));
      applyZoom();
    }, { passive: false });
    var pinch = null;
    lightImg.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) {
        pinch = {
          d: Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY),
          z: zoom
        };
      }
    }, { passive: true });
    lightImg.addEventListener("touchmove", function (e) {
      if (pinch && e.touches.length === 2) {
        e.preventDefault();
        var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        zoom = Math.min(4, Math.max(1, pinch.z * (d / pinch.d)));
        applyZoom();
      }
    }, { passive: false });
    lightImg.addEventListener("touchend", function () { pinch = null; });
  }

  /* Journey map */
  var layerWorld = $("#layerWorld");
  var layerMe = $("#layerMe");
  var stage = $("#mapStage");
  var routeEls = [];
  var pinEls = [];
  var order = [];

  function ns(name) { return document.createElementNS("http://www.w3.org/2000/svg", name); }

  function buildMap() {
    var cards = $all(".stop");
    order = cards.map(function (c) { return c.getAttribute("data-stop"); });
    ROUTES.forEach(function (route) {
      var svg = route.map === "world" ? $("#overlayWorld") : $("#overlayMe");
      if (!svg) return;
      var path = ns("path");
      path.setAttribute("d", route.d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", route.color);
      path.setAttribute("stroke-width", String(route.width));
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("pathLength", "1");
      path.style.strokeDasharray = "1";
      path.style.strokeDashoffset = "1";
      path.dataset.from = route.from;
      path.dataset.to = route.to;
      svg.appendChild(path);
      routeEls.push(path);
    });
    PINS.forEach(function (pin) {
      var svg = pin.map === "world" ? $("#overlayWorld") : $("#overlayMe");
      if (!svg) return;
      var g = ns("g");
      g.setAttribute("class", "pin");
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("transform", "translate(" + pin.x + " " + pin.y + ")");
      var label = pin.label + ". Show this part of the journey.";
      g.setAttribute("aria-label", label);
      var halo = ns("circle");
      halo.setAttribute("r", "9");
      halo.setAttribute("fill", "rgba(141,52,44,0.18)");
      var core = ns("circle");
      core.setAttribute("class", "core");
      core.setAttribute("r", "4.5");
      g.appendChild(halo);
      g.appendChild(core);
      g.addEventListener("click", function () {
        var el = document.getElementById("stop-" + pin.id);
        if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          g.click();
        }
      });
      svg.appendChild(g);
      pinEls.push({ id: pin.id, el: g });
    });
    fitLayers();
  }

  function fitLayers() {
    if (!stage) return;
    [["world", layerWorld, 700, 560], ["me", layerMe, 700, 330]].forEach(function (row) {
      var layer = row[1];
      if (!layer) return;
      var sw = stage.clientWidth;
      var sh = stage.clientHeight;
      var base = Math.min(sw / row[2], sh / row[3]);
      layer.dataset.base = String(base);
      layer.style.width = (row[2] * base) + "px";
      layer.style.height = (row[3] * base) + "px";
    });
  }

  function indexOfStop(id) {
    return order.indexOf(id);
  }

  function routeProgress(path, frac) {
    var a = indexOfStop(path.dataset.from);
    var b = indexOfStop(path.dataset.to);
    if (a < 0 || b < 0) return 0;
    if (b <= a) return frac >= a ? 1 : 0;
    return Math.min(1, Math.max(0, (frac - a) / (b - a)));
  }

  function focusLayer(layer, x, y, z) {
    if (!layer || !stage) return;
    var base = parseFloat(layer.dataset.base || "1");
    var sw = stage.clientWidth;
    var sh = stage.clientHeight;
    var left = sw / 2 - x * base * z;
    var top = sh / 2 - y * base * z;
    layer.style.transform = "translate(" + left + "px," + top + "px) scale(" + z + ")";
  }

  function midline() {
    if (window.innerWidth < 980 && stage) {
      var r = stage.getBoundingClientRect();
      return Math.min(window.innerHeight - 80, r.bottom + 20);
    }
    return window.innerHeight * 0.46;
  }

  var lastIndex = -1;
  var live = $("#mapLive");

  function updateJourney() {
    if (!order.length) return;
    var cards = $all(".stop");
    var line = midline();
    var idx = 0;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getBoundingClientRect().top <= line) idx = i;
    }
    var cur = cards[idx];
    var next = cards[idx + 1];
    var frac = idx;
    if (next) {
      var span = next.getBoundingClientRect().top - cur.getBoundingClientRect().top;
      var passed = line - cur.getBoundingClientRect().top;
      if (span > 0) frac = idx + Math.min(1, Math.max(0, passed / span));
    }
    var i0 = Math.floor(frac);
    var t = frac - i0;
    var idA = order[i0];
    var idB = order[Math.min(order.length - 1, i0 + 1)];
    var A = PLACES[idA];
    var B = PLACES[idB];
    var view = A;
    if (A && B && idA !== idB && A.map === B.map) {
      var e = t * t * (3 - 2 * t);
      view = {
        map: A.map,
        x: A.x + (B.x - A.x) * e,
        y: A.y + (B.y - A.y) * e,
        z: A.z + (B.z - A.z) * e
      };
    } else if (A && B && A.map !== B.map && t >= 0.5) {
      view = B;
    }
    if (view) {
      focusLayer(layerWorld, view.map === "world" ? view.x : 350, view.map === "world" ? view.y : 280, view.map === "world" ? view.z : 1);
      focusLayer(layerMe, view.map === "me" ? view.x : 350, view.map === "me" ? view.y : 165, view.map === "me" ? view.z : 1);
      if (layerWorld) layerWorld.classList.toggle("is-hidden", view.map !== "world");
      if (layerMe) layerMe.classList.toggle("is-hidden", view.map !== "me");
      var legendWorld = $("#legendWorld");
      var legendMe = $("#legendMe");
      if (legendWorld) legendWorld.hidden = view.map !== "world";
      if (legendMe) legendMe.hidden = view.map !== "me";
    }
    routeEls.forEach(function (path) {
      var p = routeProgress(path, frac);
      path.style.strokeDashoffset = String(1 - p);
    });
    var activeId = order[Math.min(order.length - 1, Math.round(frac))];
    cards.forEach(function (card) {
      card.classList.toggle("is-active", card.getAttribute("data-stop") === activeId);
    });
    pinEls.forEach(function (pin) {
      var on = pin.id === activeId || (activeId === "woodside" && pin.id === "mallee") || (activeId === "ceylon42" && pin.id === "colombo40") || (activeId === "whole" && pin.id === "mallee");
      pin.el.classList.toggle("is-active", on);
    });
    var activeCard = cards[Math.min(cards.length - 1, Math.round(frac))];
    var hudTitle = $("#hudTitle");
    var hudCount = $("#hudCount");
    if (activeCard && hudTitle) hudTitle.textContent = (activeCard.querySelector("h3") || {}).textContent || "";
    if (hudCount) hudCount.textContent = (Math.round(frac) + 1) + " of " + cards.length;
    var rounded = Math.round(frac);
    if (rounded !== lastIndex) {
      lastIndex = rounded;
      if (live && activeCard) {
        live.textContent = "Now at " + ((activeCard.querySelector("h3") || {}).textContent || "");
      }
      var id = order[rounded];
      var windy = id === "desert" || id === "tobruk" || id === "helwan" || id === "suez";
      setWind(windy);
      fadeTo(musicFor(id));
    }
  }

  /* Tobruk interactions */
  var dustOn = true;
  var dustCanvas = $("#dust");
  var dustBtn = $("#dustToggle");
  var dustRAF = 0;
  var grains = [];

  function resizeDust() {
    if (!dustCanvas) return;
    var rect = dustCanvas.parentElement.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    dustCanvas.width = Math.max(1, rect.width * dpr);
    dustCanvas.height = Math.max(1, rect.height * dpr);
  }

  function stepDust() {
    dustRAF = 0;
    if (!dustCanvas || !dustOn || reduced) return;
    var ctx = dustCanvas.getContext("2d");
    if (!ctx) return;
    var w = dustCanvas.width;
    var h = dustCanvas.height;
    if (grains.length < 70) {
      for (var i = grains.length; i < 70; i++) {
        grains.push({
          x: Math.random() * w,
          y: Math.random() * h,
          v: 0.4 + Math.random() * 1.4,
          r: 0.6 + Math.random() * 1.8,
          a: 0.15 + Math.random() * 0.4
        });
      }
    }
    ctx.clearRect(0, 0, w, h);
    grains.forEach(function (g) {
      g.x += g.v * 2.2;
      g.y += Math.sin(g.x * 0.01) * 0.4;
      if (g.x > w + 4) { g.x = -4; g.y = Math.random() * h; }
      ctx.fillStyle = "rgba(120, 84, 40," + g.a + ")";
      ctx.fillRect(g.x, g.y, g.r, g.r);
    });
    dustRAF = requestAnimationFrame(stepDust);
  }

  function dustRunning() {
    if (!dustCanvas) return;
    var shown = dustCanvas.getBoundingClientRect().bottom > 0 && dustCanvas.getBoundingClientRect().top < window.innerHeight;
    if (dustOn && shown && !reduced) {
      if (!dustRAF) dustRAF = requestAnimationFrame(stepDust);
    } else if (dustRAF) {
      cancelAnimationFrame(dustRAF);
      dustRAF = 0;
    }
  }

  if (dustBtn) {
    dustBtn.addEventListener("click", function () {
      dustOn = !dustOn;
      dustBtn.setAttribute("aria-pressed", dustOn ? "true" : "false");
      dustBtn.textContent = dustOn ? "Dust on" : "Dust off";
      if (!dustOn && dustCanvas) {
        var ctx = dustCanvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
      }
      dustRunning();
    });
  }

  $all(".hotspot").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $all(".hotspot").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var info = $("#hotInfo");
      var text = btn.getAttribute("data-text") || "";
      if (info) info.innerHTML = text;
    });
  });

  $all(".day-list button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $all(".day-list button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var detail = $("#dayDetail");
      var key = btn.getAttribute("data-day");
      if (detail && DAYS[key]) detail.textContent = DAYS[key];
    });
  });

  function animateCount(el, target) {
    if (!el) return;
    if (reduced) { el.textContent = String(target); return; }
    var start = 0;
    var t0 = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - t0) / 900);
      var n = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = n.toLocaleString("en-AU");
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var countsDone = false;
  function maybeCount() {
    if (countsDone) return;
    var box = $("#siegeCounts");
    if (!box) return;
    var r = box.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      countsDone = true;
      animateCount($("#countSiege"), 242);
      animateCount($("#countSection"), 94);
    }
  }
  var statsDone = false;
  function maybeStats() {
    if (statsDone) return;
    var any = document.querySelector("[data-count]");
    if (!any) return;
    var r = any.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      statsDone = true;
      $all("[data-count]").forEach(function (el) {
        animateCount(el, Number(el.getAttribute("data-count")));
      });
    }
  }

  /* Timeline filter */
  $all(".filters button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $all(".filters button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var kind = btn.getAttribute("data-filter");
      $all(".timeline li").forEach(function (li) {
        var show = kind === "all" || li.getAttribute("data-kind").split(" ").indexOf(kind) !== -1;
        li.hidden = !show;
      });
    });
  });

  /* Stamps open the matching record */
  $all(".stamp").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $all(".stamp").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var id = btn.getAttribute("data-target");
      var el = id && document.getElementById(id);
      if (el) {
        el.open = true;
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      }
    });
  });

  /* Quiz */
  var quizIndex = 0;
  var quizScore = 0;
  var quizLocked = false;
  var quizBox = $("#quizBox");

  function renderQuiz() {
    if (!quizBox) return;
    if (quizIndex >= QUIZ.length) {
      quizBox.innerHTML =
        "<p class='kicker'>For the grandchildren</p>" +
        "<p class='quiz-score'>" + quizScore + " out of " + QUIZ.length + "</p>" +
        "<p>You followed SX8216 from the Mallee to New Guinea. The ones about ships, sections and Tobruk are the booklet's inferences, each with a confidence and a Based on note. The dates and the medals are from his own record.</p>" +
        "<button type='button' class='btn' id='quizAgain'>Try again</button>";
      var again = $("#quizAgain");
      if (again) again.addEventListener("click", function () {
        quizIndex = 0;
        quizScore = 0;
        renderQuiz();
      });
      return;
    }
    var item = QUIZ[quizIndex];
    quizLocked = false;
    var html = "<p class='kicker'>Question " + (quizIndex + 1) + " of " + QUIZ.length + "</p><h3>" + item.q + "</h3><div class='choices'>";
    item.choices.forEach(function (choice, i) {
      html += "<button type='button' data-choice='" + i + "'>" + choice + "</button>";
    });
    html += "</div><p id='quizWhy' class='small'></p>";
    quizBox.innerHTML = html;
    $all("[data-choice]", quizBox).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quizLocked) return;
        quizLocked = true;
        var picked = Number(btn.getAttribute("data-choice"));
        $all("[data-choice]", quizBox).forEach(function (b) {
          var n = Number(b.getAttribute("data-choice"));
          if (n === item.answer) b.classList.add("good");
          else if (n === picked) b.classList.add("bad");
          b.disabled = true;
        });
        if (picked === item.answer) quizScore += 1;
        var why = $("#quizWhy");
        if (why) why.textContent = item.why;
        var next = document.createElement("button");
        next.type = "button";
        next.className = "btn";
        next.style.marginTop = "8px";
        next.textContent = quizIndex === QUIZ.length - 1 ? "See your score" : "Next question";
        next.addEventListener("click", function () {
          quizIndex += 1;
          renderQuiz();
        });
        quizBox.appendChild(next);
      });
    });
  }
  renderQuiz();

  /* Films, loaded only after a click */
  $all("[data-film]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var holder = btn.closest(".film");
      if (!holder) return;
      var id = btn.getAttribute("data-film");
      var title = btn.getAttribute("data-title") || "Newsreel";
      holder.innerHTML = "<iframe title=\"" + title.replace(/"/g, "") + "\" src=\"https://www.youtube-nocookie.com/embed/" + id + "?rel=0\" allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    });
  });

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      onScrollProgress();
      markNav();
      updateJourney();
      dustRunning();
      maybeCount();
      maybeStats();
    });
  }

  window.addEventListener("resize", function () {
    layoutCompare();
    fitLayers();
    resizeDust();
    updateJourney();
  });
  window.addEventListener("scroll", onScroll, { passive: true });

  buildMap();
  resizeDust();
  updateJourney();
  onScrollProgress();
  markNav();
  syncMuteButton();
})();
