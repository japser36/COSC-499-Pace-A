import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const { orgid } = router.query
  return (
    <>
      <p>TODO: Build iframe contents! {orgid}</p>
    </>
  )
}
