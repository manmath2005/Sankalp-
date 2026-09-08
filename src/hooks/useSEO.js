import { useEffect } from 'react';

const BASE_URL = 'https://sankalp-zeta.vercel.app';

const VIEW_SEO_CONFIG = {
  'home': {
    title: '🤝 Sankalp: Connecting Help to Hope | Disaster Relief & CSR Coordination India',
    description: 'Sankalp is India\'s centralized high-availability disaster relief and CSR coordination network connecting verified NGOs, corporate partners, and volunteers across crisis zones.',
    keywords: 'Sankalp, Disaster Relief India, CSR Coordination, Verified NGOs, Volunteer Blood Drives, Emergency Relief, Manmath N. Sangave',
    path: '/'
  },
  'events': {
    title: '🚨 Disaster Relief & Blood Donation Drives | Sankalp Crisis Response',
    description: 'Explore active disaster relief operations, community blood drives, flood aid, and urgent humanitarian volunteer opportunities across India on Sankalp.',
    keywords: 'Disaster Relief Drives, Blood Donation Camps, Volunteer Relief, Cyclone Relief, Flood Aid India, Sankalp Events',
    path: '/events'
  },
  'records': {
    title: '📜 Audited Relief Drives & Historical Impact Records | Sankalp Network',
    description: 'Verify audited completion records, citizen impact metrics, and volunteer participation history from completed disaster relief and awareness drives.',
    keywords: 'Disaster Relief Audit, CSR Completion Certificates, Verified NGO History, Relief Statistics, Sankalp Records',
    path: '/records'
  },
  'about-us': {
    title: '🏛️ About Sankalp | Mission, Governance & Founder Manmath N. Sangave',
    description: 'Learn about Sankalp\'s mission to bridge the gap between crisis zones and willing aid. Founded by Manmath N. Sangave with 80G, 12A, and Darpan certified credentials.',
    keywords: 'About Sankalp, Manmath N. Sangave, NGO Credentials India, 80G Certified, 12A Registered, Darpan Verified',
    path: '/about-us'
  },
  'corporate-partner': {
    title: '🏢 Institutional Corporate CSR & Awareness Drives | Sankalp Partner Portal',
    description: 'Host certified institutional awareness drives, blood donation camps, and employee volunteering programs. One-click MCA Section 135 & BRSR ESG reporting ready.',
    keywords: 'Corporate CSR India, Host Awareness Drive, Employee Volunteering, ESG Reporting, MCA Section 135 Compliance, Sankalp Corporate Partner',
    path: '/corporate-partner'
  },
  'corporate-esg-report': {
    title: '📊 One-Click Corporate CSR & ESG Annual Report Generator | MCA Section 135',
    description: 'Generate statutory MCA Section 135 & BRSR compliant ESG annual reports, financial CSR allocation breakdowns, and verified volunteer hour audit ledgers.',
    keywords: 'ESG Annual Report Generator, MCA Section 135, BRSR Compliance, CSR Spending Audit, Corporate Sustainability Report',
    path: '/corporate-esg-report'
  },
  'volunteer-hub': {
    title: '🌟 Volunteer Impact Dashboard | Sankalp Civic Network',
    description: 'Track your humanitarian service hours, verified digital certificates, event participation, and duty NOCs on the Sankalp Volunteer Dashboard.',
    keywords: 'Volunteer Dashboard, Digital Volunteer Certificate, Social Impact Tracking, Sankalp Volunteer Hub',
    path: '/volunteer-hub'
  },
  'verify-certificate': {
    title: '🔐 Cryptographic Volunteer Certificate Verification | Sankalp Network',
    description: 'Authenticate tamper-proof volunteer service certificates issued by Sankalp using unique verification IDs or QR codes for academic and professional credentials.',
    keywords: 'Verify Certificate, Volunteer Credential Verification, Tamper-proof Certificate, Sankalp Verification',
    path: '/verify-certificate'
  },
  'ai-matchmaker': {
    title: '🤖 AI CSR Event Matchmaker | Sankalp Intelligent NGO Matching',
    description: 'Match corporate CSR budgets, cause preferences, and locations with verified high-impact grassroots NGOs using Sankalp\'s intelligent recommendation algorithm.',
    keywords: 'AI CSR Matchmaker, NGO Matching Algorithm, Corporate CSR Recommendations, Verified Nonprofits India',
    path: '/ai-matchmaker'
  },
  'volunteer-login': {
    title: '🔑 Volunteer Sign In & Registration | Sankalp Community Hub',
    description: 'Join thousands of active volunteers coordinating disaster relief, crisis logistics, and community awareness drives across India.',
    keywords: 'Volunteer Sign In, Register as Volunteer, Disaster Volunteer India, Sankalp Volunteer Login',
    path: '/volunteer-login'
  },
  'company-login': {
    title: '🏢 Corporate Partner Portal Login | Sankalp CSR Network',
    description: 'Access institutional CSR event management, employee volunteering trackers, and compliance audit dossiers on Sankalp.',
    keywords: 'Corporate Partner Login, CSR Portal Sign In, Institutional Partner Sankalp',
    path: '/company-login'
  },
  'ngo-login': {
    title: '🤝 NGO Partner Portal Login | Sankalp NGO Network',
    description: 'NGO lead portal for verified nonprofit organizations to publish urgent relief drives, request supplies, and recruit verified volunteers.',
    keywords: 'NGO Login, Nonprofit Portal, Disaster Relief Organization Sign In, Sankalp NGO',
    path: '/ngo-login'
  }
};

/**
 * Hook to dynamically optimize title, meta descriptions, canonical links, OpenGraph, and JSON-LD schema
 * @param {string} activeView - The current active view name (e.g. 'home', 'events', 'corporate-partner')
 */
export const useSEO = (activeView) => {
  useEffect(() => {
    const config = VIEW_SEO_CONFIG[activeView] || VIEW_SEO_CONFIG['home'];
    const canonicalUrl = `${BASE_URL}${config.path === '/' ? '' : config.path}`;

    // 1. Update Document Title
    document.title = config.title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute, name, content) => {
      let elem = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attribute, name);
        document.head.appendChild(elem);
      }
      elem.setAttribute('content', content);
    };

    // 3. Set standard SEO meta tags
    setMetaTag('name', 'description', config.description);
    setMetaTag('name', 'keywords', config.keywords);
    setMetaTag('name', 'robots', 'index, follow');

    // 4. Set Open Graph tags
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:image', `${BASE_URL}/sankalp_logo.png`);

    // 5. Set Twitter Card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:image', `${BASE_URL}/sankalp_logo.png`);

    // 6. Set Canonical Link
    let canonicalElem = document.querySelector('link[rel="canonical"]');
    if (!canonicalElem) {
      canonicalElem = document.createElement('link');
      canonicalElem.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElem);
    }
    canonicalElem.setAttribute('href', canonicalUrl);

    // 7. Inject Breadcrumbs JSON-LD Structured Data
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': BASE_URL
        },
        ...(config.path !== '/' ? [{
          '@type': 'ListItem',
          'position': 2,
          'name': config.title.split('|')[0].trim(),
          'item': canonicalUrl
        }] : [])
      ]
    };

    let breadcrumbScript = document.getElementById('seo-breadcrumbs-jsonld');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'seo-breadcrumbs-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbData);

  }, [activeView]);
};
