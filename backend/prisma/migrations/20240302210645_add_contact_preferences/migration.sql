-- CreateEnum
CREATE TYPE "ContactPreferenceType" AS ENUM ('EMAIL', 'PHONE');

-- CreateTable
CREATE TABLE "contact_preferences" (
    "id" UUID NOT NULL,
    "type" "ContactPreferenceType" NOT NULL,
    "value" TEXT NOT NULL,
    "contact_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_preferences_contact_id_key" ON "contact_preferences"("contact_id");

-- AddForeignKey
ALTER TABLE "contact_preferences" ADD CONSTRAINT "contact_preferences_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
