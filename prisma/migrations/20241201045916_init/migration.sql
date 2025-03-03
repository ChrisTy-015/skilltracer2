/*
  Warnings:

  - The primary key for the `GoalSkills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GoalSkills` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GoalSkills" (
    "goalId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,

    PRIMARY KEY ("goalId", "skillId"),
    CONSTRAINT "GoalSkills_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GoalSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GoalSkills" ("goalId", "skillId") SELECT "goalId", "skillId" FROM "GoalSkills";
DROP TABLE "GoalSkills";
ALTER TABLE "new_GoalSkills" RENAME TO "GoalSkills";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
