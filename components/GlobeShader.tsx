import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const GlobeComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    // Shader materials
    const vertexShader = `
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main() {
      vertexUV = uv;
      vertexNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
    }
  `;
  
  const fragmentShader = `
    uniform sampler2D globeTexture;
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main() {
      float intensity = 1.05 - dot(
        vertexNormal, vec3(0.0, 0.0, 1.0));
      vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
      gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 0.9);
    }
  `;

  const atmosphereVertexShader = `
    varying vec3 vertexNormal;

    void main() {
      vertexNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 0.9 );
    }      
  `;

  const atmosphereFragmentShader = `
    varying vec3 vertexNormal;

    void main() {
      float intensity = pow(0.3 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
      gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
    }
  `;

    // Globe creation
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load("/image/The-earth-at-night-2.jpg")
          }
        }
      })
    );
    scene.add(sphere);

    // Atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(3.1, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
      })
    );
    scene.add(atmosphere);

    camera.position.z = 10;

    // Function to convert lat/long to Vector3
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Create an arc between Berlin and New York
    const berlinPosition = latLongToVector3(52.5200, 13.4050, 3); // Berlin coordinates
    const newYorkPosition = latLongToVector3(40.7128, -74.0060, 3); // New York coordinates
    const curve = new THREE.CubicBezierCurve3(
      berlinPosition,
      berlinPosition.clone().add(new THREE.Vector3(1, 3, 0)),
      newYorkPosition.clone().add(new THREE.Vector3(-1, 3, 0)),
      newYorkPosition
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const arc = new THREE.Line(geometry, material);
    scene.add(arc);

    // Initialize drawRange to zero
    geometry.setDrawRange(0, 0);

    // Animate the drawRange
    const totalLength = points.length;
    gsap.to({ drawRange: 0 }, {
      drawRange: totalLength,
      onUpdate: function() {
        geometry.setDrawRange(0, this.targets()[0].drawRange);
        geometry.attributes.position.needsUpdate = true; // Required to update the geometry
      },
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default GlobeComponent;
