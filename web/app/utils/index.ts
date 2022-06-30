const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return formatter.format(amount); /* $2,500.00 */
}

export function deslug(slug: string) {
  return slug
    .replace("-", " ")
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
