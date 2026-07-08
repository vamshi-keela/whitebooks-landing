import { memo, useEffect, useRef } from 'react';

/**
 * "Silk current" — the hero's animated flow layer.
 *
 * A single WebGL canvas running a domain-warped fbm shader: the noise field is
 * stretched horizontally so the flow reads as laminar silk bands (not blobby
 * gradient soup), and thin luminous filaments are lifted off the field's folds
 * with smoothstep ridges. Everything runs on the GPU at ~45% resolution — the
 * upscale supplies the softness the old `filter: blur()` layers faked, without
 * their re-raster cost (to the compositor this is just one texture).
 *
 * `paused` stops the rAF loop and freezes the last frame (hero off-screen);
 * prefers-reduced-motion renders one developed frame and never animates.
 * If WebGL is unavailable the canvas stays transparent and the static CSS
 * layers behind it carry the design.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uLight;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.55;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;

  /* Silk space: squashed in x so currents elongate into laminar bands, with
     a gentle diagonal drape so they hang like fabric instead of stripes */
  vec2 p = vec2(uv.x * aspect * 0.55, uv.y * 2.3 + uv.x * 0.55);
  float t = uTime * 0.045;
  p.x -= t * 0.35;

  /* Two rounds of domain warping give the flow its folded, fluid character */
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.5)), fbm(p + vec2(4.7, -t * 0.4)));
  vec2 r = vec2(fbm(p + 1.9 * q + vec2(1.7, 8.1)), fbm(p + 1.9 * q + vec2(6.3, 2.9)));
  float f = fbm(p + 1.8 * r);

  /* Thin luminous filaments lifted off the field's folds */
  float fil = smoothstep(0.40, 0.50, f) * (1.0 - smoothstep(0.50, 0.64, f));
  float fil2 = smoothstep(0.58, 0.66, f) * (1.0 - smoothstep(0.66, 0.78, f));

  /* Highlights stay saturated (one channel always low) — if all three
     channels climb together the silk reads as washed-out white sheen. */
  vec3 wine = vec3(0.10, 0.01, 0.05);
  vec3 crimson = vec3(0.83, 0.18, 0.41);
  vec3 hotpink = vec3(1.0, 0.28, 0.54);
  vec3 magenta = vec3(0.93, 0.24, 0.66);
  vec3 violet = vec3(0.48, 0.30, 0.90);

  vec3 col = mix(wine, crimson, smoothstep(0.30, 0.62, f));
  col = mix(col, hotpink, fil);
  col = mix(col, magenta, fil2 * 0.85);
  col = mix(col, violet, q.y * 0.16);

  /* Light theme: deep ink ribbons — anything pale blends into the white page
     as haze, so every anchor stays well below 60% lightness */
  vec3 lcol = mix(vec3(0.91, 0.45, 0.60), vec3(0.76, 0.10, 0.36), smoothstep(0.28, 0.62, f));
  lcol = mix(lcol, vec3(0.50, 0.28, 0.86), q.y * 0.35);
  lcol = mix(lcol, vec3(0.66, 0.05, 0.30), fil * 0.8);
  col = mix(col, lcol, uLight);

  /* Thin luminous threads over a near-black body — silk, not fog. Light mode
     shifts weight from the broad wash to the ribbons so color stays defined. */
  float body = smoothstep(0.34, 0.68, f);
  float energy = body * mix(0.12, 0.18, uLight) + fil * mix(0.42, 0.62, uLight) + fil2 * mix(0.30, 0.42, uLight);
  energy *= 0.7 + 0.3 * q.x;

  /* Composition: a sky band above the arc that spills deeper down the flanks,
     framing the headline; the centre column stays calm for contrast */
  float side = smoothstep(0.10, 0.46, abs(uv.x - 0.5));
  float mask = smoothstep(0.55 - 0.11 * side, 0.97, uv.y);
  float calm = 0.62 + 0.38 * side;
  float a = energy * mask * calm;

  /* Dither kills banding on the long soft ramps */
  a += (hash(gl_FragCoord.xy) - 0.5) * 0.012;
  a = clamp(a, 0.0, 1.0);

  gl_FragColor = vec4(col * a, a); /* premultiplied over the page background */
}
`;

interface HeroFlowCanvasProps {
  /** Stop advancing the flow (hero off-screen); the last frame stays put. */
  paused?: boolean;
}

const HeroFlowCanvas = memo(function HeroFlowCanvas({ paused = false }: HeroFlowCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const ctrl = useRef<{ setRunning: (run: boolean) => void } | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const compile = (type: number, src: string): WebGLShader => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uLight = gl.getUniformLocation(prog, 'uLight');

    const setTheme = () => {
      gl.uniform1f(uLight, document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0);
    };
    setTheme();

    const SCALE = 0.45 * Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      /* Only the buffer resize is guarded (it clears the canvas); viewport and
         uRes must be set unconditionally — under StrictMode's dev double-mount
         the second program starts with uRes at (0,0) even though the canvas
         buffer is already the right size. */
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    /* Start mid-flow so even the very first frame is fully developed */
    let elapsed = 12_000;
    let last = 0;
    let raf = 0;
    let running = false;

    const draw = () => {
      gl.uniform1f(uTime, elapsed / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (now: number) => {
      elapsed += now - last;
      last = now;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setRunning = (run: boolean) => {
      const want = run && !reducedMotion;
      if (want === running) return;
      running = want;
      if (want) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    ctrl.current = { setRunning };

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    const mo = new MutationObserver(() => {
      setTheme();
      if (!running) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    resize();
    draw();

    /* No explicit loseContext() here: under StrictMode's dev double-mount the
       remount would getContext() the same (now dead) canvas context and render
       garbage. The context is released with the canvas element itself. */
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      ctrl.current = null;
    };
  }, []);

  useEffect(() => {
    ctrl.current?.setRunning(!paused);
  }, [paused]);

  return <canvas ref={ref} className="wb-halo-canvas" aria-hidden />;
});

export default HeroFlowCanvas;
