// Year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Mobile drawer
const hamb = document.getElementById('hamb');
const drawer = document.getElementById('drawer');
const toggleDrawer = () => {
  if (!drawer || !hamb) return;
  const open = drawer.classList.toggle('open');
  hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
};
if (hamb) hamb.addEventListener('click', toggleDrawer);
if (drawer) drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

// Scroll to top when clicking brand (desktop & mobile)
const brandLink = document.querySelector('.brand');
if (brandLink) {
  brandLink.addEventListener('click', (e) => {
    // ensure smooth scroll to absolute top and close drawer if open
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (drawer) drawer.classList.remove('open');
  });
}

// Scroll spy (active link)
const links = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
const linkMap = new Map(links.map(a => [a.getAttribute('href'), a]));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = linkMap.get(id);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(l => l.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
document.querySelectorAll('main section').forEach(sec => io.observe(sec));

// -------- Reveal on load + scroll --------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Add reveal to grid items for stagger
[['.tech-grid', '.tech'], ['.xp', '.xp-item'], ['.projects-grid', '.project']]
  .forEach(([containerSel, itemSel]) => {
    document.querySelectorAll(containerSel).forEach(container => {
      container.querySelectorAll(itemSel).forEach(el => el.classList.add('reveal'));
    });
  });

// Ensure education cards get reveal
document.querySelectorAll('#education .card').forEach(el => el.classList.add('reveal'));

// Assign stagger index
document.querySelectorAll('.stack, .tech-grid, .xp, .projects-grid').forEach(group => {
  const items = group.querySelectorAll('.reveal');
  items.forEach((el, i) => el.style.setProperty('--i', i));
});

const allReveals = Array.from(document.querySelectorAll('.reveal'));

if (prefersReducedMotion) {
  allReveals.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

  allReveals.forEach(el => revealObserver.observe(el));
}

