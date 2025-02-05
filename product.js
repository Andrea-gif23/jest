let products = [];
let id = 0;

function resetProducts() {
    products = [];
    id = 0;
}

function addProduct(name, price) {
    if (!name || price === undefined) {
        throw new Error("Nombre y precio son obligatorios.");
    }

    const exists = products.some(producto => producto.name === name);
    if (exists) {
        throw new Error("El producto ya existe.");
    }

    const nuevoProducto = { id: ++id, name, price };
    products.push(nuevoProducto);
    return nuevoProducto;
}

function removeProduct(productId) {
    const index = products.findIndex(producto => producto.id === productId);
    if (index === -1) {
        throw new Error("Producto no encontrado.");
    }
    products.splice(index, 1);
}

function getProducts() {
    return products;
}

function getProduct(productId) {
    const producto = products.find(producto => producto.id === productId);
    if (!producto) {
        throw new Error("Producto no encontrado.");
    }
    return producto;
}

function updateProduct(productId, name, price) {
    const producto = products.find(producto => producto.id === productId);
    if (!producto) {
        throw new Error("Producto no encontrado.");
    }

    if (name !== undefined) producto.name = name;
    if (price !== undefined) producto.price = price;

    return producto;
}

module.exports = { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct };
