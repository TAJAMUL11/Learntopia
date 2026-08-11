import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

const LanguageSelector = ({ mobile = false }) => {
  const { languages, activeLangObj, setLanguage, currentLang } = useLanguage();
  const { playClick } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When only one language is exposed there's nothing to switch between, so the
  // selector hides itself entirely (keeps the navbar clean while other
  // languages are still being completed behind the scenes).
  if (languages.length <= 1) return null;

  const handleSelect = (code) => {
    playClick();
    setLanguage(code);
    setIsOpen(false);
  };

  const shortCode = activeLangObj.code.toUpperCase();

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        className={`h-[34px] flex items-center justify-between gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-ink-hi backdrop-blur-md transition-all duration-200 hover:border-violet-500/40 hover:bg-white/[0.08] hover:shadow-glow focus:outline-none ${
          mobile ? 'w-full h-10 px-4 text-sm' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`Language: ${activeLangObj.name} (Click to change)`}
      >
        <span className="flex items-center gap-1.5">
          <span className="text-sm leading-none">{activeLangObj.flag}</span>
          <span className="font-bold tracking-wide text-ink-hi">{shortCode}</span>
        </span>
        <svg
          className={`h-3.5 w-3.5 text-ink-low transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-400' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-44 rounded-2xl border border-white/10 bg-ground-900/95 py-2 shadow-2xl backdrop-blur-xl transition-all duration-200 animate-fade-in ${
            mobile ? 'left-0 right-0 w-full' : 'right-0'
          }`}
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-faint border-b border-white/[0.06] mb-1">
            Language / اللغة
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center justify-between px-3.5 py-2 text-xs transition-colors hover:bg-white/[0.06] ${
                  isSelected ? 'bg-violet-500/15 font-bold text-violet-300' : 'text-ink-low hover:text-ink-hi'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </span>
                {isSelected && (
                  <svg className="h-3.5 w-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
