const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Categoria = require('../models/categoria');


const getCategoria = async(req = request, res = response) => {
    //Condicion, me busca solo los usuarios que tengan estado true
    

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ]);

    res.json({
        msg: 'GET API de categoria',
        listaCategoria
    });

}

const postCategoria = async(req = request, res = response) => {

    const { nombre, precio}  = req.body;
    const categoriaDB = new Categoria({nombre, precio});

    //Encriptar password
    /*const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync( password, salt);*/
    
    //Guardar en Base de datos
    await categoriaDB.save();

    res.json({
        msg: 'POST API de categoria',
        categoriaDB
    });

}

const putCategoria= async(req = request, res = response) => {

    const { id } =  req.params;

    // Ingnoramos el _id, rol, estado y google al momento de editar y mandar la peticion en el req.body
    const {_id, ...resto} = req.body;

    //editar y guardar
    const categoriaEditada = await Categoria.findByIdAndUpdate(id,resto)

    res.json({
        msg: 'PUT API de categoria',
        categoriaEditada
    });

}



const deleteCategoria = async(req = request, res = response) => {

    const { id } =  req.params;

    //eliminar y guardar
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    //Otra forma de eliminar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json({
        msg: 'DELETE API de Categoria',
        categoriaEliminada
    });

}



module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}