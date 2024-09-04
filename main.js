import { appState, productsData } from './src/js/data.js'

// Elementos relacionados con el menú hamburguesa
const menuBtn = document.querySelector('#menu-btn')
const menuNav = document.querySelector('#nav-menu')

// Elementos relacionados con el carrito
const shoppingCart = document.querySelector('.shopping-cart')
const cartMenu = document.querySelector('.cart-menu')

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

//  Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || []

// -> Funciones:

// Funcion para guardar carrito en el localstorage
const saveCartToLocalStorage = () => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

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

// Funciones para manejar el menú Carrito
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

// Funcion Inicial
const initializeApp = () => {
	document.addEventListener('click', closeAnyMenu)

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
}
initializeApp()
