document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion du thème
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';

    toggleSwitch.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Chargement des données JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateAbout(data.profile);
            populateSkills(data.skills);
            populateExperience(data.experience);
            populateProjects(data.projects);
            populateEducation(data.education);
        })
        .catch(err => console.error('Erreur lors de la lecture du JSON:', err));
});

function populateAbout(profile) {
    document.getElementById('hero-name').textContent = profile.name;
    document.getElementById('hero-title').textContent = profile.title;
    document.getElementById('hero-about').textContent = profile.about;

    const links = document.getElementById('contact-links');
    links.innerHTML = `
        <a href="mailto:${profile.email}">Email</a>
        <a href="${profile.linkedin}" target="_blank">LinkedIn</a>
        <a href="${profile.github}" target="_blank">GitHub</a>
    `;
}

function populateSkills(skills) {
    const hardList = document.getElementById('hard-skills-list');
    skills.hard.forEach(skill => {
        hardList.innerHTML += `<li>${skill}</li>`;
    });

    const softList = document.getElementById('soft-skills-list');
    skills.soft.forEach(skill => {
        softList.innerHTML += `<li>${skill}</li>`;
    });
}

function populateExperience(experiences) {
    const container = document.getElementById('experience-list');
    experiences.forEach(exp => {
        // Génération de la liste à puces pour l'expérience
        let descHTML = '<ul class="card-list">';
        exp.description.forEach(item => {
            descHTML += `<li>${item}</li>`;
        });
        descHTML += '</ul>';

        container.innerHTML += `
            <div class="experience-card">
                <div class="company-logo-placeholder">${exp.initials}</div>
                <div class="exp-content">
                    <div class="exp-header">
                        <span class="exp-role">${exp.role}</span>
                        <span class="exp-period">${exp.period}</span>
                    </div>
                    <div class="exp-company">${exp.company}</div>
                    ${descHTML}
                </div>
            </div>
        `;
    });
}

function populateProjects(projects) {
    const container = document.getElementById('projects-list');
    projects.forEach(proj => {
        // Génération de la liste à puces pour le projet
        let descHTML = '<ul class="card-list">';
        proj.description.forEach(item => {
            descHTML += `<li>${item}</li>`;
        });
        descHTML += '</ul>';

        container.innerHTML += `
            <div class="info-block">
                <h4>${proj.title}</h4>
                <div class="meta">${proj.year}</div>
                ${descHTML}
            </div>
        `;
    });
}

function populateEducation(education) {
    const container = document.getElementById('education-list');
    education.forEach(edu => {
        container.innerHTML += `
            <div class="info-block">
                <h4>${edu.degree}</h4>
                <div class="meta">${edu.period}</div>
                <p>${edu.school}</p>
            </div>
        `;
    });
}
