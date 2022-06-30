const { Schema, model } = require('mongoose');

const facturaSchema = new Schema({
	id: String,
	datosProductos: Object,
	datosUsuarios: Object,
});

facturaSchema.set('toJSON', {
	transform: (documento, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Factura = model('Factura', facturaSchema);
module.exports = Factura;
