const timer = document.querySelector('#time');

export default function countDown() {
	const now = new Date().getTime();
	const eventDate = new Date(2020, 4, 10).getTime();

	const remTime = eventDate - now;

	let s = Math.floor(remTime / 1000);
	let m = Math.floor(s / 60);
	let h = Math.floor(m / 60);
	let d = Math.floor(h / 24);

	h %= 24;
	m %= 60;
	s %= 60;

	s = (s < 10) ? '0' + s : s;
	m = (m < 10) ? '0' + m : m;
	h = (h < 10) ? '0' + h : h;
	d = (d < 10) ? '0' + d : d;

	setTimeout(countDown, 1000);
	timer.textContent = `${d} : ${h} : ${m} : ${s}`;
}
