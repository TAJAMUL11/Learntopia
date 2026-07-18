import { Link } from "react-router-dom";

const Doc = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-col items-center justify-center min-h-[80vh] select-none text-white font-sans">
      <div className="w-full max-w-4xl background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow">
        
        {/* Title Section */}
        <div className="text-center mb-8 border-b border-gray-600/40 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">Application Documentation</h1>
          <p className="text-sm md:text-base text-gray-300 mt-2">
            System architecture, active features, and implementation logs for Learntopia.
          </p>
        </div>

        {/* Section 1: Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-highlighted-btn-bg mb-4">1. Project Overview</h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Learntopia is a modern, high-fidelity e-learning platform built as an interactive React SPA (Single Page Application). It leverages serverless backend capabilities and dynamic animations to deliver a premium student learning and self-testing experience.
          </p>
        </section>

        {/* Section 2: Core Technologies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-highlighted-btn-bg mb-4">2. Core Technologies</h2>
          <div className="grid gap-4 sm:grid-cols-2 text-sm leading-relaxed">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
              <h3 className="font-bold text-gray-200 mb-1">Frontend Core</h3>
              <p className="text-gray-300 text-xs">React 18, Vite 5, Tailwind CSS, React Router DOM (v7).</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
              <h3 className="font-bold text-gray-200 mb-1">Animations</h3>
              <p className="text-gray-300 text-xs">GSAP (GreenSock Animation Platform) + `@gsap/react` for staggering entry and page transitions.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
              <h3 className="font-bold text-gray-200 mb-1">Backend & Serverless</h3>
              <p className="text-gray-300 text-xs">Firebase (Authentication & Firestore Database) configured on Spark Free-Tier.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
              <h3 className="font-bold text-gray-200 mb-1">Task Management</h3>
              <p className="text-gray-300 text-xs">Strict workflow tracking integrated with Linear.app.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Active Feature Log */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-highlighted-btn-bg mb-4">3. Active Features</h2>
          
          <div className="space-y-6">
            
            {/* Feature: Auth */}
            <div className="border-l-4 border-button-bg-color pl-4 py-1">
              <h3 className="text-lg font-bold text-gray-200">Firebase User Auth & Profiles</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-1">
                Allows users to securely register (`/signUp`) and log in (`/login`) with session persistence. Profiles are saved under Firestore `Users/{"{userId}"}` collection storing metadata.
              </p>
            </div>

            {/* Feature: Quiz */}
            <div className="border-l-4 border-button-bg-color pl-4 py-1">
              <h3 className="text-lg font-bold text-gray-200">Interactive Quiz Engine (New)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-1">
                A multi-topic skill testing engine implementing:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1 pl-2">
                <li>**Subjects**: Python Programming, Frontend Core Concepts, and Digital Marketing.</li>
                <li>**Timed Challenges**: 15-second countdown timer per question with visual progress bars.</li>
                <li>**Dynamic Scoring**: Immediate green/red visual validation feedback upon answer submission.</li>
                <li>**GSAP Animations**: Slide-in transitions for questions and entrance staggered effects for cards.</li>
                <li>**Data Persistence**: Attempt details are written to Firestore for logged-in users, displaying their personal high scores on the select panel.</li>
              </ul>
            </div>

            {/* Feature: Styling Revamp */}
            <div className="border-l-4 border-button-bg-color pl-4 py-1">
              <h3 className="text-lg font-bold text-gray-200">Visual Overhaul & Design System (New)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-1">
                Overhauled the user interface with a cohesive glassmorphic aesthetic:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1 pl-2">
                <li>**Glassmorphism**: Unified frosted glass panels (`backdrop-blur-md bg-white/5 border border-white/10`) with inner shadows and glows.</li>
                <li>**Responsiveness**: Replaced cramped padding defaults with fluid responsive grids and containers.</li>
                <li>**Vibrant Accents**: Utilized deep gradient backdrops (`#0F0A1C` to `#251B3D`) with lavender/blue styling tags.</li>
                <li>**Animations**: Implemented GSAP stagger entrance transitions on landing sections.</li>
              </ul>
            </div>

            {/* Feature: Contact Page */}
            <div className="border-l-4 border-button-bg-color pl-4 py-1">
              <h3 className="text-lg font-bold text-gray-200">Responsive Contact Form (New)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-1">
                Completed the empty contact page (`/contact`) with a fully validation-ready glassmorphic form for student feedback and inquiries.
              </p>
            </div>

            {/* Feature: Footer */}
            <div className="border-l-4 border-button-bg-color pl-4 py-1">
              <h3 className="text-lg font-bold text-gray-200">Global Dynamic Footer (New)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-1">
                A fully responsive footer displaying current copyright year, stylized center branding, and secondary layout resource anchors persistent across all routing tabs.
              </p>
            </div>

            {/* Feature: Search schemas */}
            <div className="border-l-4 border-button-bg-color pl-4 py-1">
              <h3 className="text-lg font-bold text-gray-200">Search Engine, Geographical & AEO Optimizations (New)</h3>
              <p className="text-sm text-gray-300 leading-relaxed mt-1">
                Optimized index files with canonical metadata, customized Open Graph social graphics, localized latitude/longitude coordinate properties (GEO), and structured organization course catalogs (JSON-LD JSON schema markup) to maximize answer engine optimization (AEO) responsiveness.
              </p>
            </div>

          </div>
        </section>

        {/* Section 4: Project Protocols */}
        <section className="border-t border-gray-600/40 pt-6 mt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            For development policies, refer to the global protocols file.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="border border-button-bg-color text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-button-bg-color/20">
              Return Home
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Doc;
