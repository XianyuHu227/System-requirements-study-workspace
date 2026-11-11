# Development notes

## Snapshot

This is the first public source snapshot of a working personal revision tool. The private deployment repository and runtime database are separate. No deployment credentials, original private Git history or individual learning records are included.

The existing `prototype` repository uses a simple native HTML/CSS/JavaScript layout. This project keeps that direct approach and adds a documented Worker backend, SQL migration and tests as the requirements grow.

## Requirements that shaped the implementation

| Need discovered through use | Resulting behaviour |
| --- | --- |
| Understand concepts and then answer in English | Paired Chinese/English content plus a display-language switch. |
| Avoid an overly bright screen | Black-led theme with crimson and navy accents. |
| Get feedback on independent answers | Server-owned task context, criteria and structured bilingual AI feedback. |
| Ask a question without leaving the current topic | Persistent floating tutor and bounded follow-up context. |
| Choose a provider and thinking setting | Canonical model discovery and provider-specific capability mapping. |
| Keep API keys out of the browser | Fixed backend provider endpoints and runtime secrets. |
| Stop moving JSON files between devices | Local-first cloud sync with conflict detection and recoverable alternate versions. |
| Avoid treating generated guidance as a teacher answer key | Provenance links and explicit course-explanation/application/missing-evidence distinctions. |

## Commands

| Command | Result |
| --- | --- |
| `npm run build` | Creates `dist/server/index.js` with embedded browser assets and course context. |
| `npm run dev` | Starts the local-only preview after a build; uses `.openai/preview-progress.sqlite`. |
| `npm test` | Runs API, provider, SQLite sync and bilingual render checks. |

No npm install step is needed for the current dependency-free codebase. Node.js 24+ is required for the built-in SQLite test/preview adapter.

## Testing scope

The suite covers API model discovery/caching, server-owned task context, schema and source checks, input bounds, origin rejection, safe provider errors, authenticated paid AI, provider isolation, bilingual content, existing-record compatibility and quiz correction.

Sync tests instantiate independent clients against the production handler with real in-memory SQLite. They exercise concurrent writes, offline reload, first migration, clears, conflicting versions, account isolation, typing during upload and a lost response after a successful database commit.

Live provider checks were performed during development, but are intentionally excluded from automated tests and CI. Their success does not guarantee future provider availability or a particular AI answer.

## Remaining work

- Improve mobile navigation, feedback presentation and accessibility.
- Make course-content configuration easier to reuse for another subject.
- Add a documented authentication adapter for hosting outside Sites.
- Introduce durable account-wide API quotas if broader paid access is added.
- Evaluate tutor accuracy against an explicit set of course-grounded questions.
- Review course-content permissions before expanding distribution.

This list records known scope rather than implying those features are implemented.
