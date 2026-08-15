export default function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-10 max-w-3xxl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}
