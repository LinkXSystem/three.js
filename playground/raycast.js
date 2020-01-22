import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer;

let controls;

let raycaster = new THREE.Raycaster();

let mouse;

let ambientlight, directionallight;

let mesh;

initial();
object();
animate();

function initial() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x91d5ff);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	// camera = new THREE.PerspectiveCamera(
	// 	60,
	// 	window.innerWidth / window.innerHeight,
	// 	0.1,
	// 	1000
	// );
	// camera.position.set(100, -100, 100);
	// camera.lookAt(0, 0, 0);

	const aspect = window.innerWidth / window.innerHeight;
	const d = 200;

	camera = new THREE.OrthographicCamera(
		d * aspect,
		-d * aspect,
		d,
		-d,
		-1000,
		1000
	);
	camera.position.set(100, -100, 100);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	ambientlight = new THREE.AmbientLight(0x91d5ff);
	scene.add(ambientlight);

	directionallight = new THREE.DirectionalLight(0xffffff);
	directionallight.position.set(50, 499, 100);
	scene.add(directionallight);

	controls = new OrbitControls(camera, renderer.domElement);
	// controls.maxPolarAngle = Math.PI / 2;
	controls.addEventListener("change", function() {
		render();
	});

	window.addEventListener("resize", onResize);
	window.addEventListener("mousemove", onClick);
}

function render() {
	if (mouse) {
		raycaster.setFromCamera(mouse, camera);
		const intersection = raycaster.intersectObject(mesh);
		if (intersection.length > 0) {
			// const uuid = intersection[0].instanceId;
			mesh.material.color.set("#00f");
		}
	}

	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);

	render();
}

function object() {
	const geometry = new THREE.BoxBufferGeometry(100, 100, 100);
	const material = new THREE.MeshStandardMaterial({
		color: 0xff0000,
		// faltShading: THREE.FlatShading,
		roughness: 0,
		metalness: 0.8
	});

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, 0);
	mesh.castShadow = true;
	scene.add(mesh);
}

function onResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onClick(event) {
	event.preventDefault();

	const x = (event.clientX / window.innerWidth) * 2 - 1;
	const y = -(event.clientY / window.innerHeight) * 2 + 1;

	mouse = new THREE.Vector2(x, y);
}
