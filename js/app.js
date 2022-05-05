let shoppingCart = []

const productCont = document.getElementById('productContainer');
const cartCont = document.getElementById('cart-cont');

const finishButton = document.getElementById('finish');
const shopEnd = document.getElementById('cartClose');

const cartMeter = document.getElementById('cart-meter');
const totalPrice = document.getElementById('totalPrice');

const sizeSelect = document.getElementById('sizeSelect');
const search = document.getElementById('search');

sizeSelect.addEventListener('change',()=>{
    if(sizeSelect.value == 'all'){
        showProducts(productsStock)
    }else{
    showProducts(productsStock.filter(element => element.size == sizeSelect.value))
    }
})

showProducts(productsStock)

function showProducts(array) {
    productContainer.innerHTML= ""

    array.forEach(item => {
        let div = document.createElement('div')
        div.className = 'product'
        div.innerHTML += `
        <div class="card">
                <div>
                    <img src=${item.img}>
                    <span>${item.product}</span>
                    <button id="add${item.id}"><i class="fas fa-shopping-cart"></i></button>
                </div>
                <div class="card-content">
                    <p>${item.desc}</p>
                    <p>Size: ${item.size}</p>
                    <p>$${item.price}</p>
                </div>
            </div>
        `
        productContainer.appendChild(div)

        let btnAdd =document.getElementById(`add${item.id}`)

        btnAdd.addEventListener('click', ()=>{
            addToCart(item.id)
        })
    })
}

function addToCart(id) {
    let done = shoppingCart.find(item=> item.id == id)
    if(done){
        done.amount = done.amount + 1
        document.getElementById(`amount${done.id}`).innerHTML = `<p id="amount${done.id}">Amount:${done.amount}</p>`
        updateCart()
    }else{
        let addProduct = productsStock.find(element => element.id == id)

        addProduct.amount = 1
    
        shoppingCart.push(addProduct)

        updateCart()

        showCart(addProduct)
    }

    localStorage.setItem('cart', JSON.stringify(shoppingCart))
}

function showCart(addProduct) {
    let div = document.createElement('div')
    div.className = 'inCartProduct'
    div.innerHTML=`
                    <p>${addProduct.product}</p>
                    <p>Price: $${addProduct.price}</p>
                    <p id="amount${addProduct.id}">Amount:${addProduct.amount}</p>
                    <button id="erase${addProduct.id}" class="eraseButton"><i class="fas fa-trash-alt"></i></button>
    `
    cartCont.appendChild(div)

    let btnErase = document.getElementById(`erase${addProduct.id}`)

    btnErase.addEventListener('click',()=>{


        /*Se agrega sweetalert al botón de eliminar producto para confirmar si es la acción que se desea realizar*/
        Swal.fire({
            title: 'Are you sure you want to delete the product?',
            text: "It will be removed from the cart",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FFA552',
            cancelButtonColor: '#fae3cc',
            confirmButtonText: 'Yes, I am sure',
            cancelButtonText: 'Cancel',
            reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                    'Deleted!',
                    'The product has been removed.',
                    'success')
                    if(addProduct.amount == 1){
                        btnErase.parentElement.remove()
                        shoppingCart = shoppingCart.filter(item=> item.id != addProduct.id)
                        updateCart()
                        localStorage.setItem('cart', JSON.stringify(shoppingCart))
                    }else{
                        addProduct.amount = addProduct.amount - 1
                        document.getElementById(`amount${addProduct.id}`).innerHTML = `<p id="amount${addProduct.id}">Amount:${add.amount}</p>`
                        updateCart()
                        localStorage.setItem('cart', JSON.stringify(shoppingCart))
                    }
            }else {
                Swal.fire(
                'Cancelled!',
                '',
                'error'
                )}
        })
    })
}

function updateCart() {
    cartMeter.innerText = shoppingCart.reduce((acc,el)=> acc + el.amount, 0)

    totalPrice.innerText =  shoppingCart.reduce((acc,el)=> acc + (el.price * el.amount), 0)
}

function retrieve() {
    let retrieveLS = JSON.parse(localStorage.getItem('cart'))

    if(retrieveLS){
        retrieveLS.forEach(el=> {
            showCart(el)
            shoppingCart.push(el)
            updateCart(el)
        })
    }
}

retrieve()