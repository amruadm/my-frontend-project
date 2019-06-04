import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import RegisterForm from "~/components/register-form";

@Component({
	components: {
		RegisterForm,
	},
})
export default class extends Vue {

	/** Состояние модала окна регистрации. */
	protected registerModalState: boolean = false;
}
