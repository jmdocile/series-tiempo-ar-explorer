import * as React from 'react';

import { Color, NaC } from '../style/Colors/Color';
import Tag from '../style/Tag/Tag';
import TagContainer from '../style/Tag/TagContainer';

import { ISerie } from '../../api/Serie';


interface ISeriesTagsProps extends React.Props<any> {

    series: ISerie[];
    onTagClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void;
    pegColorFor?: (serie: ISerie) => Color;
}

export default (props: ISeriesTagsProps) =>

    <div className="col-xs-8 col-sm-10">
        <TagContainer>
            {props.series.map(serie =>
                <Tag key={serie.id} pegColor={props.pegColorFor ? props.pegColorFor(serie) : NaC} onClose={getOnCloseFor(props.series, serie.id, props.onTagClose)}>
                    {serie.title}
                </Tag>
            )}
        </TagContainer>
    </div>


function closeHandler(serieId: string, onTagClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void): React.MouseEventHandler<HTMLButtonElement> {
    return (event: React.MouseEvent<HTMLButtonElement>) => onTagClose(event, serieId)
}

function getOnCloseFor(series: ISerie[], serieId: string, onTanClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void) {
    let fn;
    if (series.length > 1) {
        fn = closeHandler(serieId, onTanClose);
    }

    return fn;
}