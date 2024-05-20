<script setup>
	import {useStore} from 'vuex';
	import {computed, onMounted, ref} from "vue";
	import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";

	const store = useStore();

	const headers = [
	  	{key: 'id', title: 'ID', sortable:false, align: 'center'},
	  	{key: 'is_active', title: 'Актив.', sortable:false, align: 'center'},
	  	{key: 'title', title: 'Заголовок', sortable:false},
	  	{key: 'content', title: 'Отзыв', sortable:false},
	  	{key: 'name', title: 'Имя', sortable:false},
	  	{key: 'actions', title: '', sortable:false},
	];

	const loading = ref(false);
	const reviews = computed(() => store.getters["reviewsStore/reviews"]);
	const total = computed(() => store.getters["reviewsStore/total"]);
	const params = computed(() => store.getters["reviewsStore/params"]);

	const fetchReviews = async () => {
		try {
			loading.value = true;
			await store.dispatch('reviewsStore/fetchReviews', params.value);
		} catch (e) {
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	const deleteReview = async (id) => {
		try {
			await store.dispatch('reviewsStore/deleteReview', id);
		} catch (error) {
			console.error('Error deleting reviews:', error);
		}
	}

	const pageUpdateHandler = (event) => {
		params.value.page = event;
		fetchReviews();
	}

	const limitUpdateHandler = (event) => {
		params.value.limit = event;
		fetchReviews();
	}

	onMounted(async () => await fetchReviews());
</script>

<template>
	<v-app-bar class="border-b">
		<v-app-bar-title>Отзывы</v-app-bar-title>
		<template v-slot:append>
			<v-btn-primary
				prepend-icon="mdi-account-plus"
                :to="{ name: 'reviews.create' }"
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
						:items="reviews"
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
									:to="{ name: 'reviews.edit', params: {id: item.id} }"
								>
								</v-btn-edit-page>
								<DeleteConfirmation 
									@modal:confirmed="deleteReview(item.id)" 
								/>
							</div>
						</template>
					</v-data-table-server>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>