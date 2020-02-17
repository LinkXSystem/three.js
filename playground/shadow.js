import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js";

let renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	10000
);
camera.position.set(250, 200, 300);
camera.lookAt(new THREE.Vector3(0, 0, 0));

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);
scene.fog = new THREE.Fog(0xf5f5f5, 200, 1000);
scene.add(new THREE.AmbientLight(0xffffff));

let light = new THREE.DirectionalLight(0xfffffff, 0.8);
light.position.set(0, 200, 0);
light.castShadow = true;
light.shadow.camera.top = 180;
light.shadow.camera.bottom = -100;
light.shadow.camera.left = -120;
light.shadow.camera.right = 120;
scene.add(light);

let background = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(2000, 2000),
	new THREE.MeshPhongMaterial({ color: 0xb2b2b2 })
);
background.rotation.x = -Math.PI / 2;
background.position.y = -100;
background.castShadow = true;
background.receiveShadow = true;
scene.add(background);

let geometry = new THREE.BoxGeometry(100, 100, 100);
let material = new THREE.MeshStandardMaterial({
	color: 0x25aff3,
	flatShading: THREE.FlatShading,
	metalness: 0,
	roughness: 0.8
});

let cube = new THREE.Mesh(geometry, material);
cube.position.y = 10;
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;
controls.enableZoom = false;
controls.addEventListener("change", function() {
	renderer.render(scene, camera);
});

renderer.render(scene, camera);
