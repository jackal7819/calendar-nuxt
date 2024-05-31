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

	const store = useEventsStore();
	const { description, date, selectedDates, editingEvent } =
		storeToRefs(store);
	const {
		addSelectedDate,
		startEditingEvent,
		finishEditingEvent,
		cancelEditingEvent,
	} = store;

	interface CalendarItem {
		highlight: string;
		dates: Date[];
	}

	const calendarView = ref('monthly');

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
</script>

<template>
	<div class="p-6">
		<h2 class="mb-6 is-size-3 has-text-weight-semibold">Calendar</h2>
		<div class="buttons">
			<button
				class="button"
				:class="{ 'is-primary': calendarView === 'monthly' }"
				@click="calendarView = 'monthly'"
			>
				Monthly
			</button>
			<button
				class="button"
				:class="{ 'is-primary': calendarView === 'weekly' }"
				@click="calendarView = 'weekly'"
			>
				Weekly
			</button>
		</div>
		<VDatePicker
			:attributes="attributes"
			v-model="date"
			mode="dateTime"
			is24hr
			expanded
			:view="calendarView"
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
		<button class="mt-2 mb-2 button is-primary is-hovered" @click="addSelectedDate">
			Add Event
		</button>
		<div v-if="editingEvent">
			<h3 class="mt-6 is-size-4 has-text-weight-semibold">Edit Event</h3>
			<div class="field">
				<label class="label">Description</label>
				<div class="control">
					<input
						v-model="editingEvent.description"
						class="input"
						type="text"
						placeholder="Enter description"
					/>
				</div>
			</div>
			<div class="buttons">
				<button class="button is-primary" @click="finishEditingEvent">
					Save
				</button>
				<button class="button" @click="cancelEditingEvent">
					Cancel
				</button>
			</div>
		</div>
		<ul v-else>
			<li
				v-for="selectedDate in selectedDates"
				:key="selectedDate.toString()"
				class="mb-2 is-size-5 has-text-primary is-flex is-align-items-center"
			>
				{{ selectedDate.date.toLocaleString(undefined, dateOptions) }} -
				<span class="ml-2 has-text-weight-semibold has-text-warning">{{
					selectedDate.description
				}}</span>
				<button
					class="ml-2 button is-info is-rounded is-small is-hovered"
					@click="startEditingEvent(selectedDate)"
				>
					Edit
				</button>
			</li>
		</ul>
	</div>
</template>
