import * as React from 'react';

import Filters from '../../style/Filters/Filters';
import FilterTitle from '../../style/Filters/FilterTitle';

import { ISerieApi } from '../../../api/SerieApi';
import FilterSources from '../../common/filters/filtersources/FilterSources';
import FilterThemes from '../../common/filters/filterthemes/FilterThemes';
import { ISelectorProps } from '../../common/selector/Selector';
import FilterSubTitle from '../../style/Filters/FilterSubTitle';

interface IFilterProps {

    seriesApi: ISerieApi;
    onSourcePicked: (event: React.MouseEvent<HTMLElement>, source: string) => void;
    onThemePicked: (event: React.MouseEvent<HTMLElement>, theme: string) => void;
    selector: React.ComponentClass<ISelectorProps<string>>;
}

function SeriesFilters(props: IFilterProps) {

    const Selector = props.selector
    return (

        <Filters>
            <FilterTitle>Filtros:</FilterTitle>
            <FilterSources labelWraper={FilterSubTitle} selector={Selector} seriesApi={props.seriesApi} onSourcePicked={props.onSourcePicked} />
            <FilterThemes labelWraper={FilterSubTitle} selector={Selector} seriesApi={props.seriesApi} onThemePicked={props.onThemePicked} />
        </Filters>
    );
};

export default SeriesFilters