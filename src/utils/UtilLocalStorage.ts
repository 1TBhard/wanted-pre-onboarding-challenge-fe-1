class UtilLocalStorage {
	static set(key: string, object: Object) {
		const item = JSON.stringify(object);

		localStorage.setItem(key, item);
	}

	static get<T = any>(key: string): T {
		const stringfyItem = localStorage.getItem(key);

		return JSON.parse(stringfyItem);
	}

	static remove(key: string) {
		localStorage.removeItem(key);
	}

	static has(key: string) {
		return !!localStorage.getItem(key);
	}
}

export default UtilLocalStorage;
