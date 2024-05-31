interface DateItem {
	date: Date;
	description: string;
}

export const useEventsStore = defineStore('events', () => {
	const selectedDates = ref<DateItem[]>([]);
	const description = ref('');
	const date = ref(new Date());

	const addSelectedDate = () => {
		selectedDates.value = [
			...selectedDates.value,
			{ date: date.value, description: description.value },
		];
		description.value = '';
	};
	
	return { description, date, selectedDates, addSelectedDate };
});
