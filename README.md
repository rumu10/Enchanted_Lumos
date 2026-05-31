# Enchanted Lumos Portfolio

This is a simple static portfolio site built with plain HTML, CSS, and JavaScript.

## Hosting on GitHub Pages

1. Initialize a Git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   ```
2. Create a GitHub repository and add it as a remote:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Open `Settings` > `Pages`.
   - Under `Source`, choose the `main` branch and `/(root)` folder.
   - Save.
4. Visit your site:
   - If your repo is `https://github.com/<your-username>/<your-repo>`, the site is usually at:
     `https://<your-username>.github.io/<your-repo>/`

## Notes

- The site is a plain static site, so GitHub Pages works without any build tools.
- Keep `index.html`, `styles.css`, `script.js`, and the `assets/` folder together in the root.
- If you change image paths or add new assets, just commit and push again.
