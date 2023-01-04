export default function debounce(cb: Function, ms: number = 100) {
	let blocked = false;

	return (function () {
		if (blocked) return;
		else {
			blocked = true;
			cb();

			setTimeout(() => {
				blocked = false;
			}, ms);
		}
	})();
}
