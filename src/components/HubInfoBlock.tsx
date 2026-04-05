export default function HubInfoBlock({
  address,
  hours,
}: {
  address?: string | null
  hours?: string | null
}) {
  return (
    <section className="page-section hub-info-section">
      <div className="page-section-label" />
      <div className="page-section-body">
        <div className="hub-info-grid">
          {address && (
            <div>
              <h5 className="hub-info-label">Address</h5>
              <p className="hub-info-value" style={{ whiteSpace: 'pre-line' }}>{address}</p>
            </div>
          )}
          {hours && (
            <div>
              <h5 className="hub-info-label">Hours</h5>
              <p className="hub-info-value" style={{ whiteSpace: 'pre-line' }}>{hours}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
