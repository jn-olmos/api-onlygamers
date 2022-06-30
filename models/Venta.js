const { Schema, model } = require('mongoose');

const ventaSchema = new Schema({
	id: String,
	nombreProducto: String,
	montoFactura: Number,
	tipoDeBoleta: String,
	categoria: String,
});

ventaSchema.set('toJSON', {
	transform: (documento, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Venta = model('Venta', ventaSchema);
module.exports = Venta;
