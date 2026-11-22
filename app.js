const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los métodos de la API
// ============================================================

// POST - Crear nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body
    if (nombre == null || nombre === '' || descripcion == null || descripcion === '' || precio == null || precio === '') {
        return res.status(400).json({ mensaje: 'Nombre, descripcion y precio son obligatorios' })
    }
    const precioNumero = parseFloat(precio)
    if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
        return res.status(400).json({ mensaje: 'El precio debe ser un numero mayor que cero' })
    }
    const id = productos.reduce((maximo, p) => Math.max(maximo, p.id), 0) + 1
    const nuevoProducto = { id, nombre, descripcion, precio: precioNumero }
    productos.push(nuevoProducto)
    return res.status(201).json(nuevoProducto)
})


// PUT - Actualizar producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    const { nombre, descripcion, precio } = req.body
    if (nombre == null || nombre === '' || descripcion == null || descripcion === '' || precio == null || precio === '') {
        return res.status(400).json({ mensaje: 'Nombre, descripcion y precio son obligatorios' })
    }
    const precioNumero = parseFloat(precio)
    if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
        return res.status(400).json({ mensaje: 'El precio debe ser un numero mayor que cero' })
    }
    productos[indice] = { id, nombre, descripcion, precio: precioNumero }
    return res.status(200).json(productos[indice])
})


// DELETE - Eliminar producto existente
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    const [productoEliminado] = productos.splice(indice, 1)
    return res.status(200).json({ mensaje: 'Producto eliminado', producto: productoEliminado })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
