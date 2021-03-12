import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Header from './Header/Header'
import { Container } from '@material-ui/core'

export const siteTitle = 'Mentor.io'

function renderTitle(title = ''): string {
  return title ? `${title} | ${siteTitle}` : siteTitle
}

export default function Layout({ children, title = '' }: { children: React.ReactNode; title?: string }) {
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
        <Header />
      </header>
      <main>
        <Container className={styles.container}>{children}</Container>
      </main>
    </div>
  )
}
