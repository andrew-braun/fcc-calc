/** @type {import("snowpack").SnowpackUserConfig } */
;(module.exports = {
	mount: {
		public: "/",
		src: "/dist",
	},
	plugins: [
		"@snowpack/plugin-react-refresh",
		"@snowpack/plugin-sass",
		"@snowpack/plugin-webpack",
	],

	routes: [
		/* Enable an SPA Fallback in development: */
		// {"match": "routes", "src": ".*", "dest": "/index.html"},
	],
	optimize: {
		/* Example: Bundle your final build: */
		// "bundle": true,
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		out: "docs",
		baseUrl: "/fcc-calc/",
	},
}),
	{
		optimize: {
			bundle: true,
			minify: true,
			target: "es2018",
		},
	}
