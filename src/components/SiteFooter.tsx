type FooterProps = {
  klaviyoEmbedCode?: string
  instagramUrl?: string
  copyrightText?: string
}

export default function SiteFooter({
  klaviyoEmbedCode,
  instagramUrl = 'https://instagram.com/gertie.co',
  copyrightText = `Gertie is a cultural agency in Chicago. Copyright © ${new Date().getFullYear()} Mama Gertie, LLC. All rights reserved.`,
}: FooterProps) {
  return (
    <footer
      style={{
        zIndex: 1,
        paddingTop: 'var(--padding)',
        paddingRight: 'var(--padding)',
        paddingLeft: 'var(--padding)',
        paddingBottom: 'calc(var(--padding) * 3)',
        columnGap: 'var(--padding)',
        rowGap: 'var(--padding)',
        display: 'grid',
        gridTemplate: '"Area Area-3 Area-3 Area-3" "Area-2 Area-3 Area-3 Area-3" / 1fr 1fr 1fr 1fr',
      }}
    >
      {/* Copyright */}
      <div style={{ gridArea: 'Area', fontSize: '14px', lineHeight: '18px', maxWidth: '220px' }}>
        <p style={{ margin: 0 }}>{copyrightText}</p>
      </div>

      {/* Links */}
      <div style={{ gridArea: 'Area-2' }}>
        {[
          { label: 'Instagram', href: instagramUrl },
          { label: 'Terms of Use', href: '#' },
          { label: 'Privacy Policy', href: '#' },
          { label: 'Contact Us', href: '#' },
          { label: 'Press Inquiries', href: '#' },
        ].map((link) => (
          <h6 key={link.label} style={{ margin: '0 0 4px', fontWeight: 700 }}>
            <a href={link.href} style={{ color: 'inherit', textDecoration: 'none' }}>
              {link.label}
            </a>
          </h6>
        ))}
      </div>

      {/* Klaviyo embed */}
      <div style={{ gridArea: 'Area-3' }}>
        {klaviyoEmbedCode ? (
          <div
            style={{ marginLeft: '-10px' }}
            dangerouslySetInnerHTML={{ __html: klaviyoEmbedCode }}
          />
        ) : (
          <div className="klaviyo-form-Tq34Wp" style={{ marginLeft: '-10px' }} />
        )}
      </div>
    </footer>
  )
}
