// ─────────────────────────────────────────────────────────
//  FIELDS DATA  (shared between Quiz.jsx and FieldQuiz.jsx)
// ─────────────────────────────────────────────────────────
export const FIELDS = [
  {
    id: 'technology',
    icon: '💻',
    title: 'Technology & IT',
    tagline: 'Build the digital future',
    color: '#3B82F6',
    dark: '#1D4ED8',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    tag: 'High Demand',
    tagColor: '#10B981',
    about: 'Technology is the fastest-growing sector in India and worldwide. If you enjoy problem-solving, logical thinking, and working with computers, this field is for you. From writing apps to securing networks, tech careers are everywhere.',
    degrees: ['B.Sc. Computer Science', 'B.Sc. IT', 'B.Voc. Software Dev', 'BCA'],
    careers: ['Software Developer', 'Data Analyst', 'Cybersecurity Expert', 'AI Engineer', 'Web Developer'],
    topExams: ['GATE CS', 'TCS NQT', 'Infosys InfyTQ'],
    avgSalary: '₹5 – 20 LPA',
    scope: 98,
    skills: ['Logical Thinking', 'Mathematics', 'Problem Solving', 'Creativity'],
  },
  {
    id: 'medicine',
    icon: '🏥',
    title: 'Medicine & Healthcare',
    tagline: 'Heal lives, change the world',
    color: '#EF4444',
    dark: '#B91C1C',
    bg: '#FEF2F2',
    border: '#FECACA',
    tag: 'Noble Profession',
    tagColor: '#F97316',
    about: 'Healthcare is one of the most respected careers. Doctors, nurses, pharmacists, and researchers save millions of lives every year. If you are compassionate and love biology, medicine is a deeply fulfilling path.',
    degrees: ['MBBS', 'B.Pharm', 'B.Sc. Nursing', 'B.Sc. Microbiology', 'BAMS'],
    careers: ['Doctor / Surgeon', 'Pharmacist', 'Nurse', 'Medical Researcher', 'Hospital Admin'],
    topExams: ['NEET UG', 'AIIMS', 'JIPMER'],
    avgSalary: '₹6 – 25 LPA',
    scope: 95,
    skills: ['Biology', 'Empathy', 'Attention to Detail', 'Science'],
  },
  {
    id: 'business',
    icon: '📈',
    title: 'Business & Finance',
    tagline: 'Lead companies, grow wealth',
    color: '#10B981',
    dark: '#047857',
    bg: '#F0FDF4',
    border: '#A7F3D0',
    tag: 'Top Earning',
    tagColor: '#10B981',
    about: 'Business and finance power the economy. If you are ambitious, enjoy planning, and have a head for numbers, this field offers careers in banking, management, accounting, and entrepreneurship with high earning potential.',
    degrees: ['B.Com', 'BBA', 'B.Com Honours', 'BA Economics', 'BMS'],
    careers: ['Chartered Accountant', 'Investment Banker', 'Entrepreneur', 'Financial Analyst', 'MBA Manager'],
    topExams: ['CA Foundation', 'CAT', 'CMA Foundation', 'SBI PO'],
    avgSalary: '₹5 – 25 LPA',
    scope: 92,
    skills: ['Numeracy', 'Communication', 'Decision Making', 'Leadership'],
  },
  {
    id: 'law',
    icon: '⚖️',
    title: 'Law & Civil Services',
    tagline: 'Serve justice, serve the nation',
    color: '#F59E0B',
    dark: '#B45309',
    bg: '#FFFBEB',
    border: '#FDE68A',
    tag: 'Prestigious',
    tagColor: '#F59E0B',
    about: 'Law and civil services are among the most prestigious careers in India. Lawyers fight for justice, while IAS/IPS officers shape public policy. If you love reading, debating, and serving society, this is your calling.',
    degrees: ['BA LLB', 'B.A. Political Science', 'B.A. History', 'B.A. Sociology'],
    careers: ['IAS / IPS Officer', 'Advocate / Lawyer', 'Judge', 'Legal Advisor', 'Public Prosecutor'],
    topExams: ['UPSC CSE', 'CLAT', 'State PSC', 'Judiciary Exam'],
    avgSalary: '₹6 – 20 LPA',
    scope: 88,
    skills: ['Reading & Writing', 'Critical Thinking', 'General Knowledge', 'Debate'],
  },
  {
    id: 'engineering',
    icon: '⚙️',
    title: 'Engineering & Design',
    tagline: 'Build bridges, build the future',
    color: '#8B5CF6',
    dark: '#6D28D9',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    tag: 'Core Sector',
    tagColor: '#8B5CF6',
    about: 'Engineers design everything around us — roads, bridges, machines, and electronics. If you love math, physics, and making things work, engineering offers a wide variety of specialisations with global opportunities.',
    degrees: ['B.Tech / BE', 'B.Sc. Physics', 'Diploma Engineering', 'B.Arch'],
    careers: ['Civil Engineer', 'Mechanical Engineer', 'Electronics Engineer', 'Architect', 'Product Designer'],
    topExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'State CET'],
    avgSalary: '₹4 – 18 LPA',
    scope: 90,
    skills: ['Mathematics', 'Physics', 'Spatial Thinking', 'Problem Solving'],
  },
  {
    id: 'arts',
    icon: '🎨',
    title: 'Arts, Media & Design',
    tagline: 'Create, inspire, communicate',
    color: '#EC4899',
    dark: '#BE185D',
    bg: '#FDF2F8',
    border: '#FBCFE8',
    tag: 'Creative',
    tagColor: '#EC4899',
    about: 'Arts and media is a booming industry in the digital age. Content creators, designers, journalists, and filmmakers shape culture. If you are expressive and creative, this field gives you the freedom to build a unique career.',
    degrees: ['B.A. Mass Communication', 'B.A. Fine Arts', 'B.Des', 'B.A. English', 'B.A. Journalism'],
    careers: ['Journalist', 'Graphic Designer', 'Content Creator', 'Film Director', 'UX Designer'],
    topExams: ['IIMC Entrance', 'NID Entrance', 'NIFT', 'ACJ'],
    avgSalary: '₹3 – 15 LPA',
    scope: 82,
    skills: ['Creativity', 'Communication', 'Visual Sense', 'Storytelling'],
  },
  {
    id: 'science',
    icon: '🔬',
    title: 'Pure Science & Research',
    tagline: 'Discover, question, innovate',
    color: '#06B6D4',
    dark: '#0E7490',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    tag: 'Innovation',
    tagColor: '#06B6D4',
    about: 'Pure science drives all human progress. Physicists, chemists, and biologists make the discoveries that engineers and doctors apply. If you are intensely curious and love asking "why?", a career in research can lead to Nobel prizes and global impact.',
    degrees: ['B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Sc. Zoology', 'B.Sc. Maths'],
    careers: ['Research Scientist', 'ISRO / DRDO Scientist', 'Professor', 'Forensic Analyst', 'Environmentalist'],
    topExams: ['IIT JAM', 'CSIR NET', 'DBT JRF', 'IISER Aptitude Test'],
    avgSalary: '₹4 – 14 LPA',
    scope: 85,
    skills: ['Curiosity', 'Maths', 'Experimentation', 'Analytical Mind'],
  },
  {
    id: 'education',
    icon: '📚',
    title: 'Education & Teaching',
    tagline: 'Shape minds, change generations',
    color: '#F97316',
    dark: '#C2410C',
    bg: '#FFF7ED',
    border: '#FED7AA',
    tag: 'Stable Career',
    tagColor: '#F97316',
    about: 'Teaching is one of the most impactful professions — every other career depends on good teachers. If you love sharing knowledge and working with young people, education offers stable government jobs, respect, and deep satisfaction.',
    degrees: ['B.A. + B.Ed', 'B.Sc. + B.Ed', 'B.El.Ed', 'D.El.Ed', 'BA Education'],
    careers: ['School Teacher', 'College Lecturer', 'Educational Counselor', 'Curriculum Designer', 'Tutor / EdTech'],
    topExams: ['CTET', 'State TET', 'UGC NET', 'KVS/NVS Exam'],
    avgSalary: '₹3 – 12 LPA',
    scope: 87,
    skills: ['Communication', 'Patience', 'Subject Knowledge', 'Empathy'],
  },
  {
    id: 'agriculture',
    icon: '🌾',
    title: 'Agriculture & Environment',
    tagline: 'Feed the nation, protect the earth',
    color: '#65A30D',
    dark: '#3F6212',
    bg: '#F7FEE7',
    border: '#D9F99D',
    tag: 'Govt. Support',
    tagColor: '#65A30D',
    about: "Agriculture is India's backbone. Modern agricultural science transforms farming with technology. Environmentalists and food scientists are urgently needed as climate change accelerates.",
    degrees: ['B.Sc. Agriculture', 'B.Sc. Horticulture', 'B.Tech Agri. Engineering', 'B.Sc. Environmental Science'],
    careers: ['Agricultural Officer', 'Food Scientist', 'Soil Scientist', 'Environmentalist', 'NABARD Officer'],
    topExams: ['ICAR AIEEA', 'NABARD Grade A', 'State Agriculture CET'],
    avgSalary: '₹3 – 10 LPA',
    scope: 80,
    skills: ['Biology', 'Chemistry', 'Fieldwork', 'Environmental Awareness'],
  },
  {
    id: 'defence',
    icon: '🎖️',
    title: 'Defence & Security',
    tagline: 'Serve, protect, lead with honour',
    color: '#475569',
    dark: '#1E293B',
    bg: '#F8FAFC',
    border: '#CBD5E1',
    tag: 'Respected Service',
    tagColor: '#475569',
    about: 'A career in the Indian Armed Forces, police, or paramilitary is one of the most honoured paths. It offers adventure, discipline, leadership, and lifelong security.',
    degrees: ['NDA + B.Tech/BA', 'B.Sc. (Military Science)', 'BA Political Science', 'Physical Education'],
    careers: ['Army / Navy / Air Force Officer', 'IPS / Police', 'Paramilitary Officer', 'Intelligence Analyst'],
    topExams: ['NDA', 'CDS', 'UPSC CAPF', 'SSB Interview'],
    avgSalary: '₹6 – 18 LPA',
    scope: 88,
    skills: ['Physical Fitness', 'Discipline', 'Leadership', 'Patriotism'],
  },
  {
    id: 'tourism',
    icon: '✈️',
    title: 'Tourism & Hospitality',
    tagline: 'Explore the world, host with warmth',
    color: '#0EA5E9',
    dark: '#0369A1',
    bg: '#F0F9FF',
    border: '#BAE6FD',
    tag: 'Growing Industry',
    tagColor: '#0EA5E9',
    about: "Tourism is one of India's largest industries. Hotels, airlines, travel agencies, and event companies are always hiring skilled professionals.",
    degrees: ['B.Voc. Tourism', 'BHM (Hotel Management)', 'B.A. Travel & Tourism', 'Diploma in Aviation'],
    careers: ['Hotel Manager', 'Travel Agent', 'Airline Crew', 'Event Manager', 'Tourism Officer'],
    topExams: ['IIHM eCHAT', 'NCHMCT JEE', 'State Hotel Mgmt CET'],
    avgSalary: '₹3 – 12 LPA',
    scope: 78,
    skills: ['Communication', 'Languages', 'People Skills', 'Geography'],
  },
  {
    id: 'social',
    icon: '🤝',
    title: 'Social Work & NGO',
    tagline: 'Change society from the ground up',
    color: '#D97706',
    dark: '#92400E',
    bg: '#FFFBEB',
    border: '#FDE68A',
    tag: 'Meaningful Work',
    tagColor: '#D97706',
    about: "Social workers tackle India's biggest challenges — poverty, education, women's rights, and rural development. If driven by purpose over profit, this is a deeply fulfilling path.",
    degrees: ['BSW (Bachelor of Social Work)', 'B.A. Sociology', 'B.A. Psychology', 'B.A. Political Science'],
    careers: ['Social Worker', 'NGO Program Manager', 'Community Development Officer', 'Policy Researcher'],
    topExams: ['TISS Entrance', 'IGNOU Openings', 'State Social Welfare Exams'],
    avgSalary: '₹2.5 – 10 LPA',
    scope: 75,
    skills: ['Empathy', 'Communication', 'Fieldwork', 'Problem Solving'],
  },
]

// ─────────────────────────────────────────────────────────
//  UNIQUE QUESTIONS PER FIELD  (5 questions each)
//  SCORING RULE: Exactly ONE option scores 4 per question.
//  Spread: 4 = perfect fit, 3 = good fit, 2 = partial, 1 = poor fit
// ─────────────────────────────────────────────────────────
export const FIELD_QUESTIONS = {

  technology: [
    {
      q: 'You find a bug in a program that takes hours to run. What do you do?',
      options: [
        { text: 'Excited — I love hunting down the exact cause', score: 4 },       // ✅ best fit
        { text: 'Rewrite the whole thing from scratch', score: 3 },
        { text: 'Try a few things and move on if it takes too long', score: 2 },
        { text: 'Ask someone else to fix it', score: 1 },
      ],
    },
    {
      q: 'Which of these sounds most interesting to you?',
      options: [
        { text: 'Building a mobile app that millions use daily', score: 4 },        // ✅ best fit
        { text: 'Designing a beautiful website interface', score: 3 },
        { text: 'Teaching others how to use computers', score: 2 },
        { text: 'Protecting a company\'s servers from hackers', score: 3 },
      ],
    },
    {
      q: 'How comfortable are you with mathematics?',
      options: [
        { text: 'I love maths — it comes naturally to me', score: 4 },             // ✅ best fit
        { text: 'I\'m okay with it when needed', score: 3 },
        { text: 'I manage but it\'s not my favourite', score: 2 },
        { text: 'I struggle with numbers', score: 1 },
      ],
    },
    {
      q: 'When technology breaks around you, what happens?',
      options: [
        { text: 'Everyone asks me to fix it — I usually can', score: 4 },          // ✅ best fit
        { text: 'I try to fix it by googling solutions', score: 3 },
        { text: 'I call customer support', score: 2 },
        { text: 'I wait for someone else to deal with it', score: 1 },
      ],
    },
    {
      q: 'In your free time, would you rather:',
      options: [
        { text: 'Build a side project or learn a new programming concept', score: 4 }, // ✅ best fit
        { text: 'Read about AI and the future of tech', score: 3 },
        { text: 'Play video games or explore apps', score: 2 },
        { text: 'Something completely unrelated to computers', score: 1 },
      ],
    },
  ],

  medicine: [
    {
      q: 'A friend gets injured in front of you. Your first instinct is:',
      options: [
        { text: 'Stay calm, assess the wound, and help immediately', score: 4 },   // ✅ best fit
        { text: 'Call for help while staying with them', score: 3 },
        { text: 'Feel panicked but try to help', score: 2 },
        { text: 'Feel very uncomfortable with injuries', score: 1 },
      ],
    },
    {
      q: 'Which biology topic excites you most?',
      options: [
        { text: 'How the human body fights disease', score: 4 },                   // ✅ best fit
        { text: 'Cell division and genetics', score: 3 },
        { text: 'Ecology and plant life', score: 2 },
        { text: 'I find biology difficult', score: 1 },
      ],
    },
    {
      q: 'How do you feel about long years of rigorous study (5–7 years)?',
      options: [
        { text: 'Totally worth it for a career that saves lives', score: 4 },      // ✅ best fit
        { text: 'Challenging but I\'m willing to commit', score: 3 },
        { text: 'Uncertain — depends on the outcome', score: 2 },
        { text: 'I\'d prefer something shorter', score: 1 },
      ],
    },
    {
      q: 'A patient cries and tells you they are scared. You:',
      options: [
        { text: 'Comfort them patiently and explain everything clearly', score: 4 }, // ✅ best fit
        { text: 'Focus on the medical task but try to be kind', score: 3 },
        { text: 'Refer them to someone else to handle emotionally', score: 2 },
        { text: 'Feel uncomfortable with emotional situations', score: 1 },
      ],
    },
    {
      q: 'Which career path within healthcare excites you most?',
      options: [
        { text: 'Performing surgeries and treating critical patients', score: 4 }, // ✅ best fit
        { text: 'Research to discover new cures and medicines', score: 3 },
        { text: 'Managing a hospital or healthcare system', score: 2 },
        { text: 'Working in a pharmacy or community clinic', score: 2 },
      ],
    },
  ],

  business: [
    {
      q: 'You have ₹10,000 saved. What do you do with it?',
      options: [
        { text: 'Invest it — maybe stocks, mutual funds, or a small business', score: 4 }, // ✅ best fit
        { text: 'Research options carefully before deciding', score: 3 },
        { text: 'Put it in a savings account for safety', score: 2 },
        { text: 'Spend it on something you enjoy', score: 1 },
      ],
    },
    {
      q: 'In a group project, you naturally take the role of:',
      options: [
        { text: 'Leader — you organise everyone and divide tasks', score: 4 },     // ✅ best fit
        { text: 'Strategist — you plan and think long-term', score: 3 },
        { text: 'Executor — you just get your part done', score: 2 },
        { text: 'Supporter — you help whoever needs it', score: 1 },
      ],
    },
    {
      q: 'Which statement describes you best?',
      options: [
        { text: 'I\'m always thinking of business ideas and opportunities', score: 4 }, // ✅ best fit
        { text: 'I enjoy analysing profit, loss, and market trends', score: 3 },
        { text: 'I like working within a fixed system or process', score: 2 },
        { text: 'I prefer creative or social work over numbers', score: 1 },
      ],
    },
    {
      q: 'Your school canteen runs out of food. You see a chance to:',
      options: [
        { text: 'Set up a snack-selling business during lunch breaks', score: 4 }, // ✅ best fit
        { text: 'Suggest a better management system to the canteen', score: 3 },
        { text: 'Complain to the principal', score: 2 },
        { text: 'Just eat somewhere else', score: 1 },
      ],
    },
    {
      q: 'Which exam or certification would you most want to clear?',
      options: [
        { text: 'CA (Chartered Accountant) — the toughest finance exam', score: 4 }, // ✅ best fit
        { text: 'CAT — to get into IIM for MBA', score: 3 },
        { text: 'SBI PO — government banking career', score: 2 },
        { text: 'None of these appeal to me', score: 1 },
      ],
    },
  ],

  law: [
    {
      q: 'When you see something unfair happening, you:',
      options: [
        { text: 'Speak up firmly — injustice should be challenged', score: 4 },    // ✅ best fit
        { text: 'Try to understand both sides before reacting', score: 3 },
        { text: 'Feel upset but stay quiet', score: 2 },
        { text: 'Think it\'s not your problem to solve', score: 1 },
      ],
    },
    {
      q: 'How do you feel about reading and writing long texts?',
      options: [
        { text: 'I love it — I read books, news, and articles regularly', score: 4 }, // ✅ best fit
        { text: 'I manage it when the topic is interesting', score: 3 },
        { text: 'I prefer shorter content', score: 2 },
        { text: 'Reading long texts tires me quickly', score: 1 },
      ],
    },
    {
      q: 'In a debate, you usually:',
      options: [
        { text: 'Win or come very close — I prepare well and argue clearly', score: 4 }, // ✅ best fit
        { text: 'Do okay but struggle under pressure', score: 2 },
        { text: 'Enjoy watching but don\'t like participating', score: 2 },
        { text: 'Avoid debates — I don\'t like confrontation', score: 1 },
      ],
    },
    {
      q: 'Which subject do you follow most closely in the news?',
      options: [
        { text: 'Politics, government policies, and court verdicts', score: 4 },   // ✅ best fit
        { text: 'Social issues — poverty, rights, equality', score: 3 },
        { text: 'Science and technology', score: 2 },
        { text: 'Sports and entertainment', score: 1 },
      ],
    },
    {
      q: 'Your dream role in Civil Services would be:',
      options: [
        { text: 'IAS — making policy decisions that affect millions', score: 4 },  // ✅ best fit
        { text: 'IPS — maintaining law and order, fighting crime', score: 3 },
        { text: 'A lawyer defending those who can\'t afford one', score: 3 },
        { text: 'None of these — civil services doesn\'t appeal to me', score: 1 },
      ],
    },
  ],

  engineering: [
    {
      q: 'When a machine or gadget breaks, you:',
      options: [
        { text: 'Open it up to understand why it broke', score: 4 },               // ✅ best fit
        { text: 'Try to fix it using instructions or videos', score: 3 },
        { text: 'Take it to a repair shop immediately', score: 2 },
        { text: 'Replace it rather than repair it', score: 1 },
      ],
    },
    {
      q: 'Which describes your relationship with Physics?',
      options: [
        { text: 'I love it — especially mechanics, electronics, forces', score: 4 }, // ✅ best fit
        { text: 'I\'m comfortable with it when practised', score: 3 },
        { text: 'I find it hard but interesting', score: 2 },
        { text: 'Physics is my weakest subject', score: 1 },
      ],
    },
    {
      q: 'If you had to build something, what would it be?',
      options: [
        { text: 'A robot that automates a boring task', score: 4 },                // ✅ best fit
        { text: 'A bridge or flyover that handles huge traffic', score: 3 },
        { text: 'A beautiful building or public space', score: 2 },
        { text: 'I don\'t enjoy building things', score: 1 },
      ],
    },
    {
      q: 'Which of these problems excites you to solve?',
      options: [
        { text: 'Designing a more fuel-efficient car engine', score: 4 },          // ✅ best fit
        { text: 'Building a chip that uses 50% less power', score: 3 },
        { text: 'Planning a city\'s water supply system', score: 2 },
        { text: 'None of these feel interesting to me', score: 1 },
      ],
    },
    {
      q: 'How do you feel about JEE (the engineering entrance exam)?',
      options: [
        { text: 'It\'s tough but I\'m ready to work hard for it', score: 4 },      // ✅ best fit
        { text: 'I\'m preparing — it feels achievable', score: 3 },
        { text: 'It seems too hard — I\'d consider a Diploma instead', score: 2 },
        { text: 'I\'d rather avoid engineering entrance exams', score: 1 },
      ],
    },
  ],

  arts: [
    {
      q: 'When you have free time, you most naturally:',
      options: [
        { text: 'Draw, paint, write, make music, or create something', score: 4 }, // ✅ best fit
        { text: 'Watch films, read books, or explore visual art', score: 3 },
        { text: 'Scroll social media for trends and content', score: 2 },
        { text: 'Prefer outdoor sports or social activities', score: 1 },
      ],
    },
    {
      q: 'A story idea pops into your head. You:',
      options: [
        { text: 'Write it down immediately — you love storytelling', score: 4 },   // ✅ best fit
        { text: 'Turn it into a short film or comic in your mind', score: 3 },
        { text: 'Think about it for a while and maybe tell a friend', score: 2 },
        { text: 'Quickly forget — ideas don\'t excite you much', score: 1 },
      ],
    },
    {
      q: 'Which role would you most enjoy in a school event?',
      options: [
        { text: 'Stage designer or visual artist creating the sets', score: 4 },   // ✅ best fit
        { text: 'Host / MC — engaging the audience with words', score: 3 },
        { text: 'Reporter covering the event for the school magazine', score: 3 },
        { text: 'Organiser handling the schedule and logistics', score: 1 },
      ],
    },
    {
      q: 'Which platform do you enjoy spending time on most?',
      options: [
        { text: 'Instagram / Behance — visual art and design', score: 4 },         // ✅ best fit
        { text: 'YouTube — watching creative and artistic content', score: 3 },
        { text: 'News apps and long-form articles', score: 2 },
        { text: 'Gaming or sports platforms', score: 1 },
      ],
    },
    {
      q: 'Which career in this field excites you the most?',
      options: [
        { text: 'Film Director — telling powerful stories through cinema', score: 4 }, // ✅ best fit
        { text: 'UX / Graphic Designer — making digital products beautiful', score: 3 },
        { text: 'Journalist — investigating and reporting real stories', score: 3 },
        { text: 'None of these — I prefer structured, factual work', score: 1 },
      ],
    },
  ],

  science: [
    {
      q: 'When you learn about a scientific discovery, you:',
      options: [
        { text: 'Want to know every detail about how it was discovered', score: 4 }, // ✅ best fit
        { text: 'Find it interesting but move on quickly', score: 2 },
        { text: 'Only care if it has practical applications', score: 2 },
        { text: 'Science discoveries rarely interest me', score: 1 },
      ],
    },
    {
      q: 'Which lab activity do you love?',
      options: [
        { text: 'Running experiments and observing unexpected results', score: 4 }, // ✅ best fit
        { text: 'Recording data carefully and analysing patterns', score: 3 },
        { text: 'Writing lab reports and summarising findings', score: 2 },
        { text: 'I find lab work tedious', score: 1 },
      ],
    },
    {
      q: 'If you could work at any institution, it would be:',
      options: [
        { text: 'IISc or TIFR — pure scientific research', score: 4 },             // ✅ best fit
        { text: 'ISRO — researching space and satellites', score: 3 },
        { text: 'DRDO — developing defence technology', score: 2 },
        { text: 'A private company solving everyday problems', score: 1 },
      ],
    },
    {
      q: 'A long research project with no guaranteed result. You:',
      options: [
        { text: 'Love it — that uncertainty is what makes science thrilling', score: 4 }, // ✅ best fit
        { text: 'Can handle it if the topic genuinely interests me', score: 3 },
        { text: 'Would prefer work with predictable outcomes', score: 2 },
        { text: 'Feel it would be frustrating and demotivating', score: 1 },
      ],
    },
    {
      q: 'How strong is your understanding of Class 11–12 Chemistry and Physics?',
      options: [
        { text: 'Very strong — these are my best subjects', score: 4 },            // ✅ best fit
        { text: 'Good — I score well with practice', score: 3 },
        { text: 'Average — I need a lot of revision', score: 2 },
        { text: 'Weak — I find these very difficult', score: 1 },
      ],
    },
  ],

  education: [
    {
      q: 'When you understand something difficult, your first urge is:',
      options: [
        { text: 'Explain it to a friend in the simplest way possible', score: 4 }, // ✅ best fit
        { text: 'Wonder about deeper questions it raises', score: 3 },
        { text: 'Note it down so you remember it later', score: 2 },
        { text: 'Move on to the next topic', score: 1 },
      ],
    },
    {
      q: 'How do you feel about working with children or teenagers daily?',
      options: [
        { text: 'I love it — young energy is inspiring', score: 4 },               // ✅ best fit
        { text: 'It\'s fine — I can manage it well', score: 3 },
        { text: 'I prefer working with adults', score: 2 },
        { text: 'It would tire me out over time', score: 1 },
      ],
    },
    {
      q: 'Your ideal school / university subject to teach would be:',
      options: [
        { text: 'A subject I\'m passionate about — I\'d make it come alive', score: 4 }, // ✅ best fit
        { text: 'Any subject — teaching style matters more than topic', score: 3 },
        { text: 'I\'d rather counsel students than teach content', score: 2 },
        { text: 'I wouldn\'t enjoy standing in front of a class', score: 1 },
      ],
    },
    {
      q: 'A government school teacher\'s salary and job security appeals to you:',
      options: [
        { text: 'Absolutely — stability + holidays + social impact is ideal', score: 4 }, // ✅ best fit
        { text: 'Yes, but I\'d also want to build an EdTech platform', score: 3 },
        { text: 'Neutral — I haven\'t thought about it', score: 2 },
        { text: 'Salary is too low — I want higher earnings', score: 1 },
      ],
    },
    {
      q: 'Which of these achievements would make you proudest?',
      options: [
        { text: 'A student who failed comes back years later to thank you', score: 4 }, // ✅ best fit
        { text: 'Your students consistently top national exams', score: 3 },
        { text: 'You design a curriculum used across 100 schools', score: 3 },
        { text: 'None of these feel personally significant to me', score: 1 },
      ],
    },
  ],

  agriculture: [
    {
      q: 'How do you feel about spending time outdoors in rural settings?',
      options: [
        { text: 'I love it — fresh air, fields, and nature energise me', score: 4 }, // ✅ best fit
        { text: 'It\'s fine in moderate amounts', score: 3 },
        { text: 'I prefer city environments', score: 2 },
        { text: 'Outdoor fieldwork sounds exhausting', score: 1 },
      ],
    },
    {
      q: 'Which topic from Biology fascinates you most?',
      options: [
        { text: 'Plant physiology and how crops grow', score: 4 },                 // ✅ best fit
        { text: 'Soil science and microbes that make land fertile', score: 3 },
        { text: 'Animal husbandry and livestock management', score: 2 },
        { text: 'I find biology topics uninteresting', score: 1 },
      ],
    },
    {
      q: 'India faces a major drought. As an agricultural scientist, you would:',
      options: [
        { text: 'Research drought-resistant crop varieties', score: 4 },            // ✅ best fit
        { text: 'Work with farmers to implement water conservation', score: 3 },
        { text: 'Lobby government for better irrigation policy', score: 2 },
        { text: 'This doesn\'t feel like a problem I\'d want to solve', score: 1 },
      ],
    },
    {
      q: 'Which government opportunity attracts you?',
      options: [
        { text: 'ICAR Agricultural Research Service — national research', score: 4 }, // ✅ best fit
        { text: 'State Agriculture Officer — helping farmers directly', score: 3 },
        { text: 'NABARD — rural development banking', score: 2 },
        { text: 'None of these appeal to me', score: 1 },
      ],
    },
    {
      q: 'Climate change and food security are topics that:',
      options: [
        { text: 'Deeply concern me — I want to be part of the solution', score: 4 }, // ✅ best fit
        { text: 'Are important but I\'d rather someone else solves them', score: 2 },
        { text: 'I find interesting to read about but not work in', score: 2 },
        { text: 'Don\'t interest me much at all', score: 1 },
      ],
    },
  ],

  defence: [
    {
      q: 'How physically active are you?',
      options: [
        { text: 'Very fit — I exercise daily and love sports', score: 4 },         // ✅ best fit
        { text: 'Reasonably fit — active a few times a week', score: 3 },
        { text: 'I\'m working on improving my fitness', score: 2 },
        { text: 'Not very active — I prefer academic work', score: 1 },
      ],
    },
    {
      q: 'Waking up at 5 AM daily for physical training. Your reaction:',
      options: [
        { text: 'That\'s exactly my kind of discipline — bring it on', score: 4 }, // ✅ best fit
        { text: 'Hard but I could build the habit over time', score: 3 },
        { text: 'Only if I believed deeply in the cause', score: 2 },
        { text: 'That\'s too extreme for me', score: 1 },
      ],
    },
    {
      q: 'Which aspect of a defence career appeals most?',
      options: [
        { text: 'Protecting the country from external threats', score: 4 },        // ✅ best fit
        { text: 'Leading a team in challenging field operations', score: 3 },
        { text: 'The structure, honour, and lifelong respect', score: 2 },
        { text: 'I\'m only considering it for the salary', score: 1 },
      ],
    },
    {
      q: 'In a crisis, you are the type who:',
      options: [
        { text: 'Stay completely calm and take charge immediately', score: 4 },    // ✅ best fit
        { text: 'Assess the situation before acting', score: 3 },
        { text: 'Follow others\' lead', score: 2 },
        { text: 'Freeze under high pressure', score: 1 },
      ],
    },
    {
      q: 'Which path excites you most?',
      options: [
        { text: 'NDA — join the Army, Navy, or Air Force after Class 12', score: 4 }, // ✅ best fit
        { text: 'IPS / Police — maintaining law and order at home', score: 3 },
        { text: 'Intelligence Bureau — working in covert national security', score: 3 },
        { text: 'I\'m unsure — defence seems tough but I haven\'t decided', score: 1 },
      ],
    },
  ],

  tourism: [
    {
      q: 'You are at a new city. You:',
      options: [
        { text: 'Explore everything — local food, hidden spots, culture', score: 4 }, // ✅ best fit
        { text: 'Visit the famous tourist spots and relax', score: 3 },
        { text: 'Prefer staying in a comfortable hotel', score: 2 },
        { text: 'Rarely enjoy travelling', score: 1 },
      ],
    },
    {
      q: 'A foreign tourist asks you for help in English. You:',
      options: [
        { text: 'Happily help and enjoy the conversation', score: 4 },             // ✅ best fit
        { text: 'Help but feel a bit nervous about the language', score: 3 },
        { text: 'Try to help but struggle with communication', score: 2 },
        { text: 'Point them to someone else', score: 1 },
      ],
    },
    {
      q: 'Your ideal work environment is:',
      options: [
        { text: 'A 5-star hotel lobby with constant guests and activity', score: 4 }, // ✅ best fit
        { text: 'Planning international tours from an agency office', score: 3 },
        { text: 'A small cosy café or boutique travel desk', score: 2 },
        { text: 'A quiet office — I don\'t like interacting with people all day', score: 1 },
      ],
    },
    {
      q: 'Languages and cultural knowledge are:',
      options: [
        { text: 'Fascinating — I already know or am learning a second language', score: 4 }, // ✅ best fit
        { text: 'Useful but I haven\'t invested time in them yet', score: 3 },
        { text: 'Something I\'d learn only if necessary', score: 2 },
        { text: 'Not a priority for me', score: 1 },
      ],
    },
    {
      q: 'Which tourism career interests you most?',
      options: [
        { text: 'Hotel Manager — running a luxury property', score: 4 },           // ✅ best fit
        { text: 'Airline Cabin Crew — travel and serve passengers globally', score: 3 },
        { text: 'Event Manager — organising festivals, weddings, conferences', score: 2 },
        { text: 'None of these sound exciting to me', score: 1 },
      ],
    },
  ],

  social: [
    {
      q: 'When you see a homeless child on the street, you:',
      options: [
        { text: 'Feel deeply moved and want to take action', score: 4 },           // ✅ best fit
        { text: 'Think about the systemic causes behind poverty', score: 3 },
        { text: 'Feel bad but don\'t know what you can do', score: 2 },
        { text: 'Continue your day without much thought', score: 1 },
      ],
    },
    {
      q: 'Which topic fires you up the most?',
      options: [
        { text: 'Education for underprivileged children', score: 4 },              // ✅ best fit
        { text: 'Women\'s rights and gender equality', score: 3 },
        { text: 'Mental health awareness in communities', score: 3 },
        { text: 'None of these feel personally important to me', score: 1 },
      ],
    },
    {
      q: 'A lower salary in exchange for work that changes lives. You:',
      options: [
        { text: 'Accept it happily — money isn\'t everything', score: 4 },         // ✅ best fit
        { text: 'Need more time to decide — financial security matters', score: 2 },
        { text: 'Would only consider it part-time alongside another job', score: 2 },
        { text: 'Wouldn\'t accept it — salary is a priority', score: 1 },
      ],
    },
    {
      q: 'Which setting would you be happiest working in?',
      options: [
        { text: 'A village — doing direct community outreach', score: 4 },         // ✅ best fit
        { text: 'An NGO office — managing programmes and funding', score: 3 },
        { text: 'A policy think-tank — researching social problems', score: 2 },
        { text: 'A corporate office — I prefer professional environments', score: 1 },
      ],
    },
    {
      q: 'Which achievement would mean the most to you?',
      options: [
        { text: 'Helping 500 tribal children get access to quality education', score: 4 }, // ✅ best fit
        { text: 'Creating a mental health support network for rural women', score: 3 },
        { text: 'Influencing a government policy that reduces poverty', score: 3 },
        { text: 'Being promoted to a senior corporate position', score: 1 },
      ],
    },
  ],
}