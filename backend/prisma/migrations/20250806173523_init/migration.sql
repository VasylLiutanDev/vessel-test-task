-- CreateTable
CREATE TABLE "public"."vessels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "imoNumber" INTEGER NOT NULL,
    "vesselType" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vessels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."emission_logs" (
    "id" SERIAL NOT NULL,
    "vesselId" INTEGER NOT NULL,
    "logId" BIGINT NOT NULL,
    "fromUtc" TIMESTAMP(3) NOT NULL,
    "toUtc" TIMESTAMP(3) NOT NULL,
    "met2wco2" DOUBLE PRECISION NOT NULL,
    "aet2wco2" DOUBLE PRECISION NOT NULL,
    "bot2wco2" DOUBLE PRECISION NOT NULL,
    "vrt2wco2" DOUBLE PRECISION NOT NULL,
    "totT2wco2" DOUBLE PRECISION NOT NULL,
    "mew2wco2e" DOUBLE PRECISION NOT NULL,
    "aew2wco2e" DOUBLE PRECISION NOT NULL,
    "bow2wco2e" DOUBLE PRECISION NOT NULL,
    "vrw2wco2e" DOUBLE PRECISION NOT NULL,
    "totW2wco2" DOUBLE PRECISION NOT NULL,
    "mesox" DOUBLE PRECISION NOT NULL,
    "aesox" DOUBLE PRECISION NOT NULL,
    "bosox" DOUBLE PRECISION NOT NULL,
    "vrsx" DOUBLE PRECISION NOT NULL,
    "totSox" DOUBLE PRECISION NOT NULL,
    "menox" DOUBLE PRECISION NOT NULL,
    "aenox" DOUBLE PRECISION NOT NULL,
    "bonox" DOUBLE PRECISION NOT NULL,
    "vrnox" DOUBLE PRECISION NOT NULL,
    "totNox" DOUBLE PRECISION NOT NULL,
    "mepm" DOUBLE PRECISION NOT NULL,
    "aepm" DOUBLE PRECISION NOT NULL,
    "bopm" DOUBLE PRECISION NOT NULL,
    "vrpm" DOUBLE PRECISION NOT NULL,
    "totPm" DOUBLE PRECISION NOT NULL,
    "mech4" DOUBLE PRECISION NOT NULL,
    "aech4" DOUBLE PRECISION NOT NULL,
    "boch4" DOUBLE PRECISION NOT NULL,
    "vrch4" DOUBLE PRECISION NOT NULL,
    "totCh4" DOUBLE PRECISION NOT NULL,
    "men2o" DOUBLE PRECISION NOT NULL,
    "aen2o" DOUBLE PRECISION NOT NULL,
    "bon2o" DOUBLE PRECISION NOT NULL,
    "vrn2o" DOUBLE PRECISION NOT NULL,
    "totN2o" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emission_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pp_references" (
    "id" SERIAL NOT NULL,
    "rowId" INTEGER NOT NULL,
    "category" VARCHAR(10) NOT NULL,
    "vesselType" INTEGER NOT NULL,
    "size" VARCHAR(20) NOT NULL,
    "traj" VARCHAR(20) NOT NULL,
    "a" DOUBLE PRECISION NOT NULL,
    "b" DOUBLE PRECISION NOT NULL,
    "c" DOUBLE PRECISION NOT NULL,
    "d" DOUBLE PRECISION NOT NULL,
    "e" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pp_references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vessels_imoNumber_key" ON "public"."vessels"("imoNumber");

-- CreateIndex
CREATE UNIQUE INDEX "pp_references_rowId_key" ON "public"."pp_references"("rowId");

-- AddForeignKey
ALTER TABLE "public"."emission_logs" ADD CONSTRAINT "emission_logs_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "public"."vessels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
