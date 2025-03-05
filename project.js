

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
}


// Ensures pages are always loaded at the top
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
        window.scrollTo(0, 0);
    } else {
        window.scrollTo(0, 0);
    }
};


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


// Home
function loadHomePage(titleContent, metaContent) {

    // centered_block is where you will append all your HTML
    // Your page is built inside of it.
    const centeredBlock = document.getElementById('centered_block');

    // This function will:
    // clear centered_block 
    // clear head elements that do not contain data-static="true" 
    // set new title and meta content
    startOffAPage(centeredBlock, titleContent, metaContent);


    img(document.getElementById('centered_block'), { id: "summit_image", src: "/static/images/summit.png" });
    const text_container = div(centeredBlock, {id: "text_container"});

    h1(text_container, {innerHTML: "Welcome to base camp. Let's get you to the Summit!"});
    a(text_container, {href: "javascript:navigate('documentation')", innerHTML: "Documentation"});
    const text_container2 = div(centeredBlock, {id: "text-container2"});
    a(text_container2, {href: "javascript:navigate('login')", innerHTML: "Login"});
    

};


function loadDocumentationPage(titleContent, metaContent) {

    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(centeredBlock, titleContent, metaContent);

    h1(centeredBlock, {innerHTML: "Summit Documentation"});
    
};


function loadLoginPage(titleContent, metaContent) {

    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(centeredBlock, titleContent, metaContent);

    h1(centeredBlock, {innerHTML: "Summit Login"});

    login_box101(centeredBlock);
    
};

function loadDashboardPage(titleContent, metaContent) {

    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(centeredBlock, titleContent, metaContent);

    h1(centeredBlock, {innerHTML: "Summit Dashboard"});

    var storedName = localStorage.getItem("fname");
    p(centeredBlock, {innerHTML: storedName});


    
    // Build the form without styling
    // Build the form
    simpleForm102(centeredBlock, [
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

    
};




// Add functions to load pages here
















