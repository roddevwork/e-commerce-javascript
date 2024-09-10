import gtaOnline from '../assets/img/cards/1-grand-theft-auto-online.jpeg'
import MarvelAvengers from '../assets/img/cards/2-Marvels-Avengers-DE.jpeg'
import noManSky from '../assets/img/cards/3-No-Mans-Sky.jpeg'
import Valheim from '../assets/img/cards/4-Valheim.jpeg'
import MortalKombat from '../assets/img/cards/5-Mortal-Kombat-11-Ultimate.jpeg'
import Stray from '../assets/img/cards/6-Stray.jpeg'
import Fifa23 from '../assets/img/cards/7-Fifa2023.jpeg'
import ForzaHorizonte from '../assets/img/cards/8-ForzaHorizon5.jpeg'
import JurassicWorld from '../assets/img/cards/9-JurassicWorld.jpeg'
import Dirt5 from '../assets/img/cards/10-Dirt5.jpeg'
import StreetsOfRage4 from '../assets/img/cards/11-StreetsOfRage4.jpeg'
import footballManager2024 from '../assets/img/cards/12-footballManager2024.jpeg'
import HotWheelsUnleashed2 from '../assets/img/cards/13-HotWheelsUnleashed2.jpeg'
import NickelodeonAllStarBrawl2 from '../assets/img/cards/14-NickelodeonAllStarBrawl2.jpeg'
import ageOfMythologyRetold from '../assets/img/cards/15-ageOfMythologyRetold.jpeg'
import solastraLightbringers from '../assets/img/cards/16-solastraLightbringers.jpeg'

export const productsData = [
	{
		id: 1,
		title: 'Grand Theft Auto Online',
		img: gtaOnline,
		price: 2000,
		offer: 1500,
		editor: 'Rockstar Games',
		public: 'Rockstar Games',
		lanzamiento: '15/3/2022',
		category: ['accion', 'aventuras', 'coperativo', 'multijugador']
	},
	{
		id: 2,
		title: "Marvel's Avengers-DE",
		img: MarvelAvengers,
		price: 3000,
		offer: 2000,
		editor: 'Crystal Dynamics, Eidos-Montréal',
		public: 'Crystal Dynamics',
		lanzamiento: '4/9/2020',
		category: [
			'accion',
			'aventuras',
			'coperativo',
			'multijugador ',
			'rol',
			'lucha'
		]
	},
	{
		id: 3,
		title: "No Man's Sky",
		img: noManSky,
		price: 1000,
		offer: 700,
		editor: 'Hello Games',
		public: 'Hello Games',
		lanzamiento: '23/7/2018',
		category: ['accion', 'aventuras', 'coperativo', 'multijugador ', 'rol']
	},
	{
		id: 4,
		title: 'Valheim',
		img: Valheim,
		price: 1000,
		offer: 700,
		editor: 'Iron Gate',
		public: 'Coffee Stain Publishing',
		lanzamiento: '16/9/2022',
		category: ['accion', 'aventuras', 'coperativo', 'multijugador ', 'rol']
	},
	{
		id: 5,
		title: 'Mortal Kombat 11 Ultimate',
		img: MortalKombat,
		price: 1000,
		offer: 700,
		editor: 'NetherRealm Studios',
		public: 'Warner Bros. Games',
		lanzamiento: '22/4/2019',
		category: ['lucha', 'multijugador']
	},
	{
		id: 6,
		title: 'Stray',
		img: Stray,
		price: 3600,
		offer: 2300,
		editor: 'BlueTwelve Studio',
		public: 'Annapurna Interactive',
		lanzamiento: '10/8/2023',
		category: ['aventuras', 'estrategia']
	},
	{
		id: 7,
		title: 'Fifa 23',
		img: Fifa23,
		price: 7900,
		offer: 5900,
		editor: 'EA Canada',
		public: 'Electronic Arts',
		lanzamiento: '30/9/2022',
		category: ['simuladores', 'deportes', 'futbol']
	},
	{
		id: 8,
		title: 'Forza Horizonte 5',
		img: ForzaHorizonte,
		price: 11900,
		offer: 9900,
		editor: 'Playground Games',
		public: 'Xbox Game Studios',
		lanzamiento: '9/11/2021',
		category: ['aventuras', 'carreras', 'simuladores', 'deportes'],
		description:
			'Explora los vibrantes paisajes del mundo abierto de México con acción de conducción ilimitada en cientos de los mejores autos del mundo. Aventúrate en un mundo en constante evolución con desafíos que cambian cada semana y disfruta de Horizon Arcade, eventos de juego cooperativo que te permiten sumergirte en la diversión sin menús ni pantallas de carga.'
	},
	{
		id: 9,
		title: 'Jurassic World Evolution 2',
		img: JurassicWorld,
		price: 6500,
		offer: 5100,
		editor: 'Frontier Developments',
		public: 'Frontier Developments',
		lanzamiento: '9/11/2021',
		category: ['simuladores', 'estrategia', 'aventuras']
	},
	{
		id: 10,
		title: 'DIRT 5',
		img: Dirt5,
		price: 999,
		offer: 700,
		editor: 'Codemasters',
		public: 'Codemasters',
		lanzamiento: '5/11/2020',
		category: ['aventuras', 'carreras', 'deportes']
	},
	{
		id: 11,
		title: 'Streets of Rage 4',
		img: StreetsOfRage4,
		price: 899,
		offer: 690,
		editor: 'Dotemu',
		public: 'Dotemu',
		lanzamiento: '30/4/2020',
		category: ['coperativo', 'multijugador', 'lucha']
	},
	{
		id: 12,
		title: 'Football Manager 2024',
		img: footballManager2024,
		price: 2999,
		offer: 1500,
		editor: 'Sports Interactive',
		public: 'SEGA',
		lanzamiento: '6/11/2023',
		category: ['coperativo', 'multijugador', 'deportes', 'futbol']
	},
	{
		id: 13,
		title: 'Hot Wheels Unleashed 2',
		img: HotWheelsUnleashed2,
		price: 1999,
		offer: 999,
		editor: 'Milestone',
		public: 'Milestone',
		lanzamiento: '19/10/2023',
		category: ['multijugador', 'aventuras', 'deportes', 'carreras']
	},
	{
		id: 14,
		title: 'Nickelodeon All-Star Brawl 2',
		img: NickelodeonAllStarBrawl2,
		price: 1999,
		offer: 1399,
		editor: 'Fair Play Labs',
		public: 'GameMill Entertainment',
		lanzamiento: '13/11/2023',
		category: ['coperativo', 'multijugador', 'deportes', 'futbol']
	},
	{
		id: 15,
		title: 'Age Of Mythology Retold',
		img: ageOfMythologyRetold,
		price: 5999,
		offer: 3999,
		editor: 'Worlds Edge',
		public: 'Xbox Game Studios',
		lanzamiento: '4/9/2024',
		category: ['aventuras', , 'multijugador', 'rol', 'estrategia']
	},
	{
		id: 16,
		title: 'Solastra Lightbringers',
		img: solastraLightbringers,
		price: 6999,
		offer: 4999,
		editor: 'Tactical Adventures',
		public: 'Tactical Adventures',
		lanzamiento: '26/5/2023',
		category: ['aventuras', 'coperativo', 'multijugador', 'rol', 'estrategia']
	}
]

// -> Paginado de la renderizacion:

// Funcion para el paginado
// / Dividir el array de productos en subarrays de un tamaño específico
const divideProductsInParts = (size) => {
	let productsList = []
	for (let i = 0; i < productsData.length; i += size) {
		productsList.push(productsData.slice(i, i + size))
	}
	return productsList
}

// Estado de la aplicacion
export const appState = {
	products: divideProductsInParts(4),
	productsLimit: divideProductsInParts(4).length,
	currentProductsIndex: 0,
	activeFilter: null
}
