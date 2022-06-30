require('dotenv').config();
require('./conectarDB');

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
const Factura = require('./models/Factura');
const Venta = require('./models/Venta');

app.use(cors());
app.use(express.json());

//
// Http root

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/templates/root.html'));
});

app.get('/api', (req, res) => {
	res.sendFile(path.join(__dirname, './public/templates/main.html'));
});

// MODULO DE PRODUCTOS

app.get('/api/productos', (req, res) => {
	Producto.find({}).then((productos) => {
		res.json(productos);
	});
});

app.get('/api/usuarios', (req, res) => {
	Usuario.find({}).then((usuarios) => {
		res.json(usuarios);
	});
});

app.get('/api/productos/:id', (req, res, next) => {
	const { id } = req.params;

	Producto.findById(id)
		.then((producto) => {
			producto ? res.send(producto) : res.status(404).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.get('/api/usuarios/:id', (req, res, next) => {
	const { id } = req.params;

	Usuario.findById(id)
		.then((usuario) => {
			usuario ? res.send(usuario) : res.status(404).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.post('/api/productos', (req, res, next) => {
	const { nombre, descripcion, categoria, stock, stockMinimo, compra, iva, utilidad, venta } =
		req.body;

	if (!req.body) {
		return res.status(400).json({ error: 'No hay contenido en producto' });
	}

	const newProducto = new Producto({
		nombre,
		descripcion,
		categoria,
		stock,
		stockMinimo,
		compra,
		iva,
		utilidad,
		venta,
	});

	newProducto
		.save()
		.then((savedProducto) => {
			res.json(savedProducto);
		})
		.catch((error) => {
			next(error);
		});
});

app.post('/api/usuarios', (req, res, next) => {
	const usuario = req.body;

	if (!usuario) {
		return res.status(400).json({ error: 'No hay contenido en usuario' });
	}

	const newUsuario = new Usuario({
		apellido: usuario.apellido,
		nombre: usuario.nombre,
		nickname: usuario.nickname,
		password: usuario.password,
		email: usuario.email,
		telefono: usuario.telefono,
	});

	newUsuario
		.save()
		.then((savedUsuario) => {
			res.json(savedUsuario);
		})
		.catch((error) => {
			next(error);
		});
});

app.put('/api/productos/:id', (req, res, next) => {
	const { id } = req.params;

	const producto = req.body;

	if (!producto) return res.status(400).json({ error: 'No hay contenido en producto' });

	const newProductoData = {
		id: producto.id,
		nombre: producto.nombre,
		descripcion: producto.descripcion,
		categoria: producto.categoria,
		stock: producto.stock,
		stockMinimo: producto.stockMinimo,
		compra: producto.compra,
		iva: producto.iva,
		utilidad: producto.utilidad,
		venta: producto.venta,
	};

	Producto.findByIdAndUpdate(id, newProductoData)
		.then(() => {
			res.status(200).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.put('/api/usuarios/:id', (req, res, next) => {
	const { id } = req.params;

	const usuario = req.body;

	if (!usuario) {
		return res.status(400).json({ error: 'No hay contenido en usuario' });
	}

	const newUsuarioData = {
		apellido: usuario.apellido,
		nombre: usuario.nombre,
		nickname: usuario.nickname,
		password: usuario.password,
		email: usuario.email,
		telefono: usuario.telefono,
	};

	Usuario.findByIdAndUpdate(id, newUsuarioData)
		.then(() => {
			res.status(200).end();
		})
		.catch(() => {
			next(error);
		});
});

app.delete('/api/productos/:id', (req, res, next) => {
	const { id } = req.params;

	Producto.findByIdAndDelete(id)
		.then(() => {
			res.status(200).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.delete('/api/usuarios/:id', (req, res, next) => {
	const { id } = req.params;

	Usuario.findByIdAndDelete(id)
		.then(() => {
			res.status(200).end();
		})
		.catch((error) => {
			next(error);
		});
});

// MODULO DE VENTAS

app.get('/api/facturas', (req, res) => {
	Factura.find({}).then((facturas) => {
		res.json(facturas);
	});
});

app.post('/api/facturas', (req, res, next) => {
	const { datosUsuario } = req.body;

	console.log('\nresultado de req.body');
	console.log(req.body);

	if (!req.body) {
		return res.status(400).json({ error: 'No hay contenido en factura' });
	}

	const newFactura = new Factura({
		datosUsuario: datosUsuario,
	});

	console.log('\nresultado de newFactura');
	console.log(newFactura);

	newFactura
		.save()
		.then((savedFactura) => {
			res.json(savedFactura);
		})
		.catch((error) => {
			next(error);
		});
});

// app.put('/api/usuarios/:id', (req, res, next) => {
// 	const { id } = req.params;

// 	const usuario = req.body;

// 	if (!usuario) {
// 		return res.status(400).json({ error: 'No hay contenido en usuario' });
// 	}

// 	const newUsuarioData = {
// 		apellido: usuario.apellido,
// 		nombre: usuario.nombre,
// 		nickname: usuario.nickname,
// 		password: usuario.password,
// 		email: usuario.email,
// 		telefono: usuario.telefono,
// 	};

// 	Usuario.findByIdAndUpdate(id, newUsuarioData)
// 		.then(() => {
// 			res.status(200).end();
// 		})
// 		.catch(() => {
// 			next(error);
// 		});
// });

//
// Manejo de error

app.use((error, req, res, next) => {
	console.log(error.name);

	if (error.name === 'CastError') {
		res.status(400).send({ error: 'ID utilizado esta mal formateado' });
	} else {
		res.status(500).end();
	}
});

//
// Apertura
const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
	console.log(`Server iniciado en puerto: ${PORT}`);
});
