import { IPublisher, ITSMeta } from "./ITSAPIResponse";
import { ISerie } from "./Serie";
import {PeriodicityParser} from "./utils/periodicityParser";


export default class SearchResult implements ISerie {

    private periodicityParser: PeriodicityParser;

    constructor(private searchResult: ITSMeta) {
        this.periodicityParser = new PeriodicityParser(this.searchResult.field.frequency);
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

    public get fieldPeriodicity() {
        return this.periodicityParser.formattedPeriodicity();
    }
}
