export {} //this is to satisfy TypeScript which requires that each file be a module
// import pg from 'pg'
// const dbClient = pg.createClient()

// export default (req, res) => {
//     const q = db.query('SELECT * FROM blah WHERE ...')

//     res.status(200).json({ text: 'Pong!', data: q })
// }

// commented out because lack of pg module was preventing build during workflow.
