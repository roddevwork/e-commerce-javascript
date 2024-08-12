import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	root: '.', // La raíz del proyecto es el directorio actual
	build: {
		outDir: 'dist', // El directorio de salida para la construcción
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html')
			}
		}
	},
	server: {
		port: 3000 // El puerto que usará el servidor de desarrollo
	}
})
