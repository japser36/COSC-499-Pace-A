import Link from 'next/link'

export default function Home() {
	return (
		<>
			<h1>Hello world!</h1>
			<Link href="/app/calendar">
				<a>Check out the calendar now.</a>
			</Link>
		</>
	)
}
