import {Component, Vue} from "~/node_modules/nuxt-property-decorator";

/**
 * Главная.
 */
@Component
export default class extends Vue {

    /** @field Показать окно с игрой. */
    protected showGameCanvas: boolean = false;
}
