import * as THREE from "../build/three.module.js";

// Obejct

function Sea() {
	this.mesh = new THREE.Object3D();

	const GeometryWaves = new THREE.PlaneGeometry(1000, 1000, 200, 300);
	GeometryWaves.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
	GeometryWaves.mergeVertices();

	const length = GeometryWaves.vertices.length;

	this.waves = [];

	for (let i = 0; i < length; i++) {
		const vertice = GeometryWaves.vertices[i];
		this.waves.push({
			y: vertice.y,
			x: vertice.x,
			z: vertice.z,
			ang: Math.random() * Math.PI * 2,
			amp: 1.2,
			speed: 0.016 + Math.random() * 0.024
		});
	}

	const MaterialWaves = new THREE.MeshPhongMaterial({
		color: 0x000000,
		flatShading: THREE.FlatShading
	});

	this.mesh = new THREE.Mesh(GeometryWaves, MaterialWaves);
	this.mesh.castShadow = false;
	this.mesh.receiveShadow = true;
}

Sea.prototype.moveWaves = function() {
	const vertices = this.mesh.geometry.vertices;
	const length = vertices.length;

	for (let i = 0; i < length; i++) {
		const vertice = vertices[i];

		const vprops = this.waves[i];

		vertice.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
		vertice.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

		vprops.ang += vprops.speed;
	}

	this.mesh.geometry.verticesNeedUpdate = true;
};

let WIDTH, HEIGHT;

let aspectRatio, fieldOfView, nearPlane, farPlane;

let camera, scene, renderer;

let hemispherelight, shadowlight;

let sea;

initail();
loop();

function initail() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xffffff, 75, 500);

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 50;
	nearPlane = 1;
	farPlane = 10000;

	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);
	camera.position.x = 0;
	camera.position.z = 200;
	camera.position.y = 35;
	camera.rotation.x = -Math.PI / 30;

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	document.body.appendChild(renderer.domElement);

	createLights();
	createSea();

	window.addEventListener("resize", handleResize);
}

function handleResize() {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function createLights() {
	hemispherelight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
	scene.add(hemispherelight);

	shadowlight = new THREE.DirectionalLight(0xffffff, 1);
	shadowlight.position.set(0, 100, 350);
	shadowlight.castShadow = true;
	shadowlight.shadow.camera.left = -650;
	shadowlight.shadow.camera.right = 650;
	shadowlight.shadow.camera.bottom = -650;
	shadowlight.shadow.camera.top = 650;
	shadowlight.shadow.camera.near = 1;
	shadowlight.shadow.camera.far = 1000;
	shadowlight.shadow.mapSize.width = 2048;
	shadowlight.shadow.mapSize.height = 2048;

	scene.add(shadowlight);
}

function createSea() {
	sea = new Sea();
	scene.add(sea.mesh);
}

function loop() {
	renderer.render(scene, camera);
	sea.moveWaves();
	requestAnimationFrame(loop);
}
