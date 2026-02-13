document.addEventListener("DOMContentLoaded", () => {
  // body background
  // const originalBodyBackground = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#1A1930";

  // Create grid cells
  const rows = 1;
  const cols = 14;
  const grid = document.getElementById('grid');

  if (grid) {
    grid.innerHTML = '';
    for (let i = 0; i < rows * cols; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', `cell${i + 1}`, 'fade-down');
      grid.appendChild(cell);
    }
  }

  // Header scroll effect
  const header = document.querySelector(".header_nav_div");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile nav toggle
  const mobileButton = document.querySelector('.hamburger_menu');
  const mobileNav = document.querySelector('.header_nav_mobile');

  mobileButton?.addEventListener('click', () => {
    mobileNav?.classList.toggle('open');
    mobileButton.classList.toggle('open');
  });

  // Smooth scroll for links
  const scrollLinks = document.querySelectorAll('.header_nav_a, .header_nav_a_mobile, .more_button');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;

      if (targetEl) {
        const offset = 82;
        const topPos = targetEl.offsetTop - offset;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }

      if (link.classList.contains('header_nav_a_mobile') || link.classList.contains('more_button')) {
        mobileButton?.classList.remove("open");
        mobileNav?.classList.remove("open");
      }
    });
  });

  // --- FAQ ---
  const faqData = [
    // Opće
    [
      { question: "Što je hackathon i što se tamo radi?", answer: "Hackathon je natjecanje koje traje jedan ili dva dana. Tijekom tog vremena timovi rade na zadatku i natječu se tko će ga najbolje riješiti. Uz znanje, važno je biti snalažljiv i brz, a najbolji timovi osvajaju nagrade. Čak i ako ne pobijedite, uvijek nastane zanimljiv projekt koji svi mogu ponijeti kući i pokazati!" },
      { question: "Tko se može prijaviti?", answer: "Mogu se prijaviti svi učenici srednjih škola iz Republike Hrvatske." },
      { question: "Trebam li prethodno znanje iz programiranja ili elektronike?", answer: "Poželjno je da znaš osnove barem jednog programskog jezika, ali sve ostalo će biti objašnjeno i mentorirano tijekom hackathona." },
      { question: "Mogu li sudjelovati sam/a ili moram biti u timu?", answer: "Možeš se prijaviti isključivo s timom, a tim možeš prijaviti sam ili vas može prijaviti profesor/mentor." },
      { question: "Koliko sudionika može biti u timu?", answer: "Tim može imati između 4 i 6 članova." },
      { question: "Mogu li se prijaviti učenici iz drugih gradova ili škola?", answer: "Da! Podržavamo učenike iz cijele Hrvatske da nam se pridruže na FER-u. Ukoliko vam je potreban smještaj, uspjeli smo dogovoriti poseban popust u Hotelu Blue za sudionike hackathona. Ako ste zainteresirani, samo nam se javite na mail do 21.2." },
    ],
    // Organizacija i logistika
    [
      { question: "Hoće li biti hrane i pića?", answer: "Da, hrana, piće i grickalice bit će besplatni i dostupni tijekom cijelog natjecanja." },
      { question: "Trebam li ponijeti vlastitu opremu?", answer: "Svu opremu osiguravamo mi, a ako ti je lakše možeš ponijeti vlastiti laptop." },
      { question: "Hoće li biti mentorstva ili podrške tijekom hackathona?", answer: "Da! Svaki tim će imati mentora, studenta FER-a, koji će vam pomagati i odgovarati na pitanja." },
      { question: "Postoji li mogućnost smještaja za sudionike koji dolaze izvan Zagreba?", answer: "Da. Za sudionike smo osigurali poseban popust u Hotelu Blue. Ako vam je potreban smještaj, javite nam se na mail najkasnije do 21.2. kako bismo vam poslali detalje i upute za rezervaciju." },
    ],
    // Tehnička pitanja
    [
      { question: "Koju opremu i softver ću koristiti?", answer: "Radit ćete s mikrokontrolerom ESP-32, u programu Arduino IDE, koristeći programski jezik C/C++." },
      { question: "Hoću li moći zadržati opremu koju koristim?", answer: "Da, svaki tim nosi doma svu opremu koju koristi tijekom hackathona." },
      { question: "Hoće li biti Wi-Fi i električnih utičnica?", answer: "Da, sve će biti dostupno na licu mjesta." },
      { question: "Što ako mi treba pomoć s kodiranjem ili elektronikom?", answer: "Najvažnija je dobra volja i znatiželja - mentori su tu da vam pomognu i odgovore na sva pitanja." },
    ],
  ];

  let activeSection = 0;
  const buttons = document.querySelectorAll('.faq_button');
  const faqQuestionsContainer = document.getElementById('faq_questions');

  function renderQuestions() {
    if (!faqQuestionsContainer) return;
    faqQuestionsContainer.innerHTML = '';
    faqData[activeSection].forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'faq_item';

      const questionBtn = document.createElement('button');
      questionBtn.className = 'faq_question';
      questionBtn.innerHTML = `<span>${item.question}</span><span class="faq_icon">+</span>`;

      const answerDiv = document.createElement('div');
      answerDiv.className = 'faq_answer';
      answerDiv.textContent = item.answer;
      answerDiv.style.maxHeight = '0px';
      answerDiv.style.padding = '0 0';

      questionBtn.addEventListener('click', () => {
        const isOpen = answerDiv.classList.contains('open');
        if (isOpen) {
          answerDiv.style.maxHeight = '0px';
          answerDiv.style.padding = '0 0';
          answerDiv.classList.remove('open');
          questionBtn.querySelector('.faq_icon').textContent = '+';
        } else {
          answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
          answerDiv.style.padding = '0 0 12px 0';
          answerDiv.classList.add('open');
          questionBtn.querySelector('.faq_icon').textContent = "\u2212";
        }
      });

      itemDiv.appendChild(questionBtn);
      itemDiv.appendChild(answerDiv);
      faqQuestionsContainer.appendChild(itemDiv);
    });
  }

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      activeSection = idx;
      buttons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      renderQuestions();
    });
  });

  renderQuestions();

  // --- Fade animations ---
  let fadeUps = [];
  let fadeDowns = [];

  const timeout = setTimeout(() => {
    fadeUps = Array.from(document.querySelectorAll('.fade-up'));
    fadeDowns = Array.from(document.querySelectorAll('.fade-down'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    }, { threshold: 0.1 });

    fadeDowns.forEach(el => observer.observe(el));

    function handleFadeUps() {
      const buffer = window.innerHeight * 0.01;
      fadeUps.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < buffer) {
          el.classList.add('visible');
          el.classList.remove('fade-out-down');
          return;
        }
        if (rect.top < window.innerHeight - buffer) {
          el.classList.add('visible');
          el.classList.remove('fade-out-down');
        } else {
          el.classList.remove('visible');
          el.classList.add('fade-out-down');
        }
      });
    }

    window.addEventListener('scroll', handleFadeUps);
    window.addEventListener('load', handleFadeUps);
    window.addEventListener('resize', handleFadeUps);

    handleFadeUps();
  }, 50);

  // --- Sponsor strip loading ---
  const trakaScroll = document.querySelector('.traka-scroll');
  if (trakaScroll) {
    const images = trakaScroll.querySelectorAll('img');
    let loadedCount = 0;

    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            trakaScroll.classList.add('loaded');
          }
        });
      }
    });

    if (loadedCount === images.length) {
      trakaScroll.classList.add('loaded');
    }
  }

  const dayTabs = document.querySelectorAll('.day-tab');
  const scheduleDays = document.querySelectorAll('.schedule-day');

  dayTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const selectedDay = this.getAttribute('data-day');
      
      dayTabs.forEach(t => t.classList.remove('active'));
      
      this.classList.add('active');
      
      scheduleDays.forEach(day => day.classList.remove('active'));
      
      const targetSchedule = document.getElementById(selectedDay + '-schedule');
      if (targetSchedule) {
        targetSchedule.classList.add('active');
      }
    });
  });
});
