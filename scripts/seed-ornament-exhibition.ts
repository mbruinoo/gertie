// pnpm tsx scripts/seed-ornament-exhibition.ts

const BASE = 'http://localhost:3000'

const t = (text: string, format = 0) => ({
  type: 'text', text, format, style: '', mode: 'normal', detail: 0, version: 1,
})
const italic = (text: string) => t(text, 2)
const para = (...children: any[]) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
  children,
})
const richText = (...paragraphs: any[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, children: paragraphs },
})

const description = richText(
  para(t('Ornament & Information presents a group of artists who have lived and worked in either Chicago or Vienna. Across divergent and intersecting practices, the exhibition acts as the set for an ensemble posing the question of ornamentation\u2019s value and existence today, along with the architectural, economic, and social concerns that attend to it.')),
  para(t('Traceable to the late nineteenth century and continuing to this day, there has been a largely unremarked upon reciprocating influence between Chicago and Vienna. This ideational pipeline has never been of a one-to-one nature; rather, it is a product of certain intellectual developments from one city being then synthesized and transcended by the other.')),
  para(t('During his three-year stay in the United States, Viennese architect Adolf Loos absorbed many of the ideas that would later emerge in his 1913 treatise \u201c'), italic('Ornament and Crime'), t('\u201d which called for architects to reject decorative motifs while focusing on a building\u2019s structure and spatial experience instead. While visiting Chicago, he studied Louis Sullivan\u2019s buildings and critical writings with lasting effect. In 1922, he would revisit Chicago with a finalist, but ultimately rejected, entry to the Chicago Tribune\u2019s Tower competition. His submission, a skyscraper shaped like a Doric column, was a cheeky nod to the columns of a paper but also a tongue-in-cheek critique of the tension between form, function, and aesthetics. Loos\u2019s brand of pared-back modernism would heavily influence Bauhaus architects who fled European fascism, particularly Ludwig Mies van der Rohe, who would settle in Chicago, redefining the birthplace of the skyscraper.')),
  para(t('Concurrently, during the mid-century, the economists Friedrich Hayek and Milton Friedman\u2019s hyper-individualist and free-market orthodoxies began to gain institutional support in Cold War Austria and America, laying the early groundwork for what would become known as neoliberalism. Where International-style architecture often limited ornament to muted but sumptuous material choices, the economic liberalism of the 20th century used austere means to yield decadent profits. At the heart of all these historical phenomena is a sublimation of excess and a curious absence\u2014or reconfiguration\u2014of the human body, rethought and repurposed within an ever-shifting modern world.')),
  para(t('In the economic and architectural doctrines of the 20th century, the means justify the ends. Perhaps this explains why ornamentation, while still present, became an outdated conversation. In a society that prioritizes results, what good is something that is purely an end for its own sake? Across the exhibition, we see that \u201cornament\u201d has beef with itself. Is it like Loos or Mies\u2019s buildings: decadence packaged as austerity, or is it like Chicago\u2019s very own \u201cVienna Beef\u201d hot dog: austerity made from excess? What roots both strategies firmly in the vocabulary of ornament is their indifference to productivity or usefulness; they are themselves for their own sake.')),
)

async function main() {
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@bruinooge.net', password: 'vvwDEsWqLeim9onPDi7XCnXz' }),
  })
  const { token } = await loginRes.json() as any
  if (!token) throw new Error('Login failed')

  const res = await fetch(`${BASE}/api/exhibitions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({
      title: 'Ornament & Information',
      slug: 'ornament-and-information',
      status: 'upcoming',
      dateStart: '2026-04-10T00:00:00.000Z',
      dateEnd: '2026-07-19T00:00:00.000Z',
      venue: 'Chicago Cultural Center',
      description,
      artists: [
        { name: 'Anna Sophie Berger' },
        { name: 'Gaylen Gerber' },
        { name: 'Max Guy' },
        { name: 'Benjamin Hirte' },
        { name: 'Devin T. Mays' },
        { name: 'Isabelle Frances McGuire' },
        { name: 'B. Ingrid Olson' },
        { name: 'Walter Pichler' },
        { name: 'Micah Schippa Wildfong' },
        { name: 'Nora Schultz' },
        { name: 'Josef Strau' },
        { name: 'Miriam Stoney' },
        { name: 'Valentina Triet' },
        { name: 'Heimo Zobernig' },
      ],
    }),
  })
  const data = await res.json() as any
  if (!data.doc) throw new Error(JSON.stringify(data))
  console.log(`Created: "${data.doc.title}" (id: ${data.doc.id}, slug: ${data.doc.slug})`)
}

main().catch(e => { console.error(e); process.exit(1) })
