// URLs referentes ao valor do BTC e Brita
export const CURRENT_BTC = "https://www.mercadobitcoin.net/api/BTC/ticker/";
export const CURRENT_BRITA = (britaQueryDate: string): string =>
  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${britaQueryDate}'&$top=100&$format=json`;

// Função que retorna o valor formatado para R$
export function formatReal(real: number): string {
  return real.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Função que retorna o valor formatado para BTC
export function formatBtc(btc: number): string {
  return btc.toFixed(8);
}

// Função que retorna o valor formatado para B$
export function formatBrita(brita: number): string {
  return brita.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Função que retorna o valor BTC em R$
export function btcToReal(btc: number, currentBtcInReal: number): number {
  return btc * currentBtcInReal;
}

// Função que retorna o valor B$ em R$
export function britaToReal(brita: number, currentBritaInReal: number): number {
  return brita * currentBritaInReal;
}
