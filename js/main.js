var product_name = document.getElementById("productName");
var product_price = document.getElementById("productPrice");
var product_cat = document.getElementById("productCat");
var product_desc = document.getElementById("productDesc");
var table_body = document.getElementById("tbody");
var productContainer;
var btnAction = document.getElementById("AddandUpdate");
var currentIndex=0;
var search = document.getElementById("search");
var name_error = document.getElementById("nameError");
var price_error = document.getElementById("priceError");
var cat_error = document.getElementById("catError");
var desc_error = document.getElementById("descError");

if(localStorage.getItem("products") != null){
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct(productContainer);
}
else{
    productContainer = [];
}
btnAction.onclick= function(){
    if (btnAction.innerHTML.trim() == "Add Product".trim()) {
        if (validateProductName() && validateProductPrice() && validateProductCategory() && validateProductDescription()) {
            getProduct();
            product_name.classList.remove("is-valid");
            product_price.classList.remove("is-valid");
            product_cat.classList.remove("is-valid");
            product_desc.classList.remove("is-valid"); 
        }
        else {
            alert("Please Enter Valid Data");
            product_name.classList.remove("is-invalid");
            product_price.classList.remove("is-invalid");
            product_cat.classList.remove("is-invalid");
            product_desc.classList.remove("is-invalid");
            name_error.classList.add("d-none");
            price_error.classList.add("d-none");
            cat_error.classList.add("d-none");
            desc_error.classList.add("d-none");
        }
    } 
    else {
        updateProduct();
    }
}
function getProduct(){
    var product = {
        name: product_name.value,
        price: product_price.value,
        category: product_cat.value,
        description: product_desc.value
    }
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
    console.log(productContainer);
    clearInput();
}

function displayProduct(containerArray){
    var cartona = ``;
    for(var i=0; i<containerArray.length; i++){
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${containerArray[i].name}</td>
        <td>${containerArray[i].price}</td>
        <td>${containerArray[i].category}</td>
        <td>${containerArray[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="getValueOfProduct(${i})" class="btn btn-warning">Update</button></td>
    </tr>`
    }
    table_body.innerHTML = cartona;
}
function clearInput(){
    product_name.value="";
    product_price.value="";
    product_cat.value="";
    product_desc.value="";
}

function deleteProduct(index){
    productContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
}

function getValueOfProduct(indexUpdate){
    var product = productContainer[indexUpdate];
    currentIndex = indexUpdate;
    product_name.value = productContainer[indexUpdate].name;
    product_price.value = productContainer[indexUpdate].price;
    product_cat.value = productContainer[indexUpdate].category;
    product_desc.value = productContainer[indexUpdate].description;
    btnAction.innerHTML = "Update Product";
    btnAction.classList.replace("btn-primary", "btn-success");
}
function updateProduct(){
    var product = {
        name: product_name.value,
        price: product_price.value,
        category: product_cat.value,
        description: product_desc.value
    }
    productContainer[currentIndex] = product;
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearInput();
    btnAction.innerHTML = "Add Product";
    btnAction.classList.replace("btn-success", "btn-primary");
}
function searchProduct(term){
    var searchContainer = [];
    for(var i=0; i<productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            searchContainer.push(productContainer[i]);
        }
    }
    displayProduct(searchContainer);
}
search.addEventListener("keyup", function(){
    searchProduct(search.value);
})
function validateProductName(){
    const regx = /^[a-zA-z]{2,8}[\s]{0,1}([a-zA-z]|[1-9]){1,2}([a-zA-z]|[0-9]){1}$/;
    if (regx.test(product_name.value) === true) {
        return true;
    }
    else {
        return false;
    }
}
product_name.addEventListener("keyup", function(){
    if(validateProductName(true)){
        product_name.classList.remove("is-invalid");
        product_name.classList.add("is-valid");
        name_error.classList.add("d-none");
    }
    else{
        product_name.classList.remove("is-valid");
        product_name.classList.add("is-invalid");
        name_error.classList.remove("d-none");
    }
})
function validateProductPrice(){
    const regx = /^[1-9][0-9]{0,5}$/;
    if (regx.test(product_price.value) === true) {
        return true;
    }
    else {
        return false;
    }
}
product_price.addEventListener("keyup", function(){
    if(validateProductPrice(true)){
        product_price.classList.remove("is-invalid");
        product_price.classList.add("is-valid");
        price_error.classList.add("d-none");
    }
    else{
        product_price.classList.remove("is-valid");
        product_price.classList.add("is-invalid");
        price_error.classList.remove("d-none");
    }
})
function validateProductCategory(){
    const regx = /^[a-zA-z]{2,8}$/;
    if (regx.test(product_cat.value) === true) {
        return true;
    }
    else {
        return false;
    }
}
product_cat.addEventListener("keyup", function(){
    if(validateProductCategory(true)){
        product_cat.classList.remove("is-invalid");
        product_cat.classList.add("is-valid");
        cat_error.classList.add("d-none");
    }
    else{
        product_cat.classList.remove("is-valid");
        product_cat.classList.add("is-invalid");
        cat_error.classList.remove("d-none");
    }
})
function validateProductDescription(){
    const regx = /^[a-zA-z]{2,8}$/;
    if (regx.test(product_desc.value) === true) {
        return true;
    }
    else {
        return false;
    }
}
product_desc.addEventListener("keyup", function(){
    if(validateProductDescription(true)){
        product_desc.classList.remove("is-invalid");
        product_desc.classList.add("is-valid");
        desc_error.classList.add("d-none");
    }
    else{
        product_desc.classList.remove("is-valid");
        product_desc.classList.add("is-invalid");
        desc_error.classList.remove("d-none");
    }
})























