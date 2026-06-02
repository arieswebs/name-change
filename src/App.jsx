import React, { useState } from 'react';

// Steps data
const STEPS_DATA = [
  {
    id: 1,
    title: "Name Selection & Finalization",
    category: "PREP",
    categoryClass: "badge-prep",
    whatToDecide: "Before filing any document, you must finalize the exact spelling of your new name — including whether to include or drop initials, middle names, or honorifics.",
    scenarios: [
      "Changing your full name (e.g. after marriage or personal preference)",
      "Correcting a spelling error in your existing name",
      "Adding or removing initials (e.g. adding father’s initial)",
      "Expanding an initial to a full name"
    ],
    consistency: "The new name you finalize here must appear identically on every document, every form, every affidavit, and the final gazette. Even a single character difference between documents can invalidate your application.",
    rejectionRisk: "Do not proceed to Step 2 until the exact new name is locked and confirmed in writing. Changes after submission are not allowed.",
    icon: "✍️"
  },
  {
    id: 2,
    title: "Document Audit, Photocopying & 'One and Same' Certificate",
    category: "CRITICAL",
    categoryClass: "badge-critical",
    whatToDecide: "Gather photocopies of all official records: SSLC, Plus Two, Degree certificates, PAN card, Aadhaar card, Passport, Driving License, Ration card, bank passbook, and any other government-issued ID.",
    oneAndSame: "If your name appears differently across any two documents (e.g. 'Mohan Kumar' in your degree but 'Mohan K.' on your Aadhaar), you must obtain a 'One and Same' certificate from the Akshaya portal or a competent authority. This certificate legally declares that all versions of your name refer to the same individual.",
    photocopying: [
      "All photocopies must be clear, fully legible, and unobstructed.",
      "Every relevant page must be copied (not just the first page).",
      "All copies must then be attested by a competent authority (see Step 6)."
    ],
    rejectionRisk: "Blurry, partial, or unattested photocopies will be rejected by the District Form Officer at Step 7 — requiring you to repeat this entire step.",
    icon: "📋"
  },
  {
    id: 3,
    title: "Drafting the Advertisement",
    category: "MANDATORY",
    categoryClass: "badge-mandatory",
    whatToDecide: "The advertisement must formally announce your name change in the prescribed format, stating your old name, your new name, your residential address, and a declaration that you intend to be known by the new name henceforth.",
    guidelines: [
      "Use the exact names (old and new) as they appear in your finalized documents.",
      "Include your full residential address in Kochi.",
      "State your date of birth for identification purposes.",
      "Do not use abbreviations or informal language."
    ],
    importance: "The advertisement draft is a required attachment with your Gazette application. It is not optional. The Kerala Printing Department reviews it to ensure the announcement is properly worded and complete before publication.",
    rejectionRisk: "An incorrectly worded advertisement will be sent back for revision, delaying your entire application by several weeks.",
    icon: "📢"
  },
  {
    id: 4,
    title: "Passport-Size Photograph",
    category: "SIMPLE",
    categoryClass: "badge-simple",
    requirements: [
      "Recent — taken within the last 3 months",
      "Clear, passport-size (3.5cm × 4.5cm)",
      "White or light background",
      "Face clearly visible, no sunglasses or caps",
      "Printed on quality photo paper — phone screenshots are not accepted"
    ],
    note: "Affix the photograph firmly to the designated space on the application form. It must not be loose or stapled — use photo-safe adhesive.",
    rejectionRisk: "Loose, stapled, blurry, or low-quality screenshot photos will be rejected instantly.",
    icon: "🖼️"
  },
  {
    id: 5,
    title: "Completing the Official Application Form",
    category: "OFFICIAL FORM",
    categoryClass: "badge-form",
    whereToObtain: "The official Gazette Notification application form is provided by the Kerala Printing Department. It is available at the District Form Officer’s office. Do not use unofficial or downloaded versions — only the form provided by the department is accepted.",
    howToFill: [
      "Use blue or black ink only — no pencil.",
      "Block letters throughout.",
      "Every field must be filled — leave no blanks.",
      "Your new name must match exactly what is in your advertisement draft.",
      "Your address, date of birth, and supporting document references must be accurate."
    ],
    attestation: "After completing the form, it must be attested by a competent authority (see Step 6 for who qualifies). The attestation must include the officer's seal, full name, designation, and signature.",
    rejectionRisk: "Any overwriting, correction fluid, or blank fields will result in rejection. Fill the form carefully in a single sitting.",
    icon: "📄"
  },
  {
    id: 6,
    title: "Attestation by a Competent Authority",
    category: "INPERSON",
    categoryClass: "badge-inperson",
    authorities: [
      { role: "Corporation / Municipal Commissioner", desc: "Valid for residents within Kochi Municipal Corporation or any municipality in the district." },
      { role: "Secretary of the Grama Panchayat", desc: "For residents in panchayat-jurisdiction areas outside the corporation limits." },
      { role: "Village Officer", desc: "The most widely accessible option. Covers most residential areas in and around Kochi." },
      { role: "Headmaster of a Govt. High School", desc: "Must be a government-run school only. Aided or private school headmasters are NOT accepted." },
      { role: "Any Gazetted Officer (Govt.)", desc: "Must currently be serving under the Central or Kerala State Government. Retired officers are not accepted." }
    ],
    requirements: [
      "Official rubber seal of the officer",
      "Full name written clearly",
      "Designation and office",
      "Date of attestation",
      "Original signature — photocopied signatures are invalid"
    ],
    rejectionRisk: "Staff from private institutions, aided schools, NGOs, or any unaided organization are strictly NOT accepted. Attestation by such individuals will invalidate your entire application.",
    icon: "✍️"
  },
  {
    id: 7,
    title: "Verification Before the District Form Officer",
    category: "OFFICE VISIT",
    categoryClass: "badge-office",
    checklist: [
      "Original certificates (SSLC, Plus Two, Degree, etc.)",
      "Attested photocopies of all of the above",
      "'One and Same' certificate (if applicable)",
      "Draft advertisement",
      "Passport-size photograph affixed to the form",
      "Completed and attested application form",
      "Aadhaar card and PAN card originals"
    ],
    whatOfficerDoes: "The District Form Officer will verify every original document against your attested copies. They will check for consistency of name spellings, completeness of the application, validity of attestation, and authenticity of all certificates. This is a thorough scrutiny — not a rubberstamp process.",
    rejectionRisk: "If even one document is missing, incomplete, or inconsistent, the officer will reject the submission. You will need to gather the missing item and return for a fresh visit — no partial submissions are kept on hold.",
    icon: "🏢"
  },
  {
    id: 8,
    title: "Personal Appearance, Fee Payment & Signature",
    category: "FEE + IN-PERSON",
    categoryClass: "badge-fee",
    appearance: "No proxy, no representative, no power of attorney is accepted for this step. You — the person named in the application — must physically appear before the designated officer. Bring your original photo ID for identity verification on the spot.",
    fee: "The prescribed government fee must be paid through the Kerala e-Treasury portal or the designated payment channel specified by the officer. Cash payments are generally not accepted. Keep the e-Treasury receipt safely — it is a mandatory attachment.",
    signature: "You must sign the final application form in front of the officer — pre-signed forms are not accepted. The officer will witness your signature and record it.",
    rejectionRisk: "This step cannot be delegated. Sending someone else on your behalf, or providing pre-signed forms, will result in rejection of the entire application.",
    icon: "💰"
  },
  {
    id: 9,
    title: "Publication of the Gazette Notification",
    category: "2–3 WEEKS",
    categoryClass: "badge-weeks",
    timeline: "Once submitted, the Kerala Printing Department processes your notification for inclusion in an upcoming gazette issue. This typically takes 2 to 3 weeks, though it may take longer during public holidays or periods of high submission volume.",
    publicationDay: "The Kerala Gazette is generally published on Tuesdays. Your notification will appear in the edition following the completion of processing. You will not receive a personal notification — you must check the portal yourself.",
    tracking: "Track your notification status on the official Kerala Gazette portal at: compose.kerala.gov.in",
    rejectionRisk: "There is no expedited or fast-track option. You cannot call the department to accelerate your notification. The process runs on a fixed schedule.",
    icon: "📰"
  },
  {
    id: 10,
    title: "Downloading & Using Your Gazette Notification",
    category: "FINAL STEP",
    categoryClass: "badge-final",
    download: [
      "The FIRST PAGE of the Kerala Gazette (the cover page that certifies the issue)",
      "The SPECIFIC PAGE containing your name change notification",
      "Both pages together form your legal proof. One without the other is insufficient."
    ],
    whereToUse: [
      "Aadhaar card name correction (UIDAI)",
      "PAN card name update (Income Tax Department)",
      "Passport name change (Passport Seva Kendra)",
      "Bank account records",
      "Educational certificates (university / board)",
      "Service records, insurance, and property documents"
    ],
    note: "Each institution (passport office, university, bank) has its own additional requirements and procedures for name updates. The gazette notification is just the starting document — the update process continues separately at each institution.",
    safety: "Keep multiple printed and digital copies of both gazette pages. These documents have no expiry date and are permanent legal proof.",
    icon: "🏆"
  }
];

const CHECKLIST_ITEMS = [
  { id: 1, name: "SSLC Certificate", notes: "Original + attested photocopy" },
  { id: 2, name: "Plus Two Certificate", notes: "Original + attested photocopy" },
  { id: 3, name: "Degree Certificate", notes: "Original + attested photocopy" },
  { id: 4, name: "PAN Card", notes: "Original + attested photocopy" },
  { id: 5, name: "Aadhaar Card", notes: "Original + attested photocopy" },
  { id: 6, name: "Passport", notes: "Original + attested photocopy (if applicable)", optional: true },
  { id: 7, name: "Driving License", notes: "Original + attested photocopy (if applicable)", optional: true },
  { id: 8, name: "Passport-size Photograph", notes: "1 recent photo, affixed to form" },
  { id: 9, name: "Official Application Form", notes: "Completed, attested, photo affixed" },
  { id: 10, name: "Draft Advertisement", notes: "Old Name → New Name, in prescribed format" },
  { id: 11, name: "e-Treasury Fee Receipt", notes: "Mandatory — obtain after fee payment" }
];

const TARGET_DOCUMENTS = [
  { id: 'aadhaar', name: 'Aadhaar Card', authority: 'UIDAI', time: '2-4 Days', difficulty: 'Easy', icon: '🆔', advice: 'Requires downloaded Gazette pages (cover & your page) + a valid photo ID. Can be updated online through myAadhaar portal or at any Aadhaar Seva Kendra in Ernakulam/Kochi.' },
  { id: 'pan', name: 'PAN Card', authority: 'Income Tax Department', time: '5-7 Days', difficulty: 'Easy', icon: '💳', advice: 'Apply online via NSDL/UTIITSL under "Changes or Correction in PAN Data". Upload original Gazette notification. E-PAN is received in 3 days; physical card takes 7 days.' },
  { id: 'passport', name: 'Indian Passport', authority: 'Ministry of External Affairs', time: '7-15 Days', difficulty: 'Medium', icon: '✈️', advice: 'Requires applying for a "Re-issue of Passport" due to change in name. Submit original Gazette copy, original advertisement published in 2 local newspapers (one Malayalam, one English), and updated Aadhaar.' },
  { id: 'education', name: 'SSLC / Educational Certificates', authority: 'Kerala State Board / CBSE / University', time: '30-60 Days', difficulty: 'Hard', icon: '🎓', advice: 'Apply directly to the respective Board (e.g. Pareeksha Bhavan for Kerala SSLC, CBSE Regional Office, or respective University). Strict requirements: original Gazette, original certificates, and recommendation from Headmaster/College Principal.' },
  { id: 'bank', name: 'Bank Accounts & Cards', authority: 'Respective Banks', time: '1-2 Days', difficulty: 'Easy', icon: '🏦', advice: 'Visit your home branch in Ernakulam with a written request form. Submit updated Aadhaar card and PAN card containing your new name, along with a copy of the printed Gazette notification.' },
  { id: 'dl_rc', name: 'Driving License & RC Book', authority: 'Kerala Motor Vehicles Department (MVD)', time: '10-15 Days', difficulty: 'Medium', icon: '🚗', advice: 'Apply online via Sarathi (MVD Kerala) portal. Upload Gazette notification, original DL/RC, and updated Aadhaar. Fee must be paid online.' },
  { id: 'voter', name: 'Voter ID Card (EPIC)', authority: 'Election Commission of India', time: '7-14 Days', difficulty: 'Easy', icon: '🗳️', advice: 'File Form 8 online through NVSP portal or Voter Helpline App. Upload your Gazette notification as proof of name change.' }
];

const FAQ_DATA = [
  {
    q: "How long does the entire name change process take in Kerala?",
    a: "Once submitted to the District Form Officer, the official publication in the Kerala Gazette typically takes 2 to 3 weeks. However, compiling files, obtaining attestations, and getting Akshaya certificates can add another 1 to 2 weeks of preparation."
  },
  {
    q: "Who is authorized to attest my Gazette application form in Kochi?",
    a: "Accepted competent authorities include the Village Officer, Corporation/Municipal Commissioners, Secretaries of Grama Panchayats, Headmasters of Govt. High Schools, or any currently serving Gazetted Officer. Retired officers or private/aided school staff are NOT accepted."
  },
  {
    q: "When is a 'One and Same' certificate required?",
    a: "If your name has spelling mismatches or abbreviations on different certificates (e.g. 'Mohan Kumar' vs 'Mohan K.'), a One and Same certificate must be secured from Akshaya portal or your Village Officer to declare they represent the same person."
  },
  {
    q: "Can I submit my application through a representative or agent at the office?",
    a: "No. Personal appearance before the District Form Officer is non-negotiable. You must physically appear, sign in front of the officer, pay the e-Treasury fee, and present your original IDs."
  },
  {
    q: "What pages of the Gazette must I download as legal proof?",
    a: "You must download two pages: the first page (cover page showing the issue certificate and date) and the specific page containing your announcement. Having one without the other is legally insufficient."
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'guide', 'auditor', 'faq'
  const [activeStep, setActiveStep] = useState(1);

  // Gazette Planner States
  const [changeReason, setChangeReason] = useState("");
  const [selectedTargetDocs, setSelectedTargetDocs] = useState({
    aadhaar: true,
    pan: true
  });
  
  const selectedDocsCount = Object.values(selectedTargetDocs).filter(Boolean).length;

  // Booking Form States
  const [formData, setFormData] = useState({ presentName: "", proposedName: "", phone: "", reason: "", urgent: "No" });
  const [showSuccess, setShowSuccess] = useState(false);

  // Toggle target document
  const handleTargetDocToggle = (id) => {
    setSelectedTargetDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Reset Gazette Planner
  const handleResetPlanner = () => {
    setChangeReason("");
    setSelectedTargetDocs({
      aadhaar: true,
      pan: true
    });
  };

  // Handle consultation booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.presentName || !formData.proposedName || !formData.phone) return;

    // Compile active target documents selected in the planner
    const docs = Object.keys(selectedTargetDocs)
      .filter(key => selectedTargetDocs[key])
      .map(key => TARGET_DOCUMENTS.find(d => d.id === key)?.name || key)
      .join(', ');

    // Construct a premium formatted message for WhatsApp
    const message = `⚖️ *NEW NAME CHANGE QUOTATION REQUEST* ⚖️\n\n` +
      `👤 *Present Name:* ${formData.presentName}\n` +
      `✍️ *Proposed Name:* ${formData.proposedName}\n` +
      `⚡ *Immediate Change Required:* ${formData.urgent === 'Yes' ? 'Yes, Urgent/Tatkaal Needed' : 'No, Normal Timeline'}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📝 *Reason for Change:* ${formData.reason || 'Not Provided'}\n` +
      `📋 *Documents to Update:* ${docs || 'None Selected'}\n\n` +
      `Please provide the customized price quote and checklist. Thank you!`;

    const whatsappUrl = `https://wa.me/918590290105?text=${encodeURIComponent(message)}`;
    
    // Launch WhatsApp redirect in a new tab
    window.open(whatsappUrl, '_blank');

    setShowSuccess(true);
  };

  const currentStepData = STEPS_DATA.find(s => s.id === activeStep);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header-nav">
        <div className="container header-flex">
          <button onClick={() => setCurrentPage('home')} className="logo-brand btn-clear">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="logo-svg">
                <path d="m16 16 3-8 3 8c-.2.9-1 1.5-2 1.5s-1.8-.6-2-1.5z"></path>
                <path d="m2 16 3-8 3 8c-.2.9-1 1.5-2 1.5s-1.8-.6-2-1.5z"></path>
                <path d="M7 21h10"></path>
                <path d="M12 3v18"></path>
                <path d="M3 7h18"></path>
              </svg>
            </div>
            <div>
              <span className="logo-title">NAME CHANGE KOCHI</span>
              <span className="logo-subtitle">Premium Gazette Consultancy</span>
            </div>
          </button>
          <nav className="nav-links">
            <button 
              onClick={() => setCurrentPage('guide')} 
              className={`nav-btn ${currentPage === 'guide' ? 'active' : ''}`}
            >
              10 Steps
            </button>
            <button 
              onClick={() => setCurrentPage('auditor')} 
              className={`nav-btn ${currentPage === 'auditor' ? 'active' : ''}`}
            >
              Planner
            </button>
            <button 
              onClick={() => setCurrentPage('faq')} 
              className={`nav-btn ${currentPage === 'faq' ? 'active' : ''}`}
            >
              FAQ & Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Page 1: Home Page */}
      {currentPage === 'home' && (
        <div className="page-wrapper animate-fade-in">

          {/* ── HERO ── */}
          <section className="landing-hero">
            <div className="landing-hero-bg-orb"></div>
            <div className="landing-hero-bg-orb orb-2"></div>
            <div className="container landing-hero-inner">
              <span className="landing-eyebrow">⚖️ Kerala Gazette Specialists — Ernakulam District</span>
              <h1 className="landing-h1">
                Change Your Name<br />
                <span className="landing-h1-accent">With Zero Risk of Rejection</span>
              </h1>
              <p className="landing-subtitle">
                We handle every step of the official Kerala Gazette name change process — from document audits and Akshaya "One &amp; Same" certificates to District Form Office submissions and e-Treasury fee payments — so you don't have to.
              </p>
              <div className="landing-hero-btns">
                <button onClick={() => setCurrentPage('auditor')} className="landing-btn-primary">
                  Launch Gazette Planner <span>→</span>
                </button>
                <button onClick={() => setCurrentPage('guide')} className="landing-btn-secondary">
                  View 10-Step Guide
                </button>
              </div>

              {/* Trust Stats Row */}
              <div className="landing-trust-row">
                <div className="landing-trust-pill"><strong>0%</strong> Rejection Rate</div>
                <div className="landing-trust-pill"><strong>250+</strong> Clients in Kochi</div>
                <div className="landing-trust-pill"><strong>1–3 Months</strong> Avg. Timeline</div>
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="landing-process container">
            <div className="section-header">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">Three simple steps to your legally gazetted new name.</p>
            </div>
            <div className="landing-steps-row">
              <div className="landing-step-card" onClick={() => setCurrentPage('guide')}>
                <div className="landing-step-num">1</div>
                <h3>Understand the Process</h3>
                <p>Walk through the official 10-step Kerala Gazette timeline — attestation rules, fee schedules, and rejection risks — all explained in plain English.</p>
                <span className="landing-step-link">View Guide →</span>
              </div>
              <div className="landing-step-connector"></div>
              <div className="landing-step-card" onClick={() => setCurrentPage('auditor')}>
                <div className="landing-step-num">2</div>
                <h3>Plan Your Updates</h3>
                <p>Tell us why you're changing your name and which documents need updating. Our Gazette Planner builds a custom roadmap with timelines for Aadhaar, PAN, Passport, and more.</p>
                <span className="landing-step-link">Open Planner →</span>
              </div>
              <div className="landing-step-connector"></div>
              <div className="landing-step-card" onClick={() => { setCurrentPage('faq'); setTimeout(() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                <div className="landing-step-num">3</div>
                <h3>Get a Free Quotation</h3>
                <p>Schedule a free call with our Kochi-based consultants. We'll audit your documents, provide a detailed price quote, and handle the complete filing process.</p>
                <span className="landing-step-link">Schedule Call →</span>
              </div>
            </div>
          </section>

          {/* ── SERVICES ── */}
          <section className="landing-services container">
            <div className="section-header">
              <h2 className="section-title">What We Handle For You</h2>
              <p className="section-subtitle">End-to-end consultancy for Kochi Municipal and Panchayat residents.</p>
            </div>
            <div className="landing-services-grid">
              <div className="landing-service-card">
                <div className="landing-service-icon">📋</div>
                <h3>Document Pre-Auditing</h3>
                <p>We inventory your certificates, identify spelling inconsistencies across Aadhaar/PAN/SSLC, and arrange "One and Same" certificates from the Akshaya portal.</p>
              </div>
              <div className="landing-service-card">
                <div className="landing-service-icon">✍️</div>
                <h3>Attestation Assistance</h3>
                <p>We connect you to accepted local competent authorities — Village Officers, Municipal Commissioners, and Gazetted Officers — for legally valid attestations.</p>
              </div>
              <div className="landing-service-card">
                <div className="landing-service-icon">📰</div>
                <h3>Gazette Filing &amp; Tracking</h3>
                <p>We draft your official advertisement, process the e-Treasury fee, manage the District Form Office submission, and track publication on compose.kerala.gov.in.</p>
              </div>
              <div className="landing-service-card">
                <div className="landing-service-icon">🔄</div>
                <h3>Post-Gazette Updates</h3>
                <p>After your gazette is published, we guide you through updating Aadhaar, PAN, Passport, Bank Accounts, Driving License, Voter ID, and educational certificates.</p>
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section className="landing-testimonials container">
            <div className="section-header">
              <h2 className="section-title">Trusted by Residents Across Ernakulam</h2>
            </div>
            <div className="landing-testimonials-grid">
              <div className="landing-testimonial-card">
                <div className="landing-stars">★★★★★</div>
                <p>"My SSLC certificate had 'Anoop K.' but Aadhaar had 'Anoop Krishnan'. The District Officer rejected my first self-submission. Name Change Kochi got my 'One and Same' certificate prepared and resolved it within 2 weeks."</p>
                <div className="landing-testimonial-author">
                  <div className="landing-author-avatar">AK</div>
                  <div>
                    <strong>Anoop K.</strong>
                    <span>Kakkanad, Ernakulam</span>
                  </div>
                </div>
              </div>
              <div className="landing-testimonial-card">
                <div className="landing-stars">★★★★★</div>
                <p>"Seamless process. I was worried about drawing draft ads and traveling back and forth. They helped audit everything at home, gave clear instructions on Village Office attestation, and handled everything perfectly."</p>
                <div className="landing-testimonial-author">
                  <div className="landing-author-avatar">RN</div>
                  <div>
                    <strong>Reshma Nair</strong>
                    <span>Edappally, Ernakulam</span>
                  </div>
                </div>
              </div>
              <div className="landing-testimonial-card">
                <div className="landing-stars">★★★★★</div>
                <p>"I needed to expand my initial to my full name for my passport application. They explained the entire process clearly, handled the Village Officer attestation, and my Gazette notification was published in under 3 weeks."</p>
                <div className="landing-testimonial-author">
                  <div className="landing-author-avatar">SP</div>
                  <div>
                    <strong>Suresh P.</strong>
                    <span>Aluva, Ernakulam</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section className="landing-cta-section">
            <div className="container landing-cta-inner">
              <h2>Ready to Start Your Name Change?</h2>
              <p>Get your personalized Gazette roadmap in under 2 minutes — completely free.</p>
              <div className="landing-hero-btns">
                <button onClick={() => setCurrentPage('auditor')} className="landing-btn-primary">
                  Launch Gazette Planner <span>→</span>
                </button>
                <button onClick={() => { setCurrentPage('faq'); setTimeout(() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="landing-btn-secondary">
                  Talk to a Consultant
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Page 2: Step Guide */}
      {currentPage === 'guide' && (
        <div className="page-wrapper animate-fade-in">

          {/* ── GUIDE HERO ── */}
          <section className="guide-hero">
            <div className="container guide-hero-inner">
              <span className="landing-eyebrow">📖 Official 10-Step Process</span>
              <h1 className="guide-hero-title">Kerala Gazette Name Change Process</h1>
              <p className="guide-hero-sub">Click through each step to understand requirements, guidelines, and critical rejection risks for the Ernakulam District Office.</p>
            </div>
          </section>

          {/* ── STEP NAVIGATOR + DETAIL ── */}
          <section className="guide-body container">
            <div className="guide-columns">

              {/* LEFT: Step List */}
              <div className="guide-step-list">
                {STEPS_DATA.map(step => (
                  <button
                    key={step.id}
                    className={`guide-step-btn ${activeStep === step.id ? 'active' : ''}`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <span className="guide-step-num">{step.id}</span>
                    <div className="guide-step-btn-info">
                      <span className="guide-step-btn-title">{step.title}</span>
                      <span className={`guide-category-tag ${step.categoryClass}`}>{step.category}</span>
                    </div>
                    <span className="guide-chevron">›</span>
                  </button>
                ))}
              </div>

              {/* RIGHT: Step Detail */}
              <div className="guide-detail-pane">
                <div className="guide-detail-header">
                  <div className="guide-detail-icon">{currentStepData.icon}</div>
                  <div className="guide-detail-header-text">
                    <span className="guide-detail-step-label">Step {currentStepData.id} of 10</span>
                    <h2 className="guide-detail-title">{currentStepData.title}</h2>
                  </div>
                  <span className={`guide-detail-tag ${currentStepData.categoryClass}`}>{currentStepData.category}</span>
                </div>

                <div className="guide-detail-body">
                  {currentStepData.whatToDecide && (
                    <div className="guide-section">
                      <h4>Core Directive</h4>
                      <p>{currentStepData.whatToDecide}</p>
                    </div>
                  )}

                  {currentStepData.scenarios && (
                    <div className="guide-section">
                      <h4>Common Scenarios</h4>
                      <ul className="guide-list">
                        {currentStepData.scenarios.map((sc, i) => <li key={i}>{sc}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.consistency && (
                    <div className="guide-section guide-highlight">
                      <h4>Ensure Consistency</h4>
                      <p>{currentStepData.consistency}</p>
                    </div>
                  )}

                  {currentStepData.oneAndSame && (
                    <div className="guide-section guide-accent">
                      <h4>The "One and Same" Certificate</h4>
                      <p>{currentStepData.oneAndSame}</p>
                    </div>
                  )}

                  {currentStepData.photocopying && (
                    <div className="guide-section">
                      <h4>Photocopying Guidelines</h4>
                      <ul className="guide-list">
                        {currentStepData.photocopying.map((ph, i) => <li key={i}>{ph}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.guidelines && (
                    <div className="guide-section">
                      <h4>Drafting Instructions</h4>
                      <ul className="guide-list">
                        {currentStepData.guidelines.map((gl, i) => <li key={i}>{gl}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.importance && (
                    <div className="guide-section">
                      <h4>Why This is Required</h4>
                      <p>{currentStepData.importance}</p>
                    </div>
                  )}

                  {currentStepData.requirements && (
                    <div className="guide-section">
                      <h4>Official Requirements</h4>
                      <ul className="guide-list">
                        {currentStepData.requirements.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.note && (
                    <div className="guide-section guide-info">
                      <h4>Important Note</h4>
                      <p>{currentStepData.note}</p>
                    </div>
                  )}

                  {currentStepData.whereToObtain && (
                    <div className="guide-section">
                      <h4>Where to Get the Form</h4>
                      <p>{currentStepData.whereToObtain}</p>
                    </div>
                  )}

                  {currentStepData.howToFill && (
                    <div className="guide-section">
                      <h4>Filling Guidelines</h4>
                      <ul className="guide-list">
                        {currentStepData.howToFill.map((hf, i) => <li key={i}>{hf}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.attestation && (
                    <div className="guide-section guide-accent">
                      <h4>Attestation Criteria</h4>
                      <p>{currentStepData.attestation}</p>
                    </div>
                  )}

                  {currentStepData.authorities && (
                    <div className="guide-section">
                      <h4>Accepted Competent Authorities</h4>
                      <div className="guide-authorities-grid">
                        {currentStepData.authorities.map((auth, i) => (
                          <div key={i} className="guide-authority-card">
                            <h5>{auth.role}</h5>
                            <p>{auth.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStepData.checklist && (
                    <div className="guide-section">
                      <h4>Checklist — What to Bring</h4>
                      <ul className="guide-list guide-list-two-col">
                        {currentStepData.checklist.map((ch, i) => <li key={i}>{ch}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.whatOfficerDoes && (
                    <div className="guide-section">
                      <h4>Verification Process</h4>
                      <p>{currentStepData.whatOfficerDoes}</p>
                    </div>
                  )}

                  {currentStepData.appearance && (
                    <div className="guide-section">
                      <h4>Appearance Mandate</h4>
                      <p>{currentStepData.appearance}</p>
                    </div>
                  )}

                  {currentStepData.fee && (
                    <div className="guide-section">
                      <h4>Fee & Payment Flow</h4>
                      <p>{currentStepData.fee}</p>
                    </div>
                  )}

                  {currentStepData.signature && (
                    <div className="guide-section">
                      <h4>Signing Rules</h4>
                      <p>{currentStepData.signature}</p>
                    </div>
                  )}

                  {currentStepData.timeline && (
                    <div className="guide-section">
                      <h4>Processing Timeline</h4>
                      <p>{currentStepData.timeline}</p>
                    </div>
                  )}

                  {currentStepData.publicationDay && (
                    <div className="guide-section">
                      <h4>Publication Day</h4>
                      <p>{currentStepData.publicationDay}</p>
                    </div>
                  )}

                  {currentStepData.tracking && (
                    <div className="guide-section guide-info">
                      <h4>Tracking Site</h4>
                      <p>{currentStepData.tracking}</p>
                    </div>
                  )}

                  {currentStepData.download && (
                    <div className="guide-section">
                      <h4>What to Download</h4>
                      <ul className="guide-list">
                        {currentStepData.download.map((dw, i) => <li key={i}>{dw}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.whereToUse && (
                    <div className="guide-section">
                      <h4>Where the Gazette is Accepted</h4>
                      <ul className="guide-list guide-list-two-col">
                        {currentStepData.whereToUse.map((wu, i) => <li key={i}>{wu}</li>)}
                      </ul>
                    </div>
                  )}

                  {currentStepData.safety && (
                    <div className="guide-section guide-info">
                      <h4>Safekeeping Note</h4>
                      <p>{currentStepData.safety}</p>
                    </div>
                  )}

                  {/* Rejection Risk Warning */}
                  <div className="guide-rejection-box">
                    <div className="guide-rejection-header">
                      <span>⚠️</span>
                      <span>REJECTION RISK</span>
                    </div>
                    <p>{currentStepData.rejectionRisk}</p>
                  </div>
                </div>

                {/* Step Navigation */}
                <div className="guide-step-nav">
                  <button
                    className="guide-nav-btn"
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  >
                    ← Previous
                  </button>
                  <span className="guide-nav-label">Step {activeStep} / 10</span>
                  <button
                    className="guide-nav-btn"
                    disabled={activeStep === 10}
                    onClick={() => setActiveStep(prev => Math.min(10, prev + 1))}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Page 3: Gazette Planner */}
      {currentPage === 'auditor' && (
        <div className="page-wrapper animate-fade-in">

          {/* ── PLANNER HERO ── */}
          <section className="planner-hero">
            <div className="container planner-hero-inner">
              <span className="landing-eyebrow">📝 Personalized Gazette Planner</span>
              <h1 className="planner-hero-title">Plan Your Name Change</h1>
              <p className="planner-hero-sub">Tell us your reason and select the documents you need updated. We'll generate a custom roadmap with timelines, procedures, and rejection-risk warnings.</p>
            </div>
          </section>

          {/* ── REASON INPUT SECTION ── */}
          <section className="planner-reason-section container">
            <div className="planner-reason-card">
              <div className="planner-reason-header">
                <div className="planner-reason-icon">✍️</div>
                <div>
                  <h3>What is the reason for your name change?</h3>
                  <p>Describe your situation so we can flag potential rejection risks and provide tailored advice.</p>
                </div>
              </div>
              <textarea
                id="plannerReason"
                className="planner-reason-input"
                placeholder="e.g. Spelling mismatch between Aadhaar and SSLC certificate, post-marriage name change, expanding initial to full name, personal preference..."
                rows="3"
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
              />
              {changeReason.trim().length > 0 && (
                <div className="planner-reason-analysis">
                  <div className="planner-reason-analysis-header">
                    <span>⚡</span> Automated Rejection Guard
                  </div>
                  <div className="planner-guard-items">
                    {/marriage|husband|wife/i.test(changeReason) && (
                      <div className="planner-guard-pill alert">
                        <strong>Post-Marriage:</strong> Ensure you have your marriage certificate or officially signed marriage affidavit before applying for passport or bank updates.
                      </div>
                    )}
                    {/spell|spelling|error|mistake|correction/i.test(changeReason) && (
                      <div className="planner-guard-pill warn">
                        <strong>Spelling Correction:</strong> You MUST obtain a "One and Same" certificate from your Village Office / Akshaya portal to legally link both name versions.
                      </div>
                    )}
                    {/initial|father/i.test(changeReason) && (
                      <div className="planner-guard-pill info">
                        <strong>Initial Expansion:</strong> The expanded full name must match exactly how your parents' names appear in their official identities.
                      </div>
                    )}
                    {!/marriage|husband|wife|spell|spelling|error|mistake|correction|initial|father/i.test(changeReason) && (
                      <div className="planner-guard-pill pass">
                        <strong>General Change:</strong> Ensure your new name is consistently spelled across all documents and the gazette advertisement.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ── DOCUMENT SELECTOR + ROADMAP ── */}
          <section className="planner-body container">
            <div className="planner-columns">
              {/* LEFT: Document Selector */}
              <div className="planner-col-left">
                <div className="planner-col-header">
                  <h3>Select Documents to Update</h3>
                  <button onClick={handleResetPlanner} className="planner-reset-btn">Reset</button>
                </div>
                <p className="planner-col-desc">Choose every document where your name needs to be changed after the Gazette is published.</p>
                <div className="planner-doc-list">
                  {TARGET_DOCUMENTS.map(doc => (
                    <label
                      key={doc.id}
                      className={`planner-doc-item ${selectedTargetDocs[doc.id] ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={!!selectedTargetDocs[doc.id]}
                        onChange={() => handleTargetDocToggle(doc.id)}
                      />
                      <span className="planner-doc-check">{selectedTargetDocs[doc.id] ? '✓' : ''}</span>
                      <div className="planner-doc-info">
                        <span className="planner-doc-icon">{doc.icon}</span>
                        <div>
                          <strong>{doc.name}</strong>
                          <span>{doc.authority}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="planner-selected-count">
                  {selectedDocsCount} document{selectedDocsCount !== 1 ? 's' : ''} selected
                </div>
              </div>

              {/* RIGHT: Roadmap Results */}
              <div className="planner-col-right">
                <h3>Your Custom Roadmap</h3>
                {selectedDocsCount === 0 ? (
                  <div className="planner-empty-state">
                    <span className="planner-empty-icon">📋</span>
                    <p>Select at least one document on the left to generate your personalized update roadmap.</p>
                  </div>
                ) : (
                  <div className="planner-roadmap-list">
                    {TARGET_DOCUMENTS.map((doc, idx) => {
                      if (!selectedTargetDocs[doc.id]) return null;
                      return (
                        <div key={doc.id} className="planner-roadmap-card">
                          <div className="planner-roadmap-top">
                            <span className="planner-roadmap-icon">{doc.icon}</span>
                            <div className="planner-roadmap-title">
                              <strong>{doc.name}</strong>
                              <span className="planner-roadmap-authority">{doc.authority}</span>
                            </div>
                            <div className="planner-roadmap-meta">
                              <span className={`planner-difficulty ${doc.difficulty.toLowerCase()}`}>{doc.difficulty}</span>
                            </div>
                          </div>
                          <p className="planner-roadmap-advice">{doc.advice}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selectedDocsCount > 0 && (
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        reason: changeReason
                      }));
                      setCurrentPage('faq');
                      setTimeout(() => {
                        document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="landing-btn-primary planner-cta-btn"
                  >
                    Lock Roadmap & Get Free Quotation <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Page 4: FAQ & Contact */}
      {currentPage === 'faq' && (
        <div className="page-wrapper animate-fade-in">
          <section className="faq-section container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Read essential guidelines regarding name modifications, Gazettes, and local attestations in Ernakulam.</p>
            </div>

            <div className="faq-container-list">
              {FAQ_DATA.map((faq, i) => (
                <div key={i} className="glass-panel faq-card">
                  <h4>Q: {faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Book Premium Consultation Section */}
          <section id="consultation" className="consultation-section container mt-4">
            <div className="consultation-box glass-panel">
              <div className="consultation-info">
                <h2 className="consultation-title gradient-text-gold">Need Professional Representation?</h2>
                <p className="consultation-desc">
                  Don't risk delays due to incorrect attestations, mismatched documents, or incorrect application forms. Our premium name change consultancy in Kochi handles the entire end-to-end Gazette submission for you.
                </p>
                <ul className="consultation-benefits">
                  <li><span>✓</span> End-to-end document audit by local experts</li>
                  <li><span>✓</span> Forms filled by specialists to prevent spelling errors</li>
                  <li><span>✓</span> Coordination for One & Same certificates</li>
                  <li><span>✓</span> 100% submission success rate in Kochi district</li>
                </ul>
              </div>

              <div className="consultation-form-wrapper">
                <h3>Get a Free Name Change Quotation</h3>
                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-group">
                    <label>Present Name (in existing records)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Adithyan K." 
                      required
                      value={formData.presentName}
                      onChange={(e) => setFormData({...formData, presentName: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Proposed Name to be Changed</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Adithyan Krishnan" 
                      required
                      value={formData.proposedName}
                      onChange={(e) => setFormData({...formData, proposedName: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number (WhatsApp preferred)</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>


                  <div className="form-group">
                    <label>Reason for Name Change</label>
                    <input 
                      type="text" 
                      placeholder="e.g. spelling correction, post-marriage, initials expansion" 
                      required
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Do you need to change the document immediately?</label>
                    <select 
                      value={formData.urgent}
                      onChange={(e) => setFormData({...formData, urgent: e.target.value})}
                    >
                      <option value="No">No, normal timeline is fine</option>
                      <option value="Yes">Yes, I need it urgently</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-gold w-full mt-4">
                    Request Free Quotation
                  </button>
                </form>
              </div>
            </div>
          </section>

          <section className="contact-details-section container mt-4">
            <div className="consultation-box glass-panel">
              <div className="contact-info">
                <h3>Contact Our Support Team</h3>
                <p className="contact-detail-line">We provide premium, 100% online legal scoping and document scrutiny assistance across Ernakulam and the entire state of Kerala.</p>
                <p className="contact-detail-line"><strong>📞 Hotline:</strong> +91 79941 53999</p>
                <p className="contact-detail-line"><strong>🕒 Consultation Hours:</strong> Mon - Sat: 9:30 AM to 5:30 PM (Sunday Closed)</p>
              </div>
              <div className="map-mockup-wrapper">
                <div className="map-mockup">
                  <span className="map-marker">💻</span>
                  <div className="map-text">
                    <strong>100% Online Scrutiny</strong>
                    <span>Scoping & Filing across Kerala</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-overlay animate-fade-in">
          <div className="success-modal glass-panel">
            <span className="success-icon">🎉</span>
            <h3>Consultation Requested!</h3>
            <p>
              Thank you, <strong>{formData.presentName}</strong>. Our lead consultant in Kochi has received your details and will call you on <strong>{formData.phone}</strong> within the next 2 hours to conduct your document audit and provide a detailed quotation.
            </p>
            <button onClick={() => setShowSuccess(false)} className="btn btn-primary mt-4">
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-bar">
        <div className="container footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="logo-svg">
                  <path d="m16 16 3-8 3 8c-.2.9-1 1.5-2 1.5s-1.8-.6-2-1.5z"></path>
                  <path d="m2 16 3-8 3 8c-.2.9-1 1.5-2 1.5s-1.8-.6-2-1.5z"></path>
                  <path d="M7 21h10"></path>
                  <path d="M12 3v18"></path>
                  <path d="M3 7h18"></path>
                </svg>
              </div>
              <div>
                <span className="footer-logo-title">NAME CHANGE KOCHI</span>
                <span className="footer-logo-subtitle">Premium Gazette Consultancy</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Kochi's premier consultancy specializing in error-free, legally valid official Gazette name changes. We audit certificates and handle filings across Ernakulam district.
            </p>
            <div className="footer-compliance-badge">
              <span className="badge-dot"></span> 100% Submission Success Rate
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-link-list">
              <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="footer-btn-link">Home Page</button></li>
              <li><button onClick={() => { setCurrentPage('guide'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="footer-btn-link">10-Step Guide</button></li>
              <li><button onClick={() => { setCurrentPage('auditor'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="footer-btn-link">Gazette Planner</button></li>
              <li><button onClick={() => { setCurrentPage('faq'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="footer-btn-link">FAQ & Contact</button></li>
            </ul>
          </div>

          {/* Col 3: Contact & Office */}
          <div className="footer-col-contact">
            <h4 className="footer-heading">Consultancy Support</h4>
            <p className="footer-contact-item">We provide premium document scrutiny and official Gazette filing assistance virtually across Ernakulam and the entire state of Kerala.</p>
            <p className="footer-contact-item"><strong>📞 Hotline:</strong> +91 79941 53999</p>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="footer-bottom-wrapper">
          <div className="container">
            <div className="footer-disclaimer-box">
              <span className="disclaimer-badge">Disclaimer</span>
              <p className="disclaimer-text">
                Disclaimer: Name Change Kochi is an independent premium legal documentation consultancy service and is NOT affiliated with the Government of Kerala, the Kerala Printing Department, or any government portal. Official applications, rules, and government treasury fee schedules are hosted directly on compose.kerala.gov.in.
              </p>
            </div>
            <div className="footer-copyright-flex">
              <p>© {new Date().getFullYear()} Name Change Kochi. All rights reserved.</p>
              <div className="footer-legal-links">
                <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                <span className="footer-separator">•</span>
                <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
