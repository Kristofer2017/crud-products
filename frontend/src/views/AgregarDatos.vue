<template>
    <v-container>
        <v-form ref="form" v-model="formValido">
        <v-row><v-col><h1>{{ titulo }}</h1></v-col></v-row>
        <v-row><v-col>
            <v-text-field v-model="nombre" label="Nombre del producto" hide-details="auto" clearable variant="outlined" :rules="[required]" />
        </v-col></v-row>
        <v-row><v-col>
            <v-text-field v-model="precio" label="Precio del producto" hide-details="auto" variant="outlined" prefix="$" :rules="[required, isNumber]" />
        </v-col></v-row>
        <v-row><v-col>
            <v-text-field v-model="cantidad" label="Cantidad" hide-details="auto" variant="outlined" :rules="[required, isInteger]" />
        </v-col></v-row>
        <v-row class="text-right">
            <v-col><v-btn color="red" block to="/products">Regresar</v-btn></v-col>
            <v-col><v-btn color="primary" block @click="guardar">{{ btnTitle }}</v-btn></v-col>
        </v-row>
        </v-form>
    </v-container>
    <v-alert v-if="errorAlert" text="Hay errores en el formulario" type="error" width="400" closable @click:close="errorAlert = false" />
    <v-alert v-if="successAlert" text="Producto guardado exitosamente" type="success" width="400" closable @click:close="successAlert = false" />
</template>

<script setup>
import ProductService from '@/api/ProductService';
import { useProductStore } from '@/stores/productStore';
import { onMounted, onUnmounted, ref } from 'vue';

const required = v => !!v || 'Campo obligatorio';
const isNumber = v => /^[0-9]+(\.[0-9]{1,2})?$/.test(v) || 'Debe ser un número válido';
const isInteger = v => /^[0-9]+$/.test(v) || 'Debe ser un número entero';
const productService = new ProductService();
const form = ref(null);
const formValido = ref(false);
const nombre = ref();
const precio = ref();
const cantidad = ref();
const errorAlert = ref(false);
const successAlert = ref(false);
const productoStore = useProductStore();
let titulo = "Agregar Producto";
let btnTitle = "Guardar";
let productoEditar = null;
let esEditar = false;

onMounted(() => {
    productoEditar = productoStore.productoAEditar;
    if (productoEditar) {
        esEditar = true;
        nombre.value = productoEditar.nombre;
        precio.value = productoEditar.precio;
        cantidad.value = productoEditar.cantidad;
        titulo = "Editar Producto";
        btnTitle = "Actualizar";
    }
})

onUnmounted(() => {
    productoStore.limpiar();
})

const guardar = async () => {
    const { valid } = await form.value.validate();

    if (!valid) {
        errorAlert.value = true;
        return
    }
    try {
        const producto = {
          nombre: nombre.value,
          precio: parseFloat(precio.value),
          cantidad: parseInt(cantidad.value)
        }
        let datoGuardado;
        if (esEditar) {
            const id = productoEditar.id;
            datoGuardado = await productService.actualizarProducto(id, producto);
        } else {
            datoGuardado = await productService.guardarProducto(producto);
        }

        if (datoGuardado) {
            successAlert.value = true;
            limpiar();
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

const limpiar = () => {
    nombre.value = undefined
    precio.value = undefined;
    cantidad.value = undefined;
}
</script>

<style scoped>
.v-container {
    margin: 3em 0 0 4em;
    padding: 20px 30px 30px;
    width: 40%;
    border: 1px solid #ddd;
}

.v-row:first-child {
    border: none;
    text-align: center;
}

.v-btn {
    padding: 21px;
}
.v-alert {
    position: absolute;
    bottom: 30px;
    right: 30px;
}
</style>