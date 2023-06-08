export const loadingOverlayVertexShader = /* glsl */ `
    varying vec2 vUv;

    void main() {

        vUv = uv;
        gl_Position = vec4( position, 1.0 );

    }
`;

export const loadingOverlayFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uProgress;
    uniform float uAspect;

    varying vec2 vUv;

    void main() {

        vec2 fromOrigin = vUv - vec2( 0.5, 0.5 );
        float originLength = length(fromOrigin / vec2(1.0, uAspect));
        float calibratedProgress = max(uProgress, uProgress / uAspect);
        float alpha = step( calibratedProgress, originLength);
        gl_FragColor = vec4( uColor, alpha);

    }
`;
