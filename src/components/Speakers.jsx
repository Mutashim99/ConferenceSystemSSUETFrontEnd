import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Speakers = ({ id }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const keynoteSpeakers = [
    {
      name: "Ms. Marry Ellan Randall",
      location: "2026 IEEE President & CEO",
      image: "./international_invited_speakers/mary.jpeg",
      topic: "",
      abstract: "",
      profile: "",
    },

    {
      name: "Grace Lewis",
      location: "2026 IEEE Computer Society President",
      image: "./international_invited_speakers/grace.jpeg",
      topic: "",
      abstract: "",
      profile: "",
    },

    {
      name: "Prof. Dr. Atta-ur-Rahman",
      location:
        "International Center for Chemical and Biological Sciences, University of Karachi",
      image: "./international_invited_speakers/attah.jpeg",
      topic: "Science and Technology: Engines for Socio-Economic Development",
      abstract:
        "The transformation made by Pakistan towards a technology-driven knowledge economy during 2000-2008 when I was Federal Minister of Science and Technology/IT and Telecom and later Chairman Higher Education Commission (HEC) has been described as a model for other developing countries by the Royal Society (London) in a book entitled “A New Golden Age ?”. The first IT Policy was approved by the Cabinet in 2001 under my stewardship. The mobile telephony underwent an explosive growth after we introduced the “Calling Party Pays” regime, increasing from 0.2 million in 2001 to over 200 million now. Bandwidth costs were reduced sharply from $ 87,000 per month for a 2MB line to only a few hundred dollars per month. The 15 year tax holiday given to the IT industry led to a huge growth in IT exports.\n\nThe focus of the reforms under my stewardship was to improve the quality of higher education and research, provide greater access to higher education, and provide education relevant to national needs and international demands. The establishment of the Pakistan Education and Research Network (PERN) in 2004 brought a revolution by providing free access of 65,000 textbooks and 25,000 international journals to students, teachers and researchers. Thousands of our brightest students were selected and sent abroad for training at PhD and post-doctoral levels to leading universities of the world in USA, UK, Germany, France, Sweden, Australia and Austria. The world’s largest Fulbright program was initiated with 50% of the funds being invested by Pakistan. Pakistan was about 400% behind India in research output on a per capita basis in the year 2000, but as a result of these reforms that I introduced, we overtook India in 2017 and were about 15% ahead of India by 2018. The rapid progress made by Pakistan set off alarm bells in India. The Indian Prime Minister was given a formal presentation regarding the programmes that I had launched as Chairman HEC. This was reported on 22nd July 2006 in India’s main English newspaper Hindustan Times on 23rd July 2006 (article headed “Pak Threat to Indian Science” by Neha Mehta). Neutral international observers have praised these programmes and a book has been published by the US expert Prof. Fred Hayward (“Fostering Institutional Development and Vital Change in Asia and Africa”, Palgrave MacMillan) describing these reforms.\n\nMore recently an entrepreneurial university, Pak Austrian Fachhochschule, has been established under my leadership in collaboration with 21 foreign universities and a number of AI centers established. Some of these initiatives as well as the stunning developments in artificial intelligence, quantum computing, and other disruptive innovations will be described",
      profile:
        "Prof. Atta-ur-Rahman obtained his Ph.D. in Organic Chemistry from King’s College, University of Cambridge in 1968 and is one of the most distinguished scientists in the field of organic chemistry. He has over 1600 international publications, including numerous research papers, books, book chapters, and patents, with an h-index of 84 and more than 44,000 citations. He received the prestigious Doctor of Science (ScD) from the University of Cambridge in 1987 and was elected Fellow of the Royal Society (London) in 2006, becoming the first scientist from the Islamic world to receive this honor based on research conducted within an Islamic country. Over the years, he has received many international awards and honorary doctorates from leading universities worldwide and has served in key scientific leadership roles, including Vice President of the World Academy of Sciences and Coordinator General of COMSTECH. A highly decorated scientist of Pakistan, he has received the country’s highest civil awards and served as Federal Minister for Science and Technology and Founding Chairman of the Higher Education Commission. He is currently Professor Emeritus at the International Center for Chemical and Biological Sciences, University of Karachi, a UNESCO Center of Excellence.",
    },

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
      name: "Prof. Dr. Enrique Nava",
      location: "Malaga, Spain",
      image: "./international_invited_speakers/enrique.jpg",
      topic: "Developing applications with 3D depth digital image processing",
      abstract:
        "3D digital image processing techniques are now routinely used in many applications such as medical imaging, environmental assessment, remote sensing, etc. In this paper, we will present some new trends involving the use of new technology depth cameras with a very broad range of applications, including gesture recognition and hand tracking, 3D modeling, metaverse, underwater video processing, and hyperspectral remote sensing. Using 3D depth cameras, we obtain sparse point cloud data, which imposes some new research challenges for building new applications. The aim of this talk is to present some basic and new ideas to inspire research in this area, as well as to present actual research projects in this field.",
      profile:
        "Prof. Dr. Enrique Nava finished his PhD thesis under the supervision of Prof. J.M. Rebollar on the design of circular waveguide polarizer devices on microwaves/millimeter waves to be used in communication satellite antennas. As a result, a newly developed computer software, based on a full solution of electromagnetic equations, was able to predict polarizer behavior with sufficient accuracy to be used for industrial optimization and design purposes. This software was the only one available at that time and was transferred to relevant research institutions and companies in that field (e.g., INTA) for industrial use.\n\nAfter obtaining a position as Associate Professor (Profesor Titular de Universidad) at the University of Malaga in 1994, he focused his research work on interdisciplinary applications of digital signal and image processing, with many collaborations in medical, chemical, biological, and industrial fields. Since 1995, he has been the head of the Andalusian research group “Radiological Image/Digital Processing” (TIC128), with eight post-doctoral researchers in Engineering and Medicine backgrounds.\n\nHe has completed several international research stays: Kurt Rossmann Lab (2000) at the University of Chicago (USA), working on mammography computer-aided diagnosis algorithms; at Institut für Technische Akustik (2011 and 2014) at RWTH Aachen (Germany), working on advanced array processing techniques for the location of acoustic sources; at the University of New South Wales (UNSW@ADFA, 2012, Canberra, Australia), working on digital signal processing applied to bioecology (termites and ants); and on oceanographic research ships (Spanish Institute of Oceanography, IEO, MEDMEDIA campaign, 2015 and 2017), working on acoustics and digital image processing for fisheries research.",
    },
    {
      name: "Mohamed Rawidean Mohd Kassim",
      location: "Chair, IEEE CS GAC",
      image: "./international_invited_speakers/rawidean.jpeg",
      topic: "Smart Farming: Agricultural Transformation using IoT, WSN and AI",
      abstract:
        "Agriculture is one of the most important sectors that play a strategic role in ensuring food security. However, with the increasing world's population, estimated 10 billion by 2050, agri-food demands are growing thus there is an urgent need to switch from traditional agricultural methods to smart agriculture practices. Wireless Sensor Networks (WSN), Cloud Computing, Artificial Intelligence and their convergence with the Internet of Things (IoT) offer vast opportunities to build decision support systems to solvemany real-world problems including smart farming. Agricultural transformation has become an important field that help farmers to use latest and proven technologies to improve the yield and provides real-time system and control communication with the physical world. A smart farming system can collect and process large amount of data which helps to manage air quality, soil conditions and weather prediction.",
      profile:
        'Mohamed Rawidean Mohd Kassim has worked for 35 years in MIMOS (Malaysian Institute of Microelectronic Systems), the Ministry of Science, Technology and Innovation Malaysia. MIMOS is the government research and industrial R&D arm in IT and microelectronics. He joined MIMOS as a research fellow and now is the R&D Manager in the Technology Deployment Department.\n\nHis research interests include Wireless Sensor Networks (WSN), Internet of Things (IoT), Real-Time Systems and Multimedia. He has participated in more than 30 national and international R&D projects as a team member or leader in technical and management positions.\n\nMohamed Rawidean is an IEEE Senior Member and is the Regional Coordinator, Region 10, IEEE Computer Society. He was the IEEE Computer Society Malaysia Chapter Chair from 2002 to 2013. As a lecturer, he has given computer science courses for undergraduate and graduate students.\n\nHe has written conference papers, one book chapter ("Sensors for Everyday Life", Springer, 2017), and several technical reports. He is also a member of the Industry Advisory Panel (IAP) for Monash University Malaysia and Universiti Kuala Lumpur (UniKL).\n\nMohamed Rawidean has organized IEEE national and international conferences, seminars and workshops. He is the Founding Chairman for IEEE International Conference on Open Systems (ICOS) and has served as Program Chair and Technical Chair for several IEEE conferences.\n\nHe has delivered many keynote speeches, invited talks and workshops in Wireless Sensor Networks, Intelligent Real-Time Systems and IoT. He holds eight patents, mostly in wireless sensors, networks and sensor applications.\n\nHe received his B.Sc. (Hons) degree in Computer Sciences (1987) from the National University of Malaysia, and his M.Sc. in Interacting Systems Design (1993) from Loughborough University of Technology, United Kingdom. He obtained his Six Sigma Black Belt in 2009 from Motorola University.',
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
      name: "Prof. Dr. Haji Zulkifly Baharom",
      location: "Malaysia ",
      image: "./international_invited_speakers/zul.jpeg",
      topic:
        "Sharing of Experience on HR's value case study that People-focused companies are Four times more likely to outperform peers!",
      abstract:
        "In an era of AI and economic pressure, with heightened demands for productivity and profit, it's a challenge that shows little sign of abating. The question is no longer about whether HR adds value in principle - 'Our people are our most important asset' is ingrained in most CEO handbooks now - but how convincingly it can demonstrate that value in practice. Evidently, in my 50 years of experience working with several MNCs and government linked companies is on the HR side. According to my case study review on the impact of HR management, business records \"have consistently found that HR practices are positively associated with in-role, extra role & general performance, financial performance, operational and market performance for corporate productivity and sustainable employee wellbeing.\"",
      profile:
        "Prof. Dr. Hj Zul is an internationally recognized leader in human resource management and leadership development, honored with prestigious awards including the Gusi Peace Prize International Laureate (2022), AIM Alumni Achievement Award (2020), MIHRM Lifelong Achievement Award (2019), Asia HRD Award (2015), and World Corporate Universities Educational Leadership Award (2014). He is the Founding CEO of Sejahtera Leadership Initiative (SLI) and Global Sejahtera, established in 2018 to support sustainable and diversity-driven initiatives aligned with global goals. With over five decades of experience, he has worked across multinational corporations, government-linked companies such as PETRONAS and Malaysia Airlines, private sector organizations, and professional bodies. He currently serves as Chairman of Myaerosatu Aerospace Association Malaysia, Board Member and Adjunct Professor at the International University of Entreprenology, WUSME Ambassador in Malaysia, and Professor of Practice in HR Management and Leadership at various institutions. He holds a BSc (Hons) in Industrial/Organizational Psychology from the University of New South Wales, a Master’s in Management from AIM Manila, and a PhD in Entrepreneurial Leadership Competencies, along with being a Chartered Fellow of the Chartered Institute of Personnel Management, UK.",
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
      name: "Prof. Dr Nor Azura Md Ghani",
      location: "Universiti Teknologi MARA, Malaysia.",
      image: "./international_invited_speakers/nor.jpeg",
      topic:
        "Unlocking Research Productivity through Visualizations and Predictive Analytics",
      abstract:
        "In an era driven by information, data serves as the essential bridge between assumptions and evidence, underpinning advancements in science, education, and public policy. Excellent research necessitates a deep understanding of not only what data to collect, but how to analyze and present it effectively to tell a compelling story. This talk address a comprehensive journey from foundational data visualization to advanced predictive modelling. The session utilizes a robust case study on research productivity, analyzing a dataset of 9,014 samples across 25 variables. It explores how traditional research paradigms are being enhanced by the ability to manage and analyze massive data points. Furthermore, the session delves into predictive modelling techniques, specifically comparing Artificial Neural Networks (ANN) and Logistic Regression. To optimize these models, the efficacy of variable selection procedures, notably Chi-Square Statistics and the Relief algorithm were examined in this research. Key findings from the comparative evaluation highlight that integrating Relief variable selection with Logistic Regression yields an exceptional predictive accuracy of 99.11%, a sensitivity of 98.47%, and a precision of 99.59%, which means that only a very small proportion of productive staff are misclassified as non-productive. This optimized approach successfully identifies important factors contributing to the research productivity, such as Highest Education Level, Cluster (Science and Technology/Non-Science and Technology), and Current Position. By comparing these techniques, it offers a definitive guide for researchers and institutions looking to enhance data accuracy and implement strategies that drive higher academic output.",
      profile:
        "Nor Azura Md. Ghani is a Professor at the School of Mathematical Sciences, College of Computing, Informatics and Mathematics, Universiti Teknologi MARA, Malaysia, and Former Chair IEEE Computer Society Malaysia Chapter. She serves as Director at the Research Management Center, Universiti Teknologi MARA, Malaysia. Her expertise is in big data, image processing, artificial neural networks, statistical pattern recognition, and forensic statistics. She successfully secured national and international research grants and is also the author or co-author of many journals and conference proceedings at national and international levels. She can be contacted at email: azural-58@uitm.edu.my",
    },

    {
      name: "Dr Bhagwan Das",
      location: "Torrens University, Australia.",
      image: "./international_invited_speakers/bhagwan2.jpeg",
      topic:
        "AI Sovereignty: Architecting Strategic Autonomy in the Age of Intelligent Systems",
      abstract:
        "Artificial intelligence has transitioned from an enabling technology to a foundational layer of economic power, national security, and institutional decision making. In this context, AI sovereignty emerges as a critical strategic objective, referring to the capacity of nations and enterprises to control, govern, and sustain their own intelligence infrastructure across data, compute, and models. This keynote examines AI sovereignty not as a policy aspiration, but as a system level design challenge that spans technological, geopolitical, and industrial domains. The discussion introduces a structured perspective on AI sovereignty through a multi-layer framework encompassing data sovereignty, compute sovereignty, and model sovereignty, extended by governance and decision autonomy. It analyzes how dependencies on external cloud providers, semiconductor supply chains, and proprietary foundation models create systemic vulnerabilities, including loss of control over data flows, exposure to algorithmic influence, and constrained innovation pathways.\n\nBuilding on this, the keynote presents the concept of a sovereign AI stack, integrating resilient infrastructure, federated data ecosystems, trusted execution environments, and controllable model pipelines. Particular emphasis is placed on emerging paradigms such as federated learning, edge intelligence, and non-terrestrial network integration, which enable distributed yet coordinated intelligence while preserving sovereignty boundaries. The session further explores the tension between openness and control, highlighting the need for hybrid strategies that combine open ecosystems with enforceable governance frameworks.\n\nThrough selected global case patterns and strategic initiatives, it outlines how different actors are approaching sovereign AI capabilities under varying regulatory and geopolitical constraints.\n\nThe keynote concludes with a set of design principles and strategic imperatives for achieving sustainable AI sovereignty, emphasizing investment in sovereign compute, secure data architectures, and co development of foundation models. Ultimately, it argues that control over the intelligence stack will define competitive advantage and geopolitical influence in the coming decades, making AI sovereignty a central pillar of future digital and industrial strategy.",
      profile:
        "Dr. Bhagwan Das is currently serving as a full-time staff member at Torrens University, Australia. He has experience of more than 16 in industry, R&D, consultancy and academia and part of several of technical start-ups as consultant. He is a Chartered Engineer and a Fellow Member of Engineers Australia, as well as a Member of the ITEE College Board Victoria, Australia. Dr. Das has made contributions to research and innovation, securing one patent and eight copyrights. He is the recipient of several prestigious awards, including the Best Man Inventor 2016 award from the International Federation of Inventors Associations (IFIA), Geneva, Switzerland, the Commercial Award from Universiti Tun Hussein Onn Malaysia (UTHM) in 2016, and the Special Award from the Malaysian Research & Innovation Society (MyRIS) during iMIT SIC 2017 held at UUM, Kedah, Malaysia.\n\nDr. Das has published over 60 research articles in reputed high impact factor journals and international conferences. He actively contributes to the global engineering and technology community through his memberships and leadership roles. His professional affiliations include, Fellow Member and Chartered Engineer of Engineers Australia, Senior Member of IEEE (USA), Member internet society, and member of other technical organisation. His current research interests include Ethical Artificial Intelligence (EAI), Explainable AI (XAI), Machine Learning, and Internet of Things (IoT) applications.",
    },
    {
      name: "Dr. Mehar Ullah",
      location: "South Karelia, Finland",
      image: "./international_invited_speakers/mehar.jpg",
      topic: "Artificial Intelligence and Security in Federated Learning",
      abstract:
        "Dr. Mehar Ullah is a Postdoctoral Researcher at LUT University in Lappeenranta, Finland, specializing in the integration of the Internet of Things (IoT), edge computing, and big data within cyber-physical systems. His research focuses on enhancing information flow in smart grids and developing frameworks for IoT platform selection applicable to various industrial applications, including carbon fiber recycling and industrial energy management systems. His recent research includes studies on cybersecurity in the hydrogen economy and the development of unified frameworks for IoT platform selection in Power-to-X cogeneration plants.\n\nHe earned his Doctor of Engineering degree from LUT University, where his dissertation focused on the digitalization of various industrial sectors through IoT applications. Dr. Ullah’s expertise encompasses information and communication technology, cloud computing, and information management. He is actively engaged in advancing the role of IoT in cyber-physical systems, aiming to improve efficiency and sustainability across different industries.",
      profile:
        "A dedicated and versatile researcher and IT professional with over 15 years of experience in academia and industry across Finland, Afghanistan, and Pakistan. Currently serving as a Postdoctoral Researcher at LUT University, focusing on electrical engineering, the Internet of Things (IoT), IoT platforms, cyber-physical systems, and the digital transformation of industrial sectors.\n\nHe holds a Master’s degree in Software Engineering from LUT University and has a strong foundation in software development, databases, and IT systems. His teaching background includes a lecturer role at Kardan University, where he was recognized with the Best Lecturer Award in 2010. Earlier in his career, he worked as an MIS Officer in the banking sector, handling responsibilities such as software testing, data consolidation from multiple branches, reporting using Crystal Reports, and maintaining database systems.",
    },
    {
      name: "Engr. Prof. Dr. Madad Ali Shah",
      location: "Shaheed Benazir Bhutto University, Sindh, Pakistan",
      image: "./international_invited_speakers/madad.jpeg",
      topic:
        "Role of Surface Morphology in Enhancing Moisture Sensor Response Rates",
      abstract:
        "High humidity is measured with relative humidity sensors, whereas low humidity (<1 ppmv) is measured using moisture or dew point sensors, here ppmv is how many units of gas are present in one million total units of the air mixture. For example, 1 ppmv of moisture means there is 1 milliliter of water vapor in every 1,000 liters of air. Using α-Al2O3 (alpha-phase of alumina refers to Corundum, which is the most thermodynamically stable crystalline form of aluminum oxide, while gamma and delta phases are known as transition phases, they occur as the material is heated but hasn't yet reached the high temperatures required to become alpha) films as porous dielectric materials formed by anodic spark deposition, moisture sensors were created. The reaction speed of moisture sensors has been examined in this work using a range of tiny holes. Scanning electron microscopy has been used to examine three distinct surface morphologies. One sample has the most tiny pores, another has the medium amount, and the last sample has the fewest small pores. Pore sizes between 40 and 200 nm are referred to as small pores. From high humidity to low humidity or from low humidity to high humidity, it has been discovered that the sensor constructed of porous material with the greatest number of small pores responds the fastest, while the sensor with the fewest number of small pores responds the slowest. The surface morphology of moisture sensors is very important because it affects how sensitive they are and how quickly they react. Optimized pore sizes and distributions in porous structures increase the surface area that can interact with moisture, which speeds up the processes of adsorption and desorption. Sensors with a lot of small pores let moisture move quickly, which speeds up response and recovery times. Through anodic spark deposition and related techniques, surface morphology can be controlled with high precision, allowing for the optimization of sensor functionality across diverse humidity levels. For the production of high-performance moisture sensors, an in-depth understanding and application of surface morphology are essential.",
      profile:
        "Engineer Professor Dr Madad Ali Shah got his BE in Computer Engineering from MUET Jamshoro in 1991 with 2 Gold medals. He did MPhil in Mobile communication from University of Plymouth, UK in 1997 and achieved his PhD from Brunel University, UK in Satellite navigation in 2002. He has 33 years’ professional experience internationally. He was pioneer Vice Chancellor of BBSUTSD, Khairpur and got approved PC1 of Rs. 2 billion to convert BBSUTSD Khairpur Mirs into reality. He was pioneer member of Sukkur IBA University to initiate engineering programmes of Telecom, Electrical, Energy Systems and Computer Systems Engineering. He won many national and international awards of academic excellence and research including JR Beard Award of Institute of Engineering and Technology (IET) UK, Appreciation Award of the Institute of Navigation (ION) USA, Life Time Achievement Award of MUET Jamshoro, twice Best University Teachers Award (BUTA) Islamabad and Excellence Award from Institute of Engineering Pakistan (IEP). His main areas of expertise are GNSS and satellite navigation, Wireless and mobile communication, Digital logic and system design, Computer security and forensics, Curriculum development, Institutional accreditation and Academic leadership. At present he is Vice Chancellor of Shaheed Benazir Bhutto University (SBBU), Shaheed Benazirabad, Sindh, Pakistan.",
    },
    {
      name: "Dr. Sohrab Khan",
      location:
        "Balochistan University of Engineering and Technology, Khuzdar, Pakistan",
      image: "./international_invited_speakers/sohrab.jpeg",
      topic:
        "From Digital Universities to Intelligent Universities: Artificial Intelligence, Smart Governance and Regional Economic Transformation",
      abstract:
        "Higher education institutions worldwide are transitioning from basic digital infrastructures to intelligent, data-driven ecosystems. While digitization has improved efficiency and access, the emergence of Artificial Intelligence is enabling universities to become more adaptive, predictive, and strategically responsive. This transformation is reshaping teaching, research and institutional management.\n\nThis talk will present, in simple and practical terms, how Artificial Intelligence can support student learning, enhance research productivity and enable better decision-making within universities. It will also highlight the importance of leadership, ethical considerations and policy frameworks in ensuring the responsible use of Artificial Intelligence.\n\nThe presentation will further explore how universities can act as engines of regional economic transformation, particularly in emerging regions. By leveraging technology, fostering innovation and strengthening industry linkages, universities can contribute significantly to sustainable development and economic growth.\n\nThe session will conclude with a strategic roadmap for institutions in developing countries to move from digital systems toward intelligent, impact-driven ecosystems.",
      profile:
        "Dr. Sohrab Khan Bizanjo is currently serving as Pro Vice Chancellor at Balochistan University of Engineering and Technology (BUET), Khuzdar, Pakistan. He holds a PhD in Information Systems from Universiti Teknologi Malaysia and a Master’s in Computer and System Sciences from Stockholm University Sweden.\n\nWith a distinguished academic and administrative career, Dr. Sohrab Khan Bizanjo has held several key leadership positions, including Head of the Computer Science Department, Director Postgraduate Studies, Controller of Examinations and Acting Vice Chancellor at BUET Khuzdar. His leadership has played a pivotal role in strengthening academic governance, institutional development and quality assurance frameworks.\n\nHe has an active research profile with publications in well-reputed international journals. His research interests include Informatics, IT acceptance and adoption, Artificial Intelligence, e-commerce, e-government, social media impact, strategic IT alignment, IT project management and software engineering. He is particularly interested in the transformative role of emerging technologies in higher education and their potential to drive regional socio-economic development.",
    },
    {
      name: "Prof. Rabie A. Ramadan",
      location:
        "Chairholder of AI Applications Chair, University of Nizwa, Nizwa, Sultanate of Oman.",
      image: "./international_invited_speakers/rabie.jpeg",
      topic: "The Age of Agentic AI: From Tools to Teammates",
      abstract:
        "For decades, AI was something we used — a tool we invoked, a result we waited for. That era is over. We have entered the Age of Agentic AI, where AI systems no longer simply respond to commands but pursue goals, orchestrate complex workflows, and collaborate with humans as active participants in knowledge work. This is not an incremental upgrade — it is a fundamental reimagining of the relationship between human and machine intelligence.\n\nThis keynote traces that transformation: from narrow automation to today's multi-agent ecosystems capable of autonomous reasoning, tool use, and long-horizon planning. Drawing on real-world deployments across healthcare, education, and enterprise operations, the talk addresses three critical questions — how do we architect reliable agentic systems, how do we govern AI that acts on our behalf in the world, and how do we prepare our institutions and communities for the disruption ahead?\n\nEqually important is the human dimension of this shift. As AI agents take on increasingly complex cognitive tasks, the role of the professional does not disappear — it evolves. Researchers, engineers, educators, and decision-makers must develop new fluencies: knowing when to delegate to an agent, when to intervene, and how to critically evaluate outputs that are generated with speed and confidence but not always with wisdom. The most valuable skill in the agentic era will not be prompt engineering — it will be judgment.\n\nThe session closes with a call to the ICISCT community to move from observers to architects of this shift — shaping the agentic future with scientific rigor and ethical clarity.",
      profile:
        "I served as the department chair of the Computer Engineering Department at Hail University. Also, I am currently working in the Department of Information Systems, College of Economics, Management, and Information Systems. I lead many committees, including ASIN accreditation for Computer Science and Computer Engineering programs and Networks and Communication program development at Hail University.\n\nI was the chair of the College of Computer Science and Engineering International Conferences Committee. I am the founder of the Center of Application and Electronic Development at Hail University and Fablab Hail. The BCI lab was the result of a fruitful cooperation effort with the Fraunhofer Institute in 2015.\n\nI am the co-founder of the Ambient Intelligent Center (AMIC) at the German University in Cairo (GUC). Moreover, I was the general chair of the IEEE Computational Intelligence Egypt chapter for one term and Vice Chair for another term.\n\nMy research interest is in Security, Internet of Things (IoT), Computational Intelligence, and Brain-Computer Interface (BCI). Currently, I extended my research to drones technology and intelligent drones.\n\nI have many funded projects nationally and internationally, including CERN cooperation for a High-performance computation project along with Cairo, MIT, and Bari (Italy) Universities. Other funded projects were gained from organizations such as NTRA, FP7, ITEA, Hail University, and MTI University.",
    },
    {
      name: "Dr. Tariq Rahim Soomro",
      location: "Institute of Business Management (IoBM), Karachi, Pakistan.",
      image: "./international_invited_speakers/tariq.jpeg",
      topic: "Digital Deception: Fake Vs. Real",
      abstract:
        "The rise of artificial intelligence (AI) has brought about significant advancements, but it has also given rise to digital deceptions, including highly sophisticated techniques such as DeepFake technology. This presentation explores the difference between fake Vs. real images and videos. Various examples of AI-driven deceptions illustrate how they manipulate images and audio-visual content to spread misinformation, compromise privacy, and pose ethical challenges. DeepFakes, among other AI-generated forgeries, serve as a focal point, highlighting their potential to undermine trust in digital media. The latter part of the presentation delves into countermeasures, ranging from fostering AI awareness and ethical use to deploying advanced AI detection tools. These measures aim to equip individuals, organizations, and policymakers with the knowledge and resources necessary to combat AI-driven digital deception effectively, ensuring a safer and more trustworthy digital ecosystem.",
      profile:
        "Dr. Tariq Rahim Soomro, Professor of Computer Science and Rector at the Institute of Business Management (IoBM), Karachi, holds a B.Sc. (Hons) and M.Sc. in Computer Science from the University of Sindh, Jamshoro, Pakistan, and a Ph.D. in Computer Applications from Zhejiang University, Hangzhou, China. Notably, he is the first Pakistani to have earned all three degrees in the field of Computer Science.\n\nWith over 30 years of diverse and extensive experience, Dr. Soomro has excelled as an academic administrator, computer programmer, researcher, and educator. As an administrator, he has held multiple leadership positions, including Coordinator, Head of Department, Dean of Faculty, and Head of Academic Affairs. His expertise in accreditation spans globally recognized frameworks such as ABET (USA), NBEAC, NCEAC, HEC Pakistan, KHDA Dubai, and the Ministry of Higher Education and Scientific Research, UAE. In addition, Dr. Soomro has published more than 100 peer-reviewed research papers. He excelled academically, earning his B.Sc. (Hons) and M.Sc. with distinction. During his Ph.D. studies in China, he received the Exemplary Foreign Student Award (1998) and became the first foreigner to earn the Exemplary Graduate Award (1999) from Zhejiang University.Dr. Soomro has been an IEEE member since 2000 and a Senior Member of IEEE since 2005. He is currently serving as IEEE R10 Computer Society Regional Coordinator 2, and recently served as the Chair of IEEE Karachi Section (2024–2025) and as the IEEE Computer Society R10 Southern Area Coordinator (2020–2025). He has served on numerous committees and editorial boards, including the Task Force on Arabic Script IDNs by ICANN’s Middle East Strategy Working Group (MESWG) and the editorial boards of several research journals. Dr. Soomro has also contributed to numerous national and international conferences as a Technical Program Committee member.\n\nDr. Soomro’s contributions have been recognized with several prestigious accolades, including the ISOC Fellowship to the Internet Engineering Task Force (IETF) for its 68th meeting. He is affiliated with several professional societies, such as the Computer Society of Pakistan (CSP), the Sindh Graduate Association (SGA), and the Association for Computing Machinery (ACM). He is the first Pakistani to be recognized as an IEEE Computer Society Distinguished Visitor (2021–2023) and the only Pakistani to be honored as a Distinguished Contributor in the inaugural class of IEEE Computer Society Distinguished Contributors (2021). Dr. Tariq Rahim Soomro exemplifies excellence, resilience, and dedication in academia, research, and professional service, making him an inspiring role model for many.",
    },
    {
      name: "Prof. Dr. Athar Mahboob",
      location: "Vice-Chancellor of Al-Kawthar University in Karachi",
      image: "./international_invited_speakers/athar.jpeg",
      topic: "Reclaiming Digital Sovereignty with openDesk",
      abstract:
        'In an era where educational institutions are increasingly tethered to proprietary software ecosystems, the quest for digital sovereignty has never been more critical. This keynote explores openDesk, the pioneering open-source platform designed to provide a transparent, secure, and interoperable alternative to traditional "Big Tech" office suites. Built on a foundation of proven open-source components, openDesk offers a comprehensive workplace environment that prioritizes data privacy and vendor independence without compromising on functionality.\n\nWe will examine the strategic importance of open standards in the public and educational sectors, highlighting how openDesk empowers IT administrators to maintain absolute control over their infrastructure. By shifting away from restrictive licensing models and opaque data processing, institutions can foster an environment of innovation and trust.\n\nAttendees will gain insights into:\no The modular architecture of openDesk.\no Real-world deployment strategies within large-scale educational frameworks.\no The long-term economic and security benefits of an open-source first approach.\n\nWe will see how openDesk is not just a software solution, but a transformative movement toward a more resilient and autonomous digital future for global education.',
      profile:
        "Professor Dr. Athar Mahboob is a visionary leader, decorated engineer, and one of Pakistan’s most influential figures in higher education and technological innovation.\n\nWith a career spanning over three decades, Dr. Mahboob has consistently pushed the boundaries of academic excellence and institutional growth. He currently serves as the Vice-Chancellor of Al-Kawthar University in Karachi, adding to a distinguished leadership legacy that includes serving as the Vice-Chancellor of the Islamia University of Bahawalpur and the founding Vice-Chancellor of Khawaja Fareed University of Engineering and Information Technology. Under his stewardship, these institutions underwent historic expansions in infrastructure, research output, and student enrollment.\n\nA scholar of international repute, Dr. Mahboob earned his PhD in Electrical Engineering from the National University of Sciences and Technology (NUST), following foundational academic success at Florida State University obtaining BS and MS degrees in Electrical Engineering. His expertise in cybersecurity, cryptography, and computer networks is backed by over 40 published research papers and the successful completion of more than 100 industrial projects through his firm, Ibn Khaldun Systems.\n\nIn recognition of his extraordinary contributions to science and education, the President of Pakistan conferred upon him the Tamgha-e-Imtiaz in 2012. Dr. Mahboob is not only a builder of universities but a catalyst for digital transformation, bridging the gap between complex engineering and practical societal solutions.",
    },
    {
      name: "Prof. Dr. S. M. Aqil Burney",
      location: "Karachi, Pakistan.",
      image: "./national_invited_speakers/burney.png",
      topic:
        "Multi Criteria Decision Making (MCDM) Methods and its applications",
      abstract:
        "This work deals with multi criteria decision making (MCDM) methods and applications in textile industry with review of related work and some published work of the author with coauthors. Fundamentals are discussed using some important survey papers which are linked in the presentation Decision systems explained for decision making and eight important aspects are discussed. DSS tools are discussed and type of DSS are explained and material related is discussed and helpful in applications in Renewable Energy and water supply resources planning. work in progress.",
      profile:
        "Prof. Dr. S. M. Aqil Burney is a distinguished academician, researcher, and educationist, widely recognized for his significant contributions to the fields of computer science, data science, and artificial intelligence. With an extensive career spanning several decades, he has played a pivotal role in advancing higher education and research in Pakistan. He has served in key academic and administrative positions, including as Vice Chancellor of the University of Karachi, and has been actively involved in curriculum development, research supervision, and institutional leadership. Dr. Burney has authored numerous research publications in reputable national and international journals, particularly in areas such as data mining, soft computing, and decision support systems. His dedication to academic excellence, innovation, and capacity building has earned him a respected position in the academic community.",
    },

    {
      name: "PM. Ir. Dr. Tan Tian Swee",
      location:
        "Director of Biomedical Engineering, Universiti Teknologi Malaysia",
      image: "./international_invited_speakers/tan-tian.jpeg",
      topic:
        "Decoding Neural Communication through EEG for Intelligent Brain-Computer Interfaces",
      abstract: "",
      profile:
        "PM. Ir. Dr. Tan Tian Swee is a distinguished academic and researcher currently serving as the Director of Biomedical Engineering at Universiti Teknologi Malaysia (UTM). He earned his B.Sc. in Electrical-Mechatronics, followed by his M.Sc. and Ph.D. in Digital Signal Processing, all from UTM. Dr. Tan's core expertise lies in Medical Imaging, Electronics, and Signal Processing. Throughout his career, he has led numerous high-impact research grants and projects, focusing on innovations like wireless power transfer for biomedical applications, EEG-based Brain-Computer Interfaces, and fuzzy logic-based medical systems.\n\nHe is a highly decorated researcher, having won multiple Gold awards at international and national exhibitions, including the International Innovation Day and INATEX. With an H-index of 18, Dr. Tan has extensively published in top-tier journals and actively contributes to the academic community as a supervisor, assessor, and evaluator. Furthermore, he is a Corporate Member of the Institute of Engineering Malaysia (IEM) and a Graduate Member of the Board of Engineers Malaysia (BEM).",
    },
  ];

  const invitedSpeakers = [
    {
      name: "Dr. Shoab Ahmed Khan",
      location: "Sir Syed CASE Institute of Technology, Islamabad, Pakistan",
      image: "./national_invited_speakers/shoaib.jpg",
      topic:
        "Silicon and Steel: An Impartial Technical Analysis of Artificial Intelligence and Emerging Disruptive Technologies in Current Global Conflicts",
      abstract:
        "The global security order is fragmenting at an accelerating pace, and Emerging and Disruptive Technologies (EDTs) are the primary accelerant. Two concurrent conflicts: The Russia-Ukraine war (2022–present) and the US-Israel military campaign against Iran (2026–present), together constitute the most comprehensive live deployment of EDT-enabled warfare in recorded history. For the first time, every technology domain on the EDT landscape has been simultaneously activated in peer and near-peer conflict: artificial intelligence and agentic systems, autonomous drone swarms, generative AI disinformation, cyberattacks on commercial cloud infrastructure, space-based ISR and anti-satellite operations, electronic warfare, and the weaponisation of financial technology. This talk presents an impartial technical analysis of EDT deployment across both conflicts, examining the strategies, systems, and outcomes on all sides without political bias. It draws on open-source intelligence, confirmed operational data, and published technical documentation to assess what each technology achieved, where it failed, and what the evidence reveals about the limits of EDT superiority as a substitute for political resolution. The talk concludes by translating these findings into a practical research agenda for engineers an asd scientists in Pakistan, identifying the specific EDT domains like autonomous systems, cyber physical systems, cybersecurity, and sovereign digital infrastructure and AI stack, where focused Pakistani research can make the most direct contribution to national security.",
      profile:
        "Chancellor Sir Syed CASE Institute of Technology, Islamabad, Pakistan. CEO Center for Advanced Research in Engineering (CARE), Former Chairman Pasha, Member NCEAC, Member BoG VU, Former Board Member Shifa International Hospital.",
    },
    {
      name: "Prof. Dr. Yasar Ayaz",
      location: "Quaid-i-Azam University, Islamabad, Pakistan",
      image: "./national_invited_speakers/yasar.jpeg",
      topic: "Artificial Intelligence on the Leading Edge",
      abstract:
        "Artificial Intelligence (AI) is one of the most rapidly developing technologies of the world today and is considering to be on the very leading edge expanding the global technology frontier as we know it. World leaders, CEOs of multinational corporations, pioneering entrepreneurs, innovators, technology magazines etc, all unequivocally put AI at the top of their wish list, going as far as calling Artificial Intelligence ‘the new electricity’ that is expected to be an integral part of any and all systems of the future.",
      profile:
        "Prof Dr Yasar Ayaz is the Founding Chairman and Central Project Director of Pakistan's National Center of Artificial Intelligence (NCAI) headquartered at National University of Sciences and Technology (NUST) in Islamabad. He also founded Pakistan's first Department of Robotics & Artificial Intelligence at NUST in 2010 where he is also currently a full Professor. He holds international Adjunct Professor titles at Tohoku University, Japan and China University of Mining and Technology, Beijing. He is the author of over 150 international publications and has won international best paper awards in London, UK and Sydney, Australia in 2018 and 2013 respectively. He also has 3 product design patents registered in his name with several more under review. He has delivered more than 80 invited and keynote talks at prominent venues including USA, Japan, UK, South Korea, China, Italy, Belarus, Norway, Morocco, Saudi Arabia etc and has won and developed projects of 2.5 Billion Pakistan Rupees including international grants and national consortium based projects. In addition to winning President's Gold Medal, University Best Teacher Award, Best Researcher Award, Best Innovator Award and Top Performer BRAIN Award at NUST, Prof Yasar is also a recipient of the Engineers' Excellence Award of Pakistan Engineering Council (PEC) and has also won IEEE Medal of Achievement as well as Lifetime Achievement Award of IEEE Islamabad Section which are the highest awards of these respective prestigious organizations. In recognition of his services to Pakistan in the field of AI and Robotics, he has been conferred with the Presidential Award for Pride of Performance by the President of Pakistan in 2021.",
    },
    {
      name: "Prof Dr. Muazzam Khattak",
      location: "Quaid-i-Azam University, Islamabad, Pakistan",
      image: "./national_invited_speakers/muazzam.webp",
      topic: "Role of Artificial Intelligence in Healthcare",
      abstract:
        "Artificial Intelligence (AI) in healthcare offers transformative opportunities for enhanced diagnostics, personalized treatment, drug discovery, and operational efficiency, while facing challenges regarding data privacy, algorithmic bias, and ethical accountability.\n\nArtificial intelligence is transforming medicine by improving diagnosis accuracy, treatment planning, and healthcare operations. AI-powered advances in personalized medicine and robotic surgery, improve patient outcomes, eliminate human errors, and optimize clinical workflows. Furthermore, AI-powered chatbots, virtual assistants, and predictive analytics improve patient management and early disease identification. Despite its enormous promise, AI in healthcare confronts obstacles such as data protection, algorithmic bias, transparency, and system integration. Ensuring conformity with ethical principles and regulatory standards is critical to its appropriate execution. To overcome these challenges, AI researchers, healthcare practitioners, and legislators must work together to develop fair, transparent, and secure AI models. Precision medicine, robotic-assisted treatment, wearable health monitoring, and global healthcare accessibility will all benefit from AI in the future. With continued improvements and ethical considerations, AI is poised to reshape current healthcare, making it more efficient, personalized, and accessible globally.",
      profile:
        "Prof. Dr. Muazzam A. Khan Khattak (SM IEEE, AAAI, Member Pakistan Academy of Sciences) is a highly distinguished academic and researcher, ranked among the world’s top 2% most cited scientists in 2024 and 2025 and a recipient of the Pakistan Academy of Sciences–COMSTECH Gold Medal 2025. He currently serves as Director of the Farabi Center for Artificial Intelligence and Cyber Security and holds multiple leadership roles at Quaid-i-Azam University, Islamabad, including Director Science & Technology and ICESCO Chair in Data Analytics and Edge Computing, while also chairing the UNESCO National IFAP Committee and serving on the NADRA Authority Board. With a PhD jointly from IIUI and the University of Missouri (UMKC), USA, and a postdoctoral background from UMKC, he has over 230 publications, 3 books, and 16 book chapters, with more than 6,650 citations and an h-index of 45. His research focuses on AI-driven solutions in IoT, IoVs, IIoT, smart cities, and information security. He has secured research funding exceeding Rs. 1.7 billion and holds adjunct and advisory roles in leading international universities across Türkiye, Azerbaijan, China, Kazakhstan, and the USA. Widely recognized for his contributions, he has received multiple national and institutional awards, including nomination for the prestigious Tamgha-e-Imtiaz in 2024.",
    },
    {
      name: "Prof. Dr. Sajjad Ahmad Madani",
      location: "COMSATS University, Islamabad, Pakistan.",
      image: "./national_invited_speakers/sajjad.jpeg",
      topic: "GenAI, Ethics, and the Future of Work",
      abstract:
        "“GenAI, Ethics, and the Future of Work” traces the arc from past industrial revolutions to today’s AI transformation, showing why this era is fundamentally different. The talk explores the wonders of generative AI across disciplines such as computer science, physics, biochemistry, and automation, while also considering its disruptive potential in other industries. At the same time, it confronts the ethical dilemmas AI introduces from the life-or-death decisions of self-driving cars to the challenges of integrity and authenticity in higher education. Rather than closing with simple answers, the session leaves the audience with open questions about responsibility, human purpose, and the meaning of work in an age where machines can increasingly think, create, and decide alongside us.",
      profile:
        "Prof. Dr. Sajjad Ahmad Madani is a senior academic leader at COMSATS University Islamabad with over 20 years of experience. He has led 3 institutional reforms and pioneered digital and AI-enabled education. An IEEE senior member, he has authored 100+ research publications. His work focuses on Generative AI, ethics, and the future of higher education.",
    },
    {
      name: "Dr. Salman Ahmed",
      location: "GIKI, Topi, Pakistan.",
      image: "./national_invited_speakers/salman.jpg",
      topic: "AI from Islamic Perspective",
      abstract:
        "Artificial Intelligence (AI) is the simulation of human intelligence by machines, involving learning, reasoning, and self-correction. Its applications include natural language processing, robotics, predictive analytics, and autonomous systems. Understanding AI helps explore how Islamic principles can guide its ethical use. Islam encourages knowledge and innovation as long as they align with moral values. The Quran and Hadith emphasize using knowledge for the benefit of humanity, a principle reflected in the scientific advancements of the Islamic Golden Age. In modern contexts, AI is supported when it promotes justice, welfare, and public good such as in healthcare but discouraged if it causes harm or exploitation. The concept of Maslahah (public interest) guides this approach, highlighting Islam’s compatibility with responsible technological progress. In this interesting talk, I will talk about some concepts from Islam and some from AI literature and link them together.",
      profile:
        "Dr. Salman Ahmed is an Associate Professor at the Faculty of Computer Science and Engineering (FCSE) at GIKI, with a strong academic background that includes a BSc from UET Peshawar (2005), an MSc from Universiti Teknologi Petronas, Malaysia (2007), and a PhD from the University of Alberta, Canada (2013). Prior to his current role, he served as Director of the IoT Cyber Security Lab at the National Center for Cyber Security. His research focuses on cybersecurity, IoT systems, multi-agent systems, and control systems. Dr. Ahmed has received numerous prestigious awards, including the University Gold Medal, Provost Doctoral Award, and Chancellor Emeritus Scholarship, and has led significant research initiatives such as the Rs. 40.5 million Secured IoT Devices (SID) Project. He has collaborated with national and international organizations, including the Malaysian Ministry of Science and Technology and NSERC Canada, and has actively contributed to academic governance through roles in the Syndicate of UET Peshawar, the Governing Council of GIKI, and as President of the IEEE Peshawar Subsection.",
    },

    {
      name: "Prof. Dr. Shehnila Zardari",
      location:
        "NED University of Engineering and Technology, Karachi, Pakistan",
      image: "./national_invited_speakers/shehnila.png",
      topic: "Blockchain-Based Trust Management Frameworks in Crowdfunding",
      abstract:
        "This talk will focus on the integration of blockchain-based trust management frameworks within crowdfunding platforms, with particular emphasis on addressing challenges such as fraud, lack of transparency, and limited accountability. Crowdfunding systems rely heavily on trust between funders and project creators, yet traditional platforms are often constrained by centralized control and information asymmetry. The talk will explore how blockchain technology, through its decentralized architecture and automated mechanisms, can enhance trust in crowdfunding environments. Key topics will include the application of smart contracts for automated enforcement, decentralized identity systems for participant verification, and blockchain-based trust and reputation scoring mechanisms. The talk will also highlight the potential benefits of these approaches, such as tamper-proof transaction records, improved transparency, and increased stakeholder confidence. In addition, it will discuss existing challenges, including legal and regulatory uncertainties, technical and scalability issues, and adoption barriers. The talk will conclude by emphasizing the need for robust governance, ethical considerations, and interoperable frameworks to support the sustainable and effective use of blockchain in future crowdfunding ecosystems.",
      profile:
        "Dr. Shehnila Zardari is an academic and a researcher. She is currently working as a Professor at the NED University of Engineering and Technology, Karachi. She is also the Chairperson of the Department of Software Engineering at NED University of Engineering and Technology.\n\nShe has numerous publications in reputed journals and conferences. Her research interests include software engineering, big data, artificial intelligence, the Internet of Things (IoT), and blockchain.\n\nIn 2022, she was awarded the Academic Excellence Award by the Sindh Higher Education Commission. In 2020, she received the prestigious Mohtarma Fatima Jinnah and Shaheed Benazir Bhutto Award from the Sindh Commission on the Status of Women. She also received the “Best Teacher Award” from the NED Alumni Association of Southern California for the year 2023.\n\nShe is a reviewer for several journals and serves on the program committee of various distinguished conferences. Additionally, she has been a keynote speaker at several conferences, promoting research in the field of software engineering.",
    },
    {
      name: "Dr. Waheed Noor",
      location: "Balochistan, Quetta.",
      image: "./national_invited_speakers/waheed.jpg",
      topic:
        "From LLMs (Artificial Narrow Intelligence (ANI)) to Artificial General Intelligence: A Road Map to Future of AI",
      abstract:
        "Artificial Intelligence today is dominated by large language models (LLMs) that generate text, write code, generate video/images, and act as autonomous agents. These are impressive capabilities, but they remain fundamentally Artificial Narrow Intelligence (ANI), i.e., powerful pattern recognizers without understanding, grounding, or general-purpose reasoning. The future of AI is to move toward Artificial General Intelligence (AGI) that can learn, adapt, and reason across domains. To achieve this, we need to build a clearer roadmap that is more than “scaling the model bigger.”\n\nIn this keynote, I will outline a practical, research-informed, and industry-grounded road map from today’s ANI-based LLMs to future AGI systems. This includes advancements in reasoning architectures, memory systems, embodied learning, and autonomous decision-making. I will also argue that real progress toward AGI will not emerge from single, monolithic models, but from collective intelligence: networks of specialized agents collaborating, negotiating, and correcting one another closely like human teams, biological systems, and intelligent societies.\n\nI will try to highlight where current systems fail, where they succeed, and which scientific breakthroughs are still required. Finally, I will discuss the ethical, societal, and governance challenges that AGI introduces, and why human-centered design and collective oversight are crucial as AI systems become increasingly autonomous.\n\nThe path from ANI to AGI is not just a technical evolution; it is a shift in how we think about intelligence itself. This keynote offers a grounded, forward-looking roadmap for researchers, practitioners, and policymakers as we prepare for the next era of AI.",
      profile:
        "Dr. Waheed Noor is a distinguished academic leader and tenured Associate Professor with a Ph.D. in Computer Science (Machine Learning) and over 20 years of experience at the intersection of technology and public policy. He has authored 13 impact-factor research publications and successfully secured and led interdisciplinary research projects worth over $1.5 million from international organizations such as the EU, World Bank, and UNDP. An entrepreneurial scientist, he holds an applied patent and has co-founded startups including Gul Technology (Pvt) Ltd and a Smart Water Quality Monitoring Kit initiative. He is also the founding director of six key university centers, demonstrating strong leadership in research commercialization and institutional development. Dr. Noor has trained and mentored more than 500 individuals across 34 districts and empowered hundreds of freelancers and startups through initiatives like DigiSkills, DigiBizz, and NFTP. He has facilitated over 30 global institutional linkages and partnerships with multiple government departments, contributing significantly to innovation ecosystems, SDG-aligned research, and socio-economic development, particularly in Balochistan.",
    },
    {
      name: "Engr. Zaka Ul Haque",
      location:
        "Head of AI, Automation & Platform Banking HBL, Karachi, Pakistan",
      image: "./national_invited_speakers/zaka.jpg",
      topic:
        "Responsible AI in Banking: Building Governance Frameworks for an Intelligent Financial Ecosystem",
      abstract:
        "This presentation examines the emerging imperative for Responsible AI governance within financial institutions, drawing on firsthand experience deploying large language models, robotic process automation, and intelligent document processing systems inside one of Pakistan's largest banks. Unlike theoretical frameworks, the discussion is grounded in real-world constraints: on-premises data residency requirements mandated by the State Bank of Pakistan, legacy core banking integrations, and the challenge of balancing innovation velocity against enterprise risk management. The session presents a practical, layered AI Governance Policy architecture covering model risk, data privacy, access control, and audit trail requirements. Key topics include the design of an AI Control Plane as a unified gateway for all AI interactions, the role of human-in-the-loop workflows in high-stakes financial decisions, and Shariah-compliance considerations for AI-generated recommendations in Islamic banking contexts. The presentation also addresses the talent gap challenge in Pakistan's financial sector, including strategies for building internal AI engineering capability through structured training and apprenticeship programmes. The session concludes with a proposed maturity model for AI transformation in South Asian banking, covering the journey from attended automation to fully agentic AI workflows, and the governance checkpoints required at each stage. Attendees will leave with actionable insights on establishing AI ethics committees, managing model lifecycle governance, and engaging effectively with regulators on responsible innovation.",
      profile:
        "Engr. Zaka Ul Haque is a senior technology leader with over 15 years of experience spanning fintech consulting, payment systems, and enterprise AI transformation. Currently serving as Head of AI, Automation and Platform Banking at Habib Bank Limited (HBL) at the Deputy General Manager grade, he leads a multidisciplinary team responsible for robotic process automation, generative AI deployment, intelligent document processing, and platform banking initiatives across Pakistan's largest private sector bank. Under his leadership, HBL has built an on-premises generative AI infrastructure, scaled enterprise-wide intelligent automation operations, and established a comprehensive AI Governance Policy aligned with State Bank of Pakistan guidelines. His work spans the full AI spectrum, from multi-agent agentic workflows and retrieval-augmented generation systems to document intelligence for trade finance and KYC processes. He is HBL's nominated Point of Contact for the SBP Innovation Hub and serves on the Advisory Board of the Institute of Business Management (IoBM). Prior to HBL, Zaka built an extensive consultancy career advising banks and fintech companies across the Middle East and South Asia on digital transformation, payment systems modernization, open banking enablement, and regulatory technology. He held senior roles at VeriPark Asia, VentureDive, Infobip, and TPS Pakistan, where he led strategic engagements with financial institutions on channel banking, switching infrastructure, and enterprise software implementation. He has also contributed to SBP's Open Banking framework development and represented the financial sector at national fintech policy forums.",
    },
    {
      name: "Mr. Fahim Uz Zaman",
      location: "Newcastle College University Centre, United Kingdom (UK).",
      image: "./international_invited_speakers/fahim.png",
      topic:
        "Virtual Reality (VR) Gaming Has Emerged as an Important Area of Interactive Entertainment",
      abstract:
        "Virtual Reality (VR) gaming has emerged as an important area of interactive entertainment, with users increasingly engaging through different Head-Mounted Displays (HMDs) across both local and cloud-based platforms. However, the effect of different VR devices on the Quality of Experience (QoE) of gamers remains insufficiently explored. This study investigates the comparative impact of ordinary display systems, normal VR headsets, and Samsung Gear VR powered by Oculus on users’ visual quality, enjoyment, satisfaction, and perceived network performance. A subjective lab-based experiment was conducted with 20 participants using Grand Theft Auto V in two scenarios: emulator-based local gaming and cloud-based gaming through Vortex.gg. The findings show that Oculus-based VR provided the highest QoE in terms of visual quality, enjoyment, and satisfaction, outperforming both normal VR boxes and traditional displays. The study also found that network latency, jitter, and packet loss significantly reduced QoE in cloud gaming compared to emulator-based gameplay. These results highlight that both device quality and network conditions play a decisive role in shaping immersive gaming experiences. The work offers practical insight for VR device manufacturers, game developers, and cloud gaming providers seeking to improve user satisfaction and overall VR gaming performance.",
      profile:
        "Fahim Uz Zaman is a technologist, researcher, educator, and academic leader specializing in DevOps, cloud computing, cybersecurity, artificial intelligence, and software engineering. He serves as an Advanced Technical Lecturer in Web and DevOps Engineering and Programme Leader for the Software Engineering stream at Newcastle College University Centre, UK, where he oversees curriculum design and industry-focused teaching in areas such as Infrastructure as Code, CI/CD, and cloud-native systems. A Gold Medalist with a BS in Computer Science from Sindh Madressatul Islam University, he also holds an MS in Computer Science and an MSc in Cyber Security Management from the University of Law, UK. His research contributions span serverless computing, cloud databases, datacenter reliability, and AI applications, with publications in reputable journals and conferences. He has extensive teaching and training experience, including roles as a Microsoft Certified Trainer, IoT Lead Trainer at PIAIC, and CCNA instructor at Saylani Welfare. Recognized with multiple awards, including HEC Merit Scholarships and an international travel grant, he also holds professional certifications such as Microsoft Certified: Azure AI Engineer Associate and AWS Certified AI Practitioner.",
    },
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
      name: "Dr. Humera Azam",
      location: "Co-Chair Program Committee",
      image: "./organizing_committee/humeraazam.jpg",
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
      location: "Chair Review Committee",
      image: "./organizing_committee/farheen.webp",
    },
    {
      name: "Engr. Priha Bhatti",
      location: "Chair Registration Committee",
      image: "./organizing_committee/priha.webp",
    },

    {
      name: "Dr. Urooj Waheed",
      location: "Co-Chair Registration Committee",
      image: "./organizing_committee/Dr. Urooj Waheed.jpg",
    },
    {
      name: "Engr. Hassan Zaki",
      location: "Hospitality & Protocol Coordinator",
      image: "./organizing_committee/zaki.webp",
    },

    {
      name: "Mr. Shahnawaz",
      location: "Co-Hospitality & Protocol Coordinator",
      image: "./organizing_committee/shahnawaz.jpg",
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
      name: "Engr. Noman Ali Khan",
      location: "Sponsorship Coordinator",
      image: "./organizing_committee/noman.webp",
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
      name: "Engr. Sonish Aslam",
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
  const technicalSupportCommittee = [
    {
      name: "Mr. Hafiz M. Mutashim Mohsin",
      location: "SSUET",
      image: "./technical_support_committee/me.jpg",
    },
    {
      name: "Mr. Riyan Jamil",
      location: "SSUET",
      image: "./technical_support_committee/riyan.jpg",
    },
    {
      name: "Mr. Wasif Waheed",
      location: "SSUET",
      image: "./technical_support_committee/wasif.png",
    },
    {
      name: "Ms. Romana Tahir",
      location: "SSUET",
      image: "./technical_support_committee/romana.jpeg",
    },
    {
      name: "Ms. Sarah Siddiqui",
      location: "SSUET",
      image: "./technical_support_committee/sarah.jpeg",
    },
    {
      name: "Mr. M. Abdul Rafay",
      location: "SSUET",
      image: "./technical_support_committee/rafay.jpeg",
    },
    {
      name: "Ms. Malaika Sadiq",
      location: "SSUET",
      image: "./technical_support_committee/malaika.jpeg",
    },
    {
      name: "Mr. Jazib Noor",
      location: "SSUET",
      image: "./technical_support_committee/jazib.png",
    },
    {
      name: "Mr. Maaz Ur Rehman",
      location: "SSUET",
      image: "./technical_support_committee/maaz.jpg",
    },
    {
      name: "Mr. Syed Azfar Abbas",
      location: "UBIT",
      image: "./technical_support_committee/azfar.jpeg",
    },
    {
      name: "Ms. Arisha Arshad",
      location: "UBIT",
      image: "./technical_support_committee/arisha.jpeg",
    },
    {
      name: "Mr. M. Shaham Siddiqui",
      location: "UBIT",
      image: "./technical_support_committee/shaham.jpeg",
    },
    {
      name: "Mr. Safwan Ahmed",
      location: "DSU",
      image: "./technical_support_committee/safwan.jpeg",
    },
    {
      name: "Mr. M. Hasan Ashraf",
      location: "DSU",
      image: "./technical_support_committee/hasan.jpeg",
    },
    {
      name: "Mr. Khizer yousaf",
      image: "./technical_support_committee/khizer.jpeg",
    },
    {
      name: "Mr. Muneeb Mustafa",
      image: "./technical_support_committee/muneeb.jpeg",
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
              {(speaker.abstract || speaker.profile) && (
                <motion.button
                  className="px-6 py-2 bg-[#447E36] text-white text-sm font-medium rounded-md w-full"
                  whileHover={{ scale: 1.05, backgroundColor: "#2d9a40" }}
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  Read More
                </motion.button>
              )}
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
        {/* TECHNICAL SUPPORT COMMITTEE */}
        <h2
          id="technicalSupportCommittee"
          className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase text-[#521028] font-sans mb-16"
        >
          Technical Support Committee
        </h2>
        <div className="grid grid-cols-1 mb-16 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {technicalSupportCommittee.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6 flex flex-col items-center"
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-40 h-40 rounded-full border-4 border-[#447E36] overflow-hidden mb-4 shadow-inner">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mb-5 text-center">
                {member.location ? member.location : ""}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <img src="./bottom.jpg" alt="Sample" />
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
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-lg border-4 border-[#447E36] overflow-hidden shadow-md mx-auto md:mx-0">
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
