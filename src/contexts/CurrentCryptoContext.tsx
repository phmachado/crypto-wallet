/* eslint-disable react/jsx-no-constructed-context-values */
import axios from "axios";
import { format, subDays, isSaturday, isSunday } from "date-fns";
import { createContext, ReactNode, useState, useEffect } from "react";

type Props = {
  children: ReactNode;
};

type CurrentCryptoContextType = {
  currentBtc: number | undefined;
  btcLastUpdate: number | undefined;
  currentBrita: number | undefined;
  britaLastUpdate: string | undefined;
};

const initialValue = {};

export const CurrentCryptoContext = createContext(
  initialValue as CurrentCryptoContextType
);

export function CurrentCryptoContextProvider({ children }: Props) {
  const [btc, setBtc] = useState<number>();
  const [btcLastUpdate, setBtcLastUpdate] = useState<number>();
  const [brita, setBrita] = useState<number>();
  const [britaLastUpdate, setBritaLastUpdate] = useState<string>();

  let queryDate = "";
  if (isSaturday(new Date())) {
    queryDate = format(subDays(new Date(), 1), "MM-dd-yyyy");
  }
  if (isSunday(new Date())) {
    queryDate = format(subDays(new Date(), 2), "MM-dd-yyyy");
  } else {
    queryDate = format(new Date(), "MM-dd-yyyy");
  }

  useEffect(() => {
    async function getBtc() {
      await axios
        .get("https://www.mercadobitcoin.net/api/BTC/ticker/")
        .then((res) => {
          setBtc(Number(res.data.ticker.last));
          setBtcLastUpdate(res.data.ticker.date);
        });
    }
    async function getBrita() {
      await axios
        .get(
          `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${queryDate}'&$top=100&$format=json`
        )
        .then((res) => {
          setBrita(res.data.value[0].cotacaoCompra);
          setBritaLastUpdate(res.data.value[0].dataHoraCotacao);
        });
    }
    getBtc();
    getBrita();
  }, []);

  return (
    <CurrentCryptoContext.Provider
      value={{
        currentBtc: btc,
        btcLastUpdate,
        currentBrita: brita,
        britaLastUpdate,
      }}
    >
      {children}
    </CurrentCryptoContext.Provider>
  );
}
