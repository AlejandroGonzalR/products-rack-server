const productsUrl = "http://0.0.0.0:8090/products";
const imagesServerUrl = "http://0.0.0.0:8000";
const visitServerUrl = "http://0.0.0.0:4001/visit";
let start = performance.now();

function init() {
    console.log(`Initial time: ${start}`);
    userAction();
}

function userAction() {
    fetch(productsUrl)
        .then(response => response.json())
        .then(data => {
            console.log(`Products response endtime: ${performance.now() - start}`);
            showImage(data);
        })
        .catch(error => console.log(error))
}

function showImage(response) {
    let container = document.getElementById("container");
    response.forEach(data =>{
       addProduct(data, container)
    });
}

function addProduct(data, imageSection) {
    let divProduct = document.createElement("div");
    let image = document.createElement("img");
    let description = document.createElement("p");
    let visit = document.createElement("div");
    appendVisitArea(visit);
    appendCardContent(divProduct, image, description, visit, data);
    imageSection.appendChild(divProduct);
}

function appendCardContent(section, imageElement, textElement, visitSection, data) {
    section.className = "card";
    section.id = data.id;
    imageElement.setAttribute("src", imagesServerUrl + data.url);
    imageElement.className = "card_media";
    textElement.textContent = data.description;
    textElement.className = "card_text";
    section.onclick = () => {
        visitAction(data.id)
    };
    section.innerHTML += imageElement.outerHTML + textElement.outerHTML + visitSection.outerHTML;
}

function visitAction(id) {
    fetch(visitServerUrl, {
        method: 'POST',
        body: JSON.stringify({id: id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            appendVisitContent(id, data.visit)
        })
        .catch(error => console.log(error))
}

function appendVisitArea(visitContainer) {
    let icon = document.createElement("i");
    let span = document.createElement("span");
    visitContainer.className = "card_visit";
    icon.className = "fa fa-eye";
    visitContainer.innerHTML += icon.outerHTML + span.outerHTML;
}

function appendVisitContent(id, visit) {
    let container = document.getElementById(id).children[2];
    let span = container.children[1];
    span.textContent = visit;
}

init();
