# Discuss a practice answer

The floating tutor supports both DeepSeek and Kimi with the existing model and effort controls. Open **Discuss this task** beside an answer checker, **Explain this criterion** beside a criterion, or **Discuss this improvement** beneath a suggestion. These buttons open the tutor and prepare a question; sending remains a separate action and uses the selected provider's API balance.

The linked-exercise picker follows the visible question by default. Selecting a task explicitly keeps it linked when navigating elsewhere. General course Q&A has its own thread. The context preview shows the task, current draft and saved feedback. Uncheck the attachment checkbox to omit the current draft and saved review from the next request; previous messages in that thread remain conversation context.

For an attached task, `/api/ask` resolves the question, practice reference and criteria from the server-owned catalog. It separately receives the student's live draft, the saved review's graded draft, validated feedback and optional criterion/improvement index. The two drafts are compared explicitly so old feedback is not presented as a review of new edits. Browser-saved feedback is fallible, untrusted practice data, including imported records. It cannot override the curated course evidence. The tutor is instructed to challenge unsupported earlier suggestions and cite course sources. It does not see drawing pixels or promise an official mark.

Only the last two messages belonging to the selected task are submitted as conversation history. The server rejects history labelled with a different task. Stored replies include task metadata but do not duplicate the full draft or review. Existing cloud sync and JSON exports preserve this metadata; the existing limit of 20 stored exchanges applies across all tasks. Older unlinked chats remain in General course Q&A.

Provider keys stay in server environment variables. Existing owner authentication, same-origin checks, provider validation, citation checks and rate limits apply unchanged.

`npm run build && npm test` includes `scripts/test-tutor-context.mjs`, which exercises both providers with mocked replies, task integrity, stale feedback, per-task histories, opt-out, input bounds, live-draft capture and sync compatibility without paid AI requests.
