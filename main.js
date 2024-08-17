import { appState, productsData } from './src/js/data.js'

const productsContainer = document.querySelector('.cards-container')
const showMoreCardsBtn = document.querySelector('.btn-load')
const categoriesContainer = document.querySelector('.categories-container')
const categoriesList = document.querySelectorAll('.category')

//  LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || []

// -> Funciones:

// Funcion para guardar carrito en el localstorage
const saveCartToLocalStorage = () => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

// Funcion crear template producto
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

// Funcion para no mostrar el boton de ver mas cuando hay filtro activado
const setShowMoreVisibility = () => {
	if (appState.activeFilter) {
		showMoreCardsBtn.style.display = 'none'
	} else {
		// Si no hay un filtro activo y hay más productos por mostrar, mostrar el botón
		const isLastIndex =
			appState.currentProductsIndex === getLastProductIndexInState()
		showMoreCardsBtn.style.display = isLastIndex ? 'none' : 'block'
	}
}

// Funcion para cambiar el estado de los botones
const changeBtnAvtiveState = (selectedCategory) => {
	const categories = [...categoriesList]
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove('active')
			return
		}
		categoryBtn.classList.add('active')
	})
}

// Funcion para cambiar el estado del filtro
const changeFilterState = (btn) => {
	appState.activeFilter = btn.dataset.category
	changeBtnAvtiveState(appState.activeFilter)
	setShowMoreVisibility(appState.activeFilter)
}

// Funcion para saber si el boton de filtro es inactivo o no
const isInactiveFilterBtn = (element) => {
	return (
		element.classList.contains('category') &&
		!element.classList.contains('active')
	)
}

// Funcion que aplica un filtro
const applyFilter = ({ target }) => {
	if (!isInactiveFilterBtn(target)) {
		return
	}

	changeFilterState(target)
	productsContainer.innerHTML = ''
	if (appState.activeFilter) {
		renderFilteredProducts()
		appState.currentProductsIndex = 0
	} else {
		renderProductsToDOM(appState.products[0])
	}
	setShowMoreVisibility() // Llamar después de renderizar los productos
}

// Funcion para renderizar los productos filtrados
const renderFilteredProducts = () => {
	const filteredProducts = productsData.filter((product) => {
		return product.category.includes(appState.activeFilter)
	})
	renderProductsToDOM(filteredProducts)
}

// Funcion main
const initializeApp = () => {
	renderProductsToDOM(appState.products[0])
	showMoreCardsBtn.addEventListener('click', handleShowMoreProducts)
	categoriesContainer.addEventListener('click', applyFilter)
}
initializeApp()
