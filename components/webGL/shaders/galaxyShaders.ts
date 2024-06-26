export const galaxyVertexShader = /* glsl */ `
    vec4 permute(vec4 x){return mod(x*x*34.+x,289.);}
    float snoise(vec3 v){
        const vec2 C = 1./vec2(6,3);
        const vec4 D = vec4(0,.5,1,2);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1. - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.x;
        vec3 x2 = x0 - i2 + C.y;
        vec3 x3 = x0 - D.yyy;
        i = mod(i,289.);
        vec4 p = permute( permute( permute(
            i.z + vec4(0., i1.z, i2.z, 1.))
            + i.y + vec4(0., i1.y, i2.y, 1.))
            + i.x + vec4(0., i1.x, i2.x, 1.));
        vec3 ns = .142857142857 * D.wyz - D.xzx;
        vec4 j = p - 49. * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = floor(j - 7. * x_ ) *ns.x + ns.yyyy;
        vec4 h = 1. - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 sh = -step(h, vec4(0));
        vec4 a0 = b0.xzyw + (floor(b0)*2.+ 1.).xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + (floor(b1)*2.+ 1.).xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.);
        return .5 + 12. * dot( m * m * m, vec4( dot(p0,x0), dot(p1,x1),dot(p2,x2), dot(p3,x3) ) );
    }

    vec3 snoiseVec3( vec3 x ){
        return vec3(snoise(vec3( x )*2.-1.),
                    snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ))*2.-1.,
                    snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 )*2.-1.)
            );
    }

    vec3 curlNoise( vec3 p ){
        const float e = .1;
        vec3 dx = vec3( e   , 0.0 , 0.0 );
        vec3 dy = vec3( 0.0 , e   , 0.0 );
        vec3 dz = vec3( 0.0 , 0.0 , e   );

        vec3 p_x0 = snoiseVec3( p - dx );
        vec3 p_x1 = snoiseVec3( p + dx );
        vec3 p_y0 = snoiseVec3( p - dy );
        vec3 p_y1 = snoiseVec3( p + dy );
        vec3 p_z0 = snoiseVec3( p - dz );
        vec3 p_z1 = snoiseVec3( p + dz );

        float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
        float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
        float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

        const float divisor = 1.0 / ( 2.0 * e );
        return normalize( vec3( x , y , z ) * divisor );
    }
    
    vec2 rotate(vec2 v, float a) {
        float s = sin(a);
        float c = cos(a);
        mat2 m = mat2(c, -s, s, c);
        return m * v;
    }

    uniform float uTime;
    uniform float uGalaxyTime;
    uniform vec3 uGalaxyRotation;
    uniform float uTimeOffset;
    uniform float uGalaxyAngle;
    uniform float uSize;
    uniform float uProgress;

    attribute vec3 aFrequency;
    attribute vec3 aAmplitude;
    attribute float aScale;
    attribute vec3 aHeadPosition;

    #define PI 3.14159265359

    varying vec3 vColor;

    void main()
    {
        float galaxyTime = uGalaxyTime + uTimeOffset;
        /**
         * Galaxy
         */
        vec3 newPosition = position;
                    
        // Rotating Animation
        float galaxyAngle = atan(newPosition.x, newPosition.z);
        float galaxyDistanceToCenter = length(newPosition.xyz);
        float galaxyAngleOffset = (0.05 / galaxyDistanceToCenter) * galaxyTime;
        galaxyAngle += galaxyAngleOffset;
        newPosition.x = cos(galaxyAngle) * galaxyDistanceToCenter;
        newPosition.z = sin(galaxyAngle) * galaxyDistanceToCenter;

        // Rotate Fixed
        // Rotate around x axis
        newPosition.yz = rotate(newPosition.yz, uGalaxyRotation.x);
        // Rotate around z axis
        newPosition.xy = rotate(newPosition.xy, uGalaxyRotation.z);


        /**
         * Head
         */
        vec3 headPosition = aHeadPosition;
        float headAngle = atan(headPosition.x, headPosition.z);
        float headDistanceToCenter = length(headPosition.xz);
        float headAngleOffset = PI * 0.70 + sin(uTime * 0.4) * 0.20;
        headAngle += headAngleOffset;
        headPosition.x = cos(headAngle) * headDistanceToCenter;
        headPosition.z = sin(headAngle) * headDistanceToCenter;


        /**
         * Transition
         */
        // Distort
        float noiseAmt = cos(2.0 * PI * (smoothstep(0.0, 1.0, uProgress) + 0.5)) + 1.0;

        vec3 galaxyNoise = curlNoise(newPosition * 0.5);
        newPosition += galaxyNoise * noiseAmt;

        vec3 headNoise = curlNoise(vec3(headPosition.x * 0.5, headPosition.y * 0.4, headPosition.z * 0.3));
        headPosition += headNoise * noiseAmt;

        newPosition = mix(newPosition, headPosition, uProgress);

        // Wave
        newPosition.x += sin(uTime * aFrequency.x) * aAmplitude.x * 0.05;
        newPosition.y += sin(uTime * aFrequency.y) * aAmplitude.y * 0.05;
        newPosition.z += sin(uTime * aFrequency.z) * aAmplitude.z * 0.05;

        vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        /**
         * Size
         */
        float defaultSize = uSize * aScale;
        gl_PointSize = min(defaultSize * (1.0 / - viewPosition.z) * 300000.0, defaultSize);

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
