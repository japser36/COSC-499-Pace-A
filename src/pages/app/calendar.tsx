import Head from 'next/head'
import UtilStyles from '../../styles/utils.module.css'

export default function Calendar() {
    return (
        <>
            <Head>
                <title>Calendar!</title>
            </Head>
            <h1 className={UtilStyles.headingXl}>This is a calendar!</h1>
            <p>woo</p>
        </>
    )
}
