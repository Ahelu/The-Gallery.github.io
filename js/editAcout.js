/**GENERAL VARIABLES **/

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