console.log("Script chargé");

function applyDarkMode(isDarkMode) {
    console.log("Applying dark mode:", isDarkMode);
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Appliquer le mode sombre immédiatement si nécessaire
if (localStorage.getItem('darkMode') === 'true') {
    applyDarkMode(true);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé");
    
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('id', 'dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    // Mettre à jour l'icône du bouton
    const updateDarkModeToggle = (isDarkMode) => {
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };

    // Initialiser l'état du bouton
    updateDarkModeToggle(localStorage.getItem('darkMode') === 'true');

    // Gérer le changement de mode
    darkModeToggle.addEventListener('click', () => {
        const newDarkModeState = !document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newDarkModeState);
        applyDarkMode(newDarkModeState);
        updateDarkModeToggle(newDarkModeState);
    });

    // Ajout d'un effet de défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Ajout d'un bouton "Retour en haut" dynamique
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.setAttribute('id', 'scroll-to-top');
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Ajout du menu déroulant
    const menuToggle = document.createElement('div');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i> Menu';
    menuToggle.setAttribute('id', 'menu-toggle');
    
    const dropdownMenu = document.createElement('div');
    dropdownMenu.setAttribute('id', 'dropdown-menu');
    dropdownMenu.style.display = 'none'; // Cacher le menu par défaut
    dropdownMenu.innerHTML = `
        <ul>
            <li><i class="fas fa-user"></i> Compte</li>
            <li><i class="fas fa-sign-out-alt"></i> Déconnexion</li>
            <li><i class="fas fa-cog"></i> Paramètres</li>
            <li><i class="fas fa-bell"></i> Notifications</li>
            <li><i class="fas fa-info-circle"></i> Informations personnelles</li>
        </ul>
    `;

    // Créer un conteneur pour le menu
    const menuContainer = document.createElement('div');
    menuContainer.setAttribute('id', 'menu-container');
    menuContainer.appendChild(menuToggle);
    menuContainer.appendChild(dropdownMenu);

    // Insérer le menu conteneur au début du body
    document.body.insertBefore(menuContainer, document.body.firstChild);

    // Ajouter des styles pour augmenter la taille du menu
    menuToggle.style.fontSize = '1.2em';
    menuToggle.style.padding = '15px';
    dropdownMenu.style.fontSize = '1.1em';
    dropdownMenu.style.width = '300px'; // Augmenter la largeur du menu déroulant

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    // ... (reste du code existant) ...
});