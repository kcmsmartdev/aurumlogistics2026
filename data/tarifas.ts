
export type Moneda = "USD";

export interface Tarifa {
  concepto: string;
  moneda: Moneda;
  precio: number;
  unidad?: string;
  vigenteDesde: string;
  tiempoAtencion: string | null;
}

export interface TablaTarifas {
  titulo: string;
  tarifas: Tarifa[];
  nota: string;
}

export interface DuracionPorVia {
  aereo: string;
  maritimo: string;
}

export interface TiempoServicio {
  regimen: string;
  denominacion: string;
  plazoPromedio: string | null;
  finalizacion: string | DuracionPorVia;
}



export const tarifasExportacionAerea: TablaTarifas = {
  titulo: "Tarifas de exportaciones aéreas",
  nota: "No incluyen IGV",
  tarifas: [
    { concepto: "AWB", moneda: "USD", precio: 80, vigenteDesde: "2025-01-01", tiempoAtencion: "1 hora" },
    { concepto: "Handling", moneda: "USD", precio: 60, vigenteDesde: "2025-01-01", tiempoAtencion: null },
    {
      concepto: "Servicio de aduana",
      moneda: "USD",
      precio: 350,
      vigenteDesde: "2025-01-01",
      tiempoAtencion: "1 a 2 días (dependerá del canal de control)",
    },
    { concepto: "Transmisión", moneda: "USD", precio: 30, vigenteDesde: "2025-01-01", tiempoAtencion: "1 hora" },
    { concepto: "Aforo, inspección", moneda: "USD", precio: 30, vigenteDesde: "2025-01-01", tiempoAtencion: "3 horas" },
  ],
};

export const tarifasExportacionMaritima: TablaTarifas = {
  titulo: "Tarifas de exportaciones marítimas",
  nota: "No incluyen IGV",
  tarifas: [
    { concepto: "BL", moneda: "USD", precio: 90, vigenteDesde: "2025-01-01", tiempoAtencion: "2 horas" },
    { concepto: "THC", moneda: "USD", precio: 150, vigenteDesde: "2025-01-01", tiempoAtencion: null },
    { concepto: "Derechos de embarque (FCL)", moneda: "USD", precio: 900, vigenteDesde: "2025-01-01", tiempoAtencion: null },
    { concepto: "Derechos de embarque (LCL)", moneda: "USD", precio: 600, vigenteDesde: "2025-01-01", tiempoAtencion: null },
    {
      concepto: "Servicio de aduana",
      moneda: "USD",
      precio: 200,
      vigenteDesde: "2025-01-01",
      tiempoAtencion: "1 a 2 días (dependerá del canal de control)",
    },
    { concepto: "Transmisión", moneda: "USD", precio: 65, vigenteDesde: "2025-01-01", tiempoAtencion: "1 hora" },
    { concepto: "Inspecciones", moneda: "USD", precio: 65, vigenteDesde: "2025-01-01", tiempoAtencion: "4 horas" },
    {
      concepto: "Transporte / Pick up",
      moneda: "USD",
      precio: 450,
      unidad: "x Ctnr",
      vigenteDesde: "2025-01-01",
      tiempoAtencion: "2 horas",
    },
    {
      concepto: "Port & Term",
      moneda: "USD",
      precio: 2100,
      unidad: "x Ctnr",
      vigenteDesde: "2025-01-01",
      tiempoAtencion: null,
    },
    { concepto: "Precinto", moneda: "USD", precio: 65, vigenteDesde: "2025-01-01", tiempoAtencion: null },
  ],
};

export const tiemposServicio: TiempoServicio[] = [
  {
    regimen: "Cotización",
    denominacion: "Proforma de servicios",
    plazoPromedio: "Según régimen",
    finalizacion: { aereo: "4 horas", maritimo: "1 día" },
  },
  {
    regimen: "Importación",
    denominacion: "Numeración, regularización y desaduanaje de la DAM",
    plazoPromedio: "Antes de la llegada de la nave / levante autorizado",
    finalizacion: "1 a 2 días",
  },
  {
    regimen: "Importación",
    denominacion: "Aforos, vistos buenos, previos, inspecciones ACE, etc.",
    plazoPromedio: "Desde la obtención del volante y programación de aduana",
    finalizacion: "1 día",
  },
  {
    regimen: "Reimportación",
    denominacion: "Numeración y desaduanaje",
    plazoPromedio: "A la recepción del volante de carga",
    finalizacion: "1 a 2 días",
  },
  {
    regimen: "Exportación",
    denominacion: "Numeración, regularización",
    plazoPromedio:
      "Desde la recepción de las instrucciones de embarque (documentos completos) para la numeración / día siguiente del embarque",
    finalizacion: "1 a 2 días",
  },
  {
    regimen: "Exportación",
    denominacion: "Aforos, vistos buenos, previos, inspecciones ACE, etc.",
    plazoPromedio: "Desde el refrendo de DAM (canal de control)",
    finalizacion: "1 día",
  },
  {
    regimen: "Admisión temporal",
    denominacion: "Numeración, aforo, retiro",
    plazoPromedio: "Antes de la llegada de la carga / levante autorizado",
    finalizacion: "2 días",
  },
  {
    regimen: "Depósito",
    denominacion: "Numeración, aforo, retiro",
    plazoPromedio: "Antes de la llegada de la carga / traslado / levante autorizado",
    finalizacion: "3 días",
  },
  {
    regimen: "Facturación de los servicios",
    denominacion: "Emisión de factura por servicio",
    plazoPromedio: null,
    finalizacion: { aereo: "3 a 4 días", maritimo: "7 a 8 días" },
  },
];

