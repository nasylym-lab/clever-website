const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => observer.observe(item));

const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const value = Number(target.dataset.count || 0);
      let start = 0;
      const duration = 1200;
      const stepTime = 16;
      const steps = Math.ceil(duration / stepTime);
      const increment = value / steps;
      const timer = window.setInterval(() => {
        start += increment;
        if (start >= value) {
          target.textContent = `${value}+`;
          window.clearInterval(timer);
          counterObserver.unobserve(target);
        } else {
          target.textContent = `${Math.round(start)}+`;
        }
      }, stepTime);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const heroVisual = document.querySelector('[data-parallax]');
if (heroVisual) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -6}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`;
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)';
  });
}

const testimonialCards = [
  {
    name: 'Алексей Петров',
    company: 'Founder, North Labs',
    text: 'Clever дал нам пространство для настоящих переговоров, новых партнерств и сильных решений. Это не просто тусовка, а среда для роста.',
    image: 'assets/images/testimonial-1.svg'
  },
  {
    name: 'Марина Кузнецова',
    company: 'CEO, Studio Bright',
    text: 'Появились новые инструменты, сильные контакты и совсем другой уровень доверия между предпринимателями.',
    image: 'assets/images/testimonial-2.svg'
  },
  {
    name: 'Илья Сорокин',
    company: 'Partner, Flow Capital',
    text: 'В Clever легко находить не только единомышленников, но и тех, кто реально помогает ускорять рост бизнеса.',
    image: 'assets/images/testimonial-3.svg'
  }
];

let currentTestimonial = 0;
const testimonialName = document.querySelector('.testimonial-person h3');
const testimonialCompany = document.querySelector('.testimonial-person p');
const testimonialText = document.querySelector('.testimonial-text');
const testimonialImage = document.querySelector('.testimonial-person img');
const buttons = document.querySelectorAll('.slider-button');

function renderTestimonial(index) {
  const item = testimonialCards[index];
  testimonialName.textContent = item.name;
  testimonialCompany.textContent = item.company;
  testimonialText.textContent = item.text;
  testimonialImage.src = item.image;
  testimonialImage.alt = item.name;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction === 'next' ? 1 : -1;
    currentTestimonial = (currentTestimonial + direction + testimonialCards.length) % testimonialCards.length;
    renderTestimonial(currentTestimonial);
  });
});

setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  renderTestimonial(currentTestimonial);
}, 6000);
