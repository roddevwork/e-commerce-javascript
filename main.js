import { appState, productsData } from './src/js/data.js'

// Elementos relacionados con el menú hamburguesa
const menuBtn = document.querySelector('#menu-btn')
const menuNav = document.querySelector('#nav-menu')

// Elementos relacionados con el carrito
const shoppingCart = document.querySelector('.shopping-cart')
const cartMenu = document.querySelector('.cart-menu')
const productsCart = document.querySelector('.cart-container')
const cartTotalAmount = document.querySelector('.cart-total-amount')
const cartCount = document.querySelector('.cart-count')
const buyCartBtn = document.querySelector('#buy-cart-btn')
const emptyCartBtn = document.querySelector('#empty-cart-btn')
const successMessage = document.querySelector('#show-msg')

// Elementos relacionados con los productos
const productsContainer = document.querySelector('.cards-container')
const showMoreCardsBtn = document.querySelector('.btn-load')
const categoriesContainer = document.querySelector('.categories-container')
const categoriesList = document.querySelectorAll('.category')

// Elementos relacionados con el formulario de contacto
const contactForm = document.querySelector('#contact-form')
const inputName = document.querySelector('#nombre')
const inputLastName = document.querySelector('#apellido')
const inputEmail = document.querySelector('#email')
const inputMensaje = document.querySelector('#mensaje')
const btnSubmit = document.querySelector('.button-group button[type="submit"]')
const btnReset = document.querySelector('.button-group button[type="reset"]')
const spinner = document.querySelector('#spinner')

// Variables
const emailObj = {
	nombre: '',
	apellido: '',
	email: '',
	mensaje: ''
}

// -> Funciones:
//
// -> LocalStorage
// Inicializar el carrito desde localStorage o como un array vacío
let cart = JSON.parse(localStorage.getItem('cart')) || []
// Funcion para guardar carrito en el localstorage
const saveCartToLocalStorage = () => {
	localStorage.setItem('cart', JSON.stringify(cart))
}
// localStorage.clear()
//
// -> Menu hamburguesa
//
// Función para manejar el menú hamburguesa
const handleMenuToggle = () => {
	menuNav.classList.toggle('menu-open')
	menuBtn.classList.toggle('menu-btn-active')
	if (cartMenu.style.display === 'flex') {
		cartMenu.style.display = 'none'
	}
}

// Función para manejar el cierre del menú al hacer clic en un enlace
const handleMenuItemClick = () => {
	menuNav.classList.remove('menu-open')
	menuBtn.classList.toggle('menu-btn-active')
}
//
// -> Productos
//
// Funcion crear template producto
const generateProductCardHTML = (product) => {
	const { id, title, price, offer, img } = product
	const finalPrice = offer
		? `Comprar ahora $${offer}`
		: `Comprar ahora $${price}`
	return `<div class="card">
		<img src="${img}" alt="${title}" />
		<h3>${title}</h3>
		<p>$${price}</p>
		<button class="card-btn" data-id="${id}" data-title="${title}" data-price="${price}"
			data-img="${img}" ${offer ? `data-offer="${offer}"` : ''}>
			    ${finalPrice}
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
//
// -> Formulario de contacto
//
// Funcion para validar el email
const validar = (e) => {
	const campo = e.target.id.toUpperCase()
	if (e.target.value.trim() === '') {
		if (e.target.id !== 'apellido') {
			mostrarAlerta(`El campo ${campo} es obligatorio`, e.target.parentElement)
			emailObj[e.target.name] = ''
			comprobarEmail()
		}
		return
	}
	if (e.target.id === 'email' && !validarEmail(e.target.value)) {
		mostrarAlerta('El email no es valido', e.target.parentElement)
		emailObj[e.target.name] = ''
		comprobarEmail()
		return
	}

	limpiarAlerta(e.target.parentElement)
	emailObj[e.target.name] = e.target.value.trim().toLowerCase()
	comprobarEmail()
}

// Funcion para mostrar alerta
const mostrarAlerta = (mensaje, referencia) => {
	limpiarAlerta(referencia)

	const alerta_vacio_parrafo = document.createElement('P')
	alerta_vacio_parrafo.textContent = mensaje
	alerta_vacio_parrafo.classList.add('empty-field-alert')
	referencia.appendChild(alerta_vacio_parrafo)
}

// Funcion para limpiar alerta
const limpiarAlerta = (referencia) => {
	const alerta = referencia.querySelector('.empty-field-alert')
	if (alerta) {
		alerta.remove()
	}
}

// Funcion para validar email
const validarEmail = (email) => {
	const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
	return regex.test(email)
}

// Funcion para comprobar email
const comprobarEmail = () => {
	if (
		emailObj.nombre === '' ||
		emailObj.email === '' ||
		emailObj.mensaje === ''
	) {
		btnSubmit.style.opacity = '0.5'
		btnSubmit.style.cursor = 'not-allowed'
		btnSubmit.disabled = true
		return
	}
	btnSubmit.style.opacity = '1'
	btnSubmit.style.cursor = 'pointer'
	btnSubmit.disabled = false
}

// Funcion para resetear el formulario
const resetForm = () => {
	emailObj.nombre = ''
	emailObj.apellido = ''
	emailObj.email = ''
	emailObj.mensaje = ''

	contactForm.reset()
	comprobarEmail()
}

// Funcion para enviar email
const enviarEmail = (e) => {
	e.preventDefault()
	spinner.style.display = 'flex'

	setTimeout(() => {
		spinner.style.display = 'none'

		resetForm()

		const alertaExito = document.createElement('P')
		alertaExito.classList.add('alerta-exito-enviar')
		alertaExito.textContent = 'Email enviado correctamente'
		contactForm.appendChild(alertaExito)

		setTimeout(() => {
			alertaExito.remove()
		}, 3000)
	}, 3000)
}
//
// -> Shopping cart
//
// Funcion para manejar el menú Carrito
const toggleShoppingCart = () => {
	if (cartMenu.style.display === 'none' || cartMenu.style.display === '') {
		cartMenu.style.display = 'flex'
	} else {
		cartMenu.style.display = 'none'
	}
	if (menuNav.classList.contains('menu-open')) {
		menuNav.classList.remove('menu-open')
	}
}

// Funcion para cerrar los Menus
const closeAnyMenu = (e) => {
	// Verifica si el clic no es dentro del header
	if (!header.contains(e.target)) {
		// Oculta el cartMenu si está visible
		if (cartMenu.style.display === 'flex') {
			cartMenu.style.display = 'none'
		}

		// Cierra el menú de navegación si está abierto
		if (menuNav.classList.contains('menu-open')) {
			menuNav.classList.remove('menu-open')
		}
	}
}
// Funcion que devuelve un template de los items del carrito
const createCartProductsTemplate = (cartProduct) => {
	const { id, title, price, offer, quantity, img } = cartProduct
	const finalPrice = offer !== null && offer !== undefined ? offer : price
	return `
	    <div class="cart-item" data-id="${id}">
      		 <img class="cart-item-img" src="${img}" alt="${title}">
     		 <div class="cart-item-info">
       			 <h3 class="cart-item-title">${title}</h3>
        		 <p class="cart-item-price">Precio: $${finalPrice}</p>
       			 <p class="cart-item-quantity">Cantidad: ${quantity}</p>
       			 <button class="remove-btn" data-id="${id}">Eliminar</button> 
				 <div class="cart-handler">
       			 	<span class="quantity-handler-down less-btn" data-id="${id}">-</span>
        			<span class="item-quantity">${quantity}</span>
       			 	<span class="quantity-handler-up plus-btn" data-id="${id}">+</span>
     		 	 </div>
     		 </div>
     		 
    	</div>`
}

// Funcion que renderiza los item del carrito
const renderCart = () => {
	if (!cart.length) {
		const emptyMessage = document.createElement('P')
		emptyMessage.classList.add('empty-cart-message')
		emptyMessage.textContent = 'Tu carrito está vacío'
		productsCart.appendChild(emptyMessage)
		return
	}
	productsCart.innerHTML = cart.map(createCartProductsTemplate).join('')
}

// Funcion que obtiene el total de la compra
const getCartTotalAmount = () => {
	return cart.reduce(
		(acc, curr) => acc + (curr.offer ? curr.offer : curr.price) * curr.quantity,
		0
	)
}
// Funcion que renderiza la cantidad total del carrito
const renderCartTotalAmount = () => {
	cartTotalAmount.innerHTML = `$${getCartTotalAmount().toFixed(2)}`
}

// Funcion que renderiza el contador del carrito
const renderCartCount = () => {
	cartCount.textContent = cart.reduce(
		(acc, curr) => acc + Number(curr.quantity),
		0
	)
}
//  Funcion que chequea el estado de los botones
const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add('disabled')
	} else {
		btn.classList.remove('disabled')
	}
}
// Funcion que actualiza el estado del carrito
const updateCartState = () => {
	saveCartToLocalStorage()
	renderCart()
	renderCartTotalAmount()
	disableBtn(buyCartBtn)
	disableBtn(emptyCartBtn)
	renderCartCount()
}

// Funcion para agregar al carrito
const addProductToCart = (e) => {
	if (!e.target.classList.contains('card-btn')) {
		return
	}
	const product = createProductData(e.target.dataset)
	if (isExistingCartProduct(product)) {
		addUnitToProduct(product) // Agrega una unidad
		showModalSuccess(`Se agregó una unidad del producto al carrito`)
	} else {
		createCartProduct(product) // Crea el producto
		showModalSuccess(`El producto se agregó al carrito`)
	}

	updateCartState() // Actualiza el estado del carrito
}
// Funcion para mostrar el modal
const showModalSuccess = (message) => {
	successMessage.classList.add('active-modal')
	successMessage.textContent = message

	setTimeout(() => {
		successMessage.classList.remove('active-modal')
	}, 2000)
}

// Funcion para crear el producto
const createCartProduct = (product) => {
	cart = [...cart, { ...product, quantity: 1 }]
}
// Funcion para agregar una unidad al producto
const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		if (cartProduct.id === product.id) {
			return { ...cartProduct, quantity: cartProduct.quantity + 1 }
		} else {
			return cartProduct
		}
	})
}
// Funcion para validar si el producto ya existe en el carrito
const isExistingCartProduct = (product) => {
	return cart.find((item) => item.id === product.id)
}
//
const createProductData = (product) => {
	const { id, title, price, offer, img } = product
	return {
		id,
		title,
		price: Number(price),
		offer: offer ? Number(offer) : null,
		img
	}
}
// Funcion para cambiar la cantidad del item
const handleQuantity = (e) => {
	if (e.target.classList.contains('less-btn')) {
		handleLessBtnEvent(e.target.dataset.id)
	} else if (e.target.classList.contains('plus-btn')) {
		handlePLusBtnEvent(e.target.dataset.id)
	}
	updateCartState()
}

// Funcion para manejar el boton del menos
const handleLessBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id)

	if (existingCartProduct.quantity === 1) {
		if (window.confirm('¿Deseas eliminar este item del carrito?')) {
			removeProductFromCart(existingCartProduct)
			if (!cart.length) {
				setTimeout(() => {
					location.reload()
				}, 1000)
			}
		}
		return
	}
	substractProductUnit(existingCartProduct)
}

const substractProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: product.quantity - 1 }
			: product
	})
}

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id)
	updateCartState()
}

const handlePLusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id)
	addUnitToProduct(existingCartProduct)
}

const resetCartItems = () => {
	cart = []
	updateCartState()
	setTimeout(() => {
		location.reload()
	}, 1000)
}
// Funcion para completa una accion en el carrito
const completeCartAction = (confirmMsg, successMsg) => {
	if (!cart.length) return

	if (window.confirm(confirmMsg)) {
		resetCartItems()
		alert(successMsg)
	}
}
const completeBuy = () => {
	completeCartAction('¿Deseas efectuar su compra?', 'Gracias por tu compra!')
}

const deleteCart = () => {
	completeCartAction('¿Deseas vaciar el carrito?', 'Carrito vaciado')
}

// Funcion Inicial
const initializeApp = () => {
	// document.addEventListener('click', closeAnyMenu)

	// Menú hamburguesa
	menuBtn.addEventListener('click', handleMenuToggle)
	menuNav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', handleMenuItemClick)
	})
	// Productos
	renderProductsToDOM(appState.products[0])
	showMoreCardsBtn.addEventListener('click', handleShowMoreProducts)
	categoriesContainer.addEventListener('click', applyFilter)

	// Validacion del formulario
	if (contactForm) {
		inputName.addEventListener('blur', validar)
		inputLastName.addEventListener('blur', validar)
		inputEmail.addEventListener('blur', validar)
		inputMensaje.addEventListener('input', validar)

		contactForm.addEventListener('submit', enviarEmail)
		btnReset.addEventListener('click', resetForm)
	}

	// Carrito de compras
	shoppingCart.addEventListener('click', toggleShoppingCart)
	document.addEventListener('DOMContentLoaded', renderCart)
	document.addEventListener('DOMContentLoaded', renderCartTotalAmount)
	disableBtn(buyCartBtn)
	disableBtn(emptyCartBtn)
	renderCartCount()
	productsContainer.addEventListener('click', addProductToCart)
	productsCart.addEventListener('click', handleQuantity)
	buyCartBtn.addEventListener('click', completeBuy)
	emptyCartBtn.addEventListener('click', deleteCart)
}

initializeApp()
