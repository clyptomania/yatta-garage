/* import React, { useEffect } from 'react';
import Globe from 'globe.gl';

interface Point {
  text: string;
  size: number;
  Country: string;
  City: string;
  lat: number;
  lng: number;
}

const Test = () => {
  useEffect(() => {
    const loadMapData = async () => {
      const mapData = await import("@/public/JSON/map.json");
      const points: Point[] = mapData['Co-ordinates'].map((e: any) => ({
        text: e.text,
        size: e.size,
        Country: e.Country,
        City: e.City,
        lat: parseFloat(e.lat),
        lng: parseFloat(e.lng)
      }));

      console.log("points", points);

      const arcsData = points.length > 1 ? [{
        startLat: points[0].lat,
        startLng: points[0].lng,
        endLat: points[1].lat,
        endLng: points[1].lng,
        color: "red"
      }] : [];

      console.log("arcsData", arcsData);

      const globeElement = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        (document.getElementById('main-content') as HTMLElement);

      globeElement
        .arcsData(arcsData)
        .arcColor(() => "red")
        .arcAltitude(0.1)
        .arcStroke(0.5)
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000);
    };

    loadMapData();
  }, []);

  return <div id="main-content" style={{ width: '100%', height: '100vh' }} />;
};

export default Test;
 */

import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import gsap from "gsap";

interface Point {
  text: string;
  size: number;
  Country: string;
  City: string;
  lat: number;
  lng: number;
}

const Test = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    const scene = new THREE.Scene();
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
              gsap.to(sphere.material.uniforms.globeTexture, {
                duration: 1,
                value: textureLoader.load("/image/The-earth-at-night-2.jpg")
              })
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

    const loadMapData = async () => {
      const mapData = await import("@/public/JSON/map.json");
      const points: Point[] = mapData['Co-ordinates'].map((e: any) => ({
        text: e.text,
        size: e.size,
        Country: e.Country,
        City: e.City,
        lat: parseFloat(e.lat),
        lng: parseFloat(e.lng)
      }));

      console.log("points", points);

      const arcsData = points.length > 1 ? [{
        startLat: points[0].lat,
        startLng: points[0].lng,
        endLat: points[1].lat,
        endLng: points[1].lng,
      }] : [];

      console.log("arcsData", arcsData);

      const globeElement = Globe()
        .globeImageUrl('/image/The-earth-at-night-2.jpg')
        .backgroundColor("#181C42")
        (document.getElementById('main-content') as HTMLElement);

      globeElement
        .arcsData(arcsData)
        .arcColor(() => "#ff4000")
        .arcAltitude(0.1)
        .arcStroke(0.5)
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000);
    };

    loadMapData();

    return () => {
      // cleanup
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }}>
      <div id="main-content" style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Test;
