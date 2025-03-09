document.addEventListener('DOMContentLoaded', function () {

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