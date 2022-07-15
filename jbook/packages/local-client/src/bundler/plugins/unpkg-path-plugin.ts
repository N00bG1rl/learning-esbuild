import * as esbuild from 'esbuild-wasm'

// import React from 'react';
// console.log(react);
// console.log('Hello world!');
// import 'bulma/css/bulma.css';
// import 'tiny-test-pkg';

// import React from 'react'
// import ReactDOM from 'react-dom'

// const App = () => <h1>Hey</h1>

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(<App />)

export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// Handle root entry file of 'index.js'
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' }
			})

			// Handle relative paths in a module
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
						.href,
				}
			})

			// Handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				}
			})
		},
	}
}
