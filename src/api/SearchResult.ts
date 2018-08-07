import { IPublisher, ITSMeta } from "./ITSAPIResponse";
import { ISerie } from "./Serie";


export default class SearchResult implements ISerie {

    constructor(private searchResult: ITSMeta) {

    }

    public get id(): string {
        return this.searchResult.field.id;
    }

    public get title(): string {
        return this.searchResult.field.description;
    }

    public get publisher(): IPublisher {
        return this.searchResult.dataset.publisher;
    }

    public get description(): string {
        return this.searchResult.dataset.title;
    }

    public get data() {
        return [];
    }

    public get accrualPeriodicity() {
        return this.searchResult.dataset.accrualPeriodicity;
    }

    public get startDate() {
        return this.searchResult.field.start_date;
    }

    public get endDate() {
        return this.searchResult.field.end_date;
    }

    public get units() {
        return this.searchResult.field.units;
    }

    public get landingPage() {
        return "";
    }

    public get issued() {
        return "";
    }

    public get themes() {
        return [];
    }

    public get modified() {
        return "";
    }

    public get datasetSource() {
        return this.searchResult.dataset.source;
    }
}
