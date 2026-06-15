import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function addRoadsideDaylilies(map, roadRows) {
  const locations = roadRows.flat();
  if (locations.length === 0) {
    return;
  }

  const origin = maplibregl.MercatorCoordinate.fromLngLat(locations[0], 0);
  const mercatorScale = origin.meterInMercatorCoordinateUnits();
  const modelScale = 4.2;

  map.addLayer({
    id: "roadside-daylily-models",
    type: "custom",
    renderingMode: "3d",

    onAdd(mapInstance, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();
      this.scene.add(new THREE.HemisphereLight(0xfff4d6, 0x31593a, 2.4));

      const sun = new THREE.DirectionalLight(0xffffff, 2.8);
      sun.position.set(30, -35, 55);
      this.scene.add(sun);

      new GLTFLoader().load("images/daylily-bloom.glb", (gltf) => {
        const modelBox = new THREE.Box3().setFromObject(gltf.scene);
        const groundOffset = Number.isFinite(modelBox.min.y) ? -modelBox.min.y * modelScale : 0;

        locations.forEach((location, index) => {
          const coordinate = maplibregl.MercatorCoordinate.fromLngLat(location, 0);
          const plant = gltf.scene.clone(true);
          plant.position.set(
            (coordinate.x - origin.x) / mercatorScale,
            groundOffset,
            (coordinate.y - origin.y) / mercatorScale
          );
          plant.rotation.z = index % 2 === 0 ? -0.18 : 0.18;
          plant.scale.setScalar(modelScale);
          this.scene.add(plant);
        });
        mapInstance.triggerRepaint();
      });

      this.renderer = new THREE.WebGLRenderer({
        canvas: mapInstance.getCanvas(),
        context: gl,
        antialias: true
      });
      this.renderer.autoClear = false;
    },

    render(gl, args) {
      const mapMatrix = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
      const modelMatrix = new THREE.Matrix4()
        .makeTranslation(origin.x, origin.y, origin.z)
        .scale(new THREE.Vector3(mercatorScale, -mercatorScale, mercatorScale))
        .multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));

      this.camera.projectionMatrix = mapMatrix.multiply(modelMatrix);
      this.renderer.resetState();
      this.renderer.render(this.scene, this.camera);
      map.triggerRepaint();
    }
  });
}
