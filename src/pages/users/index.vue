<script setup>
	import {useStore} from 'vuex';
	import {computed, onMounted, ref} from "vue";
	import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";

	const store = useStore();

	const headers = [
	  	{key: 'id', title: 'ID', sortable:false, align: 'center'},
	  	{key: 'name', title: 'Имя', sortable:false},
	  	{key: 'email', title: 'Email', sortable:false},
	  	{key: 'actions', title: '', sortable:false},
	];

	const loading = ref(false);
	const users = computed(() => store.getters["usersStore/users"]);
	const total = computed(() => store.getters["usersStore/total"]);
	const params = computed(() => store.getters["usersStore/params"]);

	const fetchUsers = async () => {
		try {
			loading.value = true;
			await store.dispatch('usersStore/fetchUsers', params.value);
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	const deleteUser = async (id) => {
		try {
			await store.dispatch('usersStore/deleteUser', id);
		} catch (error) {
			console.error('Error deleting users:', error);
		}
	}

	const pageUpdateHandler = (event) => {
		params.value.page = event;
		fetchUsers();
	}

	const limitUpdateHandler = (event) => {
		params.value.limit = event;
		fetchUsers();
	}

	onMounted(async () => await fetchUsers());
</script>

<template>
	<v-app-bar class="border-b">
		<v-app-bar-title>Пользователи</v-app-bar-title>
		<template v-slot:append>
			<v-btn-primary
				prepend-icon="mdi-account-plus"
                :to="{ name: 'users.create' }"
			>
				Создать
			</v-btn-primary>
		</template>
	</v-app-bar>

	<v-container fluid>
		<v-row>
			<v-col cols="">
				<v-card>
					<v-data-table-server 
						:headers="headers"
						:loading="loading"
						:items="users"
						:items-length="total"
						:page="params.page"
						:items-per-page="params.limit"
						@update:page="pageUpdateHandler"
						@update:itemsPerPage="limitUpdateHandler"
					>
						<template v-slot:item.actions="{ item }">
							
							<div class="d-flex">
								<v-btn-edit-page 
									icon="mdi-pencil-outline"
									:to="{ name: 'users.edit', params: {id: item.id} }"
								>
								</v-btn-edit-page>
								<DeleteConfirmation 
									@modal:confirmed="deleteUser(item.id)" 
								/>
							</div>

						</template>
					</v-data-table-server>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>