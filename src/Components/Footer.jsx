
const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0f0a1c]/60 backdrop-blur-md py-6 mt-16 select-none">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
        <div>
          &copy; {new Date().getFullYear()} Learntopia. All rights reserved.
        </div>
        <div className="text-white font-extrabold tracking-wider uppercase bg-gradient-to-r from-button-bg-color to-highlighted-btn-bg bg-clip-text text-transparent text-sm">
          Learntopia
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
