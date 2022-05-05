const openModal = document.querySelector('.openCart');
const modal = document.querySelector('.modal-cont');
const closeModal = document.querySelector('.cartClose');

openModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal-cont--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal-cont--show');
});

