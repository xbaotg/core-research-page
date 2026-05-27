-- CreateTable
CREATE TABLE "Dataset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "tagline" TEXT,
    "description" TEXT,
    "modality" TEXT,
    "task" TEXT,
    "year" INTEGER,
    "license" TEXT,
    "stats" TEXT NOT NULL DEFAULT '[]',
    "samples" TEXT NOT NULL DEFAULT '[]',
    "driveUrl" TEXT,
    "paperUrl" TEXT,
    "codeUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Dataset_slug_key" ON "Dataset"("slug");
