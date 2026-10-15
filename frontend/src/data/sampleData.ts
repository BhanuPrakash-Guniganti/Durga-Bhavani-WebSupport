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
  organizationName: 'Durga Bhavani Seva Samiti - Dodlapahad',
  tagline: 'Preserving Devotion, Cultural Heritage, and Community Service',
  aboutText:
    'Durga Bhavani Seva Samiti is a dedicated community organization in Dodlapahad committed to organizing the annual Navaratri celebrations, preserving village cultural traditions, conducting community welfare services, and archiving temple memories for future generations.',
  mission:
    'To foster spiritual devotion, cultural solidarity, and voluntary service among devotees and villagers through disciplined annual festival coordination and community harmony.',
  vision:
    'To preserve the sacred legacy of Sri Durga Bhavani Temple, Dodlapahad, while fostering youth participation in cultural preservation, digital archiving, and charitable service.',
  contactEmail: 'contact@durgabhavani-dodlapahad.org (Sample Notice)',
  contactPhone: '+91 98765 43210 (Sample Notice)',
  locationAddress: 'Sri Durga Bhavani Temple Premises, Dodlapahad, Telangana, India',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Dodlapahad&t=&z=13&ie=UTF8&iwloc=&output=embed',
  socialLinks: {
    youtube: 'https://youtube.com/@DurgaBhavaniDodlapahad',
    facebook: 'https://facebook.com/DurgaBhavaniDodlapahad',
    whatsapp: 'https://chat.whatsapp.com/sample'
  },
  footerNotice:
    'Durga Bhavani Seva Samiti - Dodlapahad. All rights reserved. Content verified and authorized by the Organizing Committee.'
};

export const sampleYears: YearRecord[] = [
  {
    year: 2024,
    title: 'Navaratri Utsav Celebrations 2024',
    slug: '2024',
    description:
      'The 2024 annual Sri Durga Bhavani Navaratri celebrations in Dodlapahad marked nine days of devotional rituals, community poojas, cultural programs, and the grand Vijaya Dashami Shobha Yatra.',
    coverImage: createSampleSvgImage('Navaratri 2024', 'Year', '#7A0C0C', 'diya'),
    startDate: '2024-10-03',
    endDate: '2024-10-12',
    status: 'published',
    albumCount: 3,
    highlights: [
      'Ghatasthapana & Kalasha Pooja rituals on Day 1',
      'Daily Chandi Homam & Kumkumarchana conducted by Vedic pandits',
      'Village youth cultural performances and devotional bhajans',
      'Grand Vijaya Dashami Shobha Yatra with traditional music and floral chariot'
    ],
    isSample: true
  },
  {
    year: 2023,
    title: 'Navaratri Utsav Celebrations 2023',
    slug: '2023',
    description:
      'Highlights from the 2023 Navaratri festival including traditional Alankarams, collective community Annadanam, and cultural programs organized by the Samiti.',
    coverImage: createSampleSvgImage('Navaratri 2023', 'Year', '#7A0C0C', 'mandir'),
    startDate: '2023-10-15',
    endDate: '2023-10-24',
    status: 'published',
    albumCount: 2,
    highlights: [
      'Daily Sri Durga Alankaram rituals',
      'Maha Annadanam serving thousands of village devotees',
      'Ayudha Pooja & community felicitation'
    ],
    isSample: true
  },
  {
    year: 2022,
    title: 'Navaratri Utsav Celebrations 2022',
    slug: '2022',
    description:
      'Commemoration of village traditions, devotional sangeetham, and the vibrant procession marking the culmination of Navaratri 2022.',
    coverImage: createSampleSvgImage('Navaratri 2022', 'Year', '#7A0C0C', 'kalash'),
    startDate: '2022-09-26',
    endDate: '2022-10-05',
    status: 'published',
    albumCount: 2,
    highlights: [
      'Temple renovation anniversary rituals',
      'Vedic chanting by local priests',
      'Traditional Kolatam dance presentation by village youth'
    ],
    isSample: true
  }
];

export const sampleAlbums: AlbumRecord[] = [
  {
    id: 'alb-2024-01',
    slug: 'vijaya-dashami-shobha-yatra-2024',
    title: 'Vijaya Dashami Shobha Yatra 2024',
    description:
      'Grand procession of Sri Durga Bhavani through the streets of Dodlapahad with floral palanquin, traditional instruments, and devotee participation.',
    year: 2024,
    coverImage: createSampleSvgImage('Shobha Yatra 2024', 'Album', '#7A0C0C', 'mandir'),
    photoCount: 4,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-1',
        url: createSampleSvgImage('Floral Utsav Murti', 'Photo', '#7A0C0C', 'mandir'),
        caption: 'Sri Durga Bhavani decorated with fresh marigold garlands for Shobha Yatra',
        altText: 'Alankaram of Sri Durga Bhavani with golden crown and floral garlands',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      },
      {
        id: 'p-2',
        url: createSampleSvgImage('Palanquin Procession', 'Photo', '#7A0C0C', 'diya'),
        caption: 'Palanquin carried by village youth accompanied by dhol and traditional instruments',
        altText: 'Youth carrying the decorated palanquin through Dodlapahad village',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      },
      {
        id: 'p-3',
        url: createSampleSvgImage('Aarti at Temple Entrance', 'Photo', '#7A0C0C', 'diya'),
        caption: 'Maha Mangala Aarti offered as the procession returned to the temple sanctum',
        altText: 'Priests holding brass multi-tier lamps offering Maha Aarti',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      },
      {
        id: 'p-4',
        url: createSampleSvgImage('Devotees Gathering', 'Photo', '#7A0C0C', 'kalash'),
        caption: 'Village elders and families gathered for concluding prasadam distribution',
        altText: 'Devotees seated in temple hall receiving consecrated prasadam',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2024,
        albumSlug: 'vijaya-dashami-shobha-yatra-2024',
        isSample: true
      }
    ]
  },
  {
    id: 'alb-2024-02',
    slug: 'chandi-homam-rituals-2024',
    title: 'Sri Chandi Homam & Vedic Rituals 2024',
    description:
      'Sacred fire rituals, Chandi Parayanam, and Poornahuti performed for the prosperity and welfare of Dodlapahad village.',
    year: 2024,
    coverImage: createSampleSvgImage('Chandi Homam 2024', 'Album', '#7A0C0C', 'diya'),
    photoCount: 3,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-5',
        url: createSampleSvgImage('Yajna Kunda Setup', 'Photo', '#7A0C0C', 'diya'),
        caption: 'Sacred Yajna Kunda prepared with ceremonial bricks and sacred offerings',
        altText: 'Ceremonial sacred fire pit with wooden samidha and ghee offerings',
        photographerCredit: 'Seva Samiti Archive (Sample)',
        year: 2024,
        albumSlug: 'chandi-homam-rituals-2024',
        isSample: true
      },
      {
        id: 'p-6',
        url: createSampleSvgImage('Priests Chanting Hymns', 'Photo', '#7A0C0C', 'kalash'),
        caption: 'Vedic pandits reciting Sri Devi Mahatmyam during the afternoon session',
        altText: 'Vedic priests in traditional silk attire chanting sacred verses',
        photographerCredit: 'Seva Samiti Archive (Sample)',
        year: 2024,
        albumSlug: 'chandi-homam-rituals-2024',
        isSample: true
      },
      {
        id: 'p-7',
        url: createSampleSvgImage('Maha Poornahuti', 'Photo', '#7A0C0C', 'diya'),
        caption: 'Concluding silk cloth and coconut offerings placed into the sacred flame',
        altText: 'Offering Poornahuti into the auspicious sacrificial fire',
        photographerCredit: 'Seva Samiti Archive (Sample)',
        year: 2024,
        albumSlug: 'chandi-homam-rituals-2024',
        isSample: true
      }
    ]
  },
  {
    id: 'alb-2023-01',
    slug: 'annadanam-seva-2023',
    title: 'Maha Annadanam & Community Seva 2023',
    description:
      'Photographs of the annual community feeding organized by Durga Bhavani Seva Samiti members and volunteers.',
    year: 2023,
    coverImage: createSampleSvgImage('Maha Annadanam 2023', 'Album', '#7A0C0C', 'kalash'),
    photoCount: 2,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-8',
        url: createSampleSvgImage('Volunteer Food Preparation', 'Photo', '#7A0C0C', 'kalash'),
        caption: 'Samiti volunteers preparing traditional festival meals in the community kitchen',
        altText: 'Volunteers preparing meals in large brass cooking vessels',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2023,
        albumSlug: 'annadanam-seva-2023',
        isSample: true
      },
      {
        id: 'p-9',
        url: createSampleSvgImage('Devotees Prasadam Seva', 'Photo', '#7A0C0C', 'mandir'),
        caption: 'Devotees and visitors receiving hot prasadam meals during Navaratri',
        altText: 'Community dining hall where visitors are served festival prasadam',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2023,
        albumSlug: 'annadanam-seva-2023',
        isSample: true
      }
    ]
  }
];

export const sampleEvents: EventRecord[] = [
  {
    id: 'ev-1',
    slug: 'sri-durga-navaratri-utsav-2025',
    title: 'Sri Durga Navaratri Utsav Celebrations 2025 (Tentative)',
    description:
      'The upcoming 9-day annual celebrations will include daily Kalashabhishekam, Sahasranama Archana, evening devotional music, and the concluding Vijayadashami Shobha Yatra.',
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    time: '6:00 AM - 9:30 PM Daily',
    location: 'Sri Durga Bhavani Temple Mandapam, Dodlapahad',
    posterUrl: createSampleSvgImage('Navaratri 2025 Poster', 'Event', '#7A0C0C', 'mandir'),
    status: 'upcoming',
    year: 2025,
    isSample: true
  },
  {
    id: 'ev-2',
    slug: 'monthly-pournami-special-pooja',
    title: 'Monthly Pournami Devi Abhishekam & Samiti Meeting',
    description:
      'Auspicious full moon day special abhishekam followed by the monthly administrative coordination meeting of the Seva Samiti members.',
    startDate: '2025-03-14',
    time: '5:30 PM - 8:30 PM',
    location: 'Temple Inner Sanctum & Community Hall',
    posterUrl: createSampleSvgImage('Pournami Pooja', 'Event', '#7A0C0C', 'diya'),
    status: 'upcoming',
    year: 2025,
    isSample: true
  },
  {
    id: 'ev-3',
    slug: 'vijaya-dashami-procession-2024',
    title: 'Vijaya Dashami Grand Shobha Yatra 2024',
    description:
      'Concluded celebratory procession of the temple festival with participation from all neighborhood families and cultural troupes.',
    startDate: '2024-10-12',
    time: '4:00 PM - 10:00 PM',
    location: 'Dodlapahad Village Streets to Temple Grounds',
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
    title: 'Official Launch of Durga Bhavani Seva Samiti Digital Archive',
    content:
      'The Organizing Committee of Durga Bhavani Seva Samiti, Dodlapahad, is pleased to present this digital platform. Here, devotees can browse the annual festival archives, historical milestones, photos, and announcements. Note: The current data displayed is sample demonstration data until verified committee documents are uploaded.',
    publishedAt: '2025-01-15',
    imageUrl: createSampleSvgImage('Portal Launch', 'Notice', '#7A0C0C', 'diya'),
    featured: true,
    isSample: true
  },
  {
    id: 'ann-2',
    slug: 'photo-submission-invitation',
    title: 'Invitation to Devotees to Submit Historical Photographs',
    content:
      'Devotees who possess vintage photographs, video recordings, or souvenir booklets from past Dodlapahad Navaratri festivals (prior to 2015) are invited to submit them to the committee for digital preservation.',
    publishedAt: '2025-02-01',
    imageUrl: createSampleSvgImage('Photo Submission', 'Notice', '#7A0C0C', 'kalash'),
    featured: false,
    isSample: true
  },
  {
    id: 'ann-3',
    slug: 'volunteer-registration-drive',
    title: 'Volunteer Seva Registration for Upcoming Festival Events',
    content:
      'Interested village youth and devotees wishing to volunteer for prasadam management, traffic coordination, and media coverage are encouraged to contact the Seva Samiti coordinators.',
    publishedAt: '2025-02-10',
    featured: false,
    isSample: true
  }
];

export const sampleHistoryMilestones: HistoricalMilestoneRecord[] = [
  {
    id: 'm-1',
    title: 'Origins of Sri Durga Bhavani Temple in Dodlapahad',
    yearOrDate: 'Historical Foundation',
    description:
      'Local elders and village families established the worship of Sri Durga Bhavani in Dodlapahad to seek divine protection, health, and bountiful harvest. (Verified historical chronology will be authored by the committee).',
    imageUrl: createSampleSvgImage('Temple Origins', 'History', '#7A0C0C', 'mandir'),
    sortOrder: 1,
    status: 'published',
    isSample: true
  },
  {
    id: 'm-2',
    title: 'Formalization of the Annual Navaratri Utsav Committee',
    yearOrDate: 'Circa 1995',
    description:
      'Village elders and youth joined together to formalize the annual celebration committee to ensure disciplined organization, daily Annadanam, and collective community participation.',
    imageUrl: createSampleSvgImage('Committee Formation', 'History', '#7A0C0C', 'kalash'),
    sortOrder: 2,
    status: 'published',
    isSample: true
  },
  {
    id: 'm-3',
    title: 'Temple Renovation & Mandapam Construction',
    yearOrDate: '2010',
    description:
      'With generous contributions from Dodlapahad residents and devotees, the temple sanctum was restored and a spacious community mandapam was erected to host festival rituals and cultural programs.',
    imageUrl: createSampleSvgImage('Mandapam Construction', 'History', '#7A0C0C', 'mandir'),
    sortOrder: 3,
    status: 'published',
    isSample: true
  },
  {
    id: 'm-4',
    title: 'Initiation of Digital Preservation and Media Archive',
    yearOrDate: 'Recent Initiative',
    description:
      'Durga Bhavani Seva Samiti established this digital platform to ensure that the annual celebrations, photos, memories, and records are safely preserved for future generations.',
    imageUrl: createSampleSvgImage('Digital Archiving', 'History', '#7A0C0C', 'diya'),
    sortOrder: 4,
    status: 'published',
    isSample: true
  }
];
