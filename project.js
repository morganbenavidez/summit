

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
        case 'success':
            titleContent = "Success";
            metaContent = "Success";
            loadSuccessPage(titleContent, metaContent);
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

    const text_container = div(centeredBlock, {id: "text-container"});
    h1(text_container, {innerHTML: "Welcome to base camp. Let's get you to the Summit!"});
    a(text_container, {href: "javascript:navigate('documentation')", innerHTML: "Documentation"});

};

function loadDocumentationPage(titleContent, metaContent) {

    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(centeredBlock, titleContent, metaContent);

    h1(centeredBlock, {innerHTML: "Summit Documentation"});
    
};


function loadSuccessPage(titleContent, metaContent) {
    const centeredBlock = document.getElementById('centered_block');

    startOffAPage(centeredBlock, titleContent, metaContent);

    h1(centeredBlock, {innerHTML: "Success"});
}
