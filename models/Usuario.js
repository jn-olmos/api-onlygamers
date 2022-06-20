const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const usuarioSchema = new Schema({
	id: String,
	apellido: String,
	nombre: String,
	nickname: String,
	password: String,
	email: String,
	imagen: String,
})

usuarioSchema.set('toJSON', {
	transform: (documento, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Usuario = model('Usuario', usuarioSchema)
module.exports = Usuario
