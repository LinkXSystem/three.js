// 参考文章： https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/

import * as THREE from "../../build/three.module.js";

const Colors = {
	RED: 0xf25346,
	WHITE: 0xd8d0d1,
	BROWN: 0x59332e,
	PINK: 0xf5986e,
	BROWNDARK: 0x23190f,
	BLUE: 0x68c3c0
};

let scene, renderer, container;

let camera, fieldOfView, aspectRatio, nearPlane, farPlane;

let HEIGHT, WIDTH;

let hemisphereLight, shadowLight, ambientlight;

let sea, sky, airplane;

let mouse = { x: 0, y: 0 };

// 构建物体
function Sea() {
	const geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	geometry.mergeVertices();

	const length = geometry.vertices.length;

	this.waves = [];

	for (let i = 0; i < length; i++) {
		const vertice = geometry.vertices[i];

		this.waves.push({
			y: vertice.y,
			x: vertice.x,
			z: vertice.z,

			ang: Math.random() * Math.PI * 2,
			amp: 5 + Math.random() * 10,
			speed: 0.016 + Math.random() * 0.032
		});
	}

	const material = new THREE.MeshPhongMaterial({
		color: Colors.BLUE,
		transparent: true,
		opacity: 0.6,
		flatShading: THREE.FlatShading
	});

	this.mesh = new THREE.Mesh(geometry, material);
	this.mesh.name = "Sea";
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

	sea.mesh.rotation.z += 0.005;
};

function Cloud() {
	this.mesh = new THREE.Object3D();
	this.mesh.name = "Cloud";

	let geometry = new THREE.BoxBufferGeometry(20, 20, 20);
	let material = new THREE.MeshPhongMaterial({
		color: Colors.WHITE
	});

	let nBlocks = 3 + Math.floor(Math.random() * 3);

	for (let i = 0; i < nBlocks; i += 1) {
		let mesh = new THREE.Mesh(geometry, material);

		mesh.position.x = i * 15;
		mesh.position.y = Math.random() * 10;
		mesh.position.z = Math.random() * 10;
		mesh.rotation.z = Math.random() * Math.PI * 2;
		mesh.rotation.y = Math.random() * Math.PI * 2;

		let scale = 0.1 + Math.random() * 0.9;
		mesh.scale.set(scale, scale, scale);

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		this.mesh.add(mesh);
	}
}

function Sky() {
	this.mesh = new THREE.Object3D();
	this.mesh.name = "Sky";

	this.nClouds = 20;

	const StepAngle = (Math.PI * 2) / this.nClouds;

	for (let i = 0; i < this.nClouds; i++) {
		let cloud = new Cloud();

		let angle = StepAngle * i;

		let height = 750 + Math.random() * 400;

		cloud.mesh.position.y = Math.sin(angle) * height;
		cloud.mesh.position.x = Math.cos(angle) * height;

		cloud.mesh.rotation.z = angle + Math.PI / 2;
		cloud.mesh.position.z = -400 - Math.random() * 400;

		let scale = 1 + Math.random() * 2;

		cloud.mesh.scale.set(scale, scale, scale);

		this.mesh.add(cloud.mesh);
	}
}

function AirPlane() {
	this.mesh = new THREE.Object3D();
	this.mesh.name = "AirPlane";

	const GeometryCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
	const MaterialCockpit = new THREE.MeshPhongMaterial({
		color: Colors.RED,
		flatShading: THREE.FlatShading
	});

	GeometryCockpit.vertices[4].y -= 10;
	GeometryCockpit.vertices[4].z += 20;
	GeometryCockpit.vertices[5].y -= 10;
	GeometryCockpit.vertices[5].z -= 20;
	GeometryCockpit.vertices[6].y += 30;
	GeometryCockpit.vertices[6].z += 20;
	GeometryCockpit.vertices[7].y += 30;
	GeometryCockpit.vertices[7].z -= 20;

	const cockpit = new THREE.Mesh(GeometryCockpit, MaterialCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);

	const GeometryEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
	const MaterialEngine = new THREE.MeshPhongMaterial({
		color: Colors.WHITE,
		flatShading: THREE.FlatShading
	});

	const engine = new THREE.Mesh(GeometryEngine, MaterialEngine);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;

	this.mesh.add(engine);

	const GeometryTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
	const MaterialTailPlane = new THREE.MeshPhongMaterial({
		color: Colors.RED,
		flatShading: THREE.FlatShading
	});

	const tailPlane = new THREE.Mesh(GeometryTailPlane, MaterialTailPlane);
	tailPlane.position.set(-40, 25, 0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);

	const GeometrySideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
	const MaterialSideWing = new THREE.MeshPhongMaterial({
		color: Colors.RED,
		flatShading: THREE.FlatShading
	});

	const sideWing = new THREE.Mesh(GeometrySideWing, MaterialSideWing);
	sideWing.position.y += 10;
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);

	const GeometryPorpeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
	const MaterialPorpeller = new THREE.MeshPhongMaterial({
		color: Colors.BROWN,
		flatShading: THREE.FlatShading
	});

	this.propeller = new THREE.Mesh(GeometryPorpeller, MaterialPorpeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;

	const GeometryBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
	const MaterialBlade = new THREE.MeshPhongMaterial({
		color: Colors.BROWNDARK,
		flatShading: THREE.FlatShading
	});

	const blade = new THREE.Mesh(GeometryBlade, MaterialBlade);
	blade.position.set(8, 0, 0);
	blade.castShadow = true;
	blade.receiveShadow = true;

	this.propeller.add(blade);
	this.propeller.position.set(50, 0, 0);
	this.mesh.add(this.propeller);

	const WheelProtecGeometry = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
	const WheelProtecMaterial = new THREE.MeshPhongMaterial({
		color: Colors.RED,
		flatShading: THREE.FlatShading
	});
	const wheelProtecR = new THREE.Mesh(WheelProtecGeometry, WheelProtecMaterial);
	wheelProtecR.position.set(25, -20, 25);
	this.mesh.add(wheelProtecR);

	const wheelProtecL = wheelProtecR.clone();
	wheelProtecL.position.z = -wheelProtecR.position.z;
	this.mesh.add(wheelProtecL);

	const WheelTireGeometry = new THREE.BoxGeometry(24, 24, 4);
	const WheelTireMaterial = new THREE.MeshPhongMaterial({
		color: Colors.BROWNDARK,
		flatShading: THREE.FlatShading
	});
	const wheelTireR = new THREE.Mesh(WheelTireGeometry, WheelTireMaterial);
	wheelTireR.position.set(25, -28, 25);

	const WheelAxisGeometry = new THREE.BoxGeometry(10, 10, 6);
	const WheelAxisMaterial = new THREE.MeshPhongMaterial({
		color: Colors.BROWN,
		flatShading: THREE.FlatShading
	});
	const wheelAxis = new THREE.Mesh(WheelAxisGeometry, WheelAxisMaterial);
	wheelTireR.add(wheelAxis);

	this.mesh.add(wheelTireR);

	const wheelTireL = wheelTireR.clone();
	wheelTireL.position.z = -wheelTireL.position.z;
	this.mesh.add(wheelTireL);

	const wheelTireB = wheelTireR.clone();
	wheelTireB.scale.set(0.5, 0.5, 0.5);
	wheelTireB.position.set(-35, -5, 0);
	this.mesh.add(wheelTireB);

	const SuspensionGeometry = new THREE.BoxGeometry(4, 20, 4);
	SuspensionGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
	const SuspensionMaterial = new THREE.MeshPhongMaterial({
		color: Colors.RED,
		flatShading: THREE.FlatShading
	});
	const suspension = new THREE.Mesh(SuspensionGeometry, SuspensionMaterial);
	suspension.position.set(-35, -5, 0);
	suspension.rotation.z = -0.3;
	this.mesh.add(suspension);
}

function initial() {
	// 创建场景
	createScene();
	createLights();

	// 构建对象
	createPlane();
	createSea();
	createSky();

	// 循环更新
	loop();
}

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	scene = new THREE.Scene();

	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

	aspectRatio = WIDTH / HEIGHT;

	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;

	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);

	camera.position.x = 0;
	camera.position.y = 200;
	camera.position.z = 100;

	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});

	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;

	container = document.getElementById("world");
	container.appendChild(renderer.domElement);

	window.addEventListener("resize", handleWindowResize, false);
	window.addEventListener("mousemove", handleMouseMove, false);
}

function createLights() {
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

	shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;

	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	ambientlight = new THREE.AmbientLight(0xdc8874, 0.5);

	scene.add(ambientlight);
	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

function createSea() {
	sea = new Sea();
	sea.mesh.position.y = -500;

	scene.add(sea.mesh);
}

function createSky() {
	sky = new Sky();
	sky.mesh.position.y = -600;

	scene.add(sky.mesh);
}

function createPlane() {
	const scale = 0.175;

	airplane = new AirPlane();
	airplane.mesh.scale.set(scale, scale, scale);
	airplane.mesh.position.y = 200;
	scene.add(airplane.mesh);
}

function updatePlane() {
	const targetX = normalize(mouse.x, -1, 1, -100, 100);
	const targetY = normalize(mouse.y, -1, 1, 100, 225);

	airplane.mesh.position.y = targetY;
	airplane.mesh.position.x = targetX;

	airplane.propeller.rotation.x += 0.3;
}

function normalize(v, vmin, vmax, tmin, tmax) {
	const nv = Math.max(Math.min(v, vmax), vmin);
	const dv = vmax - vmin;
	const pc = (nv - vmin) / dv;
	const dt = tmax - tmin;
	const tv = tmin + pc * dt;

	return tv;
}

function loop() {
	airplane.propeller.rotation.x += 0.3;
	sky.mesh.rotation.z += 0.01;

	sea.moveWaves();

	// updatePlane();

	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

function handleWindowResize() {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	renderer.setSize(WIDTH, HEIGHT);

	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
	const tx = -1 + (event.clientX / WIDTH) * 2;
	const ty = -1 + (event.clientY / HEIGHT) * 2;

	mouse = { x: tx, y: ty };
}

initial();
