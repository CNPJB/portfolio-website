import SectionHeading from './SectionHeading'
import { skillGroups } from '../data/skills'
import { useLanguage } from '../context/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()
  return <section id="skills" className="section-shell section-tinted">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <SectionHeading eyebrow={t('skills.eyebrow')} title={t('skills.title')} />
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map(({ title, icon: Icon, skills }) =>
          <article key={title} className="skill-card">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary-hover">
                <Icon size={20} />
              </span>
              <h3>{t(`skills.${title.toLowerCase().split(' ')[0]}`)}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) =>
                <span key={skill.name} className="skill-badge">
                  {skill.icon && <img src={skill.icon} alt={`${skill.name} icon`} className="w-4 h-4 object-contain" />}
                  {skill.name}
                </span>)}
            </div>
          </article>
        )}
      </div>
    </div>
  </section>
}
