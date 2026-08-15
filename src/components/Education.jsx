import { GraduationCap, BookOpen } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useLanguage } from '../context/LanguageContext'

const educationData = [
  {
    yearKey: "education.current",
    degreeKey: "education.bachelor",
    institution: "Rajamangala University of Technology Krungthep",
    descriptionKey: "education.bachelor_desc",
    gpa: "3.94",
    icon: GraduationCap
  },
  {
    yearKey: "education.hs_year",
    degreeKey: "education.hs_degree",
    institution: "Prakanong Pittayalai School",
    descriptionKey: "education.hs_desc",
    gpa: "3.73",
    icon: BookOpen
  }
];

export default function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="section-shell section-tinted">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading eyebrow={t('education.eyebrow')} title={t('education.title')} />
        
        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="flex flex-col gap-10">
            {educationData.map((item, index) => {
              // Alternate sides: even on left, odd on right
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Timeline Node/Icon */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-primary-light border-[3px] border-surface text-primary z-10 shadow-sm">
                    <item.icon size={18} />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full pl-14 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="border border-border rounded-2xl p-6 bg-surface shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-sm font-semibold tracking-wider text-primary mb-1">{t(item.yearKey)}</p>
                      <h3 className="text-xl font-semibold text-text-main">{t(item.degreeKey)}</h3>
                      <p className="mt-1 text-text-main font-medium">{item.institution}</p>
                      <p className="md:block hidden mt-3 text-sm leading-relaxed text-text-muted">{t(item.descriptionKey)}</p>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">GPA: {item.gpa}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
