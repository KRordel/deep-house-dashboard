<script setup>
	import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {computed, onMounted, reactive, ref} from "vue";


    const store = useStore();
    const router = useRouter();

	const id = computed(() => router.currentRoute.value.params.id);
	const current = computed(() => store.getters["faqsStore/currentFaq"]);

	const payload = reactive({
		question: null,
		answer: null,
		is_active: false
	});

	const error = ref({});
	const loading = ref(false);

	const createFaq = async () => {
		try {
			loading.value = true;
			await store.dispatch('faqsStore/createFaq', payload);
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	const fetchFaq = async () => {
		try {
			loading.value = true;
			await store.dispatch('faqsStore/fetchFaq', id.value);
			Object.assign(payload, current.value);
		} catch (error) {
			console.error('Error fetching faq:', error);
		} finally {
			loading.value = false;
		}
	};

	const updateFaq = async () => {
		try {
			loading.value = true;
			await store.dispatch('faqsStore/updateFaq', {payload, id: id.value});
		} catch (e) {
			error.value = e;
		} finally {
			loading.value = false;
		}
	};

	onMounted(() => {
		if (id.value) fetchFaq();
	});
	
</script>

<template>

	<v-app-bar class="border-b">
		<template v-slot:prepend>
			<v-btn-back-page 
				icon="mdi-arrow-left"
                :to="{ name: 'faqs.index' }"
			>
			</v-btn-back-page>
		</template>
		<v-app-bar-title>
			{{ id ? 'Редактировать' : 'Создать' }} часто задаваемый вопрос 
		</v-app-bar-title>
	</v-app-bar>

	<v-container fluid>
		<v-card :loading="loading">
    		<v-card-text>
    		  	<v-text-field
				 	class="mb-2"
    		  	    autofocus
    		  	    label="Вопрос"
					placeholder="Введите вопрос"
					v-model="payload.question"
					:error-messages="error.question"
    		  	/>
    		  	<v-textarea
				 	class="mb-2"
    		  	    label="Ответ"
					placeholder="Введите ответ"
					v-model="payload.answer"
					:error-messages="error.answer"
    		  	></v-textarea>

				<v-switch
					:label="payload.is_active ? 'Активный' : 'Не активный'"
					v-model="payload.is_active"
				></v-switch>
				
    		</v-card-text>

    		<v-card-actions>
    		  	<v-btn-primary
					prepend-icon="mdi-check"
					@click.prevent="id ? updateFaq() : createFaq()"
					:disabled="loading"
				>
					{{ id ? 'Обновить' : 'Создать' }}
				</v-btn-primary>
    		</v-card-actions>
  		</v-card>
  	</v-container>
</template>