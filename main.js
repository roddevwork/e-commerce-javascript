import { appState, productsData } from './src/js/data.js'

const productsContainer = document.querySelector('.cards-container')
const showMoreCardsBtn = document.querySelector('.btn-load')

//  LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || []
// funcion para guardar carrito en el localstorage
const saveCartToLocalStorage = () => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

// funcion crear template producto
const generateProductCardHTML = (product) => {
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
const renderProductsToDOM = (productsList) => {
	productsContainer.innerHTML += productsList
		.map(generateProductCardHTML)
		.join('')
}

// Funcion para saber el ultimo indice de los productos
const getLastProductIndexInState = () => {
	let { products } = appState
	return products.length - 1
}

// Funcion para manejar el paginado
const handleShowMoreProducts = () => {
	appState.currentProductsIndex += 1
	let { products, currentProductsIndex } = appState
	renderProductsToDOM(products[currentProductsIndex])
	// Verificar si ya no hay mas productos
	if (currentProductsIndex === getLastProductIndexInState()) {
		showMoreCardsBtn.style.display = 'none'
	}
}

// Funcion main
const initializeApp = () => {
	renderProductsToDOM(appState.products[0])
	showMoreCardsBtn.addEventListener('click', handleShowMoreProducts)
}
initializeApp()
