import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface VesselData {
  Name: string;
  IMONo: number;
  VesselType: number;
}

async function importVessels() {
  try {
    // Read the JSON file
    const data = fs.readFileSync(
      path.join(__dirname, '../../vessels.json'),
      'utf-8'
    );
    const vessels: VesselData[] = JSON.parse(data);

    console.log(`Found ${vessels.length} vessels to import`);

    // Import vessels
    const createdVessels = await prisma.vessel.createMany({
      data: vessels.map(vessel => ({
        name: vessel.Name,
        imoNumber: vessel.IMONo,
        vesselType: vessel.VesselType,
      })),
      skipDuplicates: true,
    });

    console.log(`Successfully imported ${createdVessels.count} vessels`);
  } catch (error) {
    console.error('Error importing vessels:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importVessels();
