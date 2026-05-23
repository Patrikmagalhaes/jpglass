import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  OrbitControls,
} from "@react-three/drei";
import { Suspense } from "react";
import styled from "styled-components";

type ModelProps = {
  modelPath: string;
};

const ViewerWrapper = styled.div`
  width: 100%;
  height: 650px;

  @media (max-width: 768px) {
    height: 420px;
  }
`;

function Model({ modelPath }: ModelProps) {
  const { scene } = useGLTF(modelPath);

  return (
    <Center>
      <primitive object={scene} scale={1.3} />
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <ViewerWrapper style={{ width: "100%" }}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Suspense fallback={null}>
          <Model modelPath="/mushroom.glb" />
        </Suspense>
      </Canvas>
    </ViewerWrapper>
  );
}

