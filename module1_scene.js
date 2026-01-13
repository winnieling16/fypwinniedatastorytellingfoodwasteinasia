/* module1_scene.js
   - Three.js: floating particle fragments (food pieces)
   - Simple camera parallax (mouse move)
   - HTML map overlay with hotspots created from a sample dataset object
   - GSAP animations for narrator lines, hotspot reveal, tooltip
*/

/* ---------- SAMPLE HOTSPOT DATA ----------
   You will replace this with real dataset later (CSV/JSON).
   Each item includes:
   - id: unique key
   - label: display name
   - left, top: percentages (position inside map-wrapper)
   - waste: number or string to display
   - magnitude: small/med/large (drives size)
*/
const hotspotsData = [
  { id: 'kl', label: 'Kuala Lumpur, Malaysia', left: 50, top: 62, waste: '60,000 t/yr', magnitude: 'med' },
  { id: 'jakarta', label: 'Jakarta, Indonesia', left: 58, top: 70, waste: '90,000 t/yr', magnitude: 'large' },
  { id: 'bangkok', label: 'Bangkok, Thailand', left: 53, top: 57, waste: '70,000 t/yr', magnitude: 'large' },
  { id: 'sarawak', label: 'Sarawak (state), Malaysia', left: 55, top: 68, waste: '20,000 t/yr', magnitude: 'small' }
];

/* ---------- Three.js background: floating 'food fragment' particles ---------- */
(function initThree() {
  const container = document.getElementById('three-container');
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 0, 120);

  // Lights
  const amb = new THREE.AmbientLight(0xffffff, 0.16);
  scene.add(amb);
  const point = new THREE.PointLight(0xffb27a, 0.9, 500);
  point.position.set(100, 50, 100);
  scene.add(point);

  // create floating fragments: small rounded planes or spheres to simulate crumbs
  const fragments = new THREE.Group();
  scene.add(fragments);

  const fragGeom = new THREE.SphereGeometry(1, 8, 8);
  for (let i = 0; i < 140; i++) {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.08 + Math.random() * 0.08, 0.7, 0.45 + Math.random() * 0.12),
      roughness: 0.7,
      metalness: 0.05,
      transparent: true,
      opacity: 0.95
    });
    const mesh = new THREE.Mesh(fragGeom, m);
    mesh.position.x = (Math.random() - 0.5) * 200;
    mesh.position.y = (Math.random() - 0.5) * 120;
    mesh.position.z = (Math.random() - 0.5) * 120;
    mesh.scale.setScalar(0.6 + Math.random() * 1.6);
    mesh.userData = { vy: (0.02 + Math.random() * 0.06) * (Math.random() > 0.5 ? 1 : -1) };
    fragments.add(mesh);
  }

  // subtle parallax on mouse
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    // float physics
    fragments.children.forEach((c, i) => {
      c.position.y += c.userData.vy;
      if (c.position.y > 80) c.position.y = -80;
      if (c.position.y < -80) c.position.y = 80;
      c.rotation.x += 0.002 + i * 0.00001;
      c.rotation.y += 0.003 + i * 0.00001;
    });
    // camera parallax
    camera.position.x += (mouseX * 30 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 20 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  // resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();

/* ---------- UI: narrator lines (GSAP) and background music ---------- */
(function narratorAndMusic() {
  const line1 = document.getElementById('narr-1');
  const line2 = document.getElementById('narr-2');
  const music = document.getElementById('bg-music');

  // try autoplay; modern browsers may block — will play on first user interaction
  music.volume = 0.28;
  music.play().catch(() => {
    // fallback: play on first click
    document.addEventListener('click', () => music.play().catch(()=>{}), { once: true });
  });

  // animate narrator lines
  gsap.to(line1, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.6 });
  gsap.to(line2, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 3.0 });
})();

/* ----- Create hotspots on map (positions are percentages for easy design) ----- */
(function createHotspots() {
  const wrapper = document.getElementById('map-wrapper');
  const infoBox = document.getElementById('info-box');

  hotspotsData.forEach(h => {
    const el = document.createElement('div');
    el.className = `hotspot size-${h.magnitude === 'large' ? 'large' : (h.magnitude === 'med' ? 'med' : 'small')}`;
    el.setAttribute('data-label', h.label);
    el.setAttribute('data-waste', h.waste);
    el.style.left = `${h.left}%`;
    el.style.top  = `${h.top}%`;

    // core element & pulse for styling
    const core = document.createElement('div');
    core.className = 'core';
    // color gradient by magnitude
    if (h.magnitude === 'large') core.style.background = 'radial-gradient(circle,#ff4e3b,#ff763f)';
    if (h.magnitude === 'med')   core.style.background = 'radial-gradient(circle,#ff8b5a,#ffb07c)';
    if (h.magnitude === 'small') core.style.background = 'radial-gradient(circle,#ffd39b,#fff1d6)';

    const pulse = document.createElement('div');
    pulse.className = 'pulse';
    pulse.style.position = 'absolute';
    pulse.style.left = 0;
    pulse.style.top = 0;
    pulse.style.borderRadius = '50%';
    pulse.style.pointerEvents = 'none';
    pulse.style.boxShadow = '0 0 22px rgba(255,110,70,0.12)';

    el.appendChild(pulse);
    el.appendChild(core);
    wrapper.appendChild(el);

    // animate each hotspot scale-in with small delay
    gsap.to(el, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.5)", delay: 1 + Math.random() * 0.6 });

    // hover/tap interactions
    el.addEventListener('mouseenter', () => {
      infoBox.innerHTML = `<strong>${h.label}</strong><br>${h.waste}`;
      infoBox.style.opacity = 1;
      gsap.to(infoBox, { y: -6, duration: 0.18 });
    });
    el.addEventListener('mouseleave', () => {
      infoBox.style.opacity = 0;
      gsap.to(infoBox, { y: 0, duration: 0.12 });
    });

    // for mobile tap
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      infoBox.innerHTML = `<strong>${h.label}</strong><br>${h.waste}`;
      infoBox.style.opacity = 1;
      // auto-hide after some seconds
      setTimeout(() => { infoBox.style.opacity = 0; }, 3500);
    });
  });

  // clicking outside hides info
  document.addEventListener('click', () => { document.getElementById('info-box').style.opacity = 0; });
})();

/* ---------- GSAP ScrollTrigger: reveal additional content as user scrolls ---------- */
(function scrollTriggers() {
  gsap.registerPlugin(ScrollTrigger);

  // Fade map panel title in when it enters
  gsap.from(".panel-title", {
    y: 30, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: "#map-panel", start: "top 85%", once: true }
  });

  // As user scrolls down show narrator extra lines or triggers
  ScrollTrigger.create({
    trigger: "#map-panel",
    start: "top center",
    onEnter: () => {
      // more narrator text or a small overlay could be triggered here
      // e.g., highlight larger hotspots more strongly
      gsap.to(".hotspot.size-large .pulse", { boxShadow: '0 0 36px rgba(255,80,40,0.25)', duration: 0.8 });
    }
  });

})();

/* ---------- NEXT button behavior (simple transition) ---------- */
(function nextBtn() {
  const btn = document.getElementById('next-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    // subtle fade-out
    gsap.to('#ui-overlay', { opacity: 0, duration: 1.2, onComplete: () => {
      // replace with next module url
      window.location.href = 'module2_behavior.html';
    }});
  });
})();
