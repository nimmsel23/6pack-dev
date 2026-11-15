# HIIT ABS Session Contract

## User-visible result

A completed 6Pack run is one `HIIT ABS` activity in the Fitness session model. Its
exercise names and durations are detail data on that activity, not ordinary
session exercises. Fitness can show one compact HIIT ABS row and put the details
behind a disclosure. Fitness' existing Activity Finisher UI is the downstream
rendering point to replace for this slot. Actual cardio remains a separate
`sessionMode: cardio` session.

The run is still recorded separately from 6Pack program progress:

- Session: `fitness/{uid}/sessions/{date}__sixpack-{runId}`.
- Program progress: `users/{uid}/meta/sixpack`.

Advancing the program does not prove that the session write succeeded. The
session callback must run independently with the same stable `runId` on retry.
The runner waits for that callback before advancing the program day. A rejected
write is reported to the user and leaves program progress unchanged; a persisted
offline queue item counts as saved locally.

## Payload produced by the runner

`SixPackApp.jsx` builds `activity` with `slot: 'hiit-abs'`, `type: 'hiit'`, core
muscle metadata, the stable runner `runId`, actual elapsed workout minutes,
`label: 'HIIT ABS'`, and an
`exercises` array of `{ name, seconds }`. Rest intervals are excluded from that
detail list; duration still comes from the complete timed workout. The callback
sets `block: 'HIIT ABS'` and leaves the top-level `exercises` empty. This keeps
the UI from treating every move as a conventional strength exercise. The type
and muscle metadata remain available to Fitness activity analysis.

`workoutDoc.js` supplies the common session envelope: date, stable session ID,
source, modality, activity, empty top-level exercise list, notes, and completed
session gate. `modality: 'core'` maps to the existing non-cardio mode. The
Fitness-facing UI needs to use `activity.slot` / `activity.label` to render the
HIIT ABS slot and its disclosure; that work is tracked in Fitness TODO with the
producer commit reference.

## `sixpackCloud.js`, line by line

| Line(s) | Behavior |
|---|---|
| 1–2 | Defines this module as the Firebase boundary for the 6Pack web entry. Fitness stores through its `@db` adapter. |
| 3 | Blank separator; no runtime effect. |
| 4–7 | States the session path and outbox behavior. Stable document IDs make a retry idempotent. |
| 8 | Imports default Firebase app discovery and initialization. |
| 9 | Imports Firestore initialization, persistent cache, document refs, read/write, and server timestamp. |
| 10 | Imports Firebase auth state, Google provider/sign-in, and sign-out. |
| 11 | Imports the pure common session-document builder. |
| 12 | Imports pure program serialization. |
| 13 | Imports the dedicated Push functions. |
| 14 | Blank separator. |
| 15–17 | Notes shared Firebase project; imports native detection and public Firebase web config. |
| 18 | Blank separator. |
| 19 | Names the localStorage key; `v1` identifies the current queue format. |
| 20 | Blank separator. |
| 21 | Reuses the default Firebase app or initializes it. |
| 22–25 | Creates Firestore with IndexedDB persistence, multi-tab coordination, and undefined-field tolerance. |
| 26 | Gets Auth for the same Firebase app. |
| 27 | Blank separator. |
| 28 | Caches the current user in memory. |
| 29 | Holds active UI subscribers. |
| 30 | Blank separator. |
| 31 | Starts the local outbox reader. |
| 32–34 | Reads and parses queue JSON; accepts arrays only. |
| 35–38 | On storage/parse failure, warns and returns an empty in-memory view without rewriting the stored raw value. |
| 39 | Closes the reader. |
| 40 | Starts the queue writer. |
| 41–43 | Reads any existing queue and refuses to overwrite a non-array/corrupt payload. |
| 44–45 | Stores the replacement queue and reports success. |
| 46–49 | Warns on storage/parse error and reports failure to the caller. |
| 50 | Closes the writer. |
| 51 | Starts the account-aware pending counter. |
| 52 | Filters stored items. |
| 53 | Uses explicit queue ownership, falling back to the legacy document UID. |
| 54–55 | Includes guest records and records owned by the selected account, then returns the count. |
| 56 | Closes the counter. |
| 57 | Starts the UI state emitter. |
| 58 | Builds the state from current user and account-aware pending count. |
| 59 | Calls each subscriber. |
| 60 | Closes the emitter. |
| 61 | Blank separator. |
| 62–67 | Writes one session document under the UID path, with user ID and server save time. |
| 68 | Blank separator. |
| 69 | Holds the in-flight flush promise. |
| 70–72 | Exposes flush; signed-out calls leave the queue alone, concurrent calls share the current promise. |
| 73–75 | Starts a flush, captures the active UID, and snapshots queued records. |
| 76 | Iterates those records. |
| 77–79 | Resolves owner from current or legacy queue format; adopts guests and skips records from other accounts. |
| 80–82 | Writes the session before removing its queue entry; a failed queue removal only causes an idempotent resend. |
| 83–86 | On Firestore failure, keeps the item, warns, and ends this pass. |
| 87–90 | Emits state, clears the lock in `finally`, and returns the shared promise. |
| 91 | Closes `flushOutbox`. |
| 92 | Blank separator. |
| 93–94 | Explains the Fitness coach-profile metadata requirement. |
| 95–106 | Creates that profile only when absent, preserves existing fields, and warns without blocking workout writes on failure. |
| 107 | Blank separator. |
| 108–112 | Tracks sign-in state, emits it, flushes eligible sessions, and ensures profile metadata. |
| 113 | Blank separator. |
| 114–118 | Registers an immediate subscriber and returns an unsubscribe callback. |
| 119 | Blank separator. |
| 120–121 | Exposes Google sign-in and sign-out. |
| 122 | Blank separator. |
| 123 | Identifies the workout callback adapter. |
| 124–131 | Builds the common session document with `sixpack` source, modality, and current UID. |
| 132 | Adds queue ownership; guest workouts are unassigned until account adoption. |
| 133–134 | Replaces any queued copy with the same document ID and emits state. |
| 135–138 | On local storage failure, rejects an offline guest; a signed-in user gets a direct Firestore attempt. |
| 139–140 | Otherwise starts or joins the queue flush. |
| 141 | Blank separator. |
| 142 | Documents the separate Track/program storage path. |
| 143–146 | Loads the user's program document, returning null when it does not exist. |
| 147–149 | Serializes and writes program progress with a server timestamp. |
| 150 | Blank separator. |
| 151–153 | Documents the push-token path and the Cloud Function that reads it. |
| 154–157 | Registers push with the same app, database, and auth. |
| 158–159 | Describes foreground message forwarding. |
| 160–161 | Tracks the unsubscribe callback and auth-generation counter. |
| 162–166 | On auth changes, invalidates the previous listener and skips signed-out/native users. |
| 167–171 | Checks browser support, rejects stale async results after account switches, starts the listener, and warns on failure. |

## Design improvement plan

1. Keep the current `sixpackCloud.js` name: the module coordinates this app's
   Firebase features, not only offline storage. Do not call the whole app
   “standalone” to explain this module.
2. In the next focused refactor, extract only the local queue and session writes
   into `workoutSessions.js`; leave auth/profile/program orchestration in the
   web entry's service module and keep Push in `push.js`. Preserve the existing
   Firestore paths and queue format during that move.
3. Surface the malformed-queue error in the UI while preserving the raw
   localStorage value. Add a small pure test for guest
   adoption, same-account replay, foreign-account isolation, and failed writes
   before changing queue persistence again.
4. Fitness owns the HIIT ABS card and collapsed details. Keep its saved exercise
   detail nested under the activity; do not turn it into standard exercise
   rows, and do not map it to the cardio session mode.
