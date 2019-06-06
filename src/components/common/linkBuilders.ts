export function formatUrl(url: string, format: string): string {
    return `${url}&format=${format}`
}

export function viewDatosGobAr(serieId: string): string {
    return `https://datos.gob.ar/series/api/series/?ids=${serieId}`
}

export interface IWebSnippetOptions {
    serieId: string,
    color: string,
    links: string
    hasChart: string,
    chartType:string,
}

export function webCode(options: IWebSnippetOptions): string {

    let htmlScript = "<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0/dist/js/components.js'></script>\n" +
    "<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0/dist/css/components.css'/>\n" +
    "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'> \n" +
    "<script src='https://code.jquery.com/jquery-3.4.1.min.js' integrity='sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=' crossorigin='anonymous'></script> \n" +
    "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' integrity='sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa' crossorigin='anonymous'></script> \n" +
    "<div id=\"root\"></div>\n" +
    "<script>\n" +
    "    window.onload = function() {\n" +
    "        TSComponents.Card.render('root', {\n" +
    "            serieId: '" + options.serieId + "',\n" +
    "            color: '" + options.color + "',\n" +
    "            links: '" + options.links + "',\n" +
    "            hasChart: '" + options.hasChart + "',\n"

    if(options.chartType !== undefined)
    {
        htmlScript += ("            chartType: '" + options.chartType + "',\n")
    }

    htmlScript += ("        })\n" +
    "    }\n" +
    "</script>\n")

    return htmlScript
}