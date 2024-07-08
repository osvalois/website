export class ProfileView {
    render() {
        return Promise.resolve(`
        <style>
        @import url('public/styles/profile-section.css');
        </style>
        <h2>About Me</h2>
        <div class="card profile-card">
        <center> 
        <img src="https://avatars.githubusercontent.com/u/118651508?s=400&u=661cd194753af961af5b79964369c7eb23f594be&v=4" alt="Oscar Valois" class="profile-image">            <div class="profile-info">
           <p><strong>Name:</strong> Oscar Valois</p>
           <p><strong>Role:</strong> Product Director</p>
           <p><strong>Bio:</strong> Passionate about creating innovative solutions and leading high-performance teams.</p>
           <p><strong>Skills:</strong> JavaScript, Ruby on Rails, UI/UX Design, Product Management</p>
           <p><strong>Education:</strong> BS in Computer Science, University of Example</p>
           <p><strong>Experience:</strong> 10+ years in software development and project management</p>
        </div>
       </center>
        </div>`);
    }
}
