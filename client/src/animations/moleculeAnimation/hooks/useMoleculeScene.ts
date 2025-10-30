import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setupLighting } from "../utils/lighting";
import { defaultMolecule, atomColors, bondColor } from "../constants";
import { createBond } from "../utils/createBond";

interface SceneConfig {
  containerRef: React.RefObject<HTMLDivElement | null>;
  width: number;
  height: number;
  backgroundColor: string;
  isDarkMode: boolean;
  isRotating: boolean;
  rotationSpeed: number;
}

export function useMoleculeScene(config: SceneConfig) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number>(0);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const initRequestRef = useRef<number>(0);

  useEffect(() => {
    let mounted = true;

    // Create resize handler
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = config.width / config.height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(config.width, config.height);
      }
    };

    const initScene = () => {
      const container = config.containerRef.current;
      if (!container || !mounted) {
        console.log("Waiting for container...");
        initRequestRef.current = requestAnimationFrame(initScene);
        return;
      }
      console.log("Container found, initializing scene...");

      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(
        config.isDarkMode ? "#111827" : config.backgroundColor
      );
      sceneRef.current = scene;
      console.log("Scene created");

      // Set up lighting
      setupLighting(scene, config.isDarkMode);

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        60,
        config.width / config.height,
        0.1,
        1000
      );
      camera.position.set(0, 2, 10);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera; // Create renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(config.width, config.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = config.isDarkMode ? 1.4 : 1.2;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.innerHTML = ""; // Clear any existing content
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 5;
      controls.maxDistance = 20;
      controls.maxPolarAngle = Math.PI / 1.5;
      controlsRef.current = controls;

      // Create molecule group
      const moleculeGroup = new THREE.Group();
      moleculeGroup.position.set(0, 0, 0);
      moleculeGroup.scale.set(1.5, 1.5, 1.5); // Make the molecule a bit larger
      scene.add(moleculeGroup);
      moleculeGroupRef.current = moleculeGroup;
      console.log("Molecule group created");

      // Build molecule
      const molecule = defaultMolecule;
      console.log("Building molecule:", molecule);

      // Add atoms
      molecule.atoms.forEach(({ type, position }) => {
        const radius = type === "H" ? 0.25 : type === "O" ? 0.45 : 0.4;
        const atomGeometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({
          color: atomColors[type] || 0xaaaaaa,
          metalness: config.isDarkMode ? 0.4 : 0.3,
          roughness: config.isDarkMode ? 0.1 : 0.2,
          envMapIntensity: 1.0,
          emissive: new THREE.Color(
            atomColors[type] || 0xaaaaaa
          ).multiplyScalar(config.isDarkMode ? 0.25 : 0.15),
          transparent: true,
          opacity: 0.95,
        });

        const sphere = new THREE.Mesh(atomGeometry, material);
        sphere.position.set(...position);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        // Animation properties
        sphere.userData = {
          initialScale: sphere.scale.clone(),
          pulseScale: 1.0 + Math.random() * 0.05,
          pulseDuration: 2 + Math.random() * 2,
          pulseDelay: Math.random() * 2,
          pulseTime: 0,
        };

        moleculeGroup.add(sphere);
      });

      // Add bonds
      molecule.bonds.forEach(([i1, i2]) => {
        const pos1 = new THREE.Vector3(...molecule.atoms[i1].position);
        const pos2 = new THREE.Vector3(...molecule.atoms[i2].position);
        const color1 = atomColors[molecule.atoms[i1].type] || bondColor;
        const color2 = atomColors[molecule.atoms[i2].type] || bondColor;
        const averageColor = new THREE.Color(color1)
          .lerp(new THREE.Color(color2), 0.5)
          .getHex();

        const bond = createBond({
          start: pos1,
          end: pos2,
          radius: 0.12,
          color: averageColor,
          isDarkMode: config.isDarkMode,
        });
        bond.castShadow = true;
        bond.receiveShadow = true;
        moleculeGroup.add(bond);
      });

      // Create resize handler
      const handleResize = () => {
        if (cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = config.width / config.height;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(config.width, config.height);
        }
      };

      // Add resize listener
      window.addEventListener("resize", handleResize);

      // Animation function
      const animate = () => {
        const animationId = requestAnimationFrame(animate);
        frameIdRef.current = animationId;

        if (moleculeGroupRef.current) {
          if (config.isRotating) {
            moleculeGroupRef.current.rotation.y += config.rotationSpeed;
          }
          const time = Date.now() * 0.001;
          moleculeGroupRef.current.position.y = Math.sin(time * 0.5) * 0.1;

          moleculeGroup.children.forEach((child: THREE.Object3D) => {
            if (child.userData?.initialScale) {
              child.userData.pulseTime += 0.016;
              if (child.userData.pulseTime > child.userData.pulseDelay) {
                const normalizedTime =
                  ((child.userData.pulseTime - child.userData.pulseDelay) %
                    child.userData.pulseDuration) /
                  child.userData.pulseDuration;
                const scale =
                  1 +
                  Math.sin(normalizedTime * Math.PI * 2) *
                    0.05 *
                    child.userData.pulseScale;
                child.scale
                  .copy(child.userData.initialScale)
                  .multiplyScalar(scale);
              }
            }
          });
        }

        if (controlsRef.current) {
          controlsRef.current.update();
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      // Start animation
      console.log("Starting animation loop");
      animate();

      window.addEventListener("resize", handleResize);

      // Start animation
      animate();

      // Add resize listener
      window.addEventListener("resize", handleResize);
    };

    // Start initialization
    initScene();

    // Cleanup
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);

      if (initRequestRef.current) {
        cancelAnimationFrame(initRequestRef.current);
      }
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      const container = config.containerRef.current;
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [
    config.containerRef,
    config.width,
    config.height,
    config.backgroundColor,
    config.isDarkMode,
    config.isRotating,
    config.rotationSpeed,
  ]);

  return;
}
