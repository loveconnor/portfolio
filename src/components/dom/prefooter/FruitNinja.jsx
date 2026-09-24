import { PerspectiveCamera, useTexture } from '@react-three/drei';
import { useCallback, useEffect, useState } from 'react';

import { Physics } from '@react-three/rapier';
import Sticker from '@src/components/dom/prefooter/Sticker';
import useIsMobile from '@src/hooks/useIsMobile';
import { useThree } from '@react-three/fiber';

const FRUIT_LIFETIME = 10_000;



// this is unchanged from the original
function Lighting() {
  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 5, 5]} intensity={1} />
      <directionalLight position={[0, 5, -5]} intensity={1} />
    </>
  );
}

// This is new
function TimedFruit({ id, onExpire, positionX, image, imageSliced }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onExpire(id);
    }, FRUIT_LIFETIME);

    return () => clearTimeout(timer);
  }, [id, onExpire]);

  return (
    <Sticker
      positionX={positionX}
      image={image}
      imageSliced={imageSliced}
    />
  );
}

function useFruitSpawner(viewportWidth, textureCount, isMobile) {
  const [fruits, setFruits] = useState([]);

  const removeFruit = useCallback((id) => {
    setFruits((current) => current.filter((fruit) => fruit.id !== id));
  }, []);

  useEffect(() => {
    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    if (textureCount === 0) return;

    const spawnTimer = setInterval(() => {
      const halfWidth = Math.max(0, viewportWidth / 2 - 1);

      const batch = Array.from({ length: getRandomNumber(1, 6) }, () => ({
        id: crypto.randomUUID(),
        positionX: (Math.random() * 2 - 1) * halfWidth,
        textureIndex: getRandomNumber(0, textureCount - 1),
      }));

      setFruits((current) => [...current, ...batch]);
    }, isMobile ? 5000 : 3000);

    return () => clearInterval(spawnTimer);
  }, [viewportWidth, textureCount, isMobile]);

  return { fruits, removeFruit };
}

function FruitNinja() {
  const { viewport } = useThree();
  const isMobile = useIsMobile();

  const textures = useTexture([
    '/logos/threejs.webp',
    '/logos/bug.webp',
    '/logos/docker.webp',
    '/logos/git.webp',
    '/logos/gsap.webp',
    '/logos/nodejs.webp',
    '/logos/npm.webp',
    '/logos/react.webp',
    '/logos/typescript.webp',
    '/logos/vscode.webp',
  ]);

  const slicedTextures = useTexture([
    '/logos/sliced/threejsSliced.webp',
    '/logos/sliced/bugSliced.webp',
    '/logos/sliced/dockerSliced.webp',
    '/logos/sliced/gitSliced.webp',
    '/logos/sliced/gsapSliced.webp',
    '/logos/sliced/nodejsSliced.webp',
    '/logos/sliced/npmSliced.webp',
    '/logos/sliced/reactSliced.webp',
    '/logos/sliced/typescriptSliced.webp',
    '/logos/sliced/vscodeSliced.webp',
  ]);

  const { fruits, removeFruit } = useFruitSpawner(
    viewport.width,
    textures.length,
    isMobile
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Lighting />

      <Physics
        interpolate
        timeStep={1 / 60}
        gravity={[0, -15, 0]}
        colliders={false}
      >
        {fruits.map((fruit) => (
          <TimedFruit
            key={fruit.id}
            id={fruit.id}
            onExpire={removeFruit}
            positionX={fruit.positionX}
            image={textures[fruit.textureIndex]}
            imageSliced={slicedTextures[fruit.textureIndex]}
          />
        ))}
      </Physics>
    </>
  );
}

export default FruitNinja;