# 🐙 Publish strawberries.moon with GitHub (GitHub Pages)

A complete, no-coding-needed guide. ~30 minutes the first time.
GitHub Pages hosts your static shop for **free** with **HTTPS**.

---

## Before you start
Have your shop folder ready (unzip the download). It should contain:
`index.html`, `product.html`, `admin.html`, `catalog.js`, `products.json`,
`colors_and_type.css`, and the folders `brand/`, `assets/`, `photos/`.

> ⭐ IMPORTANT: you upload the **contents** of the shop folder, so that
> `index.html` sits at the top level of the repository (not inside a subfolder).
> Otherwise your homepage won't show.

---

## STEP 1 · Create a GitHub account (5 min)
1. Go to **github.com** → **Sign up**
2. Enter email, password, pick a username
   - Your username becomes part of the free URL, e.g. username `strawberriesmoon`
     → site at `https://strawberriesmoon.github.io/shop/`
3. Verify your email

---

## STEP 2 · Create a repository (3 min)
1. Click the **+** (top-right) → **New repository**
2. **Repository name:** `shop` (or `strawberries-moon`)
3. Set it **Public** (required for free GitHub Pages)
4. Leave everything else default
5. Click **Create repository**

---

## STEP 3 · Upload your shop files (5 min)
1. On the new empty repo page, click the link **"uploading an existing file"**
   (or **Add file → Upload files**)
2. Open your shop folder on your computer
3. **Select ALL the files and folders INSIDE it** (not the folder itself):
   - `index.html`, `product.html`, `admin.html`, `catalog.js`,
     `products.json`, `colors_and_type.css`
   - the `brand`, `assets`, `photos` folders
4. **Drag them all** into the GitHub upload area
5. Wait for them to finish uploading (you'll see the file list)
6. Scroll down → in **Commit changes**, type "first upload" → click **Commit changes**

---

## STEP 4 · Turn on GitHub Pages (3 min)
1. In your repo, click **Settings** (top menu)
2. Left sidebar → **Pages**
3. Under **Build and deployment → Source**, choose **Deploy from a branch**
4. **Branch:** select **main**, folder **/ (root)** → click **Save**
5. Wait 1–2 minutes. Refresh the page.
6. You'll see: **"Your site is live at https://USERNAME.github.io/shop/"**
7. Click it — your shop is public! 🎉

   - Homepage: `https://USERNAME.github.io/shop/`
   - Admin: `https://USERNAME.github.io/shop/admin.html` (password: your admin password)

---

## STEP 5 · Update products later (the routine)
1. Open `admin.html` on the live site (or locally) → edit products → **PUBLISH** → downloads `products.json`
2. In your GitHub repo, click **`products.json`** → the **pencil (Edit)** icon →
   delete its contents → paste the new file's contents
   - OR: **Add file → Upload files** → drag the new `products.json` → commit (it replaces the old one)
3. Commit changes. The live site updates in ~1 minute.

> Uploading new product photos? Do the same with the whole folder, or just
> re-upload `products.json` if you only changed text/prices/links.

---

## STEP 6 · Connect your own domain (15 min)
1. Repo **Settings → Pages → Custom domain**
2. Type your domain (e.g. `strawberriesmoon.com`) → **Save**
3. GitHub creates a file called `CNAME` in your repo (leave it)
4. Go to your domain registrar's **DNS settings** and add:
   - Four **A records** for the apex domain pointing to GitHub:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - One **CNAME record**: `www` → `USERNAME.github.io`
5. Back in GitHub Pages settings, wait, then tick **Enforce HTTPS**
6. Wait 10–60 min for DNS. Visit your domain — done. 🌙

---

## Keeping admin private
- The admin link isn't shown anywhere public, and it has a password gate.
- ⚠️ Because GitHub Pages is fully public, the `admin.html` file (and its
  password) is technically viewable by anyone who really digs. The admin is
  view-only — it can't change the live `products.json` without GitHub access —
  so the risk is low. To raise the password's strength, edit the value
  `ADMIN_PW` near the top of `admin.html` to something long before uploading.

---

## Safety summary
✅ No payments on the site — 7-11 賣貨便 handles all orders & money
✅ No server/database to hack — just static files
✅ HTTPS free & automatic
✅ Every change is version-saved in GitHub (you can undo)

---

## GitHub vs Netlify — which?
| | GitHub Pages | Netlify Drop |
|---|---|---|
| Setup | account + repo + upload | drag a folder |
| Speed to first deploy | ~15 min | ~3 min |
| Update method | edit/upload file in repo | re-drag folder |
| Version history | ✅ yes | basic |
| Custom domain + HTTPS | ✅ free | ✅ free |

Both are free and good. GitHub = more control + history. Netlify = fastest.

**Stuck on a step? Tell me the step number and what you see.**
