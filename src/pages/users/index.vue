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
	  	{key: 'name', title: 'Имя', sortable:false},
	  	{key: 'email', title: 'Email', sortable:false},
	  	{key: 'actions', title: '', sortable:false},
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
						:items="items"
						:items-length="itemsLength"
						:loading="loading"
						@update:page="params.page=$event"
						@update:itemsPerPage="params.limit=$event"
					>
						<template v-slot:item.actions="{ item }">
							<v-btn-edit-page 
								icon="mdi-pencil-outline"
								:to="{ name: 'users.edit', params: {id: item.id} }"
							>
							</v-btn-edit-page>
						</template>
					</v-data-table-server>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>