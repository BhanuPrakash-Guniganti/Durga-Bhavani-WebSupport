import type {
  YearRecord,
  AlbumRecord,
  EventRecord,
  AnnouncementRecord,
  HistoricalMilestoneRecord,
  SiteSettingsRecord,
  AvatarRecord,
  AuctionItemRecord,
  DonorRecord,
  AuditLogRecord
} from '../types';

/**
 * Self-contained SVG image generator for sample cards and lightbox demonstrations.
 * Displays culturally harmonious temple motifs (Diya, Kalash, Mandir) with clear sample watermark.
 */
export const createSampleSvgImage = (
  title: string,
  _category: string,
  _accentColor = '#7A0C0C',
  motif = 'diya'
): string => {
  const motifSvg =
    motif === 'kalash'
      ? `<path d="M100 130 C75 130 65 160 65 190 C65 220 80 240 100 240 C120 240 135 220 135 190 C135 160 125 130 100 130 Z M90 120 L110 120 L115 130 L85 130 Z M100 100 L110 115 L90 115 Z" fill="#D4AF37" stroke="#FFE082" stroke-width="2"/>`
      : motif === 'mandir'
      ? `<path d="M100 80 L130 130 L70 130 Z M75 130 L125 130 L125 220 L75 220 Z M90 170 L110 170 L110 220 L90 220 Z M98 60 L102 60 L102 80 L98 80 Z" fill="#D4AF37" stroke="#FFE082" stroke-width="2"/>`
      : `<path d="M100 100 Q105 130 120 150 Q100 160 80 150 Q95 130 100 100 Z" fill="#FF9800"/><path d="M60 160 C60 190 140 190 140 160 Z" fill="#D4AF37"/><ellipse cx="100" cy="160" rx="40" ry="8" fill="#B38F24"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="100%" height="100%">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#5E0909"/>
        <stop offset="100%" stop-color="#2D0303"/>
      </radialGradient>
      <pattern id="rangoli" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="#D4AF37" opacity="0.25"/>
        <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="0.12"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    <rect width="100%" height="100%" fill="url(#rangoli)"/>
    
    <!-- Central Motif Frame -->
    <circle cx="200" cy="110" r="65" fill="#3D0505" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4 2"/>
    <g transform="translate(100, -20)">
      ${motifSvg}
    </g>
    
    <!-- Text Labels -->
    <rect x="20" y="195" width="360" height="48" rx="6" fill="#1A0202" opacity="0.85" stroke="#D4AF37" stroke-width="1"/>
    <text x="200" y="215" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#FFE082" text-anchor="middle">${title}</text>
    <text x="200" y="233" font-family="sans-serif" font-size="10" fill="#E0D6C8" text-anchor="middle">DODLAPAHAD UTSAV ARCHIVES</text>
    
    <!-- Border Accents -->
    <rect x="8" y="8" width="384" height="244" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.6"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const sampleSiteSettings: SiteSettingsRecord = {
  organizationName: {
    en: 'Durga Bhavani Seva Samiti - Dodlapahad',
    te: 'శ్రీ దుర్గాభవాని సేవా సమితి - దొడ్లపహాడ్'
  },
  tagline: {
    en: 'Preserving Devotion, Cultural Heritage, and Community Service',
    te: 'భక్తి ప్రపత్తులు, సాంస్కృతిక వారసత్వం మరియు సమాజ సేవ'
  },
  aboutText: {
    en: 'Durga Bhavani Seva Samiti is a dedicated community organization in Dodlapahad committed to organizing the annual Navaratri celebrations, preserving village cultural traditions, conducting community welfare services, and archiving temple memories for future generations.',
    te: 'శ్రీ దుర్గాభవాని సేవా సమితి దొడ్లపహాడ్‌లోని వార్షిక నవరాత్రి ఉత్సవాలను నిర్వహించడానికి, గ్రామీణ సంస్కృతిని కాపాడటానికి, అన్నదాన తదితర సమాజ సేవలను అందించడానికి మరియు ఉత్సవ జ్ఞాపకాలను భావితరాలకు భద్రపరచడానికి అంకితమైన సంస్థ.'
  },
  mission: {
    en: 'To foster spiritual devotion, cultural solidarity, and voluntary service among devotees and villagers through disciplined annual festival coordination and community harmony.',
    te: 'క్రమశిక్షణతో కూడిన వార్షిక ఉత్సవాల నిర్వహణ మరియు సమైక్యత ద్వారా గ్రామస్తులలో, భక్తులలో ఆధ్యాత్మిక భావాన్ని, సాంస్కృతిక చైతన్యాన్ని మరియు సేవా నిరతిని పెంపొందించడం.'
  },
  vision: {
    en: 'To preserve the sacred legacy of Sri Durga Bhavani Temple, Dodlapahad, while fostering youth participation in cultural preservation, digital archiving, and charitable service.',
    te: 'దొడ్లపహాడ్ శ్రీ దుర్గాభవాని ఆలయ పవిత్ర వారసత్వాన్ని కాపాడుతూ, సాంస్కృతిక పరిరక్షణ, డిజిటల్ ఆర్కైవ్ మరియు ధార్మిక సేవా కార్యక్రమాలలో యువతను భాగస్వామ్యం చేయడం.'
  },
  contactEmail: 'contactdurgabhavani.dodlapahad@gmail.com',
  contactPhone: '9491377750',
  contactPhoneSecondary: '94407 90378',
  contactPhones: ['9491377750', '94407 90378'],
  locationAddress: {
    en: 'Sri Durga Bhavani Mandapam, Beside Dodlapahad Grama Panchayat, Dodlapahad, Telangana, India',
    te: 'శ్రీ దుర్గాభవాని మండపం, దొడ్లపహాడ్ గ్రామ పంచాయతీ పక్కన, దొడ్లపహాడ్, తెలంగాణ, భారతదేశం'
  },
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Dodlapahad&t=&z=13&ie=UTF8&iwloc=&output=embed',
  socialLinks: {
    youtube: 'https://youtube.com/@DurgaBhavaniDodlapahad',
    facebook: 'https://facebook.com/DurgaBhavaniDodlapahad',
    whatsapp: 'https://chat.whatsapp.com/sample'
  },
  celebrationHistoryTitle: {
    en: 'History of Sri Durga Bhavani Utsav - Dodlapahad',
    te: 'శ్రీ దుర్గాభవాని ఉత్సవాల చరిత్ర - దొడ్లపహాడ్'
  },
  footerNotice: {
    en: 'Durga Bhavani Seva Samiti - Dodlapahad. All rights reserved. Content verified and authorized by the Organizing Committee.',
    te: 'శ్రీ దుర్గాభవాని సేవా సమితి - దొడ్లపహాడ్. సర్వ హక్కులు ప్రత్యేకించబడ్డాయి. సమాచారం నిర్వాహక కమిటీచే ధృవీకరించబడింది.'
  }
};

export const sampleYears: YearRecord[] = [
  {
    year: 2026,
    title: {
      en: 'Sri Durga Bhavani Utsav Celebrations 2026',
      te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2026 (మూడవ సంవత్సరం)'
    },
    slug: '2026',
    description: {
      en: 'The 2026 annual celebrations mark our third year of Sri Durga Bhavani Utsav at Dodlapahad, continuing the sacred tradition of devotion, community worship, and Annadanam.',
      te: '2026 వార్షిక వేడుకలు దొడ్లపహాడ్‌లో మన మూడవ సంవత్సర శ్రీ దుర్గాభవాని ఉత్సవాలను సూచిస్తాయి. భక్తి ప్రపత్తులు, విశేష పూజలు మరియు అన్నదాన సాంప్రదాయం నిర్విఘ్నంగా కొనసాగుతున్నాయి.'
    },
    coverImage: '/images/covers/cover-utsav-highlights.webp',
    startDate: '2026-10-11',
    endDate: '2026-10-20',
    dateRangeFormatted: {
      en: 'Sunday, October 11, 2026 – Tuesday, October 20, 2026',
      te: 'ఆదివారం, అక్టోబర్ 11, 2026 – మంగళవారం, అక్టోబర్ 20, 2026'
    },
    status: 'published',
    albumCount: 3,
    highlights: {
      en: [
        'Third Year of Sri Durga Bhavani Utsav celebrations at Dodlapahad',
        'Daily Alankarams, Kumkumarchana, and sacred Chandi Parayanam',
        'Community Annadanam and evening cultural presentations',
        'Grand Vijaya Dashami Shobha Yatra with floral palanquin'
      ],
      te: [
        'దొడ్లపహాడ్‌లో శ్రీ దుర్గాభవాని ఉత్సవాల మూడవ సంవత్సర వేడుకలు',
        'నిత్య నవదుర్గా అలంకారాలు, కుంకుమార్చన మరియు చండీ పారాయణం',
        'నిరంతర మహా అన్నదానం మరియు సాయంత్రం సాంస్కృతిక ప్రదర్శనలు',
        'పుష్ప పల్లకీతో విజయదశమి మహా శోభాయాత్ర'
      ]
    },
    isSample: true
  },
  {
    year: 2025,
    title: {
      en: 'Sri Durga Bhavani Utsav Celebrations 2025',
      te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2025 (రెండవ సంవత్సరం)'
    },
    slug: '2025',
    description: {
      en: 'The 2025 annual celebrations marked the second year of Sri Durga Bhavani Utsav at Dodlapahad, featuring vibrant festivities, sacred rituals, and community participation.',
      te: '2025 వార్షిక వేడుకలు దొడ్లపహాడ్‌లో రెండవ సంవత్సర శ్రీ దుర్గాభవాని ఉత్సవాలుగా నిలిచాయి. భక్తుల విశేష భాగస్వామ్యంతో పూజాదికాలు వైభవంగా జరిగాయి.'
    },
    coverImage: '/images/covers/cover-devi-alankaranalu.webp',
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    dateRangeFormatted: {
      en: 'Monday, September 22, 2025 – Wednesday, October 1, 2025',
      te: 'సోమవారం, సెప్టెంబర్ 22, 2025 – బుధవారం, అక్టోబర్ 1, 2025'
    },
    status: 'published',
    albumCount: 4,
    highlights: {
      en: [
        'Second Year of Sri Durga Bhavani Utsav celebrations at Dodlapahad',
        'Nine nights of devotional poojas and special alankarams',
        'Maha Annadanam serving village devotees and visiting families',
        'Traditional music, bhajans, and festive procession'
      ],
      te: [
        'దొడ్లపహాడ్‌లో శ్రీ దుర్గాభవాని ఉత్సవాల రెండవ సంవత్సర వేడుకలు',
        'తొమ్మిది రోజుల పాటు విశేష అలంకార పూజలు మరియు భజనలు',
        'గ్రామ ప్రజలకు మరియు భక్తులకు మహా అన్నప్రసాద వితరణ',
        'సంప్రదాయ కోలాటం మరియు పవిత్ర ఊరేగింపు'
      ]
    },
    isSample: true
  },
  {
    year: 2024,
    title: {
      en: 'Sri Durga Bhavani Utsav Celebrations 2024',
      te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2024 (మొదటి సంవత్సరం)'
    },
    slug: '2024',
    description: {
      en: 'The 2024 annual celebrations marked the inaugural first year of Sri Durga Bhavani Utsav at Dodlapahad, initiating the annual tradition of nine sacred days of worship and community unity.',
      te: '2024 వార్షిక వేడుకలు దొడ్లపహాడ్‌లో శ్రీ దుర్గాభవాని ఉత్సవాల ప్రారంభ మొదటి సంవత్సరంగా నిలిచాయి. తొమ్మిది రోజుల పాటు గ్రామస్తుల సమైక్య భక్తితో ఉత్సవాల సాంప్రదాయం ప్రారంభమైంది.'
    },
    coverImage: '/images/covers/cover-shobha-yatra.webp',
    startDate: '2024-10-03',
    endDate: '2024-10-12',
    dateRangeFormatted: {
      en: 'Thursday, October 3, 2024 – Saturday, October 12, 2024',
      te: 'గురువారం, అక్టోబర్ 3, 2024 – శనివారం, అక్టోబర్ 12, 2024'
    },
    status: 'published',
    albumCount: 3,
    highlights: {
      en: [
        'First Year — The beginning of Sri Durga Bhavani Utsav celebrations at Dodlapahad',
        'Ghatasthapana & Kalasha Pooja rituals on Day 1',
        'Daily Chandi Homam & Kumkumarchana conducted with Vedic sanctity',
        'Inaugural Vijaya Dashami Shobha Yatra through village streets'
      ],
      te: [
        'మొదటి సంవత్సరం — దొడ్లపహాడ్‌లో శ్రీ దుర్గాభవాని ఉత్సవాల శుభారంభం',
        'మొదటి రోజు ఘటస్థాపన మరియు పవిత్ర కలశ పూజా విధి',
        'శాస్త్రోక్తంగా నిత్య చండీ హోమాలు మరియు కుంకుమార్చనలు',
        'గ్రామ వీధులలో ప్రారంభ విజయదశమి మహా శోభాయాత్ర'
      ]
    },
    isSample: true
  }
];

export const sampleAlbums: AlbumRecord[] = [
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
    coverImage: '/images/covers/cover-devi-alankaranalu.webp',
    photoCount: 10,
    status: 'published',
    albumType: 'avatars',
    isSample: true,
    photos: []
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
    coverImage: '/images/covers/cover-auction-winners.webp',
    photoCount: 0,
    status: 'published',
    albumType: 'auction',
    isSample: true,
    photos: []
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
    coverImage: '/images/covers/cover-utsav-highlights.webp',
    photoCount: 2,
    status: 'published',
    albumType: 'general',
    isSample: true,
    photos: [
      {
        id: 'p-2026-1',
        url: createSampleSvgImage('Third Year Alankaram', 'Photo', '#7A0C0C', 'mandir'),
        caption: {
          en: 'Sri Durga Bhavani adorned in special alankaram for the third year of celebrations',
          te: 'మూడవ సంవత్సర ఉత్సవాల సందర్భంగా ప్రత్యేక దివ్య అలంకారంలో దర్శనమిస్తున్న శ్రీ దుర్గాభవాని అమ్మవారు'
        },
        altText: {
          en: 'Alankaram of Sri Durga Bhavani with golden ornaments and fresh flowers',
          te: 'స్వర్ణాభరణాలు మరియు తాజా పూలమాలలతో శ్రీ దుర్గాభవాని అమ్మవారి దివ్యాలంకారం'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2026,
        albumSlug: 'utsav-celebrations-2026',
        isSample: true
      },
      {
        id: 'p-2026-2',
        url: createSampleSvgImage('Community Maha Aarti', 'Photo', '#7A0C0C', 'diya'),
        caption: {
          en: 'Maha Aarti offered with devotee participation during Utsav 2026',
          te: 'ఉత్సవం 2026 లో భక్తుల సమక్షంలో సమర్పించిన దివ్య మహా మంగళ హారతి'
        },
        altText: {
          en: 'Priests and devotees participating in evening Maha Aarti',
          te: 'సాయంత్రం మహా హారతిలో పాల్గొంటున్న అర్చకులు మరియు భక్తులు'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2026,
        albumSlug: 'utsav-celebrations-2026',
        isSample: true
      }
    ]
  },
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
    coverImage: '/images/covers/cover-devi-alankaranalu.webp',
    photoCount: 11,
    status: 'published',
    albumType: 'avatars',
    isSample: true,
    photos: []
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
    coverImage: '/images/covers/cover-auction-winners.webp',
    photoCount: 14,
    status: 'published',
    albumType: 'auction',
    isSample: true,
    photos: []
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
    coverImage: '/images/covers/cover-donors-sponsors.webp',
    photoCount: 4,
    status: 'published',
    albumType: 'donors',
    isSample: true,
    photos: []
  },
  {
    id: 'alb-2025-01',
    slug: 'annadanam-and-utsav-2025',
    title: {
      en: 'Maha Annadanam & Utsav Seva 2025',
      te: 'మహా అన్నదానం & ఉత్సవ సేవ 2025'
    },
    description: {
      en: 'Photographs of the community feeding and devotional celebrations during the second year of Sri Durga Bhavani Utsav.',
      te: 'రెండవ సంవత్సర శ్రీ దుర్గాభవాని ఉత్సవాల మహా అన్నదాన సేవ మరియు భక్తజన సమర్పణ.'
    },
    year: 2025,
    coverImage: '/images/covers/cover-annadanam-seva.webp',
    photoCount: 2,
    status: 'published',
    albumType: 'general',
    isSample: true,
    photos: [
      {
        id: 'p-2025-1',
        url: createSampleSvgImage('Volunteer Food Preparation', 'Photo', '#7A0C0C', 'kalash'),
        caption: {
          en: 'Samiti volunteers preparing traditional festival meals in the community kitchen',
          te: 'సమితి వాలంటీర్లు సామూహిక వంటశాలలో భక్తుల కొరకు అన్నప్రసాదం సిద్ధం చేస్తున్న దృశ్యం'
        },
        altText: {
          en: 'Volunteers preparing meals in large cooking vessels for Annadanam',
          te: 'అన్నదానం కోసం పెద్ద పాత్రలలో ప్రసాదం సిద్ధం చేస్తున్న స్వచ్ఛంద సేవకులు'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2025,
        albumSlug: 'annadanam-and-utsav-2025',
        isSample: true
      },
      {
        id: 'p-2025-2',
        url: createSampleSvgImage('Devotees Prasadam Seva', 'Photo', '#7A0C0C', 'mandir'),
        caption: {
          en: 'Devotees and visitors receiving hot prasadam meals during the second year celebrations',
          te: 'రెండవ సంవత్సర ఉత్సవాలలో వేడివేడి ప్రసాదాన్ని స్వీకరిస్తున్న గ్రామ భక్తులు'
        },
        altText: {
          en: 'Community dining hall where visitors are served festival prasadam',
          te: 'అన్నదాన భవనంలో భక్తులకు పంపిణీ జరుగుతున్న దృశ్యం'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2025,
        albumSlug: 'annadanam-and-utsav-2025',
        isSample: true
      }
    ]
  },
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
    coverImage: '/images/covers/cover-devi-alankaranalu.webp',
    photoCount: 10,
    status: 'published',
    albumType: 'avatars',
    isSample: true,
    photos: []
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
    coverImage: '/images/covers/cover-auction-winners.webp',
    photoCount: 0,
    status: 'published',
    albumType: 'auction',
    isSample: true,
    photos: []
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
    coverImage: '/images/covers/cover-shobha-yatra.webp',
    photoCount: 4,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-1',
        url: createSampleSvgImage('Floral Utsav Murti', 'Photo', '#7A0C0C', 'mandir'),
        caption: {
          en: 'Sri Durga Bhavani decorated with fresh marigold garlands for the inaugural Shobha Yatra',
          te: 'ప్రారంభ శోభాయాత్ర కొరకు బంతిపూల మాలలతో దివ్యంగా అలంకరించబడిన శ్రీ దుర్గాభవాని ఉత్సవ మూర్తి'
        },
        altText: {
          en: 'Alankaram of Sri Durga Bhavani with golden crown and floral garlands',
          te: 'కిరీటం మరియు పూలమాలలతో శ్రీ దుర్గాభవాని అమ్మవారి దివ్య దర్శనం'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      },
      {
        id: 'p-2',
        url: createSampleSvgImage('Palanquin Procession', 'Photo', '#7A0C0C', 'diya'),
        caption: {
          en: 'Palanquin carried by village youth accompanied by dhol and traditional instruments',
          te: 'డోలు, సన్నాయి వాయిద్యాలతో గ్రామ యువకులు భక్తితో మోస్తున్న పవిత్ర పల్లకీ'
        },
        altText: {
          en: 'Youth carrying the decorated palanquin through Dodlapahad village',
          te: 'దొడ్లపహాడ్ పురవీధులలో అలంకరించిన పల్లకీని మోస్తున్న గ్రామ యువత'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      },
      {
        id: 'p-3',
        url: createSampleSvgImage('Aarti at Temple Entrance', 'Photo', '#7A0C0C', 'diya'),
        caption: {
          en: 'Maha Mangala Aarti offered as the procession returned to the temple sanctum',
          te: 'శోభాయాత్ర తిరిగి ఆలయ ప్రాంగణానికి చేరుకున్నప్పుడు సమర్పించిన మహా మంగళ హారతి'
        },
        altText: {
          en: 'Priests holding brass multi-tier lamps offering Maha Aarti',
          te: 'ఇత్తడి దీపాలతో మహా హారతి సమర్పిస్తున్న వేద పండితులు'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      },
      {
        id: 'p-4',
        url: createSampleSvgImage('Devotees Gathering', 'Photo', '#7A0C0C', 'kalash'),
        caption: {
          en: 'Village elders and families gathered for concluding prasadam distribution',
          te: 'ఉత్సవ ముగింపు తీర్థ ప్రసాద వితరణ కొరకు విచ్చేసిన గ్రామ పెద్దలు, భక్త కుటుంబాలు'
        },
        altText: {
          en: 'Devotees seated in temple hall receiving consecrated prasadam',
          te: 'ఆలయ ప్రాంగణంలో తీర్థప్రసాదాలు స్వీకరిస్తున్న భక్తజనం'
        },
        photographerCredit: {
          en: 'Seva Samiti Media Volunteer',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు'
        },
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      }
    ]
  },
  {
    id: 'alb-2024-02',
    slug: 'chandi-homam-rituals-2024',
    title: {
      en: 'Sri Chandi Homam & Vedic Rituals 2024',
      te: 'శ్రీ చండీ హోమం & వేద క్రతువులు 2024'
    },
    description: {
      en: 'Sacred fire rituals, Chandi Parayanam, and Poornahuti performed for the prosperity and welfare of Dodlapahad village.',
      te: 'దొడ్లపహాడ్ గ్రామ క్షేమం మరియు ఆయురారోగ్యాల కొరకు వేద పండితులచే నిర్వహించబడిన పవిత్ర చండీ హోమం.'
    },
    year: 2024,
    coverImage: '/images/covers/cover-chandi-homam.webp',
    photoCount: 3,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-5',
        url: createSampleSvgImage('Yajna Kunda Setup', 'Photo', '#7A0C0C', 'diya'),
        caption: {
          en: 'Sacred Yajna Kunda prepared with ceremonial bricks and sacred offerings',
          te: 'శాస్త్రోక్తంగా అలంకరించబడిన పవిత్ర యజ్ఞ గుండం మరియు హోమ సామగ్రి'
        },
        altText: {
          en: 'Ceremonial sacred fire pit with wooden samidha and ghee offerings',
          te: 'సమిధలు మరియు ఘృత సమర్పణతో వెలుగుతున్న యజ్ఞ కుండం'
        },
        photographerCredit: {
          en: 'Seva Samiti Archive',
          te: 'సేవా సమితి ఆర్కైవ్'
        },
        year: 2024,
        albumSlug: 'chandi-homam-rituals-2024',
        isSample: true
      },
      {
        id: 'p-6',
        url: createSampleSvgImage('Priests Chanting Hymns', 'Photo', '#7A0C0C', 'kalash'),
        caption: {
          en: 'Vedic pandits reciting Sri Devi Mahatmyam during the afternoon session',
          te: 'శ్రీ దేవీ మహాత్మ్య పారాయణం చేస్తున్న వేద పండితులు'
        },
        altText: {
          en: 'Vedic priests in traditional silk attire chanting sacred verses',
          te: 'పట్టు వస్త్రాలు ధరించి వేద మంత్రాలు పఠిస్తున్న అర్చకులు'
        },
        photographerCredit: {
          en: 'Seva Samiti Archive',
          te: 'సేవా సమితి ఆర్కైవ్'
        },
        year: 2024,
        albumSlug: 'chandi-homam-rituals-2024',
        isSample: true
      },
      {
        id: 'p-7',
        url: createSampleSvgImage('Maha Poornahuti', 'Photo', '#7A0C0C', 'diya'),
        caption: {
          en: 'Concluding silk cloth and coconut offerings placed into the sacred flame',
          te: 'యజ్ఞ పూర్ణాహుతి సమర్పణతో సాఫల్యమైన చండీ యాగం'
        },
        altText: {
          en: 'Offering Poornahuti into the auspicious sacrificial fire',
          te: 'హోమ గుండంలో పూర్ణాహుతి సమర్పిస్తున్న దృశ్యం'
        },
        photographerCredit: {
          en: 'Seva Samiti Archive',
          te: 'సేవా సమితి ఆర్కైవ్'
        },
        year: 2024,
        albumSlug: 'chandi-homam-rituals-2024',
        isSample: true
      }
    ]
  }
];

export const sampleEvents: EventRecord[] = [
  {
    id: 'ev-1',
    slug: 'sri-durga-bhavani-utsav-2026',
    title: {
      en: 'Sri Durga Bhavani Utsav Celebrations 2026 (Third Year)',
      te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2026 (మూడవ సంవత్సరం)'
    },
    description: {
      en: 'The third year of celebrations featuring nine days of divine worship, sacred Chandi Homams, cultural presentations, and the concluding Vijayadashami Shobha Yatra.',
      te: 'తొమ్మిది రోజుల పాటు విశేష అలంకార పూజలు, హోమాలు, నిరన్నదానం మరియు విజయదశమి శోభాయాత్రతో జరిగే మూడవ సంవత్సర ఉత్సవాలు.'
    },
    startDate: '2026-10-11',
    endDate: '2026-10-20',
    time: {
      en: '6:00 AM - 9:30 PM Daily',
      te: 'ప్రతిరోజూ ఉదయం 6:00 నుండి రాత్రి 9:30 వరకు'
    },
    location: {
      en: 'Sri Durga Bhavani Temple Mandapam, Dodlapahad',
      te: 'శ్రీ దుర్గాభవాని ఆలయ ప్రాంగణం, దొడ్లపహాడ్'
    },
    posterUrl: createSampleSvgImage('Utsav 2026 Poster', 'Event', '#7A0C0C', 'mandir'),
    status: 'upcoming',
    year: 2026,
    isSample: true
  },
  {
    id: 'ev-2',
    slug: 'sri-durga-bhavani-utsav-2025',
    title: {
      en: 'Sri Durga Bhavani Utsav Celebrations 2025 (Second Year)',
      te: 'శ్రీ దుర్గాభవాని ఉత్సవాలు 2025 (రెండవ సంవత్సరం)'
    },
    description: {
      en: 'The second year of celebrations featuring traditional Alankarams, collective Annadanam, and devotional cultural programs.',
      te: 'రెండవ సంవత్సర ఉత్సవాల సందర్భంగా నిర్వహించిన సాంప్రదాయ అలంకారాలు, అన్నదానం మరియు భక్తి సంగీత కార్యక్రమాలు.'
    },
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    time: {
      en: '6:00 AM - 9:30 PM Daily',
      te: 'ప్రతిరోజూ ఉదయం 6:00 నుండి రాత్రి 9:30 వరకు'
    },
    location: {
      en: 'Sri Durga Bhavani Temple Mandapam, Dodlapahad',
      te: 'శ్రీ దుర్గాభవాని ఆలయ ప్రాంగణం, దొడ్లపహాడ్'
    },
    posterUrl: createSampleSvgImage('Utsav 2025 Poster', 'Event', '#7A0C0C', 'kalash'),
    status: 'past',
    year: 2025,
    isSample: true
  },
  {
    id: 'ev-3',
    slug: 'vijaya-dashami-procession-2024',
    title: {
      en: 'Vijaya Dashami Grand Shobha Yatra 2024 (First Year)',
      te: 'విజయదశమి మహా శోభాయాత్ర 2024 (మొదటి సంవత్సరం)'
    },
    description: {
      en: 'The concluding celebratory procession of the inaugural year of celebrations at Dodlapahad.',
      te: 'ప్రారంభ సంవత్సర ఉత్సవాల ముగింపు పురస్కరించుకుని గ్రామమంతటా సాగిన వైభవ శోభాయాత్ర.'
    },
    startDate: '2024-10-12',
    time: {
      en: '4:00 PM - 10:00 PM',
      te: 'సాయంత్రం 4:00 నుండి రాత్రి 10:00 వరకు'
    },
    location: {
      en: 'Dodlapahad Village Streets to Temple Grounds',
      te: 'దొడ్లపహాడ్ గ్రామ వీధుల నుండి ఆలయ ప్రాంగణం వరకు'
    },
    posterUrl: createSampleSvgImage('Shobha Yatra 2024', 'Event', '#7A0C0C', 'mandir'),
    status: 'past',
    year: 2024,
    isSample: true
  }
];

export const sampleAnnouncements: AnnouncementRecord[] = [
  {
    id: 'ann-devi-shobha-yatra-2026',
    slug: 'devi-shobha-yatra-nimajjanam-2026',
    title: {
      en: 'Devi Shobha Yatra for Nimajjanam',
      te: 'నిమజ్జన మహోత్సవ దేవీ శోభాయాత్ర'
    },
    content: {
      en: "Sri Durga Bhavani Matha's Devi Shobha Yatra for Nimajjanam is scheduled for 21 October 2026.",
      te: 'శ్రీ దుర్గాభవాని అమ్మవారి నిమజ్జన మహోత్సవ దేవీ శోభాయాత్ర 21 అక్టోబర్ 2026న నిర్వహించబడుతుంది.'
    },
    publishedAt: '21-10-2026',
    imageUrl: createSampleSvgImage('Shobha Yatra', 'Notice', '#7A0C0C', 'mandir'),
    featured: true,
    isSample: false
  },
  {
    id: 'ann-website-launch-2026',
    slug: 'website-launch-2026',
    title: {
      en: 'Website Launch',
      te: 'అధికారిక వెబ్‌సైట్ ప్రారంభం'
    },
    content: {
      en: 'The official website of Sri Durga Bhavani Seva Samiti, Dodlapahad, was launched on 16 October 2026 to share our traditions, festival celebrations, photographs, and community information.',
      te: 'శ్రీ దుర్గాభవాని సేవా సమితి, దొడ్లపహాడ్ పవిత్ర సాంప్రదాయాలు, ఉత్సవ వేడుకలు, ఛాయాచిత్రాలు మరియు సమాజ సమాచారాన్ని భక్తులకు అందించేందుకు 16 అక్టోబర్ 2026న ఈ అధికారిక వెబ్‌సైట్ ప్రారంభించబడింది.'
    },
    publishedAt: '16-10-2026',
    imageUrl: createSampleSvgImage('Website Launch', 'Notice', '#7A0C0C', 'diya'),
    featured: true,
    isSample: false
  },
  {
    id: 'ann-3',
    slug: 'volunteer-registration-drive',
    title: {
      en: 'Volunteer Seva Registration for Upcoming Festival Events',
      te: 'రాబోయే ఉత్సవాల స్వచ్ఛంద సేవ కొరకు వాలంటీర్ల నమోదు'
    },
    content: {
      en: 'Interested village youth and devotees wishing to volunteer for prasadam management, traffic coordination, and media coverage are encouraged to contact the Seva Samiti coordinators.',
      te: 'అన్నప్రసాద వితరణ, భక్తజన సమన్వయం, క్యూలైన్లు మరియు మీడియా సేవల్లో స్వచ్ఛందంగా పాల్గొనదలచిన గ్రామ యువత మరియు భక్తులు సమితి సమన్వయకర్తలను సంప్రదించగలరు.'
    },
    publishedAt: '2025-02-10',
    featured: false,
    isSample: true
  }
];

export const sampleHistoryMilestones: HistoricalMilestoneRecord[] = [
  {
    id: 'utsav-2024',
    title: {
      en: '2024 — First Year',
      te: '2024 — మొదటి సంవత్సరం'
    },
    yearOrDate: {
      en: '2024 — First Year',
      te: '2024 — మొదటి సంవత్సరం'
    },
    description: {
      en: 'The beginning of Sri Durga Bhavani Utsav celebrations at Dodlapahad.',
      te: 'దొడ్లపహాడ్‌లో శ్రీ దుర్గాభవాని ఉత్సవాల ప్రారంభం.'
    },
    imageUrl: createSampleSvgImage('First Year 2024', 'History', '#7A0C0C', 'diya'),
    sortOrder: 1,
    status: 'published',
    isSample: true
  },
  {
    id: 'utsav-2025',
    title: {
      en: '2025 — Second Year',
      te: '2025 — రెండవ సంవత్సరం'
    },
    yearOrDate: {
      en: '2025 — Second Year',
      te: '2025 — రెండవ సంవత్సరం'
    },
    description: {
      en: 'The second year of celebrations.',
      te: 'రెండవ సంవత్సర వేడుకలు.'
    },
    imageUrl: createSampleSvgImage('Second Year 2025', 'History', '#7A0C0C', 'kalash'),
    sortOrder: 2,
    status: 'published',
    isSample: true
  },
  {
    id: 'utsav-2026',
    title: {
      en: '2026 — Third Year',
      te: '2026 — మూడవ సంవత్సరం'
    },
    yearOrDate: {
      en: '2026 — Third Year',
      te: '2026 — మూడవ సంవత్సరం'
    },
    description: {
      en: 'The third year of celebrations.',
      te: 'మూడవ సంవత్సర వేడుకలు.'
    },
    imageUrl: createSampleSvgImage('Third Year 2026', 'History', '#7A0C0C', 'mandir'),
    sortOrder: 3,
    status: 'published',
    isSample: true
  }
];

export const sampleAvatars2025: AvatarRecord[] = [
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
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
    status: 'published',
    isSample: true
  }
];

const createSampleTenAvatars = (year: number, albumSlug: string): AvatarRecord[] => {
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
    status: 'published',
    isSample: true
  }));
};

export const sampleAvatars: AvatarRecord[] = [
  ...sampleAvatars2025,
  ...createSampleTenAvatars(2024, 'devi-alankaranalu-2024'),
  ...createSampleTenAvatars(2026, 'devi-alankaranalu-2026')
];

export const sampleAuctionItems: AuctionItemRecord[] = [
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 1,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 2,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 3,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 4,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 5,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 6,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 7,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 8,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 9,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 10,
    isSample: true
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
    photoUrl: undefined,
    itemType: 'saree',
    status: 'published',
    isComplete: true,
    sortOrder: 11,
    isSample: true
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
    sortOrder: 12,
    isSample: true
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
    sortOrder: 13,
    isSample: true
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
    sortOrder: 14,
    isSample: true
  }
];

export const sampleDonors: DonorRecord[] = [
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
    sortOrder: 1,
    isSample: true
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
    sortOrder: 2,
    isSample: true
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
    sortOrder: 3,
    isSample: true
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
    sortOrder: 4,
    isSample: true
  }
];

export const sampleAuditLogs: AuditLogRecord[] = [
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

