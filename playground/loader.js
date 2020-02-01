import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "../examples/jsm/loaders/FBXLoader.js";

let scene, camera, renderer;

let hemispherelight, directionallight;

let controls;

let loader;

let plane;

initial();
load();
animate();

function initial() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xa0a0a0);
	scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		2000
	);
	camera.position.set(100, 200, 300);

	hemispherelight = new THREE.HemisphereLight(0xffffff, 0x444444);
	hemispherelight.position.set(0, 200, 0);
	scene.add(hemispherelight);

	directionallight = new THREE.DirectionalLight(0xffffff);
	directionallight.position.set(0, 200, 100);
	directionallight.castShadow = true;
	directionallight.shadow.camera.top = 180;
	directionallight.shadow.camera.bottom = -100;
	directionallight.shadow.camera.left = -120;
	directionallight.shadow.camera.right = 120;
	scene.add(directionallight);

	plane = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(2000, 2000),
		new THREE.MeshPhongMaterial({
			color: 0x999999,
			depthWrite: false
		})
	);
	plane.rotation.x = -Math.PI / 2;
	plane.receiveShadow = true;
	scene.add(plane);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 100, 0);
	controls.maxPolarAngle = Math.PI / 2;
	controls.minPolarAngle = 0;
	controls.update();

	window.addEventListener(
		"resize",
		() => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		},
		false
	);
}

function load() {
	loader = new FBXLoader();
	loader.load("../examples/models/fbx/Samba Dancing.fbx", function(object) {
		object.traverse(function(child) {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});

		scene.add(object);
	});
}

function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
