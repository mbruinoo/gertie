// Run: pnpm tsx scripts/seed-labels.ts

const BASE = 'http://localhost:3000'

// Lexical richText helpers
const t = (text: string, format = 0) => ({
  type: 'text', text, format, style: '', mode: 'normal', detail: 0, version: 1,
})
const italic = (text: string) => t(text, 2)
const br = () => ({ type: 'linebreak', version: 1 })
const para = (...children: any[]) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
  children,
})
const richText = (...paragraphs: any[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, children: paragraphs },
})

const labels = [
  {
    artistName: 'Wendy Jacob',
    content: richText(
      para(italic('Untitled'), t(', 1988'), br(), t('Rubber, fans, and timing motors'), br(), t('Courtesy of the artist')),
      para(t('A cluster of black crescent moons sprawl across the floor, subtly expanding and contracting with air. These are the inner tubes of industrial trucks\' tires, which Wendy Jacob cut open and stitched back together into a new, sculptural form. Powered by vintage hairdryers, they routinely fill up with air, only to deflate moments again later. While each on unique timers, the tubes\' "breathing" rates are all based on the artist\'s own breathing patterns, recorded over an hour of uninterrupted sleep. As a low, cyclical hum fills the space, they rise and fall, recalling bodies at rest. If seemingly alive, they are both synthetic and biological, and yet, their visible wiring, running across the floor and ultimately tethered to a wall outlet, betrays how they are on a kind of life support.')),
      para(italic('Untitled'), t(' is the first of Jacob\'s '), italic('Breathing'), t(' series, in which she makes inert objects and architectural elements, including walls and ceiling, "breathe." Made while Jacob was an MFA candidate at the School of the Art Institute, '), italic('Untitled'), t(' was inspired in part by her move from Boston to Chicago for graduate school: she reflects, "Moving to Chicago from Boston for graduate school changed a lot of things for me. Everything about the city felt big: distances, buildings, the lake, the wide sky. Somehow that bigness and the toughness of the city made it feel like a place where you could carry out projects that would be impossible in other places, so I decided to try to animate an inert object with the action of breathing."')),
    ),
  },
  {
    artistName: 'Molly Zuckerman-Hartung',
    content: richText(
      para(italic('Notley'), t(', 2013'), br(), t('Latex housepaint, enamel, and spray paint on dropcloth, hinged in two attached parts'), br(), t('Courtesy of the artist and Corbett vs. Dempsey')),
      para(t('Before Molly Zuckerman-Hartung graduated from the School of the Art Institute of Chicago with an MFA in painting, she studied French language, literature, and philosophy in the Pacific Northwest. Steeped in the language of deconstruction, as well as the feminist punk underground movement known as Riot Grrrl, Zuckerman-Hartung synthesizes these sensibilities into a coherent system that approaches the potential of painterly abstraction as a rhetorical choice before it is a stylistic one.')),
      para(t('Patched, painted, and eviscerated, Zuckerman-Hartung\'s painting '), italic('Notley'), t(', titled after the late-American poet, Alice Notley, is an exercise in the affirmative power of refusal. The sprawling canvas consists of two distressed and conjoined units depicting a drolly serious declaration: "No." Where Notley regularly defied convention and circumvented the formal tendencies that she herself may have perfected in pursuit of the new—or even the archaic—Zuckerman-Hartung likewise continues to evade definition and predictability, solidifying her dedication to the poet, by way of their mutual commitment to evolution and iconoclasm.')),
    ),
  },
  {
    artistName: 'Dara Birnbaum',
    content: richText(
      para(italic('Tiananmen Square: Break-In Transmission'), t(', 1990'), br(), t('5 channel color video, 4 channels of stereo sound, surveillance switcher and custom-designed support system'), br(), t('Dimensions variable'), br(), t('Edition of 2 plus 1 AP'), br(), t('Collection of Glenstone Museum, courtesy of the estate of Dara Birnbaum and Marian Goodman Gallery')),
      para(t('Dara Birnbaum\'s '), italic('Tiananmen Square: Break in Transmission'), t(' made its Chicago debut at Rhona Hoffman Gallery in 1991, following a New York showing at Josh Baer Gallery the prior year. Portending a near future governed by competing economic, social, and political narratives relayed simultaneously on screen at every vantage point, Birnbaum\'s installation demonstrates how the tragedy of the 1989 Tiananmen Square protests was reduced to a delirious spectacle of passive viewership.')),
      para(t('With its tentacular array of four separate screens, playing appropriated footage at the moment the Chinese government cut off telecommunications, the installation prompts viewers to circulate through the differing streams of information while a wall-mounted television nearby futilely attempts to compose a coherent version of events by flipping through randomized clips of each video. Pieces of audio blare over one another, heightening a feeling of general uncertainty with tonal ambience, the voice of familiar news anchors, or the soaring melody of "The Wound of History," a song popularized in the aftermath of the protests. In depicting the transmission of information and its revocation, '), italic('Tiananmen Square: Break in Transmission'), t(' relegates the actuality of history to the margins, leaving viewers in the position of a double spectator—watching others watch hinted-at events unfold in real time.')),
    ),
  },
  {
    artistName: 'Rosemarie Trockel',
    content: richText(
      para(italic('Something of Tomorrow 2'), t(', 2008'), br(), t('Mixed media'), br(), t('26 3/4 x 22 3/4 x 2 in. (68 x 58 x 4.8 cm)'), br(), t('Courtesy of the artist and Sprüth-Magers')),
      para(italic('She is Dead 4'), t(', 2008'), br(), t('Mixed media'), br(), t('26 3/4 x 22 3/4 x 2 in. (68 x 58 x 4.8 cm)'), br(), t('Courtesy of the artist and Sprüth-Magers')),
      para(italic('Dutch Door'), t(', 2008'), br(), t('Mixed media'), br(), t('26 3/4 x 22 3/4 x 2 in. (68 x 58 x 4.8 cm)'), br(), t('Courtesy of the artist and Sprüth-Magers')),
      para(t('Rosemarie Trockel\'s three enigmatic collages are consistent with the artist\'s reputation as an elusive, if not recalcitrant, arbiter of meaning and its convolution. The dialed-in provisionality of the works on view is representative of Trockel\'s commitment to collage not as an act of accumulation, but a careful balance of giving and withholding. The pell-mell point-and-shoot photographs of '), italic('She is Dead 4'), t(' (part of a larger series shown alongside these works at Donald Young Gallery in 2008) hint at crime scene photography without any indication of violence, only a deadpan, if not morbidly amused, curiosity. Likewise, the two horizontal bands stapled into the ground of '), italic('Dutch Door'), t(' are simple exercises in line, weight, color, and volume, but hovering just in proximity to each other evokes the static of an interrupted signal. In addition to each work\'s general feeling of precise uncertainty is the miasmic wash of material on '), italic('Something of Tomorrow 2'), t(', which insouciantly admits its own metaphorical and physical impenetrability. Each composition is fronted by an oversized piece of plexiglas, riveted directly into the frame. The excess glazing creeps beyond the boundaries of the image plane, as if determined to incorporate its environment within the context of its content.')),
    ),
  },
  {
    artistName: 'Martin Puryear',
    content: richText(
      para(italic('Untitled'), t(', 1989'), br(), t('Bronze'), br(), t('Edition 1 of 5'), br(), t('Helyn Goldenberg and Michael Alper')),
      para(t('Perched on a white wall, as if surveying the exhibition, sits Martin Puryear\'s '), italic('Untitled'), t(', a bronze sculpture of a falcon. Puryear, who moved to Chicago in 1978 to teach at the University of Illinois, Chicago and worked with Donald Young Gallery for decades, has long been fascinated by falcons. Growing up, he read books, drew illustrations, and even, in hope of catching them one day, crafted hoods for them. While a lifelong interest, falcons are a recurring form particularly in Puryear\'s early sculptures, such as this one, which was made in 1989, one year before he left Chicago for upstate New York. There, in addition to continuing his artistic practice, he became a licensed falconer.')),
      para(t('Much has been theorized on Puryear\'s falcons, including that they signify power, majesty, freedom—and even the status of an artist. Another edition of '), italic('Untitled'), t(' was included in Puryear\'s 1990 solo exhibition '), italic('Connections'), t(' at MFA Boston, which considered the tensions between freedom and constraint through a large installation of a yurt alongside sculptures of falcons. Writing on the exhibition, curator, critic, and educator Judith Russi Kirshner proposed that the falcon, as a tamed bird of prey, has implicit analogies to the relationships among artist, artwork, and patrons. In a 1987 interview with the '), italic('Chicago Tribune'), t(' Puryear himself shared, "I\'m not interested in using words to prime the world\'s eyes to look at my work, but without getting too literal I think that all my work has an element of escape. Call it what you want: fantasy, escape, imagination, retreat. It is an idea of otherness."')),
    ),
    audioCaption: 'Listen to curator Gareth Kaye discuss Martin Puryear\'s Untitled (1989):',
    audioUrl: 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68cc99a95d9e85733c556e9d_IMG_7855%20(Martin%20Puryear).mp3',
  },
  {
    artistName: 'Tony Lewis',
    content: richText(
      para(italic('Untitled 5 (2015–)'), t(', 2025'), br(), t('Graphite on paper'), br(), t('Courtesy of the artist')),
      para(italic('Untitled 8 (2016–)'), t(', 2025'), br(), t('Graphite on paper'), br(), t('Courtesy of the artist')),
      para(t('Tony Lewis\'s floor drawings are specters of both exhibitions and artworks past. Each drawing is first conceived by covering a gallery floor with rolls of red butcher paper that are then coated with graphite powder. When subsequently exhibited, the drawings are reconstructed into new forms determined not by the artist but by the curator. With each iteration, the work both deteriorates and records its exhibition history, shedding graphite while accumulating visitors\' footprints, curators\' hands, and the inevitable tears.')),
      para(t('This presentation of '), italic('Untitled 5 (2015–)'), t(' summons its previous installation from Lewis\'s 2017 solo exhibition '), italic('Howling'), t(' at Shane Campbell Gallery, in which the artist cast his eye on the eerie bogeyman in the great Francisco de Goya y Lucientes\'s '), italic('Los Caprichos'), t('. Then, as now, '), italic('Untitled 5 (2015–)'), t(' emerges as an uncanny figure with cloak-like forms. Inside its graphite folds, though, this "bogeyman" now cradles another floor drawing: '), italic('Untitled 8 (2016–)'), t(', left wrapped as it was when we collected from the artist\'s studio.')),
    ),
  },
  {
    artistName: 'Gaylen Gerber',
    content: richText(
      para(italic('Backdrop/Over My Head: Encounters with Art in a Flyover City'), t(', n.d.'), br(), t('Background paper, aluminum push-pins'), br(), t('Dimensions vary with installation'), br(), t('Courtesy of the artist and Layr, Vienna')),
      para(t('The unassuming, architecturally scaled swaths of gray canvas and paper that make up Gaylen Gerber\'s series of '), italic('Backdrops'), t(' are as self-effacing as they are imposing. Frequently, Gerber has staged artworks by other artists on, or in proximity to, the '), italic('Backdrops'), t(', preempting a situation where his own authorship is at once recessive and enveloping. For this particular iteration, Gerber has eschewed the placement of other artworks directly upon his own work and opted instead to position the '), italic('Backdrop'), t(' as an inconspicuous ground against which the exhibition at large may unfold.')),
      para(t('Emerging a number of years after beginning this series on canvas, the paper '), italic('Backdrops'), t(' are a way to produce a similar effect by more economical means. By taking photographic backdrop paper and folding it in precise intervals at eighteen inches wide and seventy-two inches in height, Gerber creates a series of cells whose dimensions evoke a sense of bodily scale in relation to the work, the wall, and the volume of the exhibition space more generally. What appears at first as perhaps a pretense to neutrality belies the committed promiscuity of Gerber\'s practice, where boundaries between the numerous social and economic delineations that define artist, curator, author, self, and other are folded into form, loosely worn against the exhibition, akin to the paper\'s own pleating.')),
    ),
  },
  {
    artistName: 'Jordan Wolfson',
    content: richText(
      para(italic('Perfect Lover'), t(', 2007'), br(), t('Digital animation transferred to 16 mm film, color, sound; 3 min.'), br(), t('Edition of 3 plus 2 AP'), br(), t('Courtesy of the artist and Gagosian')),
      para(t('Jordan Wolfson\'s '), italic('Perfect Lover'), t(' consists of a CGI crow, endowed with a human voice, reciting the hours of the day against a series of alternating forested backgrounds. The crow\'s voice is matter-of-fact, counting from one o\'clock to noon and then from one o\'clock to midnight. Normally, the bird\'s temporal proclamations are linear, but as the film progresses, it begins to falter—skipping ahead, behind, or simply repeating itself. At two separate moments, it enigmatically announces the dates of March 12th and March 13th. The work\'s title, '), italic('Perfect Lover'), t(', is a clear reference to Felix Gonzalez-Torres\'s work, '), italic('Perfect Lovers'), t(', made with two adjoining clocks that eventually, by way of mechanical limitations, fall out of sync.')),
      para(t('Largely understood as a harbinger of misfortune, the crow appears to be an unreliable omen who is equally eager to skip forward in time or delay the inevitable for as long as possible. The crow\'s inconsistencies are forgivable, as the futile declarations of passing hours reveal themselves as effete handholds compared to the indifference of time.')),
      para(t('Of course, one needn\'t read into it all so deeply; perhaps we should simply be impressed that a crow can speak at all.')),
    ),
    audioCaption: 'Listen to curator Gareth Kaye discuss Jordan Wolfson\'s Perfect Lover (2007):',
    audioUrl: 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68cc99a917cdbbf47e9add9c_IMG_7856%20(Jordan%20Wolfson).mp3',
  },
  {
    artistName: 'Kay Rosen',
    content: richText(
      para(italic('Elvis, Elvis'), t(', 1994'), br(), t('Latex paint on wall'), br(), t('Dimensions variable'), br(), t('Courtesy of the artist and Krakow Witkin Gallery, Boston')),
      para(t('Kay Rosen\'s '), italic('Elvis, Elvis'), t(' pays tribute to its namesake, Elvis Presley, the great cultural icon whom many conspiracy theorists claim is still alive. In black, sign-painted letters, the work spells out E-L-V-I-S L-I-V-E-S in all caps against a pink backdrop of billboard scale. These two words, created from the same letters—a signature Rosen move, ring with humor and in resonance with popular lore. And so here, the King lives on, at least in language.')),
      para(italic('Elvis, Elvis'), t(' was originally presented as a mural on the exterior of the MCA Chicago\'s former building for the artist\'s 1994 solo exhibition, '), italic('Kay Rosen: Home on the Range'), t('. This presentation of the work retains that scale but moves inside. Suspended high within the gallery, it surveys an exhibition space filled with other works that subtly reference their own histories of display, sale, and creation. The joke still lands, but now, looming above us, '), italic('Elvis, Elvis'), t(' invites more serious questions about what continues to live on within this recollection of post-conceptual art in Chicago.')),
    ),
    audioCaption: 'Listen to curator Gareth Kaye discuss Kay Rosen\'s Elvis, Elvis (1994):',
    audioUrl: 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68cc99a767d844000ebbbbad_IMG_7858%20(1)%20(Kay%20Rosen).mp3',
  },
  {
    artistName: 'Rashid Johnson',
    content: richText(
      para(italic('Remembering D.B. Cooper'), t(', 2013'), br(), t('Five hand-marked wooden chairs, shea butter, plants, and burlap'), br(), t('Dimensions variable'), br(), t('Courtesy of the artist and Monique Meloche Gallery, Chicago')),
      para(t('On Thanksgiving Eve in 1971 an unidentified man hijacked a Boeing 727 flying out of Portland, Oregon. After successfully demanding $200,000 in ransom money, upon landing in Seattle, he parachuted into the wilderness and out of sight. Dubbed "D.B. Cooper" by the media, to this day he has never been found.')),
      para(t('Rashid Johnson, who counts freedom as one of his many mediums, titled his installation '), italic('Remembering D.B. Cooper'), t(' after this man of mystery and myth. First created for a 2013 solo presentation at moniquemeloche\'s "off the wall" series—where it lined the gallery\'s storefront windows—it has been reconfigured for this space, which similarly looks out onto the city. Composed of some of Johnson\'s most signature materials, this installation places Cooper\'s narrative of escape in conversation with gestures of care and domesticity: plants that need to be watered, hand-marked chairs implying rest, and blocks of shea butter that will eventually soften in the sun. If Cooper vanished without a trace, perhaps in this work Johnson imagines another kind of freedom, one premised not in literal escape but rather in the acts of care that sustain both our inner and outer worlds.')),
    ),
    audioCaption: 'Listen to curator Gareth Kaye discuss Rashid Johnson\'s Remembering D.B. Cooper (2013):',
    audioUrl: 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68cc99a9bc9801f6cd8a72c2_IMG_7859%20(2)%20(Rashid%20Johnson).mp3',
  },
]

async function main() {
  // Login
  const loginRes = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'agent@bruinooge.net', password: 'Ln11DoX0pFEFK316wQGGuZzt' }),
  })
  const { token } = await loginRes.json()
  if (!token) throw new Error('Login failed')

  // Find exhibition ID
  const listRes = await fetch(`${BASE}/api/exhibitions?limit=10`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const { docs } = await listRes.json()
  const exhibition = docs.find((e: any) => e.slug === 'over-my-head')
  if (!exhibition) throw new Error('Exhibition not found')

  // Patch labels
  const patchRes = await fetch(`${BASE}/api/exhibitions/${exhibition.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ labels }),
  })
  const result = await patchRes.json()
  if (!result.doc) throw new Error(JSON.stringify(result))
  console.log(`Seeded ${result.doc.labels?.length ?? 0} labels for "${result.doc.title}"`)
}

main().catch((e) => { console.error(e); process.exit(1) })
