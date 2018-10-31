import { Action } from "redux";
import { IDateRange } from "../api/DateSerie";
import { ISerie } from "../api/Serie";
import { ISerieApi } from "../api/SerieApi";
import actionTypes from "./actionTypes";

export interface ISeriesAction extends Action<string> {
    series: ISerie[];
}

export interface IDateAction extends Action<string> {
    date: IDateRange;
}

export interface IUnitFormat extends Action<string> {
    formatChartUnits: boolean;
}


export function loadFeatured(series: ISerie[]): ISeriesAction {
    return { type: actionTypes.LOAD_FEATURED, series };
}

export function clearViewSeries(): ISeriesAction {
    return { type: actionTypes.CLEAR_VIEW_SERIES, series: []};
}

export function loadViewSeries(series: ISerie[]): ISeriesAction {
    return { type: actionTypes.LOAD_VIEW_SERIES, series };
}

export function setDate(date: IDateRange): IDateAction {
    return { type: actionTypes.LOAD_DATE, date };
}

export interface ISerieApiAction extends Action<string> {
    seriesApi: ISerieApi;
}

export function setSeriesApi(seriesApi: ISerieApi): ISerieApiAction {
    return { type: actionTypes.SET_SERIES_API, seriesApi };
}

export function setFormatChartUnits(formatChartUnits: boolean): IUnitFormat {
    return { type: actionTypes.SET_UNIT_FORMAT, formatChartUnits };
}
