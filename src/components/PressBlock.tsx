const pressItems = [
  {
    image: '/media/press/press-artnews.webp',
    title: 'In an Uncertain Market, Chicago\'s Art Scene Offers a Beacon of Hope for Artists and Gallerists Alike',
    publication: 'ARTnews',
    url: 'https://www.artnews.com/art-news/news/chicago-gallery-weekend-dealers-artists-collaborate-1234754476/',
  },
  {
    image: '/media/press/press-artnet.webp',
    title: 'Chicago\'s \u2018Triumphant\u2019 Exhibition Weekend Is a Bright Light in a Challenging Moment',
    publication: 'Artnet News',
    url: 'https://news.artnet.com/art-world/chicago-exhibition-weekend-2693148',
  },
  {
    image: '/media/press/press-familystyle.avif',
    title: 'Walk the Walk',
    publication: 'Family Style',
    url: 'https://www.family.style/art/abby-pucker-gertie-chicago-exhibition-weekend-2025',
  },
  {
    image: '/media/press/press-newcity.jpg',
    title: 'Today In Culture: A History Of Chicago Conceptual Art',
    publication: 'Newcity',
    url: 'https://www.newcity.com/2025/09/23/today-in-culture-tuesday-september-23-2025-a-history-of-chicago-conceptual-art-dogs-in-chicago-restaurants-port-of-entry-returns-to-albany-park/',
  },
]

export default function PressBlock() {
  return (
    <section className="page-section">
      <div className="page-section-label">
        <h5>Press</h5>
      </div>
      <div className="press-grid">
        {pressItems.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="press-tile"
          >
            <div className="press-tile-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} />
            </div>
            <p className="press-tile-title">{item.title}</p>
            <p className="press-tile-publication">{item.publication}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
