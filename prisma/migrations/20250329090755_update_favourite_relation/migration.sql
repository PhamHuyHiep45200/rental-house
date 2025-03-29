-- AlterTable
ALTER TABLE "Favourite" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
