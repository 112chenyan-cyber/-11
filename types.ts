import React from 'react';

export interface ChristmasTreeProps {
  triggerExplosion: boolean;
  onParticlesGenerated: (positions: Float32Array) => void;
}

export interface OrnamentsProps {
  particlePositions: Float32Array;
  count?: number;
  triggerExplosion?: boolean;
}

export interface SpecialParticlesProps {
  giftScale?: number; // Optional now as we use global zoom, but kept for compatibility
  triggerExplosion: boolean;
}

export interface OrnamentData {
  basePos: any; // Vector3
  explosionDir: any; // Vector3
  scale: number;
  timeOffset: number;
  swaySpeed: number;
}

// Augment React's module-scoped JSX namespace (common in React 18+ setups)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      points: any;
      bufferGeometry: any;
      float32BufferAttribute: any;
      instancedMesh: any;
      sphereGeometry: any;
      capsuleGeometry: any; 
      octahedronGeometry: any; 
      color: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      shaderMaterial: any;
      primitive: any;
      group: any;
      mesh: any;
      [elemName: string]: any;
    }
  }
}

// Augment global JSX namespace (legacy/standard)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      points: any;
      bufferGeometry: any;
      float32BufferAttribute: any;
      instancedMesh: any;
      sphereGeometry: any;
      capsuleGeometry: any; 
      octahedronGeometry: any; 
      color: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      shaderMaterial: any;
      primitive: any;
      group: any;
      mesh: any;
      [elemName: string]: any;
    }
  }
}