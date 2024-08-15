-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "body" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
