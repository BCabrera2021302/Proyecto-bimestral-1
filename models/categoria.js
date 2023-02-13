const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligario']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligario']
    }
});

module.exports = model('Categoria', CategoriaSchema);