/*
  Warnings:

  - You are about to drop the `_GoalSkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `goalId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_GoalSkills_B_index";

-- DropIndex
DROP INDEX "_GoalSkills_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GoalSkills";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "goalId" INTEGER NOT NULL,
    CONSTRAINT "Skill_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("category", "description", "id", "name") SELECT "category", "description", "id", "name" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
