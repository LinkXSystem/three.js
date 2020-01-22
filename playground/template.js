import * as THREE from "../build/three.module.js";

let container, renderer, scene, camera, light, spotlight;

initial();
draw();
draw([0, 5, 0], "#323233");
draw([0, 10, 0], "#d9d2c2");

animation();

function initial() {
	container = document.getElementById("container");

	// 构建 renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: false
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor("#665D5E", 1);
	container.appendChild(renderer.domElement);

	// 构建 scene
	scene = new THREE.Scene();

	// 构建 camera
	let aspect = window.innerWidth / window.innerHeight;
	// 调整相机的距离
	let d = 40;
	camera = new THREE.OrthographicCamera(
		-d * aspect,
		d * aspect,
		d,
		-d,
		-1000,
		1000
	);
	camera.position.x = 2;
	camera.position.y = 2;
	camera.position.z = 2;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// 构建光影
	light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(0, 499, 0);

	spotlight = new THREE.AmbientLight(0xffffff, 0.4);

	scene.add(light);
	scene.add(spotlight);
}

function draw(position, color) {
	const temp_ = position || [0, 0, 0];
	const width = 20;
	const depth = 20;
	const height = 5;

	const geometry = new THREE.BoxBufferGeometry(width, height, depth);
	const material = new THREE.MeshToonMaterial({
		color: color || "#2E2E3D",
		flatShading: THREE.FlatShading
	});
	const mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(...temp_);

	scene.add(mesh);
}

function animation() {
	requestAnimationFrame(animation);

	renderer.render(scene, camera);
}
