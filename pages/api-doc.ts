import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import {SwaggerUIBundle} from "swagger-ui-dist"

/**
 * Страница документации Swagger.
 */
@Component
export default class extends Vue {

    protected readonly rootElementId: string = 'api-doc';

    protected swaggerUi: object | null = null;

    /**
     * @inheritDoc
     */
    public mounted() {
        this.swaggerUi = SwaggerUIBundle({
            url: 'http://localhost:8080/api/doc.json',
            dom_id: '#' + this.rootElementId,
        });
    }
}