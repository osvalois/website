export class ProfileView {
    render() {
        return Promise.resolve(`
        <style>
        @import url('public/styles/profile-section.css');
        </style>
        <div class="card profile-card">
            <img src="https://avatars.githubusercontent.com/u/118651508?s=400&u=661cd194753af961af5b79964369c7eb23f594be&v=4" alt="Oscar Valois" class="profile-image">
            <div class="profile-info">
                <h2 class="profile-name">Oscar Valois</h2>
                <p class="profile-role">Solution Architect</p>
                <p class="profile-bio">Passionate about creating innovative solutions and leading high-performance teams.</p>
                <div class="profile-details">
                    <div class="profile-detail">
                        <strong>Skills</strong>
                        JavaScript, Ruby on Rails, UI/UX Design, Product Management
                    </div>
                    <div class="profile-detail">
                        <strong>Education</strong>
                        BS in Computer Science, University of Example
                    </div>
                    <div class="profile-detail">
                        <strong>Experience</strong>
                        10+ years in software development and project management
                    </div>
                    <div class="profile-detail">
                        <strong>Contact</strong>
                        oscar.valois@example.com
                    </div>
                </div>
            </div>
        </div>`);
    }
}