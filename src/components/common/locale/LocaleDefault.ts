export interface ILocale {
    toLocaleString: (value: number) => string;
    decimalSeparator: () => string;
    thousandSeparator: () => string;
    toDecimalString: (value: number, decimals?: number) => string;
}

export default class LocaleDefault implements ILocale {

    public toLocaleString(value: number): string {
        return value.toLocaleString('es-AR');
    }

    public decimalSeparator(): string {
        return ',';
    }

    public thousandSeparator(): string {
        return '.';
    }

    public toDecimalString(value: number, decimals: number = 2): string {
        const decimalFixedValue = value.toFixed(decimals);
        return decimalFixedValue.replace(".", this.decimalSeparator());
    }

}
