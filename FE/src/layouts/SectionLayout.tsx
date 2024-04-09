import { ISectionLayout } from '../interfaces/HomePage'

const SectionLayout = ({ className, title, children } : ISectionLayout) => {
  return (
    <section className={`${className} section`}>
        <div className="section-heading">
            <h2 className="section-heading__title">{title}</h2>
        </div>
        <div className="section-body">
            {children}
        </div>
    </section>
  )
}

export default SectionLayout