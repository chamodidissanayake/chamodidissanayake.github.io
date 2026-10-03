/*
  SITE CONTENT
  ------------
  Everything on the site lives here. To add a new conference, publication,
  field trip, research update, or travel entry - add one object to the
  matching array below. You never need to touch index.html, style.css, or
  script.js for content changes.

  PHOTOS
  - Paths are relative to index.html, no leading slash, case-sensitive on GitHub
    (e.g. "assets/conferences/Oxford1.jpeg" is NOT the same as ".../oxford1.jpeg").
  - Before publishing new photos, run:  python tools/optimize_images.py
    (shrinks them and strips location metadata).
  - Images inside assets/gallery/ are treated as figures / point-cloud renders:
    they're shown whole (never cropped) on a dark background.
  - Every photo on the site can be clicked to open full size.

  DATES: "YYYY", "YYYY-MM", or "YYYY-MM-DD". "2026-09" is shown as "Sep 2026".
  STATUS (research + publications): "active" | "in-review" | "in-prep" | "published" | "complete"
*/

window.SITE_DATA = {

  profile: {
    name: "Chamodi Dissanayake",
    role: "PhD Researcher in Precision Forestry",
    focus: "LiDAR-based forest monitoring at the individual-tree level",
    institution: "iuFOR - Sustainable Forest Management Research Institute, University of Valladolid, Spain",
    group: "SMART Ecosystems Group",
    tagline: "Measuring forests one return at a time - UAV LiDAR, handheld laser scanning and photogrammetry across European forest stands.",
    photo: "assets/profile/cham.png",
    heroImage: "assets/gallery/Screenshot_Redwood_pointcloud.png",
    interests: [
      "UAV LiDAR",
      "Handheld laser scanning",
      "UAV-SfM photogrammetry",
      "Individual tree detection",
      "Stem taper & volume modelling",
      "Timber valuation",
      "Species classification"
    ],
    bio: [
      "I'm a PhD researcher working on single-tree forest inventory, forest monitoring and timber valuation, combining UAV LiDAR, handheld laser scanning (HLS) and UAV-SfM photogrammetry. My work centres on Mediterranean forests in Spain, building methods that turn point clouds into stem volume, taper and timber assortment estimates that foresters can actually use.",
      "Before this, I completed the Erasmus Mundus MEDfOR master's in Mediterranean Forestry (University of Padova and University of Valladolid), and studied Environmental Conservation & Management at the University of Kelaniya, Sri Lanka - which is where my interest in measuring ecosystems, rather than just describing them, started.",
      "This site is a running record of the journey: research, fieldwork, training schools, conferences, travels and everything in between."
    ],
    email: "chamodi.mahanama@uva.es",
    orcid: "https://orcid.org/0009-0002-0594-4118",
    linkedin: "https://www.linkedin.com/in/chamodi-dissanayake/",
    // googleScholar: "https://scholar.google.com/citations?user=XXXX",
    // researchgate: "https://www.researchgate.net/profile/XXXX",
    // github: "https://github.com/XXXX",
    // cvUrl: "assets/CV_Chamodi_Dissanayake.pdf",   // drop your CV PDF in assets/ and uncomment
    updated: "2026-10"   // change this whenever you update the site
  },

  journey: [
    {
      date: "2024 - present",
      title: "PhD Researcher, Precision Forestry",
      place: "iuFOR - University of Valladolid · SMART Ecosystems Group",
      description: "PhD on LiDAR-based forest monitoring at the single-tree level in Mediterranean mixed stands.",
      photo: "assets/conferences/Field1.jpeg"
    },
    {
      date: "2022 - 2024",
      title: "Erasmus Mundus Joint Master's Degree - MEDfOR, Mediterranean Forestry and Natural Resources Management",
      place: "University of Padova, Italy · University of Valladolid, Spain",
      description: "Thesis: modelling single-tree stem volume from handheld laser scanning (HLS) and UAV-SfM photogrammetry in a Mediterranean mixed forest.",
      grades: "GPA 9.04 / 10.00",
      awards: "Extraordinary research and outstanding graduation award (2023-2024 academic year)",
      paper: {
        title: "Individual-Tree Stem Volume Modeling Using Handheld LiDAR and UAV-SfM Photogrammetry in a Mediterranean Mixed Forest",
        link: "https://doi.org/10.3390/f17080944"
      },
      photo: "assets/conferences/Medfor1.jpeg"
    },
    {
      date: "2020 - 2022",
      title: "University Teaching",
      place: "Sri Lanka",
      // One card, two positions - they share the photo below.
      roles: [
        {
          date: "2021 - 2022",
          title: "Teaching Assistant · Probationary Lecturer",
          place: "SLTC Research University",
          description: "Delivered lectures and supported the curriculum of the BTech in Environmental Technology. Organised field excursions and industry visits for undergraduate students."
        },
        {
          date: "2020",
          title: "Teaching Assistant",
          place: "University of Kelaniya",
          description: "Supported teaching, laboratory analysis and supervision of practical coursework in the BSc in Environmental Conservation and Management."
        }
      ],
      photo: "assets/conferences/TeachingAssistant.jpeg"
    },
    {
      date: "2016 - 2020",
      title: "BSc (Hons) in Environmental Conservation & Management",
      place: "University of Kelaniya, Sri Lanka",
      description: "Broad training across forestry, waste and water management, air quality, soil science, wildlife and ecology.",
      grades: "First Class · GPA 3.84 / 4.00",
      paper: {
        title: "Most tolerant roadside tree species for urban settings in humid tropics based on Air Pollution Tolerance Index",
        link: "https://doi.org/10.1016/j.uclim.2021.100848"
      },
      photo: "assets/conferences/UOK_Wildlife.jpeg"
    }
    // TODO: add scholarships, mobility grants, milestones as they happen
  ],

  research: [
    {
      status: "active",
      title: "Taper Modelling & Economic Valuation of Timber",
      site: "Saldaña, Spain",
      // description: "Core PhD chapter: modelling individual-tree taper and stem form from HLS point clouds in Pinus sylvestris stands, feeding into timber assortment estimates.",
      tags: ["HLS", "Taper modelling", "Pinus sylvestris"],
      photos: ["assets/gallery/05_tree_gallery.jpg", "assets/gallery/DBH_check_334_T334.jpg"]
    },
    {
      status: "active",
      title: "Species Classification from UAV Multispectral Imagery + LiDAR",
      site: "Valdepoza, Spain",
      // description: "Classifying four tree species from UAV multispectral imagery and LiDAR data, building an individual-tree-detection pipeline for mixed stands.",
      tags: ["Multispectral", "UAV LiDAR", "Species classification"],
      photos: ["assets/gallery/PinusTrees3.png", "assets/conferences/Field2.jpeg"]
    },
    {
      status: "active",
      title: "SingleTree - EU Project",
      site: "Living Lab South research team",
      description: "Multi-actor EU project (2024-2028) developing decision-support tools for single-tree management across European forests. I represent the Living Lab South research team.",
      link: "https://singletree.eu/",
      linkLabel: "singletree.eu",
      tags: ["EU project", "Living Lab", "Decision support"],
      photos: ["assets/gallery/01_individual_tree_segmentation.jpg", "assets/conferences/Swiss1.jpeg"]
    },
    {
      status: "active",
      title: "Coastal Redwood Field Campaign",
      site: "Galicia, Spain",
      description: "Field campaign scanning an experimental coastal redwood (Sequoia sempervirens) stand in Galicia, in collaboration with Agresta and the Xunta de Galicia.",
      tags: ["Field campaign", "HLS", "Sequoia sempervirens"],
      photos: ["assets/gallery/Screenshot_Redwood_pointcloud.png", "assets/conferences/Galicia1.jpeg", "assets/conferences/Galicia2.jpeg"]
    },
    {
      status: "active",
      title: "ARiF - Augmented Reality in Forestry",
      site: "COST Action CA23135",
      description: "Member of COST Action CA23135, “Bringing Digital Data and Reality Together - Augmented Reality in Forestry (ARiF)”.",
      tags: ["COST Action", "Augmented reality", "Digital forestry"],
      photos: ["assets/conferences/Joensuu1.jpeg"]
    },
    {
      status: "active",
      kind: "Mentoring",
      title: "Co-supervisor - High School Research Project",
      site: "Palencia · 2025/26",
      description: "Co-supervising a research project in the second year of the Research/Excellence High School Program in Science and Technology, organised by the Higher Technical School of Agricultural Engineering (Palencia).",
      tags: ["Mentoring", "Science outreach", "Field methods"],
      photos: ["assets/conferences/Field16.jpeg"]
    },
    {
      status: "active",
      kind: "Mentoring",
      title: "Co-mentor - Master's Company Internship Program",
      site: "2025/26 academic year",
      description: "Co-mentoring a master's student through a degree-related company internship, connecting university training with professional forestry practice.",
      tags: ["Mentoring", "Master's", "Internship"],
      photos: ["assets/conferences/Field15.jpeg"]
    },
    {
      status: "published",
      title: "Stem Volume from HLS + UAV-SfM",
      site: "Ampudia, Spain",
      description: "Master's research modelling single-tree stem volume by fusing handheld laser scanning with UAV structure-from-motion photogrammetry. Published in Forests (MDPI).",
      link: "https://doi.org/10.3390/f17080944",
      linkLabel: "Read the paper",
      tags: ["HLS", "UAV-SfM", "Stem volume"],
      photos: ["assets/gallery/02_stem_extraction_dbh.jpg"]
    },
    {
      status: "published",
      title: "IMFLEX - Integrated Forest Management Along Complexity Gradients",
      site: "Castilla y León, Spain",
      description: "National project (PID2021-126275OB-C22) funded by MCIN, the State Research Agency (AEI) and ERDF. I contributed a sub-study on Pyrenean oak (Quercus pyrenaica) distribution and canopy height model (CHM) development for Castilla y León using PNOA airborne LiDAR: “Canopy Structure and Yield Estimation in Quercus pyrenaica Forests Using PNOA Airborne LiDAR”.",
      tags: ["PNOA LiDAR", "CHM", "Quercus pyrenaica"],
      photos: ["assets/gallery/PNOA_IMFLEX.jpg"]
    }
    // TODO: add/update as chapters progress
  ],

  // Toolkit section - organised like a LiDAR workflow, from the field to the final map.
  skills: {
    pipeline: [
      {
        stage: "Acquire",
        summary: "Collecting forest data in the field and from the air",
        methods: ["UAV data acquisition & flight planning", "Handheld & ground-based LiDAR scanning", "Field forest inventory & mensuration"],
        tools: ["EU drone pilot A1/A3"]
      },
      {
        stage: "Process",
        summary: "Turning raw scans into clean, usable point clouds",
        methods: ["Point-cloud processing", "Individual tree segmentation"],
        tools: ["CloudCompare", "LiDAR360", "FARO Connect"]
      },
      {
        stage: "Analyse & model",
        summary: "From point clouds to stem volume, taper and species",
        methods: ["Machine learning", "Forest modelling", "Multispectral imagery analysis"],
        tools: ["Python", "R"]
      },
      {
        stage: "Map & share",
        summary: "Spatial analysis and reproducible workflows",
        methods: ["GIS & spatial analysis", "Version-controlled code"],
        tools: ["QGIS", "ArcGIS Pro", "GitHub"]
      }
    ],
    certifications: [
      { name: "EU Drone Pilot Licence (A1/A3)", issuer: "European Union Aviation Safety Agency (EASA)", note: "Enables UAV-based LiDAR and photogrammetry data acquisition" }
    ],
    courses: [
      { name: "Deep Learning using ArcGIS Pro", provider: "Esri", year: "2024" },
      { name: "Spatial Data Science: The New Frontier in Analytics", provider: "Esri MOOC", year: "2024" },
      { name: "Imagery and Remote Sensing", provider: "Esri", year: "2024" },
      { name: "Fundamentals of GIS", provider: "UC Davis · Coursera", year: "2023" }
    ]
  },

  // level: "Native" or a CEFR level (A1, A2, B1, B2, C1, C2)
  languages: [
    { name: "Sinhala", level: "Native" },
    { name: "English", level: "C1", note: "IELTS" },
    { name: "Spanish", level: "B1", note: "Escuela Oficial de Idiomas, Castilla y León" }
  ],

  publications: [
    {
      type: "Journal article",
      year: "2026",
      status: "published",
      title: "Individual-Tree Stem Volume Modeling Using Handheld LiDAR and UAV-SfM Photogrammetry in a Mediterranean Mixed Forest",
      venue: "Forests (MDPI) - Forest Inventory, Modeling and Remote Sensing",
      link: "https://doi.org/10.3390/f17080944"
    },
    {
      type: "Journal article",
      year: "2026",
      status: "in-prep",
      title: "LiDAR-Based Pre-Harvest Merchantable Timber Assortment and Economic Valuation of Scots Pine",
      venue: "In preparation"
    },
    {
      type: "Journal article",
      year: "2021",
      status: "published",
      title: "Most tolerant roadside tree species for urban settings in humid tropics based on Air Pollution Tolerance Index",
      venue: "Urban Climate (Elsevier)",
      link: "https://doi.org/10.1016/j.uclim.2021.100848"
    },
    {
      type: "Magazine article",
      year: "2026",
      status: "published",
      title: "Enhancing Climate Resilience in Sri Lanka through LiDAR-based Forest Inventory: A Perspective on Integrating Advanced Forest Monitoring Technologies",
      venue: "Land and Life e-magazine, Sri Lanka Association for the Advancement of Science (SLAAS)"
    },
    {
      type: "Conference paper",
      year: "2026",
      status: "published",
      title: "LiDAR-Based Stem Taper Reconstruction for Merchantable Volume Assessment in Scots Pine - A Methodological Framework",
      venue: "1st International Congress on Forest Digitalisation, Burgos, Spain (May 2026)"
    },
    {
      type: "Conference paper",
      year: "2025",
      status: "published",
      title: "Estimación del volumen maderable mediante LiDAR y fotogrametría en bosques mediterráneos mixtos",
      venue: "9th Spanish Forest Congress, Gijón, Spain (June 2025) · ISBN 978-84-941695-7-1"
    },
    {
      type: "Conference paper",
      year: "2025",
      status: "published",
      title: "Advancing Forest Inventory Methods: Integrating LiDAR and Drone-Based Photogrammetry for Automated Stem Volume Estimation",
      venue: "XIX Young Forest Researchers Meeting, University of Valladolid, Spain (February 2025)"
    },
    {
      type: "Conference paper",
      year: "2024",
      status: "published",
      title: "LiDAR and Photogrammetry for Automated Single-Tree Volume Estimation: A Case from Mediterranean Mixed Forest in Northern Spain",
      venue: "20th International Symposium on Systems Analysis in Forest Resources (SSAFR) (May 2024)"
    },
    {
      type: "Conference paper",
      year: "2024",
      status: "published",
      title: "Can Handheld LiDAR Replace Traditional Forest Inventory? Insights for Individual Tree Volume Estimation in a Mediterranean Mixed Forest, Northern Spain",
      venue: "Scientific Symposium 2024, University of Valladolid, Spain (April 2024)"
    },
    {
      type: "Conference paper",
      year: "2024",
      status: "published",
      title: "Integrating LiDAR-Based Equations into Tree-Level Growth Models: A Case from Mediterranean Mixed Oak-Pine Forests in Northern Spain",
      venue: "Young Forest Researchers Meeting 2024, University of Valladolid, Spain (February 2024)"
    },
    {
      type: "Conference paper",
      year: "2021",
      status: "published",
      title: "Coal Fly Ash Soil Amendment on Seed Germination and Seedling Growth of Sunflower (Helianthus annuus L.)",
      venue: "EUROSOIL 2021, Geneva (virtual congress, August 2021)"
    },
    {
      type: "Conference paper",
      year: "2021",
      status: "published",
      title: "Developing a multiple criteria decision-making model for selecting the best roadside tree species in different urban environmental settings in Colombo District, Sri Lanka",
      venue: "25th International Forestry and Environment Symposium, University of Sri Jayewardenepura, Sri Lanka (January 2021)"
    },
    {
      type: "Conference paper",
      year: "2019",
      status: "published",
      title: "Identification of suitable areas to cultivate Aloe Vera in Kegalle district, Sri Lanka using GIS",
      venue: "4th International Research Symposium on Pure and Applied Sciences (IRSPAS), University of Kelaniya, Sri Lanka (October 2019)"
    }
    // TODO: add papers, preprints and proceedings as they happen
  ],

  // Conferences, training schools, research visits - most recent first.
  research_trainings: [
    {
      date: "2026-09",
      type: "Project meeting & field visit",
      name: "SingleTree Annual Meeting",
      location: "Leissigen, Bern, Switzerland",
      role: "Living Lab South team member",
      description: "Fruitful discussions and knowledge exchange across the project's work packages. The highlight was a field day in a Swiss pre-Alpine forest exploring steep-terrain harvesting and cable-based timber extraction - an excellent opportunity to connect research with real-world forest operations.",
      photos: ["assets/conferences/Swiss1.jpeg", "assets/conferences/Swiss2.jpeg", "assets/conferences/Swiss3.jpeg"]
    },
    {
      date: "2026-09",
      type: "Training school",
      name: "ARiF COST Action Training School",
      location: "University of Eastern Finland, Joensuu, Finland",
      role: "Participant",
      description: "Shared research, tried XR/AR hardware hands-on, tested AR forestry apps in the forests of Lykynlampi, and rapidly prototyped AR concepts across the forestry value chain.",
      photos: ["assets/conferences/Joensuu1.jpeg", "assets/conferences/Joensuu2.jpeg", "assets/conferences/Joensuu3.jpeg"]
    },
    {
      date: "2026-06",
      type: "Research visit",
      name: "Erasmus+ KA131 Mobility - PhD Research Visit",
      location: "University of Helsinki, Finland",
      role: "Visiting PhD researcher",
      description: "Met the GEHO (Global Ecosystem Health Observatory) research group, presented my PhD research and exchanged ideas with researchers across disciplines. Visited KOKO Forest and the Finnish Geospatial Research Institute (FGI) to learn about ongoing remote-sensing and geospatial research, and joined a field data collection in a boreal stand, including bark beetle monitoring.",
      photos: ["assets/conferences/Helsinki1.jpeg", "assets/conferences/Helsinki3.jpeg", "assets/conferences/Helsinki2.jpeg"]
    },
    {
      date: "2025-08",
      type: "Project meeting & field visit",
      name: "SingleTree Annual Meeting",
      location: "Sundsvall, Sweden",
      role: "Participant",
      description: "Productive discussions across the project's work packages, plus a field day in a Swedish production forest and a look at Sweden's large-scale timber industry and new harvesting techniques.",
      photos: ["assets/conferences/Sweden1.jpeg", "assets/conferences/Sweden2.jpeg", "assets/conferences/Sweden3.jpeg"]
    },
    {
      date: "2025-08",
      type: "Training school",
      name: "Interdisciplinary Training School on Forest Ecosystems",
      location: "University of Oxford, United Kingdom",
      role: "Participant",
      description: "Explored LiDAR-based forest monitoring and AR hardware and software for forestry, with a field excursion to Wytham Woods.",
      photos: ["assets/conferences/Oxford1.jpeg", "assets/conferences/Oxford3.jpeg", "assets/conferences/Oxford2.jpeg"]
    },
    {
      date: "2024-08",
      type: "Training school",
      name: "Training School on Data Fusion",
      location: "Forest Research Institute, Warsaw, Poland",
      role: "Participant",
      description: "Learned data-fusion techniques for forestry, got to know Polish forests, and connected with researchers from around the world.",
      photos: ["assets/conferences/Poland1.jpeg", "assets/conferences/Poland2.jpeg", "assets/conferences/Poland3.jpeg"]
    },
    {
      date: "2024-07",
      type: "Summer school",
      name: "MEDfOR Summer School",
      location: "Trento, Italy",
      role: "Participant",
      description: "The closing gathering of the MEDfOR Erasmus Mundus programme: we presented our final research, explored Alpine forests and strengthened our international network.",
      photos: ["assets/conferences/Italy1.jpeg", "assets/conferences/Italy2.jpeg", "assets/conferences/Italy3.jpeg"]
    },
    {
      date: "2022-08",
      type: "Summer school",
      name: "Association of Commonwealth Universities (ACU) Summer School",
      location: "Leeds Trinity University, United Kingdom",
      role: "Online participant",
      description: "A multidisciplinary programme bringing together students from across the Commonwealth around “Sport and regeneration: driving sustainability, community and wellbeing”.",
      photos: []
    }
  ],

  // Field notes - newest first.
  fieldLog: [
    {
      date: "2026-05",
      title: "Galicia Coastal Redwood Field Campaign",
      note: "Handheld laser scanning (HLS) of a coastal redwood stand in Galicia, Spain, building a forest inventory for further research.",
      photos: ["assets/conferences/Galicia2.jpeg", "assets/conferences/Galicia1.jpeg", "assets/conferences/Galicia3.jpeg"]
    },
    {
      date: "2024 - 2026",
      title: "LiDAR Field Campaigns across Spain",
      note: "With the team, collected HLS and UAV LiDAR data across Spain - Ampudia, Saldaña, Valladolid, Palencia, Barrado and Soria. The data supports student theses and research projects within the group.",
      photos: ["assets/conferences/Field2.jpeg", "assets/conferences/Field6.jpeg", "assets/conferences/Field4.jpeg"]
    }
  ],

  // Fieldwork & point-cloud gallery. Shown uncropped, in a masonry grid.
  gallery: [
    { caption: "Individual tree segmentation of an HLS plot", meta: "Point cloud", image: "assets/gallery/01_individual_tree_segmentation.jpg" },
    { caption: "UAV LiDAR flight preparation", meta: "UAV LiDAR · 2024", image: "assets/conferences/Field2.jpeg" },
    { caption: "Handheld laser scanning of a pine plot, coloured by height", meta: "Point cloud", image: "assets/gallery/04_plot_height_coloured.jpg" },
    { caption: "Handheld scanning in a pine stand", meta: "HLS fieldwork", image: "assets/conferences/Field1.jpeg" },
    { caption: "Stem extraction and DBH by circle fitting", meta: "Point cloud", image: "assets/gallery/02_stem_extraction_dbh.jpg" },
    { caption: "Coastal redwood stand, Galicia", meta: "Field campaign · 2026", image: "assets/conferences/Galicia2.jpeg" },
    { caption: "Tree component segmentation - stem, branches, foliage", meta: "Point cloud", image: "assets/gallery/03_stem_branch_foliage_segmentation.jpg" },
    { caption: "Handheld laser scanner in the redwood stand", meta: "HLS · Galicia", image: "assets/conferences/Galicia1.jpeg" },
    { caption: "Coastal redwood stand point cloud", meta: "Point cloud · Galicia", image: "assets/gallery/Screenshot_Redwood_pointcloud.png" },
    { caption: "Pine stand, Saldaña site", meta: "Fieldwork · 2024", image: "assets/conferences/Field4.jpeg" },
    { caption: "Segmented Scots pine trees from HLS point clouds", meta: "Point cloud", image: "assets/gallery/05_tree_gallery.jpg" },
    { caption: "Single tree coloured by height", meta: "Point cloud", image: "assets/gallery/TreeID40_77_FullTree.png" },
    { caption: "Individual pine trees from UAV LiDAR, coloured by height", meta: "Point cloud · Valdepoza", image: "assets/gallery/PinusTrees3.png" },
    { caption: "GNSS positioning in a forest plot", meta: "Fieldwork", image: "assets/conferences/Field6.jpeg" },
    { caption: "Oak stand in autumn, Barrado", meta: "Fieldwork · Barrado", image: "assets/gallery/Field9_BarradoStand.jpeg" },
    { caption: "Total station survey for tree positioning", meta: "Fieldwork · Barrado", image: "assets/gallery/Field8.jpeg" },
    { caption: "Total station set-up in the redwood stand", meta: "Field campaign · Galicia", image: "assets/conferences/Galicia3.jpeg" },
    { caption: "Quercus pyrenaica distribution from PNOA airborne LiDAR", meta: "IMFLEX · Castilla y León", image: "assets/gallery/PNOA_IMFLEX.jpg" },
    { caption: "Into the plot", meta: "Fieldwork", image: "assets/conferences/Field3.jpeg" },
    { caption: "Plantation stand", meta: "Fieldwork", image: "assets/conferences/Field5.jpeg" }
  ],

  // Travel & exploring - the casual side. Sorted newest first automatically.
  travel: [
    { location: "Barrado, Spain", date: "", note: "Golden sunset over the mountains after fieldwork", photos: ["assets/travel/Barrado.jpeg"] },  // TODO: add date, e.g. "2025-11"
    { location: "Palencia, Spain", date: "2025-10", note: "In love with colourful sunsets", photos: ["assets/travel/travel5.jpeg"] },
    { location: "Somewhere in the white mountains", date: "2025-01", note: "Surrounded by snow and mountains - a perfect winter getaway", photos: ["assets/travel/travel6.jpeg"] },
    { location: "Oslo, Norway", date: "2024-10", note: "A peaceful night in Oslo", photos: ["assets/travel/travel3.jpeg"] },
    { location: "Trento, Italy", date: "2024-08", note: "Italian Alps and green valleys", photos: ["assets/travel/travel7.jpeg"] },
    { location: "Lugano, Switzerland", date: "2024-07", note: "Relaxing time in Lugano", photos: ["assets/travel/travel4.jpeg"] },
    { location: "Luxembourg City, Luxembourg", date: "2024-03", note: "Old town reflections in the Grund", photos: ["assets/travel/Travel11_Luxemburg.jpeg"] },
    { location: "Zaanse Schans, Netherlands", date: "2024-03", note: "Windmills along the Zaan river", photos: ["assets/travel/Travel10_Netherlands.jpeg"] },
    { location: "Zaandam, Netherlands", date: "2024-03", note: "Stacked green Dutch houses", photos: ["assets/travel/Travel9_Netherlands.jpeg"] },
    { location: "Brussels, Belgium", date: "2024-03", note: "Looking up at the Atomium", photos: ["assets/travel/travel8_Brussels.jpeg"] }
    // Unused photos you could add: assets/travel/travel1.jpeg (plane window), travel2.jpeg (crocus flowers)
  ]

};
