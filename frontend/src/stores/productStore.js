import { defineStore } from 'pinia'

export const useProductStore = defineStore('producto', {
    state: () => ({
        productoAEditar: null
    }),
    actions: {
        setProductoAEditar(producto) {
            this.productoAEditar = producto
        },
        limpiar() {
            this.productoAEditar = null
        }
    }
})