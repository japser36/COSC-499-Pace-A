import PendingMatches from '../../../../components/UserDisplays/PendingMatches'
import { server } from '../../../../config'

const Pending = ({ pendingmatches }) => {
  pendingmatches = JSON.parse(pendingmatches).rows
  return (
    <>
      {pendingmatches.length === 0 ? (
        <>TODO: display something when mentor has no pending matches</>
      ) : (
        <PendingMatches pendingmatches={pendingmatches} />
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  let pendingmatches = []
  await fetch(`${server}/api/pendingmatches/${context.params.id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => (pendingmatches = res))
  return {
    props: {
      pendingmatches: JSON.stringify(pendingmatches),
    },
  }
}

export default Pending
