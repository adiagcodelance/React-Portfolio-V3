// Script to migrate hardcoded data into the database
const { Experience, Project, Certification, sequelize } = require('./models');

const hardcodedJobs = [
  { 
    company: "DeepHealth", 
    title: "Software Engineer", 
    dates: "Jun 2024 – Present",
    logo: "/dh_logo.png",
    bullets: [
      "Added additonal functionality to existing Build process and scripts.", 
      "Developed new features and solved bugs in existing RIS application requested by clients.",
      "Developed a Python based GUI to allow easy use of Build scripts, increasing number of developers capable of starting builds with limited training.",
      "Documented build process in detail to streamline training and process management and development.",
      "Designed development architecture for ScriptSender source code, allowing easy maintenace and development of ancillary services used with RIS."
    ], 
    tags: ["C#", "SQL", "Java", "Python", "React", "Visual Studio", "Visual Studio Code"],
    order: 0
  },
  { 
    company: "Sunly Energy", 
    title: "Data Analyst & IT Assistant", 
    dates: "May 2023 – Jun 2024",
    logo: "Sunly_Yellow-01 (2).png",
    bullets: [
      "Managed for tech onboarding/offboarding, hardware/software setup, and provided IT support for headquarters and remote franchise operations.",
      "Responsible of tech procurement of both hardware and software to ensure seamless operations.",
      "Continuous Salesforce.com data administration, handling mass data uploads and deletions to maintain data integrity.",
      "Hardware/software troubleshooting and maintenance for 30+ employees including setup of hardware and software.",
      "New Salesforce automations to expand on new applcations process related to franchise business partners.",
      "Created reports and automations for data-driven analyses as a part of business intelligence reporting to support operations and management.",
      "Supported the development APIs (Application Programming Interface) to facilitate data integration between the solar design SAAS (Software as A Service) and Salesforce.com, streamlining processes related to solar application, design, and invoicing.",
      "Collaborated with a marketing agency to enhancement of website design, focusing on improvement of user experience, SEO (Search Engine Optimization), development and deployment of new pages for increased online visibility."
    ], 
    tags: ["HTML5", "CSS", "React", "SquareSpace", "Salesforce.com", "OpenSolar", "Postman", "IT"],
    order: 1
  },
  { 
    company: "The Spice Store Inc.", 
    title: "Operations Associate", 
    dates: "Nov 2018 - Jun 2024",
    logo: "/the spice store final.jpg",
    bullets: [
      "Managed salesfloor operations, procurement, logistics, pricing, merchandising, and reporting.",
      "Provided IT setup for hardware and POS software (RetailMagic) setup and support, ensuring the smooth integration and functionality of technology in day-to-day operations.",
      "Initiated development of a website for the company.",
      "Conducted staff training on essential processes (work manual), policies, and customer service standards to maintain a consistent level of service excellence.",
      "Managed B2B sales operations, order taking, procurement, delivery, implementing pricing strategies, invoicing, and account receivables."
    ],
    tags: ["IT", "Sales", "Stocking", "RetailMagic"],
    order: 2
  }
];

const hardcodedProjects = [
  { 
    name: "Folio", 
    description: "IOS App, built to allow cross functionality between built in calendar tool and a notes system for clear organization.",
    tags: ["Swift", "Xcode", "Apple"], 
    githubUrl: "https://github.com/adiagcodelance/Folio", 
    externalUrl: "https://github.com/adiagcodelance/Folio",
    featured: false,
    order: 0
  },
  { 
    name: "University Capstone - Telling Stories", 
    description: "Goal was to develop a web service that allowed our client the ability to create a unique educational H5P content that could be pushed to mediums such as Pressbooks and Moodle.",
    tags: ["HTML5", "JSX", "React", "H5P", "Visual Studio"], 
    githubUrl: "https://github.com/adiagcodelance/CS-4820-Telling-Stories", 
    externalUrl: "https://github.com/adiagcodelance/CS-4820-Telling-Stories",
    featured: false,
    order: 1
  },
  { 
    name: "App Development Project - Assignment Planner App", 
    description: "Assignment planner was an app developed with the goal of providing students a dedicated planner app with tools to help plan their academic assignments.",
    tags: ["Flutter", "Java", "Android", "Android Studio"], 
    githubUrl: "https://github.com/adiagcodelance/Assignment-Planner-", 
    externalUrl: "https://github.com/adiagcodelance/Assignment-Planner-",
    featured: false,
    order: 2
  },
];

const hardcodedCertifications = [
  { 
    logo: "/datacamp.png", 
    name: "Artifical Intelligence (AI)", 
    description: "Being able to identify the uses cases for different sub-domains of AI. Being able to explain Generative AI and common terminology of the domain. Being able to construct simple prompts for generative AI tools and being able to explain the ethical considerations that apply to AI and generative AI solutions.", 
    tags: ["AI", "AI Architecture", "Machine Learning", "Generative AI"], 
    externalUrl: "https://www.datacamp.com/skill-verification/AIF0028742102106",
    order: 0
  },
  { 
    logo: "/datacamp.png", 
    name: "SQL Associate", 
    description: "At the associate level, data management tasks relate mostly to data cleaning and processing. This includes identifying data quality issues, performing transformations and being able to work with data from multiple sources, typically multiple database tables. For the large part, these tasks are performed in SQL. This skill was tested through a hands-on SQL coding challenge. The individual was required to code specific cleaning and transformation tasks that can be applied to a given data source. This candidate was comfortable in calculatings metrics to effectively report characteristics of data and relationships between features using PostgreSQL. This skill was primarily tested through a hands-on SQL coding challenge.", 
    tags: ["SQL", "MySQL", "PostegreSQL", "Database Management"], 
    externalUrl: "https://www.datacamp.com/certificate/SQA0013747867975",
    order: 1
  },
  { 
    logo: "", 
    name: "Canon Beginner Photography Course", 
    description: "Completed Canon's online beginner photography course covering fundamentals of photography including exposure, composition, and camera settings.", 
    tags: ["Photography", "Camera Settings", "Composition"], 
    externalUrl: "#",
    order: 2
  },
  { 
    logo: "", 
    name: "Microsoft Office Suite", 
    description: "Completed Microsoft Office Suite training covering Word, Excel, PowerPoint, and Outlook.", 
    tags: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Outlook"], 
    externalUrl: "#",
    order: 3
  },
];

async function migrateData() {
  try {
    console.log('Starting data migration...');

    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    // Check if data already exists
    const existingExperiences = await Experience.count();
    const existingProjects = await Project.count();
    const existingCertifications = await Certification.count();

    if (existingExperiences > 0 || existingProjects > 0 || existingCertifications > 0) {
      console.log('Data already exists in database. Skipping migration.');
      console.log(`Found ${existingExperiences} experiences, ${existingProjects} projects, ${existingCertifications} certifications`);
      return;
    }

    // Migrate experiences
    console.log('Migrating experiences...');
    for (const job of hardcodedJobs) {
      await Experience.create(job);
    }
    console.log(`Migrated ${hardcodedJobs.length} experiences.`);

    // Migrate projects
    console.log('Migrating projects...');
    for (const project of hardcodedProjects) {
      await Project.create(project);
    }
    console.log(`Migrated ${hardcodedProjects.length} projects.`);

    // Migrate certifications
    console.log('Migrating certifications...');
    for (const cert of hardcodedCertifications) {
      await Certification.create(cert);
    }
    console.log(`Migrated ${hardcodedCertifications.length} certifications.`);

    console.log('Data migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData };