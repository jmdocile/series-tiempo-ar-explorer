import { ISeriesAxisSides, IYAxisConf, IYAxis } from "../../components/viewpage/graphic/Graphic";
import { getFullSerieId } from "../common/fullSerieID";
import { ISerie } from "../../api/Serie";
import SerieConfig from "../../api/SerieConfig";
import { formatterForSerie } from "../../components/viewpage/graphic/formatterForSerie";
import { valuesFromObject } from "../common/commonFunctions";

function isOutOfScale(originalSerieId: string, serieId: string, minAndMaxValues: {}): boolean {
    return minAndMaxValues[originalSerieId].min > minAndMaxValues[serieId].max ||
           minAndMaxValues[originalSerieId].max < minAndMaxValues[serieId].min;
}

function getYAxisSide(serieID:string, outOfScale: boolean, axisSideConf?: ISeriesAxisSides, ) {
    
    if (axisSideConf !== undefined && axisSideConf[serieID] !== undefined) {
        return axisSideConf[serieID];
    }
    if (outOfScale) {
        return 'right';
    }
    return 'left';

}

export function generateYAxisBySeries(series: ISerie[], seriesConfig: SerieConfig[], 
    formatUnits: boolean, locale: string, axisSides?: ISeriesAxisSides): {} {

    const minAndMaxValues = series.reduce((result: any, serie: ISerie) => {

        const fullId = getFullSerieId(serie);
        result[fullId] = { min: serie.minValue, max: serie.maxValue };

        return result;
    }, {});

    
    return series.slice().sort((serie: ISerie) => serie.minValue).reduce((result: IYAxisConf, serie: ISerie) => {

        const fullId = getFullSerieId(serie);
        const outOfScale = isOutOfScale(getFullSerieId(series[0]), fullId, minAndMaxValues);
        const yAxisSide = getYAxisSide(fullId, outOfScale, axisSides);

        result[fullId] = {
            opposite: yAxisSide === 'right' ? true : false,
            title: { text: serie.representationModeUnits }
        };

        const serieConfig = seriesConfig.find((config: SerieConfig) => config.getFullSerieId() === fullId);

        if (serieConfig && serieConfig.mustFormatUnits(formatUnits)) {
            result[fullId].labels = formatterForSerie(locale);
        }

        return result;
    }, {});
    
}

export function generateYAxisArray(yAxisBySeries: IYAxisConf) {

    const configs = valuesFromObject(yAxisBySeries);
    if (configs.length === 0) { return []}

    let leftAxis: IYAxis[] = [];
    let rightAxis: IYAxis[] = [];

    configs.forEach((config: IYAxis) => {
        config.opposite ? rightAxis.push(config) : leftAxis.push(config);
    });

    const leftAxisTitles = leftAxis.map((v:IYAxis)=> v.title.text);
    const rightAxisTitles = rightAxis.map((v:IYAxis)=> v.title.text);

    leftAxis = leftAxis.filter((item: IYAxis, pos: number) => leftAxisTitles.indexOf(item.title.text) === pos);
    rightAxis = rightAxis.filter((item: IYAxis, pos: number) => rightAxisTitles.indexOf(item.title.text) === pos);

    // Case where there are only right-sided axis
    if(leftAxis.length === 0) {
        rightAxis.forEach((rightConfig: IYAxis) => {
            const originalLabels = rightConfig.labels;
            rightConfig.labels = {
                ...originalLabels,
                align: 'left'
            }
        })
    }
    
    return leftAxis.concat(rightAxis);

}