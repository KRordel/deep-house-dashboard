<script setup>

import {usersAPI} from "../../API/modules/usersAPI.js";
import {reactive, ref} from "vue";

import {useRouter} from 'vue-router';

const router = useRouter();

const form = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

const errors = ref({});

async function createUser() {
  try {
    await usersAPI.createUser(form);
    await router.push({name: 'users.index'});

  } catch (e) {
    errors.value = e.response.data.errors;
  }
}

</script>

<template>
  <h1>Create user</h1>

  <form @submit.prevent="createUser">
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" v-model="form.name">
      <small v-if="errors.name">{{ errors.email }}</small>
    </div>
    <div>
      <label for="email">Email</label>
      <input type="text" id="email" v-model="form.email">
      <small>{{ errors.email }}</small>
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="form.password">
      <small>{{ errors.password }}</small>
    </div>
    <div>
      <label for="password_confirmation">password_confirmation</label>
      <input type="password" id="password_confirmation" v-model="form.password_confirmation">
      <small>{{ errors.password_confirmation }}</small>
    </div>

    <button>Create</button>
  </form>
</template>