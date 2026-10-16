import type {
  YearRecord,
  AlbumRecord,
  EventRecord,
  AnnouncementRecord,
  HistoricalMilestoneRecord,
  SiteSettingsRecord
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
    <text x="200" y="233" font-family="sans-serif" font-size="10" fill="#E0D6C8" text-anchor="middle">★ SAMPLE RECORD FOR PREVIEW ★</text>
    
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
  contactEmail: 'contact@durgabhavani-dodlapahad.org (Sample Notice)',
  contactPhone: '+91 98765 43210 (Sample Notice)',
  locationAddress: {
    en: 'Sri Durga Bhavani Temple Premises, Dodlapahad, Telangana, India',
    te: 'శ్రీ దుర్గాభవాని ఆలయ ప్రాంగణం, దొడ్లపహాడ్ గ్రామం, తెలంగాణ, భారతదేశం'
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
    coverImage: createSampleSvgImage('Navaratri 2026', 'Year', '#7A0C0C', 'mandir'),
    startDate: '2026-10-10',
    endDate: '2026-10-19',
    status: 'published',
    albumCount: 1,
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
    coverImage: createSampleSvgImage('Navaratri 2025', 'Year', '#7A0C0C', 'kalash'),
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    status: 'published',
    albumCount: 1,
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
    coverImage: createSampleSvgImage('Navaratri 2024', 'Year', '#7A0C0C', 'diya'),
    startDate: '2024-10-03',
    endDate: '2024-10-12',
    status: 'published',
    albumCount: 2,
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
    coverImage: createSampleSvgImage('Utsav 2026', 'Album', '#7A0C0C', 'mandir'),
    photoCount: 2,
    status: 'published',
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
        },
        year: 2026,
        albumSlug: 'utsav-celebrations-2026',
        isSample: true
      }
    ]
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
    coverImage: createSampleSvgImage('Maha Annadanam 2025', 'Album', '#7A0C0C', 'kalash'),
    photoCount: 2,
    status: 'published',
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
        },
        year: 2025,
        albumSlug: 'annadanam-and-utsav-2025',
        isSample: true
      }
    ]
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
    coverImage: createSampleSvgImage('Shobha Yatra 2024', 'Album', '#7A0C0C', 'mandir'),
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
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
          en: 'Seva Samiti Media Volunteer (Sample)',
          te: 'సేవా సమితి మీడియా స్వచ్ఛంద సేవకుడు (నమూనా)'
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
    coverImage: createSampleSvgImage('Chandi Homam 2024', 'Album', '#7A0C0C', 'diya'),
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
          en: 'Seva Samiti Archive (Sample)',
          te: 'సేవా సమితి ఆర్కైవ్ (నమూనా)'
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
          en: 'Seva Samiti Archive (Sample)',
          te: 'సేవా సమితి ఆర్కైవ్ (నమూనా)'
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
          en: 'Seva Samiti Archive (Sample)',
          te: 'సేవా సమితి ఆర్కైవ్ (నమూనా)'
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
    startDate: '2026-10-10',
    endDate: '2026-10-19',
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
    id: 'ann-1',
    slug: 'welcome-to-new-portal-announcement',
    title: {
      en: 'Official Launch of Durga Bhavani Seva Samiti Digital Archive',
      te: 'దుర్గాభవాని సేవా సమితి డిజిటల్ ఆర్కైవ్ వేదిక ప్రారంభం'
    },
    content: {
      en: 'The Organizing Committee of Durga Bhavani Seva Samiti, Dodlapahad, is pleased to present this digital platform. Here, devotees can browse the annual festival archives, celebration milestones, photos, and announcements. Note: The current data displayed is sample demonstration data until verified committee documents are uploaded.',
      te: 'శ్రీ దుర్గాభవాని సేవా సమితి, దొడ్లపహాడ్ నిర్వాహక కమిటీ ఈ డిజిటల్ వేదికను భక్తులకు సమర్పిస్తోంది. ఇక్కడ భక్తులు వార్షిక ఉత్సవ వివరాలు, మైలురాళ్ళు, ఛాయాచిత్రాలు మరియు కమిటీ ప్రకటనలను వీక్షించవచ్చు. గమనిక: కమిటీ అధికారిక పత్రాలు అప్‌లోడ్ అయ్యేవరకు ప్రస్తుత సమాచారం నమూనా ప్రదర్శనగా ఉంటుంది.'
    },
    publishedAt: '2025-01-15',
    imageUrl: createSampleSvgImage('Portal Launch', 'Notice', '#7A0C0C', 'diya'),
    featured: true,
    isSample: true
  },
  {
    id: 'ann-2',
    slug: 'photo-submission-invitation',
    title: {
      en: 'Invitation to Devotees to Submit Festival Photographs',
      te: 'ఉత్సవ ఫోటోలను సమర్పించవలసిందిగా భక్తులకు ఆహ్వానం'
    },
    content: {
      en: 'Devotees who possess photographs or video recordings from Sri Durga Bhavani Utsav celebrations (from 2024 onwards) are invited to submit them to the committee for digital preservation.',
      te: '2024 ప్రారంభ సంవత్సరం నుండి జరిగిన శ్రీ దుర్గాభవాని ఉత్సవాల ఫోటోలు లేదా వీడియోలు భక్తుల వద్ద ఉంటే, వాటిని డిజిటల్ ఆర్కైవ్‌లో భద్రపరచుటకు కమిటీకి అందజేయవలసిందిగా కోరుచున్నాము.'
    },
    publishedAt: '2025-02-01',
    imageUrl: createSampleSvgImage('Photo Submission', 'Notice', '#7A0C0C', 'kalash'),
    featured: false,
    isSample: true
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
