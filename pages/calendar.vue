<script setup lang="ts">
	definePageMeta({
		layout: 'sideblock',
		requiresAuth: true,
	});

	useHead({
		meta: [
			{
				name: 'robots',
				content: 'noindex',
			},
		],
	});

	import { ref } from '#imports';
	const date = ref(new Date());

	const attrs = ref([
		{
			key: 'today',
			highlight: {
				color: 'green',
				fillMode: 'solid',
			},
			dates: new Date(),
		},
	]);
</script>

<template>
	<div>
		<client-only>
			<h2>Calendar</h2>
			<VDatePicker v-model="date" :attributes="attrs" />
		</client-only>
	</div>
</template>

<style scoped>
	h2 {
		font-size: 24px;
		font-weight: 600;

		margin-top: 40px;
		margin-bottom: 40px;
	}
	:deep(.vc-container) {
		width: 600px;
	}
</style>
