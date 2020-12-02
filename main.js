let scene, camera, renderer, controls, hemiLight, spotLight;
function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,500);
  camera.position.set(10,13.7 ,10);
  renderer = new THREE.WebGLRenderer();
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 200;
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
  scene.add(hemiLight);
  light = new THREE.SpotLight(0xffa95c,4);
  light.castShadow = true;
  light.position.set(50,50,50);
  renderer.shadowMap.enabled = true;
  light.shadow.bias = -0.0001;
  light.shadow.mapSize.width = 1024*4;
  light.shadow.mapSize.height = 1024*4;
  scene.add( light );
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 0.8;

  scene.add( new THREE.AxesHelper(500));


  new THREE.GLTFLoader().load('scene.gltf', result => {
      model = result.scene.children[0];
      model.position.set(10,13.7 ,10);
      model.traverse(n => {
        model.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
          if(n.material.map) n.material.map.anisotropy = 16; 
        }});
      })
      scene.add(model);
      animate();
  });
  
  
}
function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
  model.rotation.z += 0.005;
  light.position.set( 
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 50,
  );
}
init();
