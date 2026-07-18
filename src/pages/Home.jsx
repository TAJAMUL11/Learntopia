import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import next from "../assets/Icons/next.png";
import report from "../assets/Icons/report.png";
import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";
import atoms from "../assets/Icons/atoms.png";
import circles from "../assets/Icons/circles.png";
import solution from "../assets/Icons/solution.png";
import arts from "../assets/Icons/arts.png";
import star from "../assets/CourseImg/star.png";

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Hero entry animation
    if (heroRef.current) {
      const children = heroRef.current.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }

    // Stats cards entry animation
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.4 }
      );
    }
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-20 select-none text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <div ref={heroRef} className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-8">
          Build Your <br />
          <span className="bg-gradient-to-r from-button-bg-color to-highlighted-btn-bg bg-clip-text text-transparent">
            Skills
          </span>{" "}
          Online
        </h1>

        {/* Feature Icons Grid */}
        <div className="home-headIcons">
          <div className="home-icons">
            <img src={solution} alt="books" className="h-images" />
          </div>
          <div className="home-icons">
            <img src={atoms} alt="atoms" className="h-images hover:animate-spin duration-1000" />
          </div>
          <div className="home-icons">
            <img src={circles} alt="circles" className="h-images animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="home-icons">
            <img src={arts} alt="online" className="h-images" />
          </div>
        </div>

        {/* Description Paragraph */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed mb-12">
          Learn and improve your skills with interactive courses and skill tests built specifically for future professionals.
        </p>

        {/* CTA Join Us Block */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors duration-300 cursor-pointer shadow-lg hover:shadow-button-bg-color/10">
          <button className="text-base font-bold uppercase tracking-wider text-white" onClick={() => navigate("/courses")}>
            JOIN US NOW
          </button>
          <img
            src={next}
            alt="arrow"
            className="w-5 h-5 cursor-pointer hover:translate-x-1.5 transition-transform duration-200"
            onClick={() => navigate("/courses")}
          />
        </div>

      </div>

      {/* STATS & INFO WIDGETS */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Rating & Learner Stack Widget */}
        <div className="achievecustomers flex flex-col justify-between min-h-[260px] p-6">
          <div className="flex items-center justify-between w-full border-b border-white/5 pb-4 mb-4">
            <p className="text-sm text-gray-300 font-bold uppercase tracking-wider">Average Rating</p>
            <div className="flex items-center gap-1.5 bg-white text-gray-900 px-4 py-1.5 rounded-xl text-sm font-extrabold shadow-md">
              <img src={star} alt="star" className="w-4 h-4 object-contain" />
              4.8
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 my-4">
            <div className="flex -space-x-3 items-center justify-center">
              <img src={one} alt="learner" className="w-12 h-12 rounded-full border-2 border-primary-bg-color shadow-md object-cover" />
              <img src={two} alt="learner" className="w-12 h-12 rounded-full border-2 border-primary-bg-color shadow-md object-cover" />
              <img src={three} alt="learner" className="w-12 h-12 rounded-full border-2 border-primary-bg-color shadow-md object-cover" />
              <img src={four} alt="learner" className="w-12 h-12 rounded-full border-2 border-primary-bg-color shadow-md object-cover" />
            </div>
            <p className="text-base sm:text-lg font-bold text-gray-100 text-center">
              76,080+ Satisfied Learners
            </p>
          </div>
        </div>

        {/* Why Learn Online Card */}
        <div className="achieveCards flex flex-col justify-between min-h-[260px] p-6">
          <div className="flex items-center gap-3 w-full border-b border-white/5 pb-4 mb-4">
            <div className="bg-white/10 p-2 rounded-xl border border-white/10 w-10 h-10 flex justify-center items-center">
              <img src={report} alt="report icon" className="w-5 h-5 object-contain" />
            </div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Education Quote</h4>
          </div>
          <div className="flex flex-col justify-center items-center text-center my-4">
            <blockquote className="text-base sm:text-lg italic font-medium text-gray-200 leading-relaxed">
              {"\"Continuous learning is the minimum requirement for success in any field.\""}
            </blockquote>
            <p className="text-sm font-extrabold text-highlighted-btn-bg mt-4 tracking-wide">— Brian Tracy</p>
          </div>
        </div>

        {/* Categories Rotating Badges Widget */}
        <div className="achieveCards relative flex flex-col justify-between min-h-[260px] p-6 bg-gradient-to-br from-primary-bg-color/50 to-light-bg-color/50">
          <div className="w-full border-b border-white/5 pb-4 mb-4 text-left">
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Subject Fields</h4>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center items-center max-w-[320px] my-auto">
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-highlighted-btn-bg text-gray-900 border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Science
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-button-bg-color text-white border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Technology
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-primary-bg-color text-white border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Marketing
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-800 text-gray-200 border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Arts
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-800 text-emerald-100 border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Finance
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-orange-800 text-orange-100 border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Languages
            </span>
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-amber-800 text-amber-100 border border-white/10 shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
              Media
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
