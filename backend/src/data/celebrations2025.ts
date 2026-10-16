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
  winnerName: string;
  fatherName: string;
  winningAmount?: number;
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

// Initial 2025 Albums
export const initialAlbums: IAlbum[] = [
  {
    id: 'alb-2025-devi-alankaranalu',
    slug: 'devi-alankaranalu-2025',
    title: {
      en: 'Devi Alankaranalu',
      te: 'అమ్మవారి అలంకరణలు'
    },
    description: {
      en: "Photographs and details of the goddess's ten daily avatars and sacred alankarams during the 2025 celebrations.",
      te: 'శ్రీ దుర్గాభవాని అమ్మవారి పది రోజుల దివ్య అవతారాలు మరియు విశేష అలంకారాల ఛాయాచిత్రాలు.'
    },
    year: 2025,
    albumType: 'avatars',
    photoCount: 10,
    status: 'published',
    sortOrder: 1
  },
  {
    id: 'alb-2025-auction-winners',
    slug: 'auction-winners-2025',
    title: {
      en: 'Auction Winners',
      te: 'వేలం పాట విజేతలు'
    },
    description: {
      en: 'Auction records and winners for the ten sacred sarees and auspicious festival items for the 2025 celebrations.',
      te: '2025 ఉత్సవాలలో పది చీరలు మరియు ప్రత్యేక వస్తువుల వేలం పాట విజేతల వివరాలు.'
    },
    year: 2025,
    albumType: 'auction',
    photoCount: 0,
    status: 'published',
    sortOrder: 2
  },
  {
    id: 'alb-2025-donors-and-sponsors',
    slug: 'donors-and-sponsors-2025',
    title: {
      en: 'Donors & Sponsors',
      te: 'దాతలు మరియు స్పాన్సర్లు'
    },
    description: {
      en: 'Records of generous donors, patrons, and sponsors supporting the 2025 Sri Durga Bhavani Utsav celebrations.',
      te: '2025 ఉత్సవాల నిర్వహణకు సహకరించిన దాతలు మరియు స్పాన్సర్ల వివరాలు.'
    },
    year: 2025,
    albumType: 'donors',
    photoCount: 0,
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
  }
];

// Initial 10 Avatars (exact supplied spellings)
export const initialAvatars: IAvatar[] = [
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
    id: 'avatar-2025-03',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 3,
    name: {
      en: 'Sri Lalitha Tripura Sundari Devi',
      te: 'శ్రీ లలితా త్రిపుర సుందరీ దేవి'
    },
    description: {
      en: 'The sovereign supreme empress seated upon Sri Chakra, bestowing supreme bliss and protection on Day 3.',
      te: 'మూడవ రోజు శ్రీ లలితా త్రిపుర సుందరీ దేవి అలంకారం — శ్రీచక్ర నివాసిని, సమస్త లోక రక్షకి, పరమానంద స్వరూపిణి.'
    },
    photos: [],
    sortOrder: 3,
    status: 'published'
  },
  {
    id: 'avatar-2025-04',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 4,
    name: {
      en: 'Sri Annapurna Devi',
      te: 'శ్రీ అన్నపూర్ణా దేవి'
    },
    description: {
      en: 'The compassionate universal mother who nurtures and sustains all creation with endless nourishment on Day 4.',
      te: 'నాల్గవ రోజు శ్రీ అన్నపూర్ణా దేవి అలంకారం — సకల ప్రాణికోటికి నిరంతర అన్నప్రసాదాన్ని అనుగ్రహించే అమృతమయి.'
    },
    photos: [],
    sortOrder: 4,
    status: 'published'
  },
  {
    id: 'avatar-2025-05',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 5,
    name: {
      en: 'Maha Chandi Devi',
      te: 'మహచండి దేవి'
    },
    description: {
      en: 'The fierce, all-powerful protectress dispelling all negativity, fears, and obstacles on Day 5.',
      te: 'ఐదవ రోజు మహచండి దేవి అలంకారం — దురిత నివారిణి, భయ వినాశిని, శత్రు సంహారిణి అయిన మహోగ్ర శక్తి స్వరూపం.'
    },
    photos: [],
    sortOrder: 5,
    status: 'published'
  },
  {
    id: 'avatar-2025-06',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 6,
    name: {
      en: 'Sri Maha Lakshmi Devi',
      te: 'శ్రీ మహాలక్ష్మీ దేవి'
    },
    description: {
      en: 'The supreme goddess of auspiciousness, abundance, spiritual wealth, and fortune on Day 6.',
      te: 'ఆరవ రోజు శ్రీ మహాలక్ష్మీ దేవి అలంకారం — అష్టైశ్వర్య ప్రదాయిని, సకల శుభదాయకి, దివ్య మంగళ స్వరూపిణి.'
    },
    photos: [],
    sortOrder: 6,
    status: 'published'
  },
  {
    id: 'avatar-2025-07',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 7,
    name: {
      en: 'Sri Saraswati Devi - Moola Nakshatram',
      te: 'శ్రీ సరస్వతీ దేవి'
    },
    description: {
      en: 'The sacred form of Sri Saraswati Devi adorned on Moola Nakshatram, blessing devotees with learning, arts, and speech on Day 7.',
      te: 'ఏడవ రోజు మూలా నక్షత్రం సందర్భంగా శ్రీ సరస్వతీ దేవి విశేష అలంకారం — విద్యా ప్రదాయిని, వీణాపాణి దివ్య రూపం.'
    },
    photos: [],
    sortOrder: 7,
    status: 'published'
  },
  {
    id: 'avatar-2025-08',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 8,
    name: {
      en: 'Sri Durga Devi',
      te: 'శ్రీ దుర్గా దేవి'
    },
    description: {
      en: 'The supreme mother seated upon the lion with divine weapons, conferring valor and triumph on Day 8.',
      te: 'ఎనిమిదవ రోజు శ్రీ దుర్గా దేవి అలంకారం — సింహవాహినిగా భక్తులను ఆపదల నుండి కాపాడి విజయాన్ని ప్రసాదించే ఆదిశక్తి.'
    },
    photos: [],
    sortOrder: 8,
    status: 'published'
  },
  {
    id: 'avatar-2025-09',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 9,
    name: {
      en: 'Sri Mahishasura Mardhini Devi',
      te: 'శ్రీ మహిషాసురమర్దినీ దేవి'
    },
    description: {
      en: 'The heroic slayer of Mahishasura on Mahanavami, restoring cosmic harmony and righteousness on Day 9.',
      te: 'తొమ్మిదవ రోజు శ్రీ మహిషాసురమర్దినీ దేవి అలంకారం — మహిషాసుర మర్దనం గావించి ధర్మ విజయానికి బాటలు వేసిన దివ్య రూపం.'
    },
    photos: [],
    sortOrder: 9,
    status: 'published'
  },
  {
    id: 'avatar-2025-10',
    albumSlug: 'devi-alankaranalu-2025',
    year: 2025,
    dayNumber: 10,
    name: {
      en: 'Sri Raja Rajeswari Devi',
      te: 'శ్రీ రాజరాజేశ్వరీ దేవి'
    },
    description: {
      en: 'The majestic empress adorned on Vijaya Dashami, blessing Dodlapahad with eternal peace, harmony, and welfare on Day 10.',
      te: 'పదవ రోజు విజయదశమి సందర్భంగా శ్రీ రాజరాజేశ్వరీ దేవి మహా అలంకారం — సమస్త లోక కళ్యాణకారిణి, సర్వోన్నత దివ్య తేజస్సు.'
    },
    photos: [],
    sortOrder: 10,
    status: 'published'
  }
];

// Initial 15 Auction Records
export const initialAuctionItems: IAuctionItem[] = [
  {
    id: 'auc-2025-01',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Sri Bala Tripura Sundari Devi Saree',
      te: 'శ్రీ బాలా త్రిపుర సుందరీ దేవి చీర'
    },
    avatarId: 'avatar-2025-01',
    avatarName: {
      en: 'Sri Bala Tripura Sundari Devi',
      te: 'శ్రీ బాలా త్రిపుర సుందరీ దేవి'
    },
    winnerName: 'ఓర్సు జగదీశ్',
    fatherName: 'రాంచంద్రయ్య',
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
      en: 'Sri Gayatri Devi Saree',
      te: 'శ్రీ గాయత్రీ దేవి చీర'
    },
    avatarId: 'avatar-2025-02',
    avatarName: {
      en: 'Sri Gayatri Devi',
      te: 'శ్రీ గాయత్రీ దేవి'
    },
    winnerName: 'ముద్దం యాదయ్య',
    fatherName: 'సాయిలు',
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
      en: 'Sri Lalitha Tripura Sundari Devi Saree',
      te: 'శ్రీ లలితా త్రిపుర సుందరీ దేవి చీర'
    },
    avatarId: 'avatar-2025-03',
    avatarName: {
      en: 'Sri Lalitha Tripura Sundari Devi',
      te: 'శ్రీ లలితా త్రిపుర సుందరీ దేవి'
    },
    winnerName: 'Uduthala Mahesh',
    fatherName: 'Chinna Yadaiah',
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
      en: 'Sri Annapurna Devi Saree',
      te: 'శ్రీ అన్నపూర్ణా దేవి చీర'
    },
    avatarId: 'avatar-2025-04',
    avatarName: {
      en: 'Sri Annapurna Devi',
      te: 'శ్రీ అన్నపూర్ణా దేవి'
    },
    winnerName: 'వల్లపూదాసు మల్లేష్',
    fatherName: 'గోపాల్',
    winningAmount: 33000,
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
      en: 'Maha Chandi Devi Saree',
      te: 'మహచండి దేవి చీర'
    },
    avatarId: 'avatar-2025-05',
    avatarName: {
      en: 'Maha Chandi Devi',
      te: 'మహచండి దేవి'
    },
    winnerName: 'Komiri Vasu',
    fatherName: '', // Not supplied; leave blank
    winningAmount: 35000,
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
      en: 'Sri Maha Lakshmi Devi Saree',
      te: 'శ్రీ మహాలక్ష్మీ దేవి చీర'
    },
    avatarId: 'avatar-2025-06',
    avatarName: {
      en: 'Sri Maha Lakshmi Devi',
      te: 'శ్రీ మహాలక్ష్మీ దేవి'
    },
    winnerName: 'Matta Nagesh',
    fatherName: 'Laxmaiah',
    winningAmount: 39000,
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
      en: 'Sri Saraswati Devi Saree - Moola Nakshatram',
      te: 'శ్రీ సరస్వతీ దేవి చీర - మూలా నక్షత్రం'
    },
    avatarId: 'avatar-2025-07',
    avatarName: {
      en: 'Sri Saraswati Devi - Moola Nakshatram',
      te: 'శ్రీ సరస్వతీ దేవి'
    },
    winnerName: 'కారింగు తిరుపతయ్య',
    fatherName: 'జంగయ్య',
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
      en: 'Sri Durga Devi Saree',
      te: 'శ్రీ దుర్గా దేవి చీర'
    },
    avatarId: 'avatar-2025-08',
    avatarName: {
      en: 'Sri Durga Devi',
      te: 'శ్రీ దుర్గా దేవి'
    },
    winnerName: 'ముద్దం యాదయ్య',
    fatherName: 'సాయిలు',
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
      en: 'Sri Mahishasura Mardhini Devi Saree',
      te: 'శ్రీ మహిషాసురమర్దినీ దేవి చీర'
    },
    avatarId: 'avatar-2025-09',
    avatarName: {
      en: 'Sri Mahishasura Mardhini Devi',
      te: 'శ్రీ మహిషాసురమర్దినీ దేవి'
    },
    winnerName: 'ఉడుతల మల్లేష్',
    fatherName: 'వెంకటయ్య',
    winningAmount: 46000,
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
      en: 'Sri Raja Rajeswari Devi Saree',
      te: 'శ్రీ రాజరాజేశ్వరీ దేవి చీర'
    },
    avatarId: 'avatar-2025-10',
    avatarName: {
      en: 'Sri Raja Rajeswari Devi',
      te: 'శ్రీ రాజరాజేశ్వరీ దేవి'
    },
    winnerName: 'ఉడుతల పెద్దయ్య',
    fatherName: 'గోపాల్',
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
      en: 'Garland-Adorned Saree (Medalu Meeda Cheera)',
      te: 'మెడలు మీద చీర'
    },
    avatarId: undefined, // Unassigned
    winnerName: 'ఉడుతల నవీన్',
    fatherName: 'వెంకటయ్య',
    winningAmount: 5116,
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
      en: 'Laddu Prasadam',
      te: 'లడ్డూ'
    },
    avatarId: undefined,
    winnerName: '',
    fatherName: '',
    winningAmount: undefined,
    itemType: 'special_item',
    status: 'draft',
    isComplete: false,
    sortOrder: 12
  },
  {
    id: 'auc-2025-13',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Mukku Pudaka (Nose Ring)',
      te: 'ముక్కు పుడక'
    },
    avatarId: undefined,
    winnerName: '',
    fatherName: '',
    winningAmount: undefined,
    itemType: 'special_item',
    status: 'draft',
    isComplete: false,
    sortOrder: 13
  },
  {
    id: 'auc-2025-14',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Sacred Kalasham',
      te: 'కలశం'
    },
    avatarId: undefined,
    winnerName: '',
    fatherName: '',
    winningAmount: undefined,
    itemType: 'special_item',
    status: 'draft',
    isComplete: false,
    sortOrder: 14
  },
  {
    id: 'auc-2025-15',
    albumSlug: 'auction-winners-2025',
    year: 2025,
    itemName: {
      en: 'Lakshmi Maala (Sacred Garland)',
      te: 'లక్ష్మీ మాల'
    },
    avatarId: undefined,
    winnerName: '',
    fatherName: '',
    winningAmount: undefined,
    itemType: 'special_item',
    status: 'draft',
    isComplete: false,
    sortOrder: 15
  }
];

export const initialDonors: IDonor[] = [];

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
    details: 'Created Devi Alankaranalu album with 10 daily avatars for 2025 celebrations.'
  },
  {
    id: 'audit-002',
    actorName: 'Admin Committee',
    actorRole: 'super-admin',
    action: 'create',
    resourceType: 'Auction',
    resourceId: 'auc-2025-01',
    resourceTitle: 'Sri Bala Tripura Sundari Devi Saree Auction',
    timestamp: '2025-10-02T10:30:00.000Z',
    details: 'Recorded saree auction winner: ఓర్సు జగదీశ్ (రాంచంద్రయ్య) for ₹25,000.'
  },
  {
    id: 'audit-003',
    actorName: 'Admin Committee',
    actorRole: 'super-admin',
    action: 'create',
    resourceType: 'Auction',
    resourceId: 'auc-2025-11',
    resourceTitle: 'Medalu Meeda Cheera Auction',
    timestamp: '2025-10-02T11:00:00.000Z',
    details: 'Recorded additional saree winner: ఉడుతల నవీన్ (వెంకటయ్య) for ₹5,116.'
  }
];
