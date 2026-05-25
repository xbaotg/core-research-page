-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Publication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "venue" TEXT,
    "venueDetail" TEXT,
    "year" INTEGER,
    "abstract" TEXT,
    "slug" TEXT,
    "overview" TEXT,
    "results" TEXT,
    "highlights" TEXT,
    "figures" TEXT NOT NULL DEFAULT '[]',
    "pdfUrl" TEXT,
    "codeUrl" TEXT,
    "projectUrl" TEXT,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Publication" ("abstract", "authors", "codeUrl", "createdAt", "featured", "id", "image", "order", "pdfUrl", "projectUrl", "title", "venue", "year") SELECT "abstract", "authors", "codeUrl", "createdAt", "featured", "id", "image", "order", "pdfUrl", "projectUrl", "title", "venue", "year" FROM "Publication";
DROP TABLE "Publication";
ALTER TABLE "new_Publication" RENAME TO "Publication";
CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
