import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';

const container = document.getElementById('three-scene');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 4, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Materials
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.7,
    roughness: 0.25
});

const weightMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.4,
    roughness: 0.35
});

// Dumbbell group
const dumbbell = new THREE.Group();

// Handle
const handleGeometry = new THREE.CylinderGeometry(0.18, 0.18, 3.2, 32);
const handle = new THREE.Mesh(handleGeometry, metalMaterial);
handle.rotation.z = Math.PI / 2;
dumbbell.add(handle);

// Left weights
const leftWeight1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.65, 0.35, 32),
    weightMaterial
);
leftWeight1.rotation.z = Math.PI / 2;
leftWeight1.position.x = -1.75;
dumbbell.add(leftWeight1);

const leftWeight2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.3, 32),
    weightMaterial
);
leftWeight2.rotation.z = Math.PI / 2;
leftWeight2.position.x = -1.35;
dumbbell.add(leftWeight2);

// Right weights
const rightWeight1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.65, 0.35, 32),
    weightMaterial
);
rightWeight1.rotation.z = Math.PI / 2;
rightWeight1.position.x = 1.75;
dumbbell.add(rightWeight1);

const rightWeight2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.3, 32),
    weightMaterial
);
rightWeight2.rotation.z = Math.PI / 2;
rightWeight2.position.x = 1.35;
dumbbell.add(rightWeight2);

// Small food sphere beside it
// Egg white
const eggWhite = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9
    })
);

eggWhite.scale.set(1.2, 0.8, 1);

eggWhite.position.set(0, -1.3, 0);

scene.add(eggWhite);

// Egg yolk
const yolk = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xffcc33,
        metalness: 0.1,
        roughness: 0.5
    })
);

yolk.position.set(0, -1.15, 0.35);

scene.add(yolk);

scene.add(dumbbell);

camera.position.z = 4;
dumbbell.scale.set(1.4, 1.4, 1.4);
dumbbell.position.y = 0.6;

eggWhite.scale.set(1.4, 0.9, 1.4);
eggWhite.position.y = -0.8;

yolk.scale.set(1.2, 1.2, 1.2);
yolk.position.y = -0.65;

function animate() {
    requestAnimationFrame(animate);

    dumbbell.rotation.y += 0.01;
    dumbbell.rotation.x = 0.25;

    eggWhite.rotation.y += 0.01;
    yolk.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});