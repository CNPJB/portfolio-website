import { ArrowUp, Mail, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from '../context/LanguageContext'
import VisitorCounter from './VisitorCounter'

export default function Footer() {
  const { t } = useLanguage()

  return <footer className="border-t border-border bg-surface py-8">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div>
        <p className="font-semibold text-text-main">Chitnupong Narkwong</p>
        <p className="mt-1 text-sm text-text-muted">{t('footer.subtitle')}</p>
      </div>
      <div className="flex items-center gap-3">
        <a className="social-link" href="https://github.com/CNPJB" aria-label="GitHub" target='_blank'><FaGithub size={18} /></a>
        <a className="social-link" href="https://www.linkedin.com/in/chitnupong-narkwong-097239425" aria-label="LinkedIn" target='_blank'><FaLinkedin size={18} /></a>
        <a className="social-link" href="mailto:665021000930@mail.rmutk.ac.th" aria-label="Email"><Mail size={18} /></a>
        <a className="social-link" href="tel:0894926315" aria-label="Tel"><Phone size={18} /></a>
        <a className="icon-button" href="#home" aria-label="Back to top"><ArrowUp size={18} /></a>
      </div>
    </div>
    <div className="mx-auto mt-6 max-w-6xl border-t border-border px-5 pt-5 text-xs text-text-muted lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <span>© {new Date().getFullYear()} Chitnupong Narkwong. {t('footer.copyright')}</span>
      <VisitorCounter />
    </div>
  </footer>
}