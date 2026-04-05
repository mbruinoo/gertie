import { getPayload } from 'payload'
import config from '@payload-config'
import ExhibitionsCoverGrid from '@/components/ExhibitionsCoverGrid'

export default async function ExhibitionsPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'exhibitions',
    where: { _status: { equals: 'published' } },
    limit: 20,
    draft: false,
  }).catch(() => null)

  const exhibitions = (result?.docs ?? []) as any[]

  return <ExhibitionsCoverGrid exhibitions={exhibitions} />
}
