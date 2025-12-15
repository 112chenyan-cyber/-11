import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { Group } from 'three';
import ChristmasTree from './components/ChristmasTree';
import Ornaments from './components/Ornaments';
import SpecialParticles from './components/SpecialParticles';
import BackgroundParticles from './components/BackgroundParticles'; 
import Overlay from './components/Overlay';

const SceneContent: React.FC<{ 
  explosionTriggered: boolean; 
  handleParticlesGenerated: (pos: Float32Array) => void;
  particlePositions: Float32Array | null;
}> = ({ explosionTriggered, handleParticlesGenerated, particlePositions }) => {
  return (
    <group>
      {/* Streaming Background Particles */}
      <BackgroundParticles />

      {/* Main Content */}
      <ChristmasTree 
        triggerExplosion={explosionTriggered} 
        onParticlesGenerated={handleParticlesGenerated} 
      />
      
      {particlePositions && (
        <Ornaments 
          particlePositions={particlePositions} 
          triggerExplosion={explosionTriggered}
        />
      )}

      {/* Luxury Decor: Star, Gifts, Ribbons, Bells, Canes */}
      <SpecialParticles 
         triggerExplosion={explosionTriggered}
      />
    </group>
  );
};

const App: React.FC = () => {
  const [explosionTriggered, setExplosionTriggered] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Float32Array | null>(null);

  const handleToggleMagic = () => {
    setExplosionTriggered((prev) => !prev);
  };

  const handleParticlesGenerated = (positions: Float32Array) => {
    if (!particlePositions) {
      setParticlePositions(positions);
    }
  };

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden cursor-pointer" 
      onClick={handleToggleMagic}
    >
      <Canvas
        camera={{ position: [0, 2, 22], fov: 45 }}
        dpr={[1, 2]} 
        gl={{ antialias: false, toneMappingExposure: 1.1 }} 
      >
        <color attach="background" args={['#050805']} /> 
        
        <Suspense fallback={null}>
            <Environment preset="city" />
        </Suspense>
        
        {/* Scene Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffaa00" />
        <pointLight position={[-10, 5, -10]} intensity={0.8} color="#00ff88" />
        <spotLight position={[0, 25, 0]} intensity={3} angle={0.6} penumbra={1} color="#ffdf80" />

        <SceneContent 
            explosionTriggered={explosionTriggered}
            handleParticlesGenerated={handleParticlesGenerated}
            particlePositions={particlePositions}
        />

        {/* Post Processing */}
        <EffectComposer disableNormalPass>
           <Bloom 
             luminanceThreshold={0.25} 
             mipmapBlur 
             intensity={1.0} 
             radius={0.5}
             levels={8}
           />
           <ToneMapping 
             contrast={1.1} 
             saturation={1.0} 
           />
        </EffectComposer>

        {/* Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={5} 
          maxDistance={40}
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate={!explosionTriggered} 
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* UI Overlay */}
      <Overlay 
        onToggleMagic={handleToggleMagic} 
        isExploding={explosionTriggered} 
      />
    </div>
  );
};

export default App;