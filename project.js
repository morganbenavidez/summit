

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


// $$$$$ Add new cases, titleContents, metaContents, and load functions for each page you create   $$$$$$$$

// Define your Titles and Meta Content Here
function loadPage(page) {

    let titleContent = '';
    let metaContent = '';

    switch (page) {

        case 'home':
            titleContent = 'Summit Framework';
            metaContent = 'A framework built to get you from base camp to the summit quickly!';
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

    
    // Single File
    h1(centeredBlock, { innerHTML: "Test: Single File Upload" });
    createFileInput(centeredBlock, "singleFile", [".png", ".jpeg"], 'single');
    button(centeredBlock, { innerHTML: "Upload", onclick: "testSingleFileUpload()" });
    
    
    // Multi Family
    h1(centeredBlock, { innerHTML: "Test: Multiple File Upload" });
    createFileInput(centeredBlock, "multiFiles", [".png", ".jpeg", ".pdf"], 'multiple');
    button(centeredBlock, { innerHTML: "Upload", onclick: "testMultiFileUpload()" });

    
    // JSON Only
    h1(centeredBlock, { innerHTML: "Test: JSON Data Only" });
    input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    button(centeredBlock, { innerHTML: "Submit JSON", onclick: "testJsonOnly()" });

    /*
    // Single File + JSON
    h1(centeredBlock, { innerHTML: "Test: Single File + JSON" });
    input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    createFileInput(centeredBlock, "singleFileWithJson", ["image/png", "image/jpeg"], false);
    button(centeredBlock, { innerHTML: "Upload & Submit JSON", onclick: "testSingleFileWithJson()" });

    // Multi File + JSON
    h1(centeredBlock, { innerHTML: "Test: Multiple Files + JSON" });
    input(centeredBlock, { id: "username", type: "text", placeholder: "Enter Username" });
    input(centeredBlock, { id: "email", type: "email", placeholder: "Enter Email" });
    createFileInput(centeredBlock, "multiFilesWithJson", ["image/png", "image/jpeg", "application/pdf"], true);
    button(centeredBlock, { innerHTML: "Upload & Submit JSON", onclick: "testMultiFileWithJson()" });
    */

    /*
    img(document.getElementById('centered_block'), { id: "summit_image", src: "/static/images/summit.png" });

    const text_container = div(centeredBlock, {id: "text-container"});
    h1(text_container, {innerHTML: "Welcome to base camp. Let's get you to the Summit!"});
    a(text_container, {href: "javascript:navigate('documentation')", innerHTML: "Documentation"});
    const text_container2 = div(centeredBlock, {id: "text-container2"});
    a(text_container2, {href: "javascript:navigate('login')", innerHTML: "Login"});
    */


};

function testSingleFileUpload() {
    let formElements = ["singleFile"];
    let { data, responseType } = package_data_for_ajax(formElements);
    ajax_request("/ajax_receive", "POST", data, responseType);
}

function testMultiFileUpload() {
    let formElements = ["multiFiles"];
    let { data, responseType } = package_data_for_ajax(formElements);
    ajax_request("/ajax_receive", "POST", data, responseType);
}

function testJsonOnly() {
    let formElements = ["username", "email"];
    let { data, responseType } = package_data_for_ajax(formElements);
    ajax_request("/ajax_receive", "POST", data, responseType);
}

function testSingleFileWithJson() {
    let formElements = ["username", "email", "singleFileWithJson"];
    let { data, responseType } = package_data_for_ajax(formElements);
    ajax_request("/ajax_receive", "POST", data, responseType);
}

function testMultiFileWithJson() {
    let formElements = ["username", "email", "multiFilesWithJson"];
    let { data, responseType } = package_data_for_ajax(formElements);
    ajax_request("/ajax_receive", "POST", data, responseType);
}


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
    
};
// Add functions to load pages here




function handleAjaxResponse(status, response) {
    if (status === 'login_success') {
        if (response.message) {
            console.log("Login Successful:", response.message);
            localStorage.setItem("fname", response.name);
            navigate('dashboard');
        } else {
            console.log("Unexpected success response:", response);
        }
    } else if (status === 'login_failed') {
        if (response.error) {
            console.error("Login Failed:", response.error);
            // Optionally, you can clear the password field for security
            document.getElementById('password101').value = "";
        } else {
            console.error("Unexpected error response:", response);
        }
    } else {
        console.error("Unknown status:", status);
    }
}
