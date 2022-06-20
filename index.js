require('dotenv').config()
require('./conectarDB')

const express = require('express')
const cors = require('cors')
const app = express()
const Producto = require('./models/Producto')
const Usuario = require('./models/Usuario')

app.use(cors())
app.use(express.json())

//
// http root

app.get('/', (req, res) => {
	res.send(`
    <body style="font-family:Open Sans,sans-serif">
      <h1>OnlyGamers! API</h1>
      <p>Ir a <a href="http://localhost:3018/api">/api</a> para descripcion</p>  
    </body>
    `)
})

app.get('/api', (req, res) => {
	res.send(`
  <body style="font-family:Open Sans,sans-serif">
    <h1>OnlyGamers! API</h1>
    <p><a href="http://localhost:3018/api/productos">/productos</a></p>  
    <p><a href="http://localhost:3018/api/usuarios">/usuarios</a></p>  
  </body>
  `)
})

//
// http methods

app.get('/api/productos', (req, res) => {
	Producto.find({}).then((productos) => {
		res.json(productos)
	})
})

app.get('/api/usuarios', (req, res) => {
	Usuario.find({}).then((usuarios) => {
		res.json(usuarios)
	})
})

// Apertura
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server iniciado en puerto ${PORT}`)
})
