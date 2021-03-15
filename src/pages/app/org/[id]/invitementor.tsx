import MentorInvite from '../../../../components/Inputs/MentorInvite'

const InviteMentor = ({ org_id }) => {
  return <MentorInvite org_id={org_id} />
}

export async function getServerSideProps(context) {
  return {
    props: {
      org_id: context.params.id,
    },
  }
}

export default InviteMentor
