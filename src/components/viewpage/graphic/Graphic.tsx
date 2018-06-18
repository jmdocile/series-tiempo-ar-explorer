
import * as React from 'react';
import { IHConfig, IHCSeries, ReactHighcharts } from './highcharts';


import IDataPoint from '../../../api/DataPoint';
import { ISerie } from '../../../api/Serie';


interface IGraphicProps {
    series: ISerie[];
}

export class Graphic extends React.Component<IGraphicProps, any> {

    public render() {
        return (
            <ReactHighcharts config={this.highchartsConfig()} />
        );
    }

    public highchartsConfig() {
        return ({

            title: {
                text: '',
            },

            xAxis: {
                categories: this.categories(),
            },

            series: this.seriesValues(),

        });
    }


    public categories() {
        return (
            this.props.series.map(
                (serie: ISerie) => serie.data.map(
                    (datapoint: IDataPoint) => datapoint.date))
            [0]
            || []
        );
    }

    public seriesValues(): IHCSeries[] {
        return this.props.series.map((serie) => this.hcSerieFromISerie(serie, {}));
    }

    public hcSerieFromISerie(serie: ISerie, hcConfig: IHConfig): IHCSeries {
        const data = serie.data.map(datapoint => datapoint.value);
        return { ...this.defaultHCSeriesConfig(), ...hcConfig, name: serie.title, data }

    }

    /**
     * color: https://api.highcharts.com/highcharts/series.line.color
     * dashStyle: https://api.highcharts.com/highcharts/series.line.dashStyle
     * lineWidth: https://api.highcharts.com/highcharts/series.line.lineWidth
     * type: https://api.highcharts.com/highcharts/series.line.type
     *
     */
    public defaultHCSeriesConfig() {
        return {
            color: '#7CB5EC',
            dashStyle: 'Solid',
            lineWidth: 2,
            type: 'line',
        }
    }

}

export default Graphic;
