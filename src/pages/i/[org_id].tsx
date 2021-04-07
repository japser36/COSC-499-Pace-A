import UserSignUp from '../../components/SignIn/UserSignUp'
import { Box, Container } from '@material-ui/core'
import styles from '../../components/layout.module.css'
import { getOrg } from '../../utils/api'

const MenteeSignUp = (props) => {
  const org = JSON.parse(props.org)

  return (
    <Box className={styles.containerPage}>
      <Container className={styles.container}>
        <UserSignUp usertype="mentee" org_id={org.id} org_name={org.org_name} />
      </Container>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const org = await getOrg(context.params.org_id)
  return {
    props: {
      org: JSON.stringify(org),
    },
  }
}

export default MenteeSignUp
