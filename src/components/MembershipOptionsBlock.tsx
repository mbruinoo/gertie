type Card = {
  cardType: string
  tagline?: string
  tierName?: string
  price?: string
  ctaLabel?: string
  ctaUrl?: string
  ctaStyle?: 'filled' | 'outline'
  perks?: { text: string; id?: string }[]
}

export default function MembershipOptionsBlock({ cards }: { cards: Card[] }) {
  return (
    <section className="page-section membership-options-section">
      <div className="page-section-label">
        <p>Membership Options</p>
      </div>
      <div className="page-section-body membership-cards">
        {cards.map((card, i) => (
          <div key={i} className="membership-card">
            <h6 className="membership-card-header">
              <strong>{card.cardType}</strong>
              {card.tagline && <><br />{card.tagline}</>}
            </h6>
            {card.tierName && <p className="membership-tier-name">{card.tierName}</p>}
            {card.price && (
              <p className="membership-tier-price"><code>{card.price}</code></p>
            )}
            {card.ctaLabel && card.ctaUrl && (
              <a
                href={card.ctaUrl}
                className={`membership-cta membership-cta--${card.ctaStyle ?? 'filled'}`}
              >
                {card.ctaLabel}
              </a>
            )}
            {card.perks && card.perks.length > 0 && (
              <ul className="membership-perks">
                {card.perks.map((perk, j) => (
                  <li key={j}>{perk.text}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
