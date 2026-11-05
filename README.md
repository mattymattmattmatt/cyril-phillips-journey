# Cyril Roy Phillips, SX8216: An Interactive War Journey

A static family website that follows Cyril Roy Phillips, SX8216, Craftsman in the 2nd AIF, from enlistment at Adelaide in 1940 to discharge at Wayville in 1944. The story, the scroll-driven map, the Tobruk chapter, the timeline, the service-record stamps and the quiz all live in `index.html`, `css/` and `js/`.

`source/` is the research the site is built from, and it stays in the repository: the family booklet (HTML chapters and the first PDF), the November 2026 fact-checked edition (`source/Cyril_Roy_Phillips_SX8216_Fact_Checked_Edition.pdf`), his enlistment portrait (original and colourised), service record pages (NAA B883 SX8216), unit war diary pages (AWM52), public-domain AWM photographs, and the maps.

The fact-checked edition is the factual backbone of the site. What a record or a named witness establishes is said plainly. What is still only probable keeps a confidence label and a **Based on** note: the *Nieuw Holland* is “very probably” his 1940 ship, HMAS *Stuart* is a strong candidate for the Tobruk evacuation, the windmill is still unlocated, No. 1 Group at Greta is unproven, and Irene’s surname before marriage is unconfirmed. Wider events are labelled as background.

## GitHub Pages

The site is plain HTML, CSS and JavaScript. Paths are relative, so it works on a project site (`https://<user>.github.io/<repo>/`) as well as on a user site.

1. Push this repository to GitHub, on the `main` branch.
2. Open the repository on GitHub, then **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**. Save.
5. Wait for the Pages build to finish. The site address is shown at the top of the Pages settings.

`source/` is published with the site, which is what we want: the booklet PDF and the record scans are linked from the page. A file named `.nojekyll` is in the root so GitHub Pages serves the files as they are, without running Jekyll.

To preview on your own computer, from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Opening `index.html` as a file works for the story and the pictures. The map is inline. Sound and fonts are in the repository, not loaded from another site. The two newsreels are YouTube embeds and play only after a click.
