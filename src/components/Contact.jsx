import { Mail, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin  } from "react-icons/fa";
import SectionHeading from './SectionHeading'
import { useLanguage } from '../context/LanguageContext'

const contacts = [
  { icon: Mail, labelKey: 'contact.email', value: '665021000930@mail.rmutk.ac.th', href: 'mailto:665021000930@mail.rmutk.ac.th' },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/CNPJB', href: 'https://github.com/CNPJB' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/chitnupong-narkwong-097239425', href: 'https://www.linkedin.com/in/chitnupong-narkwong-097239425' },
  { icon: Phone, labelKey: 'contact.tel', value: '+66 89 492 6315', href: 'tel:0894926315' }]

export default function Contact() {
  const { t } = useLanguage()

  return <section id="contact" className="section-shell section-tinted">
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')}>{t('contact.description')}</SectionHeading>
          <div className="space-y-2">
            {contacts.map(({ icon: Icon, label, labelKey, value, href }) =>
              <a className="contact-item" href={href} key={label || labelKey} target='_blank'>
                <span><Icon size={18} /></span>
                <div>
                  <p>{labelKey ? t(labelKey) : label}</p>
                  <strong>{value}</strong>
                </div>
              </a>
            )}
          </div>
        </div>
        
        <div className="w-full h-full min-h-[300px] lg:min-h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800/50">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15505.096172163023!2d100.6055317038843!3d13.701845283235626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1786629317767!5m2!1sth!2sth" 
            className="w-full h-full border-0 grayscale-[20%] contrast-125 dark:opacity-80 dark:grayscale-[50%] dark:invert-[90%] dark:hue-rotate-180 transition-all duration-300" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>

      </div>
    </div>
  </section>
}
