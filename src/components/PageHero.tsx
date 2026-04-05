type PageHeroProps = {
  title: string
  hideRule?: boolean
}

export default function PageHero({ title, hideRule }: PageHeroProps) {
  return (
    <div className="page-hero">
      <h1 className="page-hero-title">{title}</h1>
      {!hideRule && <hr />}
    </div>
  )
}
