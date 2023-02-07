const fragmentShader = /* glsl */ `
    varying vec2 vUv;

    void main() {
        float resolution = 100.0;
        vec2 newUv = mod(vUv * resolution, 1.0);

        vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
        vec4 green = vec4(0.0, 1.0, 0.0, 1.0);
        vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
        vec4 black = vec4(0.0, 0.0, 0.0, 1.0);

        float step1 = 0.04;
        float step2 = 0.36;
        float step3 = 0.68;
        float topStep = 0.94;

        vec4 color = mix(black, red, step(step1, newUv.x));
        color = mix(color, green, step(step2, newUv.x));
        color = mix(color, blue, step(step3, newUv.x));
        color = mix(color, black, step(topStep, newUv.y));

        gl_FragColor = color;
    }
`;

export default fragmentShader;
