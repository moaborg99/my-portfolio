-- Promote TechnicalSkill.group (text) to a real TechStackGroup entity with cascade delete.

-- 1. Create the new entity table.
CREATE TABLE "TechStackGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "TechStackGroup_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TechStackGroup_name_key" ON "TechStackGroup"("name");
CREATE UNIQUE INDEX "TechStackGroup_slug_key" ON "TechStackGroup"("slug");

-- 2. Seed groups from distinct existing skill.group strings (naive slug; admin-only).
INSERT INTO "TechStackGroup" ("name", "slug")
SELECT DISTINCT
    "group" AS name,
    LOWER(REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE("group", '[åÅ]', 'a', 'g'), '[äÄöÖ]', 'o', 'g'), '[^a-zA-Z0-9]+', '-', 'g')) AS slug
FROM "TechnicalSkill"
WHERE "group" IS NOT NULL AND "group" <> '';

-- 3. Add nullable groupId on TechnicalSkill, backfill from group name.
ALTER TABLE "TechnicalSkill" ADD COLUMN "groupId" INTEGER;

UPDATE "TechnicalSkill" t
SET "groupId" = g."id"
FROM "TechStackGroup" g
WHERE g."name" = t."group";

-- 4. Enforce NOT NULL + CASCADE FK, drop the legacy column, add lookup index.
ALTER TABLE "TechnicalSkill" ALTER COLUMN "groupId" SET NOT NULL;

ALTER TABLE "TechnicalSkill"
    ADD CONSTRAINT "TechnicalSkill_groupId_fkey"
    FOREIGN KEY ("groupId") REFERENCES "TechStackGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TechnicalSkill" DROP COLUMN "group";

CREATE INDEX "TechnicalSkill_groupId_idx" ON "TechnicalSkill"("groupId");
