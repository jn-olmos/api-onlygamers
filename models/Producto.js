const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const productoSchema = new Schema({
	id: String,
	descripcion: String,
	precio: Number,
	stock: Number,
	foto: String,
	descuento: Boolean,
})

productoSchema.set('toJSON', {
	transform: (documento, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Producto = model('Producto', productoSchema)
module.exports = Producto
