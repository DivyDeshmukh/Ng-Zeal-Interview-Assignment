import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'money', pure: true })
export class MoneyPipe implements PipeTransform {
  transform(value: number | string | null | undefined, currency: string = 'INR'): string {

    if (value == null) return '-';

    // convrt  strings to number
    const n = typeof value === 'string' ? Number(value) : value;

    if (Number.isNaN(n)) return '-';

    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n);
    } catch {
      return `${currency} ${n.toFixed(2)}`;
    }
  }
}
