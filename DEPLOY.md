# Putting Premier Zone online

The API runs on Render (free), the database on Neon (free), and the portfolio on Vercel calls it.
About 15 minutes. You only need to click through sign-ups and paste a few values.

## 1. Database (Neon)
1. Sign up at https://neon.tech (GitHub login is fine) and create a project. Any name; pick the Sydney region.
2. Open **SQL Editor**, paste the whole of `premier-zone/db/player_stats.sql`, and run it. It should end with `587`.
3. Click **Connect** and copy the connection details. You'll get something like
   `postgresql://neondb_owner:abc123@ep-cool-name-12345.ap-southeast-2.aws.neon.tech/neondb?sslmode=require`

## 2. API (Render)
1. Sign up at https://render.com with GitHub and allow access to the `premier-zone` repo.
2. **New > Blueprint**, pick `premier-zone`. Render reads `render.yaml` and asks for three values. From the Neon string above:
   - `DB_URL` = `jdbc:postgresql://ep-cool-name-12345.ap-southeast-2.aws.neon.tech/neondb?sslmode=require`
     (the part after `@`, with `jdbc:postgresql://` in front)
   - `DB_USERNAME` = `neondb_owner` (between `//` and `:`)
   - `DB_PASSWORD` = `abc123` (between `:` and `@`)
3. Deploy. The first build takes about 5 minutes. When it's live, open
   `https://<your-service>.onrender.com/api/v1/player?team=Arsenal` and you should see JSON.

The hosted copy is read-only (`READ_ONLY=true`): the API has no login, so POST/PUT/DELETE are refused there.
Free Render services sleep after 15 minutes idle and take up to a minute to wake. The portfolio page
falls back to its built-in snapshot after 8 seconds, so visitors always see data.

## 3. Portfolio (Vercel)
1. Vercel > your portfolio project > **Settings > Environment Variables**:
   `VITE_PREMIER_ZONE_API` = `https://<your-service>.onrender.com` (no trailing slash), for Production.
2. **Deployments** > latest > **Redeploy**.
3. Open `/premier-zone` on your site. The status should say `live API`.

If your portfolio uses a custom domain (not `*.vercel.app`), add it to `CORS_ORIGINS` in Render's environment settings.
