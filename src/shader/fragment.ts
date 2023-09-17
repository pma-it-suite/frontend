function hexToVec3(hex : string) {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	return [r, g, b];
  }
  
  const baseFirstHex = "#FF0000";
  const accentHex = "#FF6600";
  const baseSecondHex = "#FF8000";
  const baseThirdHex = "#FF9933";
  
  const baseFirst = hexToVec3(baseFirstHex);
  const accent = hexToVec3(accentHex);
  const baseSecond = hexToVec3(baseSecondHex);
  const baseThird = hexToVec3(baseThirdHex);
  
  const glslCode = `
  uniform float time;
  uniform float progress;
  uniform sampler2D texture1;
  uniform vec4 resolution;
  varying vec2 vUv;
  varying vec3 vPosition;
  float PI = 3.141592653589793238;
  
  // NOISE
  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
  
  float noise(vec3 p){
	  vec3 a = floor(p);
	  vec3 d = p - a;
	  d = d * d * (3.0 - 2.0 * d);
  
	  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
	  vec4 k1 = perm(b.xyxy);
	  vec4 k2 = perm(k1.xyxy + b.zzww);
  
	  vec4 c = k2 + a.zzzz;
	  vec4 k3 = perm(c);
	  vec4 k4 = perm(c + 1.0);
  
	  vec4 o1 = fract(k3 * (1.0 / 41.0));
	  vec4 o2 = fract(k4 * (1.0 / 41.0));
  
	  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
	  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  
	  return o4.y * d.y + o4.x * (1.0 - d.y);
  }
  
  float lines(vec2 uv, float offset){
	  return smoothstep(
		  0., 0.5 + offset*0.5,
		  0.5*abs((sin(uv.x*35.) + offset*2.))
	  );
  }
  
  mat2 rotate2D(float angle){
	  return mat2(
		  cos(angle),-sin(angle),
		  sin(angle),cos(angle)
	  );
  }
  
  void main() {
	  vec2 uv = vUv;
  
	  // Apply vignette effect
	  float vignette = smoothstep(0.6, 1.0, length(uv - 0.5));
	  vec3 vignetteColor = vec3(1.0, 1.0, 1.0);
	  vec3 finalColor = mix(vignetteColor, vec3(0.0), vignette);
  
	  vec3 baseFirst = vec3(${baseFirst[0]}, ${baseFirst[1]}, ${baseFirst[2]});
	  vec3 accent = vec3(${accent[0]}, ${accent[1]}, ${accent[2]});
	  vec3 baseSecond = vec3(${baseSecond[0]}, ${baseSecond[1]}, ${baseSecond[2]});
	  vec3 baseThird = vec3(${baseThird[0]}, ${baseThird[1]}, ${baseThird[2]});
	  float n = noise(vPosition + time);
  
	  vec2 baseUV = rotate2D(n) * vPosition.xy * 0.1;
	  float basePattern = lines(baseUV, 0.5);
	  float secondPattern = lines(baseUV, 0.1);
  
	  vec3 baseColor = mix(baseSecond, baseFirst, basePattern);
	  vec3 secondBaseColor = mix(baseColor, accent, secondPattern);
  
	  vec3 finalResult = mix(finalColor, secondBaseColor, 0.8);
	  gl_FragColor = vec4(finalResult, 1.0);
  }`;
  
  export default glslCode;
  