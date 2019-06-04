const nodeExternals       = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const hasDevMode = (process.env.NODE_ENV !== 'production');

let apiBaseUrl = 'http://54.202.75.76:3003/api/';
if (hasDevMode) {
	apiBaseUrl = 'http://127.0.0.1:8080/api/';
}

export default {
	env:     {
		apiBaseUrl: apiBaseUrl,
		dev: hasDevMode,
	},
	head:    {
		title: "my-frontend-project",
		meta:  [
			{charset: "utf-8"},
			{name: "viewport", content: "width=device-width, initial-scale=1"},
			{hid: "description", name: "description", content: "Nuxt.js TypeScript project"}
		],
		link:  [
			{rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
			{rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'},
		]
	},
	loading: {color: "#3B8070"},
	css:     ["~/assets/styles/main.styl"],
	build:   {
		transpile:  [/^vuetify/],
		plugins:    [
			new VuetifyLoaderPlugin()
		],
		extractCSS: true,
		extend(config: any, ctx: any) {
			if (process.server) {
				config.externals = [
					nodeExternals({
						whitelist: [/^vuetify/]
					})
				]
			}
		}
	},
	modules: [
		"@nuxtjs/axios",
	],
	plugins: [
		{src: '~plugins/vuetify.ts', ssr: true},
	],
	router:  [],
	axios:   {}
}
