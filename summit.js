





// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ YOUR FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



function createToolButtons(container) {
    var tools = [
        { name: "Create Container", action: "containerize" },
        { name: "Upload Network Blueprint", action: 'network_blueprint'},
        { name: "Deploy Bash Scripts Across Multiple Machines", action: 'deploy_bash_scripts'},
        { name: "Add Used Port", action: "add_port" },
        { name: "Reports", action: "reports" },
        { name: "User Management", action: "user_management" },
        { name: "Settings", action: "settings" },
        { name: "Support", action: "support" }
    ];

    tools.forEach(function(tool) {
        var button = document.createElement("a");
        button.innerHTML = tool.name;
        button.href = `javascript:navigate('${tool.action}')`;
        button.classList.add("tool-button"); // Optional for styling
        container.appendChild(button);
    });
}




// $$$$$ GLOBAL VARIABLES

// Create an object to store selected files globally
const fileSelections = {};
// Validate email format using regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ CUSTOMIZABLE FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


function ajax_validate(data, job, mode) {

    if (mode === 'single_file') {

    } else if (mode === 'folder_submission') {

    } else if (mode === 'json_only') {
        if (job === 'json_1') {
            let email = data["email"];
    
            if (!emailPattern.test(email)) {
                alert("Invalid email format. Please enter a valid email.");
                return;
            }
        }
    } else if (mode === 'single_file_and_json') {
        // Add Validation
        if (job === 'sfj') {
            let email = data.get("email");

            if (!emailPattern.test(email)) {
                alert("Invalid email format. Please enter a valid email.");
                return;
            }
        }
    } else if (mode === 'folder_and_json') {
        // Add Validation
        if (job === 'fwj') {
            let email = data.get("email");

            if (!emailPattern.test(email)) {
                alert("Invalid email format. Please enter a valid email.");
                return;
            }
        }
    }
    
}


// Handle responses from ajax calls here
function ajax_handle(responseType, response) {
    if (responseType === "json") {
        // Check if response is an array and extract the first object
        if (Array.isArray(response)) {
            response = response[0];
        }

        if (!response.job) {
            console.warn("No job specified in response:", response);
            return;
        }

        switch (response.job) {
            case 'login101':
                if (response.success) {
                    console.log("Login Successful:", response.message);
                    localStorage.setItem("fname", response.name);
                    navigate('dashboard');
                } else if (response.error) {
                    alert("Error: " + response.error);
                }
                break;

            case 'login_failed':
                let passwordInput = document.getElementById('password101');
                if (passwordInput) passwordInput.value = "";
                console.error("Login Failed:", response.error);
                break;
            
            case 'unique_clusters':
                let selectElement = document.getElementById("cluster_select");
                let options = response.clusters;
                selectElement.innerHTML = "";  // Clear existing options
                let defaultOption = document.createElement("option");
                defaultOption.textContent = "Select Cluster";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectElement.appendChild(defaultOption);

                options.forEach(option => {
                    let opt = document.createElement("option");
                    opt.value = option;
                    opt.textContent = option;
                    selectElement.appendChild(opt);
                });
                break;
            
            case 'deploy_bash':
                console.log('Bash script deployed...');
                break;

            // ADD MORE CASES TO HANDLE HERE

            default:
                console.warn("Unhandled job type:", response.job);
                break;
        }
    } else {
        console.log("Unexpected response type:", response);
    }
}




// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $$$$$ PRE-BUILT FUNCTIONS   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




// Package your ajax calls with this
function ajax_package(formElements, mode, job) {
    console.log('job: ', job);
    if (mode === 'single_file') {
        let formData = new FormData();
        formData.append("backend_flag", 'single_file');
        formData.append("job", job);
        formElements.forEach(id => {
            let input = document.getElementById(id);
            if (input && input.files.length > 0) {
                formData.append(id, input.files[0]);
            }
        });
        
        // Add Validation
        ajax_validate(formData, job, mode);

        return { data: formData, responseType: "json" };
    } else if (mode === 'folder_submission') {
        var inputId = formElements[0];
        let formData = new FormData();
        formData.append("backend_flag", 'multiple_files');
        formData.append("job", job);
       
        fileSelections[inputId].forEach(file => {
            formData.append("multiFiles", file, file.webkitRelativePath);
        });

        // Add Validation
        ajax_validate(formData, job, mode);

        return { data: formData, responseType: "json" };
    } else if (mode === 'json_only') {
        
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
        
    } else if (mode === 'single_file_and_json') {

        let formData = new FormData();
        formData.append("backend_flag", 'single_file_and_json');
        formData.append("job", job);

        formElements.forEach(id => {
            console.log('id: ', id);
            let input = document.getElementById(id);
            if (!input) return;

            if (input.type === "file" && input.files.length > 0) {
                formData.append(id, input.files[0]);
            } else if (input.tagName === "SELECT") {
                console.log('select');
                console.log(input.value);
                formData.append(id, input.value);
            } else {
                formData.append(id, input.value.trim());
            }
        });

        console.log("FORM DATA");
        console.log(formData);
        // Add Validation
        ajax_validate(formData, job, mode);

        return { data: formData, responseType: "json" };

    } else if (mode === 'folder_and_json') {
        var inputId = formElements[0];
        let formData = new FormData();
        formData.append("backend_flag", 'folder_and_json');
        formData.append("job", job);

        
        formElements.forEach(id => {
            let input = document.getElementById(id);
            if (!input) return;

            if (input.type !== "file" && input.tagName !== "SELECT") {
                formData.append(id, input.value.trim());
            } else if (input.type !== "file" && input.tagName === "SELECT") {
                formData.append(id, input.value);
            }
        });

        
        fileSelections[inputId].forEach(file => {
            formData.append("multiFiles", file, file.webkitRelativePath);
        });

        // Add Validation
        ajax_validate(formData, job, mode);

        return { data: formData, responseType: "json" };
    }
}



// All ajax requests are made through this function
function ajax_request(endpoint, method, data, responseType, callback = () => {}) {

    $.ajax({
        type: method || "POST",
        url: endpoint,
        data: data instanceof FormData ? data : JSON.stringify(data),
        contentType: data instanceof FormData ? false : "application/json",
        processData: !(data instanceof FormData),
        dataType: "json",
        success: function(response) {
            console.log('responseType: ', responseType);
            console.log('response: ', response);
            callback(response);
            ajax_handle(responseType, response);
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
            callback({ success: false, error: "Request failed: " + error });
        }
    });
}



// Creates any element of your choice

function createAndAppendElement(type, attributes, parentElement) {

    const element = document.createElement(type);

    for (const key in attributes) {

        if (key === 'innerHTML') {

            element.innerHTML = attributes[key];

        } else if (key === 'dataSiteKey') {

            element.setAttribute('data-sitekey', attributes[key]);

        } else {
            
            element.setAttribute(key, attributes[key]);

        }

    }

    parentElement.appendChild(element);

    return element;

}



// Function to append html elements stored as a string to a specified parent element
function appendHtmlToParent(htmlString, parentElement) {
    // Check if the parent exists in the DOM
    if (parentElement) {
        // Insert the HTML string as the last child of the parent element
        parentElement.insertAdjacentHTML('beforeend', htmlString);
    } else {
        // Log an error if the parent does not exist
        console.error('The parent element does not exist.');
    }    
}

// Sets the entire centered_block to an empty string
function clearCenteredBlock(component) {
    if (component) {
        component.innerHTML = ''
    }
}

function clearDynamicHeadElements() {

    const elements = document.head.querySelectorAll('*');
    elements.forEach(element => {
        // Check if the element has the data-static attribute set to true
        if (element.dataset && element.dataset.static !== "true") {
            document.head.removeChild(element);
        }
    });
}


function titleAndMeta(headBlock, titleContent, metaContent) {

    // Head data

    createAndAppendElement('title', {

        innerHTML: titleContent,
        id: 'titleElement'

    }, headBlock);

    createAndAppendElement('meta', {

        name: 'description',
        id: 'metaElementMain',
        content: metaContent

    }, headBlock);

    return headBlock

}

function startOffAPage(centeredBlock, titleContent, metaContent) {

    clearCenteredBlock(centeredBlock);
    
    // Clear head except for data-static = 'true'
    clearDynamicHeadElements();

    let headBlock = document.getElementById('index_head');

    // Adds title and meta to head
    titleAndMeta(headBlock, titleContent, metaContent);

}



// $$$$$$$$$$$$$$$$$$$$  SIMPLE ELEMENTS         $$$$$$$$$$$$$$$$$$$$$$$$$



// Helper functions to avoid repetition
function row(container, attributes = {}) {
    attributes.class = `row ${attributes.class || ''}`;
    return createAndAppendElement('div', attributes, container);
}

function col(parent, attributes = {}) {
    attributes.class = `col ${attributes.class || ''}`;
    return createAndAppendElement('div', attributes, parent);
}

function h1(parent, attributes = {}) {
    return createAndAppendElement('h1', attributes, parent)
}

function h2(parent, attributes = {}) {
    return createAndAppendElement('h2', attributes, parent)
}

function h3(parent, attributes = {}) {
    return createAndAppendElement('h3', attributes, parent)
}

function h4(parent, attributes = {}) {
    return createAndAppendElement('h4', attributes, parent)
}

function h5(parent, attributes = {}) {
    return createAndAppendElement('h5', attributes, parent)
}

function h6(parent, attributes = {}) {
    return createAndAppendElement('h6', attributes, parent)
}

function a(parent, attributes = {}) {
    return createAndAppendElement('a', attributes, parent)
}

function section(parent, attributes = {}) {
    return createAndAppendElement('section', attributes, parent)
}

function img(parent, attributes = {}) {
    return createAndAppendElement('img', attributes, parent);
}

function p(parent, attributes = {}) {
    return createAndAppendElement('p', attributes, parent);
}

function form(parent, attributes = {}) {
    return createAndAppendElement('form', attributes, parent);
}

function div(parent, attributes = {}) {
    return createAndAppendElement('div', attributes, parent);
}

function input(parent, attributes = {}) {
    return createAndAppendElement('input', attributes, parent);
}

function label(parent, attributes = {}) {
    return createAndAppendElement('label', attributes, parent);
}

function canvas(parent, attributes = {}) {
    return createAndAppendElement('canvas', attributes, parent);
}

function button(parent, attributes = {}) {
    return createAndAppendElement('button', attributes, parent);
}

function audio(parent, attributes = {}) {
    return createAndAppendElement('audio', attributes, parent)
}

function source(parent, attributes = {}) {
    return createAndAppendElement('source', attributes, parent)
}

function ul(parent, attributes = {}) {
    return createAndAppendElement('ul', attributes, parent);
}

function ol(parent, attributes = {}) {
    return createAndAppendElement('ol', attributes, parent);
}

function li(parent, attributes = {}) {
    return createAndAppendElement('li', attributes, parent);
}

function table(parent, attributes = {}) {
    return createAndAppendElement('table', attributes, parent);
}

function tr(parent, attributes = {}) {
    return createAndAppendElement('tr', attributes, parent);
}

function td(parent, attributes = {}) {
    return createAndAppendElement('td', attributes, parent);
}

function th(parent, attributes = {}) {
    return createAndAppendElement('th', attributes, parent);
}

function tbody(parent, attributes = {}) {
    return createAndAppendElement('tbody', attributes, parent);
}

function thead(parent, attributes = {}) {
    return createAndAppendElement('thead', attributes, parent);
}

function tfoot(parent, attributes = {}) {
    return createAndAppendElement('tfoot', attributes, parent);
}

function span(parent, attributes = {}) {
    return createAndAppendElement('span', attributes, parent);
}

function nav(parent, attributes = {}) {
    return createAndAppendElement('nav', attributes, parent);
}

function header(parent, attributes = {}) {
    return createAndAppendElement('header', attributes, parent);
}

function footer(parent, attributes = {}) {
    return createAndAppendElement('footer', attributes, parent);
}

function article(parent, attributes = {}) {
    return createAndAppendElement('article', attributes, parent);
}

function aside(parent, attributes = {}) {
    return createAndAppendElement('aside', attributes, parent);
}

function iframe(parent, attributes = {}) {
    return createAndAppendElement('iframe', attributes, parent);
}

function video(parent, attributes = {}) {
    return createAndAppendElement('video', attributes, parent);
}

function svg(parent, attributes = {}) {
    return createAndAppendElement('svg', attributes, parent);
}

function path(parent, attributes = {}) {
    return createAndAppendElement('path', attributes, parent);
}

function textarea(parent, attributes = {}) {
    return createAndAppendElement('textarea', attributes, parent);
}

function select(parent, attributes = {}) {
    return createAndAppendElement('select', attributes, parent);
}

function option(parent, attributes = {}) {
    return createAndAppendElement('option', attributes, parent);
}

function strong(parent, attributes = {}) {
    return createAndAppendElement('strong', attributes, parent);
}

function em(parent, attributes = {}) {
    return createAndAppendElement('em', attributes, parent);
}

function br(parent) {
    return createAndAppendElement('br', {}, parent);
}

function hr(parent, attributes = {}) {
    return createAndAppendElement('hr', attributes, parent);
}

function map(parent, attributes = {}) {
    return createAndAppendElement('map', attributes, parent);
}

function area(parent, attributes = {}) {
    return createAndAppendElement('area', attributes, parent);
}

function link(parent, attributes = {}) {
    return createAndAppendElement('link', attributes, parent);
}

function meta(parent, attributes = {}) {
    return createAndAppendElement('meta', attributes, parent);
}

function title(parent, attributes = {}) {
    return createAndAppendElement('title', attributes, parent);
}

function style(parent, attributes = {}) {
    return createAndAppendElement('style', attributes, parent);
}

function base(parent, attributes = {}) {
    return createAndAppendElement('base', attributes, parent);
}

function head(parent, attributes = {}) {
    return createAndAppendElement('head', attributes, parent);
}

function body(parent, attributes = {}) {
    return createAndAppendElement('body', attributes, parent);
}

function main(parent, attributes = {}) {
    return createAndAppendElement('main', attributes, parent);
}

function b(parent, attributes = {}) {
    return createAndAppendElement('b', attributes, parent);
}

function i(parent, attributes = {}) {
    return createAndAppendElement('i', attributes, parent);
}

function small(parent, attributes = {}) {
    return createAndAppendElement('small', attributes, parent);
}

function cite(parent, attributes = {}) {
    return createAndAppendElement('cite', attributes, parent);
}

function q(parent, attributes = {}) {
    return createAndAppendElement('q', attributes, parent);
}

function code(parent, attributes = {}) {
    return createAndAppendElement('code', attributes, parent);
}

function pre(parent, attributes = {}) {
    return createAndAppendElement('pre', attributes, parent);
}

function blockquote(parent, attributes = {}) {
    return createAndAppendElement('blockquote', attributes, parent);
}

function address(parent, attributes = {}) {
    return createAndAppendElement('address', attributes, parent);
}

function figure(parent, attributes = {}) {
    return createAndAppendElement('figure', attributes, parent);
}

function figcaption(parent, attributes = {}) {
    return createAndAppendElement('figcaption', attributes, parent);
}

function mark(parent, attributes = {}) {
    return createAndAppendElement('mark', attributes, parent);
}

function time(parent, attributes = {}) {
    return createAndAppendElement('time', attributes, parent);
}

function ins(parent, attributes = {}) {
    return createAndAppendElement('ins', attributes, parent);
}

function del(parent, attributes = {}) {
    return createAndAppendElement('del', attributes, parent);
}

function kbd(parent, attributes = {}) {
    return createAndAppendElement('kbd', attributes, parent);
}

function samp(parent, attributes = {}) {
    return createAndAppendElement('samp', attributes, parent);
}

function varElement(parent, attributes = {}) {
    return createAndAppendElement('var', attributes, parent);
}

function sup(parent, attributes = {}) {
    return createAndAppendElement('sup', attributes, parent);
}

function sub(parent, attributes = {}) {
    return createAndAppendElement('sub', attributes, parent);
}

function progress(parent, attributes = {}) {
    return createAndAppendElement('progress', attributes, parent);
}

function meter(parent, attributes = {}) {
    return createAndAppendElement('meter', attributes, parent);
}

function output(parent, attributes = {}) {
    return createAndAppendElement('output', attributes, parent);
}

function details(parent, attributes = {}) {
    return createAndAppendElement('details', attributes, parent);
}

function summary(parent, attributes = {}) {
    return createAndAppendElement('summary', attributes, parent);
}

function datalist(parent, attributes = {}) {
    return createAndAppendElement('datalist', attributes, parent);
}

function fieldset(parent, attributes = {}) {
    return createAndAppendElement('fieldset', attributes, parent);
}

function legend(parent, attributes = {}) {
    return createAndAppendElement('legend', attributes, parent);
}



// $$$$$$$$$$$$$$$$$$$$  COOKIES        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

function getCookie(name) {
    let cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookiePair = cookieArray[i].split('=');
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return undefined;
}


// $$$$$$$$$$$$$$$$$$$$  SUPPORT FUNCTIONS         $$$$$$$$$$$$$$$$$$$$$$$$$



// Pass in milliseconds - like time.sleep in python but with milliseconds
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function replaceWhitespaceWithUnderscores(inputString) {
    return inputString.replace(/\s+/g, '_');
}


function removeBaseUrl(fullUrl, baseUrl) {
    // Remove the base URL from the full URL
    return fullUrl.replace(baseUrl, '');
}

function containsUppercase(str) {
    return /[A-Z]/.test(str);
}

function containsLowercase(str) {
    return /[a-z]/.test(str);
}

function containsNumbers(str) {
    return /\d/.test(str);
}

function containsSpecialCharacters(str) {
    return /[@$!%*?&)(,]/.test(str);
}

function containsWhiteSpace(str) {
    return str.includes(' ');
}







// $$$$$$$$$$$$$$$$$$$$  MORE COMPLEX ELEMENT STRUCTURES         $$$$$$$$$$$$$$$$$$$$$$$$$



function createRowsAndColumns(numRows, numCols, signifier, mainContainer) {

    for (let i = 1; i <= numRows; i++) {
        // Create row with a dynamic ID
        let row = createAndAppendElement('div', {
            class: 'row mb-3',
            id: `${signifier}Row${i}`
        }, mainContainer);

        // Retrieve the number of columns for the current row
        let columnsCount = numCols[i - 1];

        // Create the specified number of columns for this row
        for (let j = 1; j <= columnsCount; j++) {
            createAndAppendElement('div', {
                class: 'col',
                id: `${signifier}Row${i}Col${j}`
            }, row);
        }
    }
}


// Function to create and append a select element with options

function createSelectWithOptions(parentElement, attributes, options, firstOption, startingValue="", fonts="") {

    const select = createAndAppendElement('select', attributes, parentElement);

    createAndAppendElement('option', {
        value: startingValue,
        selected: true,
        innerHTML: firstOption
    }, select);
    
    let fontsToLoad = [];

    if (fonts === "fonts") {
        Object.keys(options).forEach(key => {
            createAndAppendElement('option', {
                value: key,
                innerHTML: options[key],
                style: `font-family: ${key};`
            }, select);
            // Add the font to the list of fonts to load
            fontsToLoad.push(key);
            
        })
    } else {
        Object.keys(options).forEach(key => {
            createAndAppendElement('option', {
                value: key,
                innerHTML: options[key]
            }, select);
        })
    }
    

    if (fonts === "fonts") {
        // Load the fonts using WebFont Loader
        WebFont.load({
            google: {
                families: fontsToLoad
            }
        });
    }
    

}


// Function to create and append checkboxes with labels

function createCheckboxesWithOptions(attributes, options, parentElement) {

    const container = document.createElement('div');

    options.forEach(option => {

        const checkbox = createAndAppendElement('input', {

            type: 'checkbox',

            id: option.id,

            name: attributes.name,

            class: attributes.class,

            value: option.value

        }, container);

        createAndAppendElement('label', {

            for: checkbox.id,

            innerHTML: option.label

        }, container);

    });

    parentElement.appendChild(container);

    return container;

}



// Function to create and append radio buttons with labels

function createRadioButtonsWithOptions(attributes, options, parentElement) {

    const container = document.createElement('div');

    options.forEach(option => {

        const radioButton = createAndAppendElement('input', {

            type: 'radio',

            id: option.id,

            name: attributes.name,

            class: attributes.class,

            value: option.value

        }, container);

        createAndAppendElement('label', {

            for: radioButton.id,

            innerHTML: option.label

        }, container);

    });

    parentElement.appendChild(container);

    return container;

}


function createFileInput(parent, id, allowedTypes, mode, job, formElements=false) {

    fileSelections[id] = [];

    if (mode === 'single_file') {

        var fileInput = input(parent, {
            type: "file",
            id: id,
            accept: allowedTypes
        });


        var fileListContainer = div(parent, { id: "fileList" });

        //let fileLabel = label(parent, {id: `${id}_label`, innerHTML: 'No file chosen'});

        fileInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, mode);
        });

        var submitBtn = button(parent, { innerHTML: "Submit", id: 'fileSubmitButton'});

        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package([id], 'single_file', job);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });



    } else if (mode === 'folder_submission') {

        var folderInput = input(parent, {
            type: "file",
            id: id,
            multiple: true,
            webkitdirectory: "true",
            accept: allowedTypes
        });

        // File List Display
        var fileListContainer = div(parent, { id: "fileList" });

        folderInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, mode);
        });

        var submitBtn = button(parent, { innerHTML: "Submit", id: 'folderSubmitButton' });

        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package([id], 'folder_submission', job);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });

    } else if (mode === 'single_file_and_json') {
        var fileInput = input(parent, {
            type: "file",
            id: id,
            accept: allowedTypes
        });
        console.log('here');
        // File List Display
        var fileListContainer = div(parent, { id: "fileList" });

        //let fileLabel = label(parent, {id: `${id}_label`, innerHTML: 'No file chosen'});

        fileInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, 'single_file');
        });

        var submitBtn = button(parent, { innerHTML: "Submit", id: 'fileSubmitButton'});

        this_list_of_elements = [id];

        // Iterate over formElements and add them to the list
        if (formElements) {
            formElements.forEach(el => {
                console.log('el: ', el);
                this_list_of_elements.push(el);
            });
        }

        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package(this_list_of_elements, 'single_file_and_json', job);
            console.log("DATA");
            console.log(data);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });
    } else if (mode === 'folder_and_json') {
        var folderInput = input(parent, {
            type: "file",
            id: id,
            multiple: true,
            webkitdirectory: "true",
            accept: allowedTypes
        });

        // File List Display
        var fileListContainer = div(parent, { id: "fileList" });

        folderInput.addEventListener("change", (event) => {
            handleFileSelection(event, id, fileListContainer, allowedTypes, 'folder_submission');
        });

        var submitBtn = button(parent, { innerHTML: "Submit", id: 'folderSubmitButton' });

        this_list_of_elements = [id];

        // Iterate over formElements and add them to the list
        if (formElements) {
            formElements.forEach(el => {
                this_list_of_elements.push(el);
            });
        }

        submitBtn.addEventListener("click", function() {
            if (fileSelections[id].length === 0) {
                alert("No files selected.");
                return;
            }
            let { data, responseType } = ajax_package(this_list_of_elements, 'folder_and_json', job);
            ajax_request("/ajax_receive", "POST", data, responseType);
        });
    }
    
}


function handleFileSelection(event, inputId, fileListContainer, allowedTypes, mode) {

    if (mode === 'single_file') {
        let thisInput = document.getElementById(inputId);
        if (thisInput.files.length !== 1) {
            alert("Only one file can be uploaded at a time.");
            thisInput.value = ""; 
            fileListContainer.innerHTML = "<li>No file chosen</li>";
            fileSelections[inputId] = [];
            return;
        }

        let file = thisInput.files[0];
        let fileType = `.${file.name.split(".").pop().toLowerCase()}`;

        if (!allowedTypes.includes(fileType)) {
            alert("Invalid file type.");
            thisInput.value = "";
            fileListContainer.innerHTML = "<li>No file chosen</li>";
            fileSelections[inputId] = [];
            return;
        }

        fileSelections[inputId] = [file];
        fileListContainer.innerHTML = `<li>${file.name}</li>`;

    } else if (mode === 'folder_submission'){

        let files = Array.from(event.target.files);
        if (files.length === 0) {
            fileListContainer.innerHTML = "<li>No files selected.</li>";
            return;
        }

        let invalidFiles = [];
        let validFiles = [];

        files.forEach(file => {
            let fileType = `.${file.name.split('.').pop().toLowerCase()}`;

            if (!allowedTypes.includes(fileType)) {
                invalidFiles.push(file.name);
            } else {
                validFiles.push(file);
            }
        });

        if (invalidFiles.length > 0) {
            alert(`Invalid file(s) detected:\n${invalidFiles.join("\n")}\n\nPlease select only allowed file types.`);
            event.target.value = "";
            fileListContainer.innerHTML = "<li>No files selected.</li>";
            fileSelections[inputId] = [];
            return;
        }

        
        fileSelections[inputId] = validFiles;
        fileListContainer.innerHTML = "";

        validFiles.forEach(file => {
            let listItem = document.createElement("li");
            listItem.textContent = file.webkitRelativePath || file.name;
            fileListContainer.appendChild(listItem);
        });
    } 
    
}


// $$$$$$$$$$$$$$$$$$  IMAGE CAROUSELS AND CONTAINERS   $$$$$$$$$$$$$$$$$$$$$$$$$$





// Function to create and append an image carousel
function createImageCarousel(attributes, images, parentElement, interval) {

    const outerCarouselDiv = createAndAppendElementCarousel('div', {
        id: 'outerCarouselDiv'
    }, parentElement);

    // Create the carousel container
    const carousel = createAndAppendElementCarousel('div', {
        class: 'carousel slide',
        id: attributes.id,
        'data-ride': 'carousel',
        'data-interval': interval
    }, outerCarouselDiv);

    const deleteCarouselImageDiv = createAndAppendElementCarousel('div', {
        id: 'deleteCarouselImageDiv'
    }, outerCarouselDiv);


    // Add controls (previous and next)
    const prevControl = createAndAppendElementCarousel('a', {
        class: 'carousel-control-prev',
        href: 'javascript:void(0);', // Prevent default navigation
        role: 'button',
        'data-slide': 'prev'
    }, carousel);
    prevControl.textContent = '⟵';
    //prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
    prevControl.onclick = () => moveCarousel(carousel, -1);

    // Create the inner part of the carousel
    const carouselInner = createAndAppendElementCarousel('div', {
        class: 'carousel-inner'
    }, carousel);


    // Add images
    images.forEach((image, index) => {
        const itemClass = index === 0 ? 'carousel-item active' : 'carousel-item';
        const item = createAndAppendElementCarousel('div', { class: itemClass }, carouselInner);
        createAndAppendElementCarousel('img', {
            class: 'd-block w-100 carouselImage',
            src: image.src,
            alt: image.alt
        }, item);
    });

    
    const nextControl = createAndAppendElementCarousel('a', {
        class: 'carousel-control-next',
        href: 'javascript:void(0);', // Prevent default navigation
        role: 'button',
        'data-slide': 'next'
    }, carousel);
    nextControl.textContent = '⟶';
    //nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
    nextControl.onclick = () => moveCarousel(carousel, 1);

    // Add a delete button below the carousel
    const deleteBtn = createAndAppendElementCarousel('input', {
        class: 'carousel-delete-btn',
        type: 'button',
        value: 'Delete'
    }, deleteCarouselImageDiv);
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteCurrentImage(carousel);

    return carousel;
}


function moveCarousel(carouselElement, direction) {
    // Find the active item
    const activeItem = carouselElement.querySelector('.carousel-item.active');
    let newItem = direction === 1 ? activeItem.nextElementSibling : activeItem.previousElementSibling;

    // Wrap around if at start or end
    if (!newItem) {
        const items = carouselElement.querySelectorAll('.carousel-item');
        newItem = direction === 1 ? items[0] : items[items.length - 1];
    }

    // Update classes to change active item
    activeItem.classList.remove('active');
    newItem.classList.add('active');
    console.log(newItem);

    updateShirtCanvas('src_swap', newItem.querySelector('img').src);

}


function deleteCurrentImage(carousel) {
    const activeItem = carousel.querySelector('.carousel-item.active');
    if (!activeItem) return;

    const activeImg = activeItem.querySelector('img');
    if (!activeImg) return;

    // Optionally confirm deletion
    if (!confirm('Are you sure you want to delete this image?')) return;

    var image_src = activeImg.src;
    // Remove the image from the carousel
    activeItem.remove();

    // Remove the src from the cookie
    removeImageFromCookie(image_src);
    
    console.log('activeItem.src');
    console.log(activeImg);
    console.log(image_src);

    // Delete the image from the database
    // Send a request to the server to delete the image file
    $.ajax({
        url: '/delete_image',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({image_path: image_src}),
        success: function() {
            console.log('Image successfully deleted');
            // Attempt to click the first child with class 'art' after deletion
            var nextImage = $('.image-container .art:first');
            if (nextImage.length > 0) {
                nextImage.click(); // Simulate click if another image exists
            } else {
                console.log('Image Deleted');
                //window.location.href = '/shopping'; // Redirect if no images left
            }
        },
        error: function(xhr, status, error) {
            console.error("Error deleting image: " + error);
        }
    });

    // Additional handling if there are no more images
    if (!carousel.querySelector('.carousel-item')) {
        carousel.remove(); // Remove the entire carousel if empty
    } else {
        // Ensure there's an active class
        const items = carousel.querySelectorAll('.carousel-item');
        if (!Array.from(items).some(item => item.classList.contains('active'))) {
            items[0].classList.add('active'); // Make the first item active if no active item left
        }
    }
}

function createAndAppendElementCarousel(type, attributes, parent, htmlContent = '') {
    const element = document.createElement(type);
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    element.innerHTML = htmlContent;
    parent.appendChild(element);
    return element;
}



function populate_images(the_images_src, parentElement) {

    // Check if the parent exists
    if (!parentElement) {
        console.error('The specified parent element does not exist.');
        return;
    }

    // Iterate over the list of image sources
    the_images_src.forEach((src, index) => {
        // Create a new image element
        console.log('src: ', src);
        createAndAppendElement('img', {
            src: src,
            class: 'art',
            id: `image_${index + 1}`,
            alt: `Image number ${index + 1}`
        }, parentElement);
    });

}


// sources is a list of src's
function flexibleImageContainer(sources, centeredBlock) {

    // Images

    createAndAppendElement('div', {
        class: 'mb-5',
        id: 'imageDiv'
    }, centeredBlock);

    const imageDiv = document.getElementById('imageDiv');

    createAndAppendElement('div', {
        class: 'image-container',
        id: 'image-container'
    }, imageDiv);

    const imageContainer = document.getElementById('image-container');


    populate_images(sources, imageContainer)

}


function singleImageContainer(sourceDivId, sourceClass, source, centeredBlock) {
    
    createAndAppendElement('div', {
        class: 'mb-5',
        id: sourceDivId,
    }, centeredBlock)

    const imageDiv = document.getElementById(sourceDivId);

    createAndAppendElement('img', {
        class: sourceClass,
        src: source
    }, imageDiv);
}






// $$$$$$$$$$$$$$$$$$  RANDOM   $$$$$$$$$$$$$$$$$$$$$$$$$$







/*

Javascript for Pre-built items 

*/



/*

Login form without Create Account option

*/

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

function login_box101(centeredBlock) {

    const login_box = div(centeredBlock, {id: "login_box101"});
    h1(login_box, {innerHTML: "Login"});
    const login_form = form(login_box, {id: 'login_form101', onsubmit: 'return submitLoginForm101();'});
    input(login_form, {id: 'email101', name: 'email101', type: 'email', placeholder: 'Email'});
    input(login_form, {id: 'password101', name: 'password101', type: 'password', placeholder: 'Password'});
    input(login_form, {type: 'submit', value: 'Log In'});
}

function submitLoginForm101() {

    // Pass ids for form values.
    let formElements = ["email101", "password101"];
    let { data, responseType } = ajax_package(formElements, 'json_only', 'login101');
    ajax_request("/ajax_receive", "POST", data, responseType);
    
    return false; // Prevent default form submission. 
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/


