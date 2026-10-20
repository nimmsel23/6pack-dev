# 6Pack App

## In-App-Update-Changelog

The standalone 6Pack app shows a release dialog when it sees a release ID that
has not yet been acknowledged in this browser. The dialog lists the commits
included in the deployment, links each entry to GitHub, and links to the full
commit history. The first launch after this feature is installed also shows
the current release notes. Dismissing the dialog records the release ID in
`localStorage`, so it does not reappear until a different release is loaded.

`scripts/write-release-info.mjs` creates `public/release-info.json` from the
GitHub push event. The Vite build copies it into the deployed app. For local
builds and dev sessions the same script falls back to the current Git commit.
The generated JSON is ignored by Git. `main.jsx` fetches it without the browser
cache and renders the dialog.

The feature is currently the 6pack-dev pilot. After validating it in the
preview deployment, the shared approach can be rolled out to the other apps.
