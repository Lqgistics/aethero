const cardLeft = document.getElementById("card__left");
const cardRight = document.getElementById("card__right");
const cardMiddle = document.getElementById("card");
const mainContainer = document.getElementById("main__container");
const text = document.querySelector(".main__content");
const blur123 = document.querySelectorAll(".blur");

const stopScrollValue = 1000;

window.addEventListener("scroll", () => {
  const currentScroll = document.documentElement.scrollTop;
  const screenWidth = window.innerWidth;

  if (screenWidth > 1024) {
    if (window.scrollY < 200) {
      cardMiddle.style.transform = "translate(0, 0)";
      cardLeft.style.transform = "translate(0, 0)";
      cardRight.style.transform = "translate(0, 0)";
      text.style.transform = "translate(0, 0)";

      blur123.forEach((element) => {
        element.classList.add("blur");
      });
    } else if (currentScroll > 0) {
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * 0.5;

      // Ensure translateY doesn't exceed 400px
      const limitedTranslateY = Math.min(translateY, 200);

      cardMiddle.style.transform = `translate(0, 60%)`;
      cardLeft.style.transform = `translate(-60%, 40%)`;
      cardRight.style.transform = `translate(60%, 40%)`;
      text.style.transform = `translate(0, ${200}px)`;

      // Check if translateY has reached 400px
      if (translateY >= 100) {
        blur123.forEach((element) => {
          element.classList.remove("blur");
        });
      }
    }
  } else {
    if (window.scrollY < 100) {
      cardMiddle.style.transform = "translate(0, 0)";
      cardLeft.style.transform = "translate(0, 0)";
      cardRight.style.transform = "translate(0, 0)";
      text.style.transform = "translate(0, 0)";
      blur123.forEach((element) => {
        element.classList.add("blur");
      });
    } else if (currentScroll > 0 && screenWidth >= 768 && screenWidth <= 1024) {
      cardRight.style.transform = `translate(0, 80px)`;
      cardMiddle.style.transform = `translate(0, 300px)`;
      cardLeft.style.transform = `translate(0, 520px)`;

      blur123.forEach((element) => {
        element.classList.remove("blur");
      });
    } else if (currentScroll > 0 && screenWidth < 768) {
      cardRight.style.transform = `translate(0, ${screenWidth * 0.01}px)`;
      cardMiddle.style.transform = `translate(0, ${screenWidth * 0.31}px)`;
      cardLeft.style.transform = `translate(0, ${screenWidth * 0.61}px)`;
      blur123.forEach((element) => {
        element.classList.remove("blur");
      });
    }
  }

  lastScrollTop = currentScroll;
});

const scrollers = document.querySelectorAll(".scroller");
const inner = document.querySelector(".scroller__inner");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      inner.style.display = "flex";
    } else {
      inner.style.display = "none";
    }
  });
});

scrollers.forEach((scroller) => {
  observer.observe(scroller);
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

document.getElementById("cta").addEventListener("click", function () {
  const targetElement = document.querySelector("#card__right");

  const targetPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});

const stats = document.querySelectorAll(".stats__card h1");

function animateValue(element, start, end, duration) {
  let current = start;
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));

  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalValue = parseInt(target.textContent);
      // If the final value is above 1000, start from a higher number
      const startValue = finalValue > 1000 ? finalValue - 200 : 0;
      animateValue(target, startValue, finalValue, 2000);
      statsObserver.unobserve(target);
    }
  });
});

stats.forEach((stat) => statsObserver.observe(stat));

// JavaScript
function openForm() {
  document.querySelector(".form__popup__bg").classList.add("is-visible");
}

function closeForm() {
  document.querySelector(".form__popup__bg").classList.remove("is-visible");
}

// Close if clicked outside form
document
  .querySelector(".form__popup__bg")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeForm();
    }
  });

// Open form trigger
document
  .querySelector("#navbar__btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openForm();
  });

// EmailJS Configuration - Using environment variables
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'JnmcRw05mwC1JzWdC',
    SERVICE_ID: 'service_gk9ood8',
    TEMPLATE_ID: 'template_mlfm4ly'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// Handle form submission
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            document.getElementById('form').reset();
            closeForm();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again.');
        })
        .finally(function() {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});
