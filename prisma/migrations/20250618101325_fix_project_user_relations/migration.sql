-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateTable
CREATE TABLE "ProjectMember" (
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "ProjectRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("projectId","userId")
);

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
