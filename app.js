const STORAGE_KEYS = {
  PONDS: 'shrimp_app_ponds',
  SAMPLES: 'shrimp_app_samples',
  HARVESTS: 'shrimp_app_harvests',
  PURCHASES: 'shrimp_app_purchases',
  STOCK_RETURNS: 'shrimp_app_stock_returns_v1',
  TREATMENTS: 'shrimp_app_treatments',
  VENDOR_TXNS: 'shrimp_app_vendor_txns_v1',
  LEDGER_ENTRIES: 'shrimp_app_ledger_entries_v1',
  LEDGER_SUBCATEGORIES: 'shrimp_app_ledger_subcategories_v1',
  LEDGER_ACCOUNTS: 'shrimp_app_ledger_accounts_v1',
  MASTER_CATALOGUE: 'shrimp_app_master_catalogue_v13',
  PRODUCT_MEMORY: 'shrimp_app_product_memory_v2'
};

const FEED_CHART_TABLE = [
  { abw: 3.0, feedKg: 16.0 }, { abw: 4.0, feedKg: 21.0 }, { abw: 5.0, feedKg: 25.0 },
  { abw: 6.0, feedKg: 27.0 }, { abw: 7.0, feedKg: 28.0 }, { abw: 8.0, feedKg: 30.0 },
  { abw: 9.0, feedKg: 32.0 }, { abw: 10.0, feedKg: 35.0 }, { abw: 11.0, feedKg: 36.0 },
  { abw: 12.0, feedKg: 38.0 }, { abw: 13.0, feedKg: 40.0 }, { abw: 14.0, feedKg: 42.0 },
  { abw: 15.0, feedKg: 43.0 }, { abw: 16.0, feedKg: 45.0 }, { abw: 17.0, feedKg: 46.0 },
  { abw: 18.0, feedKg: 47.0 }, { abw: 19.0, feedKg: 47.5 }, { abw: 20.0, feedKg: 48.0 },
  { abw: 21.0, feedKg: 49.0 }, { abw: 22.0, feedKg: 50.0 }, { abw: 23.0, feedKg: 51.0 },
  { abw: 24.0, feedKg: 53.0 }, { abw: 25.0, feedKg: 55.0 }, { abw: 26.0, feedKg: 56.0 },
  { abw: 27.0, feedKg: 57.0 }, { abw: 28.0, feedKg: 58.0 }, { abw: 29.0, feedKg: 59.0 },
  { abw: 30.0, feedKg: 60.0 }
];

const ROUTE_LABELS = {
  summary: 'Dashboard',
  pond: 'Pond & Cycle Setup',
  feed: 'Feed',
  feedInventory: 'Feed Inventory',
  entry: 'Add Sampling',
  history: 'Sampling History',
  harvest: 'Harvest Reconciliations',
  treatmentEntry: 'Record Treatment',
  treatmentLog: 'Treatment Logs',
  stockReturn: 'Stock Return',
  catalogue: 'Purchase & Inventory',
  finance: 'Financial Overview',
  ledger: 'Ledger'
};

const FEED_CODE_DIRECTORY = [
  { company: 'Growel', code: 'Feed 1C' },
  { company: 'Growel', code: 'Feed 2C' },
  { company: 'Growel', code: 'Feed 3SP' },
  { company: 'Growel', code: 'Feed 4P' },
  { company: 'Growel', code: 'Feed 5P' },
  { company: 'Growel', code: 'Feed 6P' },
  { company: 'Growel', code: 'Feed 7P' },
  { company: 'Growel', code: 'Tigron 1C' },
  { company: 'Growel', code: 'Tigron 2C' },
  { company: 'Growel', code: 'Tigron 3C' },
  { company: 'CPF', code: 'CPF 1' },
  { company: 'CPF', code: 'CPF 2' },
  { company: 'CPF', code: 'CPF 2P' },
  { company: 'CPF', code: 'CPF 3' },
  { company: 'CPF', code: 'CPF 3S' },
  { company: 'CPF', code: 'CPF 3P' },
  { company: 'CPF', code: 'CPF 4S' }
];

const ASSET_SUBCATEGORIES = [
  'Accessories', 'Aerator', 'Contactors', 'DG', 'Electric Accessories',
  'Electric Motor', 'Flood Light', 'MCB', 'MCCB', 'MPCB', 'Others',
  'P Line', 'Pipe', 'Plumbing', 'Satka', 'Sewage Motor', 'Starter',
  'Tape', 'Thimbles', 'Timers', 'Weight Scale', 'Wire 1 Core',
  'Wire 2 Core', 'Wire 3 Core', 'Wire 4 Core'
];

const LEGACY_ASSET_SUBCATEGORIES = new Set(['Gernator', 'Wire 1PH', 'Wire 3PH']);

const OPERATIONAL_SUBCATEGORIES = [
  'Accessories', 'DG Rent', 'Electric Accessories', 'Electricity', 'Fuel',
  'Harvesting', 'Infrastructure', 'Labour', 'Land Rent', 'Mngt Charges',
  'Others', 'Pond Mngt', 'R & D', 'Repair', 'Salary', 'Seed', 'Transportation'
];

let customLedgerSubcategories = [];
let customLedgerAccounts = [];

const DEFAULT_LEDGER_ACCOUNTS = [
  'Cash', 'AU Rahul', 'V.I. Aqualines BOM', 'V.I. Aqualines MSME',
  'Elite Aqualines', 'Elite Aqualines MSMS', 'Rahul HDFC CC',
  'Rakesh HDFC CC', 'SBI CC', 'MOM CC', 'ICICI CC'
];

const LEDGER_SEASONS = ['Crop 1', 'Crop 2', 'Infra'];

function getLedgerSubcategories() {
  const category = ledgerEntryCategory?.value || '';
  const baseOptions = category === 'Operational' ? OPERATIONAL_SUBCATEGORIES : ASSET_SUBCATEGORIES;
  const customOptions = customLedgerSubcategories
    .filter(option => typeof option === 'object' && option.category === category)
    .map(option => option.value)
    .filter(option => category !== 'Asset' || !LEGACY_ASSET_SUBCATEGORIES.has(option));
  return [...new Set([...baseOptions, ...customOptions])];
}

function getLedgerAccounts() {
  return [...new Set([...DEFAULT_LEDGER_ACCOUNTS, ...customLedgerAccounts])];
}

function rememberLedgerAccount(account) {
  const value = (account || '').trim();
  if (!value) return;
  const exists = getLedgerAccounts().some(option => option.toLowerCase() === value.toLowerCase());
  if (!exists) customLedgerAccounts.push(value);
}

const DEFAULT_MASTER_CATALOGUE = [
  { name: 'Feed 1C', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2150.0 },
  { name: 'Feed 2C', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2150.0 },
  { name: 'Feed 3SP', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2200.0 },
  { name: 'Feed 4P', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2200.0 },
  { name: 'Feed 5P', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2200.0 },
  { name: 'Feed 6P', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2200.0 },
  { name: 'Feed 7P', company: 'Growel', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2200.0 },
  { name: 'CPF 1', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2300.0 },
  { name: 'CPF 2', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2300.0 },
  { name: 'CPF 2P', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2300.0 },
  { name: 'CPF 3', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2350.0 },
  { name: 'CPF 3S', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2350.0 },
  { name: 'CPF 3P', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2350.0 },
  { name: 'CPF 4S', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2350.0 },
  { name: 'CPF 4P', company: 'CP Feed', category: 'Feed', unit: 'Bag/Pkt', unitPrice: 2350.0 },
  { name: 'Avant Miner Mate', company: 'Avant', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 950.0 },
  { name: 'Zeomin', company: 'Local', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 450.0 },
  { name: 'Potash', company: 'Local', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 1750.0 },
  { name: 'Posidon Boomin 20Kg', company: 'Posidon', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 1300.0 },
  { name: 'Magnesium Chloride', company: 'Local', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 1100.0 },
  { name: 'Kemin Mastermin-20Kg', company: 'Kemin', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 1600.0 },
  { name: 'Kemin Aqua Ratio-1Kg', company: 'Kemin', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 220.0 },
  { name: 'Levish Mineral-20Kg', company: 'Levish', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 1100.0 },
  { name: 'KMAX-10Kg', company: 'Local', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 650.0 },
  { name: 'Kemin Mastermin AR-25Kg', company: 'Kemin', category: 'Fertilizer', unit: 'Bag/Pkt', unitPrice: 1875.0 },
  { name: 'Intron Vitamin C-500gm', company: 'Intron', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 375.0 },
  { name: 'Baymix Latibon Plus-500gm', company: 'Bayer', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 475.0 },
  { name: 'Bleaching Powder-25Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1050.0 },
  { name: 'Provet Benzatec 80-1Ltr', company: 'Provet', category: 'Medicine', unit: 'Ltr', unitPrice: 580.0 },
  { name: 'Nommonia-500gm', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 600.0 },
  { name: 'Others', company: 'Local', category: 'Medicine', unit: 'Kg', unitPrice: 100.0 },
  { name: 'Pathostat-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1400.0 },
  { name: 'Clarity Growel EDTA-5Kg', company: 'Growel', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 900.0 },
  { name: 'Pond Dtox-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1650.0 },
  { name: 'Pond Plus-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1750.0 },
  { name: 'Potassium Perma-500gm', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 140.0 },
  { name: 'Avant D-Flow-20Ltr', company: 'Avant', category: 'Medicine', unit: 'Ltr', unitPrice: 190.0 },
  { name: 'Kemin Aquablenz-1Kg', company: 'Kemin', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1850.0 },
  { name: 'Kemin Pathrol-1Ltr', company: 'Kemin', category: 'Medicine', unit: 'Ltr', unitPrice: 1450.0 },
  { name: 'Himalaya Gel-30Ltr', company: 'Himalaya', category: 'Medicine', unit: 'Ltr', unitPrice: 125.0 },
  { name: 'Tablet India NOVIB-500gm', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 550.0 },
  { name: 'Ralli Bond-25Kg', company: 'Ralli', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 2125.0 },
  { name: 'Calgophos Virbac-10Ltr', company: 'Virbac', category: 'Medicine', unit: 'Ltr', unitPrice: 320.0 },
  { name: 'CPF Zeolite Ultra-20Kg', company: 'CP Feed', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 700.0 },
  { name: 'Thionil-SP-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1350.0 },
  { name: 'Posidon Supreme PS-20Ltr', company: 'Posidon', category: 'Medicine', unit: 'Ltr', unitPrice: 240.0 },
  { name: 'Oxygen Sodium Percarbonate', company: 'Local', category: 'Medicine', unit: 'Kg', unitPrice: 125.0 },
  { name: 'Kemin Prozyta WP-1Kg', company: 'Kemin', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 2100.0 },
  { name: 'Probacilla WP-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1600.0 },
  { name: 'CP PS-20Ltr', company: 'CP Feed', category: 'Medicine', unit: 'Ltr', unitPrice: 210.0 },
  { name: 'Kemin Aquastem V-1Kg', company: 'Kemin', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1950.0 },
  { name: 'Pisanco Grocid-1Kg', company: 'Pisanco', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1250.0 },
  { name: 'Varna-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 850.0 },
  { name: 'Lavi Sac Yeast-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 450.0 },
  { name: 'Aqua Soft-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 380.0 },
  { name: 'Kemin Nutrasist-1Kg', company: 'Kemin', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1550.0 },
  { name: 'Pisanco Sanityz-1Ltr', company: 'Pisanco', category: 'Medicine', unit: 'Ltr', unitPrice: 650.0 },
  { name: 'Gentech-P.S.-20Ltr', company: 'Gentech', category: 'Medicine', unit: 'Ltr', unitPrice: 220.0 },
  { name: 'Challenger Sani-1Ltr', company: 'Challenger', category: 'Medicine', unit: 'Ltr', unitPrice: 720.0 },
  { name: 'Karyomax Plus-1Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1400.0 },
  { name: 'Posidon Relief Sani-1Ltr', company: 'Posidon', category: 'Medicine', unit: 'Ltr', unitPrice: 850.0 },
  { name: 'PVS White Master-5Ltr', company: 'PVS', category: 'Medicine', unit: 'Ltr', unitPrice: 480.0 },
  { name: 'Posidon Freeze 80-1Ltr', company: 'Posidon', category: 'Medicine', unit: 'Ltr', unitPrice: 920.0 },
  { name: 'Provet Rhodobac-20Ltr', company: 'Provet', category: 'Medicine', unit: 'Ltr', unitPrice: 260.0 },
  { name: 'Kemin Clamore Dry-20Kg', company: 'Kemin', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 2200.0 },
  { name: 'Virbac Hipanomix-500gm', company: 'Virbac', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 650.0 },
  { name: 'Zeomin Forte-10Kg', company: 'Local', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 450.0 },
  { name: 'Provet Raprosoft-1Kg', company: 'Provet', category: 'Medicine', unit: 'Bag/Pkt', unitPrice: 1450.0 }
];

const defaultPond = {
  id: 'p1',
  name: 'P1',
  hatcheryName: 'Ravi Hatcheries',
  length: 70,
  breadth: 42,
  area: 2940,
  stockingDate: '2026-04-03',
  stockingCount: 125000
};

const defaultSamples = [
  { id: 's1', pondId: 'p1', date: '2026-05-14', testWeight: 500, count: 118, lastFeed: 0, currentFeed: 502, notes: '' },
  { id: 's2', pondId: 'p1', date: '2026-05-21', testWeight: 500, count: 87, lastFeed: 502, currentFeed: 682, notes: '' },
  { id: 's3', pondId: 'p1', date: '2026-05-28', testWeight: 1000, count: 115, lastFeed: 682, currentFeed: 929, notes: '' },
  { id: 's4', pondId: 'p1', date: '2026-06-04', testWeight: 1020, count: 91, lastFeed: 929, currentFeed: 1275, notes: '' },
  { id: 's5', pondId: 'p1', date: '2026-06-11', testWeight: 1000, count: 73, lastFeed: 1275, currentFeed: 1582, notes: '' },
  { id: 's6', pondId: 'p1', date: '2026-06-18', testWeight: 1000, count: 59, lastFeed: 1582, currentFeed: 1924, notes: '' },
  { id: 's7', pondId: 'p1', date: '2026-06-25', testWeight: 1000, count: 53, lastFeed: 1924, currentFeed: 2308, notes: '' }
];

const defaultHarvests = [
  { id: 'h1', pondId: 'p1', date: '2026-06-20', type: 'Partial', weight: 1000, count: 60, totalFeed: null },
  { id: 'h2', pondId: 'p1', date: '2026-09-06', type: 'Full', weight: 2401, count: 51, totalFeed: 2308 }
];

const defaultPurchases = [
  { id: 'pur_1', date: '2026-03-03', crop: 'Crop 1', invoiceNo: '1012', name: 'Medicine Order', company: 'Local', supplier: 'Karan', category: 'Medicine', qty: 1, unit: 'Bag/Pkt', unitPrice: 8162.0, totalAmount: 8162.0 },
  { id: 'pur_2', date: '2026-03-11', crop: 'Crop 1', invoiceNo: '1021', name: 'Shrimp Feed', company: 'Growel', supplier: 'Karan', category: 'Feed', qty: 1, unit: 'Bag/Pkt', unitPrice: 90450.0, totalAmount: 90450.0 },
  { id: 'pur_3', date: '2026-03-16', crop: 'Crop 1', invoiceNo: '1027', name: 'Water Medicine', company: 'Local', supplier: 'Karan', category: 'Medicine', qty: 1, unit: 'Bag/Pkt', unitPrice: 2624.0, totalAmount: 2624.0 },
  { id: 'pur_4', date: '2026-03-30', crop: 'Crop 1', invoiceNo: '1052', name: 'CP Feed Supply', company: 'CP Feed', supplier: 'Karan', category: 'Feed', qty: 1, unit: 'Bag/Pkt', unitPrice: 80073.0, totalAmount: 80073.0 }
];

const defaultStockReturns = [
  { id: 'ret_1', date: '2026-05-01', crop: 'Crop 1', invoiceNo: '1021', name: 'Shrimp Feed', company: 'Growel', supplier: 'Karan', category: 'Feed', qty: 10, unit: 'Bag/Pkt', unitPrice: 2635.0, totalAmount: 26350.0 }
];

const defaultVendorTransactions = [
  { id: 'vtxn_1', vendor: 'Karan', crop: 'Crop 1', date: '2026-02-05', type: 'Credit', billNo: '', amount: 700000, remarks: 'Advance' },
  { id: 'vtxn_2', vendor: 'Karan', crop: 'Crop 1', date: '2026-03-11', type: 'Credit', billNo: '1021', amount: 2700, remarks: 'Feed Rate Difference CN' },
  { id: 'vtxn_3', vendor: 'Karan', crop: 'Crop 1', date: '2026-03-30', type: 'Credit', billNo: '1052', amount: 6400, remarks: 'Feed Rate Difference CN' },
  { id: 'vtxn_4', vendor: 'Karan', crop: 'Crop 1', date: '2026-04-05', type: 'Credit', billNo: '', amount: 200000, remarks: 'Advance' }
];

const defaultTreatments = [
  { id: 't_1', pondId: 'p1', date: '2026-06-15', productName: 'Agri Lime', timing: 'Morning', qty: 2, unit: 'Bag/Pkt', baseQty: 2, unitPrice: 550.0, totalCost: 1100, notes: 'Water coloration and buffering' }
];

let ponds = [];
let samples = [];
let harvests = [];
let purchases = [];
let stockReturns = [];
let treatments = [];
let vendorTransactions = [];
let ledgerEntries = [];
let masterCatalogue = [];
let productMemory = {};
let deleteTargetId = null;
let deleteTargetType = null;
let vendorPaymentOnlyMode = false;

const views = document.querySelectorAll('.view');
const activeRouteLabel = document.getElementById('activeRouteLabel');

const importButton = document.getElementById('importButton');
const exportButton = document.getElementById('exportButton');
const importFileInput = document.getElementById('importFileInput');

// KPI Elements
const pondCountEl = document.getElementById('pondCount');
const sampleCountEl = document.getElementById('sampleCount');
const latestAbwEl = document.getElementById('latestAbw');
const chartPondSelect = document.getElementById('chartPond');
const growthChartSvg = document.getElementById('growthChart');
const growthEmptyEl = document.getElementById('growthEmpty');

const survivalPondSelect = document.getElementById('survivalPond');
const survivalChartSvg = document.getElementById('survivalChart');
const survivalEmptyEl = document.getElementById('survivalEmpty');
const survivalAnalysisNoteEl = document.getElementById('survivalAnalysisNote');

const pondSnapshotsEl = document.getElementById('pondSnapshots');

const sampleForm = document.getElementById('sampleForm');
const sampleIdInput = document.getElementById('sampleId');
const samplePondSelect = document.getElementById('samplePond');
const sampleDateInput = document.getElementById('sampleDate');
const testWeightInput = document.getElementById('testWeight');
const shrimpCountInput = document.getElementById('shrimpCount');
const lastFeedInput = document.getElementById('lastFeed');
const currentFeedInput = document.getElementById('currentFeed');
const sampleNotesInput = document.getElementById('sampleNotes');
const cancelEditBtn = document.getElementById('cancelEdit');
const saveLabel = document.getElementById('saveLabel');
const formMessage = document.getElementById('formMessage');

const previewAbw = document.getElementById('previewAbw');
const previewDoc = document.getElementById('previewDoc');
const previewGrowth = document.getElementById('previewGrowth');
const previewFcr = document.getElementById('previewFcr');
const previewSurvival = document.getElementById('previewSurvival');

const historyPondSelect = document.getElementById('historyPond');
const historySearchInput = document.getElementById('historySearch');
const historySortOrder = document.getElementById('historySortOrder');
const historySamplesEl = document.getElementById('historySamples');

const harvestForm = document.getElementById('harvestForm');
const harvestIdInput = document.getElementById('harvestId');
const harvestPondSelect = document.getElementById('harvestPondSelect');
const harvestDateInput = document.getElementById('harvestDate');
const harvestTypeSelect = document.getElementById('harvestType');
const harvestWeightInput = document.getElementById('harvestWeight');
const harvestCountInput = document.getElementById('harvestCount');
const harvestTotalFeedInput = document.getElementById('harvestTotalFeed');
const harvestSaveLabel = document.getElementById('harvestSaveLabel');
const cancelHarvestEditBtn = document.getElementById('cancelHarvestEdit');
const harvestRecordsListEl = document.getElementById('harvestRecordsList');
const previewHarvestPieces = document.getElementById('previewHarvestPieces');
const previewHarvestAbw = document.getElementById('previewHarvestAbw');
const harvestMessageEl = document.getElementById('harvestMessage');

const pondForm = document.getElementById('pondForm');
const pondIdInput = document.getElementById('pondId');
const pondNameInput = document.getElementById('pondName');
const hatcheryNameInput = document.getElementById('hatcheryName');
const pondLengthInput = document.getElementById('pondLength');
const pondBreadthInput = document.getElementById('pondBreadth');
const pondAreaInput = document.getElementById('pondArea');
const stockingDateInput = document.getElementById('stockingDate');
const stockingCountInput = document.getElementById('stockingCount');
const cancelPondEditBtn = document.getElementById('cancelPondEdit');
const pondSaveLabel = document.getElementById('pondSaveLabel');
const pondListEl = document.getElementById('pondList');
const pondMessageEl = document.getElementById('pondMessage');

const treatmentCountEl = document.getElementById('treatmentCount');
const treatmentTotalCostEl = document.getElementById('treatmentTotalCost');
const treatmentFertCostEl = document.getElementById('treatmentFertCost');
const treatmentMedCostEl = document.getElementById('treatmentMedCost');
const treatmentPondFilter = document.getElementById('treatmentPondFilter');
const treatmentCatFilter = document.getElementById('treatmentCatFilter');
const treatmentSearchInput = document.getElementById('treatmentSearch');
const treatmentSortOrder = document.getElementById('treatmentSortOrder');
const treatmentRecordsListEl = document.getElementById('treatmentRecordsList');

const treatmentForm = document.getElementById('treatmentForm');
const treatmentIdInput = document.getElementById('treatmentId');
const treatmentPondSelect = document.getElementById('treatmentPondSelect');
const treatmentDateInput = document.getElementById('treatmentDate');
const treatmentCategoryFilter = document.getElementById('treatmentCategoryFilter');
const treatmentProductNameInput = document.getElementById('treatmentProductName');
const treatmentProductSuggestions = document.getElementById('treatmentProductSuggestions');
const treatmentTimingSelect = document.getElementById('treatmentTiming');
const treatmentQtyInput = document.getElementById('treatmentQty');
const treatmentUnitSelect = document.getElementById('treatmentUnit');
const treatmentNotesInput = document.getElementById('treatmentNotes');
const previewTreatmentRate = document.getElementById('previewTreatmentRate');
const previewTreatmentAvailableStock = document.getElementById('previewTreatmentAvailableStock');
const previewTreatmentCost = document.getElementById('previewTreatmentCost');
const cancelTreatmentEditBtn = document.getElementById('cancelTreatmentEdit');
const treatmentSaveLabel = document.getElementById('treatmentSaveLabel');

// Stock Return Elements
const stockReturnForm = document.getElementById('stockReturnForm');
const returnIdInput = document.getElementById('returnId');
const returnDateInput = document.getElementById('returnDate');
const returnCropSelect = document.getElementById('returnCrop');
const returnInvoiceNoInput = document.getElementById('returnInvoiceNo');
const returnSupplierInput = document.getElementById('returnSupplier');
const returnSupplierSuggestions = document.getElementById('returnSupplierSuggestions');
const returnItemRowsContainer = document.getElementById('returnItemRowsContainer');
const addReturnItemRowBtn = document.getElementById('addReturnItemRowBtn');
const previewReturnCount = document.getElementById('previewReturnCount');
const previewReturnTotal = document.getElementById('previewReturnTotal');
const cancelReturnEditBtn = document.getElementById('cancelReturnEdit');
const stockReturnSaveLabel = document.getElementById('stockReturnSaveLabel');
const returnMessageEl = document.getElementById('returnMessage');
const stockReturnHistoryListEl = document.getElementById('stockReturnHistoryList');

// Purchase Form Elements
const invDistinctCountEl = document.getElementById('invDistinctCount');
const invTotalPurchasedValueEl = document.getElementById('invTotalPurchasedValue');
const invTotalUsedValueEl = document.getElementById('invTotalUsedValue');
const invCurrentStockValueEl = document.getElementById('invCurrentStockValue');
const invCurrentStockValueEl2 = document.getElementById('invCurrentStockValueEl2');

const purchaseForm = document.getElementById('purchaseForm');
const purchaseIdInput = document.getElementById('purchaseId');
const purchaseDateInput = document.getElementById('purchaseDate');
const purchaseCropSelect = document.getElementById('purchaseCrop');
const invoiceNoInput = document.getElementById('invoiceNoInput');
const prodSupplierInput = document.getElementById('prodSupplier');
const prodSupplierSuggestions = document.getElementById('prodSupplierSuggestions');

const invoiceItemRowsContainer = document.getElementById('invoiceItemRowsContainer');
const addItemRowBtn = document.getElementById('addItemRowBtn');
const previewInvoiceCount = document.getElementById('previewInvoiceCount');
const previewInvoiceTotal = document.getElementById('previewInvoiceTotal');

const invSearchInput = document.getElementById('invSearchInput');
const invCategoryFilter = document.getElementById('invCategoryFilter');
const purchaseSortOrder = document.getElementById('purchaseSortOrder');

const cancelPurchaseEditBtn = document.getElementById('cancelPurchaseEdit');
const purchaseSaveLabel = document.getElementById('purchaseSaveLabel');
const purchaseMessageEl = document.getElementById('purchaseMessage');
const liveInventoryListEl = document.getElementById('liveInventoryList');
const purchaseHistoryListEl = document.getElementById('purchaseHistoryList');

// Finance Elements
const financeTotalDebits = document.getElementById('financeTotalDebits');
const financeTotalCredits = document.getElementById('financeTotalCredits');
const financeNetBalance = document.getElementById('financeNetBalance');
const financeTransactionCount = document.getElementById('financeTransactionCount');
const financeCategorySummary = document.getElementById('financeCategorySummary');
const financeTypeFilter = document.getElementById('financeTypeFilter');
const financeCategoryFilter = document.getElementById('financeCategoryFilter');
const financeSearchInput = document.getElementById('financeSearchInput');
const financeLedgerBody = document.getElementById('financeLedgerBody');
const ledgerEntryForm = document.getElementById('ledgerEntryForm');
const ledgerEntryDate = document.getElementById('ledgerEntryDate');
const ledgerEntryCategory = document.getElementById('ledgerEntryCategory');
const ledgerEntrySubCategory = document.getElementById('ledgerEntrySubCategory');
const ledgerCategorySuggestions = document.getElementById('ledgerCategorySuggestions');
const ledgerSubCategorySuggestions = document.getElementById('ledgerSubCategorySuggestions');
const ledgerEntrySeason = document.getElementById('ledgerEntrySeason');
const ledgerSeasonSuggestions = document.getElementById('ledgerSeasonSuggestions');
const ledgerEntryBillStatus = document.getElementById('ledgerEntryBillStatus');
const ledgerEntryQty = document.getElementById('ledgerEntryQty');
const ledgerEntryPrice = document.getElementById('ledgerEntryPrice');
const ledgerEntryAmount = document.getElementById('ledgerEntryAmount');
const ledgerEntryAccount = document.getElementById('ledgerEntryAccount');
const ledgerAccountSuggestions = document.getElementById('ledgerAccountSuggestions');
const ledgerEntryNote = document.getElementById('ledgerEntryNote');
const ledgerEntryMessage = document.getElementById('ledgerEntryMessage');
const ledgerEntrySort = document.getElementById('ledgerEntrySort');
const ledgerEntryCategoryFilter = document.getElementById('ledgerEntryCategoryFilter');
const ledgerEntrySubCategoryFilter = document.getElementById('ledgerEntrySubCategoryFilter');
const ledgerEntrySeasonFilter = document.getElementById('ledgerEntrySeasonFilter');
const ledgerEntryStatusFilter = document.getElementById('ledgerEntryStatusFilter');
const ledgerEntrySearch = document.getElementById('ledgerEntrySearch');
const ledgerEntriesBody = document.getElementById('ledgerEntriesBody');
const overviewPurchaseDebits = document.getElementById('overviewPurchaseDebits');
const overviewVendorCredits = document.getElementById('overviewVendorCredits');
const overviewRateDiffCredits = document.getElementById('overviewRateDiffCredits');
const overviewPendingPayable = document.getElementById('overviewPendingPayable');
const overviewVendorBody = document.getElementById('overviewVendorBody');
const overviewMonthlyChart = document.getElementById('overviewMonthlyChart');

// Vendor Statement Modal Elements
const openVendorStatementBtn = document.getElementById('openVendorStatementBtn');
const vendorStatementNavBtn = document.getElementById('vendorStatementNavBtn');
const vendorPaymentsNavBtn = document.getElementById('vendorPaymentsNavBtn');
const vendorStatementDialog = document.getElementById('vendorStatementDialog');
const statementVendorSelect = document.getElementById('statementVendorSelect');
const statementCropFilter = document.getElementById('statementCropFilter');
const statementTypeFilter = document.getElementById('statementTypeFilter');
const statementRowSearch = document.getElementById('statementRowSearch');
const statementAccountTitle = document.getElementById('statementAccountTitle');
const statementTableBody = document.getElementById('statementTableBody');
const stmtCrop1Purchases = document.getElementById('stmtCrop1Purchases');
const stmtCrop2Purchases = document.getElementById('stmtCrop2Purchases');
const stmtCrop1Balance = document.getElementById('stmtCrop1Balance');
const stmtCrop2Balance = document.getElementById('stmtCrop2Balance');
const stmtTotalDebit = document.getElementById('stmtTotalDebit');
const stmtTotalCredit = document.getElementById('stmtTotalCredit');
const stmtClosingBalance = document.getElementById('stmtClosingBalance');

const printStatementBtn = document.getElementById('printStatementBtn');
const copyStatementBtn = document.getElementById('copyStatementBtn');
const closeStatementBtn = document.getElementById('closeStatementBtn');

// Quick Add Payment Drawer Elements
const openAddPaymentModalBtn = document.getElementById('openAddPaymentModalBtn');
const quickAddPaymentBox = document.getElementById('quickAddPaymentBox');
const advDateInput = document.getElementById('advDate');
const advCropSelect = document.getElementById('advCrop');
const advTypeSelect = document.getElementById('advType');
const advBillNoInput = document.getElementById('advBillNo');
const advAccountInput = document.getElementById('advAccount');
const advAccountSuggestions = document.getElementById('advAccountSuggestions');
const advAmountInput = document.getElementById('advAmount');
const advRemarksInput = document.getElementById('advRemarks');
const saveAdvancePaymentBtn = document.getElementById('saveAdvancePaymentBtn');

const confirmDialog = document.getElementById('confirmDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogText = document.getElementById('dialogText');

document.addEventListener('DOMContentLoaded', () => {
  loadAndEnsureData();
  setupEventListeners();
  renderAll();
  autoPopulateLastFeed();
});

// Product Memory System
function initProductMemory() {
  try {
    productMemory = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCT_MEMORY)) || {};
  } catch (e) {
    productMemory = {};
  }

  masterCatalogue.forEach(m => {
    const k = (m.name || '').trim().toLowerCase();
    if (k && !productMemory[k]) {
      productMemory[k] = {
        company: m.company || 'Local',
        lastPrice: m.unitPrice || 0,
        category: m.category || 'Fertilizer',
        unit: m.unit || 'Bag/Pkt'
      };
    }
  });

  const sortedPurchases = [...purchases].sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  sortedPurchases.forEach(p => {
    const k = (p.name || '').trim().toLowerCase();
    if (k) {
      productMemory[k] = {
        company: p.company || productMemory[k]?.company || 'Local',
        lastPrice: (p.unitPrice && p.unitPrice > 0) ? p.unitPrice : (productMemory[k]?.lastPrice || 0),
        category: p.category || productMemory[k]?.category || 'Fertilizer',
        unit: p.unit || productMemory[k]?.unit || 'Bag/Pkt'
      };
    }
  });
}

function getProductMemory(productName) {
  if (!productName) return null;
  const k = productName.trim().toLowerCase();
  return productMemory[k] || null;
}

function saveProductMemoryEntry(name, company, price, category, unit) {
  if (!name || !name.trim()) return;
  const k = name.trim().toLowerCase();
  productMemory[k] = {
    company: company && company.trim() ? company.trim() : (productMemory[k]?.company || 'Local'),
    lastPrice: parseFloat(price) > 0 ? parseFloat(price) : (productMemory[k]?.lastPrice || 0),
    category: category || productMemory[k]?.category || 'Fertilizer',
    unit: unit || productMemory[k]?.unit || 'Bag/Pkt'
  };
  localStorage.setItem(STORAGE_KEYS.PRODUCT_MEMORY, JSON.stringify(productMemory));
}

function loadAndEnsureData() {
  try {
    ponds = JSON.parse(localStorage.getItem(STORAGE_KEYS.PONDS)) || [];
    samples = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAMPLES)) || [];
    harvests = JSON.parse(localStorage.getItem(STORAGE_KEYS.HARVESTS)) || [];
    purchases = JSON.parse(localStorage.getItem(STORAGE_KEYS.PURCHASES)) || [];
    stockReturns = JSON.parse(localStorage.getItem(STORAGE_KEYS.STOCK_RETURNS)) || [];
    treatments = JSON.parse(localStorage.getItem(STORAGE_KEYS.TREATMENTS)) || [];
    vendorTransactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.VENDOR_TXNS)) || [];
    ledgerEntries = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEDGER_ENTRIES)) || [];
    customLedgerSubcategories = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEDGER_SUBCATEGORIES)) || [];
    customLedgerAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEDGER_ACCOUNTS)) || [];
  } catch (e) {
    ponds = []; samples = []; harvests = []; purchases = []; stockReturns = []; treatments = []; vendorTransactions = []; ledgerEntries = []; customLedgerSubcategories = []; customLedgerAccounts = [];
  }

  try {
    const storedCat = localStorage.getItem(STORAGE_KEYS.MASTER_CATALOGUE);
    masterCatalogue = storedCat ? JSON.parse(storedCat) : [];
  } catch (e) {
    masterCatalogue = [];
  }

  if (!masterCatalogue || masterCatalogue.length === 0) {
    masterCatalogue = [...DEFAULT_MASTER_CATALOGUE];
  }

  if (!ponds || ponds.length === 0) ponds = [defaultPond];
  if (!samples || samples.length === 0) samples = [...defaultSamples];
  if (!harvests || harvests.length === 0) harvests = [...defaultHarvests];
  if (!purchases || purchases.length === 0) purchases = [...defaultPurchases];
  if (!stockReturns || stockReturns.length === 0) stockReturns = [...defaultStockReturns];
  if (!treatments || treatments.length === 0) treatments = [...defaultTreatments];
  if (!vendorTransactions || vendorTransactions.length === 0) vendorTransactions = [...defaultVendorTransactions];

  purchases = purchases.map((p, index) => {
    const unitPrice = parseFloat(p.unitPrice !== undefined ? p.unitPrice : (p.unitRate !== undefined ? p.unitRate : (p.price || 0))) || 0;
    const qty = parseFloat(p.qty !== undefined ? p.qty : (p.packSize || 1)) || 0;
    const totalAmount = parseFloat(p.totalAmount !== undefined ? p.totalAmount : (qty * unitPrice)) || (qty * unitPrice);
    return {
      id: p.id || `pur_${Date.now()}_${index}`,
      date: p.date || new Date().toISOString().split('T')[0],
      crop: p.crop || 'Crop 1',
      invoiceNo: (p.invoiceNo || '').trim(),
      name: (p.name || 'Unnamed Product').trim(),
      company: (p.company || 'Local').trim(),
      supplier: (p.supplier || '').trim(),
      category: p.category || 'Fertilizer',
      qty: qty,
      unit: p.unit || p.packUnit || 'Bag/Pkt',
      unitPrice: unitPrice,
      totalAmount: totalAmount
    };
  });

  stockReturns = stockReturns.map((r, index) => {
    const unitPrice = parseFloat(r.unitPrice) || 0;
    const qty = parseFloat(r.qty) || 0;
    const totalAmount = parseFloat(r.totalAmount !== undefined ? r.totalAmount : (qty * unitPrice)) || (qty * unitPrice);
    return {
      id: r.id || `ret_${Date.now()}_${index}`,
      date: r.date || new Date().toISOString().split('T')[0],
      crop: r.crop || 'Crop 1',
      invoiceNo: (r.invoiceNo || '').trim(),
      name: (r.name || 'Unnamed Product').trim(),
      company: (r.company || 'Local').trim(),
      supplier: (r.supplier || '').trim(),
      category: r.category || 'Fertilizer',
      qty: qty,
      unit: r.unit || 'Bag/Pkt',
      unitPrice: unitPrice,
      totalAmount: totalAmount
    };
  });

  initProductMemory();
  saveStorage();
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEYS.PONDS, JSON.stringify(ponds));
  localStorage.setItem(STORAGE_KEYS.SAMPLES, JSON.stringify(samples));
  localStorage.setItem(STORAGE_KEYS.HARVESTS, JSON.stringify(harvests));
  localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
  localStorage.setItem(STORAGE_KEYS.STOCK_RETURNS, JSON.stringify(stockReturns));
  localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(treatments));
  localStorage.setItem(STORAGE_KEYS.VENDOR_TXNS, JSON.stringify(vendorTransactions));
  localStorage.setItem(STORAGE_KEYS.LEDGER_ENTRIES, JSON.stringify(ledgerEntries));
  localStorage.setItem(STORAGE_KEYS.LEDGER_SUBCATEGORIES, JSON.stringify(customLedgerSubcategories));
  localStorage.setItem(STORAGE_KEYS.LEDGER_ACCOUNTS, JSON.stringify(customLedgerAccounts));
  localStorage.setItem(STORAGE_KEYS.MASTER_CATALOGUE, JSON.stringify(masterCatalogue));
}

function toggleNavGroup(groupId) {
  const currentGroup = document.getElementById(groupId);
  if (!currentGroup) return;
  const isAlreadyOpen = currentGroup.classList.contains('open');

  setNavGroupState(isAlreadyOpen ? null : currentGroup);
}

function setNavGroupState(activeGroup) {
  document.querySelectorAll('.nav-group').forEach(group => {
    const isActive = group === activeGroup;
    group.classList.toggle('open', isActive);
    const header = group.querySelector('.nav-group-header');
    if (header) {
      header.classList.toggle('active-parent', isActive);
      header.setAttribute('aria-expanded', String(isActive));
    }
  });
}

function navigateTo(route) {
  const allViews = document.querySelectorAll('.view');
  allViews.forEach(v => v.classList.remove('active'));

  const viewRoute = route === 'feed' ? 'entry' : route === 'feedInventory' ? 'catalogue' : route;
  const activeView = document.getElementById(`${viewRoute}View`);
  if (activeView) activeView.classList.add('active');
  const isFeedInventoryRoute = route === 'feedInventory';
  document.getElementById('catalogueView')?.classList.toggle('feed-inventory-only', isFeedInventoryRoute);
  const purchaseFormBox = document.getElementById('purchaseForm')?.closest('.form-box');
  const purchaseHistoryHeader = document.getElementById('purchaseHistorySectionHeader');
  if (purchaseFormBox) purchaseFormBox.hidden = isFeedInventoryRoute;
  if (purchaseHistoryHeader) {
    purchaseHistoryHeader.hidden = isFeedInventoryRoute;
    purchaseHistoryHeader.style.display = isFeedInventoryRoute ? 'none' : '';
  }
  if (purchaseHistoryListEl) purchaseHistoryListEl.hidden = isFeedInventoryRoute;

  document.querySelectorAll('.sidebar-menu .nav-item, .sidebar-menu .nav-sub-item').forEach(b => {
    b.classList.remove('active');
  });

  setNavGroupState(null);

  const activeBtn = document.querySelector(`.sidebar-menu [data-route="${route}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    const parentGroup = activeBtn.closest('.nav-group');
    if (parentGroup) {
      setNavGroupState(parentGroup);
    }
  }

  if (activeRouteLabel) {
    activeRouteLabel.textContent = ROUTE_LABELS[route] || 'Dashboard';
  }

  if (route === 'feedInventory' && invCategoryFilter) {
    invCategoryFilter.value = 'Feed';
  }
  if (route === 'catalogue' && invCategoryFilter) {
    invCategoryFilter.value = 'ALL';
  }

  const canvas = document.querySelector('.content-canvas');
  if (canvas) canvas.scrollTo({ top: 0, behavior: 'smooth' });

  renderAll();

  if ((route === 'entry' || route === 'feed') && sampleIdInput && !sampleIdInput.value) autoPopulateLastFeed();
  if (route === 'treatmentEntry' && treatmentDateInput && !treatmentDateInput.value) treatmentDateInput.value = new Date().toISOString().split('T')[0];
  if (route === 'stockReturn') {
    if (returnDateInput && !returnDateInput.value) returnDateInput.value = new Date().toISOString().split('T')[0];
    if (returnItemRowsContainer && returnItemRowsContainer.children.length === 0) {
      addReturnItemRow({}, false);
    }
  }
  if (route === 'catalogue' || route === 'feedInventory') {
    if (purchaseDateInput && !purchaseDateInput.value) purchaseDateInput.value = new Date().toISOString().split('T')[0];
    if (invoiceItemRowsContainer && invoiceItemRowsContainer.children.length === 0) {
      addInvoiceItemRow({}, false);
    }
  }
}

function calculatePondArea() {
  const l = parseFloat(pondLengthInput.value) || 0;
  const b = parseFloat(pondBreadthInput.value) || 0;
  if (l > 0 && b > 0) {
    const area = l * b;
    pondAreaInput.value = Number.isInteger(area) ? area : area.toFixed(2);
  } else {
    pondAreaInput.value = '';
  }
}

// Universal Keyboard Navigation with Arrow Keys & Enter Flow
function bindKeyboardNavigation(inputEl, dropdownEl, nextFocusEl = null) {
  if (!inputEl || !dropdownEl) return;
  let activeIndex = -1;

  function getSelectableItems() {
    return Array.from(dropdownEl.querySelectorAll('.autocomplete-item:not(.no-select)'));
  }

  function updateVisualHighlight(items) {
    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === activeIndex);
    });
    if (activeIndex >= 0 && activeIndex < items.length) {
      const activeItem = items[activeIndex];
      const itemTop = activeItem.offsetTop;
      const itemBottom = itemTop + activeItem.offsetHeight;
      const visibleTop = dropdownEl.scrollTop;
      const visibleBottom = visibleTop + dropdownEl.clientHeight;

      if (itemTop < visibleTop) {
        dropdownEl.scrollTop = itemTop;
      } else if (itemBottom > visibleBottom) {
        dropdownEl.scrollTop = itemBottom - dropdownEl.clientHeight;
      }
    }
  }

  inputEl.addEventListener('keydown', (e) => {
    const isVisible = !dropdownEl.hidden && dropdownEl.style.display !== 'none';
    const items = isVisible ? getSelectableItems() : [];

    if (e.key === 'ArrowDown') {
      if (isVisible && items.length > 0) {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateVisualHighlight(items);
      }
    } else if (e.key === 'ArrowUp') {
      if (isVisible && items.length > 0) {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateVisualHighlight(items);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isVisible && items.length > 0) {
        const targetIdx = activeIndex >= 0 ? activeIndex : 0;
        if (items[targetIdx]) {
          items[targetIdx].click();
        }
      } else {
        dropdownEl.hidden = true;
        const nextEl = typeof nextFocusEl === 'function' ? nextFocusEl() : nextFocusEl;
        if (nextEl) nextEl.focus();
      }
      activeIndex = -1;
    } else if (e.key === 'Tab') {
      if (isVisible && items.length > 0 && activeIndex >= 0) {
        items[activeIndex].click();
      }
      dropdownEl.hidden = true;
      activeIndex = -1;
    } else if (e.key === 'Escape') {
      dropdownEl.hidden = true;
      activeIndex = -1;
    }
  });

  inputEl.addEventListener('input', () => {
    activeIndex = -1;
  });

  inputEl.addEventListener('blur', () => {
    setTimeout(() => {
      dropdownEl.hidden = true;
      activeIndex = -1;
    }, 200);
  });
}

// Multi-Item Invoice Row Manager — STRICTLY NO AUTO-ROW CREATION (Manual Only via "+ Add Item Row")
function addInvoiceItemRow(data = {}, autoFocus = false) {
  if (!invoiceItemRowsContainer) return;
  const rowId = `row_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

  const rowDiv = document.createElement('div');
  rowDiv.className = 'invoice-item-row';
  rowDiv.setAttribute('data-row-id', rowId);

  rowDiv.innerHTML = `
    <div class="form-group" style="margin:0;">
      <label>Category *</label>
      <select class="row-category">
        <option value="Fertilizer" ${data.category === 'Fertilizer' ? 'selected' : ''}>Fertilizer</option>
        <option value="Medicine" ${data.category === 'Medicine' ? 'selected' : ''}>Medicine</option>
        <option value="Feed" ${data.category === 'Feed' ? 'selected' : ''}>Feed</option>
      </select>
    </div>
    <div class="form-group autocomplete-container" style="margin:0;">
      <label>Product Name *</label>
      <input type="text" class="row-name" placeholder="Product name..." autocomplete="off" value="${escapeHtml(data.name || '')}">
      <div class="autocomplete-dropdown" hidden></div>
    </div>
    <div class="form-group autocomplete-container" style="margin:0;">
      <label>Company / Brand *</label>
      <input type="text" class="row-company" placeholder="Brand..." autocomplete="off" value="${escapeHtml(data.company || '')}">
      <div class="autocomplete-dropdown" hidden></div>
    </div>
    <div class="form-group" style="margin:0;">
      <label>Quantity *</label>
      <input type="number" class="row-qty" step="any" placeholder="Qty" value="${data.qty !== undefined ? data.qty : ''}">
    </div>
    <div class="form-group" style="margin:0;">
      <label>Unit *</label>
      <select class="row-unit">
        <option value="Bag/Pkt" ${data.unit === 'Bag/Pkt' ? 'selected' : ''}>Bag/Pkt</option>
        <option value="Kg" ${data.unit === 'Kg' ? 'selected' : ''}>Kg</option>
        <option value="Ltr" ${data.unit === 'Ltr' ? 'selected' : ''}>Ltr</option>
        <option value="gms" ${data.unit === 'gms' ? 'selected' : ''}>gms</option>
        <option value="ml" ${data.unit === 'ml' ? 'selected' : ''}>ml</option>
      </select>
    </div>
    <div class="form-group" style="margin:0;">
      <label>Unit Price (₹) *</label>
      <input type="number" class="row-price" step="any" placeholder="Price" value="${data.unitPrice !== undefined ? data.unitPrice : ''}">
    </div>
    <div>
      <button type="button" class="row-delete-btn" title="Remove Item">🗑️</button>
    </div>
  `;

  invoiceItemRowsContainer.appendChild(rowDiv);

  const qtyInput = rowDiv.querySelector('.row-qty');
  const priceInput = rowDiv.querySelector('.row-price');
  const deleteBtn = rowDiv.querySelector('.row-delete-btn');
  const nameInput = rowDiv.querySelector('.row-name');
  const compInput = rowDiv.querySelector('.row-company');
  const catSelect = rowDiv.querySelector('.row-category');
  const unitSelect = rowDiv.querySelector('.row-unit');
  const nameDrop = rowDiv.querySelectorAll('.autocomplete-dropdown')[0];
  const compDrop = rowDiv.querySelectorAll('.autocomplete-dropdown')[1];

  nameDrop.classList.add('invoice-product-dropdown');
  document.body.appendChild(nameDrop);

  const positionProductDropdown = () => {
    const inputRect = nameInput.getBoundingClientRect();
    nameDrop.style.left = `${inputRect.left}px`;
    nameDrop.style.top = `${inputRect.bottom}px`;
    nameDrop.style.width = `${inputRect.width}px`;
  };

  const updateInvoiceSummary = () => {
    let totalCount = 0;
    let grandTotal = 0;
    document.querySelectorAll('.invoice-item-row:not(.return-item-row)').forEach(r => {
      const q = parseFloat(r.querySelector('.row-qty').value) || 0;
      const pr = parseFloat(r.querySelector('.row-price').value) || 0;
      if (q > 0) totalCount++;
      grandTotal += q * pr;
    });
    if (previewInvoiceCount) previewInvoiceCount.textContent = totalCount;
    if (previewInvoiceTotal) previewInvoiceTotal.textContent = `₹${Math.round(grandTotal).toLocaleString()}`;
  };

  qtyInput.addEventListener('input', updateInvoiceSummary);
  priceInput.addEventListener('input', updateInvoiceSummary);

  const applyProductDetailsFromMemory = (prodName, explicitItem = null) => {
    if (!prodName) return;
    const mem = getProductMemory(prodName);
    const item = explicitItem || mem || masterCatalogue.find(m => m.name.toLowerCase() === prodName.toLowerCase());

    const rememberedCompany = (mem && mem.company) ? mem.company : (item && item.company ? item.company : 'Local');
    compInput.value = rememberedCompany;

    if (item && item.category) catSelect.value = item.category;
    if (item && item.unit) unitSelect.value = item.unit;

    let lastPrice = (mem && mem.lastPrice > 0) ? mem.lastPrice : (item && item.unitPrice ? item.unitPrice : 0);
    if (lastPrice > 0) {
      priceInput.value = lastPrice;
    }

    updateInvoiceSummary();
  };

  bindKeyboardNavigation(nameInput, nameDrop, compInput);

  nameInput.addEventListener('focus', positionProductDropdown);

  nameInput.addEventListener('input', () => {
    positionProductDropdown();
    const q = nameInput.value.trim().toLowerCase();
    if (!q) { nameDrop.hidden = true; return; }

    const allItems = [...masterCatalogue, ...purchases];
    const seen = new Set();
    const uniqueItems = [];
    for (const item of allItems) {
      const key = item.name.toLowerCase();
      if (!seen.has(key)) { seen.add(key); uniqueItems.push(item); }
    }

    const matches = uniqueItems.filter(item => item.name.toLowerCase().includes(q) || (item.company && item.company.toLowerCase().includes(q))).slice(0, 8);
    if (matches.length === 0) { nameDrop.hidden = true; return; }

    nameDrop.innerHTML = matches.map(m => {
      const mem = getProductMemory(m.name);
      const dispComp = (mem && mem.company) ? mem.company : (m.company || 'Local');
      const dispPrice = (mem && mem.lastPrice > 0) ? mem.lastPrice : (m.unitPrice || 0);
      return `
        <div class="autocomplete-item" data-json='${JSON.stringify(m).replace(/'/g, "&apos;")}'>
          <div>
            <div class="autocomplete-title">${escapeHtml(m.name)}</div>
            <div class="autocomplete-sub">${escapeHtml(dispComp)} • Last Rate: ₹${dispPrice}</div>
          </div>
        </div>
      `;
    }).join('');
    nameDrop.hidden = false;

    nameDrop.querySelectorAll('.autocomplete-item').forEach(el => {
      el.addEventListener('click', () => {
        const raw = el.getAttribute('data-json');
        if (!raw) return;
        const sel = JSON.parse(raw);
        nameInput.value = sel.name;
        applyProductDetailsFromMemory(sel.name, sel);
        nameDrop.hidden = true;

        setTimeout(() => {
          compInput.focus();
          compInput.select();
        }, 30);
      });
    });
  });

  nameInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (nameInput.value.trim()) {
        applyProductDetailsFromMemory(nameInput.value.trim());
      }
    }, 180);
  });

  bindKeyboardNavigation(compInput, compDrop, qtyInput);

  compInput.addEventListener('input', () => {
    const q = compInput.value.trim().toLowerCase();
    if (!q) { compDrop.hidden = true; return; }
    const allCompanies = [...new Set([...masterCatalogue.map(b => b.company), ...purchases.map(p => p.company), ...Object.values(productMemory).map(m => m.company)].filter(Boolean))];
    const matches = allCompanies.filter(c => c.toLowerCase().includes(q)).slice(0, 6);

    if (matches.length === 0) { compDrop.hidden = true; return; }

    compDrop.innerHTML = matches.map(c => `
      <div class="autocomplete-item" data-val="${escapeHtml(c)}">
        <span class="autocomplete-title">${escapeHtml(c)}</span>
      </div>
    `).join('');
    compDrop.hidden = false;

    compDrop.querySelectorAll('.autocomplete-item').forEach(el => {
      el.addEventListener('click', () => {
        compInput.value = el.getAttribute('data-val');
        compDrop.hidden = true;
        qtyInput.focus();
        qtyInput.select();
      });
    });
  });

  compInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      compDrop.hidden = true;
      qtyInput.focus();
      qtyInput.select();
    }
  });

  qtyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      priceInput.focus();
      priceInput.select();
    }
  });

  priceInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateInvoiceSummary();
      const pName = nameInput.value.trim();
      const pPrice = parseFloat(priceInput.value) || 0;
      const cName = compInput.value.trim() || 'Local';
      if (pName) {
        saveProductMemoryEntry(pName, cName, pPrice, catSelect.value, unitSelect.value);
      }
      const form = rowDiv.closest('form');
      if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      }
    }
  });

  deleteBtn.addEventListener('click', () => {
    if (document.querySelectorAll('.invoice-item-row:not(.return-item-row)').length <= 1) {
      alert('An invoice must contain at least one item row.');
      return;
    }
    nameDrop.remove();
    rowDiv.remove();
    updateInvoiceSummary();
  });

  updateInvoiceSummary();

  if (autoFocus) {
    setTimeout(() => {
      rowDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      catSelect.focus();
    }, 40);
  }

  return rowDiv;
}

// Stock Return Row Manager (Under Treatment) — STRICTLY MANUAL ROW ADDITION ONLY
function addReturnItemRow(data = {}, autoFocus = false) {
  if (!returnItemRowsContainer) return;
  const rowId = `ret_row_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

  const rowDiv = document.createElement('div');
  rowDiv.className = 'return-item-row invoice-item-row';
  rowDiv.setAttribute('data-row-id', rowId);

  rowDiv.innerHTML = `
    <div class="form-group" style="margin:0;">
      <label>Category *</label>
      <select class="row-category">
        <option value="Fertilizer" ${data.category === 'Fertilizer' ? 'selected' : ''}>Fertilizer</option>
        <option value="Medicine" ${data.category === 'Medicine' ? 'selected' : ''}>Medicine</option>
        <option value="Feed" ${data.category === 'Feed' ? 'selected' : ''}>Feed</option>
      </select>
    </div>
    <div class="form-group autocomplete-container" style="margin:0;">
      <label>Product Name *</label>
      <input type="text" class="row-name" placeholder="Product to return..." autocomplete="off" value="${escapeHtml(data.name || '')}">
      <div class="autocomplete-dropdown" hidden></div>
    </div>
    <div class="form-group autocomplete-container" style="margin:0;">
      <label>Company / Brand *</label>
      <input type="text" class="row-company" placeholder="Brand..." autocomplete="off" value="${escapeHtml(data.company || '')}">
      <div class="autocomplete-dropdown" hidden></div>
    </div>
    <div class="form-group" style="margin:0;">
      <label>Returned Qty *</label>
      <input type="number" class="row-qty" step="any" placeholder="Qty" value="${data.qty !== undefined ? data.qty : ''}">
    </div>
    <div class="form-group" style="margin:0;">
      <label>Unit *</label>
      <select class="row-unit">
        <option value="Bag/Pkt" ${data.unit === 'Bag/Pkt' ? 'selected' : ''}>Bag/Pkt</option>
        <option value="Kg" ${data.unit === 'Kg' ? 'selected' : ''}>Kg</option>
        <option value="Ltr" ${data.unit === 'Ltr' ? 'selected' : ''}>Ltr</option>
        <option value="gms" ${data.unit === 'gms' ? 'selected' : ''}>gms</option>
        <option value="ml" ${data.unit === 'ml' ? 'selected' : ''}>ml</option>
      </select>
    </div>
    <div class="form-group" style="margin:0;">
      <label>Unit Rate (₹) *</label>
      <input type="number" class="row-price" step="any" placeholder="Rate" value="${data.unitPrice !== undefined ? data.unitPrice : ''}">
    </div>
    <div>
      <button type="button" class="row-delete-btn" title="Remove Item">🗑️</button>
    </div>
  `;

  returnItemRowsContainer.appendChild(rowDiv);

  const qtyInput = rowDiv.querySelector('.row-qty');
  const priceInput = rowDiv.querySelector('.row-price');
  const deleteBtn = rowDiv.querySelector('.row-delete-btn');
  const nameInput = rowDiv.querySelector('.row-name');
  const compInput = rowDiv.querySelector('.row-company');
  const catSelect = rowDiv.querySelector('.row-category');
  const unitSelect = rowDiv.querySelector('.row-unit');
  const nameDrop = rowDiv.querySelectorAll('.autocomplete-dropdown')[0];
  const compDrop = rowDiv.querySelectorAll('.autocomplete-dropdown')[1];

  nameDrop.classList.add('invoice-product-dropdown');
  document.body.appendChild(nameDrop);

  const positionProductDropdown = () => {
    const inputRect = nameInput.getBoundingClientRect();
    nameDrop.style.left = `${inputRect.left}px`;
    nameDrop.style.top = `${inputRect.bottom}px`;
    nameDrop.style.width = `${inputRect.width}px`;
  };

  const updateReturnSummary = () => {
    let totalCount = 0;
    let grandTotal = 0;
    document.querySelectorAll('.return-item-row').forEach(r => {
      const q = parseFloat(r.querySelector('.row-qty').value) || 0;
      const pr = parseFloat(r.querySelector('.row-price').value) || 0;
      if (q > 0) totalCount++;
      grandTotal += q * pr;
    });
    if (previewReturnCount) previewReturnCount.textContent = totalCount;
    if (previewReturnTotal) previewReturnTotal.textContent = `₹${Math.round(grandTotal).toLocaleString()}`;
  };

  qtyInput.addEventListener('input', updateReturnSummary);
  priceInput.addEventListener('input', updateReturnSummary);

  const applyReturnDetails = (prodName, explicitItem = null) => {
    if (!prodName) return;
    const mem = getProductMemory(prodName);
    const item = explicitItem || mem || masterCatalogue.find(m => m.name.toLowerCase() === prodName.toLowerCase());

    const rememberedCompany = (mem && mem.company) ? mem.company : (item && item.company ? item.company : 'Local');
    compInput.value = rememberedCompany;

    if (item && item.category) catSelect.value = item.category;
    if (item && item.unit) unitSelect.value = item.unit;

    let lastPrice = (mem && mem.lastPrice > 0) ? mem.lastPrice : (item && item.unitPrice ? item.unitPrice : 0);
    if (lastPrice > 0) priceInput.value = lastPrice;

    updateReturnSummary();
  };

  bindKeyboardNavigation(nameInput, nameDrop, compInput);

  nameInput.addEventListener('focus', positionProductDropdown);

  nameInput.addEventListener('input', () => {
    positionProductDropdown();
    const q = nameInput.value.trim().toLowerCase();
    if (!q) { nameDrop.hidden = true; return; }

    const allItems = [...masterCatalogue, ...purchases];
    const seen = new Set();
    const uniqueItems = [];
    for (const item of allItems) {
      const key = item.name.toLowerCase();
      if (!seen.has(key)) { seen.add(key); uniqueItems.push(item); }
    }

    const matches = uniqueItems.filter(item => item.name.toLowerCase().includes(q) || (item.company && item.company.toLowerCase().includes(q))).slice(0, 8);
    if (matches.length === 0) { nameDrop.hidden = true; return; }

    nameDrop.innerHTML = matches.map(m => {
      const mem = getProductMemory(m.name);
      const dispComp = (mem && mem.company) ? mem.company : (m.company || 'Local');
      const dispPrice = (mem && mem.lastPrice > 0) ? mem.lastPrice : (m.unitPrice || 0);
      return `
        <div class="autocomplete-item" data-json='${JSON.stringify(m).replace(/'/g, "&apos;")}'>
          <div>
            <div class="autocomplete-title">${escapeHtml(m.name)}</div>
            <div class="autocomplete-sub">${escapeHtml(dispComp)} • Rate: ₹${dispPrice}</div>
          </div>
        </div>
      `;
    }).join('');
    nameDrop.hidden = false;

    nameDrop.querySelectorAll('.autocomplete-item').forEach(el => {
      el.addEventListener('click', () => {
        const raw = el.getAttribute('data-json');
        if (!raw) return;
        const sel = JSON.parse(raw);
        nameInput.value = sel.name;
        applyReturnDetails(sel.name, sel);
        nameDrop.hidden = true;

        setTimeout(() => {
          compInput.focus();
          compInput.select();
        }, 30);
      });
    });
  });

  nameInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (nameInput.value.trim()) applyReturnDetails(nameInput.value.trim());
    }, 180);
  });

  bindKeyboardNavigation(compInput, compDrop, qtyInput);

  compInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      qtyInput.focus();
      qtyInput.select();
    }
  });

  qtyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      priceInput.focus();
      priceInput.select();
    }
  });

  priceInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateReturnSummary();
      const pName = nameInput.value.trim();
      const pPrice = parseFloat(priceInput.value) || 0;
      const cName = compInput.value.trim() || 'Local';
      if (pName) {
        saveProductMemoryEntry(pName, cName, pPrice, catSelect.value, unitSelect.value);
      }
      const form = rowDiv.closest('form');
      if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      }
    }
  });

  deleteBtn.addEventListener('click', () => {
    if (document.querySelectorAll('.return-item-row').length <= 1) {
      alert('A stock return must contain at least one item row.');
      return;
    }
    nameDrop.remove();
    rowDiv.remove();
    updateReturnSummary();
  });

  updateReturnSummary();

  if (autoFocus) {
    setTimeout(() => {
      rowDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      catSelect.focus();
    }, 40);
  }

  return rowDiv;
}

function getProductInventorySummary() {
  const inventoryMap = {};

  if (!masterCatalogue || masterCatalogue.length === 0) {
    masterCatalogue = [...DEFAULT_MASTER_CATALOGUE];
  }

  masterCatalogue.forEach(b => {
    const key = b.name.trim().toLowerCase();
    inventoryMap[key] = {
      name: b.name.trim(),
      company: b.company.trim(),
      supplier: '',
      category: b.category,
      unit: b.unit || 'Bag/Pkt',
      totalPurchasedQty: 0,
      totalPurchasedValue: 0,
      totalUsedQty: 0,
      totalReturnedQty: 0,
      latestUnitPrice: b.unitPrice
    };
  });

  purchases.forEach(p => {
    const key = (p.name || '').trim().toLowerCase();
    if (!key) return;
    if (!inventoryMap[key]) {
      inventoryMap[key] = {
        name: p.name.trim(),
        company: (p.company || 'Local').trim(),
        supplier: p.supplier ? p.supplier.trim() : '',
        category: p.category || 'Fertilizer',
        unit: p.unit || 'Bag/Pkt',
        totalPurchasedQty: 0,
        totalPurchasedValue: 0,
        totalUsedQty: 0,
        totalReturnedQty: 0,
        latestUnitPrice: p.unitPrice || 0
      };
    }
    inventoryMap[key].totalPurchasedQty += (p.qty || 0);
    inventoryMap[key].totalPurchasedValue += (p.totalAmount || (p.qty * p.unitPrice) || 0);
    if (p.unitPrice) inventoryMap[key].latestUnitPrice = p.unitPrice;
    if (p.company) inventoryMap[key].company = p.company;
    if (p.supplier) inventoryMap[key].supplier = p.supplier;
    if (p.unit) inventoryMap[key].unit = p.unit;
  });

  treatments.forEach(t => {
    const key = (t.productName || '').trim().toLowerCase();
    if (inventoryMap[key]) {
      const u = (t.unit || 'Bag/Pkt').toLowerCase();
      const baseQty = (u === 'gms' || u === 'gm' || u === 'g' || u === 'ml') ? (t.qty / 1000) : t.qty;
      inventoryMap[key].totalUsedQty += (baseQty || 0);
    }
  });

  stockReturns.forEach(r => {
    const key = (r.name || '').trim().toLowerCase();
    if (inventoryMap[key]) {
      const u = (r.unit || 'Bag/Pkt').toLowerCase();
      const baseQty = (u === 'gms' || u === 'gm' || u === 'g' || u === 'ml') ? (r.qty / 1000) : r.qty;
      inventoryMap[key].totalReturnedQty += (baseQty || 0);
    }
  });

  return Object.values(inventoryMap).map(item => {
    const balanceStock = item.totalPurchasedQty - item.totalUsedQty - item.totalReturnedQty;
    const usedValue = item.totalUsedQty * item.latestUnitPrice;
    const stockValue = Math.max(0, balanceStock) * item.latestUnitPrice;

    return {
      ...item,
      balanceStock,
      usedValue,
      stockValue
    };
  });
}

function updateTreatmentCalculations() {
  const selectedProdName = treatmentProductNameInput ? treatmentProductNameInput.value.trim() : '';
  const inventoryList = getProductInventorySummary();
  const prod = inventoryList.find(p => p.name.trim().toLowerCase() === selectedProdName.toLowerCase());
  const qty = parseFloat(treatmentQtyInput ? treatmentQtyInput.value : 0) || 0;
  const unit = treatmentUnitSelect ? treatmentUnitSelect.value : 'Bag/Pkt';

  if (prod) {
    const u = unit.toLowerCase();
    const baseQty = (u === 'gms' || u === 'gm' || u === 'g' || u === 'ml') ? (qty / 1000) : qty;

    if (previewTreatmentRate) {
      previewTreatmentRate.textContent = `₹${prod.latestUnitPrice.toFixed(2)} / ${prod.unit}`;
    }

    if (previewTreatmentAvailableStock) {
      const stock = prod.balanceStock;
      if (u === 'gms' || u === 'gm' || u === 'g') {
        previewTreatmentAvailableStock.textContent = `${(stock * 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} gms (${stock.toFixed(2)} ${prod.unit})`;
      } else if (u === 'ml') {
        previewTreatmentAvailableStock.textContent = `${(stock * 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} ml (${stock.toFixed(2)} ${prod.unit})`;
      } else {
        previewTreatmentAvailableStock.textContent = `${stock.toFixed(2)} ${prod.unit}`;
      }

      if (stock < baseQty) {
        previewTreatmentAvailableStock.style.color = 'var(--brand-red)';
      } else {
        previewTreatmentAvailableStock.style.color = '#064e3b';
      }
    }

    const total = baseQty * prod.latestUnitPrice;
    if (previewTreatmentCost) {
      previewTreatmentCost.textContent = `₹${Math.round(total).toLocaleString()}`;
    }
  } else {
    if (previewTreatmentRate) previewTreatmentRate.textContent = '—';
    if (previewTreatmentAvailableStock) {
      previewTreatmentAvailableStock.textContent = '—';
      previewTreatmentAvailableStock.style.color = 'var(--text-main)';
    }
    if (previewTreatmentCost) previewTreatmentCost.textContent = '₹0';
  }
}

function setupSupplierAutocomplete() {
  const bindSupplier = (inputEl, dropdownEl, getNextField) => {
    if (!inputEl || !dropdownEl) return;
    bindKeyboardNavigation(inputEl, dropdownEl, getNextField);

    inputEl.addEventListener('input', () => {
      const q = inputEl.value.trim().toLowerCase();
      if (!q) { dropdownEl.hidden = true; return; }
      const allSuppliers = [...new Set([...purchases.map(p => p.supplier), ...stockReturns.map(r => r.supplier), ...vendorTransactions.map(v => v.vendor)].filter(Boolean))];
      const matches = allSuppliers.filter(s => s.toLowerCase().includes(q)).slice(0, 6);

      if (matches.length === 0) { dropdownEl.hidden = true; return; }

      dropdownEl.innerHTML = matches.map(s => `
        <div class="autocomplete-item" data-val="${escapeHtml(s)}">
          <span class="autocomplete-title">${escapeHtml(s)}</span>
        </div>
      `).join('');
      dropdownEl.hidden = false;

      dropdownEl.querySelectorAll('.autocomplete-item').forEach(el => {
        el.addEventListener('click', () => {
          inputEl.value = el.getAttribute('data-val');
          dropdownEl.hidden = true;
          const nextEl = typeof getNextField === 'function' ? getNextField() : getNextField;
          if (nextEl) nextEl.focus();
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdownEl.contains(e.target) && e.target !== inputEl) {
        dropdownEl.hidden = true;
      }
    });
  };

  bindSupplier(prodSupplierInput, prodSupplierSuggestions, () => invoiceItemRowsContainer?.querySelector('.row-category'));
  bindSupplier(returnSupplierInput, returnSupplierSuggestions, () => returnItemRowsContainer?.querySelector('.row-category'));

  if (treatmentProductNameInput && treatmentProductSuggestions) {
    bindKeyboardNavigation(treatmentProductNameInput, treatmentProductSuggestions, treatmentTimingSelect);

    const handleTreatmentSearch = () => {
      const q = treatmentProductNameInput.value.trim().toLowerCase();
      const selectedCat = treatmentCategoryFilter ? treatmentCategoryFilter.value : 'ALL';
      const inventoryList = getProductInventorySummary();

      let filtered = inventoryList;
      if (selectedCat !== 'ALL') {
        filtered = filtered.filter(p => p.category === selectedCat);
      }

      if (q) {
        filtered = filtered.filter(item => {
          return item.name.toLowerCase().includes(q) || item.company.toLowerCase().includes(q);
        });
      }

      const matches = filtered.slice(0, 10);

      if (matches.length === 0) {
        treatmentProductSuggestions.innerHTML = `<div class="autocomplete-item no-select"><span class="autocomplete-sub">No matching products found</span></div>`;
        treatmentProductSuggestions.hidden = false;
        return;
      }

      treatmentProductSuggestions.innerHTML = matches.map(m => `
        <div class="autocomplete-item" data-json='${JSON.stringify(m).replace(/'/g, "&apos;")}'>
          <div>
            <div class="autocomplete-title">${escapeHtml(m.name)}</div>
            <div class="autocomplete-sub">${escapeHtml(m.company || 'Local')} • Stock: <strong>${m.balanceStock.toFixed(2)} ${m.unit}</strong></div>
          </div>
          <span class="badge-paid">₹${m.latestUnitPrice.toFixed(0)}/${m.unit}</span>
        </div>
      `).join('');

      treatmentProductSuggestions.hidden = false;

      treatmentProductSuggestions.querySelectorAll('.autocomplete-item:not(.no-select)').forEach(el => {
        el.addEventListener('click', () => {
          const raw = el.getAttribute('data-json');
          if (!raw) return;
          const selected = JSON.parse(raw);
          treatmentProductNameInput.value = selected.name;
          if (treatmentCategoryFilter) treatmentCategoryFilter.value = selected.category;
          
          if (treatmentUnitSelect) {
            if (selected.unit === 'Bag/Pkt') {
              treatmentUnitSelect.value = 'Bag/Pkt';
            } else if (selected.unit === 'Ltr') {
              treatmentUnitSelect.value = 'Ltr';
            } else if (selected.name.toLowerCase().includes('500gm') || selected.name.toLowerCase().includes('gm')) {
              treatmentUnitSelect.value = 'gms';
            } else {
              treatmentUnitSelect.value = 'Kg';
            }
          }

          updateTreatmentCalculations();
          treatmentProductSuggestions.hidden = true;
          if (treatmentTimingSelect) treatmentTimingSelect.focus();
        });
      });
    };

    treatmentProductNameInput.addEventListener('input', handleTreatmentSearch);
    treatmentProductNameInput.addEventListener('focus', handleTreatmentSearch);
  }
}

function promptDeleteCatalogueProduct(prodName) {
  if (!confirm(`Are you sure you want to completely remove "${prodName}" from the catalogue and live inventory?`)) return;

  masterCatalogue = masterCatalogue.filter(item => item.name.toLowerCase() !== prodName.toLowerCase());
  purchases = purchases.filter(p => p.name.toLowerCase() !== prodName.toLowerCase());
  stockReturns = stockReturns.filter(r => r.name.toLowerCase() !== prodName.toLowerCase());

  saveStorage();
  renderAll();
  alert(`"${prodName}" has been removed from your catalogue.`);
}

function editCatalogueProduct(oldName) {
  const inventoryList = getProductInventorySummary();
  const prod = inventoryList.find(p => p.name.toLowerCase() === oldName.toLowerCase());
  if (!prod) return;

  const newName = prompt(`Edit Product Name for "${prod.name}":`, prod.name);
  if (!newName || newName.trim() === '') return;
  const cleanNewName = newName.trim();

  const newPriceStr = prompt(`Edit standard Unit Price (₹/${prod.unit}) for "${cleanNewName}":`, prod.latestUnitPrice);
  const newPrice = parseFloat(newPriceStr) || prod.latestUnitPrice;

  const catIdx = masterCatalogue.findIndex(m => m.name.toLowerCase() === oldName.toLowerCase());
  if (catIdx >= 0) {
    masterCatalogue[catIdx].name = cleanNewName;
    masterCatalogue[catIdx].unitPrice = newPrice;
  } else {
    masterCatalogue.push({
      name: cleanNewName,
      company: prod.company,
      category: prod.category,
      unit: prod.unit,
      unitPrice: newPrice
    });
  }

  purchases.forEach(p => {
    if (p.name.toLowerCase() === oldName.toLowerCase()) {
      p.name = cleanNewName;
      p.unitPrice = newPrice;
      p.totalAmount = p.qty * newPrice;
    }
  });

  stockReturns.forEach(r => {
    if (r.name.toLowerCase() === oldName.toLowerCase()) {
      r.name = cleanNewName;
      r.unitPrice = newPrice;
      r.totalAmount = r.qty * newPrice;
    }
  });

  treatments.forEach(t => {
    if ((t.productName || '').toLowerCase() === oldName.toLowerCase()) {
      t.productName = cleanNewName;
      t.unitPrice = newPrice;
      t.totalCost = t.baseQty * newPrice;
    }
  });

  saveStorage();
  renderAll();
  alert(`Product updated to "${cleanNewName}"!`);
}

function resetPurchaseForm() {
  if (purchaseIdInput) purchaseIdInput.value = '';
  if (purchaseForm) purchaseForm.reset();
  if (purchaseDateInput) purchaseDateInput.value = new Date().toISOString().split('T')[0];
  if (purchaseCropSelect) purchaseCropSelect.value = 'Crop 1';
  if (cancelPurchaseEditBtn) cancelPurchaseEditBtn.hidden = true;
  if (purchaseSaveLabel) purchaseSaveLabel.textContent = 'Log Multi-Item Purchase Invoice';
  if (invoiceItemRowsContainer) {
    document.querySelectorAll('body > .invoice-product-dropdown').forEach(dropdown => dropdown.remove());
    invoiceItemRowsContainer.innerHTML = '';
    addInvoiceItemRow({}, false);
  }
  if (previewInvoiceCount) previewInvoiceCount.textContent = '0';
  if (previewInvoiceTotal) previewInvoiceTotal.textContent = '₹0';
}

function editPurchase(id) {
  const p = purchases.find(item => item.id === id);
  if (!p) return;

  purchaseIdInput.value = p.id;
  if (purchaseDateInput) purchaseDateInput.value = p.date || new Date().toISOString().split('T')[0];
  if (purchaseCropSelect) purchaseCropSelect.value = p.crop || 'Crop 1';
  if (invoiceNoInput) invoiceNoInput.value = p.invoiceNo || '';
  if (prodSupplierInput) prodSupplierInput.value = p.supplier || '';

  if (invoiceItemRowsContainer) {
    document.querySelectorAll('body > .invoice-product-dropdown').forEach(dropdown => dropdown.remove());
    invoiceItemRowsContainer.innerHTML = '';
    addInvoiceItemRow({
      category: p.category,
      name: p.name,
      company: p.company,
      qty: p.qty,
      unit: p.unit,
      unitPrice: p.unitPrice
    }, false);
  }

  if (cancelPurchaseEditBtn) cancelPurchaseEditBtn.hidden = false;
  if (purchaseSaveLabel) purchaseSaveLabel.textContent = 'Edit Purchase Record';
  navigateTo('catalogue');
}

function promptDeletePurchase(id) {
  deleteTargetId = id;
  deleteTargetType = 'purchase';
  dialogTitle.textContent = 'Delete purchase record?';
  dialogText.textContent = 'Deleting this purchase will deduct this stock from your live inventory.';
  confirmDialog.showModal();
}

function resetStockReturnForm() {
  if (returnIdInput) returnIdInput.value = '';
  if (stockReturnForm) stockReturnForm.reset();
  if (returnDateInput) returnDateInput.value = new Date().toISOString().split('T')[0];
  if (returnCropSelect) returnCropSelect.value = 'Crop 1';
  if (cancelReturnEditBtn) cancelReturnEditBtn.hidden = true;
  if (stockReturnSaveLabel) stockReturnSaveLabel.textContent = 'Log Stock Return to Vendor';
  if (returnItemRowsContainer) {
    document.querySelectorAll('body > .invoice-product-dropdown').forEach(dropdown => dropdown.remove());
    returnItemRowsContainer.innerHTML = '';
    addReturnItemRow({}, false);
  }
  if (previewReturnCount) previewReturnCount.textContent = '0';
  if (previewReturnTotal) previewReturnTotal.textContent = '₹0';
}

function editStockReturn(id) {
  const r = stockReturns.find(item => item.id === id);
  if (!r) return;

  returnIdInput.value = r.id;
  if (returnDateInput) returnDateInput.value = r.date || new Date().toISOString().split('T')[0];
  if (returnCropSelect) returnCropSelect.value = r.crop || 'Crop 1';
  if (returnInvoiceNoInput) returnInvoiceNoInput.value = r.invoiceNo || '';
  if (returnSupplierInput) returnSupplierInput.value = r.supplier || '';

  if (returnItemRowsContainer) {
    document.querySelectorAll('body > .invoice-product-dropdown').forEach(dropdown => dropdown.remove());
    returnItemRowsContainer.innerHTML = '';
    addReturnItemRow({
      category: r.category,
      name: r.name,
      company: r.company,
      qty: r.qty,
      unit: r.unit,
      unitPrice: r.unitPrice
    }, false);
  }

  if (cancelReturnEditBtn) cancelReturnEditBtn.hidden = false;
  if (stockReturnSaveLabel) stockReturnSaveLabel.textContent = 'Edit Stock Return Record';
  navigateTo('stockReturn');
}

function promptDeleteStockReturn(id) {
  deleteTargetId = id;
  deleteTargetType = 'stockReturn';
  dialogTitle.textContent = 'Delete stock return record?';
  dialogText.textContent = 'Deleting this return will add this quantity back into your live inventory stock.';
  confirmDialog.showModal();
}

function getAllVendorsList() {
  const vendorsSet = new Set();
  purchases.forEach(p => { if (p.supplier) vendorsSet.add(p.supplier.trim()); });
  stockReturns.forEach(r => { if (r.supplier) vendorsSet.add(r.supplier.trim()); });
  vendorTransactions.forEach(v => { if (v.vendor) vendorsSet.add(v.vendor.trim()); });
  return Array.from(vendorsSet).sort();
}

function populateStatementVendorsDropdown() {
  if (!statementVendorSelect) return;
  const vendors = getAllVendorsList();
  const currentVal = statementVendorSelect.value;

  if (vendors.length === 0) {
    statementVendorSelect.innerHTML = '<option value="">No Vendors Found</option>';
    return;
  }

  statementVendorSelect.innerHTML = vendors.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('');
  if (currentVal && vendors.includes(currentVal)) {
    statementVendorSelect.value = currentVal;
  } else {
    statementVendorSelect.value = vendors[0];
  }
}

function openVendorStatement(targetVendor = null, paymentOnly = false) {
  vendorPaymentOnlyMode = paymentOnly;
  populateStatementVendorsDropdown();
  if (targetVendor && statementVendorSelect) {
    statementVendorSelect.value = targetVendor;
  }
  if (quickAddPaymentBox) {
    quickAddPaymentBox.hidden = !paymentOnly;
    const tableContainer = statementTableBody?.closest('.statement-table-container');
    if (paymentOnly && tableContainer) {
      tableContainer.parentNode.insertBefore(quickAddPaymentBox, tableContainer);
    } else if (!paymentOnly) {
      document.getElementById('statementPrintWrapper')?.appendChild(quickAddPaymentBox);
    }
  }
  renderVendorStatement();
  if (vendorStatementDialog) {
    vendorStatementDialog.showModal();
  }
}

function renderVendorStatement() {
  if (!statementVendorSelect || !statementTableBody) return;
  const statementWrapper = document.getElementById('statementPrintWrapper');
  if (statementWrapper) statementWrapper.classList.toggle('payment-only-view', vendorPaymentOnlyMode);
  const vendorName = statementVendorSelect.value.trim();
  const selectedCrop = statementCropFilter ? statementCropFilter.value : 'ALL';

  if (!vendorName) {
    statementAccountTitle.textContent = 'VENDOR ACCOUNT';
    statementTableBody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:2rem;">No Vendor Selected</td></tr>';
    return;
  }

  statementAccountTitle.textContent = `${vendorName.toUpperCase()} ACCOUNT`;

  const vendorPurchases = purchases.filter(p => (p.supplier || '').trim().toLowerCase() === vendorName.toLowerCase());
  const billGroups = {};
  vendorPurchases.forEach(p => {
    const crop = p.crop || 'Crop 1';
    const key = `${p.date}__${p.invoiceNo || 'DIRECT'}__${crop}`;
    if (!billGroups[key]) {
      billGroups[key] = {
        type: 'Debit',
        crop: crop,
        date: p.date,
        billNo: p.invoiceNo || '—',
        amount: 0,
        remarks: []
      };
    }
    const tot = (p.totalAmount !== undefined && p.totalAmount !== null) ? parseFloat(p.totalAmount) : ((parseFloat(p.qty) || 0) * (parseFloat(p.unitPrice) || 0));
    billGroups[key].amount += tot;
    billGroups[key].remarks.push(`${p.category || 'Item'}: ${p.name}`);
  });

  const billEntries = Object.values(billGroups).map(b => ({
    ...b,
    remarks: b.remarks.slice(0, 2).join(', ') + (b.remarks.length > 2 ? ` (+${b.remarks.length - 2} more)` : '')
  }));

  const vendorStockReturns = stockReturns.filter(r => (r.supplier || '').trim().toLowerCase() === vendorName.toLowerCase());
  const returnGroups = {};
  vendorStockReturns.forEach(r => {
    const crop = r.crop || 'Crop 1';
    const key = `${r.date}__${r.invoiceNo || 'RET'}__${crop}`;
    if (!returnGroups[key]) {
      returnGroups[key] = {
        type: 'Credit',
        crop: crop,
        date: r.date,
        billNo: r.invoiceNo || '—',
        amount: 0,
        remarks: []
      };
    }
    const tot = (r.totalAmount !== undefined && r.totalAmount !== null) ? parseFloat(r.totalAmount) : ((parseFloat(r.qty) || 0) * (parseFloat(r.unitPrice) || 0));
    returnGroups[key].amount += tot;
    returnGroups[key].remarks.push(`Feed Return: ${r.name}`);
  });

  const returnEntries = Object.values(returnGroups).map(r => ({
    ...r,
    remarks: r.remarks.slice(0, 2).join(', ') + (r.remarks.length > 2 ? ` (+${r.remarks.length - 2} more)` : '')
  }));

  const directTxns = vendorTransactions.filter(v => (v.vendor || '').trim().toLowerCase() === vendorName.toLowerCase());

  let allLedgerRows = [
    ...billEntries,
    ...returnEntries,
    ...directTxns.map(t => ({
      id: t.id,
      type: t.type || 'Credit',
      crop: t.crop || 'Crop 1',
      date: t.date,
      billNo: t.billNo || '',
      amount: parseFloat(t.amount) || 0,
      remarks: `${t.remarks || 'Advance / Payment'}${t.account ? ` • Account: ${t.account}` : ''}`,
      account: t.account || '',
      isManual: true
    }))
  ];

  allLedgerRows.sort((a, b) => new Date(a.date) - new Date(b.date));

  let crop1Debits = 0;
  let crop2Debits = 0;
  let crop1Credits = 0;
  let crop2Credits = 0;
  let totalDebits = 0;
  let totalCredits = 0;

  allLedgerRows.forEach(r => {
    const isDebit = r.type === 'Debit';
    const amt = r.amount || 0;
    if (isDebit) {
      totalDebits += amt;
      if (r.crop === 'Crop 2') crop2Debits += amt;
      else crop1Debits += amt;
    } else {
      totalCredits += amt;
      if (r.crop === 'Crop 2') crop2Credits += amt;
      else crop1Credits += amt;
    }
  });

  const crop1NetBalance = crop1Debits - crop1Credits;
  const crop2NetBalance = crop2Debits - crop2Credits;
  const netClosingBalance = totalDebits - totalCredits;

  const formatBalance = (val) => {
    if (val < 0) return `(${Math.abs(Math.round(val)).toLocaleString()})`;
    return `₹${Math.round(val).toLocaleString()}`;
  };

  stmtCrop1Purchases.textContent = `₹${Math.round(crop1Debits).toLocaleString()}`;
  stmtCrop2Purchases.textContent = `₹${Math.round(crop2Debits).toLocaleString()}`;
  stmtCrop1Balance.textContent = formatBalance(crop1NetBalance);
  stmtCrop2Balance.textContent = formatBalance(crop2NetBalance);
  stmtTotalDebit.textContent = `₹${Math.round(totalDebits).toLocaleString()}`;
  stmtTotalCredit.textContent = `₹${Math.round(totalCredits).toLocaleString()}`;
  stmtClosingBalance.textContent = formatBalance(netClosingBalance);

  let displayRows = vendorPaymentOnlyMode
    ? allLedgerRows.filter(row => row.type !== 'Debit')
    : allLedgerRows;
  if (selectedCrop !== 'ALL') {
    displayRows = displayRows.filter(r => r.crop === selectedCrop);
  }
  const selectedType = statementTypeFilter ? statementTypeFilter.value : 'ALL';
  if (selectedType !== 'ALL') {
    displayRows = displayRows.filter(r => r.type === selectedType);
  }

  let runningBalance = 0;
  let srCounter = 1;

  const rowsWithBalance = displayRows.map(row => {
    const isDebit = row.type === 'Debit';
    const debitVal = isDebit ? row.amount : 0;
    const creditVal = !isDebit ? row.amount : 0;

    runningBalance = runningBalance + debitVal - creditVal;
    return { row, debitVal, creditVal, runningBalance };
  });
  const rowQuery = (statementRowSearch?.value || '').trim().toLowerCase();
  const filteredRows = rowsWithBalance.filter(({ row, debitVal, creditVal, runningBalance: balance }) => {
    if (!rowQuery) return true;
    const searchableText = [
      debitVal ? debitVal.toLocaleString() : '',
      creditVal ? creditVal.toLocaleString() : '',
      Math.round(balance).toLocaleString(),
      row.remarks || ''
    ].join(' ').toLowerCase();
    return searchableText.includes(rowQuery);
  });

  statementTableBody.innerHTML = filteredRows.map(({ row, debitVal, creditVal, runningBalance }) => {
    const rowClass = row.type !== 'Debit' ? 'credit-row' : '';

    return `
      <tr class="${rowClass}">
        <td style="font-weight:700; color:#64748b;">${srCounter++}</td>
        <td><strong style="color:${row.crop === 'Crop 2' ? 'var(--brand-purple)' : 'var(--brand-blue)'};">${escapeHtml(row.crop)}</strong></td>
        <td><strong>${formatDate(row.date)}</strong></td>
        <td><span class="badge-paid" style="font-size:0.68rem;">Active</span></td>
        <td><strong>${escapeHtml(row.billNo || '—')}</strong></td>
        <td style="text-align:right; font-weight:700; color:${debitVal > 0 ? '#0f172a' : '#94a3b8'};">
          ${debitVal > 0 ? Math.round(debitVal).toLocaleString() : ''}
        </td>
        <td style="text-align:right; font-weight:700; color:${creditVal > 0 ? 'var(--brand-green)' : '#94a3b8'};">
          ${creditVal > 0 ? Math.round(creditVal).toLocaleString() : ''}
        </td>
        <td style="text-align:right; font-weight:800; color:#0f172a;">
          ${formatBalance(runningBalance)}
        </td>
        <td style="font-size:0.75rem; color:#334155;">
          ${escapeHtml(row.remarks)}
        </td>
        <td class="no-print" style="text-align:center;">
          ${row.isManual ? `<button type="button" class="small-button" style="color:var(--brand-red);" onclick="deleteVendorTxn('${row.id}')">✕</button>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function deleteVendorTxn(id) {
  if (!confirm('Delete this payment or adjustment entry?')) return;
  vendorTransactions = vendorTransactions.filter(v => v.id !== id);
  saveStorage();
  renderVendorStatement();
  renderFinanceOverview();
  renderFinancialLedger();
}

function copyVendorStatementSummary() {
  if (!statementVendorSelect) return;
  const vendorName = statementVendorSelect.value;
  const c1Deb = stmtCrop1Purchases.textContent;
  const c2Deb = stmtCrop2Purchases.textContent;
  const totDeb = stmtTotalDebit.textContent;
  const totCred = stmtTotalCredit.textContent;
  const closeBal = stmtClosingBalance.textContent;

  const text = `*STATEMENT OF ACCOUNT: ${vendorName.toUpperCase()}*\n`
    + `• Crop 1 Purchases: ${c1Deb}\n`
    + `• Crop 2 Purchases: ${c2Deb}\n`
    + `------------------------------\n`
    + `• Total Debit (Bills): ${totDeb}\n`
    + `• Total Credit (Payments/Returns): ${totCred}\n`
    + `• *Closing Balance: ${closeBal}*\n`
    + `(Generated via BlueCrest Farm Manager - ${new Date().toLocaleDateString()})`;

  navigator.clipboard.writeText(text).then(() => {
    alert(`Statement summary for ${vendorName} copied to clipboard! You can paste it directly into WhatsApp.`);
  }).catch(() => {
    alert(text);
  });
}

function renderStockReturnHistory() {
  if (!stockReturnHistoryListEl) return;
  if (stockReturns.length === 0) {
    stockReturnHistoryListEl.innerHTML = '<div class="empty-state"><strong>No stock returns recorded yet</strong></div>';
    return;
  }

  stockReturnHistoryListEl.innerHTML = stockReturns.map(r => {
    const totAmt = r.totalAmount || (r.qty * r.unitPrice) || 0;
    return `
      <article class="record-card">
        <div class="record-main">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <h3 class="cell-title">${escapeHtml(r.name)}</h3>
              <span class="badge-locked" style="background:#fff7ed; color:#c2410c;">Stock Return</span>
              <span class="badge-locked">${escapeHtml(r.crop || 'Crop 1')}</span>
              ${r.invoiceNo ? `<span class="badge-locked">Ref #${escapeHtml(r.invoiceNo)}</span>` : ''}
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">
              <span>Vendor: <strong>${escapeHtml(r.supplier || '—')}</strong></span> • 
              <span>Date: ${formatDate(r.date)}</span> • 
              <span>Brand: ${escapeHtml(r.company || 'Local')}</span>
            </div>
          </div>
          <div class="record-values">
            <div class="sample-value"><span>Returned</span><strong style="color:var(--brand-orange);">${r.qty} ${escapeHtml(r.unit)}</strong></div>
            <div class="sample-value"><span>Rate</span><strong>₹${(r.unitPrice || 0).toFixed(2)}</strong></div>
            <div class="sample-value"><span>Credit Value</span><strong style="color:var(--brand-green);">₹${Math.round(totAmt).toLocaleString()}</strong></div>
          </div>
        </div>
        <div class="record-actions">
          <button type="button" class="small-button" onclick="editStockReturn('${r.id}')">Edit</button>
          <button type="button" class="small-button" style="color:var(--brand-red);" onclick="promptDeleteStockReturn('${r.id}')">Delete</button>
        </div>
      </article>
    `;
  }).join('');
}

function setupEventListeners() {
  document.querySelectorAll('.sidebar-menu .nav-item[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.route);
    });
  });

  document.querySelectorAll('.sidebar-menu .nav-sub-item[data-route]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateTo(btn.dataset.route);
    });
  });

  document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const currentGroup = header.closest('.nav-group');
      if (!currentGroup) return;
      toggleNavGroup(currentGroup.id);
    });
  });

  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const appSidebarEl = document.getElementById('appSidebar');
  if (sidebarToggleBtn && appSidebarEl) {
    sidebarToggleBtn.addEventListener('click', () => {
      appSidebarEl.classList.toggle('collapsed');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to refresh the application session?')) {
        location.reload();
      }
    });
  }

  document.querySelectorAll('.step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseFloat(btn.dataset.step) || 0;
      const currentVal = parseFloat(shrimpCountInput.value) || 0;
      shrimpCountInput.value = Math.max(0, currentVal + step) || '';
      updateFormCalculations();
    });
  });

  if (samplePondSelect) {
    samplePondSelect.addEventListener('change', () => {
      if (!sampleIdInput.value) autoPopulateLastFeed();
      updateFormCalculations();
    });
  }

  [testWeightInput, shrimpCountInput, lastFeedInput, currentFeedInput, sampleDateInput].forEach(input => {
    if (input) input.addEventListener('input', updateFormCalculations);
  });

  [harvestWeightInput, harvestCountInput].forEach(input => {
    if (input) input.addEventListener('input', updateHarvestPreview);
  });

  if (pondLengthInput && pondBreadthInput) {
    [pondLengthInput, pondBreadthInput].forEach(input => {
      input.addEventListener('input', calculatePondArea);
    });
  }

  if (treatmentCategoryFilter) {
    treatmentCategoryFilter.addEventListener('change', () => {
      if (treatmentProductNameInput) treatmentProductNameInput.value = '';
      updateTreatmentCalculations();
    });
  }

  if (treatmentProductNameInput) {
    treatmentProductNameInput.addEventListener('input', updateTreatmentCalculations);
    treatmentProductNameInput.addEventListener('change', updateTreatmentCalculations);
  }

  if (treatmentQtyInput) treatmentQtyInput.addEventListener('input', updateTreatmentCalculations);
  if (treatmentUnitSelect) treatmentUnitSelect.addEventListener('change', updateTreatmentCalculations);

  if (addItemRowBtn) {
    addItemRowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addInvoiceItemRow({}, true);
    });
  }

  if (addReturnItemRowBtn) {
    addReturnItemRowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addReturnItemRow({}, true);
    });
  }

  if (historySortOrder) historySortOrder.addEventListener('change', renderHistory);
  if (treatmentSortOrder) treatmentSortOrder.addEventListener('change', renderTreatmentLogs);
  if (purchaseSortOrder) purchaseSortOrder.addEventListener('change', renderInventoryAndPurchases);

  if (invSearchInput) invSearchInput.addEventListener('input', renderInventoryAndPurchases);
  if (invCategoryFilter) invCategoryFilter.addEventListener('change', renderInventoryAndPurchases);
  if (financeTypeFilter) financeTypeFilter.addEventListener('change', renderFinancialLedger);
  if (financeCategoryFilter) financeCategoryFilter.addEventListener('change', renderFinancialLedger);
  if (financeSearchInput) financeSearchInput.addEventListener('input', renderFinancialLedger);
  if (ledgerEntryForm) ledgerEntryForm.addEventListener('submit', handleLedgerEntrySubmit);
  [ledgerEntrySort, ledgerEntryCategoryFilter, ledgerEntrySubCategoryFilter, ledgerEntrySeasonFilter, ledgerEntryStatusFilter].forEach(input => {
    if (input) input.addEventListener('change', renderLedgerEntries);
  });
  if (ledgerEntrySearch) ledgerEntrySearch.addEventListener('input', renderLedgerEntries);
  if (ledgerEntryCategory) {
    ledgerEntryCategory.addEventListener('input', () => {
      populateLedgerSubcategories();
      renderLedgerSuggestions(ledgerEntryCategory, ledgerCategorySuggestions, ['Asset', 'Operational']);
    });
    ledgerEntryCategory.addEventListener('focus', () => renderLedgerSuggestions(ledgerEntryCategory, ledgerCategorySuggestions, ['Asset', 'Operational']));
    ledgerEntryCategory.addEventListener('keydown', event => handleLedgerSuggestionKeydown(event, ledgerEntryCategory, ledgerCategorySuggestions));
  }
  if (ledgerEntrySubCategory) {
    ledgerEntrySubCategory.addEventListener('input', () => renderLedgerSuggestions(ledgerEntrySubCategory, ledgerSubCategorySuggestions, ['Asset', 'Operational'].includes(ledgerEntryCategory?.value) ? getLedgerSubcategories() : []));
    ledgerEntrySubCategory.addEventListener('focus', () => renderLedgerSuggestions(ledgerEntrySubCategory, ledgerSubCategorySuggestions, ['Asset', 'Operational'].includes(ledgerEntryCategory?.value) ? getLedgerSubcategories() : []));
    ledgerEntrySubCategory.addEventListener('keydown', event => handleLedgerSuggestionKeydown(event, ledgerEntrySubCategory, ledgerSubCategorySuggestions));
  }
  if (ledgerEntryAccount) {
    ledgerEntryAccount.addEventListener('input', () => renderLedgerSuggestions(ledgerEntryAccount, ledgerAccountSuggestions, getLedgerAccounts()));
    ledgerEntryAccount.addEventListener('focus', () => renderLedgerSuggestions(ledgerEntryAccount, ledgerAccountSuggestions, getLedgerAccounts()));
    ledgerEntryAccount.addEventListener('keydown', event => handleLedgerSuggestionKeydown(event, ledgerEntryAccount, ledgerAccountSuggestions));
  }
  if (advAccountInput) {
    advAccountInput.addEventListener('input', () => renderLedgerSuggestions(advAccountInput, advAccountSuggestions, getLedgerAccounts()));
    advAccountInput.addEventListener('focus', () => renderLedgerSuggestions(advAccountInput, advAccountSuggestions, getLedgerAccounts()));
    advAccountInput.addEventListener('keydown', event => handleLedgerSuggestionKeydown(event, advAccountInput, advAccountSuggestions));
  }
  if (ledgerEntrySeason) {
    ledgerEntrySeason.addEventListener('input', () => renderLedgerSuggestions(ledgerEntrySeason, ledgerSeasonSuggestions, LEDGER_SEASONS));
    ledgerEntrySeason.addEventListener('focus', () => renderLedgerSuggestions(ledgerEntrySeason, ledgerSeasonSuggestions, LEDGER_SEASONS));
    ledgerEntrySeason.addEventListener('keydown', event => handleLedgerSuggestionKeydown(event, ledgerEntrySeason, ledgerSeasonSuggestions));
  }
  document.addEventListener('click', event => {
    if (!event.target.closest('.searchable-field')) {
      [ledgerCategorySuggestions, ledgerSubCategorySuggestions, ledgerAccountSuggestions, ledgerSeasonSuggestions, advAccountSuggestions].forEach(menu => { if (menu) menu.hidden = true; });
    }
  });
  [ledgerEntryDate, ledgerEntryQty, ledgerEntryPrice].forEach(input => {
    if (input) input.addEventListener('input', updateLedgerEntryPreview);
  });

  setupSupplierAutocomplete();

  if (treatmentPondFilter) treatmentPondFilter.addEventListener('change', renderTreatmentLogs);
  if (treatmentCatFilter) treatmentCatFilter.addEventListener('change', renderTreatmentLogs);
  if (treatmentSearchInput) treatmentSearchInput.addEventListener('input', renderTreatmentLogs);

  if (sampleForm) sampleForm.addEventListener('submit', handleSampleSubmit);
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', resetSampleForm);
  
  if (harvestForm) harvestForm.addEventListener('submit', handleHarvestSubmit);
  if (cancelHarvestEditBtn) cancelHarvestEditBtn.addEventListener('click', resetHarvestForm);

  if (treatmentForm) treatmentForm.addEventListener('submit', handleTreatmentSubmit);
  if (cancelTreatmentEditBtn) cancelTreatmentEditBtn.addEventListener('click', resetTreatmentForm);

  if (purchaseForm) purchaseForm.addEventListener('submit', handleMultiItemPurchaseSubmit);
  if (cancelPurchaseEditBtn) cancelPurchaseEditBtn.addEventListener('click', resetPurchaseForm);

  if (stockReturnForm) stockReturnForm.addEventListener('submit', handleStockReturnSubmit);
  if (cancelReturnEditBtn) cancelReturnEditBtn.addEventListener('click', resetStockReturnForm);

  if (openVendorStatementBtn) openVendorStatementBtn.addEventListener('click', () => openVendorStatement());
  if (vendorStatementNavBtn) vendorStatementNavBtn.addEventListener('click', () => openVendorStatement());
  if (vendorPaymentsNavBtn) vendorPaymentsNavBtn.addEventListener('click', () => {
    openVendorStatement(null, true);
    if (advDateInput) advDateInput.value = new Date().toISOString().split('T')[0];
  });
  if (statementVendorSelect) statementVendorSelect.addEventListener('change', renderVendorStatement);
  if (statementCropFilter) statementCropFilter.addEventListener('change', renderVendorStatement);
  if (statementTypeFilter) statementTypeFilter.addEventListener('change', renderVendorStatement);
  if (statementRowSearch) statementRowSearch.addEventListener('input', renderVendorStatement);
  if (printStatementBtn) printStatementBtn.addEventListener('click', () => window.print());
  if (copyStatementBtn) copyStatementBtn.addEventListener('click', copyVendorStatementSummary);
  if (closeStatementBtn) closeStatementBtn.addEventListener('click', () => vendorStatementDialog.close());

  if (openAddPaymentModalBtn) {
    openAddPaymentModalBtn.addEventListener('click', () => {
      quickAddPaymentBox.hidden = !quickAddPaymentBox.hidden;
      if (!quickAddPaymentBox.hidden && advDateInput) {
        advDateInput.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  const saveAdvancePayment = () => {
    const vendor = statementVendorSelect.value.trim();
    const date = advDateInput.value || new Date().toISOString().split('T')[0];
    const crop = advCropSelect.value || 'Crop 1';
    const type = advTypeSelect.value || 'Credit';
    const billNo = advBillNoInput.value.trim();
    const account = advAccountInput?.value.trim() || '';
    const amount = parseFloat(advAmountInput.value) || 0;
    const remarks = advRemarksInput.value.trim() || (type === 'Credit' ? 'Advance Payment' : 'Debit Charge');

    if (amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    rememberLedgerAccount(account);

    vendorTransactions.push({
      id: `vtxn_${Date.now()}`,
      vendor: vendor,
      crop: crop,
      date: date,
      type: type,
      billNo: billNo,
      account: account,
      amount: amount,
      remarks: remarks
    });

    saveStorage();
    advAmountInput.value = '';
    advRemarksInput.value = '';
    advBillNoInput.value = '';
    if (advAccountInput) advAccountInput.value = '';
    renderVendorStatement();
    renderFinanceOverview();
    renderFinancialLedger();
    if (advDateInput) advDateInput.focus();
  };

  if (saveAdvancePaymentBtn) saveAdvancePaymentBtn.addEventListener('click', saveAdvancePayment);

  [advAmountInput, advRemarksInput].forEach(input => {
    if (input) input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveAdvancePayment();
      }
    });
  });

  if (historyPondSelect) historyPondSelect.addEventListener('change', renderHistory);
  if (historySearchInput) historySearchInput.addEventListener('input', renderHistory);
  if (chartPondSelect) chartPondSelect.addEventListener('change', renderGrowthChart);
  if (survivalPondSelect) survivalPondSelect.addEventListener('change', renderSurvivalChart);

  if (pondForm) pondForm.addEventListener('submit', handlePondSubmit);
  if (cancelPondEditBtn) cancelPondEditBtn.addEventListener('click', resetPondForm);

  if (exportButton) exportButton.addEventListener('click', exportCSV);
  if (importButton) importButton.addEventListener('click', () => {
    if (importFileInput) importFileInput.click();
  });
  if (importFileInput) importFileInput.addEventListener('change', handleImportJSON);

  if (confirmDialog) {
    confirmDialog.addEventListener('close', () => {
      if (confirmDialog.returnValue === 'confirm' && deleteTargetId) {
        if (deleteTargetType === 'sample') {
          samples = samples.filter(s => s.id !== deleteTargetId);
        } else if (deleteTargetType === 'pond') {
          ponds = ponds.filter(p => p.id !== deleteTargetId);
          samples = samples.filter(s => s.pondId !== deleteTargetId);
          harvests = harvests.filter(h => h.pondId !== deleteTargetId);
          treatments = treatments.filter(t => t.pondId !== deleteTargetId);
        } else if (deleteTargetType === 'harvest') {
          harvests = harvests.filter(h => h.id !== deleteTargetId);
        } else if (deleteTargetType === 'treatment') {
          treatments = treatments.filter(t => t.id !== deleteTargetId);
        } else if (deleteTargetType === 'purchase') {
          purchases = purchases.filter(p => p.id !== deleteTargetId);
        } else if (deleteTargetType === 'stockReturn') {
          stockReturns = stockReturns.filter(r => r.id !== deleteTargetId);
        }
        saveStorage();
        renderAll();
      }
      deleteTargetId = null;
      deleteTargetType = null;
    });
  }

  [purchaseForm, stockReturnForm].forEach(form => {
    if (!form) return;
    form.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      }
    });
  });
}

function handleMultiItemPurchaseSubmit(e) {
  e.preventDefault();
  if (purchaseMessageEl) purchaseMessageEl.textContent = '';

  const pDate = purchaseDateInput.value || new Date().toISOString().split('T')[0];
  const pCrop = purchaseCropSelect ? purchaseCropSelect.value : 'Crop 1';
  const invoiceNo = invoiceNoInput ? invoiceNoInput.value.trim() : '';
  const supplier = prodSupplierInput.value.trim();

  if (!supplier) {
    alert('Please enter or select a Supplier / Vendor.');
    if (prodSupplierInput) prodSupplierInput.focus();
    return;
  }

  const rows = document.querySelectorAll('.invoice-item-row:not(.return-item-row)');
  if (rows.length === 0) {
    alert('Please add at least one product item to the invoice.');
    return;
  }

  const editId = purchaseIdInput.value;
  if (editId) {
    purchases = purchases.filter(p => p.id !== editId);
  }

  let addedCount = 0;
  rows.forEach((row, idx) => {
    const category = row.querySelector('.row-category').value;
    const name = row.querySelector('.row-name').value.trim();
    const company = row.querySelector('.row-company').value.trim() || 'Local';
    const qty = parseFloat(row.querySelector('.row-qty').value) || 0;
    const unit = row.querySelector('.row-unit').value;
    const unitPrice = parseFloat(row.querySelector('.row-price').value) || 0;
    const totalAmount = qty * unitPrice;

    if (name && qty > 0) {
      purchases.unshift({
        id: editId && idx === 0 ? editId : `pur_${Date.now()}_${idx}`,
        date: pDate,
        crop: pCrop,
        invoiceNo: invoiceNo,
        name: name,
        company: company,
        supplier: supplier,
        category: category,
        qty: qty,
        unit: unit,
        unitPrice: unitPrice,
        totalAmount: totalAmount
      });
      saveProductMemoryEntry(name, company, unitPrice, category, unit);
      addedCount++;
    }
  });

  if (addedCount === 0) {
    alert('Please ensure at least one item row has a valid product name and quantity greater than 0.');
    return;
  }

  saveStorage();
  resetPurchaseForm();
  renderAll();

  if (purchaseDateInput) {
    setTimeout(() => purchaseDateInput.focus(), 30);
  }

  if (purchaseMessageEl) {
    purchaseMessageEl.textContent = `✓ Invoice with ${addedCount} items recorded successfully for ${pCrop}!`;
    setTimeout(() => {
      if (purchaseMessageEl) purchaseMessageEl.textContent = '';
    }, 4000);
  }
}

function handleStockReturnSubmit(e) {
  e.preventDefault();
  if (returnMessageEl) returnMessageEl.textContent = '';

  const rDate = returnDateInput.value || new Date().toISOString().split('T')[0];
  const rCrop = returnCropSelect ? returnCropSelect.value : 'Crop 1';
  const invoiceNo = returnInvoiceNoInput ? returnInvoiceNoInput.value.trim() : '';
  const supplier = returnSupplierInput.value.trim();

  if (!supplier) {
    alert('Please enter or select a Supplier / Vendor.');
    if (returnSupplierInput) returnSupplierInput.focus();
    return;
  }

  const rows = document.querySelectorAll('.return-item-row');
  if (rows.length === 0) {
    alert('Please add at least one product item to return.');
    return;
  }

  const editId = returnIdInput.value;
  if (editId) {
    stockReturns = stockReturns.filter(r => r.id !== editId);
  }

  let addedCount = 0;
  rows.forEach((row, idx) => {
    const category = row.querySelector('.row-category').value;
    const name = row.querySelector('.row-name').value.trim();
    const company = row.querySelector('.row-company').value.trim() || 'Local';
    const qty = parseFloat(row.querySelector('.row-qty').value) || 0;
    const unit = row.querySelector('.row-unit').value;
    const unitPrice = parseFloat(row.querySelector('.row-price').value) || 0;
    const totalAmount = qty * unitPrice;

    if (name && qty > 0) {
      stockReturns.unshift({
        id: editId && idx === 0 ? editId : `ret_${Date.now()}_${idx}`,
        date: rDate,
        crop: rCrop,
        invoiceNo: invoiceNo,
        name: name,
        company: company,
        supplier: supplier,
        category: category,
        qty: qty,
        unit: unit,
        unitPrice: unitPrice,
        totalAmount: totalAmount
      });
      saveProductMemoryEntry(name, company, unitPrice, category, unit);
      addedCount++;
    }
  });

  if (addedCount === 0) {
    alert('Please ensure at least one return item row has a valid product name and quantity greater than 0.');
    return;
  }

  saveStorage();
  resetStockReturnForm();
  renderAll();

  if (returnDateInput) {
    setTimeout(() => returnDateInput.focus(), 30);
  }

  if (returnMessageEl) {
    returnMessageEl.textContent = `✓ Stock Return of ${addedCount} items recorded successfully for ${rCrop}!`;
    setTimeout(() => {
      if (returnMessageEl) returnMessageEl.textContent = '';
    }, 4000);
  }
}

function calculateHarvestPiecesAndAbw(weightKg, countPcsPerKg) {
  const w = parseFloat(weightKg) || 0;
  const c = parseFloat(countPcsPerKg) || 0;
  const abwGrams = c > 0 ? (1000 / c) : 0;
  const biomassGrams = w * 1000;
  const pieces = abwGrams > 0 ? Math.round(biomassGrams / abwGrams) : 0;
  return { abwGrams, pieces };
}

function updateHarvestPreview() {
  const { abwGrams, pieces } = calculateHarvestPiecesAndAbw(harvestWeightInput.value, harvestCountInput.value);
  previewHarvestAbw.textContent = abwGrams > 0 ? `${abwGrams.toFixed(2)}g` : '—';
  previewHarvestPieces.textContent = pieces > 0 ? `${pieces.toLocaleString()} pcs` : '—';
}

function autoPopulateLastFeed() {
  if (!samplePondSelect) return;
  const selectedPondId = samplePondSelect.value;
  if (!selectedPondId) return;

  const pondSamples = samples
    .filter(s => s.pondId === selectedPondId && s.id !== (sampleIdInput ? sampleIdInput.value : ''))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (pondSamples.length > 0 && pondSamples[0].currentFeed !== null) {
    lastFeedInput.value = pondSamples[0].currentFeed;
  } else {
    lastFeedInput.value = '0';
  }
}

function getExpectedFeedPer1Lakh(abw) {
  if (abw <= FEED_CHART_TABLE[0].abw) return FEED_CHART_TABLE[0].feedKg;
  if (abw >= FEED_CHART_TABLE[FEED_CHART_TABLE.length - 1].abw) return FEED_CHART_TABLE[FEED_CHART_TABLE.length - 1].feedKg;

  for (let i = 0; i < FEED_CHART_TABLE.length - 1; i++) {
    const p1 = FEED_CHART_TABLE[i];
    const p2 = FEED_CHART_TABLE[i + 1];
    if (abw >= p1.abw && abw <= p2.abw) {
      const ratio = (abw - p1.abw) / (p2.abw - p1.abw);
      return p1.feedKg + ratio * (p2.feedKg - p1.feedKg);
    }
  }
  return 35.0;
}

function getPondHarvestReconciliation(pondId) {
  const pond = ponds.find(p => p.id === pondId);
  if (!pond) return null;

  const pondHarvests = harvests.filter(h => h.pondId === pondId);
  if (pondHarvests.length === 0) return null;

  let totalBiomass = 0;
  let totalPieces = 0;
  let hasFull = false;
  let finalFeed = null;

  pondHarvests.forEach(h => {
    const { pieces } = calculateHarvestPiecesAndAbw(h.weight, h.count);
    totalBiomass += (h.weight || 0);
    totalPieces += pieces;
    if (h.type === 'Full') {
      hasFull = true;
      if (h.totalFeed) finalFeed = h.totalFeed;
    }
  });

  const finalSurvivalPct = (hasFull && pond.stockingCount) ? ((totalPieces / pond.stockingCount) * 100) : null;
  const finalFcr = (hasFull && finalFeed && totalBiomass > 0) ? (finalFeed / totalBiomass) : null;

  return {
    totalBiomass,
    totalPieces,
    hasFull,
    finalFeed,
    finalSurvivalPct,
    finalFcr,
    harvestList: pondHarvests
  };
}

function calculateMetrics(pondId, dateStr, testWeight, count, lastFeed, currentFeed, currentSampleId = null) {
  const tw = parseFloat(testWeight) || 0;
  const cnt = parseFloat(count) || 0;
  const abw = (tw > 0 && cnt > 0) ? (tw / cnt) : 0;

  const pond = ponds.find(p => p.id === pondId);
  let doc = null;
  if (pond && pond.stockingDate && dateStr) {
    const d1 = new Date(pond.stockingDate);
    const d2 = new Date(dateStr);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    doc = diff >= 0 ? diff : null;
  }

  const pondSamplesBefore = samples
    .filter(s => s.pondId === pondId && (s.id !== currentSampleId) && new Date(s.date) < new Date(dateStr))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let prevSample = null;
  let prevAbw = null;
  if (pondSamplesBefore.length > 0) {
    prevSample = pondSamplesBefore[pondSamplesBefore.length - 1];
    prevAbw = (prevSample.testWeight && prevSample.count) ? (prevSample.testWeight / prevSample.count) : null;
  }

  const growth = (abw > 0 && prevAbw !== null) ? (abw - prevAbw) : null;
  const lf = parseFloat(lastFeed) || 0;
  const cf = parseFloat(currentFeed) || 0;
  const netFeed = cf - lf;

  let daysBetween = 7;
  if (prevSample && prevSample.date && dateStr) {
    const msGap = new Date(dateStr) - new Date(prevSample.date);
    daysBetween = Math.max(1, Math.round(msGap / (1000 * 60 * 60 * 24)));
  }

  const weeklyAvgFeed = (netFeed > 0 && daysBetween > 0) ? (netFeed / daysBetween) : 0;

  let expectedWeeklyFeed = null;
  if (abw > 0 && pond && pond.stockingCount) {
    const feedPer1Lakh = getExpectedFeedPer1Lakh(abw);
    const dailyExpectedPondFeed = (feedPer1Lakh / 100000) * pond.stockingCount;
    expectedWeeklyFeed = dailyExpectedPondFeed * daysBetween;
  }

  const recon = getPondHarvestReconciliation(pondId);
  let fcr = null;
  if (recon && recon.hasFull && recon.finalFcr) {
    fcr = recon.finalFcr;
  } else if (netFeed > 0 && growth !== null && growth > 0 && pond && pond.stockingCount) {
    const dailyActualFeed = netFeed / daysBetween;
    const stdDailyFeedPer1Lakh = getExpectedFeedPer1Lakh(abw);
    const stdDailyFeedPerShrimp = stdDailyFeedPer1Lakh / 100000;

    if (stdDailyFeedPerShrimp > 0) {
      const estimatedSurvivalCount = dailyActualFeed / stdDailyFeedPerShrimp;
      const estimatedBiomassGainKg = (growth * estimatedSurvivalCount) / 1000;
      if (estimatedBiomassGainKg > 0) {
        fcr = netFeed / estimatedBiomassGainKg;
      }
    }
  }

  let estSurvivalPct = null;
  if (netFeed > 0 && abw > 0 && pond && pond.stockingCount && prevSample) {
    const dailyActualFeed = netFeed / daysBetween;
    const stdDailyFeedPer1Lakh = getExpectedFeedPer1Lakh(abw);
    const stdDailyFeedPerShrimp = stdDailyFeedPer1Lakh / 100000;

    if (stdDailyFeedPerShrimp > 0) {
      const estimatedLivingCount = dailyActualFeed / stdDailyFeedPerShrimp;
      estSurvivalPct = Math.min(120, (estimatedLivingCount / pond.stockingCount) * 100);
    }
  }

  return { abw, doc, growth, netFeed, daysBetween, weeklyAvgFeed, expectedWeeklyFeed, fcr, estSurvivalPct };
}

function updateFormCalculations() {
  if (!samplePondSelect) return;
  const currentId = sampleIdInput ? sampleIdInput.value : null;
  const { abw, doc, growth, fcr, estSurvivalPct } = calculateMetrics(
    samplePondSelect.value, sampleDateInput.value, testWeightInput.value, 
    shrimpCountInput.value, lastFeedInput.value, currentFeedInput.value, currentId
  );

  if (previewAbw) previewAbw.textContent = abw > 0 ? `${abw.toFixed(2)}g` : '—';
  if (previewDoc) previewDoc.textContent = doc !== null ? `${doc} d` : '—';
  if (previewGrowth) previewGrowth.textContent = growth !== null ? `${growth >= 0 ? '+' : ''}${growth.toFixed(2)}g` : '—';
  if (previewFcr) previewFcr.textContent = fcr !== null ? fcr.toFixed(2) : '—';
  if (previewSurvival) previewSurvival.textContent = estSurvivalPct !== null ? `${estSurvivalPct.toFixed(1)}%` : '—';
}

function handleSampleSubmit(e) {
  e.preventDefault();
  if (formMessage) formMessage.textContent = '';

  const record = {
    id: sampleIdInput.value || `s_${Date.now()}`,
    pondId: samplePondSelect.value,
    date: sampleDateInput.value,
    testWeight: parseFloat(testWeightInput.value),
    count: parseFloat(shrimpCountInput.value),
    lastFeed: lastFeedInput.value !== '' ? parseFloat(lastFeedInput.value) : 0,
    currentFeed: currentFeedInput.value !== '' ? parseFloat(currentFeedInput.value) : null,
    notes: sampleNotesInput.value.trim()
  };

  const existingIdx = samples.findIndex(s => s.id === record.id);
  if (existingIdx >= 0) samples[existingIdx] = record;
  else samples.push(record);

  saveStorage();
  resetSampleForm();
  renderAll();
  navigateTo('summary');
}

function resetSampleForm() {
  sampleIdInput.value = '';
  sampleForm.reset();
  sampleDateInput.value = new Date().toISOString().split('T')[0];
  testWeightInput.value = '1000';
  cancelEditBtn.hidden = true;
  saveLabel.textContent = 'Save sample';
  if (formMessage) formMessage.textContent = '';
  autoPopulateLastFeed();
  updateFormCalculations();
}

function editSample(id) {
  const s = samples.find(item => item.id === id);
  if (!s) return;

  sampleIdInput.value = s.id;
  samplePondSelect.value = s.pondId;
  sampleDateInput.value = s.date;
  testWeightInput.value = s.testWeight;
  shrimpCountInput.value = s.count;
  lastFeedInput.value = s.lastFeed !== undefined && s.lastFeed !== null ? s.lastFeed : 0;
  currentFeedInput.value = s.currentFeed !== undefined && s.currentFeed !== null ? s.currentFeed : '';
  sampleNotesInput.value = s.notes || '';

  cancelEditBtn.hidden = false;
  saveLabel.textContent = 'Edit Sample Record';
  updateFormCalculations();
  navigateTo('entry');
}

function promptDeleteSample(id) {
  deleteTargetId = id;
  deleteTargetType = 'sample';
  dialogTitle.textContent = 'Delete sample entry?';
  dialogText.textContent = 'This will permanently remove this sampling record and recalculate metrics.';
  confirmDialog.showModal();
}

function handleHarvestSubmit(e) {
  e.preventDefault();
  if (harvestMessageEl) harvestMessageEl.textContent = '';

  const record = {
    id: harvestIdInput.value || `h_${Date.now()}`,
    pondId: harvestPondSelect.value,
    date: harvestDateInput.value,
    type: harvestTypeSelect.value,
    weight: parseFloat(harvestWeightInput.value),
    count: parseFloat(harvestCountInput.value),
    totalFeed: harvestTotalFeedInput.value ? parseFloat(harvestTotalFeedInput.value) : null
  };

  const existingIdx = harvests.findIndex(h => h.id === record.id);
  if (existingIdx >= 0) harvests[existingIdx] = record;
  else harvests.push(record);

  saveStorage();
  resetHarvestForm();
  renderAll();
  navigateTo('harvest');

  if (harvestMessageEl) {
    harvestMessageEl.textContent = `✓ ${record.type} Harvest for pond recorded successfully!`;
    setTimeout(() => {
      if (harvestMessageEl) harvestMessageEl.textContent = '';
    }, 4000);
  }
}

function resetHarvestForm() {
  harvestIdInput.value = '';
  harvestForm.reset();
  harvestDateInput.value = new Date().toISOString().split('T')[0];
  cancelHarvestEditBtn.hidden = true;
  harvestSaveLabel.textContent = 'Record Harvest Event';
  updateHarvestPreview();
}

function editHarvest(id) {
  const h = harvests.find(item => item.id === id);
  if (!h) return;

  harvestIdInput.value = h.id;
  harvestPondSelect.value = h.pondId;
  harvestDateInput.value = h.date;
  harvestTypeSelect.value = h.type;
  harvestWeightInput.value = h.weight;
  harvestCountInput.value = h.count;
  harvestTotalFeedInput.value = h.totalFeed || '';

  cancelHarvestEditBtn.hidden = false;
  harvestSaveLabel.textContent = 'Edit Harvest Event';
  updateHarvestPreview();
  navigateTo('harvest');
}

function promptDeleteHarvest(id) {
  deleteTargetId = id;
  deleteTargetType = 'harvest';
  dialogTitle.textContent = 'Delete harvest entry?';
  dialogText.textContent = 'This will permanently remove this harvest event.';
  confirmDialog.showModal();
}

function handlePondSubmit(e) {
  e.preventDefault();
  if (pondMessageEl) pondMessageEl.textContent = '';

  const pondId = pondIdInput.value;
  const pondName = pondNameInput.value.trim();
  const duplicatePond = ponds.find(p => p.id !== pondId && (p.name || '').trim().toLowerCase() === pondName.toLowerCase());
  if (duplicatePond) {
    if (pondMessageEl) pondMessageEl.textContent = `Pond name "${pondName}" already exists. Please use a different name.`;
    pondNameInput.focus();
    return;
  }

  const pond = {
    id: pondId || `p_${Date.now()}`,
    name: pondName,
    hatcheryName: hatcheryNameInput ? hatcheryNameInput.value.trim() : '',
    length: pondLengthInput.value ? parseFloat(pondLengthInput.value) : null,
    breadth: pondBreadthInput.value ? parseFloat(pondBreadthInput.value) : null,
    area: pondAreaInput.value ? parseFloat(pondAreaInput.value) : null,
    stockingDate: stockingDateInput.value,
    stockingCount: stockingCountInput.value ? parseInt(stockingCountInput.value, 10) : ''
  };

  const idx = ponds.findIndex(p => p.id === pond.id);
  if (idx >= 0) ponds[idx] = { ...ponds[idx], ...pond };
  else ponds.push(pond);

  saveStorage();
  resetPondForm();
  renderAll();
}

function resetPondForm() {
  pondIdInput.value = '';
  pondForm.reset();
  if (hatcheryNameInput) hatcheryNameInput.value = '';
  pondAreaInput.value = '';
  cancelPondEditBtn.hidden = true;
  pondSaveLabel.textContent = 'Configure Pond Cycle';
  if (pondMessageEl) pondMessageEl.textContent = '';
}

function editPond(id) {
  const p = ponds.find(item => item.id === id);
  if (!p) return;

  pondIdInput.value = p.id;
  pondNameInput.value = p.name;
  if (hatcheryNameInput) hatcheryNameInput.value = p.hatcheryName || '';
  pondLengthInput.value = p.length || '';
  pondBreadthInput.value = p.breadth || '';
  pondAreaInput.value = p.area || '';
  stockingDateInput.value = p.stockingDate || '';
  stockingCountInput.value = p.stockingCount || '';

  cancelPondEditBtn.hidden = false;
  pondSaveLabel.textContent = 'Edit Pond Cycle';
  navigateTo('pond');
}

function promptDeletePond(id) {
  deleteTargetId = id;
  deleteTargetType = 'pond';
  dialogTitle.textContent = 'Delete pond?';
  dialogText.textContent = 'Deleting this pond will also remove associated samples and treatments.';
  confirmDialog.showModal();
}

function handleTreatmentSubmit(e) {
  e.preventDefault();
  const selectedProdName = treatmentProductNameInput.value.trim();
  const inventoryList = getProductInventorySummary();
  const prod = inventoryList.find(p => p.name.toLowerCase() === selectedProdName.toLowerCase());

  if (!prod) {
    alert('Please select a valid product from the catalogue.');
    return;
  }

  const qty = parseFloat(treatmentQtyInput.value) || 0;
  const unit = treatmentUnitSelect.value;
  const u = unit.toLowerCase();
  const baseQty = (u === 'gms' || u === 'gm' || u === 'g' || u === 'ml') ? (qty / 1000) : qty;
  const totalCost = baseQty * prod.latestUnitPrice;

  const treatment = {
    id: treatmentIdInput.value || `t_${Date.now()}`,
    pondId: treatmentPondSelect.value,
    date: treatmentDateInput.value,
    productName: prod.name,
    timing: treatmentTimingSelect.value,
    qty: qty,
    unit: unit,
    baseQty: baseQty,
    unitPrice: prod.latestUnitPrice,
    totalCost: totalCost,
    notes: treatmentNotesInput.value.trim()
  };

  const idx = treatments.findIndex(t => t.id === treatment.id);
  if (idx >= 0) treatments[idx] = treatment;
  else treatments.push(treatment);

  saveStorage();
  resetTreatmentForm();
  renderAll();
  navigateTo('treatmentLog');
}

function resetTreatmentForm() {
  treatmentIdInput.value = '';
  treatmentForm.reset();
  treatmentDateInput.value = new Date().toISOString().split('T')[0];
  if (treatmentUnitSelect) treatmentUnitSelect.value = 'Bag/Pkt';
  cancelTreatmentEditBtn.hidden = true;
  treatmentSaveLabel.textContent = 'Record Pond Treatment';
  if (treatmentProductSuggestions) treatmentProductSuggestions.hidden = true;
  updateTreatmentCalculations();
}

function editTreatment(id) {
  const t = treatments.find(item => item.id === id);
  if (!t) return;

  treatmentIdInput.value = t.id;
  treatmentPondSelect.value = t.pondId;
  treatmentDateInput.value = t.date;
  treatmentTimingSelect.value = t.timing;
  treatmentQtyInput.value = t.qty;
  if (treatmentUnitSelect) treatmentUnitSelect.value = t.unit || 'Bag/Pkt';
  treatmentNotesInput.value = t.notes || '';

  const inventoryList = getProductInventorySummary();
  const prod = inventoryList.find(p => p.name.toLowerCase() === (t.productName || '').toLowerCase());
  if (prod) {
    treatmentCategoryFilter.value = prod.category;
    treatmentProductNameInput.value = prod.name;
  } else {
    treatmentProductNameInput.value = t.productName || '';
  }

  cancelTreatmentEditBtn.hidden = false;
  treatmentSaveLabel.textContent = 'Edit Treatment Record';
  updateTreatmentCalculations();
  navigateTo('treatmentEntry');
}

function promptDeleteTreatment(id) {
  deleteTargetId = id;
  deleteTargetType = 'treatment';
  dialogTitle.textContent = 'Delete treatment record?';
  dialogText.textContent = 'Deleting this treatment will restore the applied quantity back to stock.';
  confirmDialog.showModal();
}

function renderClinicalTable() {
  const tableBody = document.getElementById('recentSamplesTableBody');
  if (!tableBody) return;

  const sortedSamples = [...samples].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  if (sortedSamples.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem; color: #94a3b8;">No sampling records logged yet</td></tr>`;
    return;
  }

  tableBody.innerHTML = sortedSamples.slice(0, 8).map((s, idx) => {
    const pond = ponds.find(p => p.id === s.pondId);
    const m = calculateMetrics(s.pondId, s.date, s.testWeight, s.count, s.lastFeed, s.currentFeed, s.id);
    const caseId = `CR${s.date.replace(/-/g, '')}${s.id.replace(/\D/g, '').padEnd(4, '0')}`;
    const abwText = m.abw > 0 ? `${m.abw.toFixed(2)}g` : '—';
    const gainText = m.growth !== null ? `${m.growth >= 0 ? '+' : ''}${m.growth.toFixed(2)}g` : 'First sample';

    return `
      <tr>
        <td style="color:#64748b; font-weight:700;">${idx + 1}</td>
        <td>
          <span class="cell-title">${caseId}</span>
          <span class="cell-sub">${abwText} ABW • ${s.testWeight}g test</span>
        </td>
        <td>
          <span class="cell-title">${escapeHtml(pond ? pond.name : 'Pond')}</span>
          <span class="cell-sub">${escapeHtml(pond && pond.hatcheryName ? pond.hatcheryName : 'Farm Stock')}</span>
        </td>
        <td>
          <span class="cell-title">DOC: ${m.doc !== null ? m.doc + ' Days' : '—'}</span>
          <span class="cell-sub">Stocked: ${pond && pond.stockingCount ? pond.stockingCount.toLocaleString() : '—'} pcs</span>
        </td>
        <td>
          <span class="cell-title">${s.count} pcs</span>
          <span class="cell-sub" style="color:var(--brand-green); font-weight:600;">${gainText}</span>
        </td>
        <td>
          <span class="cell-title">${formatDate(s.date)}</span>
          <span class="cell-sub">Routine Sampling</span>
        </td>
        <td>
          <span class="badge-locked">🔒 Recorded</span>
        </td>
        <td>
          <span class="badge-paid">${m.fcr !== null ? 'FCR ' + m.fcr.toFixed(2) : 'HEALTHY'}</span>
        </td>
        <td style="text-align: right;">
          <button type="button" class="small-button" onclick="editSample('${s.id}')">Edit</button>
          <button type="button" class="small-button" style="color:var(--brand-red)" onclick="promptDeleteSample('${s.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSampleCard(s) {
  const pond = ponds.find(p => p.id === s.pondId);
  const m = calculateMetrics(s.pondId, s.date, s.testWeight, s.count, s.lastFeed, s.currentFeed, s.id);
  const abwStr = m.abw > 0 ? `${m.abw.toFixed(2)}g` : '—';
  const growthStr = m.growth !== null ? `${m.growth >= 0 ? '+' : ''}${m.growth.toFixed(2)}g` : '—';
  const fcrStr = m.fcr !== null ? m.fcr.toFixed(2) : '—';
  const survStr = m.estSurvivalPct !== null ? `${m.estSurvivalPct.toFixed(1)}%` : '—';

  return `
    <article class="record-card">
      <div class="record-main">
        <div>
          <h3 class="cell-title">${escapeHtml(pond ? pond.name : 'Pond')} Sample</h3>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">
            <span>Date: <strong>${formatDate(s.date)}</strong></span>
            ${m.doc !== null ? ` • <span>DOC: <strong>${m.doc}d</strong></span>` : ''}
          </div>
        </div>
        <div class="record-values">
          <div class="sample-value"><span>Count</span><strong>${s.count} pcs</strong></div>
          <div class="sample-value"><span>ABW</span><strong>${abwStr}</strong></div>
          <div class="sample-value"><span>Gain</span><strong style="color:var(--brand-green);">${growthStr}</strong></div>
          <div class="sample-value"><span>Est. FCR</span><strong style="color:var(--brand-blue);">${fcrStr}</strong></div>
          <div class="sample-value"><span>Est. Sur.</span><strong style="color:var(--brand-green);">${survStr}</strong></div>
        </div>
      </div>
      ${s.notes ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem; padding-top:0.5rem; border-top:1px dashed #e2e8f0;">${escapeHtml(s.notes)}</div>` : ''}
      <div class="record-actions">
        <button type="button" class="small-button" onclick="editSample('${s.id}')">Edit</button>
        <button type="button" class="small-button" style="color:var(--brand-red)" onclick="promptDeleteSample('${s.id}')">Delete</button>
      </div>
    </article>
  `;
}

function renderHistory() {
  if (!historySamplesEl) return;
  const selectedPond = historyPondSelect ? historyPondSelect.value : 'ALL';
  const query = historySearchInput ? historySearchInput.value.trim().toLowerCase() : '';
  const isAsc = historySortOrder ? historySortOrder.value === 'asc' : false;

  let filtered = [...samples];
  if (selectedPond && selectedPond !== 'ALL') {
    filtered = filtered.filter(s => s.pondId === selectedPond);
  }
  if (query) {
    filtered = filtered.filter(s => {
      const p = ponds.find(pond => pond.id === s.pondId);
      const pondName = p ? p.name.toLowerCase() : '';
      const notes = (s.notes || '').toLowerCase();
      return pondName.includes(query) || notes.includes(query) || s.date.includes(query);
    });
  }

  filtered.sort((a, b) => {
    const diff = new Date(a.date) - new Date(b.date);
    return isAsc ? diff : -diff;
  });

  if (filtered.length === 0) {
    historySamplesEl.innerHTML = '<div class="empty-state"><strong>No sampling records found</strong><p>Try adjusting your search filters.</p></div>';
    return;
  }

  historySamplesEl.innerHTML = filtered.map(s => renderSampleCard(s)).join('');
}

function renderTreatmentLogs() {
  if (!treatmentRecordsListEl) return;

  const isAsc = treatmentSortOrder ? treatmentSortOrder.value === 'asc' : false;
  let filtered = [...treatments].sort((a, b) => {
    const diff = new Date(a.date) - new Date(b.date);
    return isAsc ? diff : -diff;
  });

  const inventoryList = getProductInventorySummary();

  if (treatmentPondFilter && treatmentPondFilter.value && treatmentPondFilter.value !== 'ALL') {
    filtered = filtered.filter(t => t.pondId === treatmentPondFilter.value);
  }
  if (treatmentCatFilter && treatmentCatFilter.value && treatmentCatFilter.value !== 'ALL') {
    filtered = filtered.filter(t => {
      const prod = inventoryList.find(p => p.name.toLowerCase() === (t.productName || '').toLowerCase());
      return prod && prod.category === treatmentCatFilter.value;
    });
  }
  if (treatmentSearchInput && treatmentSearchInput.value.trim() !== '') {
    const q = treatmentSearchInput.value.toLowerCase();
    filtered = filtered.filter(t => {
      const prodName = (t.productName || '').toLowerCase();
      return prodName.includes(q) || t.date.includes(q) || (t.notes && t.notes.toLowerCase().includes(q));
    });
  }

  let totalCost = 0, fertCost = 0, medCost = 0;
  treatments.forEach(t => {
    totalCost += (t.totalCost || 0);
    const prod = inventoryList.find(p => p.name.toLowerCase() === (t.productName || '').toLowerCase());
    if (prod && prod.category === 'Fertilizer') fertCost += (t.totalCost || 0);
    else if (prod && prod.category === 'Medicine') medCost += (t.totalCost || 0);
  });

  if (treatmentCountEl) treatmentCountEl.textContent = treatments.length;
  if (treatmentTotalCostEl) treatmentTotalCostEl.textContent = `₹${Math.round(totalCost).toLocaleString()}`;
  if (treatmentFertCostEl) treatmentFertCostEl.textContent = `₹${Math.round(fertCost).toLocaleString()}`;
  if (treatmentMedCostEl) treatmentMedCostEl.textContent = `₹${Math.round(medCost).toLocaleString()}`;

  if (filtered.length === 0) {
    treatmentRecordsListEl.innerHTML = '<div class="empty-state"><strong>No treatment logs found</strong><p>Record a pond treatment or adjust your filters.</p></div>';
    return;
  }

  treatmentRecordsListEl.innerHTML = filtered.map(t => {
    const pond = ponds.find(p => p.id === t.pondId);
    const prod = inventoryList.find(p => p.name.toLowerCase() === (t.productName || '').toLowerCase());
    const displayUnit = t.unit || (prod ? prod.unit : 'Bag/Pkt');
    const rateText = prod ? `₹${(t.unitPrice || 0).toFixed(2)}/${prod.unit}` : '';

    return `
      <article class="record-card">
        <div class="record-main">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <h3 class="cell-title">${escapeHtml(t.productName || 'Product')}</h3>
              <span class="badge-locked">${prod ? prod.category : 'Treatment'}</span>
              <span class="badge-paid">${t.timing}</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">
              <span>Pond: <strong>${escapeHtml(pond ? pond.name : 'Pond')}</strong></span> • 
              <span>Date: ${formatDate(t.date)}</span>
              ${prod ? ` • <span>Company: ${escapeHtml(prod.company)}</span>` : ''}
            </div>
          </div>
          <div class="record-values">
            <div class="sample-value"><span>Applied</span><strong>${t.qty} ${displayUnit}</strong></div>
            <div class="sample-value"><span>Unit Price</span><strong>${rateText}</strong></div>
            <div class="sample-value"><span>Total Cost</span><strong style="color:var(--brand-blue);">₹${Math.round(t.totalCost || 0).toLocaleString()}</strong></div>
          </div>
        </div>
        ${t.notes ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">${escapeHtml(t.notes)}</div>` : ''}
        <div class="record-actions">
          <button type="button" class="small-button" onclick="editTreatment('${t.id}')">Edit</button>
          <button type="button" class="small-button" style="color:var(--brand-red)" onclick="promptDeleteTreatment('${t.id}')">Delete</button>
        </div>
      </article>
    `;
  }).join('');
}

function getFeedInventoryRows(inventoryList) {
  return FEED_CODE_DIRECTORY.map(feed => {
    const inventoryItem = inventoryList.find(item => item.company === feed.company && item.name === feed.code) || {};
    const purchasedQty = purchases
      .filter(p => (p.category || '').toLowerCase() === 'feed' && (p.name || '').trim().toLowerCase() === feed.code.toLowerCase())
      .reduce((total, purchase) => total + (parseFloat(purchase.qty) || 0), 0);

    return {
      company: feed.company,
      code: feed.code,
      purchasedQty,
      usedQty: Number(inventoryItem.totalUsedQty || 0),
      closingBalance: Number(inventoryItem.balanceStock || 0)
    };
  }).filter(feed => feed.purchasedQty !== 0 || feed.usedQty !== 0 || feed.closingBalance !== 0);
}

function renderInventoryAndPurchases() {
  const inventoryList = getProductInventorySummary();
  const isFeedInventoryOnly = document.getElementById('catalogueView')?.classList.contains('feed-inventory-only');
  const catVal = invCategoryFilter ? invCategoryFilter.value : 'ALL';
  const inventoryForDisplay = isFeedInventoryOnly
    ? inventoryList.filter(item => item.category === 'Feed' && item.balanceStock > 0)
    : inventoryList;

  let totalPurchasedVal = 0;
  let totalUsedVal = 0;
  let totalStockVal = 0;

  inventoryForDisplay.forEach(item => {
    totalPurchasedVal += (item.totalPurchasedValue || 0);
    totalUsedVal += (item.usedValue || 0);
    totalStockVal += (item.stockValue || 0);
  });

  if (invDistinctCountEl) invDistinctCountEl.textContent = inventoryForDisplay.length;
  if (invTotalPurchasedValueEl) invTotalPurchasedValueEl.textContent = `₹${Math.round(totalPurchasedVal).toLocaleString()}`;
  if (invTotalUsedValueEl) invTotalUsedValueEl.textContent = `₹${Math.round(totalUsedVal).toLocaleString()}`;
  if (invCurrentStockValueEl) invCurrentStockValueEl.textContent = `₹${Math.round(totalStockVal).toLocaleString()}`;
  if (invCurrentStockValueEl2) invCurrentStockValueEl2.textContent = `₹${Math.round(totalStockVal).toLocaleString()}`;

  let displayInventory = [...inventoryForDisplay];

  if (!isFeedInventoryOnly && catVal === 'IN_STOCK') {
    displayInventory = displayInventory.filter(item => item.balanceStock > 0);
  } else if (!isFeedInventoryOnly && catVal === 'LOW') {
    displayInventory = displayInventory.filter(item => item.balanceStock <= 0);
  } else if (!isFeedInventoryOnly && catVal !== 'ALL') {
    displayInventory = displayInventory.filter(item => item.category === catVal);
  }

  const query = invSearchInput ? invSearchInput.value.trim().toLowerCase() : '';
  if (query) {
    displayInventory = displayInventory.filter(item => {
      return item.name.toLowerCase().includes(query) || item.company.toLowerCase().includes(query);
    });
  }

  if (isFeedInventoryOnly && liveInventoryListEl) {
    const selectedFeedCompany = document.getElementById('feedCompanyFilter')?.value || 'ALL';
    const selectedFeedCode = document.getElementById('feedCodeFilter')?.value || 'ALL';
    const feedInventoryRows = getFeedInventoryRows(inventoryList);
    const feedCompanies = [...new Set(feedInventoryRows.map(feed => feed.company))];
    const filteredFeedCodes = feedInventoryRows.filter(feed => {
      return (selectedFeedCompany === 'ALL' || feed.company === selectedFeedCompany)
        && (selectedFeedCode === 'ALL' || feed.code === selectedFeedCode);
    });

    liveInventoryListEl.innerHTML = `
        <div class="feed-directory-panel">
          <div class="feed-directory-header">
            <div>
              <h2>Feed Code Directory</h2>
              <p>Approved feed codes available for pond operations.</p>
            </div>
            <span class="feed-directory-count">${filteredFeedCodes.length} of ${FEED_CODE_DIRECTORY.length} Feed Codes</span>
          </div>
          <div class="feed-directory-filters">
            <label>
              <span>Company</span>
              <select id="feedCompanyFilter" class="form-select-sm">
                <option value="ALL">All Companies</option>
                ${feedCompanies.map(company => `<option value="${escapeHtml(company)}"${company === selectedFeedCompany ? ' selected' : ''}>${escapeHtml(company)}</option>`).join('')}
              </select>
            </label>
            <label>
              <span>Feed Code</span>
              <select id="feedCodeFilter" class="form-select-sm">
                <option value="ALL">All Feed Codes</option>
                ${feedInventoryRows.map(feed => `<option value="${escapeHtml(feed.code)}"${feed.code === selectedFeedCode ? ' selected' : ''}>${escapeHtml(feed.code)}</option>`).join('')}
              </select>
            </label>
          </div>
          <div class="table-responsive">
            <table class="clinical-table feed-directory-table">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Feed Code</th>
                  <th scope="col">Purchased Qty</th>
                  <th scope="col">Used Qty</th>
                  <th scope="col">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                  ${filteredFeedCodes.map(feed => {
                    return `
                  <tr>
                    <td>${escapeHtml(feed.company)}</td>
                    <td><strong>${escapeHtml(feed.code)}</strong></td>
                      <td>${feed.purchasedQty.toLocaleString()}</td>
                      <td>${feed.usedQty.toLocaleString()}</td>
                      <td><strong>${feed.closingBalance.toLocaleString()}</strong></td>
                  </tr>
                    `;
                  }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      document.getElementById('feedCompanyFilter')?.addEventListener('change', renderInventoryAndPurchases);
      document.getElementById('feedCodeFilter')?.addEventListener('change', renderInventoryAndPurchases);
  } else if (liveInventoryListEl) {
    if (displayInventory.length === 0) {
      liveInventoryListEl.innerHTML = '<div class="empty-state"><strong>No matching inventory items</strong><p>Try searching another product name.</p></div>';
    } else {
      const categoryGroups = {};
      displayInventory.forEach(item => {
        const cat = item.category || 'Other';
        if (!categoryGroups[cat]) {
          categoryGroups[cat] = { items: [], totalValuation: 0, totalItems: 0 };
        }
        categoryGroups[cat].items.push(item);
        categoryGroups[cat].totalValuation += item.stockValue;
        categoryGroups[cat].totalItems++;
      });

      liveInventoryListEl.innerHTML = Object.entries(categoryGroups).map(([catName, group], gIdx) => {
        return `
          <div class="inventory-category-group" id="catGroup_${gIdx}">
            <div class="inventory-category-header" onclick="this.parentElement.classList.toggle('open')">
              <div class="inventory-category-title">
                <span>📁 ${escapeHtml(catName)} Inventory</span>
                <span class="badge-locked">${group.totalItems} products</span>
              </div>
              <div style="display:flex; gap:1.5rem; align-items:center;">
                <span style="font-weight:800; color:var(--brand-blue);">Total Value: ₹${Math.round(group.totalValuation).toLocaleString()}</span>
                <span class="cat-caret">▼ Click to Expand</span>
              </div>
            </div>

            <div class="inventory-category-content">
              <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:0.75rem;">
                ${group.items.map((item, idx) => {
                  const isLow = item.balanceStock <= 0;
                  const usageRecords = treatments
                    .filter(t => (t.productName || '').trim().toLowerCase() === item.name.toLowerCase())
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                  return `
                    <div class="inventory-expandable-card" id="invCard_${gIdx}_${idx}" onclick="this.classList.toggle('expanded')" style="margin-bottom:0;">
                      <div class="inventory-card-main" style="padding:0.85rem 1rem;">
                        <div>
                          <h4 class="cell-title" style="font-size:0.95rem;">${escapeHtml(item.name)}</h4>
                          <span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(item.company)}</span>
                        </div>
                        <div style="text-align:right;">
                          <strong style="display:block; font-size:1.05rem; color:${isLow ? 'var(--brand-red)' : 'var(--brand-green)'}">${item.balanceStock.toFixed(2)} ${item.unit}</strong>
                          <span style="font-size:0.65rem; color:var(--text-muted);">₹${Math.round(item.stockValue).toLocaleString()}</span>
                        </div>
                      </div>

                      <div class="inventory-details-drawer" onclick="event.stopPropagation()" style="padding:0.85rem 1rem;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.78rem;">
                          <span>Purchased: <strong>${item.totalPurchasedQty.toLocaleString()} ${item.unit}</strong></span>
                          <span>Used: <strong style="color:var(--brand-red);">${item.totalUsedQty.toLocaleString()} ${item.unit}</strong></span>
                        </div>
                        ${item.totalReturnedQty > 0 ? `
                          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.78rem;">
                            <span>Returned: <strong style="color:var(--brand-orange);">${item.totalReturnedQty.toLocaleString()} ${item.unit}</strong></span>
                          </div>
                        ` : ''}
                        <strong style="display:block; font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.25rem;">Applications (${usageRecords.length}):</strong>
                        ${usageRecords.length > 0 ? `
                          <div style="display:flex; flex-wrap:wrap; gap:0.25rem; margin-bottom:0.5rem;">
                            ${usageRecords.slice(0, 4).map(u => {
                              const p = ponds.find(pond => pond.id === u.pondId);
                              return `<span class="usage-pill" style="font-size:0.7rem;">${escapeHtml(p ? p.name : 'Pond')}: ${u.qty} ${u.unit}</span>`;
                            }).join('')}
                          </div>
                        ` : `<p style="font-size:0.72rem; color:var(--text-muted); font-style:italic; margin-bottom:0.5rem;">No applications yet.</p>`}
                        <div class="record-actions" style="border-top:1px solid #e2e8f0; padding-top:0.4rem; margin-top:0.4rem;">
                          <button type="button" class="small-button" onclick="editCatalogueProduct('${escapeHtml(item.name)}')">Edit</button>
                          <button type="button" class="small-button" style="color:var(--brand-red); margin-left:0.5rem;" onclick="promptDeleteCatalogueProduct('${escapeHtml(item.name)}')">Delete</button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (purchaseHistoryListEl) {
    if (isFeedInventoryOnly) {
      purchaseHistoryListEl.innerHTML = '';
      return;
    }

    const isAsc = purchaseSortOrder ? purchaseSortOrder.value === 'asc' : false;

    const visiblePurchases = catVal !== 'ALL'
      ? purchases.filter(p => p.category === catVal)
      : purchases;
    const sortedPurchases = [...visiblePurchases].sort((a, b) => {
      const diff = new Date(a.date || 0) - new Date(b.date || 0);
      return isAsc ? diff : -diff;
    });

    if (sortedPurchases.length === 0) {
      purchaseHistoryListEl.innerHTML = '<div class="empty-state"><strong>No purchase records logged yet</strong></div>';
    } else {
      const invoiceGroups = {};

      sortedPurchases.forEach(p => {
        const invNo = (p.invoiceNo || '').trim();
        const vendorName = (p.supplier || 'Direct / Unspecified Vendor').trim();
        const crop = p.crop || 'Crop 1';
        const groupKey = invNo ? `inv__${invNo.toLowerCase()}__${vendorName.toLowerCase()}` : `${p.date || 'No Date'}__${vendorName.toLowerCase()}`;

        if (!invoiceGroups[groupKey]) {
          invoiceGroups[groupKey] = {
            invoiceNo: invNo || '—',
            date: p.date,
            crop: crop,
            vendor: vendorName,
            totalAmount: 0,
            items: []
          };
        }

        const itemTotal = (p.totalAmount !== undefined && p.totalAmount !== null)
          ? parseFloat(p.totalAmount)
          : ((parseFloat(p.qty) || 0) * (parseFloat(p.unitPrice) || 0));

        invoiceGroups[groupKey].totalAmount += itemTotal;
        invoiceGroups[groupKey].items.push(p);
      });

      const groupsList = Object.values(invoiceGroups);

      purchaseHistoryListEl.innerHTML = groupsList.map(inv => {
        return `
          <div class="invoice-group-card">
            <div class="invoice-group-header">
              <div style="display:flex; align-items:center; gap:0.65rem; flex-wrap:wrap;">
                <span class="invoice-vendor-title">🏪 ${escapeHtml(inv.vendor)}</span>
                <span class="badge-locked" style="background:${inv.crop === 'Crop 2' ? '#ede9fe' : '#e0f2fe'}; color:${inv.crop === 'Crop 2' ? '#6b21a8' : '#0369a1'};">${escapeHtml(inv.crop)}</span>
                ${inv.invoiceNo !== '—' ? `<span class="badge-locked" style="font-size:0.7rem;">Bill #${escapeHtml(inv.invoiceNo)}</span>` : ''}
                <span class="invoice-date-pill">📅 ${formatDate(inv.date)}</span>
                <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">
                  (${inv.items.length} ${inv.items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <div style="display:flex; gap:0.75rem; align-items:center;">
                <span class="invoice-total-badge">Total: ₹${Math.round(inv.totalAmount).toLocaleString()}</span>
                <button type="button" class="small-pill-btn" onclick="openVendorStatement('${escapeHtml(inv.vendor)}')">📑 Statement</button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="invoice-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Brand / Company</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Unit Rate</th>
                    <th>Total Amount</th>
                    <th style="text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${inv.items.map(p => {
                    const uPrice = (parseFloat(p.unitPrice) || 0).toFixed(2);
                    const totAmt = (p.totalAmount !== undefined && p.totalAmount !== null)
                      ? parseFloat(p.totalAmount)
                      : ((parseFloat(p.qty) || 0) * (parseFloat(p.unitPrice) || 0));

                    return `
                      <tr>
                        <td>
                          <strong style="color:#0f172a;">${escapeHtml(p.name)}</strong>
                        </td>
                        <td>
                          <span style="color:var(--text-muted);">${escapeHtml(p.company || 'Local')}</span>
                        </td>
                        <td>
                          <span class="badge-locked">${p.category}</span>
                        </td>
                        <td>
                          <strong>${p.qty} ${escapeHtml(p.unit)}</strong>
                        </td>
                        <td>
                          ₹${uPrice} / ${escapeHtml(p.unit)}
                        </td>
                        <td>
                          <strong style="color:var(--brand-blue);">₹${Math.round(totAmt).toLocaleString()}</strong>
                        </td>
                        <td style="text-align:right;">
                          <button type="button" class="small-button" onclick="editPurchase('${p.id}')">Edit</button>
                          <button type="button" class="small-button" style="color:var(--brand-red); margin-left:0.5rem;" onclick="promptDeletePurchase('${p.id}')">Delete</button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function populateLedgerSubcategories() {
  if (!ledgerEntrySubCategory) return;
  if (!['Asset', 'Operational'].includes(ledgerEntryCategory?.value)) ledgerEntrySubCategory.value = '';
  if (ledgerEntrySubCategory) ledgerEntrySubCategory.value = '';
}

function renderLedgerSuggestions(input, menu, options) {
  if (!input || !menu) return;
  const query = input.value.trim().toLowerCase();
  const visibleOptions = options.filter(option => option.toLowerCase().includes(query));
  menu.innerHTML = visibleOptions.map(option => `<button type="button" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join('');
  menu.dataset.activeIndex = '-1';
  menu.hidden = visibleOptions.length === 0;
  menu.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.value;
      menu.hidden = true;
      if (input === ledgerEntryCategory) populateLedgerSubcategories();
    });
  });
}

function handleLedgerSuggestionKeydown(event, input, menu) {
  if (!menu || menu.hidden) return;
  const options = [...menu.querySelectorAll('button')];
  if (!options.length) return;

  let activeIndex = Number(menu.dataset.activeIndex || -1);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    activeIndex = event.key === 'ArrowDown'
      ? (activeIndex + 1) % options.length
      : (activeIndex - 1 + options.length) % options.length;
    menu.dataset.activeIndex = String(activeIndex);
    options.forEach((option, index) => option.classList.toggle('active', index === activeIndex));
    options[activeIndex].scrollIntoView({ block: 'nearest' });
  } else if (event.key === 'Enter') {
    event.preventDefault();
    options[activeIndex >= 0 ? activeIndex : 0].click();
  } else if (event.key === 'Escape') {
    menu.hidden = true;
  }
}

function updateLedgerEntryPreview() {
  if (ledgerEntryAmount) {
    ledgerEntryAmount.value = ((parseFloat(ledgerEntryQty?.value) || 0) * (parseFloat(ledgerEntryPrice?.value) || 0)).toFixed(2);
  }
}

function handleLedgerEntrySubmit(event) {
  event.preventDefault();
  const qty = parseFloat(ledgerEntryQty?.value) || 0;
  const price = parseFloat(ledgerEntryPrice?.value) || 0;
  const date = ledgerEntryDate?.value;
  const subCategory = ledgerEntrySubCategory?.value.trim() || '';
  const account = ledgerEntryAccount?.value.trim() || '';
  const season = ledgerEntrySeason?.value.trim() || '';
  const billStatus = ledgerEntryBillStatus?.value || '';

  if (!date || !ledgerEntryCategory?.value.trim() || !subCategory || !account || !season || !billStatus || qty === null || price === null || isNaN(qty) || isNaN(price)) {
    if (ledgerEntryMessage) {
      ledgerEntryMessage.textContent = 'Error: All fields are required except Note.';
      ledgerEntryMessage.style.color = 'red';
    }
    return;
  }
  
  if (price < 0 || qty < 0) {
    if (ledgerEntryMessage) {
      ledgerEntryMessage.textContent = 'Error: Qty and Price cannot be negative.';
      ledgerEntryMessage.style.color = 'red';
    }
    return;
  }

  if (['Asset', 'Operational'].includes(ledgerEntryCategory.value) && subCategory) {
    const exists = getLedgerSubcategories().some(option => option.toLowerCase() === subCategory.toLowerCase());
    if (!exists) customLedgerSubcategories.push({ category: ledgerEntryCategory.value, value: subCategory });
  }

  if (account) {
    const accountExists = getLedgerAccounts().some(option => option.toLowerCase() === account.toLowerCase());
    if (!accountExists) customLedgerAccounts.push(account);
  }

  ledgerEntries.push({
    id: `ledger_${Date.now()}`,
    date,
    category: ledgerEntryCategory.value.trim(),
    subCategory,
    season: ledgerEntrySeason?.value.trim() || '',
    billStatus: ledgerEntryBillStatus?.value || 'Paid',
    qty,
    price,
    amount: qty * price,
    account,
    note: ledgerEntryNote?.value.trim() || ''
  });
  saveStorage();
  ledgerEntryForm.reset();
  if (ledgerEntryDate) ledgerEntryDate.value = new Date().toISOString().split('T')[0];
  updateLedgerEntryPreview();
  if (ledgerEntryMessage) ledgerEntryMessage.textContent = 'Ledger entry saved successfully.';
  renderAll();
}

function renderLedgerEntries() {
  if (!ledgerEntriesBody) return;

  const categories = [...new Set(ledgerEntries.map(entry => entry.category).filter(Boolean))].sort();
  const subcategories = [...new Set(ledgerEntries.map(entry => entry.subCategory).filter(Boolean))].sort();
  const previousCategory = ledgerEntryCategoryFilter?.value || 'ALL';
  const previousSubcategory = ledgerEntrySubCategoryFilter?.value || 'ALL';

  if (ledgerEntryCategoryFilter) {
    ledgerEntryCategoryFilter.innerHTML = '<option value="ALL">All Categories</option>'
      + categories.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
    ledgerEntryCategoryFilter.value = categories.includes(previousCategory) ? previousCategory : 'ALL';
  }
  if (ledgerEntrySubCategoryFilter) {
    ledgerEntrySubCategoryFilter.innerHTML = '<option value="ALL">All Sub-Categories</option>'
      + subcategories.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
    ledgerEntrySubCategoryFilter.value = subcategories.includes(previousSubcategory) ? previousSubcategory : 'ALL';
  }

  const selectedCategory = ledgerEntryCategoryFilter?.value || 'ALL';
  const selectedSubcategory = ledgerEntrySubCategoryFilter?.value || 'ALL';
  const selectedSeason = ledgerEntrySeasonFilter?.value || 'ALL';
  const selectedStatus = ledgerEntryStatusFilter?.value || 'ALL';
  const query = (ledgerEntrySearch?.value || '').trim().toLowerCase();
  const isAscending = ledgerEntrySort?.value === 'asc';
  const visibleEntries = [...ledgerEntries]
    .filter(entry => selectedCategory === 'ALL' || entry.category === selectedCategory)
    .filter(entry => selectedSubcategory === 'ALL' || entry.subCategory === selectedSubcategory)
    .filter(entry => selectedSeason === 'ALL' || entry.season === selectedSeason)
    .filter(entry => selectedStatus === 'ALL' || entry.billStatus === selectedStatus)
    .filter(entry => !query || `${entry.account} ${entry.note}`.toLowerCase().includes(query))
    .sort((a, b) => {
      const difference = new Date(a.date || 0) - new Date(b.date || 0);
      return isAscending ? difference : -difference;
    });

  ledgerEntriesBody.innerHTML = visibleEntries.length ? visibleEntries.map(entry => `
    <tr>
      <td>${escapeHtml(formatDate(entry.date))}</td>
      <td>${escapeHtml(entry.category)}</td>
      <td>${escapeHtml(entry.subCategory || '—')}</td>
      <td>${escapeHtml(entry.season || '—')}</td>
      <td><span class="ledger-status-badge">${escapeHtml(entry.billStatus || '—')}</span></td>
      <td>${Number(entry.qty || 0).toLocaleString()}</td>
      <td>₹${Number(entry.price || 0).toLocaleString()}</td>
      <td><strong>₹${Number(entry.amount || 0).toLocaleString()}</strong></td>
      <td>${escapeHtml(entry.account || '—')}</td>
      <td>${escapeHtml(entry.note || '—')}</td>
    </tr>
  `).join('') : '<tr><td colspan="10" class="finance-empty-cell">No saved ledger entries match the selected filters.</td></tr>';
  const summary = visibleEntries.reduce((acc, entry) => {
    const season = entry.season || 'Unknown';
    acc[season] = (acc[season] || 0) + (parseFloat(entry.amount) || 0);
    return acc;
  }, {});

  const ledgerSummaryStats = document.getElementById('ledgerSummaryStats');
  if (ledgerSummaryStats) {
    ledgerSummaryStats.innerHTML = ['Crop 1', 'Crop 2', 'Infra']
      .map(s => `<span>${s}: <strong style="color:var(--brand-blue)">₹${Math.round(summary[s] || 0).toLocaleString()}</strong></span>`)
      .join(' | ');
  }

}

function showPendingPayableDetails() {
  console.log('showPendingPayableDetails called');
  const vendorMap = {};
  const amountOf = row => row.totalAmount !== undefined && row.totalAmount !== null
    ? parseFloat(row.totalAmount) || 0
    : (parseFloat(row.qty) || 0) * (parseFloat(row.unitPrice) || 0);

  const ensureVendor = name => {
    const vendor = (name || 'Unassigned Vendor').trim();
    if (!vendorMap[vendor]) vendorMap[vendor] = { debit: 0, credit: 0 };
    return vendorMap[vendor];
  };

  purchases.forEach(purchase => { ensureVendor(purchase.supplier).debit += amountOf(purchase); });
  stockReturns.forEach(item => { ensureVendor(item.supplier).credit += amountOf(item); });
  vendorTransactions.forEach(transaction => {
    const target = ensureVendor(transaction.vendor);
    if (transaction.type === 'Debit') target.debit += parseFloat(transaction.amount) || 0;
    else target.credit += parseFloat(transaction.amount) || 0;
  });

  const listEl = document.getElementById('pendingPayableList');
  if (!listEl) {
    console.error('listEl not found');
    return;
  }
  
  console.log('vendorMap:', vendorMap);

  const html = Object.keys(vendorMap)
    .map(vendor => ({ vendor, pending: vendorMap[vendor].debit - vendorMap[vendor].credit }))
    .filter(item => item.pending > 0.01) // Small buffer for rounding issues
    .map(item => `
      <div style="display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid #e2e8f0;">
        <span>${item.vendor}</span>
        <strong>₹${Math.round(item.pending).toLocaleString()}</strong>
      </div>
    `).join('') || '<p>No pending payables found.</p>';

  listEl.innerHTML = html;
  const modal = document.getElementById('pendingPayableModal');
  if (modal) modal.showModal();
}

function renderFinanceOverview() {
  const money = value => `₹${Math.round(value).toLocaleString()}`;
  const amountOf = row => row.totalAmount !== undefined && row.totalAmount !== null
    ? parseFloat(row.totalAmount) || 0
    : (parseFloat(row.qty) || 0) * (parseFloat(row.unitPrice) || 0);
  const purchaseDebits = purchases.reduce((sum, purchase) => sum + amountOf(purchase), 0);
  const returnCredits = stockReturns.reduce((sum, item) => sum + amountOf(item), 0);
  const paymentCredits = vendorTransactions
    .filter(transaction => transaction.type !== 'Debit')
    .reduce((sum, transaction) => sum + (parseFloat(transaction.amount) || 0), 0);
  const vendorCredits = returnCredits + paymentCredits;
  const rateDiffCredits = vendorTransactions
    .filter(transaction => /rate\s*diff|difference\s*cn/i.test(transaction.remarks || ''))
    .reduce((sum, transaction) => sum + (parseFloat(transaction.amount) || 0), 0);

  if (overviewPurchaseDebits) overviewPurchaseDebits.textContent = money(purchaseDebits);
  if (overviewVendorCredits) overviewVendorCredits.textContent = money(vendorCredits);
  if (overviewRateDiffCredits) overviewRateDiffCredits.textContent = money(rateDiffCredits);
  if (overviewPendingPayable) overviewPendingPayable.textContent = money(purchaseDebits - vendorCredits);

  const vendorMap = {};
  const ensureVendor = name => {
    const vendor = (name || 'Unassigned Vendor').trim();
    if (!vendorMap[vendor]) vendorMap[vendor] = { debit: 0, credit: 0 };
    return vendorMap[vendor];
  };
  purchases.forEach(purchase => { ensureVendor(purchase.supplier).debit += amountOf(purchase); });
  stockReturns.forEach(item => { ensureVendor(item.supplier).credit += amountOf(item); });
  vendorTransactions.forEach(transaction => {
    const target = ensureVendor(transaction.vendor);
    if (transaction.type === 'Debit') target.debit += parseFloat(transaction.amount) || 0;
    else target.credit += parseFloat(transaction.amount) || 0;
  });


  if (overviewVendorBody) {
    const vendors = Object.entries(vendorMap).sort((a, b) => (b[1].debit - b[1].credit) - (a[1].debit - a[1].credit));
    overviewVendorBody.innerHTML = vendors.length ? vendors.map(([vendor, totals]) => `
      <tr><td><strong>${escapeHtml(vendor)}</strong></td><td>${money(totals.debit)}</td><td>${money(totals.credit)}</td><td><strong>${money(totals.debit - totals.credit)}</strong></td></tr>
    `).join('') : '<tr><td colspan="4" class="finance-empty-cell">No vendor transactions recorded.</td></tr>';
  }

  if (overviewMonthlyChart) {
    const months = {};
    const addMonthly = (date, debit, credit) => {
      if (!date) return;
      const key = date.slice(0, 7);
      if (!months[key]) months[key] = { debit: 0, credit: 0 };
      months[key].debit += debit;
      months[key].credit += credit;
    };
    purchases.forEach(purchase => addMonthly(purchase.date, amountOf(purchase), 0));
    stockReturns.forEach(item => addMonthly(item.date, 0, amountOf(item)));
    vendorTransactions.forEach(transaction => addMonthly(transaction.date, transaction.type === 'Debit' ? parseFloat(transaction.amount) || 0 : 0, transaction.type === 'Debit' ? 0 : parseFloat(transaction.amount) || 0));
    const monthRows = Object.entries(months).sort((a, b) => a[0].localeCompare(b[0])).slice(-8);
    const maxValue = Math.max(1, ...monthRows.flatMap(([, values]) => [values.debit, values.credit]));
    overviewMonthlyChart.innerHTML = monthRows.length ? monthRows.map(([month, values]) => `
      <div class="finance-month-row"><span>${escapeHtml(month)}</span><div class="finance-month-bars"><i class="finance-bar finance-bar-debit" style="width:${(values.debit / maxValue) * 100}%" title="Purchases ${money(values.debit)}"></i><i class="finance-bar finance-bar-credit" style="width:${(values.credit / maxValue) * 100}%" title="Credits ${money(values.credit)}"></i></div><strong>${money(values.debit - values.credit)}</strong></div>
    `).join('') : '<div class="finance-empty-cell">No monthly activity recorded.</div>';
  }
}

function getFinancialLedgerRows() {
  const purchaseRows = purchases.map(p => ({
    date: p.date,
    type: 'Debit',
    party: p.supplier || 'Direct / Unspecified Vendor',
    category: p.category || 'Uncategorized Purchase',
    reference: p.invoiceNo || 'Direct Purchase',
    amount: p.totalAmount !== undefined && p.totalAmount !== null
      ? parseFloat(p.totalAmount) || 0
      : (parseFloat(p.qty) || 0) * (parseFloat(p.unitPrice) || 0),
    remarks: `${p.name || 'Purchase'}${p.qty ? ` • ${p.qty} ${p.unit || ''}` : ''}`.trim()
  }));

  const returnRows = stockReturns.map(r => ({
    date: r.date,
    type: 'Credit',
    party: r.supplier || 'Stock Return',
    category: 'Stock Return',
    reference: r.invoiceNo || 'Return',
    amount: r.totalAmount !== undefined && r.totalAmount !== null
      ? parseFloat(r.totalAmount) || 0
      : (parseFloat(r.qty) || 0) * (parseFloat(r.unitPrice) || 0),
    remarks: `${r.name || 'Returned stock'}${r.qty ? ` • ${r.qty} ${r.unit || ''}` : ''}`.trim()
  }));

  const manualRows = vendorTransactions.map(t => ({
    date: t.date,
    type: t.type === 'Debit' ? 'Debit' : 'Credit',
    party: t.vendor || 'Unassigned Vendor',
    category: 'Vendor Transaction',
    reference: t.billNo || 'Manual Entry',
    amount: parseFloat(t.amount) || 0,
    remarks: t.remarks || 'Vendor adjustment or payment'
  }));

  const enteredRows = ledgerEntries.map(entry => ({
    date: entry.date,
    type: 'Debit',
    party: entry.account || 'Unassigned Account',
    category: entry.category || 'Uncategorized Ledger Entry',
    reference: entry.subCategory || entry.billStatus || 'Ledger Entry',
    amount: parseFloat(entry.amount) || 0,
    remarks: `${entry.note || 'Ledger entry'}${entry.season ? ` • ${entry.season}` : ''}`
  }));

  return [...purchaseRows, ...returnRows, ...manualRows, ...enteredRows]
    .filter(row => row.date || row.amount || row.party)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

function renderFinancialLedger() {
  const rows = getFinancialLedgerRows();
  const totalDebits = rows.filter(row => row.type === 'Debit').reduce((sum, row) => sum + row.amount, 0);
  const totalCredits = rows.filter(row => row.type === 'Credit').reduce((sum, row) => sum + row.amount, 0);
  const formatMoney = value => `₹${Math.round(value).toLocaleString()}`;

  if (financeTotalDebits) financeTotalDebits.textContent = formatMoney(totalDebits);
  if (financeTotalCredits) financeTotalCredits.textContent = formatMoney(totalCredits);
  if (financeNetBalance) financeNetBalance.textContent = formatMoney(totalDebits - totalCredits);
  if (financeTransactionCount) financeTransactionCount.textContent = rows.length.toLocaleString();

  if (financeCategorySummary) {
    const categoryTotals = {};
    rows.forEach(row => {
      if (!categoryTotals[row.category]) categoryTotals[row.category] = { debit: 0, credit: 0 };
      if (row.type === 'Debit') categoryTotals[row.category].debit += row.amount;
      else categoryTotals[row.category].credit += row.amount;
    });
    financeCategorySummary.innerHTML = Object.entries(categoryTotals)
      .sort((a, b) => (b[1].debit - b[1].credit) - (a[1].debit - a[1].credit))
      .map(([category, totals]) => `
        <div class="finance-category-card">
          <strong>${escapeHtml(category)}</strong>
          <span>Debit ${formatMoney(totals.debit)}</span>
          <span class="finance-credit-text">Credit ${formatMoney(totals.credit)}</span>
        </div>
      `).join('') || '<div class="empty-state">No financial transactions recorded yet.</div>';
  }

  if (financeCategoryFilter) {
    const previousCategory = financeCategoryFilter.value || 'ALL';
    const categories = [...new Set(rows.map(row => row.category))].sort();
    financeCategoryFilter.innerHTML = '<option value="ALL">All Categories</option>'
      + categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('');
    financeCategoryFilter.value = categories.includes(previousCategory) ? previousCategory : 'ALL';
  }

  if (!financeLedgerBody) return;
  const typeFilter = financeTypeFilter ? financeTypeFilter.value : 'ALL';
  const categoryFilter = financeCategoryFilter ? financeCategoryFilter.value : 'ALL';
  const query = financeSearchInput ? financeSearchInput.value.trim().toLowerCase() : '';
  const visibleRows = rows.filter(row => {
    const matchesType = typeFilter === 'ALL' || row.type === typeFilter;
    const matchesCategory = categoryFilter === 'ALL' || row.category === categoryFilter;
    const searchText = `${row.party} ${row.reference} ${row.remarks}`.toLowerCase();
    return matchesType && matchesCategory && (!query || searchText.includes(query));
  });

  financeLedgerBody.innerHTML = visibleRows.map(row => `
    <tr>
      <td>${escapeHtml(formatDate(row.date))}</td>
      <td><span class="finance-type-badge ${row.type === 'Debit' ? 'finance-debit' : 'finance-credit'}">${row.type}</span></td>
      <td>${escapeHtml(row.party)}</td>
      <td>${escapeHtml(row.category)}</td>
      <td>${escapeHtml(row.reference)}</td>
      <td>${row.type === 'Debit' ? formatMoney(row.amount) : '—'}</td>
      <td>${row.type === 'Credit' ? formatMoney(row.amount) : '—'}</td>
      <td>${escapeHtml(row.remarks)}</td>
    </tr>
  `).join('') || '<tr><td colspan="8" class="finance-empty-cell">No matching financial transactions.</td></tr>';
}

function renderAll() {
  populatePondDropdowns();
  renderSummary();
  renderClinicalTable();
  renderGrowthChart();
  renderSurvivalChart();
  renderHistory();
  renderHarvestList();
  renderPondList();
  renderTreatmentLogs();
  renderStockReturnHistory();
  renderInventoryAndPurchases();
  renderFinancialLedger();
  renderLedgerEntries();
  renderFinanceOverview();
  updateFormCalculations();
}

function populatePondDropdowns() {
  const options = ponds.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('');
  const prevChartPond = chartPondSelect ? chartPondSelect.value : '';
  const prevSurvPond = survivalPondSelect ? survivalPondSelect.value : '';

  if (samplePondSelect) samplePondSelect.innerHTML = options || '<option value="">No ponds</option>';
  if (treatmentPondSelect) treatmentPondSelect.innerHTML = options || '<option value="">No ponds</option>';
  if (treatmentPondFilter) treatmentPondFilter.innerHTML = '<option value="ALL">All Ponds</option>' + options;

  if (chartPondSelect) {
    chartPondSelect.innerHTML = options || '<option value="">No ponds</option>';
    if (prevChartPond && ponds.some(p => p.id === prevChartPond)) chartPondSelect.value = prevChartPond;
  }
  if (survivalPondSelect) {
    survivalPondSelect.innerHTML = options || '<option value="">No ponds</option>';
    if (prevSurvPond && ponds.some(p => p.id === prevSurvPond)) survivalPondSelect.value = prevSurvPond;
  }
  if (harvestPondSelect) harvestPondSelect.innerHTML = options || '<option value="">No ponds</option>';
  if (historyPondSelect) historyPondSelect.innerHTML = '<option value="ALL">All Ponds</option>' + options;
}

function renderSummary() {
  if (pondCountEl) pondCountEl.textContent = ponds.length;
  if (sampleCountEl) sampleCountEl.textContent = samples.length;

  const sorted = [...samples].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (latestAbwEl) {
    latestAbwEl.textContent = (sorted.length > 0 && sorted[0].testWeight && sorted[0].count) 
      ? `${(sorted[0].testWeight / sorted[0].count).toFixed(2)}g` 
      : '—';
  }

  if (pondSnapshotsEl) {
    pondSnapshotsEl.innerHTML = ponds.map(pond => {
      const pSamples = samples.filter(s => s.pondId === pond.id).sort((a, b) => new Date(b.date) - new Date(a.date));
      if (pSamples.length === 0) {
        return `
          <article class="pond-summary-card">
            <div class="pond-summary-top">
              <h3>${escapeHtml(pond.name)}</h3>
            </div>
            <p style="font-size:0.8rem; color:var(--text-muted);">No samples recorded yet.</p>
          </article>
        `;
      }

      const latest = pSamples[0];
      const abw = (latest.testWeight / latest.count).toFixed(2);
      const { fcr, estSurvivalPct } = calculateMetrics(pond.id, latest.date, latest.testWeight, latest.count, latest.lastFeed, latest.currentFeed, latest.id);
      const recon = getPondHarvestReconciliation(pond.id);

      return `
        <article class="pond-summary-card">
          <div class="pond-summary-top">
            <div>
              <h3>${escapeHtml(pond.name)}</h3>
              <small style="color:var(--text-muted); font-size:0.72rem;">${pond.hatcheryName || 'Stocked'}</small>
            </div>
            <span class="pond-summary-date">${formatDate(latest.date)}</span>
          </div>
          <div class="pond-summary-values">
            <div class="pond-summary-value"><span>Count</span><strong>${latest.count}</strong></div>
            <div class="pond-summary-value"><span>ABW</span><strong>${abw}g</strong></div>
            <div class="pond-summary-value"><span>${recon && recon.hasFull ? 'Final FCR' : 'Est. FCR'}</span><strong style="color:var(--brand-blue);">${fcr !== null ? fcr.toFixed(2) : '—'}</strong></div>
            <div class="pond-summary-value"><span>${recon && recon.hasFull ? 'Final Sur.' : 'Est. Sur.'}</span><strong style="color:var(--brand-green);">${(recon && recon.hasFull && recon.finalSurvivalPct !== null) ? `${recon.finalSurvivalPct.toFixed(1)}%` : (estSurvivalPct !== null ? `${estSurvivalPct.toFixed(0)}%` : '—')}</strong></div>
          </div>
        </article>
      `;
    }).join('');
  }
}

function renderGrowthChart() {
  if (!growthChartSvg) return;
  const pondId = chartPondSelect ? chartPondSelect.value : (ponds[0] ? ponds[0].id : null);
  const pondSamples = samples.filter(s => s.pondId === pondId).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (pondSamples.length === 0) {
    growthChartSvg.hidden = true; growthEmptyEl.hidden = false; return;
  }
  growthChartSvg.hidden = false; growthEmptyEl.hidden = true;

  const abwValues = pondSamples.map(s => s.testWeight / s.count);
  const maxAbw = Math.max(...abwValues, 5) * 1.25;

  let pointsStr = '', pointsHtml = '';
  pondSamples.forEach((s, i) => {
    const x = pondSamples.length === 1 ? 320 : 45 + (i / (pondSamples.length - 1)) * 550;
    const abw = s.testWeight / s.count;
    const y = 235 - (abw / maxAbw) * 185;

    let growthText = '';
    if (i > 0) {
      const prevAbw = pondSamples[i - 1].testWeight / pondSamples[i - 1].count;
      const weeklyGain = abw - prevAbw;
      growthText = ` (+${weeklyGain.toFixed(2)}g)`;
    }

    pointsStr += `${x},${y} `;
    pointsHtml += `
      <circle class="growth-point" cx="${x}" cy="${y}" r="5" />
      <text class="point-label" x="${x}" y="${y - 12}" text-anchor="middle" font-size="11">${abw.toFixed(2)}g</text>
      ${growthText ? `<text x="${x}" y="${y + 18}" text-anchor="middle" fill="#0d52b9" font-size="10" font-weight="700">${growthText}</text>` : ''}
      <text class="axis-label" x="${x}" y="268" text-anchor="middle">${formatShortDate(s.date)}</text>
    `;
  });

  growthChartSvg.innerHTML = `<line class="axis-line" x1="45" y1="235" x2="595" y2="235" /><polyline class="growth-line" points="${pointsStr.trim()}" />${pointsHtml}`;
}

function renderSurvivalChart() {
  if (!survivalChartSvg) return;
  const pondId = survivalPondSelect ? survivalPondSelect.value : (ponds[0] ? ponds[0].id : null);
  const pond = ponds.find(p => p.id === pondId);
  const pondSamples = samples.filter(s => s.pondId === pondId).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!pond || pondSamples.length === 0) {
    survivalChartSvg.hidden = true; survivalEmptyEl.hidden = false;
    if (survivalAnalysisNoteEl) survivalAnalysisNoteEl.textContent = '';
    return;
  }
  survivalChartSvg.hidden = false; survivalEmptyEl.hidden = true;

  const recon = getPondHarvestReconciliation(pondId);
  const actualHarvestSurvival = (recon && recon.hasFull) ? recon.finalSurvivalPct : null;

  const survivalData = pondSamples.map((s, i) => {
    const { estSurvivalPct } = calculateMetrics(s.pondId, s.date, s.testWeight, s.count, s.lastFeed, s.currentFeed, s.id);
    const surv = estSurvivalPct !== null ? estSurvivalPct : 100;
    return { sample: s, surv, index: i };
  });

  const allValues = survivalData.map(d => d.surv);
  if (actualHarvestSurvival !== null) allValues.push(actualHarvestSurvival);
  const maxSurvivalScale = Math.max(100, Math.ceil(Math.max(...allValues) * 1.15));

  let pointsStr = '', pointsHtml = '';
  survivalData.forEach((d) => {
    const x = survivalData.length === 1 ? 320 : 45 + (d.index / (survivalData.length - 1)) * 550;
    const y = 235 - (d.surv / maxSurvivalScale) * 195;
    pointsStr += `${x},${y} `;
    pointsHtml += `
      <circle class="survival-point" cx="${x}" cy="${y}" r="5" />
      <text class="point-label" x="${x}" y="${y - 10}" text-anchor="middle" fill="#107c41" font-weight="bold">${d.surv.toFixed(0)}%</text>
      <text class="axis-label" x="${x}" y="268" text-anchor="middle">${formatShortDate(d.sample.date)}</text>
    `;
  });

  let harvestHtml = '';
  if (actualHarvestSurvival !== null) {
    const harvestY = Math.max(15, 235 - (actualHarvestSurvival / maxSurvivalScale) * 195);
    harvestHtml = `
      <line class="harvest-line" x1="45" y1="${harvestY}" x2="595" y2="${harvestY}" />
      <text x="595" y="${harvestY - 7}" text-anchor="end" fill="#dc2626" font-size="12" font-weight="bold">
        Final Harvest: ${actualHarvestSurvival.toFixed(1)}% (${recon.totalBiomass.toLocaleString()} kg)
      </text>
    `;
  }

  survivalChartSvg.innerHTML = `
    <line class="axis-line" x1="45" y1="235" x2="595" y2="235" />
    ${harvestHtml}
    <polyline class="survival-line" points="${pointsStr.trim()}" />
    ${pointsHtml}
  `;
}

function renderHarvestList() {
  if (!harvestRecordsListEl) return;

  if (harvests.length === 0) {
    harvestRecordsListEl.innerHTML = '<p style="color:var(--text-muted);">No harvest records logged yet.</p>';
    return;
  }

  let html = '';
  ponds.forEach(p => {
    const pondHarvests = harvests.filter(h => h.pondId === p.id).sort((a, b) => new Date(a.date) - new Date(b.date));
    if (pondHarvests.length === 0) return;

    const recon = getPondHarvestReconciliation(p.id);

    html += `
      <div class="record-card" style="margin-bottom:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:0.5rem; margin-bottom:0.75rem;">
          <h3 class="cell-title">${escapeHtml(p.name)} Harvest Summary</h3>
          <span style="font-size:0.75rem; color:var(--text-muted);">Stocked: ${p.stockingCount ? p.stockingCount.toLocaleString() : '—'} pcs</span>
        </div>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
          <div style="background:#f8fafc; padding:0.5rem; border-radius:6px;">
            <span style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Biomass</span>
            <strong style="display:block; font-size:1.1rem;">${recon.totalBiomass.toLocaleString()} kg</strong>
          </div>
          <div style="background:#f8fafc; padding:0.5rem; border-radius:6px;">
            <span style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Pieces</span>
            <strong style="display:block; font-size:1.1rem;">${Math.round(recon.totalPieces).toLocaleString()}</strong>
          </div>
          <div style="background:#f8fafc; padding:0.5rem; border-radius:6px;">
            <span style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Survival</span>
            <strong style="display:block; font-size:1.1rem; color:var(--brand-green);">${recon.finalSurvivalPct !== null ? `${recon.finalSurvivalPct.toFixed(1)}%` : 'In Progress'}</strong>
          </div>
          <div style="background:#f8fafc; padding:0.5rem; border-radius:6px;">
            <span style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase;">Overall FCR</span>
            <strong style="display:block; font-size:1.1rem; color:var(--brand-blue);">${recon.finalFcr !== null ? recon.finalFcr.toFixed(2) : '—'}</strong>
          </div>
        </div>

        <h4 style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem; text-transform:uppercase; font-weight:700;">Harvest Events</h4>
    `;

    pondHarvests.forEach(h => {
      const { abwGrams, pieces } = calculateHarvestPiecesAndAbw(h.weight, h.count);
      html += `
        <div style="background:#f8fafc; border-radius:6px; padding:0.75rem; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <strong style="font-size:0.85rem; color:${h.type === 'Full' ? 'var(--brand-red)' : 'var(--brand-blue)'};">${h.type} Harvest</strong>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:0.5rem;">${formatDate(h.date)}</span>
          </div>
          <div style="display:flex; gap:1rem; font-size:0.8rem;">
            <span>Biomass: <strong>${h.weight} kg</strong></span>
            <span>Count: <strong>${h.count} pcs/kg</strong></span>
            <span>ABW: <strong>${abwGrams.toFixed(2)}g</strong></span>
            <span>Pieces: <strong>${pieces.toLocaleString()}</strong></span>
          </div>
          <div>
            <button type="button" class="small-button" onclick="editHarvest('${h.id}')">Edit</button>
            <button type="button" class="small-button" style="color:var(--brand-red)" onclick="promptDeleteHarvest('${h.id}')">Delete</button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  harvestRecordsListEl.innerHTML = html;
}

function renderPondList() {
  if (!pondListEl) return;
  pondListEl.innerHTML = ponds.map(p => {
    const dimText = (p.length && p.breadth) ? `${p.length}m × ${p.breadth}m` : '';
    const areaText = p.area ? `Area: ${p.area.toLocaleString()} m²` : '';
    const densityText = (p.area && p.stockingCount) ? `Density: ${(p.stockingCount / p.area).toFixed(1)} pcs/m²` : '';

    return `
      <article class="record-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <h3 class="cell-title">${escapeHtml(p.name)}</h3>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">
            ${p.stockingDate ? `Stocked: ${formatDate(p.stockingDate)} (${p.stockingCount ? p.stockingCount.toLocaleString() : '—'} pcs)` : 'No stocking date'}
          </p>
          <p style="font-size:0.8rem; color:var(--brand-blue); font-weight:600; margin-top:0.2rem;">${[dimText, areaText, densityText].filter(Boolean).join(' • ')}</p>
        </div>
        <div>
          <button type="button" class="small-button" onclick="editPond('${p.id}')">Edit</button>
          <button type="button" class="small-button" style="color:var(--brand-red)" onclick="promptDeletePond('${p.id}')">Delete</button>
        </div>
      </article>
    `;
  }).join('');
}

function exportCSV() {
  const headers = ['Pond', 'Hatchery', 'Date', 'Test Weight', 'Count', 'ABW', 'Last Feed', 'Current Feed', 'Net Feed', 'Daily Avg Feed', 'Expected Feed', 'FCR', 'Est Survival %'];
  const rows = samples.map(s => {
    const pond = ponds.find(p => p.id === s.pondId);
    const m = calculateMetrics(s.pondId, s.date, s.testWeight, s.count, s.lastFeed, s.currentFeed, s.id);
    return [
      `"${pond ? pond.name : ''}"`,
      `"${pond && pond.hatcheryName ? pond.hatcheryName : ''}"`,
      `"${s.date}"`,
      s.testWeight,
      s.count,
      m.abw.toFixed(2),
      s.lastFeed,
      s.currentFeed,
      m.netFeed > 0 ? m.netFeed : '',
      m.weeklyAvgFeed > 0 ? m.weeklyAvgFeed.toFixed(1) : '',
      m.expectedWeeklyFeed !== null ? m.expectedWeeklyFeed.toFixed(0) : '',
      m.fcr !== null ? m.fcr.toFixed(2) : '',
      m.estSurvivalPct !== null ? m.estSurvivalPct.toFixed(1) : ''
    ];
  });
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `bluecrest_shrimp_data_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}

function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.ponds && data.samples) {
        ponds = data.ponds;
        samples = data.samples;
        harvests = data.harvests || [];
        purchases = data.purchases || data.products || defaultPurchases;
        stockReturns = data.stockReturns || defaultStockReturns;
        treatments = data.treatments || defaultTreatments;
        vendorTransactions = data.vendorTransactions || defaultVendorTransactions;
        masterCatalogue = data.masterCatalogue || DEFAULT_MASTER_CATALOGUE;
        saveStorage();
        renderAll();
        alert('BlueCrest data imported successfully!');
      }
    } catch (err) { alert('Invalid file format'); }
  };
  reader.readAsText(file);
}

function escapeHtml(str) { return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
function formatDate(dateStr) { return dateStr ? new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''; }
function formatShortDate(dateStr) { return dateStr ? new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }) : ''; }

window.navigateTo = navigateTo;
window.editSample = editSample;
window.promptDeleteSample = promptDeleteSample;
window.editPurchase = editPurchase;
window.promptDeletePurchase = promptDeletePurchase;
window.editStockReturn = editStockReturn;
window.promptDeleteStockReturn = promptDeleteStockReturn;
window.editTreatment = editTreatment;
window.promptDeleteTreatment = promptDeleteTreatment;
window.editPond = editPond;
window.promptDeletePond = promptDeletePond;
window.editHarvest = editHarvest;
window.promptDeleteHarvest = promptDeleteHarvest;
window.editCatalogueProduct = editCatalogueProduct;
window.promptDeleteCatalogueProduct = promptDeleteCatalogueProduct;
window.openVendorStatement = openVendorStatement;
window.deleteVendorTxn = deleteVendorTxn;