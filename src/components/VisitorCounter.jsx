import { useEffect, useState, useRef } from 'react'
import { Eye, Users } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function VisitorCounter() {
  const { t } = useLanguage()
  const [views, setViews] = useState(null)
  const [uniques, setUniques] = useState(null)
  const isFetched = useRef(false)

  useEffect(() => {
    // Prevent double fetch during React StrictMode in development
    if (isFetched.current) return
    isFetched.current = true

    // Increment total views
    fetch('https://countapi.mileshilliard.com/api/v1/hit/cnp_portfolio_views_prod')
      .then(res => res.json())
      .then(data => setViews(data.value))
      .catch(err => console.error("Could not fetch view count", err));

    // Handle unique visitors
    const hasVisited = localStorage.getItem('has_visited')
    if (!hasVisited) {
      fetch('https://countapi.mileshilliard.com/api/v1/hit/cnp_portfolio_uniques_prod')
        .then(res => res.json())
        .then(data => {
          setUniques(data.value)
          localStorage.setItem('has_visited', 'true')
        })
        .catch(err => console.error("Could not increment unique count", err));
    } else {
      fetch('https://countapi.mileshilliard.com/api/v1/get/cnp_portfolio_uniques_prod')
        .then(res => res.json())
        .then(data => setUniques(data.value))
        .catch(err => console.error("Could not fetch unique count", err));
    }
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Eye size={13} className="text-text-muted" />
        <span>{t('stats.views')}:</span>
        <span className="font-medium text-text-main">
          {views !== null ? views.toLocaleString() : '...'}
        </span>
      </span>
      <span className="text-border-hover select-none">•</span>
      <span className="inline-flex items-center gap-1.5">
        <Users size={13} className="text-text-muted" />
        <span>{t('stats.uniques')}:</span>
        <span className="font-medium text-text-main">
          {uniques !== null ? uniques.toLocaleString() : '...'}
        </span>
      </span>
    </div>
  )
}
