import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FaGithub } from "react-icons/fa";
import SectionHeading from './SectionHeading'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

function ProjectImageSlider({ project, t }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!project.images || project.images.length === 0) {
    return <div className={`w-full h-full bg-gradient-to-br ${project.image || 'from-bg-tinted to-surface'}`}></div>;
  }

  return (
    <div className="relative w-full h-full group">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        {project.images.map((img, idx) => (
          <img 
            key={idx} 
            src={img} 
            alt={`${project.title} screenshot ${idx + 1}`} 
            className="w-full h-full object-cover shrink-0 snap-center pointer-events-none" 
          />
        ))}
      </div>
      
      {project.images.length > 1 && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-text-main/40 hover:bg-text-main/70 text-bg rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-text-main/40 hover:bg-text-main/70 text-bg rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
            {project.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-4 bg-primary' : 'w-1.5 bg-surface/60 backdrop-blur-sm'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage()

  return <section id="projects" className="section-shell">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} />
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) =>
          <article className="project-card" key={project.title}>
            <div className="h-[175px] w-full border-b border-border">
              <ProjectImageSlider project={project} t={t} />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t(project.typeKey)}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-text-main">{project.title}</h3>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-text-muted">{t(project.descKey)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) =>
                  <span className="skill-badge text-xs" key={tech}>{tech}</span>)}
              </div>
              <div className="mt-6 flex gap-3">
                <a href="https://github.com/CNPJB?tab=repositories" target='_blank' className="project-link" aria-label={`${project.title} GitHub placeholder`}>
                  <FaGithub size={16} /> {t('projects.code')}</a>
              </div>
            </div>
          </article>)}
      </div>
    </div>
  </section>
}
