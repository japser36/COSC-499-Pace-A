import pg from 'pg'
const dbClient = pg.createClient()

export default (req, res) => {
    const q = db.query('SELECT * FROM blah WHERE ...')

    res.status(200).json({ text: 'Pong!', data: q })
}
