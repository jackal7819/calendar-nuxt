interface DateItem {
	date: Date;
	description: string;
}

export const useEventsStore = defineStore('events', () => {
	const selectedDates = ref<DateItem[]>([]);
	return { selectedDates };
});
