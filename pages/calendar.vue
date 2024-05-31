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
	const dates = ref([
		new Date(2024, 4, 5),
		new Date(2024, 4, 7),
		new Date(2024, 4, 9),
		new Date(2024, 4, 6),
	]);

	const attributes = ref([
		{
			highlight: 'green',
			dates: new Date(),
		},
		{
			highlight: 'blue',
			dates,
		},
	]);
</script>

<template>
	<div class="p-6">
		<h2 class="mb-6 is-size-3 has-text-weight-semibold">Calendar</h2>
		<VDatePicker
			:attributes="attributes"
			v-model="date"
			mode="dateTime"
			is24hr
			expanded
		/>
		<p class="mt-6 is-size-5 has-text-weight-semibold">
			Selected Date: {{ date }}
		</p>
	</div>
</template>
