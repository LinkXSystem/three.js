import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "../examples/jsm/controls/TransformControls.js";

let renderer, camera, scene, control, oribit, light;

initial();
object();
render();

function initial() {
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		1,
		3000
	);
	camera.position.set(1000, 500, 1000);
	camera.lookAt(0, 200, 0);

	scene = new THREE.Scene();
	// 添加网格助手
	scene.add(new THREE.GridHelper(1000, 10));

	light = new THREE.DirectionalLight(0xffffff, 2);
	light.position.set(1, 1, 1);
	scene.add(light);

	oribit = new OrbitControls(camera, renderer.domElement);
	oribit.update();
	oribit.addEventListener("change", render);

	control = new TransformControls(camera, renderer.domElement);
	control.addEventListener("change", render);
	control.addEventListener("dragging-changed", function(event) {
		console.warn("x", event.value);
		orbit.enabled = !event.value;
	});

	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

		render();
	});
}

function object() {
	const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
	const material = new THREE.MeshToonMaterial({
		color: "#126db3",
		flatShading: THREE.FlatShading
	});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	control.attach(mesh);
	scene.add(control);

	control.setMode("rotate");
}

function render() {
	renderer.render(scene, camera);
}
