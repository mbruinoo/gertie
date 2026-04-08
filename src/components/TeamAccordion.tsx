import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import AccordionController from './AccordionController'

type Item = {
  name?: SerializedEditorState | null
  description?: SerializedEditorState | null
  imageUrl?: string | null
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
          {(item.description || item.imageUrl) && (
            <div className="team-accordion-bio">
              <div className="team-accordion-bio-inner">
                {item.description && <RichText data={item.description} />}
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt=""
                    style={{ width: 'auto', height: 'auto', maxHeight: '40svh', display: 'block', marginTop: '24px' }}
                  />
                )}
              </div>
            </div>
          )}
        </details>
      ))}
      <AccordionController />
    </div>
  )
}
