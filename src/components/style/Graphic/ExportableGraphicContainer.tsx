import * as React from 'react';

export default (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) =>
    <div className="exportable-graph mg-xlg-b" {...props} style={{height: '100%'}}/>
