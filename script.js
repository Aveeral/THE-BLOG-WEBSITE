
// sign up form 
let userName = document.querySelector('.name-input');
let password = document.querySelector('.password-input');
let email = document.querySelector('.email-input');

let SignUpForm = document.querySelector('.sign-up');

// login form
let loginName = document.querySelector('.Username-input');
let loginPassword = document.querySelector('.password-login-input');
let logInForm = document.querySelector('.login'); // make sure your form has this class!

// logout button
let logOutButton = document.querySelector('.logout-button');

// createPageAccess

let Create = document.querySelector('.createpost')

// creatingBlog
let title = document.querySelector('.title-create');
let textarea = document.querySelector('.create-content');
let createForm = document.querySelector('.create-form');
let thumbnailUpload = document.querySelector('.thumbnail-upload')

//feed-sectio
let Feed = document.querySelector('.feed-section');

// myPosts 
let myPosts = document.querySelector('.myposts')







    
//  SIGN UP 
function signUp(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = {
        userName: userName.value,
        password: password.value,
        email: email.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("SIGN UP SUCCESSFUL ✅");
    window.location.href = "login.html";
}

if (SignUpForm) {
    SignUpForm.addEventListener("submit", signUp);
}

//  LOGIN 
function login(e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = {
        userName: loginName.value,
        password: loginPassword.value,


    };
    let loggedUser = users.find(
        user => user.userName === currentUser.userName && user.password === currentUser.password
    );
    if (loggedUser) {



        localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
        alert(`LOGIN SUCCESSFUL, WELCOME ${currentUser.userName}`);

        window.location.href = "index.html";


    } else {
        alert("INVALID USERNAME OR PASSWORD");
    }
}

if (logInForm) {
    logInForm.addEventListener("submit", login);
}

// LOGOUT BUTTON 

let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (currentUser) {
    logOutButton.classList.remove("none")
}

function logout(e) {
    localStorage.removeItem("loggedInUser");
    logOutButton.classList.add("none");

}

if (logOutButton) {
    logOutButton.addEventListener("click", logout);

}


// createPageAccess


function createPage(e) {
    e.preventDefault();
    let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (currentUser) {
        window.location.href = "create.html"
    }
    else {
        alert("YOU NEED TO LOGIN TO VIEW THIS PAGE")
        window.location.href = "login.html"
    }
}
if (Create) { Create.addEventListener("click", createPage) }


// create Page formation 

function createBlog(e) {
    e.preventDefault();

    const Blogs = JSON.parse(localStorage.getItem("Blogs")) || [];
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const file = thumbnailUpload.files[0]; // get uploaded file

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const Blog = {
                id: Date.now(),
                title: title.value,
                content: textarea.value,
                author: currentUser.userName,
                thumbnail: event.target.result, // data URL
                date: new Date()
            };

            Blogs.push(Blog);
            localStorage.setItem("Blogs", JSON.stringify(Blogs));
            alert("Blog Published successfully!");
            window.location.href = "myposts.html";
        }

        reader.readAsDataURL(file); // convert file to base64 URL
    } else {
        alert("Please select an image file!");
    }
}


if (createForm) {
    createForm.addEventListener("submit", createBlog);
}




const Blogs = JSON.parse(localStorage.getItem("Blogs")) || [];

// MyPost  & HomePage Blog 
function BlogCreation(arr, container) {
    arr.forEach((Blog, index) => {
        const BlogCard = document.createElement("div");
        BlogCard.classList.add("BlogCard");

        const titleBlog = document.createElement("h1");
        titleBlog.classList.add("titleBlog");
        titleBlog.innerText = Blog.title;

        const thumbnailBlog = document.createElement("img");
        thumbnailBlog.classList.add("thumbnailBlog");
        thumbnailBlog.setAttribute("src", Blog.thumbnail);

        const writer = document.createElement("p");
        writer.classList.add("writer");
        writer.innerText = Blog.author;

        const createTime = document.createElement("p");
        createTime.classList.add("createTime");
        createTime.innerText = new Date(Blog.date).toLocaleString();

        const ReadMore = document.createElement("button");
        ReadMore.innerText = "READ MORE";
        ReadMore.addEventListener("click", () => {
            window.location.href = `blog.html?id=${Blog.id}`;
        });

        // append everything into BlogCard
        BlogCard.appendChild(titleBlog);
        BlogCard.appendChild(thumbnailBlog);
        BlogCard.appendChild(writer);
        BlogCard.appendChild(createTime);
        BlogCard.appendChild(ReadMore);

        // append BlogCard into the container
        container.appendChild(BlogCard);
    });
}

// Homepage feed
if (Feed) {
    BlogCreation(Blogs, Feed);
}

// MyPosts

    const myBlogs = Blogs.filter(Blog => Blog.author === currentUser.userName);

if (myPosts) {
    BlogCreation(myBlogs, myPosts)
}




// Full blog Page creation
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");


const blog = Blogs.find(b => b.id == blogId);

if (blog) {
    document.querySelector(".blog-title").innerText = blog.title;
    document.querySelector(".blog-thumbnail").setAttribute("src", blog.thumbnail);
    document.querySelector(".blog-writer").innerText = `By ${blog.author}`;
    document.querySelector(".blog-date").innerText = new Date(blog.date).toLocaleString();
    document.querySelector(".blog-content").innerText = blog.content;
} else {
   const blogContainer = document.querySelector(".blog-container");
if (blogContainer) {
    blogContainer.innerHTML = "<h2>Blog not found</h2>";
}

   
}























































