document.addEventListener('DOMContentLoaded', function () {

    // Custom cursor
    const customCursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', function (e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

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

    // Expand project containers on click
    const projectContainers = document.querySelectorAll('.project-container');

    projectContainers.forEach(container => {
        container.addEventListener('click', function () {
            // Collapse any currently expanded item
            projectContainers.forEach(item => {
                if (item !== container) {
                    item.classList.remove('expanded');
                }
            });

            // Toggle the clicked item
            this.classList.toggle('expanded');
        });
    });
});