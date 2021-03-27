import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Header from './Header/Header'
import { Container, Box } from '@material-ui/core'
import NoAuthCard from './NoAuthCard'

export const siteTitle = 'Mentor.io'

function renderTitle(title = ''): string {
  return title ? `${title} | ${siteTitle}` : siteTitle
}

export default function Layout({ children, title = '', auth, needsAuth=false, usertype = ''}: { children: React.ReactNode; title?: string; auth: boolean; needsAuth?: boolean; usertype?: string }) {
  const fullTitle = renderTitle(title)
  return (
    <div className={styles.containerPage}>
      <Head>
        <meta name="description" content={`${fullTitle} - COSC 499 Project`} />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            fullTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={fullTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{fullTitle}</title>
      </Head>
      <header className={styles.header}>
        <Header auth={auth} usertype={usertype}/>
      </header>
      <main>
        <Box component={Container} className={styles.container} overflow='auto'>
          {needsAuth && !auth ? <NoAuthCard /> 
          : <>{children}</>}
        </Box>
      </main>
    </div>
  )
}
