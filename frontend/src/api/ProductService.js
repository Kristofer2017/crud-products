import axios from "axios";

export default class ProductService {
    async obtenerProductos() {
        try {
            const response = await axios.get('http://localhost:8000/api/productos');
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async guardarProducto(producto) {
        try {
            await axios.post('http://localhost:8000/api/productos', producto);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async eliminarProducto(id) {
        try {
            await axios.delete(`http://localhost:8000/api/productos/${id}`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async actualizarProducto(id, producto) {
        try {
            const response = await axios.put(`http://localhost:8000/api/productos/${id}`, producto);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}