# TESTING_AFTER_DEPLOY

Steps to verify after you push to Git and Render builds:

1. Open https://<your-render-url>/ - homepage should load without errors.
2. Check page source (Right-click → View page source) and confirm meta description and keywords are present.
3. Visit https://<your-domain>/robots.txt and https://<your-domain>/sitemap.xml to confirm they are served.
4. Use Google Search Console to submit sitemap.xml.
5. Verify console for any 404 or missing assets.
