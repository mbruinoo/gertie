import { RichText } from '@payloadcms/richtext-lexical/react'
import AccordionController from './AccordionController'

type Item = {
  name?: object | null
  description?: object | null
}

export default function TeamAccordion({ members }: { members: Item[] }) {
  return (
    <div className="team-accordion">
      {members.map((item, i) => (
        <details key={i} className="team-accordion-item" open={i === 0}>
          <summary className="team-accordion-summary">
            <span className="team-accordion-name">
              {item.name && <RichText data={item.name} />}
            </span>
            <span className="team-accordion-chevron" aria-hidden="true" />
          </summary>
          {item.description && (
            <div className="team-accordion-bio">
              <div className="team-accordion-bio-inner">
                <RichText data={item.description} />
              </div>
            </div>
          )}
        </details>
      ))}
      <AccordionController />
    </div>
  )
}
