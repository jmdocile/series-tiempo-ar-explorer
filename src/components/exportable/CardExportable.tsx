import * as React from 'react';
import QueryParams from '../../api/QueryParams';
import { ISerie } from '../../api/Serie';
import SerieApi from '../../api/SerieApi';
import { ICardExportableConfig } from '../../indexCard';
import FullCard from '../exportable_card/FullCard';


export interface ICardExportableProps extends ICardExportableConfig {
    seriesApi: SerieApi;
}

interface ICardExportableState {
    serie: ISerie | null;
}

export default class CardExportable extends React.Component<ICardExportableProps, ICardExportableState> {

    public constructor(props: any) {
        super(props);

        this.state = {
            serie: null,
        }
    }

    public componentDidMount() {
        const params = new QueryParams([this.props.serieId]);
        params.setLast(1);
        this.fetchSeries(params);
    }

    public render() {
        if (!this.state.serie) { return null }

        return <FullCard serie={this.state.serie} {...this.cardOptions()}/>
    }

    private cardOptions() {
        return {
            cardOptions: {
                chartType: this.props.chartType,
                color: this.props.color,
                hasChart: this.props.hasChart,
                links: this.props.links,
                locale: this.props.locale            
            },
            downloadUrl: this.getDownloadUrl()
        }
    }

    private fetchSeries(params: QueryParams) {
        this.props.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({ serie: series[0] }))
            .catch((error: any) => alert("Ocurrió un error buscando la serie solicitada."));
    }

    private getDownloadUrl(): string {
        const params = new QueryParams([this.props.serieId]);
        params.setLast(5000);
        return this.props.seriesApi.downloadDataURL(params)
    }
}
