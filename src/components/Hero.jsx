import { ArrowDownToLine, ArrowRight, Mail, RotateCw } from 'lucide-react'
import { FaGithub, FaLinkedin  } from "react-icons/fa";
import { useLanguage } from '../context/LanguageContext'
import { useState, useEffect } from 'react';

const socialLinks = [
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/CNPJB' },
  { label: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/chitnupong-narkwong-097239425' },
  { label: 'Email', icon: Mail, href: 'mailto:665021000930@mail.rmutk.ac.th' },
]

const TypewriterCode = ({ speed = 25, maxLoops = 2, delayBetweenLoops = 1000 * 10 }) => {
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [loopCount, setLoopCount] = useState(0);
  const [trigger, setTrigger] = useState(0);
  
  const codeString = `const developer = {
  name: 'Chitnupong Narkwong',
  role: '${t('hero.statusRole')}',
  status: '${t('hero.statusAvailability')}',
  focus: [
    '${t('hero.focusMaintainability')}', '${t('hero.focusPerformance')}',
    '${t('hero.focusSecurity')}'
  ]
};`;

  useEffect(() => {
    let i = 0;
    let timer;
    let timeout;
    
    setIsPlaying(true);
    setDisplayedText('');
    
    timer = setInterval(() => {
      if (i < codeString.length) {
        setDisplayedText(codeString.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        if (loopCount + 1 < maxLoops) {
          timeout = setTimeout(() => {
            setLoopCount(c => c + 1);
            setTrigger(t => t + 1);
          }, delayBetweenLoops);
        } else {
          setIsPlaying(false);
        }
      }
    }, speed);
    
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [codeString, speed, trigger]);

  const handleRefresh = () => {
    if (!isPlaying) {
      setLoopCount(0);
      setTrigger(t => t + 1);
    }
  };

  const highlighted = displayedText
    .replace(/(const\s)/g, '<span class="text-violet-600 dark:text-violet-400">$1</span>')
    .replace(/(developer)/g, '<span class="text-primary">$1</span>')
    .replace(/('[^']*'?)/g, '<span class="text-emerald-600 dark:text-emerald-400">$1</span>');

  return (
    <>
      <pre className="overflow-x-auto pt-4 sm:pt-6 font-mono text-xs sm:text-sm leading-6 sm:leading-7 min-h-[250px] sm:min-h-[280px]">
        <code dangerouslySetInnerHTML={{ __html: highlighted + (isPlaying ? '<span class="animate-pulse">|</span>' : '') }} />
      </pre>
      <div className="mt-3 flex items-center justify-between text-xs text-text-muted min-h-[24px]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> {t('hero.openToOpportunities')}
        </div>
        {!isPlaying && (
          <button onClick={handleRefresh} className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer" aria-label="Replay animation">
            <RotateCw size={13} />
          </button>
        )}
      </div>
    </>
  );
};

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="hero-grid absolute inset-0 -z-10 opacity-50 dark:opacity-30" />
      <div className="mx-auto grid min-h-[610px] max-w-6xl items-center gap-12 px-5 pb-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
        <div className="animate-enter">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-text-main sm:text-6xl">
            {t('hero.greeting')} <span className="text-primary">{t('hero.fullname')}</span>.
          </h1>
          <p className="mt-5 text-xl font-medium text-text-main sm:text-2xl">
            {t('hero.role')}
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-text-muted">
            {t('hero.description')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#projects">
              {t('hero.viewProjects')} <ArrowRight size={17} />
            </a>
            <a className="button-secondary" href="#contact">
              {t('hero.contactMe')}
            </a>
            <div className="flex rounded-xl shadow-sm border border-border bg-surface">
              <a href="/Chitnupong_Narkwong_Resume_EN.pdf" target='_blank' download="Chitnupong_Narkwong_Resume_EN.pdf" className="flex flex-1 items-center justify-center gap-2 px-4 py-[0.65rem] text-sm font-semibold text-text-main hover:bg-primary-light hover:text-primary transition-all rounded-l-xl border-r border-border" title="Download English Resume">
                EN {t('hero.resume')} <ArrowDownToLine size={16} />
              </a>
              <a href="/Chitnupong_Narkwong_Resume_TH.pdf" target='_blank' download="Chitnupong_Narkwong_Resume_TH.pdf" className="flex flex-1 items-center justify-center gap-2 px-4 py-[0.65rem] text-sm font-semibold text-text-main hover:bg-primary-light hover:text-primary transition-all rounded-r-xl" title="Download Thai Resume">
                TH {t('hero.resume')} <ArrowDownToLine size={16} />
              </a>
            </div>
          </div>
          <div className="mt-9 flex items-center gap-4">
            {socialLinks.map(({ label, icon: Icon, href }) =>
              <a key={label} href={href} target='_blank' className="social-link" aria-label={label}>
                <Icon size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm animate-enter-delayed">
          <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
          <div className="relative rounded-3xl border border-border bg-surface p-4 sm:p-6 shadow-xl shadow-border">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <i className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-xs text-text-muted">developer.js</span>
            </div>
            <TypewriterCode speed={30} maxLoops={2} delayBetweenLoops={1000 * 10} />
          </div>
        </div>
      </div>
    </section>
  )
}
