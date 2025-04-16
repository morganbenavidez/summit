

// Main Listener
// main function on page loading everytime
document.addEventListener('DOMContentLoaded', function() {
    const page = getPageFromUrl();
    loadPage(page);
});

function getPageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || document.body.getAttribute('data-page') || "home"; // Default to 'home' if no page is specified.
}


// Navigation and State Handling
// navigate
function navigate(page) {
    console.log('Navigating to:', page); // Debug message
    history.pushState({ page }, "", "?page=" + page);
    loadPage(page);
}

window.addEventListener('popstate', function(event) {
    const page = event.state ? event.state.page : getPageFromUrl();
    loadPage(page);
});

function updatePageState(page) {
    localStorage.setItem('currentPage', page);
    document.body.setAttribute('data-page', page);
    window.scrollTo(0, 0);
}




// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOU SHOULDN'T EDIT ANYTHING ABOVE THIS LINE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



// $$$$$ Add new cases, titleContents, metaContents, and load functions for each page you create   $$$$$$$$

// Define your Titles and Meta Content Here
function loadPage(page) {

    let titleContent = '';
    let metaContent = '';

    switch (page) {

        case 'home':
            titleContent = 'Summit';
            metaContent = 'Helping you Summit your next Flask Project';
            loadHomePage(titleContent, metaContent);
            break;
        case 'documentation':
            titleContent = 'Summit Documentation';
            metaContent = 'The documenation you need to learn the summit framework';
            loadDocumentationPage(titleContent, metaContent);
            break;
        // ADD MORE CASES FOR EACH OF YOUR PAGES AS NEEDED
        case 'login':
            titleContent = "Summit Login";
            metaContent = "Summit Login";
            loadLoginPage(titleContent, metaContent);
            break;
        case 'dashboard':
            titleContent = "Summit Dashboard";
            metaContent = "Summit Dashboard";
            loadDashboardPage(titleContent, metaContent);
            break;
        default:
            titleContent = 'Summit Framework';
            metaContent = 'A framework built to get you from base camp to the summit quickly!';
            loadHomePage(titleContent, metaContent);
            break;
    }

    updatePageState(page)

}


function buildNavBar(which_type) {

    // Create sticky side nav (desktop) or burger-toggle nav (mobile)
    const sideNav = div(document.getElementById("outer_block"), { class: "side-nav" });
  
    const logo = div(sideNav, { class: "side-logo" });
    img(logo, {
      src: "/static/images/summit.png",
      alt: "Summit Logo",
      class: "side-logo-img"
    });
    h2(logo, { innerHTML: "Summit", class: "side-brand" });
    
    if (which_type === 'main') {
        const linkContainer = div(sideNav, { class: "side-links" });
        [
            "Home",
            "Login",
            "Documentation"
        ].forEach((name) => {
        const link = a(linkContainer, {
            href: `javascript:navigate('${name.toLowerCase().replace(/\s+/g, "-")}')`,
            class: "side-link"
        });
        link.textContent = name;
        });
    }
    else if (which_type === 'dashboard') {
        const linkContainer = div(sideNav, { class: "side-links" });
        [
            "Home",
            "Documentation"
        ].forEach((name) => {
        const link = a(linkContainer, {
            href: `javascript:navigate('${name.toLowerCase().replace(/\s+/g, "-")}')`,
            class: "side-link"
        });
        link.textContent = name;
        });
    }
    else if (which_type === 'docs') {
        const linkContainer = div(sideNav, { class: "side-links" });
        [
            "Home",
            "Login",
            "Documentation"
        ].forEach((name) => {
        const link = a(linkContainer, {
            href: `javascript:navigate('${name.toLowerCase().replace(/\s+/g, "-")}')`,
            class: "side-link"
        });
        link.textContent = name;
        });
        a(linkContainer, { href: "#At_the_start",       innerHTML: "Start",    class: "side-link" });
        a(linkContainer, { href: "#page-initialization", innerHTML: "Init",     class: "side-link" });
        a(linkContainer, { href: "#page-loading",        innerHTML: "Loading",  class: "side-link" });
        a(linkContainer, { href: "#loadPage-function",   innerHTML: "LoadPage", class: "side-link" });
        a(linkContainer, { href: "#ajax_package",        innerHTML: "AjaxPkg",  class: "side-link" });
        a(linkContainer, { href: "#ajax_request",        innerHTML: "AjaxReq",  class: "side-link" });
        a(linkContainer, { href: "#helper_functions",    innerHTML: "Helpers",  class: "side-link" });
    }
    
    const burger = div(document.getElementById("outer_block"), { class: "burger" });
    burger.innerHTML = "☰";
    burger.onclick = () => {
      sideNav.classList.toggle("active");
    };

}


function buildFooter() {
    // Footer
    const footer = div(document.getElementById("outer_block"), { class: "footer-centered" });
    h2(footer, { innerHTML: "Summit", class: "footer-brand" });
    p(footer, { innerHTML: "Getting you to the Summit.", class: "footer-tagline" });
  
    p(footer, {
      innerHTML: "&copy; 2025 Summit. All rights reserved.",
      class: "footer-copy"
    });
}


// Home Page Entry Point
function loadHomePage(titleContent, metaContent) {

    // Clear page and set meta
    startOffAPage(titleContent, metaContent);

    const centeredBlock = document.getElementById('centered_block');
  
    buildNavBar('main');
  
    // Main Wrapper
    const wrapper = div(centeredBlock, { class: "landing-wrapper" });
  
    // Hero Section
    const heroSection = div(wrapper, { class: "hero-section" });
    img(heroSection, {
      src: "/static/images/summit.png",
      alt: "Summit Logo",
      class: "hero-logo"
    });
    h1(heroSection, { innerHTML: "Summit", id: 'mainTitle'});
    p(heroSection, { innerHTML: "A JavaScript and Python (Flask) Framework.", class: "hero-subtitle" });
  
    // Info Section
    const infoContainer = div(wrapper, { class: "info-container" });
    const servicesContainer = div(infoContainer, { class: "services-container" });
  
    const tileData = [
      {
        title: "Who We Are",
        text:
          "Summit was developed from a need to quickly build an intuitive GUI that interfaces well with AI backends."
      },
      {
        title: "What We Believe",
        text:
          "We believe in rapid prototyping and focusing on developing a robust backend quickly. We wanted to remove the hassle of strapping a front end on."
      },
      {
        title: "Our Mission",
        text:
          "To make Summiting your project as simple as possible."
      },
    ];
  
    tileData.forEach(({ title, text }) => {
      const tile = div(servicesContainer, { class: "service-box" });
      h2(tile, { innerHTML: title });
      p(tile, { innerHTML: text });
    });

    //const text_container = div(wrapper, {id: "text-container"});
    h2(wrapper, {innerHTML: "Welcome to base camp. Let's get you to the Summit!"});
    //a(text_container, {href: "javascript:navigate('documentation')", innerHTML: "Documentation"});
    //const text_container2 = div(wrapper, {id: "text-container2"});
    //a(text_container2, {href: "javascript:navigate('login')", innerHTML: "Login"});
  
    buildFooter();
    
}


function loadDocumentationPage(titleContent, metaContent) {
    
    
    startOffAPage(titleContent, metaContent);
    

    const centeredBlockMain = document.getElementById('centered_block');
    const centeredBlock = div(centeredBlockMain, {id: 'centered_block_docs'});
    buildNavBar('docs');
    // Main Wrapper
    //const centeredBlock = div(centeredBlock1, { class: "landing-wrapper" });

    
    h1(centeredBlock, { innerHTML: "Summit.js Documentation" });
    p(centeredBlock, { innerHTML: "Summit.js is a framework designed to streamline web application development by simplifying navigation, state management, and UI structure." });
    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Getting start section - Basic 
    h2(centeredBlock, { innerHTML: "Getting started with summit.js", id: "getting_started" });
    

    // Intro Paragraph
    p(centeredBlock, { innerHTML: "Before using Summit.js in your project, follow these steps:" });
        
    // Step 1: Download Summit.js
    h3(centeredBlock, { innerHTML: "Step 1: Download Summit.js" });
    p(centeredBlock, { innerHTML: "Download the Summit.js file from the official repositor and run the below command" });
    pre(centeredBlock, { innerHTML: `<code>git clone --depth 1 https://github.com/morganbenavidez/summit temp_project && mv temp_project your_project_name && cd your_project_name && rm -rf .git && bash setup.sh</code>` });
    p(centeredBlock, { innerHTML: `Or manually download the file: ` });
    a(centeredBlock, { href: "https://github.com/morganbenavidez/summit/blob/main/summit.js", target: "_blank", innerHTML: "Summit.js" });
    
    // Step 2: Include Summit.js
    h3(centeredBlock, { innerHTML: "Step 2: Include Summit.js in Your Project" });
    p(centeredBlock, { innerHTML: "Add Summit.js to your project by including it in your HTML file:" });
    pre(centeredBlock, { innerHTML: `&lt;script src="path/to/summit.js"&gt;&lt;/script&gt;` });
    
    // Step 3: Initialize Summit.js
    h3(centeredBlock, { innerHTML: "Step 3: Initialize Summit.js" });
    p(centeredBlock, { innerHTML: "Ensure that Summit.js is loaded by calling its initialization function in your JavaScript file:" });
    pre(centeredBlock, { innerHTML: `<code>
        document.addEventListener('DOMContentLoaded', function() {
        console.log('Summit.js Loaded!');
        });
        </code>` 
    });
    
    // Step 4: Start Using Summit.js
    h3(centeredBlock, { innerHTML: "Step 4: Start Using Summit.js" });
    p(centeredBlock, { innerHTML: "You can now use Summit.js features such as navigation, state management, and UI utilities." });

    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Handling Form Data and Validation
    h2(centeredBlock, { id: "At_the_start", innerHTML: "Handling Form Data and Validation" });
   
    p(centeredBlock, { innerHTML: "Summit.js includes built-in utilities to help manage form data and validate inputs efficiently." });
         
    // Global Variables
    h3(centeredBlock, { innerHTML: "Global Variables" });
    p(centeredBlock, { innerHTML: "Summit.js includes global variables to store user selections and validate email formats." });
    pre(centeredBlock, { innerHTML: `<code>
        // Create an object to store selected files globally
        const fileSelections = {};
        
        // Validate email format using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        </code>` 
    });
         
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<strong>fileSelections:</strong> An object that holds the selected files from file inputs.                                                                 " });
    li(centeredBlock, { innerHTML: "<strong>emailPattern:</strong> A regular expression used to validate email formats.                                                                              " });
         
    // Form Submission and AJAX Requests
    h3(centeredBlock, { innerHTML: "Form Submission and AJAX Requests" });
         
    // testJsonOnly() - Sending JSON Data
    h4(centeredBlock, { innerHTML: "testJsonOnly() – Sending JSON Data" });
    p(centeredBlock, { innerHTML: "The <just_fn>testJsonOnly()</just_fn> function collects input values from specified form elements and sends them to the server as a JSON payload." });
    pre(centeredBlock, { innerHTML: `<code>
        function testJsonOnly() {
            // List of the ids of elements you want to include
            let formElements = ["username", "email"];
            let { data, responseType } = ajax_package(formElements, 'json_only', 'json_1');
            ajax_request(data, responseType);
        }
        </code>` 
    });

    const gettingStarted = div(centeredBlock, { id: 'gettingStarted' });
    p(gettingStarted);
         
    p(centeredBlock, { innerHTML: "This function performs the following tasks:" });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "Defines an array of form element IDs (<just_fn>[\"username\", \"email\"]</just_fn>) whose values need to be sent.                                                                      " });
    li(centeredBlock, { innerHTML: "Packages the data using <just_fn>ajax_package()</just_fn>, specifying the mode as <just_fn>'json_only'</just_fn> and job type as <just_fn>'json_1'</just_fn>.                                                               " });
    li(centeredBlock, { innerHTML: "Calls <just_fn>ajax_request()</just_fn> to send the packaged data to the server.                                                                                               " });
         
    p(centeredBlock, { innerHTML: "This function is useful when submitting simple form data (e.g., username and email) in JSON format without including files or complex data structures.                                                               " });
     

    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Page Initialization and Navigation
    h2(centeredBlock, { id: "page-initialization", innerHTML: "1. Page Initialization and Navigation" });
  

    p(centeredBlock, { innerHTML: "These functions handle page loading and navigation without refreshing the page." });
        
    h3(centeredBlock, { innerHTML: "DOMContentLoaded Event Listener" });
    pre(centeredBlock, { innerHTML: `<code>
        document.addEventListener('DOMContentLoaded', function() {
            const page = getPageFromUrl();
            loadPage(page);
        });
        </code>` 
    });
    p(centeredBlock, { innerHTML: "When the page loads, it calls <just_fn>getPageFromUrl()</just_fn> to determine the current page. Then, <just_fn>loadPage(page)</just_fn> dynamically loads the content for that page." });
        
    h3(centeredBlock, { innerHTML: "getPageFromUrl() – Determines the Page to Load" });
    pre(centeredBlock, { innerHTML: `<code>
        function getPageFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get("page") || document.body.getAttribute('data-page') || "home";
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "This function extracts the <just_fn>page</just_fn> parameter from the URL. If no <just_fn>page</just_fn> is provided, it defaults to the <just_fn>data-page</just_fn> attribute in <just_fn>&lt;body&gt;</just_fn>, or \"home\"." });
        
    h3(centeredBlock, { innerHTML: "navigate(page) – Handles Internal Navigation" });
    pre(centeredBlock, { innerHTML: `<code>
        function navigate(page) {
            history.pushState({ page }, "", "?page=" + page);
            loadPage(page);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "Updates the URL without reloading using <just_fn>history.pushState()</just_fn>. Calls <just_fn>loadPage(page)</just_fn> to dynamically load the selected page." });
    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Page Loading and Content Handling
    h2(centeredBlock, { id: "page-loading", innerHTML: "2. Page Loading and Content Handling" });
   

    h3(centeredBlock, { innerHTML: "loadPage(page) – Determines and Loads the Requested Page" });


    pre(centeredBlock, { innerHTML: `<code>
        function loadPage(page) {
            let titleContent = '';
            let metaContent = '';
            
            switch (page) {
                case 'home':
                    titleContent = 'Summit Documentation';
                    metaContent = 'Documentation for the Summit Framework';
                    loadHomePage(titleContent, metaContent);
                    break;
                case 'docs':
                    titleContent = 'Summit Docs';
                    metaContent = 'Learn how to use the Summit Framework';
                    loadDocsPage(titleContent, metaContent);
                    break;
                default:
                    titleContent = 'Summit Documentation';
                    metaContent = 'Documentation for the Summit Framework';
                    loadHomePage(titleContent, metaContent);
                    break;
            }
                updatePageState(page);
        }
        </code>` 
    });

    // Page Loading Extension

 
    p(centeredBlock, { innerHTML: "Uses a switch statement to determine which page to load and calls the appropriate function." });
    
    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Load Home Page Function
    h2(centeredBlock, { id: "loadPage-function", innerHTML: "3. loadHomePage(titleContent, metaContent) – Loads Home Page" });

    pre(centeredBlock, { innerHTML: `<code>
        function loadHomePage(titleContent, metaContent) {
            const centeredBlock = document.getElementById('centered_block');
            startOffAPage(centeredBlock, titleContent, metaContent);
            
            h1(centeredBlock, { innerHTML: "Welcome to the Summit Documentation" });
            p(centeredBlock, { innerHTML: "Summit.js is a lightweight and efficient framework designed to simplify the development process." });
            
            h2(centeredBlock, { innerHTML: "Why Summit.js?" });
            ul(centeredBlock, { innerHTML: "<li>Easy state management and navigation.</li><li>Lightweight with minimal dependencies.</li><li>Quick integration with existing projects.</li><li>Enhances development speed and maintainability.</li>" });
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "This function uses helper functions to dynamically create and structure the homepage content." });
    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted

    // Understanding ajax_package()
    h2(centeredBlock, { id: "ajax_package", innerHTML: "4. Understanding the ajax_package() Function" });
   
    p(centeredBlock, { innerHTML: "The <just_fn>ajax_package()</just_fn> function is responsible for preparing data before making an AJAX request. This function determines the format in which data will be sent to the backend, whether it's JSON, a single file, or multiple files." });
                
    h3(centeredBlock, { innerHTML: "Function Breakdown" });
    pre(centeredBlock, { innerHTML: `<code>
        function ajax_package(formElements, mode, job) {
        </code>` 
    });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<strong>formElements:</strong> An array of HTML element IDs whose values need to be included in the request." });
    li(centeredBlock, { innerHTML: "<strong>mode:</strong> Determines what type of data is being sent (<just_fn>json_only</just_fn>, <just_fn>single_file</just_fn>, etc.)." });
    li(centeredBlock, { innerHTML: "<strong>job:</strong> A label describing the task, which is sent along with the request to let the backend know what operation needs to be performed." });
                
    h3(centeredBlock, { innerHTML: "Step-by-Step Explanation of Different Modes" });
    h4(centeredBlock, { innerHTML: "1. Simple POST Request (simple_post)" });
    p(centeredBlock, { innerHTML: "This mode sends a simple JSON object to the backend." });
    pre(centeredBlock, { innerHTML: `<code>
        if (mode === 'simple_post') {
            let jsonData = {
                backend_flag: "simple_post",
                job: job
            };
            return { data: jsonData, responseType: "json" };
        }
        </code>` 
    });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<just_fn>backend_flag: \"simple_post\"</just_fn> → Identifies this as a simple POST request.                                                                          " });
    li(centeredBlock, { innerHTML: "<just_fn>job</just_fn> → Specifies what operation the backend should perform.                                                                                                              " });
            
    // Sending JSON Data Mode
    h4(centeredBlock, { innerHTML: "2. Sending JSON Data (json_only)" });
    p(centeredBlock, { innerHTML: "This mode collects values from specified form elements and sends them as JSON." });
    pre(centeredBlock, { innerHTML: `<code>
        if (mode === 'json_only') {
            let jsonData = {
                backend_flag: "json_only",
                job: job
            };
            
            formElements.forEach(id => {
                let the_input = document.getElementById(id);
                if (the_input) {
                    jsonData[id] = the_input.value.trim();
                }
            });
            
            // Add Validation
            ajax_validate(jsonData, job, mode);
            
            return { data: jsonData, responseType: "json" };
        }
        </code>` 
    });
            
    p(centeredBlock, { innerHTML: "Example scenario:" });
    pre(centeredBlock, { innerHTML: `<code>
        ajax_package(["username", "email"], "json_only", "register_user");
        </code>` 
    });
            
    p(centeredBlock, { innerHTML: "Would return:" });
    pre(centeredBlock, { innerHTML: `<code>
        {
            "backend_flag": "json_only",
            "job": "register_user",
            "username": "JohnDoe",
            "email": "john@example.com"
        }
        </code>` 
    });

    // Sending a Single File
    h4(centeredBlock, { innerHTML: "3. Sending a Single File (single_file)" });
    p(centeredBlock, { innerHTML: "This mode packages and sends a file using FormData." });
    pre(centeredBlock, { innerHTML: `<code>
        else if (mode === 'single_file') {
            let formData = new FormData();
            formData.append("backend_flag", 'single_file');
            formData.append("job", job);

            formElements.forEach(id => {
                let input = document.getElementById(id);
                if (input && input.files.length > 0) {
                    formData.append(id, input.files[0]);
                }
            });

            ajax_validate(formData, job, mode);

            return { data: formData, responseType: "json" };
        }
        </code>` 
    });

    // Sending JSON + Single File
    h4(centeredBlock, { innerHTML: "4. Sending JSON + Single File (single_file_and_json)" });
    p(centeredBlock, { innerHTML: "This mode packages both JSON data and a file using FormData." });
    pre(centeredBlock, { innerHTML: `<code>
        else if (mode === 'single_file_and_json') {
            let formData = new FormData();
            formData.append("backend_flag", 'single_file_and_json');
            formData.append("job", job);

            formElements.forEach(id => {
                let input = document.getElementById(id);
                if (!input) return;

                if (input.type === "file" && input.files.length > 0) {
                    formData.append(id, input.files[0]);
                } else {
                    formData.append(id, input.value.trim());
                }
            });

            ajax_validate(formData, job, mode);

            return { data: formData, responseType: "json" };
        }
        </code>` 
    });
    
    // Sending Multiple Files
    h4(centeredBlock, { innerHTML: "5. Sending Multiple Files (folder_submission)" });
    p(centeredBlock, { innerHTML: "This mode packages multiple files using FormData." });
    pre(centeredBlock, { innerHTML: `<code>
        else if (mode === 'folder_submission') {
            var inputId = formElements[0];
            let formData = new FormData();
            formData.append("backend_flag", 'multiple_files');
            formData.append("job", job);

            fileSelections[inputId].forEach(file => {
                formData.append("multiFiles", file, file.webkitRelativePath);
            });

            ajax_validate(formData, job, mode);

            return { data: formData, responseType: "json" };
        }
        </code>` 
    });
      
    // Sending Multiple Files + JSON
    h4(centeredBlock, { innerHTML: "6. Sending Multiple Files + JSON (folder_and_json)" });
    p(centeredBlock, { innerHTML: "This mode packages multiple files along with JSON data." });
    pre(centeredBlock, { innerHTML: `<code>
        else if (mode === 'folder_and_json') {
            var inputId = formElements[0];
            let formData = new FormData();
            formData.append("backend_flag", 'folder_and_json');
            formData.append("job", job);

            formElements.forEach(id => {
                let input = document.getElementById(id);
                if (!input) return;

                if (input.type !== "file") {
                    formData.append(id, input.value.trim());
                }
            });

            fileSelections[inputId].forEach(file => {
                formData.append("multiFiles", file, file.webkitRelativePath);
            });

            ajax_validate(formData, job, mode);

            return { data: formData, responseType: "json" };
        }
        </code>` 
    });
      
    // Conclusion
    h3(centeredBlock, { innerHTML: "Conclusion" });
    p(centeredBlock, { innerHTML: "The <just_fn>ajax_package()</just_fn> function is a flexible utility that helps format different types of AJAX requests. It supports:" });
    // Conclusion
    h3(centeredBlock, { innerHTML: "Conclusion" });
    p(centeredBlock, {
    innerHTML:
        "The <just_fn>ajax_package()</just_fn> function is a flexible utility that helps format different types of AJAX requests. It supports:",
    });

    // Create a UL to hold the conclusion list items
    ul(centeredBlock, {});

    // Each LI uses the class "conclusion_style"
    li(centeredBlock, { innerHTML: "JSON only", className: "conclusion_style" });
    li(centeredBlock, { innerHTML: "Single file", className: "conclusion_style" });
    li(centeredBlock, { innerHTML: "File + JSON", className: "conclusion_style" });
    li(centeredBlock, { innerHTML: "Multiple files", className: "conclusion_style" });
    li(centeredBlock, {
    innerHTML: "Multiple files + JSON",
    className: "conclusion_style",
    });

    // Final paragraph also uses "conclusion_style"
    p(centeredBlock, {
    innerHTML:
        "This makes it an all-in-one AJAX data handler for Summit.js!",
    className: "conclusion_style",
    });

      
    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Understanding the ajax_request() Function
    h2(centeredBlock, { id: "ajax_request", innerHTML: "5. Understanding the ajax_request() Function" });
   

    p(centeredBlock, { innerHTML: "The <just_fn>ajax_request()</just_fn> function is responsible for making AJAX requests to the server. It handles different types of data (JSON or FormData) and processes responses from the backend." });
       
    // Function Breakdown
    h3(centeredBlock, { innerHTML: "Function Breakdown" });
    pre(centeredBlock, { innerHTML: `<code>
        function ajax_request(data, responseType, callback = () => {}) {
        </code>` 
    });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<strong>data:</strong> The payload being sent to the server (can be JSON or FormData).                                                                                       " });
    li(centeredBlock, { innerHTML: "<strong>responseType:</strong> Specifies how to handle the response (e.g., JSON, files, etc.).                                                                                 " });
    li(centeredBlock, { innerHTML: "<strong>callback:</strong> An optional function that runs after the request completes.                                                                                        " });
       
    // Defining API Endpoint
    h3(centeredBlock, { innerHTML: "How the Function Works" });
    p(centeredBlock, { innerHTML: "First, the function defines the API endpoint and the request method:" });
    pre(centeredBlock, { innerHTML: `<code>
        let endpoint = '/ajax_receive';
        let method = 'POST';
        </code>` 
    });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<just_fn>endpoint</just_fn>: The URL where the request is sent (<just_fn>/ajax_receive</just_fn>).                                                                                          " });
    li(centeredBlock, { innerHTML: "<just_fn>method</just_fn>: The HTTP request method, defaulting to <strong>POST</strong>.                                                                                     " });
       
    // Sending an AJAX Request
    h3(centeredBlock, { innerHTML: "Sending an AJAX Request" });
    p(centeredBlock, { innerHTML: "The function uses jQuery’s <just_fn>$.ajax()</just_fn> method to send the request:" });
    pre(centeredBlock, { innerHTML: `<code>
        $.ajax({
        type: method || "POST",
        url: endpoint,
        data: data instanceof FormData ? data : JSON.stringify(data),
        contentType: data instanceof FormData ? false : "application/json",
        processData: !(data instanceof FormData),
        dataType: "json",
        </code>` 
    });
       
    // Understanding AJAX Options
    h4(centeredBlock, { innerHTML: "Understanding the AJAX Options" });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<just_fn>type: method || \"POST\"</just_fn> → Specifies the request type (default is <strong>POST</strong>).                                                                                " });
    li(centeredBlock, { innerHTML: "<just_fn>url: endpoint</just_fn> → Defines the target URL for the request.                                                                                                          " });
    li(centeredBlock, { innerHTML: "<just_fn>data: data instanceof FormData ? data : JSON.stringify(data)</just_fn> → If <just_fn>data</just_fn> is a file, it is sent as-is. If JSON, it is stringified.                                                    " });
    li(centeredBlock, { innerHTML: "<just_fn>contentType: data instanceof FormData ? false : \"application/json\"</just_fn> → Sets content type appropriately for files or JSON.                                                    " });
    li(centeredBlock, { innerHTML: "<just_fn>processData: !(data instanceof FormData)</just_fn> → Ensures files are not processed incorrectly.                                                    " });
    li(centeredBlock, { innerHTML: "<just_fn>dataType: \"json\"</just_fn> → Expects the response in JSON format.                                                                                     " });
       
    // Handling Success Responses
    h3(centeredBlock, { innerHTML: "Handling Success Responses" });
    p(centeredBlock, { innerHTML: "If the request is successful, the function processes the response:" });
    pre(centeredBlock, { innerHTML: `<code>
        success: function(response) {
        callback(response);
        ajax_handle(responseType, response);
        }
        </code>` 
    });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<just_fn>callback(response)</just_fn> → Calls the optional function provided by the user to process the response.                                                    " });
    li(centeredBlock, { innerHTML: "<just_fn>ajax_handle(responseType, response)</just_fn> → Sends the response to the <just_fn>ajax_handle()</just_fn> function for further processing.                                                    " });
       
    // Handling Errors
    h3(centeredBlock, { innerHTML: "Handling Errors" });
    p(centeredBlock, { innerHTML: "If the request fails, the function logs the error and returns a failure message:" });
    pre(centeredBlock, { innerHTML: `<code>
        error: function(xhr, status, error) {
        console.error("AJAX Error:", status, error);
        callback({ success: false, error: "Request failed: " + error });
        }
        </code>` 
    });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "<just_fn>console.error()</just_fn> → Logs the error details in the browser console.                                                                                         " });
    li(centeredBlock, { innerHTML: "<just_fn>callback({ success: false, error: \"Request failed: \" + error })</just_fn> → Calls the callback function with an error message.                                                    " });


    h3(centeredBlock, { innerHTML: "Example Use Cases" });
        
    // Sending JSON Data
    h4(centeredBlock, { innerHTML: "1. Sending JSON Data" });
    pre(centeredBlock, { innerHTML: `<code>
        let formData = { username: "JohnDoe", email: "john@example.com" };
        ajax_request(formData, "json", function(response) {
        console.log("Server Response:", response);
        });
        </code>` 
    });
    p(centeredBlock, { innerHTML: "<strong>What Happens?</strong>" });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "The data is sent as a JSON object." });
    li(centeredBlock, { innerHTML: "The callback function logs the server's response." });
       
    // Uploading a File
    h4(centeredBlock, { innerHTML: "2. Uploading a File" });
    pre(centeredBlock, { innerHTML: `<code>
        let formData = new FormData();
        formData.append("profilePic", document.getElementById("profilePic").files[0]);

        ajax_request(formData, "json", function(response) {
        console.log("File Upload Response:", response);
        });
        </code>` 
    });
    p(centeredBlock, { innerHTML: "<strong>What Happens?</strong>" });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "The function detects <strong>FormData</strong> and sets 'processData' to 'false'." });
    li(centeredBlock, { innerHTML: "The file is sent to the backend." });
       
    // Conclusion
    h3(centeredBlock, { innerHTML: "Conclusion" });
    p(centeredBlock, { innerHTML: "The <just_fn>ajax_request()</just_fn> function is an essential utility in Summit.js, allowing:" });
    ul(centeredBlock, {});
    li(centeredBlock, { innerHTML: "Sending JSON data." });
    li(centeredBlock, { innerHTML: "Uploading single or multiple files." });
    li(centeredBlock, { innerHTML: "Handling both <strong>success</strong> and <strong>error</strong> responses." });
    p(centeredBlock, { innerHTML: "By dynamically detecting the data type, it ensures efficient communication between the frontend and backend." });
      
    hr(centeredBlock, { innerHTML: "" });  // <-- HR inserted
    // Helper Functions for Creating HTML Elements
    h2(centeredBlock, { id: "helper_functions", innerHTML: "6. Helper Functions for Creating HTML Elements" });
   

    p(centeredBlock, { innerHTML: "Summit.js provides a set of helper functions to dynamically create and append various HTML elements to a parent container." });
        
    // Function Overview
    h3(centeredBlock, { innerHTML: "Function Overview" });
    p(centeredBlock, { innerHTML: "Each function wraps around the 'createAndAppendElement' method to streamline element creation." });
        
    // Creating Basic Elements
    h4(centeredBlock, { innerHTML: "Creating Basic Elements" });
    pre(centeredBlock, { innerHTML: `<code>
        function h1(parent, attributes = {}) {
            return createAndAppendElement('h1', attributes, parent);
        }

        function p(parent, attributes = {}) {
            return createAndAppendElement('p', attributes, parent);
        }

        function div(parent, attributes = {}) {
            return createAndAppendElement('div', attributes, parent);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "These functions allow easy creation of common elements such as headings, paragraphs, and divs." });
        
    // Creating Lists
    h4(centeredBlock, { innerHTML: "Creating Lists" });
    pre(centeredBlock, { innerHTML: `<code>
        function ul(parent, attributes = {}) {
            return createAndAppendElement('ul', attributes, parent);
        }

        function ol(parent, attributes = {}) {
            return createAndAppendElement('ol', attributes, parent);
        }

        function li(parent, attributes = {}) {
            return createAndAppendElement('li', attributes, parent);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "Use these to dynamically generate lists within a parent container." });
        
    // Creating Forms and Inputs
    h4(centeredBlock, { innerHTML: "Creating Forms and Inputs" });
    pre(centeredBlock, { innerHTML: `<code>
        function form(parent, attributes = {}) {
            return createAndAppendElement('form', attributes, parent);
        }

        function input(parent, attributes = {}) {
            return createAndAppendElement('input', attributes, parent);
        }

        function button(parent, attributes = {}) {
            return createAndAppendElement('button', attributes, parent);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "These functions allow easy form and input creation, making it simple to build interactive elements." });
        
    // Creating Tables
    h4(centeredBlock, { innerHTML: "Creating Tables" });
    pre(centeredBlock, { innerHTML: `<code>
        function table(parent, attributes = {}) {
            return createAndAppendElement('table', attributes, parent);
        }

        function tr(parent, attributes = {}) {
            return createAndAppendElement('tr', attributes, parent);
        }

        function td(parent, attributes = {}) {
            return createAndAppendElement('td', attributes, parent);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "Use these functions to dynamically generate tables with rows and columns." });
        
    // Creating Multimedia Elements
    h4(centeredBlock, { innerHTML: "Creating Multimedia Elements" });
    pre(centeredBlock, { innerHTML: `<code>
        function img(parent, attributes = {}) {
            return createAndAppendElement('img', attributes, parent);
        }

        function video(parent, attributes = {}) {
            return createAndAppendElement('video', attributes, parent);
        }

        function audio(parent, attributes = {}) {
            return createAndAppendElement('audio', attributes, parent);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "These functions allow for easy media embedding." });
        
    // Creating Semantic HTML Elements
    h4(centeredBlock, { innerHTML: "Creating Semantic HTML Elements" });
    pre(centeredBlock, { innerHTML: `<code>
        function nav(parent, attributes = {}) {
            return createAndAppendElement('nav', attributes, parent);
        }

        function header(parent, attributes = {}) {
            return createAndAppendElement('header', attributes, parent);
        }

        function footer(parent, attributes = {}) {
            return createAndAppendElement('footer', attributes, parent);
        }
        </code>` 
    });
    p(centeredBlock, { innerHTML: "Use these functions to improve document structure with semantic HTML elements." });
        
    // Conclusion
    h3(centeredBlock, { innerHTML: "Conclusion" });
    p(centeredBlock, { innerHTML: "Summit.js provides a robust set of helper functions that make it easy to dynamically create and append HTML elements, improving development efficiency." });

    highlightAllSnippets();
    buildFooter();
}


function loadLoginPage(titleContent, metaContent) {

    // Clear page and set meta
    startOffAPage(titleContent, metaContent);

    const centeredBlock = document.getElementById('centered_block');

    // Main Wrapper
    const wrapper = div(centeredBlock, { class: "landing-wrapper" });

    buildNavBar('main');

    h1(wrapper, {innerHTML: "Summit Login"});

    login_box101(wrapper);

    p(wrapper, {class: 'warning', innerHTML: "Use test@test.com and password to log in. CHANGE THIS!"})

    buildFooter();
    
};

function loadDashboardPage(titleContent, metaContent) {

    // Clear page and set meta
    startOffAPage(titleContent, metaContent);

    const centeredBlock = document.getElementById('centered_block');

    // Main Wrapper
    const wrapper = div(centeredBlock, { class: "landing-wrapper" });

    buildNavBar('dashboard');

    h1(wrapper, {innerHTML: "Summit Dashboard"});

    var storedName = localStorage.getItem("fname");
    p(wrapper, {innerHTML: storedName});

    // Build the form without styling
    // Build the form
    simpleForm102(wrapper, [
        { type: "text", placeholder: "Name", class: "input-field", required: true},
        { type: "email", placeholder: "Email", class: "input-field", required: true},
        { type: "number", placeholder: "Age", class: "input-field", required: true },
        { type: "textarea", placeholder: "Enter your message", width: "280px", height: "150px", class: "textarea-field", required: true},
        { type: "select", options: { opt1: "Option 1", opt2: "Option 2", opt3: "Option 3" }, class: "dropdown", required: true},
        { type: "radio", name: "gender", title: "Gender", options: ["Male", "Female", "Other"], class: "radio-group", required: true},
        { type: "checkbox", name: "subscribe", title: "Preferences", options: ["Subscribe to newsletter", "Accept Terms"], class: "checkbox-group", required: true},
        { type: "submit", innerHTML: "Submit", onclick: "submitSimpleForm102()"}
    ], "#ccc", "#ccc", "#007bff", "#0056b3");

    // AJAX PRACTICE

    // Simple Post (GET)
    let { data, responseType } = ajax_package([], 'simple_post', 'ping');
    ajax_request(data, responseType);


    // JSON Only
    //h1(centeredBlock, { innerHTML: "Test: JSON Data Only" });
    //input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    //input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    //button(centeredBlock, { innerHTML: "Submit JSON", onclick: "testJsonOnly()" });


    // Single File
    //h1(centeredBlock, { innerHTML: "Test: Single File Upload" });
    //createFileInput(centeredBlock, "singleFile", ".png,.jpeg", 'single_file', 'firstFile');

    // Single File + JSON
    //h1(centeredBlock, { innerHTML: "Test: Single File + JSON" });
    //input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    //input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    //createFileInput(centeredBlock, "singleFileWithJson", ".png,.jpeg", 'single_file_and_json', 'testing_single_file_with_json', ['username', 'email']);
    
    // Folder Upload
    //h1(centeredBlock, { innerHTML: "Test: Multiple File Upload" });
    // parent element, id, allowedTypes, backend_flag, job
    //createFileInput(centeredBlock, "multiFiles", ".png,.jpeg", 'folder_submission', 'firstFolder');
    
    // Multi File + JSON
    //h1(centeredBlock, { innerHTML: "Test: Multiple Files + JSON" });
    //input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    //input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    //createFileInput(centeredBlock, "multiFilesWithJson", ".png,.jpeg", 'folder_and_json', 'testing_folder_with_json', ['username', 'email']);

    buildFooter();
    
};
