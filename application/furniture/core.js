import * as THREE from "../../build/three.module.js";
import { OrbitControls } from "../../examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../../examples/jsm/loaders/GLTFLoader.js";

import { CHAIRMODEL } from "./constants.js";

let camera, scene, renderer;

let width, height, aspect;

let hemispherelight, directionallight;

let controls;

let floor;

let chair;

initial();
animate();

function initial() {
	(width = window.innerWidth), (height = window.innerHeight);

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.x = 0;
	camera.position.z = 5;
	// camera.lookAt(new THREE.Vector3(0, 0, 0));

	handleCreateLight();
	handleCreateFloor();
	handleLoadOfModel();

	// 控制器
	controls = new OrbitControls(camera, renderer.domElement);
	controls.maxPolarAngle = Math.PI / 2;
	controls.minPolarAngle = Math.PI / 3;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 10; // 30

	window.addEventListener("resize", handleResize);
}

function handleResize() {
	(width = window.innerWidth), (height = window.innerHeight);

	aspect = width / height;
	camera.aspect = aspect;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
}

function handleCreateLight() {
	hemispherelight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
	hemispherelight.position.set(0, 50, 0);
	scene.add(hemispherelight);

	directionallight = new THREE.DirectionalLight(0xffffff, 0.54);
	directionallight.position.set(-8, 12, 8);
	directionallight.castShadow = true;

	scene.add(directionallight);
}

function handleCreateFloor() {
	const magnitude = 5000;
	const geometry = new THREE.PlaneGeometry(magnitude, magnitude, 1, 1);
	const material = new THREE.MeshPhongMaterial({
		color: 0xeeeeee,
		shininess: 0
	});

	floor = new THREE.Mesh(geometry, material);
	floor.rotation.x = -(Math.PI / 2);
	floor.receiveShadow = true;
	floor.position.y = -1;
	scene.add(floor);
}

function handleLoadOfModel() {
	const loader = new GLTFLoader();
	loader.load(
		CHAIRMODEL,
		gltf => {
			chair = gltf.scene;

			chair.traverse(child => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});

			chair.scale.set(2, 2, 2);
			chair.position.y = -1;
			chair.rotation.y = Math.PI;

			scene.add(chair);

			// loader.remove();
		},
		() => {
			// progress
			console.warn("==========================");
		},
		error => {
			console.error(error);
		}
	);
}

function render() {
	controls.update();

	renderer.render(scene, camera);
}

function animate() {
	render();
	requestAnimationFrame(animate);
}
