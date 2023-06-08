export const atmosVertexShader = /* glsl */ `
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;

        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
    }
`;

export const atmosFragmentShader = /* glsl */ `
    uniform float progress;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
        float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        intensity *= vUv.y;
        intensity *= min(pow(progress, 2.0) + 0.15, 1.0);
        gl_FragColor = vec4( 0.3, 0.6, 1.0, 1.0) * intensity;
    }
`;
