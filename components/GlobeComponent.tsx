import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import map from "@/public/JSON/map.json";

const Globe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // get the cityMap from the JSON file
  const cityMap = map['Co-ordinates'];

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
  
  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#181C42"), 1);

    containerRef.current?.appendChild(renderer.domElement);

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

    const group = new THREE.Group()
    group.add(sphere);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(3.1, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
      })
    );
    atmosphere.scale.set(1.1, 1.1, 1.1);
    
    scene.add(atmosphere);
    scene.add(group);

    camera.position.z = 10;

    const latLongToVector3 = (lat: number, lon: number, radius: number = 3) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Function to add arcs to the globe
    const addArcsToGlobe = (arcData: any[]) => {
      let animateData: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] = [];
      arcData.forEach(data => {
        const startPoint = latLongToVector3(data.startLat, data.startLng);
        const endPoint = latLongToVector3(data.endLat, data.endLng);
        const midPoint1 = startPoint.clone().lerp(endPoint, 0.25).add(new THREE.Vector3(0, altitude, 0));
        const midPoint2 = startPoint.clone().lerp(endPoint, 0.75).add(new THREE.Vector3(0, altitude, 0));
        const curve = new THREE.CubicBezierCurve3(startPoint, midPoint1, midPoint2, endPoint);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const arc = new THREE.Line(geometry, material);
        
        scene.add(arc);
        group.add(arc);
        animateData.push(geometry);
      });
      return animateData;
    };

    let currentArcs = 0; // Tracks the current number of arcs
    const maxArcs = 20;   // Maximum number of arcs allowed
    const arcDelay = 0; // Delay before starting each arc animation
    
    function animateArcs(number = 0, startPoint?: [number, number], endPoint?: [number, number]) {
      if (currentArcs >= maxArcs) {
        // Maximum number of arcs reached, do not create more
        return;
      }
    
      // Generate arc data
      let animateData;
      if (startPoint && endPoint) {
        animateData = addArcsToGlobe([{
          startLat: startPoint[0],
          startLng: startPoint[1],
          endLat: endPoint[0],
          endLng: endPoint[1],
          color: 'red'
        }]);
      } else {
        animateData = addArcsToGlobe(generateRandomArcsData(number));
      }
    
      animateData.forEach((data) => {
        data.setDrawRange(0, 0);
        const animObject = { start: 0, end: 0 };
        const totalLength = data.attributes.position.array.length / 3;
    
        gsap.delayedCall(arcDelay, () => {
          currentArcs++;
          gsap.to(animObject, {
            end: totalLength,
            onUpdate: function() {
              data.setDrawRange(animObject.start, animObject.end - animObject.start);
            },
            duration: 2,
            ease: "power1.inOut",
            onComplete: function() {
              gsap.to(animObject, {
                start: totalLength,
                onUpdate: function() {
                  data.setDrawRange(animObject.start, animObject.end - animObject.start);
                },
                duration: 2,
                ease: "power1.inOut",
                onComplete: function() {
                  animObject.start = animObject.end = 0;
                  currentArcs--; 
                  if (currentArcs < maxArcs) {
                    animateArcs(2);
                  }
                }
              });
            }
          });
        });
      });
    }

    // Function to convert lat/long to globe rotation
    const latLongToRotation = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Euler(phi, theta, 0, 'XYZ');
    };

    // Set the initial rotation of the globe to center on Germany
    const germanyCoordinates = { lat: 51, lon: 70 };
    group.rotation.copy(latLongToRotation(germanyCoordinates.lat, germanyCoordinates.lon));

    // Function to rotate the globe
    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();

    function generateRandomArcsData(numberOfArcs: number) {
      const arcsData = [];
      for (let i = 0; i < numberOfArcs; i++) {
        // Randomly pick two different cities
        const city1 = cityMap[Math.floor(Math.random() * cityMap.length)];
        let city2 = cityMap[Math.floor(Math.random() * cityMap.length)];
        while (city1.City === city2.City) {
          city2 = cityMap[Math.floor(Math.random() * cityMap.length)];
        }
        const arcData = {
          startLat: parseFloat(city1.lat),
          startLng: parseFloat(city1.lng),
          endLat: parseFloat(city2.lat),
          endLng: parseFloat(city2.lng),
          color: 'red'
        };
        arcsData.push(arcData);
      }
      return arcsData;
    }

    // Setting the altitude of the arcs
    const altitude = 1;
    // Function Call to animate arcs
    // Just pass the number of arcs you want to animate
    // animateArcs(10);
    // Or pass the start and end point of the arc
    // Berlin to New York
    // animateArcs(0, [50.1151, 8.6701], [40.7128, -74.0060]);
    animateArcs(0, [50.1, 8.6], [40.7, -74]);

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Globe;
