import { writable } from 'svelte/store';

export const my_store = writable<string>('default value');
