//Navbar
const toggle = document.querySelector("i");
let flag = false;
toggle.addEventListener("click", () => {
  if (!flag) {
    document.querySelector(".nav-links").style.top = "120%";
    flag = true;
    document.getElementById("toggle_icon").classList.remove("bx-menu");
    document.getElementById("toggle_icon").classList.add("bx-x");
  } else {
    document.querySelector(".nav-links").style.top = "-500%";
    flag = false;
    document.getElementById("toggle_icon").classList.remove("bx-x");
    document.getElementById("toggle_icon").classList.add("bx-menu");
  }
});

//scrole to top visible or hidden
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

//? Mascot ASU-77
import * as THREE from "https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports,min/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports,min/unoptimized/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports,min/unoptimized/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports,min/unoptimized/examples/jsm/loaders/DRACOLoader.js";
// import { FontLoader } from "";

let mixer;
var mouseX = 0;
var mouseY = 0;
var pointLights = [];

const modelwithtext = document.getElementById("modelwithtext");

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(300, 300);
renderer.outputEncoding = THREE.sRGBEncoding;
modelwithtext.prepend(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator(renderer);

//scene
const scene = new THREE.Scene();
scene.environment = pmremGenerator.fromScene(
  new RoomEnvironment(),
  0.04
).texture;

//camera
const camera = new THREE.PerspectiveCamera(40, 230 / 200, 1, 100);
camera.position.set(6, 2, -4);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(1.4, 1.2, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;

//lights
var light = new THREE.SpotLight(16726440, 0.5);
light.angle = 0.5;
light.decay = 1;
light.position.set(-50.56, -21.69, 50.41);
scene.add(light);

var pointLight = new THREE.PointLight(216285, 3.1);
pointLight.decay = 1;
pointLight.position.set(-2.37, -18.15, 20.48);
scene.add(pointLight);

var sphere = new THREE.SphereGeometry(0.1, 16, 8);
for (var i = 0; i <= 8; i++) {
  light = new THREE.PointLight(16726440, 0.8, 10);
  light.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 16726440 }))
  );

  scene.add(light);
  pointLights.push(light);
}

//Loading Screen
const manager = new THREE.LoadingManager(() => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("fade-out");

  loadingScreen.addEventListener("transitionend", onTransitionEnd);
});

// GSAP Animation
let tl = gsap.timeline();

//Model
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=raw,min/examples/js/libs/draco/gltf"
);

var model;
const loader = new GLTFLoader(manager);
loader.setDRACOLoader(dracoLoader);
loader.load(
  "./assets/3d_model/drone.glb",
  function (gltf) {
    model = gltf.scene;
    model.position.set(1, 1.2, 0);
    model.scale.set(0.018, 0.018, 0.018);

    if (window.innerWidth <= 700) {
      model.position.set(1.5, 1, 0);
      model.scale.set(0.016, 0.016, 0.016);
    }

    scene.add(model);

    //gsap animation

    tl.to(gltf.scene.position, {
      //Up down
      y: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      // repeatDelay: 1,
    });

    tl.to(gltf.scene.rotation, {
      // side ways
      y: -1.4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });

    // tl.to(gltf.scene.rotation, {
    //   y: 0.001,
    //   duration: 2,
    //   yoyo: true,
    //   repeat: -1,
    //   // repeatDelay: 3,
    // });

    animate();
  },
  undefined,
  function (e) {
    console.error(e);
  }
);

//On Resize
window.onresize = function () {
  camera.aspect = 230 / 200;
  camera.updateProjectionMatrix();
  renderer.setSize(300, 300);
};

// Follows the mouse event
document.addEventListener("mousemove", onMouseMove, false); //Mouse move

function onMouseMove(event) {
  event.preventDefault();

  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerWidth) * 2 - 1;
}

// Animate
function animate() {
  requestAnimationFrame(animate);

  if (model && window.innerWidth >= 700) {
    model.rotation.y = mouseX * 0.7;
    model.rotation.x = mouseY * -0.2;
  }

  var time = Date.now() * 0.0008;
  pointLights[0].position.x = Math.sin(time * 0.3) * 15;
  pointLights[0].position.y = Math.sin(time * 0.5) * 10;
  pointLights[0].position.z = Math.cos(time * 0.4) * 10;

  pointLights[1].position.x = Math.sin(time * 0.6) * 10;
  pointLights[1].position.y = Math.cos(time * 0.7) * 10;
  pointLights[1].position.z = Math.sin(time * 0.3) * 15;

  pointLights[2].position.x = Math.cos(time * 0.5) * 15;
  pointLights[2].position.y = Math.cos(time * 0.6) * 10;
  pointLights[2].position.z = Math.sin(time * 0.8) * 10;

  pointLights[3].position.x = Math.sin(time * 0.3) * 10;
  pointLights[3].position.y = Math.cos(time * 0.5) * 15;
  pointLights[3].position.z = Math.cos(time * 0.7) * 10;

  pointLights[4].position.x = Math.sin(time * 0.7) * 15;
  pointLights[4].position.y = Math.sin(time * 0.3) * 20;
  pointLights[4].position.z = Math.cos(time * 0.2) * 10;

  pointLights[5].position.x = Math.sin(time * 0.5) * 20;
  pointLights[5].position.y = Math.cos(time * 0.8) * 10;
  pointLights[5].position.z = Math.sin(time * 0.5) * 15;

  pointLights[6].position.x = Math.sin(time * 0.5) * 10;
  pointLights[6].position.y = Math.cos(time * 0.8) * 10;
  pointLights[6].position.z = Math.cos(time * 0.7) * 15;

  pointLights[7].position.x = Math.sin(time * 0.3) * 10;
  pointLights[7].position.y = Math.cos(time * 0.5) * 15;
  pointLights[7].position.z = Math.sin(time * 0.2) * 10;

  pointLights[8].position.x = Math.sin(time * 0.8) * 15;
  pointLights[8].position.y = Math.cos(time * 0.3) * 10;
  pointLights[8].position.z = Math.cos(time * 0.3) * 10;

  renderer.render(scene, camera);
}
function onTransitionEnd(event) {
  event.target.remove();
}
