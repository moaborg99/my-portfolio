-- CreateTable
CREATE TABLE "TechnicalSkill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ProjectTechnicalSkill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "technicalSkillId" INTEGER NOT NULL,
    "displayOrder" INTEGER,
    CONSTRAINT "ProjectTechnicalSkill_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectTechnicalSkill_technicalSkillId_fkey" FOREIGN KEY ("technicalSkillId") REFERENCES "TechnicalSkill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalSkill_slug_key" ON "TechnicalSkill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTechnicalSkill_projectId_technicalSkillId_key" ON "ProjectTechnicalSkill"("projectId", "technicalSkillId");
