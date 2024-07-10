export class ProfileView {
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
                                <li><span class="skill-tag">JavaScript</span></li>
                                <li><span class="skill-tag">Ruby on Rails</span></li>
                                <li><span class="skill-tag">UI/UX Design</span></li>
                                <li><span class="skill-tag">Product Management</span></li>
                            </ul>
                        </div>
                        <div class="detail-card">
                            <h3 class="section-title">Education</h3>
                            <div class="education-item">
                                <span class="education-degree">BS in Computer Science</span>
                                <span class="education-school">University of Example</span>
                                <span class="education-year">2010 - 2014</span>
                            </div>
                        </div>
                        <div class="detail-card">
                            <h3 class="section-title">Experience</h3>
                            <div class="experience-item">
                                <span class="experience-role">Senior Solution Architect</span>
                                <span class="experience-company">Tech Innovations Inc.</span>
                                <span class="experience-duration">2018 - Present</span>
                            </div>
                            <div class="experience-item">
                                <span class="experience-role">Software Developer</span>
                                <span class="experience-company">Digital Solutions Ltd.</span>
                                <span class="experience-duration">2014 - 2018</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`);
    }
}