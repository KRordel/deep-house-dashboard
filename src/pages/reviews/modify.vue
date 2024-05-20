<script setup>
	import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {computed, onMounted, reactive, ref} from "vue";


    const store = useStore();
    const router = useRouter();

	const id = computed(() => router.currentRoute.value.params.id);
	const current = computed(() => store.getters["reviewsStore/currentReview"]);

	const payload = reactive({
		title: null,
		content: null,
		name: null,
		is_active: false
	});

	const error = ref({});
	const loading = ref(false);

	const createReview = async () => {
		try {
			loading.value = true;
			await store.dispatch('reviewsStore/createReview', payload);
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	const fetchReview = async () => {
		try {
			loading.value = true;
			await store.dispatch('reviewsStore/fetchReview', id.value);
			Object.assign(payload, current.value);
		} catch (error) {
			console.error('Error fetching review:', error);
		} finally {
			loading.value = false;
		}
	};

	const updateReview = async () => {
		try {
			loading.value = true;
			await store.dispatch('reviewsStore/updateReview', {payload, id: id.value});
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	onMounted(() => {
		if (id.value) fetchReview();
	});
	
</script>

<template>

	<v-app-bar class="border-b">
		<template v-slot:prepend>
			<v-btn-back-page 
				icon="mdi-arrow-left"
                :to="{ name: 'reviews.index' }"
			>
			</v-btn-back-page>
		</template>
		<v-app-bar-title>
			{{ id ? 'Редактировать' : 'Создать' }} отзыв
		</v-app-bar-title>
	</v-app-bar>

	<v-container fluid>
		<v-card :loading="loading">
    		<v-card-text>
    		  	<v-text-field
				 	class="mb-2"
    		  	    autofocus
    		  	    label="Заголовок"
					placeholder="Введите заголовок"
					v-model="payload.title"
					:error-messages="error.title"
    		  	/>
    		  	<v-textarea
				 	class="mb-2"
    		  	    label="Отзыв"
					placeholder="Введите отзыв"
					v-model="payload.content"
					:error-messages="error.content"
    		  	></v-textarea>
				<v-text-field
				 	class="mb-2"
    		  	    label="Имя"
					placeholder="Введите имя"
					v-model="payload.name"
					:error-messages="error.name"
    		  	/>
				<v-switch
					:label="payload.is_active ? 'Активный' : 'Не активный'"
					v-model="payload.is_active"
				></v-switch>
				
    		</v-card-text>

    		<v-card-actions>
    		  	<v-btn-primary
					prepend-icon="mdi-check"
					@click.prevent="id ? updateReview() : createReview()"
					:disabled="loading"
				>
					{{ id ? 'Обновить' : 'Создать' }}
				</v-btn-primary>
    		</v-card-actions>
  		</v-card>
  	</v-container>
</template>