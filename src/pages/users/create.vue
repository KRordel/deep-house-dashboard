<script setup>
	import {usersAPI} from "../../API/modules/usersAPI.js";
	import {reactive, ref} from "vue";
	import {useRouter} from 'vue-router';

	const router = useRouter();
	const errors = ref({});
	const form = reactive({
	  	name: null,
	  	email: null,
	  	password: null,
	  	password_confirmation: null,
	});

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
	<v-app-bar class="border-b">
		<template v-slot:prepend>
			<v-btn-back-page 
				icon="mdi-arrow-left"
                :to="{ name: 'users.index' }"
			>
			</v-btn-back-page>
		</template>
		<v-app-bar-title>Создать пользователя</v-app-bar-title>
	</v-app-bar>

	<v-container fluid>
		<v-row>
			<v-col cols="">
				<v-card>
					<v-form @submit.prevent="createUser">
						<v-text-field
							label="Имя"
							placeholder="Введите имя пользователя"
							v-model="form.name"
							:error-messages="errors.name"
						>
						</v-text-field>
						<v-text-field
							label="Email"
							placeholder="Введите Email пользователя"
							v-model="form.email"
							:error-messages="errors.email"
						>
						</v-text-field>
						<v-text-field
							label="Пароль"
							placeholder="Введите пароль пользователя"
							v-model="form.password"
							:error-messages="errors.password"
						>
						</v-text-field>
						<v-text-field
							label="Пароль повторно"
							placeholder="Повторите пароль пользователя"
							v-model="form.password_confirmation"
							:error-messages="errors.password_confirmation"
						>
						</v-text-field>

						<v-btn-primary
							prepend-icon="mdi-check"
							type="submit"
						>
							Сохранить
						</v-btn-primary>
					</v-form> 
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>