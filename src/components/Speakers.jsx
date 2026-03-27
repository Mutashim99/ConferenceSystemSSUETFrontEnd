import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Speakers = ({ id }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const keynoteSpeakers = [
    {
      name: "Prof. Andrew Ware",
      location: "United Kingdom (UK)",
      image: "./international_invited_speakers/jaware.webp",
      topic: "VR in Healthcare",
      abstract:
        "Upskilling medical professionals in developing economies through Virtual Reality (VR) training presents an opportunity to address long-standing disparities in healthcare education and access to quality training. In regions where healthcare systems often struggle with resource shortages, limited infrastructure, and inadequate access to advanced medical tools, VR technology can offer an innovative solution by creating immersive, hands-on learning environments. Medical practitioners can conduct realistic simulations of complex procedures, practice emergency interventions, and refine diagnostic skills in a controlled, risk-free environment. This allows healthcare workers to repeatedly hone their techniques without the need for costly equipment, live patients, or even the proximity of expert mentors. These are elements that are often lacking in underserved regions.\n\nMoreover, VR training can be customized to address local health challenges, enabling professionals to practice and prepare for scenarios they are most likely to encounter. Whether it is mastering life-saving techniques in trauma care, improving neonatal care in regions with high infant mortality rates, or staying up to date on new surgical innovations, VR offers flexible, scalable learning opportunities tailored to different specialties.\n\nIn addition, VR training democratizes medical education by removing the barriers imposed by geography or economic limitations. Medical professionals in rural or remote areas, who might otherwise be excluded from ongoing learning opportunities, can now access the same high-caliber training as their urban counterparts. This can enhance the overall competency of healthcare workers across developing economies, bringing them in line with global standards. Ultimately, the integration of VR in medical training not only helps to bridge the skills gap but also empowers healthcare systems in developing economies to better serve their populations.",
      profile:
        "Andrew is a Professor of Computing at the University of South Wales. His research interests center on deploying intelligent computer systems (Artificial Intelligence and Data Science oriented solutions) to help solve real-world problems. Andrew works on AI-related projects with several industrial and commercial partners. Andrew is Editor in Chief of the international journal Annals of Emerging Technologies in Computing (AETiC).\n\nAndrew teaches various computer-related courses, including artificial intelligence, data mining and computer programming. Moreover, Andrew has successfully supervised over forty PhD students and has participated in and led international research projects. Andrew is the Regional Director of Techno Camps, an innovative and ambitious initiative funded by the Welsh Government that seeks to engage young people with computing and its cognate subjects. Andrew is a director of 360 Ability Sport, a charitable organization that aims to increase participation in sports among people with disabilities.",
    },
    {
      name: "Associate Prof. Arthur James Swart",
      location: "South Africa",
      image: "./international_invited_speakers/Arthur.JPG",
      topic:
        "Assessing written assignments of engineering students using a well-structured prompt in ChatGPT",
      abstract:
        "Assessment in higher education is vital to ensure student learning, and adherence to academic and professional standards. The advent of educational technologies and artificial intelligence has enabled a more robust form of assessment, one that is less prone to academic subjectivity, error, bias or favouritism. The purpose of this study is to detail the process of developing a well-structured prompt for ChatGPT to effectively assess written assignments (i.e. patent applications) of a large class of engineering students. The process includes defining clear assignment guidelines, generating a correlative rubric, creating a well-structured prompt, evaluating AI results of manually assessed assignments and refining the prompt. An iterative process is used to refine the prompt to align with the assessment of 5 assignments that were manually graded by an academic. A Cohen’s Kappa coefficient of 0.628 was calculated between the grades awarded by ChatGPT for 18 iterations and those of the academic, indicating a strong correlation. It is recommended to generate an assessment rubric that corresponds to clearly defined assignment guidelines and then to create a well-structured prompt in step-format that must be refined using an iterative process.",
      profile:
        "Mr. James Swart is an Associate Professor of Electrical Engineering at the Central University of Technology and a Principal Research Leader in Engineering Education, focusing on the Scholarship of Teaching and Learning (SoTL). With over 30 years of academic and 5 years of industry experience, he has authored more than 200 research publications and is a registered Professional Engineering Technologist with ECSA as well as a C2-rated scientist by South Africa’s National Research Foundation. His work centers on enhancing student engagement through improved alignment of learning outcomes, assessments, and graduate attributes. Known for his strengths in academic writing, mentorship, and public speaking, he actively supports colleagues in documenting teaching practices and motivates students through international talks across countries like India, Pakistan, and Indonesia. He has received multiple accolades, including a Commendation for Teaching from the Council of Higher Education and two Vice-Chancellor’s Excellence Awards. Beyond academia, he values personal growth, mentorship, and consistency as a key principle of quality in both professional and personal life.",
    },
    {
      name: "Mr. Ahmad Ahmadzada",
      location: "Azerbaijan",
      image: "./international_invited_speakers/ahmedzada.jpg",
      topic:
        "Semantic Plagiarism Detection in the Age of Transformers and LLMs: From Research to Real-World Deployment",
      abstract:
        "Semantic plagiarism detection has advanced significantly with the adoption of Transformer-based encoders and, more recently, large language models (LLMs). Although recent research shows strong results, moving these approaches into real academic and industrial workflows brings a different set of challenges. These include detecting plagiarism under extensive paraphrasing, handling document-level restructuring, dealing with multilingual and code-mixed content, and producing evidence that is transparent and defensible for academic integrity processes.\n\nThis keynote connects current research with deployment realities by outlining an end-to-end view of modern semantic plagiarism detection. It traces the shift from traditional lexical matching to embedding-based retrieval (e.g., SBERT-style representations) and cross-encoder reranking, highlighting where each method tends to work well and where it often breaks down such as topic drift, long-document comparison, and adversarial rewriting. The talk then introduces a deployment-focused pipeline that integrates large-scale candidate retrieval, segment-level alignment, evidence aggregation, and calibrated risk scoring, with thresholds aligned to institutional policy to minimize false accusations.\n\nThe keynote also addresses the new landscape created by LLMs. On one hand, AI tools make paraphrasing and translation-based obfuscation easier than ever; on the other, LLMs can support better explanations by generating clear, human-auditable summaries and evidence highlights without turning the overall system into an opaque “black box.” The session concludes with practical guidance on evaluation beyond standard accuracy metrics, including robustness, fairness, privacy, and operational constraints such as latency and cost, and offers a roadmap for institutions aiming to modernize plagiarism detection responsibly.",
      profile:
        "Ahmad Ahmadzada is a PhD candidate and Senior Lecturer specializing in applied artificial intelligence and intelligent systems. He heads the Startup & Technology Transfer Office in the Digitalization Department at Azerbaijan State Oil and Industry University (ASOIU), where he helps run innovation programs, delivers industry-oriented training, and supports lab-based prototyping. His research spans NLP and text analytics particularly semantic plagiarism detection along with risk-aware decision-making and applied machine learning. He also mentors multidisciplinary teams developing AI/ML prototypes and contributes to university industry collaboration and the growth of the innovation ecosystem.",
    },
    {
    name: "Prof. Dr. Haji Zul Baharom",
    location: "United Kingdom (UK)",
    image: "./international_invited_speakers/zul.jpg",
    topic: "Sharing of Experience on HR's value case study that People-focused companies are Four times more likely to outperform peers!",
    abstract:
      "In an era of AI and economic pressure, with heightened demands for productivity and profit, it's a challenge that shows little sign of abating. The question is no longer about whether HR adds value in principle - 'Our people are our most important asset' is ingrained in most CEO handbooks now - but how convincingly it can demonstrate that value in practice. Evidently, in my 50 years of experience working with several MNCs and government linked companies is on the HR side. According to my case study review on the impact of HR management, business records \"have consistently found that HR practices are positively associated with in-role, extra role & general performance, financial performance, operational and market performance for corporate productivity and sustainable employee wellbeing.\"",
    profile:
      "Prof. Dr. Hj Zul is an internationally recognized leader in human resource management and leadership development, honored with prestigious awards including the Gusi Peace Prize International Laureate (2022), AIM Alumni Achievement Award (2020), MIHRM Lifelong Achievement Award (2019), Asia HRD Award (2015), and World Corporate Universities Educational Leadership Award (2014). He is the Founding CEO of Sejahtera Leadership Initiative (SLI) and Global Sejahtera, established in 2018 to support sustainable and diversity-driven initiatives aligned with global goals. With over five decades of experience, he has worked across multinational corporations, government-linked companies such as PETRONAS and Malaysia Airlines, private sector organizations, and professional bodies. He currently serves as Chairman of Myaerosatu Aerospace Association Malaysia, Board Member and Adjunct Professor at the International University of Entreprenology, WUSME Ambassador in Malaysia, and Professor of Practice in HR Management and Leadership at various institutions. He holds a BSc (Hons) in Industrial/Organizational Psychology from the University of New South Wales, a Master’s in Management from AIM Manila, and a PhD in Entrepreneurial Leadership Competencies, along with being a Chartered Fellow of the Chartered Institute of Personnel Management, UK."
  },
  {
    name: "Prof. Dr. Enrique Nava",
    location: "Malaga, Spain",
    image: "./international_invited_speakers/enrique.jpg",
    topic: "Developing applications with 3D depth digital image processing",
    abstract:
      "3D digital image processing techniques are now routinely used in many applications such as medical imaging, environmental assessment, remote sensing, etc. In this paper, we will present some new trends involving the use of new technology depth cameras with a very broad range of applications, including gesture recognition and hand tracking, 3D modeling, metaverse, underwater video processing, and hyperspectral remote sensing. Using 3D depth cameras, we obtain sparse point cloud data, which imposes some new research challenges for building new applications. The aim of this talk is to present some basic and new ideas to inspire research in this area, as well as to present actual research projects in this field.",
    profile:
      "Prof. Dr. Enrique Nava finished his PhD thesis under the supervision of Prof. J.M. Rebollar on the design of circular waveguide polarizer devices on microwaves/millimeter waves to be used in communication satellite antennas. As a result, a newly developed computer software, based on a full solution of electromagnetic equations, was able to predict polarizer behavior with sufficient accuracy to be used for industrial optimization and design purposes. This software was the only one available at that time and was transferred to relevant research institutions and companies in that field (e.g., INTA) for industrial use.\n\nAfter obtaining a position as Associate Professor (Profesor Titular de Universidad) at the University of Malaga in 1994, he focused his research work on interdisciplinary applications of digital signal and image processing, with many collaborations in medical, chemical, biological, and industrial fields. Since 1995, he has been the head of the Andalusian research group “Radiological Image/Digital Processing” (TIC128), with eight post-doctoral researchers in Engineering and Medicine backgrounds.\n\nHe has completed several international research stays: Kurt Rossmann Lab (2000) at the University of Chicago (USA), working on mammography computer-aided diagnosis algorithms; at Institut für Technische Akustik (2011 and 2014) at RWTH Aachen (Germany), working on advanced array processing techniques for the location of acoustic sources; at the University of New South Wales (UNSW@ADFA, 2012, Canberra, Australia), working on digital signal processing applied to bioecology (termites and ants); and on oceanographic research ships (Spanish Institute of Oceanography, IEO, MEDMEDIA campaign, 2015 and 2017), working on acoustics and digital image processing for fisheries research."
  },
  {
    name: "Dr. Mehar Ullah",
    location: "South Karelia, Finland",
    image: "./international_invited_speakers/mehar.jpg",
    topic: "Artificial Intelligence and Security in Federated Learning",
    abstract:
      "Dr. Mehar Ullah is a Postdoctoral Researcher at LUT University in Lappeenranta, Finland, specializing in the integration of the Internet of Things (IoT), edge computing, and big data within cyber-physical systems. His research focuses on enhancing information flow in smart grids and developing frameworks for IoT platform selection applicable to various industrial applications, including carbon fiber recycling and industrial energy management systems. His recent research includes studies on cybersecurity in the hydrogen economy and the development of unified frameworks for IoT platform selection in Power-to-X cogeneration plants.\n\nHe earned his Doctor of Engineering degree from LUT University, where his dissertation focused on the digitalization of various industrial sectors through IoT applications. Dr. Ullah’s expertise encompasses information and communication technology, cloud computing, and information management. He is actively engaged in advancing the role of IoT in cyber-physical systems, aiming to improve efficiency and sustainability across different industries.",
    profile:
      "A dedicated and versatile researcher and IT professional with over 15 years of experience in academia and industry across Finland, Afghanistan, and Pakistan. Currently serving as a Postdoctoral Researcher at LUT University, focusing on electrical engineering, the Internet of Things (IoT), IoT platforms, cyber-physical systems, and the digital transformation of industrial sectors.\n\nHe holds a Master’s degree in Software Engineering from LUT University and has a strong foundation in software development, databases, and IT systems. His teaching background includes a lecturer role at Kardan University, where he was recognized with the Best Lecturer Award in 2010. Earlier in his career, he worked as an MIS Officer in the banking sector, handling responsibilities such as software testing, data consolidation from multiple branches, reporting using Crystal Reports, and maintaining database systems."
  },
  {
    name: "Mr. Fahim Uz Zaman",
    location: "United Kingdom (UK)",
    image: "./international_invited_speakers/fahim.png",
    topic: "Virtual Reality (VR) Gaming Has Emerged as an Important Area of Interactive Entertainment",
    abstract:
      "Virtual Reality (VR) gaming has emerged as an important area of interactive entertainment, with users increasingly engaging through different Head-Mounted Displays (HMDs) across both local and cloud-based platforms. However, the effect of different VR devices on the Quality of Experience (QoE) of gamers remains insufficiently explored. This study investigates the comparative impact of ordinary display systems, normal VR headsets, and Samsung Gear VR powered by Oculus on users’ visual quality, enjoyment, satisfaction, and perceived network performance. A subjective lab-based experiment was conducted with 20 participants using Grand Theft Auto V in two scenarios: emulator-based local gaming and cloud-based gaming through Vortex.gg. The findings show that Oculus-based VR provided the highest QoE in terms of visual quality, enjoyment, and satisfaction, outperforming both normal VR boxes and traditional displays. The study also found that network latency, jitter, and packet loss significantly reduced QoE in cloud gaming compared to emulator-based gameplay. These results highlight that both device quality and network conditions play a decisive role in shaping immersive gaming experiences. The work offers practical insight for VR device manufacturers, game developers, and cloud gaming providers seeking to improve user satisfaction and overall VR gaming performance.",
    profile:
      "Fahim Uz Zaman is a technologist, researcher, educator, and academic leader specializing in DevOps, cloud computing, cybersecurity, artificial intelligence, and software engineering. He serves as an Advanced Technical Lecturer in Web and DevOps Engineering and Programme Leader for the Software Engineering stream at Newcastle College University Centre, UK, where he oversees curriculum design and industry-focused teaching in areas such as Infrastructure as Code, CI/CD, and cloud-native systems. A Gold Medalist with a BS in Computer Science from Sindh Madressatul Islam University, he also holds an MS in Computer Science and an MSc in Cyber Security Management from the University of Law, UK. His research contributions span serverless computing, cloud databases, datacenter reliability, and AI applications, with publications in reputable journals and conferences. He has extensive teaching and training experience, including roles as a Microsoft Certified Trainer, IoT Lead Trainer at PIAIC, and CCNA instructor at Saylani Welfare. Recognized with multiple awards, including HEC Merit Scholarships and an international travel grant, he also holds professional certifications such as Microsoft Certified: Azure AI Engineer Associate and AWS Certified AI Practitioner."
  }
  ];

  const invitedSpeakers = [
    {
      name: "Dr. Waheed Noor",
      location: "Balochistan, Quetta",
      image: "./national_invited_speakers/waheed.jpg",
      topic:
        "From LLMs (Artificial Narrow Intelligence (ANI)) to Artificial General Intelligence: A Road Map to Future of AI",
      abstract:
        "Artificial Intelligence today is dominated by large language models (LLMs) that generate text, write code, generate video/images, and act as autonomous agents. These are impressive capabilities, but they remain fundamentally Artificial Narrow Intelligence (ANI), i.e., powerful pattern recognizers without understanding, grounding, or general-purpose reasoning. The future of AI is to move toward Artificial General Intelligence (AGI) that can learn, adapt, and reason across domains. To achieve this, we need to build a clearer roadmap that is more than “scaling the model bigger.”\n\nIn this keynote, I will outline a practical, research-informed, and industry-grounded road map from today’s ANI-based LLMs to future AGI systems. This includes advancements in reasoning architectures, memory systems, embodied learning, and autonomous decision-making. I will also argue that real progress toward AGI will not emerge from single, monolithic models, but from collective intelligence: networks of specialized agents collaborating, negotiating, and correcting one another closely like human teams, biological systems, and intelligent societies.\n\nI will try to highlight where current systems fail, where they succeed, and which scientific breakthroughs are still required. Finally, I will discuss the ethical, societal, and governance challenges that AGI introduces, and why human-centered design and collective oversight are crucial as AI systems become increasingly autonomous.\n\nThe path from ANI to AGI is not just a technical evolution; it is a shift in how we think about intelligence itself. This keynote offers a grounded, forward-looking roadmap for researchers, practitioners, and policymakers as we prepare for the next era of AI.",
      profile:
        "Dr. Waheed Noor is a distinguished academic leader and tenured Associate Professor with a Ph.D. in Computer Science (Machine Learning) and over 20 years of experience at the intersection of technology and public policy. He has authored 13 impact-factor research publications and successfully secured and led interdisciplinary research projects worth over $1.5 million from international organizations such as the EU, World Bank, and UNDP. An entrepreneurial scientist, he holds an applied patent and has co-founded startups including Gul Technology (Pvt) Ltd and a Smart Water Quality Monitoring Kit initiative. He is also the founding director of six key university centers, demonstrating strong leadership in research commercialization and institutional development. Dr. Noor has trained and mentored more than 500 individuals across 34 districts and empowered hundreds of freelancers and startups through initiatives like DigiSkills, DigiBizz, and NFTP. He has facilitated over 30 global institutional linkages and partnerships with multiple government departments, contributing significantly to innovation ecosystems, SDG-aligned research, and socio-economic development, particularly in Balochistan.",
    },
    {
      name: "Prof Dr. Muazzam Khattak",
      location: "Islamabad, Pakistan",
      image: "./national_invited_speakers/muazzam.webp",
      topic: "Role of Artificial Intelligence in Healthcare",
      abstract:
        "Artificial Intelligence (AI) in healthcare offers transformative opportunities for enhanced diagnostics, personalized treatment, drug discovery, and operational efficiency, while facing challenges regarding data privacy, algorithmic bias, and ethical accountability.\n\nArtificial intelligence is transforming medicine by improving diagnosis accuracy, treatment planning, and healthcare operations. AI-powered advances in personalized medicine and robotic surgery, improve patient outcomes, eliminate human errors, and optimize clinical workflows. Furthermore, AI-powered chatbots, virtual assistants, and predictive analytics improve patient management and early disease identification. Despite its enormous promise, AI in healthcare confronts obstacles such as data protection, algorithmic bias, transparency, and system integration. Ensuring conformity with ethical principles and regulatory standards is critical to its appropriate execution. To overcome these challenges, AI researchers, healthcare practitioners, and legislators must work together to develop fair, transparent, and secure AI models. Precision medicine, robotic-assisted treatment, wearable health monitoring, and global healthcare accessibility will all benefit from AI in the future. With continued improvements and ethical considerations, AI is poised to reshape current healthcare, making it more efficient, personalized, and accessible globally.",
      profile:
        "Prof. Dr. Muazzam A. Khan Khattak (SM IEEE, AAAI, Member Pakistan Academy of Sciences) is a highly distinguished academic and researcher, ranked among the world’s top 2% most cited scientists in 2024 and 2025 and a recipient of the Pakistan Academy of Sciences–COMSTECH Gold Medal 2025. He currently serves as Director of the Farabi Center for Artificial Intelligence and Cyber Security and holds multiple leadership roles at Quaid-i-Azam University, Islamabad, including Director Science & Technology and ICESCO Chair in Data Analytics and Edge Computing, while also chairing the UNESCO National IFAP Committee and serving on the NADRA Authority Board. With a PhD jointly from IIUI and the University of Missouri (UMKC), USA, and a postdoctoral background from UMKC, he has over 230 publications, 3 books, and 16 book chapters, with more than 6,650 citations and an h-index of 45. His research focuses on AI-driven solutions in IoT, IoVs, IIoT, smart cities, and information security. He has secured research funding exceeding Rs. 1.7 billion and holds adjunct and advisory roles in leading international universities across Türkiye, Azerbaijan, China, Kazakhstan, and the USA. Widely recognized for his contributions, he has received multiple national and institutional awards, including nomination for the prestigious Tamgha-e-Imtiaz in 2024.",
    },
    {
      name: "Prof. Dr. S. M. Aqil Burney",
      location: "Karachi, Pakistan",
      image: "./national_invited_speakers/burney.png",
      topic:
        "Multi Criteria Decision Making (MCDM) Methods and its applications",
      abstract:
        "This work deals with multi criteria decision making (MCDM) methods and applications in textile industry with review of related work and some published work of the author with coauthors. Fundamentals are discussed using some important survey papers which are linked in the presentation Decision systems explained for decision making and eight important aspects are discussed. DSS tools are discussed and type of DSS are explained and material related is discussed and helpful in applications in Renewable Energy and water supply resources planning. work in progress.",
      profile:
        "Prof. Dr. S. M. Aqil Burney is a distinguished academician, researcher, and educationist, widely recognized for his significant contributions to the fields of computer science, data science, and artificial intelligence. With an extensive career spanning several decades, he has played a pivotal role in advancing higher education and research in Pakistan. He has served in key academic and administrative positions, including as Vice Chancellor of the University of Karachi, and has been actively involved in curriculum development, research supervision, and institutional leadership. Dr. Burney has authored numerous research publications in reputable national and international journals, particularly in areas such as data mining, soft computing, and decision support systems. His dedication to academic excellence, innovation, and capacity building has earned him a respected position in the academic community.",
    },
    {
    name: "Dr. Salman Ahmed",
    location: "Topi, Pakistan",
    image: "./national_invited_speakers/salman.jpg",
    topic: "AI from Islamic Perspective",
    abstract:
      "Artificial Intelligence (AI) is the simulation of human intelligence by machines, involving learning, reasoning, and self-correction. Its applications include natural language processing, robotics, predictive analytics, and autonomous systems. Understanding AI helps explore how Islamic principles can guide its ethical use. Islam encourages knowledge and innovation as long as they align with moral values. The Quran and Hadith emphasize using knowledge for the benefit of humanity, a principle reflected in the scientific advancements of the Islamic Golden Age. In modern contexts, AI is supported when it promotes justice, welfare, and public good such as in healthcare but discouraged if it causes harm or exploitation. The concept of Maslahah (public interest) guides this approach, highlighting Islam’s compatibility with responsible technological progress. In this interesting talk, I will talk about some concepts from Islam and some from AI literature and link them together.",
    profile:
      "Dr. Salman Ahmed is an Associate Professor at the Faculty of Computer Science and Engineering (FCSE) at GIKI, with a strong academic background that includes a BSc from UET Peshawar (2005), an MSc from Universiti Teknologi Petronas, Malaysia (2007), and a PhD from the University of Alberta, Canada (2013). Prior to his current role, he served as Director of the IoT Cyber Security Lab at the National Center for Cyber Security. His research focuses on cybersecurity, IoT systems, multi-agent systems, and control systems. Dr. Ahmed has received numerous prestigious awards, including the University Gold Medal, Provost Doctoral Award, and Chancellor Emeritus Scholarship, and has led significant research initiatives such as the Rs. 40.5 million Secured IoT Devices (SID) Project. He has collaborated with national and international organizations, including the Malaysian Ministry of Science and Technology and NSERC Canada, and has actively contributed to academic governance through roles in the Syndicate of UET Peshawar, the Governing Council of GIKI, and as President of the IEEE Peshawar Subsection."
  },
  {
    name: "Dr. Shoab Ahmed Khan",
    location: "Islamabad, Pakistan",
    image: "./national_invited_speakers/shoaib.jpg",
    topic: "Silicon and Steel: An Impartial Technical Analysis of Artificial Intelligence and Emerging Disruptive Technologies in Current Global Conflicts",
    abstract:
      "The global security order is fragmenting at an accelerating pace, and Emerging and Disruptive Technologies (EDTs) are the primary accelerant. Two concurrent conflicts: The Russia-Ukraine war (2022–present) and the US-Israel military campaign against Iran (2026–present), together constitute the most comprehensive live deployment of EDT-enabled warfare in recorded history. For the first time, every technology domain on the EDT landscape has been simultaneously activated in peer and near-peer conflict: artificial intelligence and agentic systems, autonomous drone swarms, generative AI disinformation, cyberattacks on commercial cloud infrastructure, space-based ISR and anti-satellite operations, electronic warfare, and the weaponisation of financial technology. This talk presents an impartial technical analysis of EDT deployment across both conflicts, examining the strategies, systems, and outcomes on all sides without political bias. It draws on open-source intelligence, confirmed operational data, and published technical documentation to assess what each technology achieved, where it failed, and what the evidence reveals about the limits of EDT superiority as a substitute for political resolution. The talk concludes by translating these findings into a practical research agenda for engineers an asd scientists in Pakistan, identifying the specific EDT domains like autonomous systems, cyber physical systems, cybersecurity, and sovereign digital infrastructure and AI stack, where focused Pakistani research can make the most direct contribution to national security.",
    profile:
      "Chancellor Sir Syed CASE Institute of Technology, Islamabad, Pakistan. CEO Center for Advanced Research in Engineering (CARE), Former Chairman Pasha, Member NCEAC, Member BoG VU, Former Board Member Shifa International Hospital."
  },
  {
    name: "Prof. Dr. Shehnila Zardari",
    location: "Karachi, Pakistan",
    image: "./national_invited_speakers/shehnila.png",
    topic: "Navigating Trust in Industry 4.0 and 5.0: Challenges, Fragilities, and the Path Forward",
    abstract:
      "In this talk, I explore how trust is both a critical enabler and a major vulnerability in the evolving landscapes of Industry 4.0 and Industry 5.0. As digital systems become more intelligent and interconnected—driven by Artificial Intelligence, the Internet of Things, and Blockchain—trust is no longer optional; it is foundational. However, we are also witnessing the rise of deepfakes, cybersecurity threats, and opaque algorithms—factors that deeply undermine our confidence in machines, data, and even each other. This presentation is based on a systematic review of 40 studies, from which six key themes have emerged, including the role of trust in digital transformation, human–machine collaboration, and the educational shifts needed to build resilient, trustworthy ecosystems. I will also highlight specific points where trust tends to break down—such as chatbot failures, false online reviews, and digital payment systems—and propose practical solutions. These include explainable AI, multi-level trust evaluation frameworks, and targeted workforce training. Finally, while Industry 4.0 is actively unfolding, Industry 5.0 is still in its early stages—creating exciting opportunities for research and roadmap validation. This talk aims to spark discussion on how we can reimagine trust not just as a technical issue, but as a social and strategic imperative in the digital age.",
    profile:
      "Dr. Shehnila Zardari is an academic and a researcher. She is currently working as a Professor at the NED University of Engineering and Technology, Karachi. She is also the Chairperson of the Department of Software Engineering at NED University of Engineering and Technology. She has numerous publications in reputed journals and conferences. Her research interests include software engineering, big data, artificial intelligence, the Internet of Things (IoT), and blockchain. In 2022, she was awarded the Academic Excellence Award by the Sindh Higher Education Commission. In 2020, she received the prestigious Mohtarma Fatima Jinnah and Shaheed Benazir Bhutto Award from the Sindh Commission on the Status of Women. She also received the “Best Teacher Award” from the NED Alumni Association of Southern California for the year 2023. She is a reviewer for several journals and serves on the program committee of various distinguished conferences. Additionally, she has been a keynote speaker at several conferences, promoting research in the field of software engineering."
  },
  {
    name: "Engr. Zaka Ul Haque",
    location: "Karachi, Pakistan",
    image: "./national_invited_speakers/zaka.jpg",
    topic: "Responsible AI in Banking: Building Governance Frameworks for an Intelligent Financial Ecosystem",
    abstract:
      "This presentation examines the emerging imperative for Responsible AI governance within financial institutions, drawing on firsthand experience deploying large language models, robotic process automation, and intelligent document processing systems inside one of Pakistan's largest banks. Unlike theoretical frameworks, the discussion is grounded in real-world constraints: on-premises data residency requirements mandated by the State Bank of Pakistan, legacy core banking integrations, and the challenge of balancing innovation velocity against enterprise risk management. The session presents a practical, layered AI Governance Policy architecture covering model risk, data privacy, access control, and audit trail requirements. Key topics include the design of an AI Control Plane as a unified gateway for all AI interactions, the role of human-in-the-loop workflows in high-stakes financial decisions, and Shariah-compliance considerations for AI-generated recommendations in Islamic banking contexts. The presentation also addresses the talent gap challenge in Pakistan's financial sector, including strategies for building internal AI engineering capability through structured training and apprenticeship programmes. The session concludes with a proposed maturity model for AI transformation in South Asian banking, covering the journey from attended automation to fully agentic AI workflows, and the governance checkpoints required at each stage. Attendees will leave with actionable insights on establishing AI ethics committees, managing model lifecycle governance, and engaging effectively with regulators on responsible innovation.",
    profile:
      "Engr. Zaka Ul Haque is a senior technology leader with over 15 years of experience spanning fintech consulting, payment systems, and enterprise AI transformation. Currently serving as Head of AI, Automation and Platform Banking at Habib Bank Limited (HBL) at the Deputy General Manager grade, he leads a multidisciplinary team responsible for robotic process automation, generative AI deployment, intelligent document processing, and platform banking initiatives across Pakistan's largest private sector bank. Under his leadership, HBL has built an on-premises generative AI infrastructure, scaled enterprise-wide intelligent automation operations, and established a comprehensive AI Governance Policy aligned with State Bank of Pakistan guidelines. His work spans the full AI spectrum, from multi-agent agentic workflows and retrieval-augmented generation systems to document intelligence for trade finance and KYC processes. He is HBL's nominated Point of Contact for the SBP Innovation Hub and serves on the Advisory Board of the Institute of Business Management (IoBM). Prior to HBL, Zaka built an extensive consultancy career advising banks and fintech companies across the Middle East and South Asia on digital transformation, payment systems modernization, open banking enablement, and regulatory technology. He held senior roles at VeriPark Asia, VentureDive, Infobip, and TPS Pakistan, where he led strategic engagements with financial institutions on channel banking, switching infrastructure, and enterprise software implementation. He has also contributed to SBP's Open Banking framework development and represented the financial sector at national fintech policy forums."
  },
  {
    name: "Prof. Dr. Sajjad Ahmad Madani",
    location: "Islamabad, Pakistan",
    image: "./national_invited_speakers/sajjad.png",
    topic: "Navigating Trust in Industry 4.0 and 5.0: Challenges, Fragilities, and the Path Forward",
    abstract:
      "In this talk, I explore how trust is both a critical enabler and a major vulnerability in the evolving landscapes of Industry 4.0 and Industry 5.0. As digital systems become more intelligent and interconnected driven by Artificial Intelligence, the Internet of Things, and Blockchain trust is no longer optional; it is foundational. However, we are also witnessing the rise of deepfakes, cybersecurity threats, and opaque algorithms factors that deeply undermine our confidence in machines, data, and even each other. This presentation is based on a systematic review of 40 studies, from which six key themes have emerged, including the role of trust in digital transformation, human–machine collaboration, and the educational shifts needed to build resilient, trustworthy ecosystems. I will also highlight specific points where trust tends to break down such as chatbot failures, false online reviews, and digital payment systems and propose practical solutions. These include explainable AI, multi-level trust evaluation frameworks, and targeted workforce training. Finally, while Industry 4.0 is actively unfolding, Industry 5.0 is still in its early stages—creating exciting opportunities for research and roadmap validation. This talk aims to spark discussion on how we can reimagine trust not just as a technical issue, but as a social and strategic imperative in the digital age.",
    profile:
      "Prof. Dr. Sajjad Ahmad Madani is a senior academic leader at COMSATS University Islamabad with over 20 years of experience. He has led 3 institutional reforms and pioneered digital and AI-enabled education. An IEEE senior member, he has authored 100+ research publications. His work focuses on Generative AI, ethics, and the future of higher education."
  }
  ];

  const organizingCommittee = [
    {
      name: "Prof Dr Khalid Mahmood Iraqi",
      location: "Patron in Chief",
      image: "./organizing_committee/khalid.jpeg",
    },
    {
      name: "Prof. Dr. Muhammad Afzal Haq",
      location: "Patron",
      image: "./organizing_committee/afzaal.webp",
    },
    {
      name: "Dr M Sadiq Ali Khan",
      location: "Chair (Chairman Dept of CS, UoK)",
      image: "./organizing_committee/sadiq.jpeg",
    },
    {
      name: "Prof. Dr. Bilquees Gul",
      location: "Co-Chair (Dean Faculty of Science, UoK)",
      image: "./organizing_committee/bilquees.jpeg",
    },
    {
      name: "Prof. Dr. Muhammad Aamir",
      location: "Co-Chair (Dean ECE, SSUET)",
      image: "./organizing_committee/aamir.jpeg",
    },
    {
      name: "Prof. Dr. Muhammad Shahab Siddiqui",
      location:
        "Co-Chair (Chair, IEEE Karachi Computer Society Chapter,Chairperson, Department of Computing, Indus University)",
      image: "./organizing_committee/shahab.jpg",
    },
    {
      name: "Engr. Muhammad Zakir Shaikh",
      location: "Secretary (Director NCRA Lab, Mehran University)",
      image: "./organizing_committee/zakir.jpeg",
    },
    {
      name: "Engr. Dur-e-Shawar Agha",
      location: "Co-Secretary",
      image: "./organizing_committee/shawar.webp",
    },
    {
      name: "Engr. Dr. Muhammad Naseem",
      location: "Chair Program Committee",
      image: "./organizing_committee/naseem.webp",
    },
    {
      name: "Engr. Dr. Kashif Shaikh",
      location: "Chair Program Committee",
      image: "./organizing_committee/kashif.webp",
    },
    {
      name: "Prof Dr. Bhawany Shankar Choudhary",
      location: "Chair TPC",
      image: "./organizing_committee/bawaney.jpeg",
    },
    {
      name: "Engr. Dr. Huma Jamshed",
      location: "Co-Chair TPC",
      image: "./organizing_committee/huma.png",
    },
    {
      name: "Dr. Bagwandas",
      location: "Chair Review Committee",
      image: "./international_invited_speakers/bhagwan.jpeg",
    },
    {
      name: "Engr. Dr. Farheen Qazi",
      location: "Co-Chair Review Committee",
      image: "./organizing_committee/farheen.webp",
    },
    {
      name: "Engr. Priha Bhatti",
      location: "Chair Registration Committee",
      image: "./organizing_committee/priha.webp",
    },
    {
      name: "Engr. Noman Ali Khan",
      location: "Co-Chair Registration Committee",
      image: "./organizing_committee/noman.webp",
    },
    {
      name: "Engr. Hassan Zaki",
      location: "Hospitality & Protocol Coordinator",
      image: "./organizing_committee/zaki.webp",
    },
    {
      name: "Engr. Tauseef Mubeen",
      location: "Website & IT Coordinator",
      image: "./organizing_committee/tauseef.webp",
    },
    {
      name: "Engr. Osama Ahmed Siddiqui",
      location: "Logistics Coordinator",
      image: "./organizing_committee/osama.jpeg",
    },
    {
      name: "Engr. Bari Ahmed Khan",
      location: "Co-Logistics Coordinator",
      image: "./organizing_committee/bari.jpeg",
    },
    {
      name: "Mr. Zaeem Tariq",
      location: "Co-Logistics Coordinator",
      image: "./organizing_committee/zaeem.jpeg",
    },
    {
      name: "Dr. Urooj Waheed",
      location: "Sponsorship Coordinator",
      image: "./organizing_committee/Dr. Urooj Waheed.jpg",
    },
    {
      name: "Engr. Ayesha Urooj",
      location: "Co-Sponsorship Coordinator ",
      image: "./organizing_committee/Engr. Ayesha Urooj.jpg",
    },
    {
      name: "Engr. Fayyaz Ali",
      location: "Marketing & PR Coordinator",
      image: "./organizing_committee/fayyaz.jpeg",
    },
    {
      name: "Engr. Sonish Aslam / Dr. Humaira Azam",
      location: "Volunteers Coordinator",
      image: "./organizing_committee/sonish.webp",
    },
    {
      name: "Dr. Muzammil Ahmed Khan",
      location: "Member",
      image: "./organizing_committee/muzammil.webp",
    },
    {
      name: "Dr. Waleej Haider",
      location: "Member",
      image: "./organizing_committee/waleej.jpeg",
    },
    {
      name: "Dr. Nadeem Mahmood",
      location: "Member",
      image: "./organizing_committee/nadeem.png",
    },
    {
      name: "Mr. Badar Sami",
      location: "Member",
      image: "./organizing_committee/badar.jpeg",
    },
    {
      name: "Mr. Syed Jamal Hussain",
      location: "Member",
      image: "./organizing_committee/jamal.jpg",
    },
    {
      name: "Dr. Muhammad Saeed",
      location: "Member",
      image: "./organizing_committee/saeed.jpeg",
    },
    {
      name: "Mr. Hussain Saleem",
      location: "Member",
      image: "./organizing_committee/hussain.jpeg",
    },
    {
      name: "Dr. S. M. Khalid Jamal",
      location: "Member",
      image: "./organizing_committee/khalid.jpg",
    },
    {
      name: "Dr. Syed Asim Ali",
      location: "Member",
      image: "./organizing_committee/asim.jpeg",
    },
    {
      name: "Dr. Farhan Ahmed Siddiqui",
      location: "Member",
      image: "./organizing_committee/farhaan.jpeg",
    },
    {
      name: "Dr. Humera Tariq",
      location: "Member",
      image: "./organizing_committee/humera.jpg",
    },
    {
      name: "Mr. Mukesh Kumar Rathi Maheshwari",
      location: "Member",
      image: "./organizing_committee/",
    },
    {
      name: "Dr. Shaista Rais",
      location: "Member",
      image: "./organizing_committee/shaista.jpeg",
    },
    {
      name: "Ms. Madiha Khurram",
      location: "Member",
      image: "./organizing_committee/madiha.jpeg",
    },
    {
      name: "Ms. Maryam Feroz",
      location: "Member",
      image: "./organizing_committee/maryam.jpeg",
    },
    {
      name: "Dr. Fozia Hanif Khan",
      location: "Member",
      image: "./organizing_committee/Dr. Fozia Hanif Khan.jpg",
    },
    {
      name: "Dr. Muhammad Ayaz",
      location: "Member",
      image: "./organizing_committee/Dr. Muhammad Ayaz.jpg",
    },
    {
      name: "Prof. Dr. Najeeb Alam Khan",
      location: "Member",
      image: "./organizing_committee/Prof. Dr. Najeeb Alam Khan.jpg",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto text-center font-poppins px-6 py-20 md:py-24">
        {/* KEYNOTE SPEAKERS */}
        <h2
          id="keynoteSpeakers"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Keynote Speaker
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {keynoteSpeakers.map((speaker, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center justify-between"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-4 border-[#447E36] overflow-hidden mb-4 shadow-inner">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {speaker.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 text-center">
                  ({speaker.location})
                </p>
                <p className="text-sm font-semibold text-[#521028] mb-5 text-center line-clamp-2">
                  {speaker.topic}
                </p>
              </div>
              <motion.button
                className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md w-full"
                whileHover={{ scale: 1.05, backgroundColor: "#2d9a40" }}
                onClick={() => setSelectedSpeaker(speaker)}
              >
                Read More
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* INVITED SPEAKERS */}
        <h2
          id="invitedSpeakers"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Invited Speaker
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {invitedSpeakers.map((speaker, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center justify-between"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-4 border-[#447E36] overflow-hidden mb-4 shadow-inner">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {speaker.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 text-center">
                  ({speaker.location})
                </p>
                <p className="text-sm font-semibold text-[#521028] mb-5 text-center line-clamp-2">
                  {speaker.topic}
                </p>
              </div>
              <motion.button
                className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md w-full"
                whileHover={{ scale: 1.05, backgroundColor: "#2d9a40" }}
                onClick={() => setSelectedSpeaker(speaker)}
              >
                Read More
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ORGANIZING COMMITTEE */}
        <h2
          id="organizingCommittee"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Organizing committee
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {organizingCommittee.map((speaker, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-40 h-40 rounded-full border-4 border-[#447E36] overflow-hidden mb-4 shadow-inner">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-gray-600 mb-5 text-center">
                ({speaker.location})
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <img src="./sample-img.png" alt="Sample" />
        </div>
      </div>

      {/* MODAL SECTION */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm font-poppins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpeaker(null)} // Close modal when clicking outside
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-6 md:p-10"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent bubbling up to close overlay
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
                onClick={() => setSelectedSpeaker(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-lg border-4 border-[#447E36] overflow-hidden shadow-md mx-auto md:mx-0">
                  <img
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium mb-4">
                    {selectedSpeaker.location}
                  </p>
                  <p className="text-md md:text-lg font-bold text-[#521028] bg-rose-50 p-3 rounded-lg border border-rose-100">
                    Topic: {selectedSpeaker.topic}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-gray-100 pb-2">
                    Abstract
                  </h4>
                  <p>{selectedSpeaker.abstract}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-gray-100 pb-2">
                    Profile
                  </h4>
                  <p>{selectedSpeaker.profile}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Speakers;
