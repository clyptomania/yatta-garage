import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ThreeGlobe from "three-globe";
import lines from "@/public/JSON/lines.json";
import map from "@/public/JSON/map.json";


const Globe: React.FC = () => {
  
  const containerRef = useRef<HTMLDivElement>(null);

  /* ----------------------Boilerplat code for shader compilation------------------------ */
  
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

    /* -------------------------Declare Mouse XY Position--------------------------- */

  const mouse = useRef<{ x?: number; y?: number }>({});

  const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };
  
  const Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })

  setTimeout(() => {
    Globe.arcsData(lines.pulls)
    .arcColor((e) => {
      return e.status? "#9cff00":"#ff4000";
    })
    .arcAltitude((e) => {
      return e.arcAlt;
    })
    .arcStroke((e) => {
      return e.status? 0.5 : 0.3
    })
    .arcDashLength(0.9)
    .arcDashGap(4)
    .arcDashAnimateTime(1000)
    .arcsTransitionDuration(1000)
    .arcDashInitialGap((e) => e.order*1)
    .labelsData(map.Map)
    .labelColor(() => "#ffcb21")
  })
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Will run only on the client side
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      innerWidth / innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#181C42"), 1);

     /* ---------------------------Create 3D Object----------------------------- */

    /*  Loading images asynchronously can sometimes cause timing issues. 
        Ensure that the image is fully loaded before rendering the scene. 
        Use the onload event of the TextureLoader to check when the image is ready: */
    const textureLoader = new THREE.TextureLoader();

    // Create Globe
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 50, 50),
      new THREE.ShaderMaterial({ 
        vertexShader ,
        fragmentShader,
        uniforms: {       //declare all variable to pass through shader
          globeTexture: {
            value: textureLoader.load("/image/The-earth-at-night-2.jpg", () => {
              animate();
            })
          }
        }
       })
    );

    const group = new THREE.Group()
    group.add(sphere);

    // Create Atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 50, 50),
      new THREE.ShaderMaterial({ 
        vertexShader: atmosphereVertexShader ,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
        })
    );

    atmosphere.scale.set(1.1, 1.1, 1.1);

    scene.add(atmosphere); 
    scene.add(group);

    camera.position.z = 10;

    // Animation/rendering loop
    function animate(): any {
      requestAnimationFrame(animate);

      // Rotate the sphere
      sphere.rotation.y += 0.002; // Adjust the rotation speed as needed
      const rotationValueX = mouse.current.x !== undefined ? (mouse.current.x as number) * 0.5 : 0;
      const rotationValueY = mouse.current.y !== undefined ? (mouse.current.y as number) * 0.3 : 0;
      gsap.to(group.rotation, { 
        y: rotationValueX,
        x: -rotationValueY,
        duration: 2 
      });
      renderer.render(scene, camera);
    }
    animate();

    containerRef.current?.appendChild(renderer.domElement);

    return () => {
      renderer.dispose();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty dependency array ensures that useEffect runs only once on mount

  return <div ref={containerRef} />;
};

export default Globe;
