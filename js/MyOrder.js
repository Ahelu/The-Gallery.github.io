/**GENERAL VARIABLES **/

//My order
const myOrder = document.querySelector('.my-order');

//My order - date 
const date = document.querySelector(".date");

//My order - My order content
const myOrderContent = document.querySelector(".my-order_content");

//Total container p
const totalPrice = document.querySelector('.totalPrice');

//Downloading products from local storage from index.js.
const productsCar = JSON.parse(localStorage.getItem("productCarList"));

//Downloading products total price from local storage from index.js.
const productsCartTotal = localStorage.getItem("productCarListTotal");

//Navbar - Menu desktop
const navbarEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');

//Navbar - Menu mobile
const navbarMenu = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');




/** Show: Navbar - Menu mobile **/
//Menu
navbarMenu.addEventListener('click', toggleMenuMobile);
//toggleMenuMobile: Add and remove 'active class' using toggle function. When mobileMenu is actived, remove function closes shopping car container and product detail container.
function toggleMenuMobile(){
    mobileMenu.classList.toggle('menuMobile-Active');
}



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



/**Show: Getting date**/
ShowDate();
function ShowDate(){
    let now = new Date();

    //day
    let day = `0${now.getDate()}`;
    //month
    let month = `0${now.getMonth() + 1}`;
    //year
    let year = now.getFullYear();

    // AA / MM /DD
    const aammdd= (`${year}.${month}.${day}`);
    return date.innerText= aammdd;
}



/**Show: Conditional - Rendering product in my orden content **/
/*productsCar is the array that we have received by the localstage object. 
* Car products empty.*/
if(productsCar.length<=0){
    const productCardEmpty = document.createElement('div');
    productCardEmpty.classList.add('shopping-card-empty');

    const ImgCardEmpty = document.createElement('img');
    ImgCardEmpty.setAttribute('src', '/assets/icons/notify.png');
    ImgCardEmpty.setAttribute('alt','car-empty-img');

    const productPEmpty = document.createElement('p');
    productPEmpty.innerText = `... Hey! Your car looks like 
    it's empty`;

    productCardEmpty.append(ImgCardEmpty,productPEmpty);
    myOrderContent.append(productCardEmpty);

    //Send price
    totalPrice.innerText=`0`;

}else{
    RenderingProducts(productsCar);
    //Send price
}


/**Rendering products **/
function RenderingProducts(arr){
        
        const MyorderCards = document.createElement('div');

        //Rendering each product
        for(product of arr){

            //Shopping-card
            const productCard = document.createElement('div');
            productCard.classList.add('shopping-card');
        
            //Figure
            const productfigureImg = document.createElement('figure');
            
            //Figure img
            const productImg = document.createElement('img');
            productImg.setAttribute('src', product.image);
            productImg.setAttribute('alt','product-img');
            
            //Shopping-card div
            const productDivInf = document.createElement('div');

            //Shopping-card div p1
            const productP1 = document.createElement('p');
            productP1.innerText = `${product.name}`;

            //Shopping-card div p2
            const productP2 = document.createElement('p');
            productP2.innerText = `${product.description}`;

            //Shopping-card div p3
            const productP3 = document.createElement('p');
            productP3.innerText = `${product.cost}`;


            productDivInf.append(productP1,productP2,productP3);
            productfigureImg.appendChild(productImg);
            productCard.append(productfigureImg,productDivInf);
            MyorderCards.append(productCard);
        }

        //Update DOM
        myOrderContent.append(MyorderCards);
        totalPrice.innerText=`${productsCartTotal}`;
}
