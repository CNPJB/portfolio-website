import { Code2, Lightbulb, Network } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  
  const focusAreas = [
    { icon: Code2, title: t('about.f1_title'), text: t('about.f1_text') },
    { icon: Network, title: t('about.f2_title'), text: t('about.f2_text') },
    { icon: Lightbulb, title: t('about.f3_title'), text: t('about.f3_text') },
  ]

  return <section id="about" className="section-shell">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />
          <div className="relative w-full aspect-[4/3] overflow-hidden image-mask-fade">
            <img
              src="../src/assets/profile_pic.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-bg-tinted p-6">
            <p className="leading-7 text-text-muted">
              {t('about.p1')}
            </p>
            <p className="mt-4 leading-7 text-text-muted">
              {t('about.p2')}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {focusAreas.map(({ icon: Icon, title, text }) =>
              <article key={title} className="feature-card">
                <Icon size={21} className="text-primary" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
}
