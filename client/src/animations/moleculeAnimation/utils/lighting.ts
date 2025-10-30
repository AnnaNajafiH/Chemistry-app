import * as THREE from "three";

const LIGHT_CONFIG = {
  DARK: {
    ambient: { color: 0x303050, intensity: 3.0 },
    point1: { color: 0x6d8eff, intensity: 1.5 },
    point2: { color: 0x5d7eff, intensity: 1.2 },
    spot: { intensity: 1.2 },
    directional: { intensity: 1.0 },
    rim: { color: 0x3b82f6, intensity: 2.0 },
    glow: { color: 0x3b82f6, intensity: 0.3 },
  },
  LIGHT: {
    ambient: { color: 0x505050, intensity: 2.5 },
    point1: { color: 0xffffff, intensity: 1.2 },
    point2: { color: 0xeeeeff, intensity: 1.0 },
    spot: { intensity: 1.0 },
    directional: { intensity: 0.8 },
    rim: { color: 0xc4d7ff, intensity: 1.0 },
    glow: { color: 0xc4d7ff, intensity: 0.1 }, // Added subtle glow for light mode
  },
};

export function setupLighting(scene: THREE.Scene, isDarkMode: boolean) {
  // Clear existing lights
  scene.children = scene.children.filter(
    (child) => !(child instanceof THREE.Light)
  );

  const config = isDarkMode ? LIGHT_CONFIG.DARK : LIGHT_CONFIG.LIGHT;

  // Create ambient environment lighting
  const ambientLight = new THREE.AmbientLight(
    config.ambient.color,
    config.ambient.intensity
  );
  scene.add(ambientLight);

  // Add multiple light sources for highlights
  const light1 = new THREE.PointLight(
    config.point1.color,
    config.point1.intensity
  );
  light1.position.set(5, 5, 5);
  light1.castShadow = true;
  light1.shadow.radius = 3;
  scene.add(light1);

  const light2 = new THREE.PointLight(
    config.point2.color,
    config.point2.intensity
  );
  light2.position.set(-5, -5, 5);
  light2.castShadow = true;
  light2.shadow.radius = 2;
  scene.add(light2);

  // Add spotlight for extra shininess
  const spotLight = new THREE.SpotLight(0xffffff, config.spot.intensity);
  spotLight.position.set(0, 10, 0);
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.2;
  spotLight.distance = 20;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);

  // Add directional light from the front
  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    config.directional.intensity
  );
  directionalLight.position.set(0, 0, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Add rim light for edge highlighting
  const rimLight = new THREE.PointLight(config.rim.color, config.rim.intensity);
  rimLight.position.set(0, 0, -10);
  scene.add(rimLight);

  // Add bloom/glow effect for dark mode
  if (isDarkMode && config.glow) {
    const glowLight = new THREE.AmbientLight(
      config.glow.color,
      config.glow.intensity
    );
    scene.add(glowLight);
  }
}
