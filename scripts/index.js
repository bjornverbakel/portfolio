document.addEventListener('DOMContentLoaded', function () {
    /*
    // Custom cursor
    const customCursor = document.getElementById('custom-cursor');
    let lastMove = 0;
    const throttleDelay = 16; // Approximately 60fps

    document.addEventListener('mousemove', function (e) {
        const now = Date.now();
        if (now - lastMove >= throttleDelay) {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
            lastMove = now;
        }
    });
    */

    // Smooth scroll to sections for navigation buttons
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 80; // Adjust based on padding height
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Expand project projects on click
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('click', function () {
            // Collapse any currently expanded item
            projects.forEach(item => {
                if (item !== project) {
                    item.classList.remove('expanded');
                }
            });

            // Toggle the clicked item
            this.classList.toggle('expanded');
        });
    });

    // Handle multiple slideshows
    document.querySelectorAll('.slideshow-container').forEach((slideshow, index) => {
        let slides = slideshow.querySelectorAll('.slide');
        let slideshowControls = slideshow.closest('.project-details-wrapper').querySelector('.slideshow-controls');

        // No need to display controls when only 1 slide is present
        if (slides.length <= 1) {
            slides[0].style.display = "flex";
            if (slideshowControls) {
                slideshowControls.remove(); // Remove controls if there is only one slide
            }
            return; // Skip the rest of the logic for single slide
        }

        let prevButton = slideshowControls.querySelector('.prev');
        let nextButton = slideshowControls.querySelector('.next');

        // Create dots dynamically based on the number of slides
        let dotContainer = slideshowControls.querySelector('.dot-container');
        dotContainer.innerHTML = ''; // Clear existing dots
        slides.forEach((_, slideIndex) => {
            let dot = document.createElement('span');
            dot.classList.add('dot');
            dotContainer.appendChild(dot);
        });

        let dots = dotContainer.querySelectorAll('.dot');
        let slideIndex = 1;
        showSlides(slideIndex);

        if (prevButton) {
            prevButton.addEventListener('click', function () {
                plusSlides(-1);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function () {
                plusSlides(1);
            });
        }

        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', function () {
                currentSlide(dotIndex + 1);
            });
        });

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }

            slides.forEach(slide => slide.style.display = "none");
            dots.forEach(dot => dot.classList.remove("active"));

            slides[slideIndex - 1].style.display = "flex";
            dots[slideIndex - 1].classList.add("active");
        }
    });
});