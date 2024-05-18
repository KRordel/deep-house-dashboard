<script setup>
	import {useStore} from 'vuex';
	import {computed, onMounted, ref} from "vue";
	import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";

	const store = useStore();

	const headers = [
	  	{key: 'id', title: 'ID', sortable:false, align: 'center'},
	  	{key: 'is_active', title: 'Актив.', sortable:false, align: 'center'},
	  	{key: 'question', title: 'Вопрос', sortable:false},
	  	{key: 'answer', title: 'Ответ', sortable:false},
	  	{key: 'actions', title: '', sortable:false},
	];

	const loading = ref(false);
	const faqs = computed(() => store.getters["faqsStore/faqs"]);
	const total = computed(() => store.getters["faqsStore/total"]);
	const params = computed(() => store.getters["faqsStore/params"]);

	const fetchFaqs = async () => {
		try {
			loading.value = true;
			await store.dispatch('faqsStore/fetchFaqs', params.value);
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	const deleteFaq = async (id) => {
		try {
			await store.dispatch('faqsStore/deleteFaq', id);
		} catch (error) {
			console.error('Error deleting faqs:', error);
		}
	}

	const pageUpdateHandler = (event) => {
		params.value.page = event;
		fetchFaqs();
	}

	const limitUpdateHandler = (event) => {
		params.value.limit = event;
		fetchFaqs();
	}

	onMounted(async () => await fetchFaqs());
</script>

<template>
	<v-app-bar class="border-b">
		<v-app-bar-title>Часто задаваемые вопросы</v-app-bar-title>
		<template v-slot:append>
			<v-btn-primary
				prepend-icon="mdi-account-plus"
                :to="{ name: 'faqs.create' }"
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
						:items="faqs"
						:items-length="total"
						:page="params.page"
						:items-per-page="params.limit"
						@update:page="pageUpdateHandler"
						@update:itemsPerPage="limitUpdateHandler"
					>
						<template v-slot:item.is_active="{ item }">
							<v-icon v-if="item.is_active" icon="mdi-check-bold" class="text-green"></v-icon>
							<v-icon v-else icon="mdi-close-thick" class="text-red"></v-icon>
						</template>
						<template v-slot:item.actions="{ item }">
							<div class="d-flex">
								<v-btn-edit-page 
									icon="mdi-pencil-outline"
									:to="{ name: 'faqs.edit', params: {id: item.id} }"
								>
								</v-btn-edit-page>
								<DeleteConfirmation 
									@modal:confirmed="deleteFaq(item.id)" 
								/>
							</div>
						</template>
					</v-data-table-server>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>