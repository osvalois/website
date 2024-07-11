export class ProfileView {
    constructor() {
        this.showAllExperience = false;
    }

    render() {
        return Promise.resolve(`
        <section class="profile-section">
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-image-wrapper">
                        <img src="https://avatars.githubusercontent.com/u/118651508?s=400&u=661cd194753af961af5b79964369c7eb23f594be&v=4" alt="Oscar Valois" class="profile-image">
                    </div>
                    <div class="profile-intro">
                        <h1 class="profile-name">Oscar Valois</h1>
                        <h2 class="profile-role">Solution Architect</h2>
                        <div class="profile-social">
                            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="profile-content">
                    <div class="profile-bio">
                        <h3 class="section-title">About Me</h3>
                        <p>Passionate about creating innovative solutions and leading high-performance teams. With over a decade of experience in software development and project management, I bring a unique blend of technical expertise and strategic vision to every project.</p>
                    </div>
                    
                    <div class="profile-details">
                        <div class="detail-card skills-card">
                            <h3 class="section-title">Skills</h3>
                            <ul class="skill-list">
                                <li><span class="skill-tag">Java</span></li>
                                <li><span class="skill-tag">Python</span></li>
                                <li><span class="skill-tag">Go</span></li>
                                <li><span class="skill-tag">C#</span></li>
                                <li><span class="skill-tag">Ruby</span></li>
                                <li><span class="skill-tag">JavaScript</span></li>
                                <li><span class="skill-tag">Dart</span></li>
                                <li><span class="skill-tag">Solutions Architect</span></li>
                                <li><span class="skill-tag">Product Management</span></li>
                            </ul>
                        </div>
                        <div class="detail-card">
                            <h3 class="section-title">Education</h3>
                            <div class="education-item">
                                <span class="education-degree">Computer engineering</span>
                                <span class="education-school">Tecnológico de Estudios Superiores de Cuautitlán Izcalli</span>
                                <span class="education-year">2013 - 2018</span>
                            </div>
                        </div>
                        <div class="detail-card">
                            <h3 class="section-title">Experience</h3>
                            <div id="experience-container">
                                <!-- Experience items will be dynamically inserted here -->
                            </div>
                            <button id="show-more-btn" class="show-more-btn">Show More</button>
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
    }

    renderExperience() {
        const experienceContainer = document.getElementById('experience-container');
        const experiences = [
            {
                role: "Senior Solution Architect and Senior Development Engineer",
                company: "Hergon",
                duration: "2023 - Present",
                description: "Spearheading innovative software architecture designs and championing the adoption of cutting-edge development practices. Driving digital transformation initiatives that enhance system scalability, performance, and security across the organization."
            },
            {
                role: "Solution Architect",
                company: "Financiera Independencia",
                duration: "2021 - 2023",
                description: "Architected and implemented scalable financial systems, significantly enhancing operational efficiency and streamlining key business processes. This resulted in substantial cost savings and improved decision-making capabilities for the organization."
            },
            {
                role: "Senior Software Developer & Technical Lead",
                company: "Imperio Digital",
                duration: "2020 - 2021",
                description:"Orchestrated a high-performing team of developers to deliver cutting-edge digital solutions for enterprise-level financial clients. Implemented agile methodologies, resulting in improved project efficiency."
            },
            {
                role: "Senior Software Developer & Technical Lead",
                company: "Kleverness",
                duration: "2020 - 2021",
                description: "Led the backend development team for IoT smart home solutions, implementing robust architectures that enhanced product reliability and significantly improved user experience."
            },
            {
                role: "Senior Software Developer",
                company: "KODE",
                duration: "2018 - 2019",
                description: "Designed, developed, and maintained high-performance web applications for data extraction and analysis, utilizing modern JavaScript and Java frameworks. Optimized for high traffic, resulting in improved data processing efficiency and enhanced user experience."
            },
            {
                role: "Software Developer & Technical Lead",
                company: "Tacts",
                duration: "2016 - 2018",
                description: "Spearheaded the development of sophisticated custom software solutions, including Transportation Management Systems (TMS) and Human Resources Management Systems (HRMS). Implemented scalable architectures and intuitive user interfaces, resulting in streamlined operations and increased efficiency for client organizations."
            },
            {
                role: "Technology Intern",
                company: "LG",
                duration: "2015 - 2016",
                description: "Provided technical support for computer hardware, network infrastructure, and servers. Managed service tickets and conducted user training sessions, enhancing overall IT efficiency and user productivity."
            }
        ];

        const displayedExperiences = this.showAllExperience ? experiences : experiences.slice(0, 1);
        
        experienceContainer.innerHTML = displayedExperiences.map(exp => `
            <div class="experience-item">
                <h4 class="experience-role">${exp.role}</h4>
                <div class="experience-details">
                    <span class="experience-company">${exp.company}</span>
                    <span class="experience-duration">${exp.duration}</span>
                </div>
                <p class="experience-description">${exp.description}</p>
            </div>
        `).join('');

        const showMoreBtn = document.getElementById('show-more-btn');
        showMoreBtn.textContent = this.showAllExperience ? "Show Less" : "Show More";
        showMoreBtn.style.display = experiences.length > 1 ? "block" : "none";
    }

    toggleExperience() {
        this.showAllExperience = !this.showAllExperience;
        this.renderExperience();
    }
}