<script setup>
	import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {computed, onMounted, reactive, ref} from "vue";


    const store = useStore();
    const router = useRouter();

	const id = computed(() => router.currentRoute.value.params.id);
	const current = computed(() => store.getters["usersStore/currentUser"]);

	const payload = reactive({
		name: null,
		email: null,
		password: null,
		password_confirmation: null
	});

	const error = ref({});
	const loading = ref(false);

	const createUser = async () => {
		try {
			loading.value = true;
			await store.dispatch('usersStore/createUser', payload);
		} catch (e) {
			error.value = e.response.data.errors;
		} finally {
			loading.value = false;
		}
	};

	const fetchUser = async () => {
		try {
			loading.value = true;
			await store.dispatch('usersStore/fetchUser', id.value);
			Object.assign(payload, current.value);
		} catch (error) {
			console.error('Error fetching user:', error);
		} finally {
			loading.value = false;
		}
	};

	const updateUser = async () => {
		try {
			loading.value = true;
			if (!payload.password) delete payload.password;
			if (!payload.password_confirmation) delete payload.password_confirmation;
			await store.dispatch('usersStore/updateUser', {payload, id: id.value});
		} catch (e) {
			console.log(e);
			error.value = e.response.data.errors;
		} finally {
			loading.value = false;
		}
	};

	onMounted(() => {
		if (id.value) fetchUser();
	});
	
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
		<v-app-bar-title>
			{{ id ? 'Редактировать' : 'Создать' }} пользователя 
		</v-app-bar-title>
	</v-app-bar>

	<v-container fluid>
		<v-card :loading="loading">
    		<v-card-text>
    		  	<v-text-field
				 	class="mb-2"
    		  	    autofocus
    		  	    label="Имя"
					placeholder="Введите имя пользователя"
					v-model="payload.name"
					:error-messages="error.name"
    		  	/>
				<v-text-field
					class="mb-2"
					label="Email"
					placeholder="Введите Email пользователя"
					v-model="payload.email"
          			:error-messages="error.email"
				>
				</v-text-field>
				<v-text-field
					class="mb-2"
					label="Пароль"
					placeholder="Введите пароль пользователя"
					v-model="payload.password"
          			:error-messages="error.password"
				>
				</v-text-field>
				<v-text-field
					label="Подтверждение пароля"
					placeholder="Повторите пароль пользователя"
					v-model="payload.password_confirmation"
          			:error-messages="error.password_confirmation"
				>
				</v-text-field>
    		</v-card-text>

    		<v-card-actions>
    		  	<v-btn-primary
					prepend-icon="mdi-check"
					@click.prevent="id ? updateUser() : createUser()"
					:disabled="loading"
				>
					{{ id ? 'Обновить' : 'Создать' }}
				</v-btn-primary>
    		</v-card-actions>
  		</v-card>
  	</v-container>
</template>