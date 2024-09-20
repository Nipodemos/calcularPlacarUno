import { browser } from '$app/environment';

export class LocalStore<T> {
	value = $state<T>() as T;
	key = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = JSON.parse(item);
		}

		$effect(() => {
			localStorage.setItem(this.key, JSON.stringify(value));
		});
	}
}
