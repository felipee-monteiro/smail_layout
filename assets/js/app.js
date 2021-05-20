 const button = document.querySelector(".nav-button"), menu = document.querySelector(".menu"),closeButton = document.querySelector(".nav-button-close")
 ,header = document.querySelector("header");

 button.onclick = () => menu.classList.add("active");
 closeButton.onclick = () => menu.classList.remove("menu");

 window.addEventListener('scroll', e => { 
 	setTimeout(e.target.scrollingElement.scrollTop > 0 ? (header.className = "active") : (header.className = "", 1000)) 
 });