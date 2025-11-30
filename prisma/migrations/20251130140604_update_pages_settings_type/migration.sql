/*
  Warnings:

  - The `settings` column on the `pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pages" DROP COLUMN "settings",
ADD COLUMN     "settings" JSONB;
