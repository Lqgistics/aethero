const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function () {
  menu.classList.toggle('is-active')
  menuLinks.classList.toggle('active')
})

document.getElementById('cta').addEventListener('click', function() {
    const targetElement = document.getElementById('scroll');
    let offset = -300; // Adjust the offset value to scroll slightly higher

    // Check if it's a mobile device
    if (window.innerWidth < 768) {
        offset = -400; // Set a different offset value for mobile devices
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        offset = -700;
    }

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

const cardLeft = document.getElementById('card__left');
const cardRight = document.getElementById('card__right');
const cardMiddle = document.getElementById('card');
const mainContainer = document.getElementById('main__container');
const text = document.querySelector('.main__content');
const blur123 = document.querySelectorAll('.blur');

const stopScrollValue = 1000;

window.addEventListener('scroll', () => {
    const currentScroll = document.documentElement.scrollTop;
    const screenWidth = window.innerWidth;

    if (screenWidth > 1024) {
        if (window.scrollY < 100) {
            cardMiddle.style.transform = 'translate(0, 0)';
            cardLeft.style.transform = 'translate(-40%, 0)';
            cardRight.style.transform = 'translate(40%, 0)';
            text.style.transform = 'translate(0, 0)';
            
            blur123.forEach(element => {
                element.classList.add('blur');
            });

        } else if (currentScroll > 0) {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.5;
        
            // Ensure translateY doesn't exceed 400px
            const limitedTranslateY = Math.min(translateY, 200);
        
            cardMiddle.style.transform = `translate(0, ${200 + 100}px)`;
            cardLeft.style.transform = `translate(-100%, ${200}px)`;
            cardRight.style.transform = `translate(100%, ${200}px)`;
            text.style.transform = `translate(0, ${300}px)`;
        
            // Check if translateY has reached 400px
            if (translateY >= 100) {
                blur123.forEach(element => {
                    element.classList.remove('blur');
                });
            }
        }
        
    } else {
        if (window.scrollY < 100) {
            cardMiddle.style.transform = 'translate(0, 0)';
            cardLeft.style.transform = 'translate(-50%, 0)';
            cardRight.style.transform = 'translate(50%, 0)';
            text.style.transform = 'translate(0, 0)';
            blur123.forEach(element => {
                element.classList.add('blur');
            });

        } else if (currentScroll > 0 && screenWidth >= 768 && screenWidth <= 1024) {
            cardMiddle.style.transform = `translate(0, 370px)`;
            cardLeft.style.transform = `translate(-50%, 660px)`;
            cardRight.style.transform = `translate(50%, 80px)`;
            blur123.forEach(element => {
                element.classList.remove('blur');
            });

        } else if (currentScroll > 0 && screenWidth < 768) {
            cardMiddle.style.transform = `translate(0, 290px)`;
            cardLeft.style.transform = `translate(-50%, 500px)`;
            cardRight.style.transform = `translate(50%, 80px)`;
            blur123.forEach(element => {
                element.classList.remove('blur');
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


const slider = document.querySelector('.reviews');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchstart', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('touchend', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;

});

slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;

});




function revealStaff() {
    const staffElement = document.getElementById("staff");
    if (staffElement.style.display === "flex") {
        staffElement.style.display = "none";
    } else {
        staffElement.style.display = "flex";
    }
}


const navbarButton = document.querySelector('#navbar__btn');
const form = document.querySelector('#form');
const backgroundElements = document.querySelectorAll('.main__content, .card-blur, .info-section, .main__container');

navbarButton.addEventListener('click', function(event) {
    if (form.style.display === 'flex') {
        form.style.display = 'none';
        backgroundElements.forEach(element => {
            element.style.filter = 'none';
        });
        document.body.style.overflowY = 'auto'; // Enable vertical scrolling
    } else {
        form.style.display = 'flex';
        backgroundElements.forEach(element => {
            element.style.filter = 'blur(50px)';
        });
        document.body.style.overflowY = 'hidden'; // Disable vertical scrolling
    }
});


document.addEventListener('click', function(event) {
    const isFormClicked = form.contains(event.target);
    const isNavbarButtonClicked = event.target === navbarButton;
    
    if (!isFormClicked && !isNavbarButtonClicked) {
        form.style.display = 'none';
        document.body.style.overflowY = 'scroll'; // Enable vertical scrolling

        backgroundElements.forEach(element => {
            
            element.style.filter = 'none';

        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.reviews');
    const scrollAmount = 1000; 

    document.getElementById('scroll-left').addEventListener('click', function() {
      container.scrollBy({
    left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    document.getElementById('scroll-right').addEventListener('click', function() {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    
  });

  