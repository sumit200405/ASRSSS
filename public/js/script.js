class UserHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="navbar">
                <div class="logo">
                    <a href="/home">ASRSSS</a>
                </div>
                <ul class="mlinks">
                    <a href="/home"><li class="home hideOnMobile">HOME</li></a>
                    <a href="/about-us"><li class="about hideOnMobile">ABOUT</li></a>
                    <a href="/blogs"><li class="hideOnMobile">BLOG</li></a>
                    <a href="/contact-us"><li class="contact hideOnMobile">CONTACT</li></a>
                </ul>
                <a href="/donate" class="donate hideOnMobile action-button">DONATE</a>
                <div class="toggle-button">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
            <div class="dropdown-menu">
                <ul>
                    <a href="/home"><li class="home">HOME</li></a>
                    <a href="/about-us"><li class="about">ABOUT</li></a>
                    <a href="/blogs"><li class="blog">BLOG</li></a>
                    <a href="/contact-us"><li class="contact">CONTACT</li></a>
                    <a href="/donate"><li class="donate action-button">DONATE</li></a>
                </ul>
            </div>
        </header>`;
    }
}

class AdminHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header">
            <div class="navbar">
                <div class="logo">
                    <a href="/home">ASRSSS</a>
                </div>
                <ul class="mlinks">
                    <a href="/home"><li class="home hideOnMobile">HOME</li></a>
                    <a href="/about-us"><li class="about hideOnMobile">ABOUT</li></a>
                    <a href="/blogs"><li class="hideOnMobile">BLOG</li></a>
                    <a href="/contact-us"><li class="contact hideOnMobile">CONTACT</li></a>
                    <a href="/donate"><li class="donate hideOnMobile">DONATE</li></a>
                    <a href="/editor"><li class="editor hideOnMobile">EDITOR</li></a>
                    <a href="/dashboard"><li class="dash hideOnMobile">DASHBOARD</li></a>

                </ul>
                <a href="" class="logout hideOnMobile action-button">LOGOUT</a>
                <div class="toggle-button">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
            <div class="dropdown-menu">
                <ul>
                    <a href="/home"><li class="home">HOME</li></a>
                    <a href="/about-us"><li class="about">ABOUT</li></a>
                    <a href="/blogs"><li class="blog">BLOG</li></a>
                    <a href="/editor"><li class="editor">EDITOR</li></a>
                    <a href="/dashboard"><li class="dash">DASHBOARD</li></a>
                    <a href="/contact-us"><li class="contact">CONTACT</li></a>
                    <a href=""><li class="logout action-button">LOGOUT</li></a>
                </ul>
            </div>
        </header>`;
    }
}

class UserFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <footer class="footer">
        <h3>ANJANAPURA SRI RAGHAVENDRA SWAMY SEVA SAMITI</h3>
        <div class="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61558869050429&mibextid=ZbWKwL"><i
              class="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com/anjanapura_rayara_matha?igsh=ZDE4dXloZ3JrYjVp"><i
              class="fa-brands fa-instagram"></i></a>
          <a href=""><i class="fa-brands fa-youtube"></i></a>
        </div>
        <div class="footerNav">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/blogs">Blog</a></li>
            <li><a href="/about-us">About</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/donate">Donate</a></li>
          </ul>
        </div>
        <div class="footerBottom">
          <p>
            Copyright &copy;2024; Designed by <span class="designer">ASRSSS</span>
          </p>
        </div>
      </footer>`;
    }
}

customElements.define('user-header', UserHeader);
customElements.define('admin-header', AdminHeader);
customElements.define('user-footer', UserFooter);



// Menu toggle

const toggleButton = document.querySelector(".toggle-button")
const toggleButtonIcon = document.querySelector(".toggle-button i")
const dropdownMenu = document.querySelector(".dropdown-menu")

toggleButton.onclick = function () {
    dropdownMenu.classList.toggle('open')
    const isOpen = dropdownMenu.classList.contains('open')

    toggleButtonIcon.className = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}

// Image slider

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};