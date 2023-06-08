import * as THREE from 'three';

export default function addUVOffsetBeforeCompile(atlasSize: number) {
  const texStep = 1 / atlasSize;
  const shaderModifier = (shader: THREE.Shader) => {
    shader.vertexShader = `
        attribute vec2 iUv;
      varying vec2 instUv;
      ${shader.vertexShader}
    `.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
      	instUv = iUv;
      `,
    );
    shader.fragmentShader = `
    	varying vec2 instUv;
    	${shader.fragmentShader}
    `.replace(
      `#include <map_fragment>`,
      `
      #ifdef USE_MAP
        vec4 sampledDiffuseColor = texture2D( map, instUv + vUv * ${texStep} );

        diffuseColor *= sampledDiffuseColor;
      #endif
    `,
    );
  };

  return shaderModifier;
}
