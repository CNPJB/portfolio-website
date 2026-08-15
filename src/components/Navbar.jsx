import { Menu, Moon, Sun, X, User, Code2, Briefcase, GraduationCap, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { id: 'about', icon: User },
  { id: 'skills', icon: Code2 },
  { id: 'projects', icon: Briefcase },
  { id: 'education', icon: GraduationCap },
  { id: 'contact', icon: Mail }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { language, toggleLanguage, t } = useLanguage()
  const { theme, darkMode, switchTheme, toggleDarkMode } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    )
    navLinks.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(totalScroll / windowHeight);
      } else {
        setScrollProgress(0);
      }
      
      // Clear active state when at the top (e.g. after clicking Back to Top)
      if (totalScroll < 50) {
        setActive('');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 lg:px-8" aria-label="Primary navigation">
        <a href="#home" className="text-base font-bold tracking-tight text-text-main">
          CNP.DEV<span className="text-primary">.</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ id, icon: Icon }) =>
            <button key={id} onClick={() => navigate(id)} className={`nav-link flex items-center gap-2 ${active === id ? 'nav-link-active' : ''}`}>
              <Icon size={16} className={active === id ? 'text-primary' : 'text-text-muted'} />
              {t(`nav.${id}`)}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleLanguage} className="flex items-center gap-1 mr-1 sm:mr-2 text-sm font-bold tracking-wider transition-colors" aria-label="Toggle language">
            <span className={language === 'en' ? 'text-primary' : 'text-text-muted hover:text-text-main'}>EN</span>
            <span className="text-border-hover font-normal">/</span>
            <span className={language === 'th' ? 'text-primary' : 'text-text-muted hover:text-text-main'}>TH</span>
          </button>
          
          <div className="flex items-center gap-1.5 p-1 px-1.5 rounded-full border border-border bg-surface transition-colors" aria-label="Theme Switcher">
            <button 
              onClick={() => theme !== 'earth' && switchTheme()} 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${theme === 'earth' ? 'bg-[#ca8a04] scale-110 shadow-sm ring-2 ring-offset-1 ring-offset-bg ring-[#ca8a04]/30' : 'bg-[#ca8a04]/40 hover:bg-[#ca8a04]/70 cursor-pointer'}`}
              aria-label="Earth Theme"
              title="Earth Theme"
            />
            <button 
              onClick={() => theme !== 'cyan' && switchTheme()} 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${theme === 'cyan' ? 'bg-[#0891b2] scale-110 shadow-sm ring-2 ring-offset-1 ring-offset-bg ring-[#0891b2]/30' : 'bg-[#0891b2]/40 hover:bg-[#0891b2]/70 cursor-pointer'}`}
              aria-label="Cyan Theme"
              title="Cyan Theme"
            />            
          </div>

          <button onClick={toggleDarkMode} className="icon-button ml-1" aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setOpen(!open)} className="icon-button grid md:hidden" aria-label="Toggle navigation menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && <div className="border-t border-border bg-bg px-5 py-3 md:hidden">
        {navLinks.map(({ id, icon: Icon }) =>
          <button key={id} onClick={() => navigate(id)} className={`flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-surface-hover ${active === id ? 'text-primary-hover bg-primary-light' : 'text-text-main'}`}>
            <Icon size={18} className={active === id ? 'text-primary' : 'text-text-muted'} />
            {t(`nav.${id}`)}
          </button>
        )}
      </div>
      }
      
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-primary origin-left z-50"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})` }}
      />
    </header>
  )
}
