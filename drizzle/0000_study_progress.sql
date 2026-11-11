CREATE TABLE `study_progress` (
  `user_id` text PRIMARY KEY NOT NULL,
  `revision` integer NOT NULL,
  `document` text NOT NULL,
  `updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `study_progress_history` (
  `user_id` text NOT NULL,
  `revision` integer NOT NULL,
  `document` text NOT NULL,
  `updated_at` text NOT NULL,
  PRIMARY KEY (`user_id`, `revision`)
);
