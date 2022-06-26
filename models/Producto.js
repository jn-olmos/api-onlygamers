const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
	id: String,
	nombre: String,
	descripcion: String,
	categoria: String,
	precio: Number,
	descuento: Boolean,
	stock: Number,
	stockMinimo: Number,
});

productoSchema.set('toJSON', {
	transform: (documento, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Producto = model('Producto', productoSchema);
module.exports = Producto;
