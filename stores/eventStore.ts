import { defineStore } from 'pinia';

interface Event {
	key: string;
	title: string;
	start: string;
	end: string;
}

export const useEventStore = defineStore('eventStore', {
	state: () => ({
		events: [] as Event[],
	}),
	actions: {
		addEvent(event: Event) {
			this.events.push(event);
		},
		updateEvent(updatedEvent: Event) {
			const index = this.events.findIndex(
				(event) => event.key === updatedEvent.key
			);
			if (index !== -1) {
				this.events.splice(index, 1, updatedEvent);
			}
		},
		deleteEvent(eventKey: string) {
			this.events = this.events.filter((event) => event.key !== eventKey);
		},
	},
});
