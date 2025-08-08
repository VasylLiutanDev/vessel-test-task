import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface EmissionData {
  EID: number;
  VesselID: number;
  LOGID: number;
  FromUTC: string;
  TOUTC: string;
  // Add other fields as needed
  [key: string]: any;
}

async function importEmissions() {
  try {
    // Read the JSON file
    const data = fs.readFileSync(
      path.join(__dirname, '../../daily-log-emissions.json'),
      'utf-8'
    );
    const emissions: EmissionData[] = JSON.parse(data);

    console.log(`Found ${emissions.length} emission records to import`);

    // Process in batches to avoid memory issues
    const batchSize = 1000;
    let importedCount = 0;

    for (let i = 0; i < emissions.length; i += batchSize) {
      const batch = emissions.slice(i, i + batchSize);
      
      // Find all vessels in this batch to check for existence
      const vesselIds = [...new Set(batch.map(e => e.VesselID))];
      const existingVessels = await prisma.vessel.findMany({
        where: { imoNumber: { in: vesselIds } },
        select: { id: true, imoNumber: true }
      });

      const vesselIdMap = new Map(existingVessels.map(v => [v.imoNumber, v.id]));

      // Prepare data for import
      const dataToImport = batch
        .filter(e => vesselIdMap.has(e.VesselID))
        .map(e => ({
          vesselId: vesselIdMap.get(e.VesselID)!,
          logId: BigInt(e.LOGID),
          fromUtc: new Date(e.FromUTC),
          toUtc: new Date(e.TOUTC),
          met2wco2: e.MET2WCO2 || 0,
          aet2wco2: e.AET2WCO2 || 0,
          bot2wco2: e.BOT2WCO2 || 0,
          vrt2wco2: e.VRT2WCO2 || 0,
          totT2wco2: e.TotT2WCO2 || 0,
          mew2wco2e: e.MEW2WCO2e || 0,
          aew2wco2e: e.AEW2WCO2e || 0,
          bow2wco2e: e.BOW2WCO2e || 0,
          vrw2wco2e: e.VRW2WCO2e || 0,
          totW2wco2: e.ToTW2WCO2 || 0,
          mesox: e.MESox || 0,
          aesox: e.AESox || 0,
          bosox: e.BOSox || 0,
          vrsx: e.VRSox || 0,
          totSox: e.TotSox || 0,
          menox: e.MENox || 0,
          aenox: e.AENox || 0,
          bonox: e.BONox || 0,
          vrnox: e.VRNox || 0,
          totNox: e.TotNox || 0,
          mepm: e.MEPM || 0,
          aepm: e.AEPM || 0,
          bopm: e.BOPM || 0,
          vrpm: e.VRPM || 0,
          totPm: e.TotPM || 0,
          mech4: e.MEch4 || 0,
          aech4: e.AEch4 || 0,
          boch4: e.BOch4 || 0,
          vrch4: e.VRch4 || 0,
          totCh4: e.TotCh4 || 0,
          men2o: e.MEN2O || 0,
          aen2o: e.AEN2O || 0,
          bon2o: e.BON2O || 0,
          vrn2o: e.VRN2O || 0,
          totN2o: e.TotN2O || 0,
        }));

      // Skip if no valid records in this batch
      if (dataToImport.length === 0) continue;

      // Import the batch
      await prisma.emissionLog.createMany({
        data: dataToImport,
        skipDuplicates: true,
      });

      importedCount += dataToImport.length;
      console.log(`Imported ${importedCount} of ${emissions.length} records...`);
    }

    console.log(`Successfully imported ${importedCount} emission records`);
  } catch (error) {
    console.error('Error importing emissions:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importEmissions();
