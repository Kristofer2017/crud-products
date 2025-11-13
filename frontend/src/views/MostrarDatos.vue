<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Productos</h1>
                <v-btn icon="mdi-plus" color="teal-darken-3" to="/products/add" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>Nombre</v-col>
            <v-col>Precio</v-col>
            <v-col>Cantidad</v-col>
            <v-col>Acciones</v-col>
        </v-row>
        <v-row v-for="producto in productos" :key="producto.id">
            <v-col>{{ producto.nombre }}</v-col>
            <v-col>${{ producto.precio }}</v-col>
            <v-col>{{ producto.cantidad }}</v-col>
            <v-col>
                <v-btn color="blue-darken-3" @click="editarProducto(producto)">Editar</v-btn>
                <v-btn color="red-darken-3" @click="confirmarEliminar(producto.id)">Eliminar</v-btn>
            </v-col>
            
        </v-row>
        <v-row v-if="productos.length == 0">
            <v-col>No hay datos para mostrar</v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title>Eliminar Dato</v-card-title>
            <v-card-text>Por favor confirma la eliminación. Esta acción no puede revertirse.</v-card-text>
            <v-divider />
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="dialog = false">Cancelar</v-btn>
                <v-btn color="red" @click="eliminarProducto">Eliminar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-alert v-if="successAlert" text="Producto eliminado exitosamente" type="warning" width="400" closable @click:close="successAlert = false" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useRouter } from 'vue-router';
import ProductService from '@/api/ProductService';

const productService = new ProductService();
const dialog = ref(false);
const productos = ref([]);
const selectedProductId = ref(null);
const successAlert = ref(false);
const productoStore = useProductStore();
const router = useRouter()

const cargarProductos = async () => {
    productos.value = await productService.obtenerProductos();
}

onMounted(async () => {
   await cargarProductos();
})

const confirmarEliminar = (id) => {
    dialog.value = true
    selectedProductId.value = id;
}

const eliminarProducto = async () => {
    try {
        const wasDeleted = await productService.eliminarProducto(selectedProductId.value);
        if (wasDeleted) {
            await cargarProductos();
            successAlert.value = true;
        }
    } catch (error) {
        console.log(error);
    } finally {
        dialog.value = false;
    }
}

const editarProducto = (producto) => {
    productoStore.setProductoAEditar(producto);
    router.push('/products/edit');
}

</script>

<style scoped>
.v-container {
    margin: 3em 4em;
    width: 89%;
    border: 1px solid #ddd;
}

.v-row {
    border-top: 1px solid #ddd;
}

.v-row:first-child {
    border: none;
    text-align: center;
    padding: 5px 10px;
}

.v-row:first-child>* {
    display: flex;
    justify-content: space-between;
}

.v-btn {
    margin-right: 15px;
}

.v-alert {
    position: absolute;
    bottom: 30px;
    right: 30px;
}
</style>