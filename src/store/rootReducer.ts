import {combineReducers} from 'redux';
import searchParams from '../components/common/searcher/SearcherReducer';
import featured from '../components/mainpage/featured/FeaturedReducer';
import date from "../components/viewpage/DateReducer";
import viewSeries from '../components/viewpage/ViewPageReducer';
import formatUnits from "../FormatUnitsReducer";
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({
    date,
    featured,
    formatUnits,
    searchParams,
    seriesApi,
    viewSeries,
});

export default rootReducer;