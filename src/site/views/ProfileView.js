export class ProfileView {
    constructor() {
        this.showAllExperience = false;
    }

    render() {
        return Promise.resolve(`
        <section class="profile-section">
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-header-content">
                        <div class="profile-image-wrapper">
                            <img src="https://avatars.githubusercontent.com/u/118651508?s=400&u=661cd194753af961af5b79964369c7eb23f594be&v=4" alt="Oscar Valois" class="profile-image">
                        </div>
                        <div class="profile-intro">
                           <center> <h1 class="profile-name">Oscar Valois</h1> </center>
                        </div>
                    </div>
                </div>
                
                <div class="profile-content">
                    <div class="profile-bio">
                        <h3 class="section-title"><i class="fas fa-user"></i> About Me</h3>
                        <p>Software engineer with experience in development, system architecture, security, and project management. Enjoys building effective solutions and working with skilled teams to deliver value across various technical domains.</p>  
                        <a href="#experience" class="subtle-link">Discover My Experience</a>
                    </div>
                    <div class="profile-details">
                        <div class="detail-card skills-card">
                            <h3 class="section-title"><i class="fas fa-cogs"></i> Skills</h3>
                            <div class="skills-grid">
                                <div class="skill-category" data-category="development">
                                    <div class="skill-icon"><i class="fas fa-code"></i></div>
                                    <h4>Development</h4>
                                    <div class="skill-tags">
                                        <span class="skill-tag">Backend</span>
                                        <span class="skill-tag">Frontend</span>
                                    </div>
                                </div>
                                <div class="skill-category" data-category="architecture">
                                <div class="skill-icon"><i class="fas fa-project-diagram"></i></div>
                                <h4>Architecture</h4>
                                <div class="skill-tags">
                                    <span class="skill-tag">Multi-Cloud Solutions</span>
                                    <span class="skill-tag">System Design</span>
                                    <span class="skill-tag">High Availability</span>
                                    <span class="skill-tag">Scalability</span>
                                    <span class="skill-tag">Disaster Recovery</span>
                                    <span class="skill-tag">Performance</span>
                                    <span class="skill-tag">Compliance</span>
                                </div>
                            </div>
                            <div class="skill-category" data-category="security">
                            <div class="skill-icon"><i class="fas fa-shield-alt"></i></div>
                            <h4>Security</h4>
                            <div class="skill-tags">
                                <span class="skill-tag">Security Assessment</span>
                                <span class="skill-tag">Vulnerability Analysis</span>
                                <span class="skill-tag">Penetration Testing</span>
                                <span class="skill-tag">Risk Mitigation</span>
                                <span class="skill-tag">Compliance Auditing</span>
                                <span class="skill-tag">Threat Modeling</span>
                                <span class="skill-tag">Security Reporting</span>
                            </div>
                        </div>
                        <div class="skill-category" data-category="management">
                        <div class="skill-icon"><i class="fas fa-users-cog"></i></div>
                        <h4>Management</h4>
                        <div class="skill-tags">
                            <span class="skill-tag">Project Leadership</span>
                            <span class="skill-tag">Agile Methodologies</span>
                            <span class="skill-tag">Team Coordination</span>
                            <span class="skill-tag">Resource Planning</span>
                            <span class="skill-tag">Stakeholder Engagement</span>
                            <span class="skill-tag">Performance Tracking</span>
                            <span class="skill-tag">Risk Management</span>
                        </div>
                    </div>
                            </div>
                        </div>
                        <div id="skill-details" class="skill-details">
                            <!-- Detalles de las habilidades se mostrarán aquí -->
                        </div>
                        <div class="detail-card" id="experience">
                            <h3 class="section-title"><i class="fas fa-briefcase"></i> Experience</h3>
                            <div id="experience-container">
                                <!-- Experience items will be dynamically inserted here -->
                            </div>
                            <button id="show-more-btn" class="show-more-btn">Show More</button>
                        </div>
                        <div class="detail-card education-card">
                            <h3 class="section-title"><i class="fas fa-graduation-cap"></i> Education</h3>
                            <div class="education-item">
                                <h4 class="education-degree">Computer Engineering</h4>
                                <p class="education-school">Tecnológico de Estudios Superiores de Cuautitlán Izcalli</p>
                                <span class="education-year">2013 - 2018</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`);
    }

    attachEventListeners() {
        const showMoreBtn = document.getElementById('show-more-btn');
        showMoreBtn.addEventListener('click', () => this.toggleExperience());
        this.renderExperience();

        // Añadir smooth scroll para los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Añadir interactividad a las categorías de habilidades
        document.querySelectorAll('.skill-category').forEach(category => {
            category.addEventListener('click', () => {
                const skillType = category.dataset.category;
                const detailsElement = document.getElementById('skill-details');
                
                const detailsContent = this.getSkillDetails(skillType);
                
                detailsElement.innerHTML = detailsContent;
                detailsElement.style.display = 'block';
            });
        });
    }

    renderExperience() {
        const experienceContainer = document.getElementById('experience-container');
        const experiences = [
            {
                role: "Senior Solution Architect and Senior Development Engineer",
                company: "Hergon",
                duration: "2023 - Present",
                description: "Leading innovative software architecture designs and DevSecOps practices. Driving digital transformation to enhance system scalability, performance, and security. Integrating cutting-edge development and security methodologies across the organization.",
                achievements: [
                    "Implemented a microservices architecture that improved system scalability",
                    "Reduced deployment time through DevOps automation"
                ]
            },
            {
                role: "Solution Architect",
                company: "Financiera Independencia",
                duration: "2021 - 2023",
                description: "Architected and implemented scalable financial systems, significantly enhancing operational efficiency and streamlining key business processes. This resulted in substantial cost savings and improved decision-making capabilities for the organization.",
                achievements: [
                    "Designed a new loan management system that increased processing speed",
                    "Implemented data analytics solutions that improved decision accuracy"
                ]
            },
            {
                role: "Senior Software Developer & Technical Lead",
                company: "Imperio Digital",
                duration: "2020 - 2021",
                description: "Orchestrated a high-performing team of developers to deliver cutting-edge digital solutions for enterprise-level financial clients. Implemented agile methodologies, resulting in improved project efficiency.",
                achievements: [
                    "Led a team that delivered major projects ahead of schedule",
                    "Increased team productivity through agile process improvements"
                ]
            },
            {
                role: "Senior Software Developer & Technical Lead",
                company: "Kleverness",
                duration: "2020 - 2021",
                description: "Led the backend development team for IoT smart home solutions, implementing robust architectures that enhanced product reliability and significantly improved user experience.",
                achievements: [
                    "Developed an IoT platform that supports connected devices",
                    "Improved system uptime through architecture enhancements"
                ]
            },
            {
                role: "Senior Software Developer",
                company: "KODE",
                duration: "2018 - 2019",
                description: "Designed, developed, and maintained high-performance web applications for data extraction and analysis, utilizing modern JavaScript and Java frameworks. Optimized for high traffic, resulting in improved data processing efficiency and enhanced user experience.",
                achievements: [
                    "Reduced page load time by 60% through optimizations and caching strategies"
                ]
            },
            {
                role: "Software Developer & Technical Lead",
                company: "Tacts",
                duration: "2016 - 2018",
                description: "Spearheaded the development of sophisticated custom software solutions, including Transportation Management Systems (TMS) and Human Resources Management Systems (HRMS). Implemented scalable architectures and intuitive user interfaces, resulting in streamlined operations and increased efficiency for client organizations.",
                achievements: [
                    "Developed a TMS that reduced logistics costs for clients by an average",
                ]
            },
            {
                role: "Technology Intern",
                company: "LG Electronics",
                duration: "2015 - 2016",
                description: "Provided technical support for computer hardware, network infrastructure, and servers. Managed service tickets and conducted user training sessions, enhancing overall IT efficiency and user productivity.",
                achievements: [
                    "Resolved technical support tickets with satisfaction rate"
                ]
            }
        ];

        const displayedExperiences = this.showAllExperience ? experiences : experiences.slice(0, 3);
        
        experienceContainer.innerHTML = displayedExperiences.map(exp => `
            <div class="experience-item">
                <h4 class="experience-role">${exp.role}</h4>
                <div class="experience-details">
                    <span class="experience-company">${exp.company}</span>
                    <span class="experience-duration">${exp.duration}</span>
                </div>
                <p class="experience-description">${exp.description}</p>
                <ul class="experience-achievements">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        const showMoreBtn = document.getElementById('show-more-btn');
        showMoreBtn.textContent = this.showAllExperience ? "Show Less" : "Show More";
        showMoreBtn.style.display = experiences.length > 3 ? "block" : "none";
    }

    toggleExperience() {
        this.showAllExperience = !this.showAllExperience;
        this.renderExperience();
    }

    getSkillDetails(skillType) {
        // Define el contenido detallado para cada categoría de habilidades
        const details = {
            development: `
                <h4>Development Skills</h4>
                <p><strong>Languages:</strong> Java, JavaScript, Python, C#, Ruby</p>
                <p><strong>Frameworks:</strong> Spring Boot, React, Angular, .NET Core</p>
                <p><strong>Cloud:</strong> AWS, Azure, Google Cloud Platform</p>
                <p><strong>DevOps:</strong> Docker, Kubernetes, Jenkins, GitLab CI/CD</p>
            `,
            architecture: `
                <h4>Architecture Skills</h4>
                <p><strong>Patterns:</strong> Microservices, Event-Driven, CQRS</p>
                <p><strong>Design:</strong> Domain-Driven Design, API Design</p>
                <p><strong>Integration:</strong> RESTful APIs, GraphQL, Message Queues</p>
                <p><strong>Databases:</strong> SQL, NoSQL, Data Modeling</p>
            `,
            security: `
                <h4>Security Skills</h4>
                <p><strong>Practices:</strong> OWASP Top 10, Secure SDLC</p>
                <p><strong>Tools:</strong> SonarQube, Fortify, SAST/DAST</p>
                <p><strong>Compliance:</strong> GDPR, PCI DSS, ISO 27001</p>
                <p><strong>Identity:</strong> OAuth 2.0, JWT, SSO</p>
            `,
            management: `
                <h4>Management Skills</h4>
                <p><strong>Methodologies:</strong> Agile, Scrum, Kanban, SAFe</p>
                <p><strong>Tools:</strong> Jira, Confluence, Trello, MS Project</p>
                <p><strong>Leadership:</strong> Team Building, Mentoring, Coaching</p>
                <p><strong>Soft Skills:</strong> Communication, Problem-Solving, Stakeholder Management</p>
            `
        };
        
        return details[skillType] || '<p>No details available</p>';
    }
}