const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe("Gestión de productos", () => {
    test("debería agregar un producto", () => {
        const producto = addProduct("Laptop", 1000);
        expect(producto).toEqual({ id: 1, name: "Laptop", price: 1000 });
        expect(getProducts()).toHaveLength(1);
    });

    test("debería incrementar el id en 1 cada vez que se añada un producto", () => {
        const prod1 = addProduct("Laptop", 1000);
        const prod2 = addProduct("Mouse", 50);
        expect(prod1.id).toBe(1);
        expect(prod2.id).toBe(2);
    });

    test("debería lanzar un error si el nombre o el precio no están definidos", () => {
        expect(() => addProduct("Laptop")).toThrow("Nombre y precio son obligatorios.");
        expect(() => addProduct(undefined, 1000)).toThrow("Nombre y precio son obligatorios.");
    });

    test("debería lanzar un error si el producto ya existe", () => {
        addProduct("Laptop", 1000);
        expect(() => addProduct("Laptop", 1000)).toThrow("El producto ya existe.");
    });

    test("debería eliminar un producto", () => {
        const producto = addProduct("Laptop", 1000);
        removeProduct(producto.id);
        expect(getProducts()).toHaveLength(0);
    });

    test("debería lanzar un error si el producto no existe", () => {
        expect(() => removeProduct(99)).toThrow("Producto no encontrado.");
    });

    test("debería devolver un producto por su id", () => {
        const producto = addProduct("Laptop", 1000);
        expect(getProduct(producto.id)).toEqual(producto);
    });

    test("debería lanzar un error si el producto no existe", () => {
        expect(() => getProduct(99)).toThrow("Producto no encontrado.");
    });

    test("debería actualizar un producto por su id", () => {
        const producto = addProduct("Laptop", 1000);
        const actualizado = updateProduct(producto.id, "Laptop Pro", 1200);
        expect(actualizado).toEqual({ id: 1, name: "Laptop Pro", price: 1200 });
    });

    test("debería lanzar un error si el producto no existe al actualizar", () => {
        expect(() => updateProduct(99, "Tablet", 500)).toThrow("Producto no encontrado.");
    });

    test("debería permitir actualizar solo el precio", () => {
        const producto = addProduct("Laptop", 1000);
        const actualizado = updateProduct(producto.id, undefined, 1200);
        expect(actualizado.price).toBe(1200);
        expect(actualizado.name).toBe("Laptop");
    });

    test("debería permitir actualizar solo el nombre", () => {
        const producto = addProduct("Laptop", 1000);
        const actualizado = updateProduct(producto.id, "Laptop Pro");
        expect(actualizado.name).toBe("Laptop Pro");
        expect(actualizado.price).toBe(1000);
    });
});
