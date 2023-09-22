-- CreateTable
CREATE TABLE "project-on-user" (
    "_id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "project-on-user_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "project-on-user" ADD CONSTRAINT "project-on-user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project-on-user" ADD CONSTRAINT "project-on-user_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
