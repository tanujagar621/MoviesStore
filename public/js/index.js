const closeBtns = document.querySelectorAll('.close')
closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const alert = e.currentTarget.parentElement;
        alert.style.display = 'none'
    })
})