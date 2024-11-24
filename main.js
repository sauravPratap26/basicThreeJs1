import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const canvas = document.getElementById("canvas");

//CREATING A SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color("#F0F0F0");

//CREATING THE CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;


//CREATING THE OBJECT 1
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: "#468585", emissive:'#468585' });

//CREATING THE MESH
const dodecahedron = new THREE.Mesh(geometry, material);

//CREATING THE OBJECT 2
const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ color: "#B4B4B3",emissive:'#B4B4B3' });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

box.position.y = -1.5;

//ADDING IN THE SCENE
scene.add(dodecahedron);
scene.add(box);

//ADDING THE LIGHT
const light = new THREE.SpotLight("#006769", 100);
light.position.set(1, 1, 1);
scene.add(light);

//RENDERER
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setPixelRatio(window.devicePixelRatio); // this helps to render properly in mobile devices as well
renderer.setSize(window.innerWidth, window.innerHeight);

//ADD ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

//ADD ANIMATIONS
function animate() {
  requestAnimationFrame(animate);
  
  dodecahedron.rotation.x += 0.001;
  dodecahedron.rotation.y += 0.01;
  box.rotation.y -= 0.005;
  
  controls.update()
  renderer.render(scene, camera);
}

//HANDLE WINDOW RESIZE
window.addEventListener('resize',()=>{
camera.aspect= window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,innerHeight)
})

animate();
