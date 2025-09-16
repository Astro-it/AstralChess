const menuBtn = document.getElementById('MenuBtn');
const sidebar = document.getElementById('sidebar');


menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});