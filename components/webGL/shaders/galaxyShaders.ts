export const galaxyVertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uSize;

    attribute vec3 aFrequency;
    attribute vec3 aAmplitude;
    attribute float aScale;

    varying vec3 vColor;

    void main()
    {
        /**
         * Position
         */
        vec3 newPosition = position;
                    
        // Rotate
        float angle = atan(newPosition.x, newPosition.z);
        float distanceToCenter = length(newPosition.xyz);
        float angleOffset = (0.07 / distanceToCenter) * uTime;
        angle += angleOffset;
        newPosition.x = cos(angle) * distanceToCenter;
        newPosition.z = sin(angle) * distanceToCenter;

        // Wave
        newPosition.x += sin(uTime * aFrequency.x) * aAmplitude.x * 0.05;
        newPosition.y += sin(uTime * aFrequency.y) * aAmplitude.y * 0.05;
        newPosition.z += sin(uTime * aFrequency.z) * aAmplitude.z * 0.05;

        // Randomness
        // modelPosition.xyz += aRandomness;

        vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        /**
         * Size
         */
        gl_PointSize = uSize * aScale;
        // gl_PointSize *= (1.0 / - viewPosition.z);

        /**
         * Color
         */
        vColor = color;
    }
`;

export const galaxyFragmentShader = /* glsl */ `
    varying vec3 vColor;

    void main()
    {
        // Disc
        // float strength = distance(gl_PointCoord, vec2(0.5));
        // strength = step(0.5, strength);
        // strength = 1.0 - strength;

        // // Diffuse point
        // float strength = distance(gl_PointCoord, vec2(0.5));
        // strength *= 2.0;
        // strength = 1.0 - strength;

        // Light point
        float strength = distance(gl_PointCoord, vec2(0.5)) * 10.0;
        strength = 1.0 / pow(strength, 2.0);

        // Final color
        vec3 color = mix(vec3(0.0), vColor, strength);
        gl_FragColor = vec4(color, 1.0);
    }
`;
