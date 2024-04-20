<script setup>
	import {usersAPI} from "../../API/modules/usersAPI.js";
	import {useRouter} from 'vue-router';
	import {onMounted, ref, reactive} from "vue";


	const user = ref([]);

	const router = useRouter();
	const id = router.currentRoute.value.params.id;
	  
	async function findUser() {
	  	try {
	  	  	const response = await usersAPI.findUser(id);
			user.value = response.data.data;
	  	} catch (e) {
	  	  	console.log(e);
	  	}
	}

	const form = reactive({
	  	name: user.name,
	});

	onMounted(() => findUser());

	
	
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
		<v-app-bar-title>{{ user.name }}</v-app-bar-title>
	</v-app-bar>

	

	<v-container fluid>
		<v-row>
			<v-col cols="">
				<v-card>
					<form >
						<v-text-field
							label="Имя"
							placeholder="Введите имя пользователя"
							v-model="user.name"
						>
						</v-text-field>

					</form> 
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>