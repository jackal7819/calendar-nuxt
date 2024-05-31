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

	interface DateItem {
		date: Date;
		description: string;
	}

	interface CalendarItem {
		highlight: string;
		dates: Date[];
	}

	const date = ref(new Date());
	const selectedDates = ref<DateItem[]>([]);
	const description = ref('');

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	const attributes = ref<CalendarItem[]>([
		{
			highlight: 'green',
			dates: [new Date()],
		},
	]);

	watch(
		selectedDates,
		(newDates) => {
			attributes.value = [
				...attributes.value,
				{
					highlight: 'blue',
					dates: newDates.map((item) => item.date),
				},
			];
		},
		{ deep: true }
	);

	const addSelectedDate = () => {
		selectedDates.value = [
			...selectedDates.value,
			{ date: date.value, description: description.value },
		];
		description.value = '';
	};
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
		<div class="mt-4 field">
			<label class="label is-size-5">Description</label>
			<div class="control">
				<input
					v-model="description"
					class="input"
					type="text"
					placeholder="Enter description"
				/>
			</div>
		</div>
		<button class="mt-2 button is-primary" @click="addSelectedDate">
			Add Event
		</button>
		<div v-if="selectedDates.length > 0">
			<h3 class="mt-2 is-size-5 has-text-weight-semibold">EVENTS</h3>
			<ul>
				<li
					v-for="selectedDate in selectedDates"
					:key="selectedDate.toString()"
					class="is-size-5 has-text-primary"
				>
					{{
						selectedDate.date.toLocaleString(undefined, dateOptions)
					}}
					-
					<span class="has-text-weight-semibold has-text-warning">{{
						selectedDate.description
					}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
