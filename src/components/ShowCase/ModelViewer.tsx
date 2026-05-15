import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Center,
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Model modelPath="/mushroom.glb" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}