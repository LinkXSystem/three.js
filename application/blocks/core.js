class Progress {
	constructor(container, colors) {
		this.container = container;
		this.colors = colors;

		this.init();
	}

	init() {
		const { container, colors } = this;
		this.target = document.createElement("div");
		this.target.style.height = "100%";
		this.target.style.background = `linear-gradient(45deg, ${colors})`;
		container.appendChild(this.target);
	}

	rate(value) {
		const { target } = this;
		target.style.width = `${value}%`;
	}
}

class App {
	constructor() {
		this.rate = 0;

		this.init();
	}

	init() {
		const element = document.querySelector(".progress");
		this.progress = new Progress(element, ["#0dbc79", "#ffe793", "#ffe793", "#3d7e9a"]);
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));

		this.render();
	}

	render() {
		const { rate, progress } = this;
		progress.rate(rate);

		if (rate < 100) {
			this.rate = rate + 1;
		}
	}
}

const app = new App();
app.animate();
