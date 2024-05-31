interface DateItem {
	date: Date;
	description: string;
}

export const useEventsStore = defineStore('events', () => {
	const selectedDates = ref<DateItem[]>([]);
	const description = ref('');
	const date = ref(new Date());
	const editingEvent = ref<DateItem | null>(null);

	const addSelectedDate = () => {
		selectedDates.value = [
			...selectedDates.value,
			{ date: date.value, description: description.value },
		];
		description.value = '';
	};

	const startEditingEvent = (event: DateItem) => {
		editingEvent.value = { ...event };
	};

	const finishEditingEvent = () => {
		if (editingEvent.value) {
			const updatedEvent = editingEvent.value;
			const index = selectedDates.value.findIndex(
				(item) => item.date.toString() === updatedEvent.date.toString()
			);
			if (index !== -1) {
				selectedDates.value.splice(index, 1, updatedEvent);
			}
		}
		editingEvent.value = null;
	};

	const cancelEditingEvent = () => {
		editingEvent.value = null;
	};

	return {
		description,
		date,
		selectedDates,
		editingEvent,
		addSelectedDate,
		startEditingEvent,
		finishEditingEvent,
		cancelEditingEvent,
	};
});
