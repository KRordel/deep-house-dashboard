<script setup>

import {usersAPI} from "../../API/modules/usersAPI.js";
import {onMounted, ref, watch} from "vue";

const loading = ref(false);
const items = ref([]);
const itemsLength = ref(0);

const params = ref({
  page: 1,
  limit: 10
});

const headers = ref([
  {key: 'id', title: 'ID', sortable:false},
  {key: 'name', title: 'Name', sortable:false},
  {key: 'email', title: 'Email', sortable:false},
  {key: 'actions', title: 'Actions', sortable:false},
]);

async function getUsers() {

  loading.value = true;

  try {
    const response = await usersAPI.getUsers(params.value);

    items.value = response.data.data;
    itemsLength.value = response.data.meta.total;

  } catch (e) {
    console.log(e);
  }

  loading.value = false;
}

onMounted(() => getUsers());
watch(() => params.value, getUsers, {deep: true});

</script>

<template>
  <h1>Users</h1>



  <v-data-table-server
      :headers="headers"
      :items="items"
      :items-length="itemsLength"
      :loading="loading"
      @update:page="params.page=$event"
      @update:itemsPerPage="params.limit=$event"
  >

    <template v-slot:item.actions="{ item }">
      {{ item }}
    </template>

  </v-data-table-server>

  <router-link :to="{ name: 'users.create' }">Create</router-link>
</template>