<template>
    <v-navigation-drawer class="bg-teal-darken-4 drawer" theme="dark" width="290" permanent>
      <v-list-item class="titulo">
          <v-list-item-title>Comercio Virtual</v-list-item-title>
          <v-list-item-subtitle>Subtitulo</v-list-item-subtitle>
      </v-list-item>
      <v-divider />
      <v-list>
        <v-list-item link to="/products" title="Productos" prepend-icon="mdi-package-variant"></v-list-item>
        <v-list-item link to="/products/add" title="Agregar o Editar" prepend-icon="mdi-package"></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.titulo {
  padding: 25px;
  padding-bottom: 10px;
}
.v-divider {
  margin: 10px 0;
}
</style>