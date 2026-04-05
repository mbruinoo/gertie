type FooterProps = {
  klaviyoEmbedCode?: string
  instagramUrl?: string
  copyrightText?: string
  privacyPolicyPdfUrl?: string
  contactEmail?: string
}

export default function SiteFooter({
  klaviyoEmbedCode,
  instagramUrl = 'https://instagram.com/gertie.co',
  copyrightText = `Gertie is a cultural agency in Chicago. Copyright © ${new Date().getFullYear()} Mama Gertie, LLC. All rights reserved.`,
  privacyPolicyPdfUrl,
  contactEmail = 'chanelle@gertie.co',
}: FooterProps) {
  return (
    <footer className="site-footer">
      {/* Copyright */}
      <div className="site-footer-copyright">
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '18px' }}>{copyrightText}</p>
      </div>

      {/* Links */}
      <div className="site-footer-links">
        {[
          { label: 'Instagram', href: instagramUrl },
          { label: 'Terms of Use', href: privacyPolicyPdfUrl ?? '#' },
          { label: 'Privacy Policy', href: privacyPolicyPdfUrl ?? '#' },
          { label: 'Contact Us', href: `mailto:${contactEmail}` },
          { label: 'Press Inquiries', href: `mailto:${contactEmail}` },
        ].map((link) => (
          <a key={link.label} href={link.href} className="footer-link">
            {link.label}
          </a>
        ))}
      </div>

      {/* Klaviyo embed */}
      <div className="site-footer-klaviyo">
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
