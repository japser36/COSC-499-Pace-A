import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'Capstone Pace A'

function renderTitle(title = ''): string {
  return title ? `${title} | ${siteTitle}` : siteTitle
}

export default function Layout({
  children,
  home,
  title = '',
}: {
  children: React.ReactNode
  home?: boolean
  title?: string
}) {
  const fullTitle = renderTitle(title)
  return (
    <div className={styles.container}>
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
        {home ? (
          <>
            <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <h1 className={utilStyles.headingLg}>{siteTitle}</h1>
              </a>
            </Link>
            <h2 className={utilStyles.heading2Xl}>{title}</h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
