const rows = 1;
const cols = 10;
const grid = document.getElementById('grid');

for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'cell'+(i+1), 'fade-down');
    grid.appendChild(cell);
}

const fadeUps = document.querySelectorAll('.fade-up');
const fadeDowns = document.querySelectorAll('.fade-down');

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: 0.1 }
);

fadeDowns.forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const buffer = 50;

  fadeUps.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < 30) {
        el.classList.add('visible');
        el.classList.remove('fade-out-down');
        return;
    }

    if (rect.top < window.innerHeight - buffer && rect.bottom > buffer && rect.top > 0) {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
        el.classList.remove('fade-out-down');
      }
    }

    if (rect.bottom < buffer || rect.top > window.innerHeight - buffer) {
      if (!el.classList.contains('fade-out-down')) {
        el.classList.remove('visible');
        el.classList.add('fade-out-down');
      }
    }
  });
});
