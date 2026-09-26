document.addEventListener('DOMContentLoaded', () => {
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            
            sections.forEach(section => {
                section.classList.add("hidden");
            });

            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
            }
        });
    });
});

function showAuthor() {
    document.getElementById("author").classList.remove("hidden");
    document.getElementById("author").scrollIntoView({ behavior: "smooth" });
}