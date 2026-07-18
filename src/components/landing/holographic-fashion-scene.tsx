"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type OrbitItem = {
  root: THREE.Group;
  radiusX: number;
  radiusY: number;
  speed: number;
  phase: number;
  height: number;
  tilt: number;
  baseScale: number;
};

const ASSET_ROOT = "/images/landing/trust/scene";

function makeImagePlane(
  texture: THREE.Texture,
  width: number,
  height: number,
  opacity = 1,
) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const root = new THREE.Group();
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity,
    alphaTest: 0.025,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: true,
    toneMapped: false,
  });

  const image = new THREE.Mesh(geometry, material);
  root.add(image);

  const glowMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.22,
    alphaTest: 0.015,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const glow = new THREE.Mesh(geometry, glowMaterial);
  glow.position.z = -0.025;
  glow.scale.setScalar(1.055);
  root.add(glow);

  return root;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.Line)) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if ("map" in material && material.map instanceof THREE.Texture) material.map.dispose();
      material.dispose();
    });
  });
}

export function HolographicFashionScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 10.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const world = new THREE.Group();
    world.position.y = -0.08;
    scene.add(world);

    const loader = new THREE.TextureLoader();
    const textureUrls = {
      woman: `${ASSET_ROOT}/woman.webp`,
      dress: `${ASSET_ROOT}/dress.webp`,
      skirt: `${ASSET_ROOT}/skirt.webp`,
      shorts: `${ASSET_ROOT}/shorts.webp`,
      jacket: `${ASSET_ROOT}/jacket.webp`,
    };

    let woman: THREE.Group | null = null;
    const orbitItems: OrbitItem[] = [];

    Promise.all(
      Object.entries(textureUrls).map(([key, url]) =>
        loader.loadAsync(url).then((texture) => [key, texture] as const),
      ),
    ).then((entries) => {
      if (!host.isConnected) return;
      const textures = Object.fromEntries(entries) as Record<keyof typeof textureUrls, THREE.Texture>;

      woman = makeImagePlane(textures.woman, 3.35, 5.45, 1);
      woman.position.set(0, -0.1, 0);
      woman.rotation.y = -0.03;
      world.add(woman);

      const specs: Array<{
        key: "dress" | "skirt" | "shorts" | "jacket";
        width: number;
        height: number;
        radiusX: number;
        radiusY: number;
        speed: number;
        phase: number;
        heightOffset: number;
        tilt: number;
        scale: number;
      }> = [
        { key: "dress", width: 2.45, height: 2.3, radiusX: 3.25, radiusY: 0.72, speed: 0.34, phase: 0.2, heightOffset: 0.86, tilt: -0.08, scale: 0.92 },
        { key: "skirt", width: 2.35, height: 2.2, radiusX: 3.35, radiusY: 0.62, speed: -0.29, phase: 1.65, heightOffset: 1.18, tilt: 0.1, scale: 0.88 },
        { key: "shorts", width: 2.4, height: 2.18, radiusX: 3.05, radiusY: 0.82, speed: 0.27, phase: 3.05, heightOffset: -0.82, tilt: -0.06, scale: 0.9 },
        { key: "jacket", width: 2.55, height: 2.42, radiusX: 3.45, radiusY: 0.7, speed: -0.24, phase: 4.7, heightOffset: -0.34, tilt: 0.08, scale: 0.9 },
      ];

      specs.forEach((spec) => {
        const root = makeImagePlane(textures[spec.key], spec.width, spec.height, 0.98);
        root.rotation.z = spec.tilt;
        root.scale.setScalar(spec.scale);
        world.add(root);
        orbitItems.push({
          root,
          radiusX: spec.radiusX,
          radiusY: spec.radiusY,
          speed: spec.speed,
          phase: spec.phase,
          height: spec.heightOffset,
          tilt: spec.tilt,
          baseScale: spec.scale,
        });
      });
    });

    const platform = new THREE.Mesh(
      new THREE.RingGeometry(1.18, 2.2, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff214d,
        transparent: true,
        opacity: 0.27,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = -2.83;
    world.add(platform);

    const orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.45, 0.012, 6, 160),
      new THREE.MeshBasicMaterial({
        color: 0xff4266,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    orbitRing.rotation.x = Math.PI / 2.5;
    orbitRing.rotation.z = 0.18;
    world.add(orbitRing);

    const orbitRingBlue = orbitRing.clone();
    orbitRingBlue.scale.setScalar(0.84);
    orbitRingBlue.rotation.x = Math.PI / 2.15;
    orbitRingBlue.rotation.z = -0.2;
    (orbitRingBlue.material as THREE.MeshBasicMaterial) = new THREE.MeshBasicMaterial({
      color: 0x58c9ff,
      transparent: true,
      opacity: 0.23,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    world.add(orbitRingBlue);

    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 1.5 + Math.random() * 4.1;
      const angle = Math.random() * Math.PI * 2;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 6.2;
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.58;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xff5d78,
        size: 0.035,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    world.add(particles);

    const pointer = new THREE.Vector2();
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    host.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const motion = reducedMotion ? 0.16 : 1;

      if (woman) {
        woman.position.y = -0.1 + Math.sin(elapsed * 0.72) * 0.09 * motion;
        woman.rotation.y = -0.03 + Math.sin(elapsed * 0.42) * 0.045 * motion;
      }

      orbitItems.forEach((item, index) => {
        const angle = elapsed * item.speed * motion + item.phase;
        const depth = Math.sin(angle) * 2.05;
        item.root.position.set(
          Math.cos(angle) * item.radiusX,
          item.height + Math.sin(angle * 1.7 + index) * item.radiusY,
          depth,
        );
        const proximity = THREE.MathUtils.clamp((depth + 2.2) / 4.4, 0, 1);
        const scale = item.baseScale * THREE.MathUtils.lerp(0.82, 1.1, proximity);
        item.root.scale.setScalar(scale);
        item.root.rotation.y = -Math.sin(angle) * 0.22;
        item.root.rotation.z = item.tilt + Math.sin(angle * 1.35) * 0.055;
      });

      world.rotation.y += (pointer.x * 0.055 - world.rotation.y) * 0.035;
      world.rotation.x += (-pointer.y * 0.025 - world.rotation.x) * 0.035;
      particles.rotation.y = elapsed * 0.035 * motion;
      orbitRing.rotation.z = 0.18 + elapsed * 0.075 * motion;
      orbitRingBlue.rotation.z = -0.2 - elapsed * 0.06 * motion;
      platform.material.opacity = 0.22 + Math.sin(elapsed * 1.55) * 0.055;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      disposeObject(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} aria-label="Escena holográfica de moda con profundidad 3D" />;
}
