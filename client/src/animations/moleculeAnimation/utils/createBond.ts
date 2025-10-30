import * as THREE from "three";
import { Vector3 } from "three";
import { MATERIAL_PROPERTIES } from "../constants";

interface BondCreateOptions {
  start: Vector3;
  end: Vector3;
  radius: number;
  color: number;
  isDarkMode?: boolean;
}
export function createBond({
  start,
  end,
  radius,
  color,
  isDarkMode = false,
}: BondCreateOptions): THREE.Mesh {
  const dir = new Vector3().subVectors(end, start);
  const length = dir.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);

  // Enhanced material with animation-friendly properties
  const materialProps = isDarkMode
    ? MATERIAL_PROPERTIES.DARK
    : MATERIAL_PROPERTIES.LIGHT;
  const material = new THREE.MeshPhysicalMaterial({
    color,
    metalness: materialProps.metalness,
    roughness: materialProps.roughness,
    transparent: true,
    opacity: 0.95,
    emissive: new THREE.Color(color).multiplyScalar(
      materialProps.emissiveIntensity
    ),
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
  });

  const cylinder = new THREE.Mesh(geometry, material);

  const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
  cylinder.position.copy(midpoint);
  cylinder.quaternion.setFromUnitVectors(
    new Vector3(0, 1, 0),
    dir.clone().normalize()
  );

  return cylinder;
}
