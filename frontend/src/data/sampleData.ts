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
    year: 2026,
    title: 'Sri Durga Bhavani Utsav Celebrations 2026',
    slug: '2026',
    description:
      'The 2026 annual celebrations mark our third year of Sri Durga Bhavani Utsav at Dodlapahad, continuing the sacred tradition of devotion, community worship, and Annadanam.',
    coverImage: createSampleSvgImage('Navaratri 2026', 'Year', '#7A0C0C', 'mandir'),
    startDate: '2026-10-10',
    endDate: '2026-10-19',
    status: 'published',
    albumCount: 1,
    highlights: [
      'Third Year of Sri Durga Bhavani Utsav celebrations at Dodlapahad',
      'Daily Alankarams, Kumkumarchana, and sacred Chandi Parayanam',
      'Community Annadanam and evening cultural presentations',
      'Grand Vijaya Dashami Shobha Yatra with floral palanquin'
    ],
    isSample: true
  },
  {
    year: 2025,
    title: 'Sri Durga Bhavani Utsav Celebrations 2025',
    slug: '2025',
    description:
      'The 2025 annual celebrations marked the second year of Sri Durga Bhavani Utsav at Dodlapahad, featuring vibrant festivities, sacred rituals, and community participation.',
    coverImage: createSampleSvgImage('Navaratri 2025', 'Year', '#7A0C0C', 'kalash'),
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    status: 'published',
    albumCount: 1,
    highlights: [
      'Second Year of Sri Durga Bhavani Utsav celebrations at Dodlapahad',
      'Nine nights of devotional poojas and special alankarams',
      'Maha Annadanam serving village devotees and visiting families',
      'Traditional music, bhajans, and festive procession'
    ],
    isSample: true
  },
  {
    year: 2024,
    title: 'Sri Durga Bhavani Utsav Celebrations 2024',
    slug: '2024',
    description:
      'The 2024 annual celebrations marked the inaugural first year of Sri Durga Bhavani Utsav at Dodlapahad, initiating the annual tradition of nine sacred days of worship and community unity.',
    coverImage: createSampleSvgImage('Navaratri 2024', 'Year', '#7A0C0C', 'diya'),
    startDate: '2024-10-03',
    endDate: '2024-10-12',
    status: 'published',
    albumCount: 2,
    highlights: [
      'First Year — The beginning of Sri Durga Bhavani Utsav celebrations at Dodlapahad',
      'Ghatasthapana & Kalasha Pooja rituals on Day 1',
      'Daily Chandi Homam & Kumkumarchana conducted with Vedic sanctity',
      'Inaugural Vijaya Dashami Shobha Yatra through village streets'
    ],
    isSample: true
  }
];

export const sampleAlbums: AlbumRecord[] = [
  {
    id: 'alb-2026-01',
    slug: 'utsav-celebrations-2026',
    title: 'Sri Durga Bhavani Utsav 2026 Highlights',
    description:
      'Moments of devotional worship, community seva, and festivities from the third year of celebrations.',
    year: 2026,
    coverImage: createSampleSvgImage('Utsav 2026', 'Album', '#7A0C0C', 'mandir'),
    photoCount: 2,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-2026-1',
        url: createSampleSvgImage('Third Year Alankaram', 'Photo', '#7A0C0C', 'mandir'),
        caption: 'Sri Durga Bhavani adorned in special alankaram for the third year of celebrations',
        altText: 'Alankaram of Sri Durga Bhavani with golden ornaments and fresh flowers',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2026,
        albumSlug: 'utsav-celebrations-2026',
        isSample: true
      },
      {
        id: 'p-2026-2',
        url: createSampleSvgImage('Community Maha Aarti', 'Photo', '#7A0C0C', 'diya'),
        caption: 'Maha Aarti offered with devotee participation during Utsav 2026',
        altText: 'Priests and devotees participating in evening Maha Aarti',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2026,
        albumSlug: 'utsav-celebrations-2026',
        isSample: true
      }
    ]
  },
  {
    id: 'alb-2025-01',
    slug: 'annadanam-and-utsav-2025',
    title: 'Maha Annadanam & Utsav Seva 2025',
    description:
      'Photographs of the community feeding and devotional celebrations during the second year of Sri Durga Bhavani Utsav.',
    year: 2025,
    coverImage: createSampleSvgImage('Maha Annadanam 2025', 'Album', '#7A0C0C', 'kalash'),
    photoCount: 2,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-2025-1',
        url: createSampleSvgImage('Volunteer Food Preparation', 'Photo', '#7A0C0C', 'kalash'),
        caption: 'Samiti volunteers preparing traditional festival meals in the community kitchen',
        altText: 'Volunteers preparing meals in large cooking vessels for Annadanam',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2025,
        albumSlug: 'annadanam-and-utsav-2025',
        isSample: true
      },
      {
        id: 'p-2025-2',
        url: createSampleSvgImage('Devotees Prasadam Seva', 'Photo', '#7A0C0C', 'mandir'),
        caption: 'Devotees and visitors receiving hot prasadam meals during the second year celebrations',
        altText: 'Community dining hall where visitors are served festival prasadam',
        photographerCredit: 'Seva Samiti Media Volunteer (Sample)',
        year: 2025,
        albumSlug: 'annadanam-and-utsav-2025',
        isSample: true
      }
    ]
  },
  {
    id: 'alb-2024-01',
    slug: 'vijaya-dashami-shobha-yatra-2024',
    title: 'Vijaya Dashami Shobha Yatra 2024',
    description:
      'Grand procession of Sri Durga Bhavani through the streets of Dodlapahad marking the culmination of the inaugural celebrations.',
    year: 2024,
    coverImage: createSampleSvgImage('Shobha Yatra 2024', 'Album', '#7A0C0C', 'mandir'),
    photoCount: 4,
    status: 'published',
    isSample: true,
    photos: [
      {
        id: 'p-1',
        url: createSampleSvgImage('Floral Utsav Murti', 'Photo', '#7A0C0C', 'mandir'),
        caption: 'Sri Durga Bhavani decorated with fresh marigold garlands for the inaugural Shobha Yatra',
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
  }
];

export const sampleEvents: EventRecord[] = [
  {
    id: 'ev-1',
    slug: 'sri-durga-bhavani-utsav-2026',
    title: 'Sri Durga Bhavani Utsav Celebrations 2026 (Third Year)',
    description:
      'The third year of celebrations featuring nine days of divine worship, sacred Chandi Homams, cultural presentations, and the concluding Vijayadashami Shobha Yatra.',
    startDate: '2026-10-10',
    endDate: '2026-10-19',
    time: '6:00 AM - 9:30 PM Daily',
    location: 'Sri Durga Bhavani Temple Mandapam, Dodlapahad',
    posterUrl: createSampleSvgImage('Utsav 2026 Poster', 'Event', '#7A0C0C', 'mandir'),
    status: 'upcoming',
    year: 2026,
    isSample: true
  },
  {
    id: 'ev-2',
    slug: 'sri-durga-bhavani-utsav-2025',
    title: 'Sri Durga Bhavani Utsav Celebrations 2025 (Second Year)',
    description:
      'The second year of celebrations featuring traditional Alankarams, collective Annadanam, and devotional cultural programs.',
    startDate: '2025-09-22',
    endDate: '2025-10-01',
    time: '6:00 AM - 9:30 PM Daily',
    location: 'Sri Durga Bhavani Temple Mandapam, Dodlapahad',
    posterUrl: createSampleSvgImage('Utsav 2025 Poster', 'Event', '#7A0C0C', 'kalash'),
    status: 'past',
    year: 2025,
    isSample: true
  },
  {
    id: 'ev-3',
    slug: 'vijaya-dashami-procession-2024',
    title: 'Vijaya Dashami Grand Shobha Yatra 2024 (First Year)',
    description:
      'The concluding celebratory procession of the inaugural year of celebrations at Dodlapahad.',
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
      'The Organizing Committee of Durga Bhavani Seva Samiti, Dodlapahad, is pleased to present this digital platform. Here, devotees can browse the annual festival archives, celebration milestones, photos, and announcements. Note: The current data displayed is sample demonstration data until verified committee documents are uploaded.',
    publishedAt: '2025-01-15',
    imageUrl: createSampleSvgImage('Portal Launch', 'Notice', '#7A0C0C', 'diya'),
    featured: true,
    isSample: true
  },
  {
    id: 'ann-2',
    slug: 'photo-submission-invitation',
    title: 'Invitation to Devotees to Submit Festival Photographs',
    content:
      'Devotees who possess photographs or video recordings from Sri Durga Bhavani Utsav celebrations (from 2024 onwards) are invited to submit them to the committee for digital preservation.',
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
    id: 'utsav-2024',
    title: '2024 — First Year',
    yearOrDate: '2024',
    description:
      'The beginning of Sri Durga Bhavani Utsav celebrations at Dodlapahad.',
    imageUrl: createSampleSvgImage('First Year 2024', 'History', '#7A0C0C', 'diya'),
    sortOrder: 1,
    status: 'published',
    isSample: true
  },
  {
    id: 'utsav-2025',
    title: '2025 — Second Year',
    yearOrDate: '2025',
    description:
      'The second year of celebrations.',
    imageUrl: createSampleSvgImage('Second Year 2025', 'History', '#7A0C0C', 'kalash'),
    sortOrder: 2,
    status: 'published',
    isSample: true
  },
  {
    id: 'utsav-2026',
    title: '2026 — Third Year',
    yearOrDate: '2026',
    description:
      'The third year of celebrations.',
    imageUrl: createSampleSvgImage('Third Year 2026', 'History', '#7A0C0C', 'mandir'),
    sortOrder: 3,
    status: 'published',
    isSample: true
  }
];
