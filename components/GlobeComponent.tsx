import React, { useEffect, useRef } from "react";
import * as THREE from "three";


const Globe: React.FC = () => {
  
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Boilerplat code for shader compilation
  const vertexShader = `
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main() {
      vertexUV = uv;
      vertexNormal = normal;
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
      gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
    }
  `;

  useEffect(() => {
    // Code inside useEffect will run only on the client side
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

    // Create the 3D object here

    /*  Loading images asynchronously can sometimes cause timing issues. 
        Ensure that the image is fully loaded before rendering the scene. 
        Use the onload event of the TextureLoader to check when the image is ready: */
    const textureLoader = new THREE.TextureLoader();

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 50, 50),
      new THREE.ShaderMaterial({ 
        // map: texture
        vertexShader ,
        fragmentShader,
        uniforms: {       //declare all variable to pass through shader
          globeTexture: {
            value: textureLoader.load("/image/8081_earthbump4k.jpg", () => {
              animate();
            })
          }
        }
       })
    );

    scene.add(sphere);
    camera.position.z = 10;

    // Animation/rendering loop
    function animate(): any {
      requestAnimationFrame(animate);

      // Rotate the sphere
      // sphere.rotation.y += 0.01; // Adjust the rotation speed as needed

      renderer.render(scene, camera);
    }

    animate();

    containerRef.current?.appendChild(renderer.domElement);

    return () => {
      renderer.dispose();
    };
  }, []); // The empty dependency array ensures that useEffect runs only once on mount

  return <div ref={containerRef} />;
};

export default Globe;
