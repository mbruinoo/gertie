type PageHeroProps = {
  title: string
}

export default function PageHero({ title }: PageHeroProps) {
  return (
    <div className="page-hero">
      <h1 className="page-hero-title">{title}</h1>

    </div>
  )
}
