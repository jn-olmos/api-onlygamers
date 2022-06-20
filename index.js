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
// Http root

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
// Http methods

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

app.get('/api/productos/:id', (req, res, next) => {
	const { id } = req.params

	Producto.findById(id)
		.then((producto) => {
			producto ? res.send(producto) : res.status(404).end()
		})
		.catch((error) => {
			next(error)
		})
})

app.get('/api/usuarios/:id', (req, res, next) => {
	const { id } = req.params

	Usuario.findById(id)
		.then((usuario) => {
			usuario ? res.send(usuario) : res.status(404).end()
		})
		.catch((error) => {
			next(error)
		})
})

app.post('/api/productos', (req, res, next) => {
	const producto = req.body

	if (!producto) {
		return res.status(400).json({ error: 'No hay contenido en producto' })
	}

	const newProducto = new Producto({
		descripcion: producto.descripcion,
		precio: producto.precio,
		stock: producto.stock,
		descuento: producto.descuento,
		foto: producto.foto,
	})

	newProducto.save().then((savedProducto) => {
		res.json(savedProducto)
	})
})

//TODO: FALTA POST USUARIOS

app.put('/api/productos/:id', (req, res, next) => {
	const { id } = req.params

	const producto = req.body

	if (!producto) {
		return res.status(400).json({ error: 'No hay contenido en producto' })
	}

	const newProductoData = {
		descripcion: producto.descripcion,
		precio: producto.precio,
		stock: producto.stock,
		descuento: producto.descuento,
		foto: producto.foto,
	}

	Producto.findByIdAndUpdate(id, newProductoData)
		.then(() => {
			res.status(200).end()
		})
		.catch((error) => {
			next(error)
		})
})

//TODO: FALTA PUT USUARIOS

app.delete('/api/productos/:id', (req, res, next) => {
	const { id } = req.params

	Producto.findByIdAndDelete(id)
		.then(() => {
			res.status(200).end()
		})
		.catch((error) => {
			next(error)
		})
})

//
// Manejo de error

app.use((error, req, res, next) => {
	console.log(error.name)

	if (error.name === 'CastError') {
		res.status(400).send({ error: 'ID utilizado esta mal formateado' })
	} else {
		res.status(500).end()
	}
})

//TODO: FALTA DELETE USUARIOS

//
// Apertura
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server iniciado en puerto ${PORT}`)
})

//TODO: Deploy en HEROKU
