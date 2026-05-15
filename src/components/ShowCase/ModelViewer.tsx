import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  OrbitControls,
  ContactShadows,
  Sparkles,
} from "@react-three/drei";
import { Suspense } from "react";

type ModelProps = {
  modelPath: string;
};

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath);

  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
  <Canvas   camera={{ position: [0, 0, 5], fov: 45 }}>
  <Suspense fallback={null}>
    
    <ambientLight intensity={0.5} />

    <Model modelPath={"/mushroom.glb"} />

    <ContactShadows />

    <Sparkles />

    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.1}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
    />

  </Suspense>
  <pointLight
  position={[0, 2, -2]}
  intensity={8}
  color="#7c3aed"
/>
</Canvas>
    </div>
  );
}