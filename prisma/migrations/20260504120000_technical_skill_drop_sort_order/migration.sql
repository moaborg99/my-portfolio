-- Drop manual sort column; ordering is alphabetical by name in app code.

ALTER TABLE "TechnicalSkill" DROP COLUMN IF EXISTS "sortOrder";
