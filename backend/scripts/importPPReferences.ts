import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface PPReferenceData {
  RowID: number;
  Category: string;
  VesselTypeID: number;
  Size: string;
  Traj: string;
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
}

async function importPPReferences() {
  try {
    // Read the JSON file
    const data = fs.readFileSync(
      path.join(__dirname, '../../pp-reference.json'),
      'utf-8'
    );
    const references: PPReferenceData[] = JSON.parse(data);

    console.log(`Found ${references.length} PP reference records to import`);

    // Import references
    const createdReferences = await prisma.pPReference.createMany({
      data: references.map(ref => ({
        rowId: ref.RowID,
        category: ref.Category,
        vesselType: ref.VesselTypeID,
        size: ref.Size.trim(),
        traj: ref.Traj.trim(),
        a: ref.a,
        b: ref.b,
        c: ref.c,
        d: ref.d,
        e: ref.e,
      })),
      skipDuplicates: true,
    });

    console.log(`Successfully imported ${createdReferences.count} PP reference records`);
  } catch (error) {
    console.error('Error importing PP references:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importPPReferences();
