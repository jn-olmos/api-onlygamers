require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send(`
    <body style="font-family:Open Sans,sans-serif">
      <h3>OnlyGamers! API</h3>
      <p>Ir a <b>/tienda</b></p>  
    </body>
    `)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server iniciado en puerto ${PORT}`)
})
