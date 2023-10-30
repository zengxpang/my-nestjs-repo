/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Employee_departmentId_key` ON `Employee`(`departmentId`);
