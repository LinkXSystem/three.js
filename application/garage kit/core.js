import * as THREE from "../../build/three.module.js";
import { MMDLoader } from "../../examples/jsm/loaders/MMDLoader.js";
import { OrbitControls } from "../../examples/jsm/controls/OrbitControls.js";

const ModelFile = "./assets/mmd/Tea party Dress/Tea party Dress.pmx";

let container, camera, scene, renderer;

let controls;

let ambientLight, directionalLight;

let loader, model;

init();
animate();

function init() {
	container = document.createElement("div");
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
	camera.position.z = 30;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	const gridHelper = new THREE.PolarGridHelper(30, 10);
	gridHelper.position.y = -10;
	scene.add(gridHelper);

	ambientLight = new THREE.AmbientLight(0x666666);
	scene.add(ambientLight);

	directionalLight = new THREE.DirectionalLight(0x887766);
	directionalLight.position.set(-1, 1, 1).normalize();
	scene.add(directionalLight);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);

	window.addEventListener("resize", onResize, false);

	load();
}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function load() {
	loader = new MMDLoader();

	loader.load(ModelFile, object => {
		model = object;
		model.position.y = -10;
		scene.add(model);
	});
}

function render() {
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}
