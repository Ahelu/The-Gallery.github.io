/** GENERAL VARIABLES **/

//Navbar - Menu desktop
const navbarEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');

//Navbar - Menu mobile
const navbarMenu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');

//Main - Shopping card
const shoppingCar = document.querySelector('.navbar-shopping-car');
const carContainer = document.querySelector('.shopping-container');
const shoppingCardsC = document.querySelector('.shopping-cards-container');
const totalPurchase = document.querySelector('#total-purchase');
const productInCar = document.querySelector('#products-in-car');
const btnCheckout = document.querySelector('.Checkout');

//Main - Cards Container
const productscardsContainer= document.querySelector('.products-cards-container');

//Main - Product Deatil Container
const productDetailContainer= document.querySelector('.product-detail');
const productDClose= document.querySelector('.product-detail-close');
const productDetailIgm = document.querySelector('#product-detail-img');
const productDetailCost = document.querySelector('#product-detail-cost');
const productDetailName = document.querySelector('#product-detail-name');
const productDetailDes = document.querySelector('#product-detail-description');
const addtoCarButton = document.querySelector('.add-to-car-button');




/** Show: Navbar - Menu desktop **/
//Email
navbarEmail.addEventListener('mouseenter', toggleMenuDesktop);
navbarEmail.addEventListener('mouseleave', toggleMenuDesktop);
//Menu
desktopMenu.addEventListener('mouseleave', toggleMenuDesktop);
//toggleMenuDesktop: Add and remove 'inactive class' using toggle function.
function toggleMenuDesktop(){
    desktopMenu.classList.toggle('menuDesktop-Inactive');
}



/** Show: Navbar - Menu mobile **/
//Menu
navbarMenu.addEventListener('click', toggleMenuMobile);
//toggleMenuMobile: Add and remove 'active class' using toggle function. When mobileMenu is actived, remove function closes shopping car container and product detail container.
function toggleMenuMobile(){
    mobileMenu.classList.toggle('menuMobile-Active');
    carContainer.classList.remove('menuShopping-Active');
    productDetailContainer.classList.remove('productDetailt-Active');
}



/** Show: Main - Shopping card **/
//NavbarCar Icon
shoppingCar.addEventListener('click', toggleShoppingCar);
//toggleShoppingCar: Add and remove 'active class' using toggle function. When carContainer is actived, remove function closes mobileMenu and product detail container.
function toggleShoppingCar(){
    carContainer.classList.toggle('menuShopping-Active');
    mobileMenu.classList.remove('menuMobile-Active');
    productDetailContainer.classList.remove('productDetailt-Active');
}



/** Open: Main - Product detail **/
//productDetailOpen: It Receives product propierties and it shows them in the window. Also it add and remove 'active class' using add classlist. When product detail is actived, remove function closes mobileMenu and carContainer.
function productDetailOpen(img,cost,name, description, id) {
    //Products propierties
    productDetailIgm.setAttribute('src',img);
    productDetailCost.innerText=cost;
    productDetailName.innerText=name;
    productDetailDes.innerText=description;  
    //Send the product id to the button
    addtoCarButton.setAttribute('id',id);

    //Add and remove active class
    productDetailContainer.classList.add('productDetailt-Active');
    mobileMenu.classList.remove('menuMobile-Active');
    carContainer.classList.remove('menuShopping-Active');
}



/** Close: Main - Product detail **/
//Produc Detail Close Icon
productDClose.addEventListener('click', productDetailClose);
//productDetailClose: Add and remove 'active class' using remove classlist. When product detail is actived, remove function closes it.
function productDetailClose(){
    productDetailContainer.classList.remove('productDetailt-Active');
}



/** Add: Main - Shopping container - Add Product **/
//Array
const productCar_List=[];
const prices=[];
let productcount=0;


//AddProductCar: It Finds the selected product and add this one to the shopping car using find function and push.
function addProductCar(event){
    //Find the product using its id
    const productAdded= product_List.find(function(product){
        return product.id===event.target.id || product.id===event.currentTarget.id;
   });

    //Push product to shopping car's products array
    productCar_List.push(productAdded);

    //Update products number at shooping car icon
    productInCar.innerText= (productCar_List.length);

    //Get last product from productCar_List
    let lastProduct = productCar_List[(productCar_List.length)-1];

    //Add product cost to prices array
    prices.push(
        lastProduct.cost 
    );       

    //Send product added for rendering at the shooping car
    RenderingProductsShopping(lastProduct);

    //Scroll
    shoppingCarScrollActive();

    //Get product total cost 
    TotalPrice();

}



/** Remove: Main - Shopping car - Remove product **/
//removeProductCar: Remove a product from shopping car.
function removeProductCar(product){
    //Get html element
    const productR = event.currentTarget.parentNode.parentNode;

    //Remove html element
    shoppingCardsC.removeChild(productR);

    //Remove product selected through splice(indice, num to delete). Find the product or cost in the array using indexOf.
    //Remove from ProductCar_List array
    productCar_List.splice(productCar_List.indexOf(product), 1);
    //Remove from Prices array
    prices.splice(prices.indexOf(product.cost), 1);

    //Set products number
    productInCar.innerText= (productCar_List.length);

    //Scroll
    shoppingCarScrollActive();

    //Get product total cost 
    TotalPrice();
}



//Get total price of products in car
function TotalPrice(){
    let total = 0;

    //Get product total purchase
    prices.forEach(element =>{
        total += parseInt(element);
    });

    //Set product total purchase
    totalPurchase.innerText= `${total}`;

    return total;
}



/**Toogle: Main - Shopping car container - products in car**/
//Add and remove the scroll to shopping-cards-container.
function shoppingCarScrollActive(){
    productCar_List.length>4 ? shoppingCardsC.classList.add('shopping-cards-Scroll-Active'): 
    shoppingCardsC.classList.remove('shopping-cards-Scroll-Active');
}



/**Send data to LocalStorage - Shopping Car Container- Button - Checkout**/
//Send products in car to the LocalStorage.
btnCheckout.addEventListener('click', SendToLocalStorage);

function SendToLocalStorage(){
    localStorage.setItem("productCarList", JSON.stringify(productCar_List));
    localStorage.setItem("productCarListTotal", TotalPrice());   
}



//Rendering products in Shopping Car
function RenderingProductsShopping(product){

        //Shopping Card
        const shoppingCard = document.createElement('div');
        shoppingCard.classList.add('shopping-card');

        //Figure
        const figureShoppingCar = document.createElement('figure');

        //Figure Img
        const productSCImg = document.createElement('img');
        productSCImg.setAttribute('src', `${product.image}`);
        productSCImg.setAttribute('alt','product-img');

        //Product Shopping Card Name
        const productSCName = document.createElement('p');
        productSCName.innerText= `${product.name}`;

        //Shoppig Delete Section
        const shoppingDeleteSection = document.createElement('div');
        shoppingDeleteSection.classList.add('shopping-delete-section')

        //Shoppig Delete Section - Cost
        const productSCCost = document.createElement('p');
        productSCCost.innerText= `${product.cost}`;

        const shoppingDeleteIcon = document.createElement('img');
        shoppingDeleteIcon.classList.add('delete-icon');
        shoppingDeleteIcon.setAttribute('src',"./assets/icons/icon_close.png");
        shoppingDeleteIcon.setAttribute('alt','down-arrow');

        //Shopping delete icon Event Listener using parametres
        shoppingDeleteIcon.addEventListener('click',() => { 
                removeProductCar(product); 
        });  
        
        shoppingDeleteSection.append(productSCCost, shoppingDeleteIcon);
        figureShoppingCar.append(productSCImg);
        shoppingCard.append(figureShoppingCar, productSCName, shoppingDeleteSection);
        shoppingCardsC.append(shoppingCard);
}



/** Rendering: Main - Cards Container **/
//Array
const product_List=[];

//Products
product_List.push(
    {
    id: '001',
    cost: 121,
    name: 'Paint1',
    image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"',
    description: 'Od tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no.Lorem ipsum dolor sit amet.',
    
});

product_List.push(
    {
    id: '002',
    cost: 122,
    name: 'Paint2',
    image: 'https://images.pexels.com/photos/1812960/pexels-photo-1812960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Ut enim ad minim veniam, quis no.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
});

product_List.push(
    {
    id: '003',
    cost: 123,
    name: 'Paint3',
    image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"',
    description: 'Adipiscing elit lorem ipsum Ut enim ad minim veniam dolor sit amet, consectetur. Quis nostrud exercitation ullamco.',
    
});

product_List.push(
    {
    id: '004',
    cost: 124,
    name: 'Paint4',
    image: 'https://images.pexels.com/photos/1812960/pexels-photo-1812960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor quis nostrud exercitation incididunt.',
    
});

product_List.push({
    id: '005',
    cost: 125,
    name: 'Paint5',
    image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"',
    description: 'Od tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no.Lorem ipsum dolor sit amet.',
});

product_List.push({
    id: '006',
    cost: 126,
    name: 'Paint6',
    image: 'https://images.pexels.com/photos/1812960/pexels-photo-1812960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',    
});

product_List.push({
    id: '007',
    cost: 127,
    name: 'Paint7',
    image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"',
    description: 'Ut enim ad minim veniam, quis no.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',    
});

product_List.push(
    {
    id: '008',
    cost: 121,
    name: 'Paint8',
    image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"',
    description: 'Od tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no.Lorem ipsum dolor sit amet.',
    
});

product_List.push(
    {
    id: '009',
    cost: 122,
    name: 'Paint9',
    image: 'https://images.pexels.com/photos/1812960/pexels-photo-1812960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Ut enim ad minim veniam, quis no.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
});

product_List.push(
    {
    id: '010',
    cost: 123,
    name: 'Paint10',
    image: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"',
    description: 'Adipiscing elit lorem ipsum Ut enim ad minim veniam dolor sit amet, consectetur. Quis nostrud exercitation ullamco.',
    
});




//Rendering products in Cards Container
RenderingProducts(product_List);
function RenderingProducts(arr){

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    for(product of arr){
        //Product-Card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image);
        productImg.setAttribute('alt','productimg');
        productImg.classList.add('product-img');  


        //Product-Inf
        const productInf = document.createElement('div');
        productInf.classList.add('product-info');

        
        //Product-Cost and Name
        const productCN = document.createElement('div');
    
        const productCost = document.createElement('p');
        productCost.innerText = `${product.cost}`;
    
        const productName = document.createElement('p');
        productName.innerText = `${product.name}`


        //Variables for event listener
        const productDescription = `${product.description}`;
        const productId = `${product.id}`;


        //ProductImg from product cards. Event Listener using parametres.
        productImg.addEventListener('click', () =>{ 
            productDetailOpen(productImg.getAttribute('src'), 
            productCost.innerText,productName.innerText,productDescription, productId); 
       });


        //Figure
        const figureAddIcon = document.createElement('figure');
    
        const productAddimg = document.createElement('img');
        productAddimg.setAttribute('src',"./assets/icons/bt_add_to_cart.png");
        productAddimg.setAttribute('id',productId);
        productAddimg.setAttribute('id',productId);
        productAddimg.setAttribute('alt','add');


        //Add product Event Listener using parametres from cards-container button
        figureAddIcon.addEventListener('click', addProductCar);

        //Add product Event Listener using parametres from product-detail button
        addtoCarButton.addEventListener('click', addProductCar); 
         

        figureAddIcon.appendChild(productAddimg);
        productCN.append(productCost, productName);
        productInf.append(productCN, figureAddIcon);
        productCard.append(productImg, productInf);
        cardsContainer.appendChild(productCard); 
    }
    productscardsContainer.append(cardsContainer);
}


