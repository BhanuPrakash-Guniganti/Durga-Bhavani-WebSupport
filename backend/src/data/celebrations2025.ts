export interface ILocalizedString {
  en: string;
  te: string;
}

export interface IAvatar {
  id: string;
  albumSlug: string;
  year: number;
  dayNumber: number;
  name: ILocalizedString;
  description?: ILocalizedString;
  photos: Array<{
    id: string;
    url: string;
    caption: ILocalizedString;
    altText: ILocalizedString;
  }>;
  sortOrder: number;
  status: 'published' | 'draft' | 'archived';
}

export interface IAuctionItem {
  id: string;
  albumSlug: string;
  year: number;
  itemName: ILocalizedString;
  avatarId?: string;
  avatarName?: ILocalizedString;
  winnerName: ILocalizedString | string;
  fatherName?: ILocalizedString | string;
  winningAmount?: number;
  photoUrl?: string;
  itemType: 'saree' | 'special_item';
  status: 'published' | 'draft' | 'archived';
  isComplete: boolean;
  sortOrder: number;
}

export interface IDonor {
  id: string;
  albumSlug: string;
  year: number;
  name: ILocalizedString;
  contributionType: ILocalizedString;
  amount?: number;
  photoOrLogoUrl?: string;
  notes?: ILocalizedString;
  status: 'published' | 'draft' | 'archived';
  sortOrder: number;
}

export interface IAlbum {
  id: string;
  slug: string;
  title: ILocalizedString;
  description: ILocalizedString;
  year: number;
  albumType: 'avatars' | 'auction' | 'donors' | 'general';
  coverImage?: string;
  photoCount: number;
  status: 'published' | 'draft' | 'archived';
  sortOrder: number;
}

export interface IAuditLog {
  id: string;
  actorName: string;
  actorRole: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'upload';
  resourceType: string;
  resourceId?: string;
  resourceTitle?: string;
  timestamp: string;
  details?: string;
}

// Celebration Albums (2024, 2025, 2026)
export const initialAlbums: IAlbum[] = [
  // --- 2026 Albums ---
  {
    id: 'alb-2026-devi-alankaranalu',
    slug: 'devi-alankaranalu-2026',
    title: {
      en: 'Devi Alankaranalu',
      te: 'అమ్మవారి అలంకరణలు'
    },
    description: {
      en: "Photographs and details of the goddess's daily avatars and sacred alankarams for the 2026 celebrations.",
      te: '2026 ఉత్సవాలలో శ్రీ దుర్గాభవాని అమ్మవారి దివ్య అవతారాలు మరియు విశేష అలంకారాల వివరాలు.'
    },
    year: 2026,
    albumType: 'avatars',
    photoCount: 10,
    status: 'published',
    sortOrder: 1
  },
  {
    id: 'alb-2026-auction-winners',
    slug: 'auction-winners-2026',
    title: {
      en: 'Auction Winners',
      te: 'వేలం పాట విజేతలు'
    },
    description: {
      en: 'Auction records and winners for sacred sarees and festival items for the 2026 celebrations.',
      te: '2026 ఉత్సవాలలో పవిత్ర చీరలు మరియు ప్రత్యేక వస్తువుల వేలం పాట వివరాలు.'
    },
    year: 2026,
    albumType: 'auction',
    photoCount: 0,
    status: 'published',
    sortOrder: 2
  },
  {
    id: 'alb-2026-01',
    slug: 'utsav-celebrations-2026',
    title: {
      en: 'Sri Durga Bhavani Utsav 2026 Highlights',
      te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2026 విశేషాలు'
    },
    description: {
      en: 'Moments of devotional worship, community seva, and festivities from the third year of celebrations.',
      te: 'మూడవ సంవత్సర ఉత్సవాలలో విశేష పూజలు, సమాజ సేవ మరియు ఉత్సవ సంబరాల దృశ్యాలు.'
    },
    year: 2026,
    albumType: 'general',
    photoCount: 2,
    status: 'published',
    sortOrder: 3
  },

  // --- 2025 Albums ---
  {
    id: 'alb-2025-devi-alankaranalu',
    slug: 'devi-alankaranalu-2025',
    title: {
      en: 'Devi Alankaranalu',
      te: 'అమ్మవారి అలంకరణలు'
    },
    description: {
      en: "Photographs and details of the goddess's eleven daily avatars and sacred alankarams during the 2025 celebrations.",
      te: 'శ్రీ దుర్గాభవాని అమ్మవారి పదకొండు దివ్య అవతారాలు మరియు విశేష అలంకారాల ఛాయాచిత్రాలు.'
    },
    year: 2025,
    albumType: 'avatars',
    photoCount: 11,
    status: 'published',
    sortOrder: 1
  },
  {
    id: 'alb-2025-auction-winners',
    slug: 'auction-winners-2025',
    title: {
      en: '2025 Durga Bhavani Utsav – Dodlapahad',
      te: '2025 దుర్గ భవాని ఉత్సవం – దొడ్లపహాడ్'
    },
    description: {
      en: 'Matha Avatar Saree Auction List — Auction records and winners for sacred sarees and auspicious festival items.',
      te: 'అమ్మవారి చీరల వేలం విజేతల వివరాలు — 2025 ఉత్సవాలలో పవిత్ర చీరలు మరియు విశేష వస్తువుల వేలం పాట విజేతల వివరాలు.'
    },
    year: 2025,
    albumType: 'auction',
    photoCount: 14,
    status: 'published',
    sortOrder: 2
  },
  {
    id: 'alb-2025-donors-and-sponsors',
    slug: 'donors-and-sponsors-2025',
    title: {
      en: '2025 Durga Bhavani Utsav – Dodlapahad',
      te: '2025 దుర్గ భవాని ఉత్సవం – దొడ్లపహాడ్'
    },
    description: {
      en: 'Sponsors & Donors List | స్పాన్సర్లు మరియు దాతల జాబితా',
      te: 'స్పాన్సర్లు మరియు దాతల జాబితా | Sponsors & Donors List'
    },
    year: 2025,
    albumType: 'donors',
    photoCount: 4,
    status: 'published',
    sortOrder: 3
  },
  {
    id: 'alb-2025-01',
    slug: 'annadanam-and-utsav-2025',
    title: {
      en: 'Maha Annadanam & Utsav Seva 2025',
      te: 'మహా అన్నదానం & ఉత్సవ సేవ 2025'
    },
    description: {
      en: 'Photographs of community feeding and devotional celebrations during the second year of Sri Durga Bhavani Utsav.',
      te: 'రెండవ సంవత్సర శ్రీ దుర్గాభవాని ఉత్సవాల మహా అన్నదాన సేవ మరియు భక్తజన సమర్పణ.'
    },
    year: 2025,
    albumType: 'general',
    photoCount: 2,
    status: 'published',
    sortOrder: 4
  },

  // --- 2024 Albums ---
  {
    id: 'alb-2024-devi-alankaranalu',
    slug: 'devi-alankaranalu-2024',
    title: {
      en: 'Devi Alankaranalu',
      te: 'అమ్మవారి అలంకరణలు'
    },
    description: {
      en: "Photographs and details of the goddess's daily avatars and sacred alankarams during the 2024 celebrations.",
      te: '2024 ఉత్సవాలలో శ్రీ దుర్గాభవాని అమ్మవారి దివ్య అవతారాలు మరియు విశేష అలంకారాల వివరాలు.'
    },
    year: 2024,
    albumType: 'avatars',
    photoCount: 10,
    status: 'published',
    sortOrder: 1
  },
  {
    id: 'alb-2024-auction-winners',
    slug: 'auction-winners-2024',
    title: {
      en: 'Auction Winners',
      te: 'వేలం పాట విజేతలు'
    },
    description: {
      en: 'Auction records and winners for sacred sarees and festival items for the 2024 celebrations.',
      te: '2024 ఉత్సవాలలో పవిత్ర చీరలు మరియు ప్రత్యేక వస్తువుల వేలం పాట వివరాలు.'
    },
    year: 2024,
    albumType: 'auction',
    photoCount: 0,
    status: 'published',
    sortOrder: 2
  },
  {
    id: 'alb-2024-01',
    slug: 'vijaya-dashami-shobha-yatra-2024',
    title: {
      en: 'Vijaya Dashami Shobha Yatra 2024',
      te: 'విజయదశమి శోభాయాత్ర 2024'
    },
    description: {
      en: 'Grand procession of Sri Durga Bhavani through the streets of Dodlapahad marking the culmination of the inaugural celebrations.',
      te: 'ప్రారంభ సంవత్సర ఉత్సవ ముగింపు సందర్భంగా దొడ్లపహాడ్ పురవీధుల్లో సాగిన శ్రీ దుర్గాభవాని అమ్మవారి దివ్య రథోత్సవం.'
    },
    year: 2024,
    albumType: 'general',
    photoCount: 3,
    status: 'published',
    sortOrder: 3
  }
];

// 2025 Avatars (Exact 11 names in exact requested order)
export const initialAvatars2025: IAvatar[] = [
  {
    id: 'avatar-2025-01',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 1,
    name: {
      en: 'Sri Bala Tripura Sundari Devi',
      te: 'శ్రీ బాలా త్రిపుర సుందరీ దేవి'
    },
    description: {
      en: 'The divine, youthful form of the supreme goddess bestowing sacred wisdom, purity, and grace on Day 1.',
      te: 'మొదటి రోజు శ్రీ బాలా త్రిపుర సుందరీ దేవి అలంకారం — భక్తులకు జ్ఞానం, ఆనందం మరియు మంగళ ప్రదాయిని.'
    },
    photos: [],
    sortOrder: 1,
    status: 'published'
  },
  {
    id: 'avatar-2025-02',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 2,
    name: {
      en: 'Sri Gayatri Devi',
      te: 'శ్రీ గాయత్రీ దేవి'
    },
    description: {
      en: 'The divine mother of the sacred Vedas, illuminating minds with supreme spiritual radiance and intellect on Day 2.',
      te: 'రెండవ రోజు శ్రీ గాయత్రీ దేవి అలంకారం — వేదమాతగా సమస్త జ్ఞానాన్ని మరియు సద్బుద్ధిని ప్రసాదించే దివ్య స్వరూపం.'
    },
    photos: [],
    sortOrder: 2,
    status: 'published'
  },
  {
    id: 'avatar-2025-04',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 3,
    name: {
      en: 'Sri Annapurna Devi',
      te: 'శ్రీ అన్నపూర్ణ దేవి'
    },
    description: {
      en: 'The compassionate universal mother who nurtures and sustains all creation with endless nourishment on Day 3.',
      te: 'మూడవ రోజు శ్రీ అన్నపూర్ణ దేవి అలంకారం — సకల ప్రాణికోటికి నిరంతర అన్నప్రసాదాన్ని అనుగ్రహించే అమృతమయి.'
    },
    photos: [],
    sortOrder: 3,
    status: 'published'
  },
  {
    id: 'avatar-2025-katyayani',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 4,
    name: {
      en: 'Sri Katyayani Devi',
      te: 'శ్రీ కాత్యాయనీ దేవి'
    },
    description: {
      en: 'The fierce and compassionate warrior goddess blessing devotees with courage, protection, and fulfillment on Day 4.',
      te: 'నాల్గవ రోజు శ్రీ కాత్యాయనీ దేవి అలంకారం — భక్తుల అభీష్టాలను నెరవేర్చే జగన్మాత, ధర్మ రక్షకి దివ్య రూపం.'
    },
    photos: [],
    sortOrder: 4,
    status: 'published'
  },
  {
    id: 'avatar-2025-06',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 5,
    name: {
      en: 'Sri Mahalakshmi Devi',
      te: 'శ్రీ మహాలక్ష్మీ దేవి'
    },
    description: {
      en: 'The supreme goddess of auspiciousness, abundance, spiritual wealth, and fortune on Day 5.',
      te: 'ఐదవ రోజు శ్రీ మహాలక్ష్మీ దేవి అలంకారం — అష్టైశ్వర్య ప్రదాయిని, సకల శుభదాయకి, దివ్య మంగళ స్వరూపిణి.'
    },
    photos: [],
    sortOrder: 5,
    status: 'published'
  },
  {
    id: 'avatar-2025-03',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 6,
    name: {
      en: 'Sri Lalitha Tripura Sundari Devi',
      te: 'శ్రీ లలితా త్రిపుర సుందరీ దేవి'
    },
    description: {
      en: 'The sovereign supreme empress seated upon Sri Chakra, bestowing supreme bliss and protection on Day 6.',
      te: 'ఆరవ రోజు శ్రీ లలితా త్రిపుర సుందరీ దేవి అలంకారం — శ్రీచక్ర నివాసిని, సమస్త లోక రక్షకి, పరమానంద స్వరూపిణి.'
    },
    photos: [],
    sortOrder: 6,
    status: 'published'
  },
  {
    id: 'avatar-2025-05',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 7,
    name: {
      en: 'Sri Maha Chandi Devi',
      te: 'శ్రీ మహాచండీ దేవి'
    },
    description: {
      en: 'The fierce, all-powerful protectress dispelling all negativity, fears, and obstacles on Day 7.',
      te: 'ఏడవ రోజు శ్రీ మహాచండీ దేవి అలంకారం — దురిత నివారిణి, భయ వినాశిని, శత్రు సంహారిణి అయిన మహోగ్ర శక్తి స్వరూపం.'
    },
    photos: [],
    sortOrder: 7,
    status: 'published'
  },
  {
    id: 'avatar-2025-07',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 8,
    name: {
      en: 'Sri Saraswati Devi',
      te: 'శ్రీ సరస్వతీ దేవి'
    },
    description: {
      en: 'The sacred form of Sri Saraswati Devi adorned on Moola Nakshatram, blessing devotees with learning, arts, and speech on Day 8.',
      te: 'ఎనిమిదవ రోజు శ్రీ సరస్వతీ దేవి విశేష అలంకారం — విద్యా ప్రదాయిని, వీణాపాణి దివ్య రూపం.'
    },
    photos: [],
    sortOrder: 8,
    status: 'published'
  },
  {
    id: 'avatar-2025-08',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 9,
    name: {
      en: 'Sri Durga Devi',
      te: 'శ్రీ దుర్గా దేవి'
    },
    description: {
      en: 'The supreme mother seated upon the lion with divine weapons, conferring valor and triumph on Day 9.',
      te: 'తొమ్మిదవ రోజు శ్రీ దుర్గా దేవి అలంకారం — సింహవాహినిగా భక్తులను ఆపదల నుండి కాపాడి విజయాన్ని ప్రసాదించే ఆదిశక్తి.'
    },
    photos: [],
    sortOrder: 9,
    status: 'published'
  },
  {
    id: 'avatar-2025-09',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 10,
    name: {
      en: 'Sri Mahishasura Mardini Devi',
      te: 'శ్రీ మహిషాసుర మర్దినీ దేవి'
    },
    description: {
      en: 'The heroic slayer of Mahishasura on Mahanavami, restoring cosmic harmony and righteousness on Day 10.',
      te: 'పదవ రోజు శ్రీ మహిషాసుర మర్దినీ దేవి అలంకారం — మహిషాసుర మర్దనం గావించి ధర్మ విజయానికి బాటలు వేసిన దివ్య రూపం.'
    },
    photos: [],
    sortOrder: 10,
    status: 'published'
  },
  {
    id: 'avatar-2025-10',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 11,
    name: {
      en: 'Sri Raja Rajeshwari Devi',
      te: 'శ్రీ రాజరాజేశ్వరీ దేవి'
    },
    description: {
      en: 'The majestic empress adorned on Vijaya Dashami, blessing Dodlapahad with eternal peace, harmony, and welfare on Day 11.',
      te: 'పదకొండవ రోజు శ్రీ రాజరాజేశ్వరీ దేవి మహా అలంకారం — సమస్త లోక కళ్యాణకారిణి, సర్వోన్నత దివ్య తేజస్సు.'
    },
    photos: [],
    sortOrder: 11,
    status: 'published'
  }
];

// Helper to create 10 avatars for 2024 and 2026
const createTenAvatars = (year: number, albumSlug: string): IAvatar[] => {
  const names: Array<{ te: string; en: string }> = [
    { te: 'శ్రీ బాలా త్రిపుర సుందరీ దేవి', en: 'Sri Bala Tripura Sundari Devi' },
    { te: 'శ్రీ గాయత్రీ దేవి', en: 'Sri Gayatri Devi' },
    { te: 'శ్రీ అన్నపూర్ణ దేవి', en: 'Sri Annapurna Devi' },
    { te: 'శ్రీ మహాలక్ష్మీ దేవి', en: 'Sri Mahalakshmi Devi' },
    { te: 'శ్రీ లలితా త్రిపుర సుందరీ దేవి', en: 'Sri Lalitha Tripura Sundari Devi' },
    { te: 'శ్రీ మహాచండీ దేవి', en: 'Sri Maha Chandi Devi' },
    { te: 'శ్రీ సరస్వతీ దేవి', en: 'Sri Saraswati Devi' },
    { te: 'శ్రీ దుర్గా దేవి', en: 'Sri Durga Devi' },
    { te: 'శ్రీ మహిషాసుర మర్దినీ దేవి', en: 'Sri Mahishasura Mardini Devi' },
    { te: 'శ్రీ రాజరాజేశ్వరీ దేవి', en: 'Sri Raja Rajeshwari Devi' }
  ];

  return names.map((name, idx) => ({
    id: `avatar-${year}-${String(idx + 1).padStart(2, '0')}`,
    albumSlug,
    year,
    dayNumber: idx + 1,
    name: { en: name.en, te: name.te },
    description: {
      en: `Devi Alankaram on Day ${idx + 1} during the ${year} Sri Durga Bhavani Utsav celebrations.`,
      te: `${year} శ్రీ దుర్గాభవాని ఉత్సవాలలో ${idx + 1}వ రోజు అమ్మవారి దివ్యాలంకారం.`
    },
    photos: [],
    sortOrder: idx + 1,
    status: 'published'
  }));
};

export const initialAvatars2024: IAvatar[] = createTenAvatars(2024, 'devi-alankaranalu-2024');
export const initialAvatars2026: IAvatar[] = createTenAvatars(2026, 'devi-alankaranalu-2026');

// All initial avatars combined
export const initialAvatars: IAvatar[] = [
  ...initialAvatars2025,
  ...initialAvatars2024,
  ...initialAvatars2026
];

// Final 14 Auction Records for 2025
export const initialAuctionItems: IAuctionItem[] = [
  {
    id: 'auc-2025-01',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Bala Tripura Sundari Devi',
      te: 'శ్రీ బాలా త్రిపుర సుందరి దేవి'
    },
    avatarId: 'avatar-2025-01',
    avatarName: {
      en: 'Sri Bala Tripura Sundari Devi',
      te: 'శ్రీ బాలా త్రిపుర సుందరీ దేవి'
    },
    winnerName: {
      en: 'Orsu Padmamma - Ramachandri',
      te: 'ఓర్సు పద్మమ్మ - రామచంద్రి'
    },
    fatherName: '',
    winningAmount: 25000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 1
  },
  {
    id: 'auc-2025-02',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Gayatri Devi',
      te: 'శ్రీ గాయత్రీ దేవి'
    },
    avatarId: 'avatar-2025-02',
    avatarName: {
      en: 'Sri Gayatri Devi',
      te: 'శ్రీ గాయత్రీ దేవి'
    },
    winnerName: {
      en: 'Muddam Jangamma - Sailu Goud',
      te: 'ముద్దం జంగమ్మ - సాయిలు గౌడ్'
    },
    fatherName: '',
    winningAmount: 35000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 2
  },
  {
    id: 'auc-2025-03',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Annapurna Devi',
      te: 'శ్రీ అన్నపూర్ణ దేవి'
    },
    avatarId: 'avatar-2025-04',
    avatarName: {
      en: 'Sri Annapurna Devi',
      te: 'శ్రీ అన్నపూర్ణ దేవి'
    },
    winnerName: {
      en: 'Vallapudasu Venkatamma - Gopal Goud',
      te: 'వల్లపుదాసు వెంకటమ్మ - గోపాల్ గౌడ్'
    },
    fatherName: '',
    winningAmount: 33000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 3
  },
  {
    id: 'auc-2025-04',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Kathayayani Devi',
      te: 'శ్రీ కాత్యాయని దేవి'
    },
    avatarId: 'avatar-2025-katyayani',
    avatarName: {
      en: 'Sri Katyayani Devi',
      te: 'శ్రీ కాత్యాయనీ దేవి'
    },
    winnerName: {
      en: 'Guniganti Mangamma - Anjaiah Goud',
      te: 'గునిగంటి మంగమ్మ - అంజయ్య గౌడ్'
    },
    fatherName: '',
    winningAmount: 38000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 4
  },
  {
    id: 'auc-2025-05',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Lalita Tripura Sundari Devi',
      te: 'శ్రీ లలితా త్రిపుర సుందరి దేవి'
    },
    avatarId: 'avatar-2025-03',
    avatarName: {
      en: 'Sri Lalitha Tripura Sundari Devi',
      te: 'శ్రీ లలితా త్రిపుర సుందరీ దేవి'
    },
    winnerName: {
      en: 'Uduthala Laxmamma - Chinna Yadaiah Goud',
      te: 'ఉడుతల లక్ష్మమ్మ - చిన్న యాదయ్యగౌడ్'
    },
    fatherName: '',
    winningAmount: 33000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 5
  },
  {
    id: 'auc-2025-06',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Mahachandi Devi',
      te: 'శ్రీ మహాచండీ దేవి'
    },
    avatarId: 'avatar-2025-05',
    avatarName: {
      en: 'Sri Maha Chandi Devi',
      te: 'శ్రీ మహాచండీ దేవి'
    },
    winnerName: {
      en: 'Komiri Vasu',
      te: 'కొమిరి వాసు'
    },
    fatherName: '',
    winningAmount: 35000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 6
  },
  {
    id: 'auc-2025-07',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Saraswati Devi',
      te: 'శ్రీ సరస్వతీ దేవి'
    },
    avatarId: 'avatar-2025-07',
    avatarName: {
      en: 'Sri Saraswati Devi',
      te: 'శ్రీ సరస్వతీ దేవి'
    },
    winnerName: {
      en: 'Karing Jyoti - Tirupataiah Goud',
      te: 'కారింగు జ్యోతి - తిరుపతయ్య గౌడ్'
    },
    fatherName: '',
    winningAmount: 40000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 7
  },
  {
    id: 'auc-2025-08',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Durga Devi',
      te: 'శ్రీ దుర్గాదేవి'
    },
    avatarId: 'avatar-2025-08',
    avatarName: {
      en: 'Sri Durga Devi',
      te: 'శ్రీ దుర్గా దేవి'
    },
    winnerName: {
      en: 'Muddam Jangamma - Sailu Goud',
      te: 'ముద్దం జంగమ్మ - సాయిలు గౌడ్'
    },
    fatherName: '',
    winningAmount: 55000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 8
  },
  {
    id: 'auc-2025-09',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Mahishasura Mardini Devi',
      te: 'శ్రీ మహిషాసురమర్దిని దేవి'
    },
    avatarId: 'avatar-2025-09',
    avatarName: {
      en: 'Sri Mahishasura Mardini Devi',
      te: 'శ్రీ మహిషాసుర మర్దినీ దేవి'
    },
    winnerName: {
      en: 'Uduthala Anjamma - Venkataiah Goud',
      te: 'ఉడుతల అంజమ్మ - వెంకటయ్య గౌడ్'
    },
    fatherName: '',
    winningAmount: 45000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 9
  },
  {
    id: 'auc-2025-10',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Sri Rajarajeshwari Devi',
      te: 'శ్రీ రాజరాజేశ్వరి దేవి'
    },
    avatarId: 'avatar-2025-10',
    avatarName: {
      en: 'Sri Raja Rajeshwari Devi',
      te: 'శ్రీ రాజరాజేశ్వరీ దేవి'
    },
    winnerName: {
      en: 'Uduthala Alivelu - Peddaiah Goud',
      te: 'ఉడుతల అలివేలు - పెద్దయ్య గౌడ్'
    },
    fatherName: '',
    winningAmount: 62000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 10
  },
  {
    id: 'auc-2025-11',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Mahalaxmi Devi',
      te: 'శ్రీ మహాలక్ష్మీ దేవి'
    },
    avatarId: 'avatar-2025-06',
    avatarName: {
      en: 'Sri Mahalakshmi Devi',
      te: 'శ్రీ మహాలక్ష్మీ దేవి'
    },
    winnerName: {
      en: 'Matta Shivani - Nagesh Goud',
      te: 'మట్ట శివాని - నాగేష్ గౌడ్'
    },
    fatherName: '',
    winningAmount: 39000,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 11
  },
  {
    id: 'auc-2025-12',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Mukku Pudaka',
      te: 'ముక్కుపుడక'
    },
    winnerName: {
      en: 'Matta Shivani - Nagesh Goud',
      te: 'మట్ట శివాని - నాగేష్ గౌడ్'
    },
    fatherName: '',
    winningAmount: 47000,
    itemType: 'special_item',
    status: 'published',
    isComplete: true,
    sortOrder: 12
  },
  {
    id: 'auc-2025-13',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Kalasham Winner',
      te: 'కలశం విజేత'
    },
    winnerName: {
      en: 'Orsu Saritha - Shankar',
      te: 'ఓర్సు సరిత - శంకర్'
    },
    fatherName: '',
    winningAmount: 35000,
    itemType: 'special_item',
    status: 'published',
    isComplete: true,
    sortOrder: 13
  },
  {
    id: 'auc-2025-14',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Laddu Winner',
      te: 'లడ్డు విజేత'
    },
    winnerName: {
      en: 'Matta Saraswati - Katamaiah Goud',
      te: 'మట్ట సరస్వతి - కటమయ్య గౌడ్'
    },
    fatherName: '',
    winningAmount: 16100,
    itemType: 'special_item',
    status: 'published',
    isComplete: true,
    sortOrder: 14
  }
];

// Final 4 Sponsors & Donors for 2025
export const initialDonors: IDonor[] = [
  {
    id: 'donor-2025-01',
    albumSlug: 'donors-and-sponsors-2025',
    year: 2025,
    contributionType: {
      en: 'Laddu Sponsor',
      te: 'లడ్డూ దాత'
    },
    name: {
      en: 'Palakurla Lalitha - Jangaiah Goud',
      te: 'పాలకూర్ల లలిత - జంగయ్య గౌడ్'
    },
    status: 'published',
    sortOrder: 1
  },
  {
    id: 'donor-2025-02',
    albumSlug: 'donors-and-sponsors-2025',
    year: 2025,
    contributionType: {
      en: 'Vigraha Daatha',
      te: 'విగ్రహ దాత'
    },
    name: {
      en: 'Samala Kavita - Nagesh Goud',
      te: 'సామల కవిత - నాగేష్ గౌడ్'
    },
    status: 'published',
    sortOrder: 2
  },
  {
    id: 'donor-2025-03',
    albumSlug: 'donors-and-sponsors-2025',
    year: 2025,
    contributionType: {
      en: 'Nimmakayala Daatha',
      te: 'నిమ్మకాయల దాత'
    },
    name: {
      en: 'Palakurla Roja - Jangaiah Goud',
      te: 'పాలకూర్ల రోజా - జంగయ్య గౌడ్'
    },
    status: 'published',
    sortOrder: 3
  },
  {
    id: 'donor-2025-04',
    albumSlug: 'donors-and-sponsors-2025',
    year: 2025,
    contributionType: {
      en: 'Kobbarikayalu Sponsor',
      te: 'కొబ్బరికాయల స్పాన్సర్'
    },
    name: {
      en: 'Matta Ramulu s/o Laxmaiah Goud',
      te: 'మట్ట రాములు s/o లక్ష్మయ్య గౌడ్'
    },
    status: 'published',
    sortOrder: 4
  }
];

export const initialAuditLogs: IAuditLog[] = [
  {
    id: 'audit-001',
    actorName: 'Admin Committee',
    actorRole: 'super-admin',
    action: 'create',
    resourceType: 'Album',
    resourceId: 'alb-2025-devi-alankaranalu',
    resourceTitle: 'Devi Alankaranalu (2025)',
    timestamp: '2025-10-01T09:00:00.000Z',
    details: 'Created Devi Alankaranalu album with 11 daily avatars for 2025 celebrations.'
  },
  {
    id: 'audit-002',
    actorName: 'Admin Committee',
    actorRole: 'super-admin',
    action: 'create',
    resourceType: 'Auction',
    resourceId: 'auc-2025-01',
    resourceTitle: 'Bala Tripura Sundari Devi Saree Auction',
    timestamp: '2025-10-02T10:30:00.000Z',
    details: 'Recorded saree auction winner: ఓర్సు పద్మమ్మ - రామచంద్రి (Orsu Padmamma - Ramachandri) for ₹25,000.'
  },
  {
    id: 'audit-003',
    actorName: 'Admin Committee',
    actorRole: 'super-admin',
    action: 'create',
    resourceType: 'Donor',
    resourceId: 'donor-2025-01',
    resourceTitle: 'Laddu Sponsor',
    timestamp: '2025-10-02T11:00:00.000Z',
    details: 'Recorded sponsor: పాలకూర్ల లలిత - జంగయ్య గౌడ్ (Palakurla Lalitha - Jangaiah Goud).'
  }
];
