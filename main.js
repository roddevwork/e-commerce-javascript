import productsData from './src/js/data.js'

const productsContainer = document.querySelector('.cards-container')

//  LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || []
// funcion para guardar carrito en el localstorage
const saveCart = () => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

// funcion crear template producto
const createProductTemplate = (product) => {
	const { id, title, img, price, price_offer } = product

	return `<div class="card">
    <img src="${img}" alt="${title}" />
    <h3>${title}</h3>
    <p>$${price}</p>
    <button class="card-btn" data-id="${id}">
        ${price_offer ? `Comprar ahora - $${price_offer}` : 'Comprar ahora'}    
    </button>
</div>`
}

// Funcion renderizar productos en carrito
const renderProducts = (productsList) => {
	productsContainer.innerHTML += productsList
		.map(createProductTemplate)
		.join('')
}

// Funcion main
const init = () => {
	renderProducts(productsData)
}
init()
