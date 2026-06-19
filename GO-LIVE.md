# 🌙 strawberries.moon — Go Live Today

A simple, **view-only** shop. Customers browse here, then click a product's
button to order through **7-11 賣貨便**. No payment code, no server — just a
fast, safe static website.

---

## How it works (important to understand)

- The shop reads its products from **`products.json`** — the file that ships with the site.
- **Everyone sees the same `products.json`.** That's your live catalog.
- The **admin page** (`admin.html`) is your private editor. Your edits save in *your* browser.
- When you're happy, click **PUBLISH** in admin → it downloads a fresh `products.json`.
- You upload that `products.json` to your host → the live site updates for everyone.

So the loop is: **edit in admin → Publish → upload products.json → done.**

---

## STEP 1 · Build your real catalog (20 min)

1. Open `admin.html`
2. Delete the two demo products (open each, scroll down, **delete product**)
3. Click **+ new product** for each real item. For each one fill in:
   - **title** (e.g. `Kodak Gold 200 · 36張`)
   - **price** (e.g. `280`)
   - **tag** (optional — `現貨`, `new`, `預購`)
   - **description**
   - **photos** — click **+ add photo**, choose from your computer (auto-compressed)
   - **variants** — sizes/options + stock (optional)
   - **賣貨便 link** — paste the 7-11 賣貨便 order URL for this product ⭐
4. Click **⬇ PUBLISH** → a file called `products.json` downloads to your computer
5. Keep that file — you'll upload it in Step 3

### Getting your 賣貨便 links
- Open the **7-11 賣貨便 / 交貨便** seller app or web
- Create a listing for each product
- Copy each listing's **share link** (looks like `https://myship.7-11.com.tw/...`)
- Paste it into that product's **賣貨便 link** field in admin

---

## STEP 2 · Get the site files

You need this whole folder: **`ui_kits/shop/`**

It contains: `index.html`, `product.html`, `admin.html`, `catalog.js`,
`products.json`, `colors_and_type.css`, `brand/`, `assets/`, `photos/`.

> Tip: ask me to "package the shop for download" and I'll hand you a single
> zip with everything, including your published `products.json`.

---

## STEP 3 · Put it online (fastest path — Netlify Drop, ~5 min, free)

No account, no GitHub needed to start:

1. Go to **app.netlify.com/drop**
2. Drag your **shop** folder onto the page
3. Wait ~30 seconds → you get a live URL like `https://gentle-moon-1234.netlify.app`
4. **That's it — your shop is public.** 🎉
5. Sign up (free) when prompted, so the site stays up permanently and you can update it.

**To update later:** edit in admin → Publish → on Netlify, open your site →
**Deploys** → drag the new `products.json` (or the whole folder) to redeploy.

---

## STEP 4 · Connect your domain (~15 min)

1. In Netlify: **Site configuration → Domain management → Add a domain**
2. Type your domain (e.g. `strawberriesmoon.com`)
3. Netlify shows you DNS records
4. Go to where you bought the domain → DNS settings
5. Add the records Netlify gives you (usually a `CNAME` and/or nameserver change)
6. Wait 10–30 min. Netlify adds HTTPS automatically.
7. Visit your domain — done.

---

## Keeping the admin page private

- The admin link is **not shown anywhere** on the public site. Customers can't see it.
- But the file `admin.html` IS reachable if someone types the URL directly.
- Since it's view-only (admin just edits *your* local copy and can't change the
  live `products.json` without access to your host), the risk is low.
- **For real protection**, in Netlify: **Site configuration → Access control →
  Password protection** (or "Visitor access") and password-protect the whole site,
  OR ask me to add a password gate specifically to admin.

---

## Safety summary

✅ No payment data ever touches your site — 7-11 賣貨便 handles all orders & money
✅ No server to hack, no database to leak — it's just static files
✅ HTTPS automatic via Netlify
✅ Admin link hidden from customers
✅ Product text is plain text — no script injection risk
⚠️ Compress big photos (admin does this automatically, keep under ~20 photos total for speed)

---

## Other host options (if you don't want Netlify)

| Host | Good for | Cost |
|---|---|---|
| **Netlify Drop** | fastest, drag & drop | free |
| **Cloudflare Pages** | fast in Asia, custom domain | free |
| **GitHub Pages** | if you want version history | free |
| **Vercel** | similar to Netlify | free |

All work the same way: upload the `shop` folder, get a URL, connect domain.

---

**Stuck on any step? Tell me which step number and what you see, and I'll help.**
