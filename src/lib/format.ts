/** Naira amount in the visitor's number format, e.g. ₦12,000 (en) or 12 000 ₦ (fr). */
export function naira(locale: string, amount: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}
