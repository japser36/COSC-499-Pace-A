import Head from 'next/head'
import UtilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'

export default function Calendar() {
  return (
    <Layout title="Calendar">
      <h1 className={UtilStyles.headingXl}>This is a calendar!</h1>
      <p>woo</p>
    </Layout>
  )
}
