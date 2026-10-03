import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding VEHIQ Central database...\n');

  // ---------------------------------------------------------------------------
  // 1. ORGANIZATIONS
  // ---------------------------------------------------------------------------
  const orgDealer = await prisma.organization.create({
    data: {
      name: 'AutoSur Málaga',
      type: 'DEALERSHIP',
      taxId: 'B29123456',
      address: 'Av. de Velázquez 112',
      city: 'Málaga',
      province: 'Málaga',
      postcode: '29004',
      phone: '+34 952 123 456',
      website: 'https://autosurmalaga.es',
      plan: 'PROFESSIONAL',
    },
  });
  console.log('  ✓ Organization: AutoSur Málaga');

  const orgFleet = await prisma.organization.create({
    data: {
      name: 'RentaCar España S.L.',
      type: 'FLEET_OPERATOR',
      taxId: 'B28654321',
      address: 'Calle Gran Vía 48',
      city: 'Madrid',
      province: 'Madrid',
      postcode: '28013',
      phone: '+34 912 654 321',
      plan: 'ENTERPRISE',
    },
  });
  console.log('  ✓ Organization: RentaCar España S.L.');

  const orgInsurer = await prisma.organization.create({
    data: {
      name: 'Seguros Ibéricos S.A.',
      type: 'INSURANCE_COMPANY',
      taxId: 'A08987654',
      address: 'Passeig de Gràcia 55',
      city: 'Barcelona',
      province: 'Barcelona',
      postcode: '08007',
      plan: 'ENTERPRISE',
    },
  });
  console.log('  ✓ Organization: Seguros Ibéricos S.A.');

  // ---------------------------------------------------------------------------
  // 2. USERS
  // ---------------------------------------------------------------------------
  const passwordHash = await bcrypt.hash('Vehiq2024!', 12);

  const userAdmin = await prisma.user.create({
    data: {
      email: 'admin@vehiqcentral.es',
      passwordHash,
      name: 'Carlos Ruiz',
      role: 'ADMIN',
      plan: 'ENTERPRISE',
      phone: '+34 600 111 222',
      company: 'VEHIQ Central',
    },
  });
  console.log('  ✓ User: admin@vehiqcentral.es (Admin)');

  const userDealer = await prisma.user.create({
    data: {
      email: 'maria@autosurmalaga.es',
      passwordHash,
      name: 'María García López',
      role: 'DEALER',
      plan: 'PROFESSIONAL',
      phone: '+34 655 234 567',
      organizationId: orgDealer.id,
    },
  });
  console.log('  ✓ User: maria@autosurmalaga.es (Dealer)');

  const userFleet = await prisma.user.create({
    data: {
      email: 'javier@rentacar.es',
      passwordHash,
      name: 'Javier Martínez',
      role: 'FLEET_MANAGER',
      plan: 'ENTERPRISE',
      phone: '+34 678 345 678',
      organizationId: orgFleet.id,
    },
  });
  console.log('  ✓ User: javier@rentacar.es (Fleet Manager)');

  const userInsurer = await prisma.user.create({
    data: {
      email: 'ana@segurosibericos.es',
      passwordHash,
      name: 'Ana Fernández',
      role: 'INSURER',
      plan: 'ENTERPRISE',
      organizationId: orgInsurer.id,
    },
  });
  console.log('  ✓ User: ana@segurosibericos.es (Insurer)');

  // Demo user (David's account)
  const userDemo = await prisma.user.create({
    data: {
      email: 'david@jbrenovatie.nl',
      passwordHash,
      name: 'David Jansen',
      role: 'DEALER',
      plan: 'PROFESSIONAL',
      company: 'JB Renovatie',
      phone: '+31 6 12345678',
    },
  });
  console.log('  ✓ User: david@jbrenovatie.nl (Demo)');

  // ---------------------------------------------------------------------------
  // 3. VEHICLES — realistic Spanish car park
  // ---------------------------------------------------------------------------
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        matricula: '1234 BCD',
        vin: 'WVWZZZ3CZWE123456',
        marca: 'Volkswagen',
        modelo: 'Golf',
        version: '1.5 TSI Style',
        carroceria: 'Berlina',
        color: 'Blanco Puro',
        fechaMatricula: new Date('2021-03-15'),
        combustible: 'GASOLINA',
        cilindrada: 1498,
        potenciaCv: 150,
        potenciaKw: 110,
        co2Emissions: 126,
        euroNorm: 'Euro 6d',
        transmision: 'MANUAL',
        traccion: 'TRACCION_DELANTERA',
        puertas: 5,
        plazas: 5,
        pesoMax: 1815,
        tara: 1340,
        provinciaActual: 'Madrid',
        municipio: 'Madrid',
        tipoVehiculo: 'Turismo',
        uso: 'Particular',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '5678 FGH',
        vin: 'WAUZZZ4G7KN012345',
        marca: 'Audi',
        modelo: 'A4',
        version: '2.0 TDI S line',
        carroceria: 'Berlina',
        color: 'Gris Daytona',
        fechaMatricula: new Date('2019-07-22'),
        combustible: 'DIESEL',
        cilindrada: 1968,
        potenciaCv: 190,
        potenciaKw: 140,
        co2Emissions: 132,
        euroNorm: 'Euro 6d-TEMP',
        transmision: 'AUTOMATICO',
        traccion: 'TRACCION_DELANTERA',
        puertas: 4,
        plazas: 5,
        pesoMax: 2115,
        tara: 1595,
        provinciaActual: 'Barcelona',
        municipio: 'Barcelona',
        tipoVehiculo: 'Turismo',
        uso: 'Particular',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '9012 JKL',
        vin: 'TMBJC7NE6L0123456',
        marca: 'SEAT',
        modelo: 'León',
        version: '1.5 TSI FR',
        carroceria: 'Berlina',
        color: 'Rojo Desire',
        fechaMatricula: new Date('2020-11-10'),
        combustible: 'GASOLINA',
        cilindrada: 1498,
        potenciaCv: 150,
        potenciaKw: 110,
        co2Emissions: 128,
        euroNorm: 'Euro 6d',
        transmision: 'MANUAL',
        traccion: 'TRACCION_DELANTERA',
        puertas: 5,
        plazas: 5,
        provinciaActual: 'Valencia',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '3456 MNP',
        vin: 'WF0XXXGCDXLE12345',
        marca: 'Ford',
        modelo: 'Focus',
        version: '1.0 EcoBoost Titanium',
        carroceria: 'Berlina',
        color: 'Azul Desert Island',
        fechaMatricula: new Date('2018-05-03'),
        combustible: 'GASOLINA',
        cilindrada: 999,
        potenciaCv: 125,
        potenciaKw: 92,
        co2Emissions: 113,
        euroNorm: 'Euro 6b',
        transmision: 'MANUAL',
        traccion: 'TRACCION_DELANTERA',
        puertas: 5,
        plazas: 5,
        provinciaActual: 'Sevilla',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '7890 QRS',
        vin: 'W1K2130421A123456',
        marca: 'Mercedes-Benz',
        modelo: 'Clase A',
        version: 'A 200 d AMG Line',
        carroceria: 'Berlina',
        color: 'Negro Cosmos',
        fechaMatricula: new Date('2022-01-18'),
        combustible: 'DIESEL',
        cilindrada: 1950,
        potenciaCv: 150,
        potenciaKw: 110,
        co2Emissions: 114,
        euroNorm: 'Euro 6d',
        transmision: 'DOBLE_EMBRAGUE',
        traccion: 'TRACCION_DELANTERA',
        puertas: 5,
        plazas: 5,
        provinciaActual: 'Málaga',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '2345 TUV',
        vin: 'JTDKN3DU5A0123456',
        marca: 'Toyota',
        modelo: 'Corolla',
        version: '1.8 Hybrid Active',
        carroceria: 'Berlina',
        color: 'Gris Plata',
        fechaMatricula: new Date('2023-06-01'),
        combustible: 'HIBRIDO',
        cilindrada: 1798,
        potenciaCv: 140,
        potenciaKw: 103,
        co2Emissions: 98,
        euroNorm: 'Euro 6d',
        transmision: 'CVT',
        traccion: 'TRACCION_DELANTERA',
        puertas: 5,
        plazas: 5,
        provinciaActual: 'Bilbao',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '6789 WXY',
        vin: 'WBAPH5C55BA123456',
        marca: 'BMW',
        modelo: 'Serie 3',
        version: '320d xDrive M Sport',
        carroceria: 'Berlina',
        color: 'Azul Portimao',
        fechaMatricula: new Date('2020-09-14'),
        combustible: 'DIESEL',
        cilindrada: 1995,
        potenciaCv: 190,
        potenciaKw: 140,
        co2Emissions: 130,
        euroNorm: 'Euro 6d',
        transmision: 'AUTOMATICO',
        traccion: 'TRACCION_TOTAL',
        puertas: 4,
        plazas: 5,
        provinciaActual: 'Madrid',
        dgtStatus: 'Alta',
      },
    }),
    prisma.vehicle.create({
      data: {
        matricula: '0123 ABC',
        vin: 'VF1RFB00X67123456',
        marca: 'Renault',
        modelo: 'Clio',
        version: '1.0 TCe Intens',
        carroceria: 'Berlina',
        color: 'Naranja Valencia',
        fechaMatricula: new Date('2022-04-20'),
        combustible: 'GASOLINA',
        cilindrada: 999,
        potenciaCv: 100,
        potenciaKw: 74,
        co2Emissions: 119,
        euroNorm: 'Euro 6d',
        transmision: 'MANUAL',
        traccion: 'TRACCION_DELANTERA',
        puertas: 5,
        plazas: 5,
        provinciaActual: 'Zaragoza',
        dgtStatus: 'Alta',
      },
    }),
    // Suspicious vehicle (for fraud demo)
    prisma.vehicle.create({
      data: {
        matricula: '4567 DEF',
        vin: 'WVWZZZ1KZ5W123456',
        marca: 'Volkswagen',
        modelo: 'Passat',
        version: '2.0 TDI Advance',
        carroceria: 'Berlina',
        color: 'Negro',
        fechaMatricula: new Date('2015-08-12'),
        combustible: 'DIESEL',
        cilindrada: 1968,
        potenciaCv: 150,
        potenciaKw: 110,
        co2Emissions: 119,
        euroNorm: 'Euro 6',
        transmision: 'AUTOMATICO',
        traccion: 'TRACCION_DELANTERA',
        puertas: 4,
        plazas: 5,
        provinciaActual: 'Alicante',
        dgtStatus: 'Alta',
      },
    }),
    // Electric vehicle
    prisma.vehicle.create({
      data: {
        matricula: '8901 GHI',
        vin: '5YJ3E7EB1LF123456',
        marca: 'Tesla',
        modelo: 'Model 3',
        version: 'Long Range',
        carroceria: 'Berlina',
        color: 'Blanco Perla',
        fechaMatricula: new Date('2023-10-05'),
        combustible: 'ELECTRICO',
        potenciaCv: 351,
        potenciaKw: 258,
        co2Emissions: 0,
        transmision: 'AUTOMATICO',
        traccion: 'TRACCION_TOTAL',
        puertas: 4,
        plazas: 5,
        provinciaActual: 'Madrid',
        dgtStatus: 'Alta',
      },
    }),
  ]);
  console.log(`  ✓ ${vehicles.length} vehicles created`);

  // ---------------------------------------------------------------------------
  // 4. VEHICLE HISTORY EVENTS
  // ---------------------------------------------------------------------------
  const [golf, audi, seat, ford, mercedes, toyota, bmw, clio, passat, tesla] = vehicles;

  // Golf history
  await prisma.vehicleHistory.createMany({
    data: [
      { vehicleId: golf.id, eventType: 'MATRICULACION', eventDate: new Date('2021-03-15'), source: 'DGT', province: 'Madrid', description: 'Primera matriculación en España' },
      { vehicleId: golf.id, eventType: 'INSPECCION_ITV', eventDate: new Date('2025-03-10'), source: 'ITV', province: 'Madrid', description: 'ITV favorable — 45.230 km' },
    ],
  });

  // Audi history (multiple owners)
  await prisma.vehicleHistory.createMany({
    data: [
      { vehicleId: audi.id, eventType: 'MATRICULACION', eventDate: new Date('2019-07-22'), source: 'DGT', province: 'Barcelona', description: 'Primera matriculación' },
      { vehicleId: audi.id, eventType: 'TRANSFERENCIA', eventDate: new Date('2021-12-01'), source: 'DGT', province: 'Barcelona', description: 'Cambio de titularidad' },
      { vehicleId: audi.id, eventType: 'INSPECCION_ITV', eventDate: new Date('2023-07-15'), source: 'ITV', province: 'Barcelona' },
      { vehicleId: audi.id, eventType: 'TRANSFERENCIA', eventDate: new Date('2024-03-20'), source: 'DGT', province: 'Barcelona', description: 'Segundo cambio de titularidad' },
    ],
  });

  // Passat history (suspicious — for fraud demo)
  await prisma.vehicleHistory.createMany({
    data: [
      { vehicleId: passat.id, eventType: 'MATRICULACION', eventDate: new Date('2015-08-12'), source: 'DGT', province: 'Madrid' },
      { vehicleId: passat.id, eventType: 'SINIESTRO', eventDate: new Date('2018-02-14'), source: 'INSURANCE', province: 'Madrid', description: 'Colisión frontal — daños graves' },
      { vehicleId: passat.id, eventType: 'TRANSFERENCIA', eventDate: new Date('2019-06-01'), source: 'DGT', province: 'Alicante' },
      { vehicleId: passat.id, eventType: 'CAMBIO_DOMICILIO', eventDate: new Date('2019-06-01'), source: 'DGT', province: 'Alicante' },
      { vehicleId: passat.id, eventType: 'TRANSFERENCIA', eventDate: new Date('2021-01-15'), source: 'DGT', province: 'Alicante' },
      { vehicleId: passat.id, eventType: 'TRANSFERENCIA', eventDate: new Date('2022-11-30'), source: 'DGT', province: 'Alicante' },
    ],
  });

  console.log('  ✓ Vehicle history events created');

  // ---------------------------------------------------------------------------
  // 5. ITV INSPECTIONS
  // ---------------------------------------------------------------------------
  await prisma.inspection.createMany({
    data: [
      { vehicleId: golf.id, inspectionDate: new Date('2025-03-10'), result: 'FAVORABLE', mileage: 45230, stationName: 'ITV Madrid Sur', nextInspection: new Date('2027-03-10') },
      { vehicleId: audi.id, inspectionDate: new Date('2023-07-15'), result: 'FAVORABLE', mileage: 78500, stationName: 'ITV Badalona', nextInspection: new Date('2025-07-15') },
      { vehicleId: audi.id, inspectionDate: new Date('2025-07-10'), result: 'FAVORABLE', mileage: 112300, stationName: 'ITV Badalona', nextInspection: new Date('2027-07-10') },
      { vehicleId: ford.id, inspectionDate: new Date('2022-05-01'), result: 'FAVORABLE', mileage: 62000, stationName: 'ITV Sevilla Este', nextInspection: new Date('2024-05-01') },
      { vehicleId: ford.id, inspectionDate: new Date('2024-04-28'), result: 'DESFAVORABLE', mileage: 95400, stationName: 'ITV Sevilla Este', defects: JSON.stringify(['Desgaste neumáticos eje trasero', 'Holgura rótula dirección']), },
      { vehicleId: ford.id, inspectionDate: new Date('2024-05-15'), result: 'FAVORABLE', mileage: 95400, stationName: 'ITV Sevilla Este', nextInspection: new Date('2026-05-15') },
      { vehicleId: passat.id, inspectionDate: new Date('2019-08-10'), result: 'FAVORABLE', mileage: 85000, stationName: 'ITV Alicante', nextInspection: new Date('2021-08-10') },
      { vehicleId: passat.id, inspectionDate: new Date('2021-08-05'), result: 'FAVORABLE', mileage: 125000, stationName: 'ITV Elche', nextInspection: new Date('2023-08-05') },
      { vehicleId: passat.id, inspectionDate: new Date('2023-08-01'), result: 'FAVORABLE', mileage: 148000, stationName: 'ITV Alicante', nextInspection: new Date('2025-08-01') },
    ],
  });
  console.log('  ✓ ITV inspections created');

  // ---------------------------------------------------------------------------
  // 6. MILEAGE RECORDS
  // ---------------------------------------------------------------------------
  await prisma.mileageRecord.createMany({
    data: [
      // Golf — normal progression
      { vehicleId: golf.id, mileage: 0, recordDate: new Date('2021-03-15'), source: 'DGT', verified: true },
      { vehicleId: golf.id, mileage: 15200, recordDate: new Date('2022-03-01'), source: 'ITV', verified: true },
      { vehicleId: golf.id, mileage: 30100, recordDate: new Date('2023-03-01'), source: 'DEALER', verified: true },
      { vehicleId: golf.id, mileage: 45230, recordDate: new Date('2025-03-10'), source: 'ITV', verified: true },
      // Passat — suspicious km drop
      { vehicleId: passat.id, mileage: 0, recordDate: new Date('2015-08-12'), source: 'DGT', verified: true },
      { vehicleId: passat.id, mileage: 45000, recordDate: new Date('2017-08-10'), source: 'ITV', verified: true },
      { vehicleId: passat.id, mileage: 85000, recordDate: new Date('2019-08-10'), source: 'ITV', verified: true },
      { vehicleId: passat.id, mileage: 62000, recordDate: new Date('2020-06-01'), source: 'DEALER', verified: false }, // ← fraud!
      { vehicleId: passat.id, mileage: 125000, recordDate: new Date('2021-08-05'), source: 'ITV', verified: true },
      { vehicleId: passat.id, mileage: 148000, recordDate: new Date('2023-08-01'), source: 'ITV', verified: true },
      // BMW
      { vehicleId: bmw.id, mileage: 0, recordDate: new Date('2020-09-14'), source: 'DGT', verified: true },
      { vehicleId: bmw.id, mileage: 22000, recordDate: new Date('2022-09-01'), source: 'DEALER', verified: true },
      { vehicleId: bmw.id, mileage: 54000, recordDate: new Date('2024-09-01'), source: 'DEALER', verified: true },
    ],
  });
  console.log('  ✓ Mileage records created');

  // ---------------------------------------------------------------------------
  // 7. FRAUD ALERTS
  // ---------------------------------------------------------------------------
  await prisma.fraudAlert.createMany({
    data: [
      {
        vehicleId: passat.id,
        alertType: 'ODOMETRO_MANIPULADO',
        severity: 'CRITICA',
        title: 'Posible manipulación del odómetro',
        description: 'Se ha detectado una reducción de 85.000 km a 62.000 km entre agosto 2019 y junio 2020. El registro del concesionario muestra un kilometraje inferior al de la última ITV.',
        evidence: JSON.stringify({
          itvReading: 85000,
          dealerReading: 62000,
          difference: -23000,
          itvDate: '2019-08-10',
          dealerDate: '2020-06-01',
        }),
        status: 'ACTIVE',
      },
      {
        vehicleId: passat.id,
        alertType: 'SINIESTRO_OCULTO',
        severity: 'ALTA',
        title: 'Siniestro grave no declarado en venta',
        description: 'El vehículo sufrió una colisión frontal con daños graves en febrero 2018. Las transferencias posteriores no incluyen referencia al siniestro.',
        evidence: JSON.stringify({
          claimDate: '2018-02-14',
          claimType: 'Colisión frontal',
          severity: 'Grave',
          subsequentTransfers: 3,
        }),
        status: 'ACTIVE',
      },
      {
        vehicleId: audi.id,
        alertType: 'EMBARGO_OCULTO',
        severity: 'MEDIA',
        title: 'Reserva de dominio activa',
        description: 'Existe una reserva de dominio registrada a favor de una entidad financiera. La venta del vehículo requiere la cancelación previa de esta carga.',
        status: 'INVESTIGATING',
      },
    ],
  });
  console.log('  ✓ Fraud alerts created');

  // ---------------------------------------------------------------------------
  // 8. INSURANCE CLAIMS
  // ---------------------------------------------------------------------------
  await prisma.insuranceClaim.createMany({
    data: [
      {
        vehicleId: passat.id,
        claimDate: new Date('2018-02-14'),
        claimType: 'Colisión frontal',
        severity: 'Grave',
        repairCost: 850000, // €8,500
        description: 'Colisión frontal en autovía A-6 km 42. Daños en capó, parachoques, radiador, airbags desplegados.',
        insurerCode: 'MAP-2018-5521',
        resolved: true,
      },
      {
        vehicleId: ford.id,
        claimDate: new Date('2023-11-20'),
        claimType: 'Golpe estacionado',
        severity: 'Leve',
        repairCost: 120000, // €1,200
        description: 'Golpe en puerta trasera derecha mientras estaba estacionado.',
        insurerCode: 'AXA-2023-8834',
        resolved: true,
      },
    ],
  });
  console.log('  ✓ Insurance claims created');

  // ---------------------------------------------------------------------------
  // 9. VALUATIONS
  // ---------------------------------------------------------------------------
  await prisma.valuation.createMany({
    data: [
      {
        vehicleId: golf.id,
        userId: userDealer.id,
        mileage: 45230,
        condition: 'MUY_BUENO',
        province: 'Madrid',
        valuationLow: 1650000,
        valuationMid: 1825000,
        valuationHigh: 1980000,
        confidence: 0.89,
        modelVersion: 'v2.1.0',
        marketTrend: 'ESTABLE',
        daysToSell: 28,
        similarListings: 145,
        avgListingPrice: 1900000,
        factors: JSON.stringify([
          { name: 'Kilometraje bajo', impact: 5, direction: 'positive', description: 'Por debajo de la media para su antigüedad' },
          { name: 'Color popular', impact: 3, direction: 'positive', description: 'Blanco es el color más demandado' },
          { name: 'Ubicación Madrid', impact: 2, direction: 'positive', description: 'Mayor demanda en la capital' },
        ]),
      },
      {
        vehicleId: audi.id,
        userId: userDealer.id,
        mileage: 112300,
        condition: 'BUENO',
        province: 'Barcelona',
        valuationLow: 1850000,
        valuationMid: 2100000,
        valuationHigh: 2350000,
        confidence: 0.82,
        modelVersion: 'v2.1.0',
        marketTrend: 'BAJANDO',
        daysToSell: 42,
        similarListings: 89,
        avgListingPrice: 2200000,
      },
      {
        vehicleId: tesla.id,
        userId: userFleet.id,
        mileage: 18500,
        condition: 'COMO_NUEVO',
        province: 'Madrid',
        valuationLow: 3200000,
        valuationMid: 3450000,
        valuationHigh: 3700000,
        confidence: 0.75,
        modelVersion: 'v2.1.0',
        marketTrend: 'BAJANDO',
        daysToSell: 35,
        similarListings: 67,
        avgListingPrice: 3600000,
      },
    ],
  });
  console.log('  ✓ Valuations created');

  // ---------------------------------------------------------------------------
  // 10. DEALER INVENTORY
  // ---------------------------------------------------------------------------
  await prisma.dealerVehicle.createMany({
    data: [
      {
        vehicleId: golf.id,
        organizationId: orgDealer.id,
        listingPrice: 1895000,
        status: 'ACTIVE',
        description: 'Volkswagen Golf 1.5 TSI 150CV Style. Un solo propietario, kilometraje certificado, mantenimiento en concesionario oficial.',
        featured: true,
        publishedAt: new Date('2025-08-01'),
      },
      {
        vehicleId: audi.id,
        organizationId: orgDealer.id,
        listingPrice: 2195000,
        status: 'ACTIVE',
        description: 'Audi A4 2.0 TDI 190CV S line. Cambio automático, navegación, techo solar.',
        publishedAt: new Date('2025-07-15'),
      },
      {
        vehicleId: mercedes.id,
        organizationId: orgDealer.id,
        listingPrice: 2695000,
        status: 'RESERVED',
        description: 'Mercedes-Benz Clase A 200d AMG Line. Como nuevo, 12.000 km.',
        publishedAt: new Date('2025-06-20'),
      },
    ],
  });
  console.log('  ✓ Dealer inventory created');

  // ---------------------------------------------------------------------------
  // 11. VEHICLE LOOKUPS (audit trail)
  // ---------------------------------------------------------------------------
  const lookupData = [];
  const lookupTypes: Array<'HISTORY' | 'VALUATION' | 'FRAUD_CHECK' | 'FULL_REPORT'> = ['HISTORY', 'VALUATION', 'FRAUD_CHECK', 'FULL_REPORT'];
  const users = [userDealer, userFleet, userInsurer, userDemo];

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    lookupData.push({
      vehicleId: vehicles[Math.floor(Math.random() * vehicles.length)].id,
      userId: users[Math.floor(Math.random() * users.length)].id,
      lookupType: lookupTypes[Math.floor(Math.random() * lookupTypes.length)],
      source: ['web', 'api', 'mobile'][Math.floor(Math.random() * 3)],
      createdAt: date,
    });
  }
  await prisma.vehicleLookup.createMany({ data: lookupData });
  console.log('  ✓ 50 vehicle lookups created');

  // ---------------------------------------------------------------------------
  // 12. MARKET LISTINGS (scraped data)
  // ---------------------------------------------------------------------------
  const marketData = [
    { marca: 'Volkswagen', modelo: 'Golf', source: 'coches.net', province: 'Madrid' },
    { marca: 'Volkswagen', modelo: 'Golf', source: 'autocasion.com', province: 'Barcelona' },
    { marca: 'SEAT', modelo: 'León', source: 'coches.net', province: 'Valencia' },
    { marca: 'Audi', modelo: 'A4', source: 'coches.net', province: 'Madrid' },
    { marca: 'BMW', modelo: 'Serie 3', source: 'autocasion.com', province: 'Málaga' },
    { marca: 'Mercedes-Benz', modelo: 'Clase A', source: 'coches.net', province: 'Sevilla' },
    { marca: 'Renault', modelo: 'Clio', source: 'wallapop', province: 'Zaragoza' },
    { marca: 'Toyota', modelo: 'Corolla', source: 'coches.net', province: 'Bilbao' },
    { marca: 'Ford', modelo: 'Focus', source: 'autocasion.com', province: 'Sevilla' },
    { marca: 'Peugeot', modelo: '308', source: 'coches.net', province: 'Madrid' },
  ];

  const listings = [];
  for (let i = 0; i < 100; i++) {
    const template = marketData[i % marketData.length];
    const year = 2018 + Math.floor(Math.random() * 6);
    const mileage = Math.floor(Math.random() * 120000) + 10000;
    const basePrice = 12000 + Math.floor(Math.random() * 25000);
    const price = Math.round(basePrice * (1 - (2025 - year) * 0.08) * (1 - mileage / 400000)) * 100;

    listings.push({
      externalId: `${template.source}-${i}-${Date.now()}`,
      source: template.source,
      marca: template.marca,
      modelo: template.modelo,
      year,
      mileage,
      price,
      fuelType: (['GASOLINA', 'DIESEL', 'HIBRIDO'] as const)[Math.floor(Math.random() * 3)],
      province: template.province,
      scrapedAt: new Date(),
      active: Math.random() > 0.1,
    });
  }
  await prisma.marketListing.createMany({ data: listings });
  console.log('  ✓ 100 market listings created');

  // ---------------------------------------------------------------------------
  // 13. SUBSCRIPTIONS
  // ---------------------------------------------------------------------------
  await prisma.subscription.createMany({
    data: [
      {
        organizationId: orgDealer.id,
        plan: 'PROFESSIONAL',
        status: 'ACTIVE',
        lookupQuota: 500,
        lookupUsed: 127,
        apiCallQuota: 5000,
        apiCallUsed: 892,
        currentPeriodEnd: new Date('2026-01-15'),
      },
      {
        organizationId: orgFleet.id,
        plan: 'ENTERPRISE',
        status: 'ACTIVE',
        lookupQuota: 5000,
        lookupUsed: 1834,
        apiCallQuota: 50000,
        apiCallUsed: 12450,
        currentPeriodEnd: new Date('2026-03-01'),
      },
      {
        organizationId: orgInsurer.id,
        plan: 'ENTERPRISE',
        status: 'ACTIVE',
        lookupQuota: 10000,
        lookupUsed: 4521,
        apiCallQuota: 100000,
        apiCallUsed: 34200,
        currentPeriodEnd: new Date('2026-06-15'),
      },
    ],
  });
  console.log('  ✓ Subscriptions created');

  // ---------------------------------------------------------------------------
  // 14. API KEYS
  // ---------------------------------------------------------------------------
  await prisma.apiKey.createMany({
    data: [
      {
        key: 'vhq_live_dealer_ak7f9g2h4j6l8n0p',
        name: 'AutoSur Producción',
        organizationId: orgDealer.id,
        userId: userDealer.id,
        permissions: JSON.stringify(['vehicles:read', 'valuations:read', 'valuations:write', 'reports:read']),
        rateLimit: 500,
        active: true,
      },
      {
        key: 'vhq_live_fleet_bm3n5p7r9t1v3x5z',
        name: 'RentaCar API',
        organizationId: orgFleet.id,
        userId: userFleet.id,
        permissions: JSON.stringify(['vehicles:read', 'vehicles:write', 'valuations:read', 'fraud:read', 'reports:read', 'reports:write']),
        rateLimit: 2000,
        active: true,
      },
      {
        key: 'vhq_test_demo_dk8f2g4h6j8l0n2p',
        name: 'Demo API Key',
        userId: userDemo.id,
        permissions: JSON.stringify(['vehicles:read', 'valuations:read', 'fraud:read']),
        rateLimit: 100,
        active: true,
      },
    ],
  });
  console.log('  ✓ API keys created');

  // ---------------------------------------------------------------------------
  // DONE
  // ---------------------------------------------------------------------------
  console.log('\n✅ Seed complete!\n');
  console.log('Demo accounts (password: Vehiq2024!):');
  console.log('  admin@vehiqcentral.es       — Admin');
  console.log('  maria@autosurmalaga.es       — Dealer');
  console.log('  javier@rentacar.es           — Fleet Manager');
  console.log('  ana@segurosibericos.es       — Insurer');
  console.log('  david@jbrenovatie.nl         — Demo (your account)');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
