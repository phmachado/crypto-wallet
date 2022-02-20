/* eslint-disable react/jsx-no-constructed-context-values */
import axios from "axios";
import { format, subDays, isSaturday, isSunday } from "date-fns";
import { createContext, ReactNode, useState, useEffect } from "react";

type Props = {
  children: ReactNode;
};

type DashboardContextType = {
  btc: string | undefined;
  btcLastUpdate: number | undefined;
  brita: number | undefined;
  britaLastUpdate: string | undefined;
  realToBtc: (real: number) => number;
  realToBrita: (real: number) => number;
};

const initialValue = {};

export const DashboardContext = createContext(
  initialValue as DashboardContextType
);

export function DashboardContextProvider({ children }: Props) {
  const [btc, setBtc] = useState<string>();
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
          setBtc(res.data.ticker.last);
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

  function realToBtc(real: number): number {
    return real / Number(btc);
  }
  function realToBrita(real: number): number {
    return real / Number(brita);
  }

  return (
    <DashboardContext.Provider
      value={{
        btc,
        btcLastUpdate,
        brita,
        britaLastUpdate,
        realToBtc,
        realToBrita,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
