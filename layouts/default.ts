import {Component, Vue} from "~/node_modules/nuxt-property-decorator";

@Component({
	data() {
		return {
			clipped:     false,
			drawer:      true,
			fixed:       false,
			items:       [
				{icon: 'apps', title: 'Welcome', to: '/'},
				{icon: 'bubble_chart', title: 'Inspire', to: '/inspire'}
			],
			miniVariant: false,
			right:       true,
			rightDrawer: false,
			title:       'Vuetify.js'
		};
	}
})
export default class extends Vue {

}
