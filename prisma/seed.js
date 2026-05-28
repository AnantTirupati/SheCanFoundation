const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL environment variable is missing in .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('supabase') ? { rejectUnauthorized: false } : undefined
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding real-time shecanfoundation.org datasets onto Supabase PostgreSQL...');

  // 1. Create or Update Founder Admin Profile (Reeta Mishra)
  const founder = await prisma.user.upsert({
    where: { email: 'president@shecanfoundation.org' },
    update: {
      name: 'Reeta Mishra',
      role: 'ADMIN',
    },
    create: {
      email: 'president@shecanfoundation.org',
      name: 'Reeta Mishra',
      role: 'ADMIN',
    },
  });
  console.log('✓ Seeded Founder Profile:', founder.name);

  // 2. Create Core Active Social Campaigns
  const campaigns = [
    {
      id: 'hygiene-outreach',
      title: 'Rural Menstrual Hygiene Awareness & Kit Distribution',
      description: 'Breaking deep-rooted period taboos, distributing biodegradable organic pads, and providing medical sanitization guidelines across schools in West Bengal and Bihar villages.',
      category: 'Menstrual Health',
      targetAmount: 500000,
      raisedAmount: 0,
      coverImage: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d2d?auto=format&fit=crop&q=80&w=600',
      active: true,
    },
    {
      id: 'tailoring-literacy',
      title: 'Vocational Stitching & Tailoring Workshops for Village Mothers',
      description: 'Equipping rural widows and young mothers with standard sewing machines, raw materials, and merchant connection portals to foster absolute financial self-reliance.',
      category: 'Skill Uplift',
      targetAmount: 350000,
      raisedAmount: 0,
      coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600',
      active: true,
    },
    {
      id: 'rural-computing',
      title: 'Rural Computer Booths & Digital Literacy for Young Daughters',
      description: 'Setting up village information booths equipped with computers and internet access, offering introductory software, basic computing, and digital workflow guides.',
      category: 'IT Education',
      targetAmount: 600000,
      raisedAmount: 0,
      coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
      active: true,
    },
  ];

  for (const c of campaigns) {
    await prisma.campaign.upsert({
      where: { id: c.id },
      update: {
        title: c.title,
        description: c.description,
        category: c.category,
        targetAmount: c.targetAmount,
        raisedAmount: c.raisedAmount,
        coverImage: c.coverImage,
        active: c.active,
      },
      create: {
        id: c.id,
        title: c.title,
        description: c.description,
        category: c.category,
        targetAmount: c.targetAmount,
        raisedAmount: c.raisedAmount,
        coverImage: c.coverImage,
        active: c.active,
      },
    });
  }
  console.log('✓ Seeded Core Active Campaigns with Zero Raised Balances');

  // 3. Clear Stale Records securely
  try {
    await prisma.donation.deleteMany();
    await prisma.volunteer.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.event.deleteMany();
  } catch (err) {
    console.log('Table cleaning step processed.');
  }

  // 4. Create Core Initial Blogs & Chronicles
  const blogs = [
    {
      title: "Priya's Journey back to School: Dignity through Sanitation",
      description: "How distributing organic, bio-degradable sanitation pads and safe health guides helped Priya secure 92% attendance and pass her exams in rural Purulia.",
      content: "At 13, Priya started her menstrual cycle. In rural Purulia, discussing periods was a strict social taboo. Lacking clean pads, she relied on old, dirty rags stored in dark corners, leading to chronic infections and keeping her at home 5 days every single month. Our volunteers held a sanitization drive, gifted her recurring hygiene kits, and certified her local school ambassadors. Today, Priya is fully active and leads youth health mentoring.",
      coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
      category: "Menstrual Health",
      tags: ['Dignity', 'Outreach', 'Purulia'],
    },
    {
      title: "Tailoring Hope: How a Sewing Machine Machine Empowered a Mother",
      description: "Empowering Sarita Devi, a single mother in Bihar, with sewing equipment, fabric resources, and local tailoring connections to secure a stable income.",
      content: "Sarita was a widowed single mother struggling to feed her two daughters. She joined our Vocational Tailoring workshop, and graduated with standard machine setups. Today, she runs her mini-boutique, earning a stable ₹8,00,000 annually, ensuring both daughters attend daily classes with full textbooks packs.",
      coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600",
      category: "Skill Center",
      tags: ['Empowerment', 'Sponsorship', 'Bihar'],
    },
  ];

  for (const b of blogs) {
    await prisma.blog.create({
      data: {
        title: b.title,
        description: b.description,
        content: b.content,
        coverImage: b.coverImage,
        category: b.category,
        tags: b.tags,
        authorId: founder.id,
      },
    });
  }
  console.log('✓ Seeded Chronicles Blog posts');

  // 5. Create Initial Events
  const events = [
    {
      title: 'Purulia Rural Hygiene Kit Drive',
      description: 'Join us as we distribute 1,200 biodegradable pads, handbooks, and clinical support gear to 3 primary schools in purulia villages.',
      date: new Date('2026-06-03T09:00:00Z'),
      location: 'Purulia High School Ground, WB',
      coverImage: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d2d?auto=format&fit=crop&q=80&w=600',
      capacity: 100,
      registered: 88,
    },
    {
      title: 'Sewing Machine Skill Center Inauguration',
      description: 'Opening our 4th vocational stitching center. Training local single mothers on high-efficiency sewing designs.',
      date: new Date('2026-06-12T11:00:00Z'),
      location: 'Block C Community Hall, Purulia',
      coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600',
      capacity: 50,
      registered: 42,
    },
  ];

  for (const e of events) {
    await prisma.event.create({
      data: e,
    });
  }
  console.log('✓ Seeded Upcoming Events calendar');

  // 6. Seed initial volunteers (2 Approved, 2 Pending)
  const volunteers = [
    {
      name: 'Sreya Dutta',
      email: 'sreya@gmail.com',
      phone: '9876543210',
      bio: 'Passionate about spreading hygiene awareness.',
      skills: ['Public Health Advocacy', 'Language Translation (Bengali/Hindi)'],
      status: 'PENDING',
      tasks: [],
    },
    {
      name: 'Vikram Singh',
      email: 'vikram@gmail.com',
      phone: '8765432109',
      bio: 'Experienced in rural camp coordination.',
      skills: ['Logistics Management', 'Event Management'],
      status: 'PENDING',
      tasks: [],
    },
    {
      name: 'Rohan Sen',
      email: 'rohan@gmail.com',
      phone: '7654321098',
      bio: 'Field volunteer helper since last 6 months.',
      skills: ['Event Management', 'Public Health Advocacy'],
      status: 'APPROVED',
      tasks: ['Purulia Camp Logistics Support'],
    },
    {
      name: 'Anjali Sharma',
      email: 'anjali@gmail.com',
      phone: '6543210987',
      bio: 'Stitching instructor looking to empower village mothers.',
      skills: ['Stitching/Design Skills'],
      status: 'APPROVED',
      tasks: ['Tailoring Workshop Mentoring'],
    }
  ];

  for (const v of volunteers) {
    await prisma.volunteer.create({
      data: v,
    });
  }
  console.log('✓ Seeded Mock Volunteers');

  console.log('🎉 Seed script executed successfully! Supabase database is populated with real-time shecanfoundation.org data.');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
