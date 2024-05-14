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