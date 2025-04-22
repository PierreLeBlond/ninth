import { defineConfig } from 'vite';
import nodeExternals from 'rollup-plugin-node-externals';

export default defineConfig({
	plugins: [nodeExternals()],
	build: {
		outDir: './build',
		emptyOutDir: false,
		lib: {
			entry: './src/ws/server.ts',
			name: 'server',
			formats: ['es'],
			fileName: () => 'server.js'
		}
	}
});
