import ITsResponse from './ITsResponse'
import Serie from "./Serie";


export default class SerieApi {

    public static rp = require('request-promise-native');

    private seriesUri: string;

    constructor(seriesUri: string) {
        this.seriesUri = seriesUri;
    }

    public getSeries(ids: string[]): Promise<Serie[]> {
        const options = {
            json: true, // Automatically parses the JSON string in the response
            qs: {
                ids: ids.toString(), // -> uri + '?ids=xxxxx%20xxxxx'
                // metadata: 'only',
            },
            uri: this.seriesUri,
        };

        return SerieApi.rp(options).then((json: ITsResponse) => beautify(ids, json));
    }
}

function beautify(ids: string[], json: ITsResponse): Serie[] {
    return ids.map(
        (_, index) => new Serie(index, json)
    );
}
