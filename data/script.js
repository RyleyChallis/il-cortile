const overlay = document.getElementById('sidebarOverlay');

function openNav() {
    document.getElementById('sidebar').style.transform = "translateX(0)";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";

    document.documentElement.style.overflowY = "hidden";
    document.body.style.userSelect = "none";
}

function closeNav() {
    document.getElementById('sidebar').style.transform = "translateX(100%)";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    document.documentElement.style.overflowY = "auto";
    document.body.style.userSelect = "auto";
}

overlay.addEventListener('click', () => {
    closeNav();
});

const sidebarLink = document.querySelectorAll('.sidebar-links a');

sidebarLink.forEach(link => {
    link.addEventListener('click', closeNav);
})