-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "githubUrl" TEXT,
    "deployUrl" TEXT,
    "videoUrl" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTechUsageItem" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "techName" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectTechUsageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectLearningItem" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectLearningItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TechnicalSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTechnicalSkill" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "technicalSkillId" INTEGER NOT NULL,
    "displayOrder" INTEGER,

    CONSTRAINT "ProjectTechnicalSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "ProjectTechUsageItem_projectId_idx" ON "ProjectTechUsageItem"("projectId");

-- CreateIndex
CREATE INDEX "ProjectLearningItem_projectId_idx" ON "ProjectLearningItem"("projectId");

-- CreateIndex
CREATE INDEX "ProjectImage_projectId_idx" ON "ProjectImage"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalSkill_slug_key" ON "TechnicalSkill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTechnicalSkill_projectId_technicalSkillId_key" ON "ProjectTechnicalSkill"("projectId", "technicalSkillId");

-- AddForeignKey
ALTER TABLE "ProjectTechUsageItem" ADD CONSTRAINT "ProjectTechUsageItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectLearningItem" ADD CONSTRAINT "ProjectLearningItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechnicalSkill" ADD CONSTRAINT "ProjectTechnicalSkill_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTechnicalSkill" ADD CONSTRAINT "ProjectTechnicalSkill_technicalSkillId_fkey" FOREIGN KEY ("technicalSkillId") REFERENCES "TechnicalSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
