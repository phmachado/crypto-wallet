export function formatReal(real: number): string {
  return real.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatBtc(btc: number): string {
  return btc.toFixed(8);
}

export function formatBrita(brita: number): string {
  return brita.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
