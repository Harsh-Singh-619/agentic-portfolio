// FULL UPDATED APP.JSX — FULLY RESPONSIVE NAVBAR (Dropdown Mobile Menu)
// All sections restored and working perfectly.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingText from "./components/TypingText";

// --------------------- DATA -------------------------
const sections = ["Hero", "About", "Experience", "Projects", "Skills", "Contact"];

const skills = [
  "Python", "PySpark", "Airflow", "Dagster", "FastAPI", "React",
  "Javascript", "Snowflake", "AWS S3", "AWS EMR", "Kafka Streaming",
  "Elasticsearch", "Linux", "Pytorch"
];

const projects = [
  {
    title: "TEDAX – Data Analytics Platform",
    description:
      "Built Tata Elxsi’s in-house analytics platform using React.js, PySpark and FastAPI. Delivered scalable pipelines and interactive analytics features.",
  },
  {
    title: "Keysight – LLM-Powered SCPI Assistant",
    description:
      "Developed an AI assistant to auto-generate SCPI commands and VSA instruction manuals using Streamlit + RAG + fine-tuned LLM models.",
  },
  {
    title: "Olympics Sentiment Analytics",
    description:
      "Designed sentiment analysis pipeline for global Olympics fan engagement. Delivered real-time insights for attendance & sports activity.",
  },
  {
    title: "Air India – Real-time Review Analytics",
    description:
      "Built Elasticsearch-powered sentiment monitoring system analyzing multi-dimensional customer feedback across categories.",
  },
  {
    title: "Tata Motors – EV Live Telematics Pipeline",
    description:
      "Engineered PySpark + Kafka + EMR pipelines achieving <3.8 sec latency for next-gen EV dashboards.",
  },
  {
    title: "Caterpillar – Delta & Xplore",
    description:
      "Working on enterprise tools: Delta (Python package registry) & Xplore (GenAI + ML workflow orchestration platform).",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// --------------------- APP -------------------------
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // MOBILE MENU
  const [current, setCurrent] = useState(sections[0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Detect theme
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Section Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(scrollTop / docHeight);
      setShowTopBtn(scrollTop > 400);

      for (let id of sections) {
        const el = document.getElementById(id.toLowerCase());
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.45 && rect.bottom > 0) {
          setCurrent(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextIndex = sections.indexOf(current);
  const nextSection = nextIndex < sections.length - 1 ? sections[nextIndex + 1] : null;

  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 snap-y snap-mandatory overflow-y-scroll">

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 h-1 bg-purple-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }} />

      {/* NAVBAR — RESPONSIVE */}
      <nav className="fixed top-0 w-full z-50 bg-gray-50 dark:bg-gray-900 shadow-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">

          {/* Brand */}
          <div className="text-xl font-bold text-purple-600">Harsh Singh</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {sections.slice(1).map((sec) => (
              <li key={sec}>
                <a
                  href={`#${sec.toLowerCase()}`}
                  className={`hover:text-purple-600 dark:hover:text-purple-400 ${current === sec ? "font-bold underline" : ""}`}
                >
                  {sec}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-gray-100 dark:bg-gray-800 px-6 pb-4 space-y-3 shadow-inner"
            >
              {sections.slice(1).map((sec) => (
                <li key={sec}>
                  <a
                    href={`#${sec.toLowerCase()}`}
                    className={`block py-2 text-lg hover:text-purple-600 dark:hover:text-purple-400 ${
                      current === sec ? "font-bold underline" : ""
                    }`}
                    onClick={() => setMenuOpen(false)} // close menu on click
                  >
                    {sec}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* DARK MODE BUTTON */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full shadow hover:scale-105 transition-transform"
        >
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>☀️</motion.span>
            ) : (
              <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>🌙</motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* BACK TO TOP */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-purple-500 text-white rounded-full shadow hover:scale-110"
        >
          ↑
        </button>
      )}

      {/* HERO */}
      <motion.section
        id="hero"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQEcK7ZuoUxlnA/profile-displayphoto-shrink_400_400/B56ZSAbnqNGoAg-/0/1737321512562?e=1765411200&v=beta&t=BJS1L7NaR7rH33t1BQ_tSUmIcqRUjyqApo3D0hgaXXw"
          alt="Harsh Singh"
          className="w-36 h-36 rounded-full shadow-xl border-4 border-white mb-6 object-cover
          ring-4 ring-purple-400 ring-offset-2 ring-offset-transparent animate-pulse"
        />
        <h1 className="text-5xl font-bold mb-4">🙂 <TypingText text="Hello, I'm Harsh Singh" speed={80} /></h1>
        <p className="text-xl mb-6"><TypingText text="Senior Data Engineer | Building Scalable Data Pipelines | Python | Spark | AWS | Airflow | Dagster | Snowflake | Kafka | Data Warehousing | NIT Agartala ’23" speed={40} /></p>
        <a href="#contact" className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-200">Contact Me</a>
      </motion.section>

      {/* ABOUT */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        className="py-20 px-6 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-purple-500 inline-block">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Data Engineer with 2.5 years at Tata Elxsi, experienced in designing large-scale data pipelines, ETL
          workflows, and scalable cloud architectures. Skilled in AWS, Snowflake, PySpark, Dagster, and building
          automation pipelines. Contributed to MERN full-stack development when needed. Known for problem-solving,
          reliability, teamwork, and delivering production-ready systems.
          <br /><br />
          <strong>Achievements:</strong> Expert-rated coder (Codeforces), Rising Star Award, Project Excellence Award,
          2× Extra Mile Award.
        </p>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        className="py-20 px-6 max-w-5xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-purple-500 inline-block">Experience</h2>

        <div className="space-y-10">

          {/* Tata Elxsi – Data Engineer */}
          <div>
            <h3 className="text-2xl font-bold">Tata Elxsi — Data Engineer</h3>
            <p className="text-gray-500 mb-2">June 2023 – May 2025 • Bengaluru</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Designed and developed TEDAX, Tata Elxsi’s internal analytics platform using React.js, PySpark & FastAPI.</li>
              <li>Implemented LLM-powered SCPI assistant for Keysight using Streamlit + RAG + finetuned models.</li>
              <li>Delivered global Olympics engagement analytics pipeline supporting real-time sentiment insights.</li>
              <li>Developed Air India’s real-time customer review analytics system using Elasticsearch & streaming workflows.</li>
            </ul>
          </div>

          {/* Tata Elxsi – Senior Data Engineer */}
          <div>
            <h3 className="text-2xl font-bold">Tata Elxsi — Senior Data Engineer</h3>
            <p className="text-gray-500 mb-2">June 2025 – Present • Bengaluru</p>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>Architected large-scale EV telematics pipelines for Tata Motors using PySpark, Kafka, EMR achieving &lt;3.8 sec latency.</li>
              <li>Building Caterpillar enterprise systems: Delta (Python registry) & Xplore (workflow orchestration + GenAI).</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        className="py-20 px-6 max-w-5xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-purple-500 inline-block">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6 bg-gray-200 dark:bg-gray-700 rounded-xl shadow hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        className="py-20 px-6 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-purple-500 inline-block">Skills</h2>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="px-4 py-2 bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 rounded-full font-semibold"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        className="py-20 px-6 max-w-3xl mx-auto text-center bg-gray-100 dark:bg-gray-800 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-purple-500 inline-block">Contact</h2>

        <p className="mb-2 text-lg">📩 <strong>Email:</strong> hgh9harsh@gmail.com</p>
        <p className="mb-2 text-lg">📞 <strong>Phone:</strong> +91 8862862866</p>
        <p className="mb-2 text-lg">🔗 <strong>GitHub:</strong> <a href="https://github.com/divineciphercells" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">github.com/divineciphercells</a></p>
        <p className="text-lg">🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/harsh-singh" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">linkedin.com/in/harsh-singh</a></p>
      </motion.section>

      {/* AGENTIC ASSISTANT */}
      <div className="fixed bottom-6 left-6 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 text-sm border border-gray-200 dark:border-gray-700">
        <div className="text-lg">🤖</div>
        <strong>You’re viewing: {current}</strong>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          {nextSection ? <>Next up: <strong>{nextSection}</strong></> : "You reached the end — nice!"}
        </p>
      </div>

    </div>
  );
}
