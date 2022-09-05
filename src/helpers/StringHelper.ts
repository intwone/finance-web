export class StringHelper {
  static getFirstName(completeName: string) {
    return completeName.split(' ')[0];
  }

  static onlyNumbers(value: string) {
    return value.replace(/\D/g, '');
  }

  static formatValueToRealCurrency = (value: string) => {
    const number = this.onlyNumbers(value);

    return (Number(number) / 100)
      .toFixed(2)
      .replace('.', ',')
      .split('')
      .reverse()
      .map((v, i) => (i > 5 && (i + 6) % 3 === 0 ? `${v}.` : v))
      .reverse()
      .join('');
  };

  static currencyMask = (value: string) => {
    const number = this.formatValueToRealCurrency(value);
    if (!number || Number(number) === 0) return '';
    return number;
  };

  static removeMask = (value: string) => {
    const valorFormatted = value.replace(/\./g, '').replace(/\,/g, '.');
    return parseFloat(valorFormatted);
  };
}
