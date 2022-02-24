import axios from "axios";
import { format, subDays } from "date-fns";
import { createContext, ReactNode, useState, useEffect, useMemo } from "react";

import { CURRENT_BTC, CURRENT_BRITA } from "../utils";

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

export function CurrentCryptoContextProvider({ children }: Props): JSX.Element {
  const [btc, setBtc] = useState<number>();
  const [btcLastUpdate, setBtcLastUpdate] = useState<number>();
  const [brita, setBrita] = useState<number>();
  const [britaLastUpdate, setBritaLastUpdate] = useState<string>();

  // Data a ser aplicada na url referente ao valor da Brita
  const britaQueryDate = format(subDays(new Date(), 2), "MM-dd-yyyy");

  // Salvando os valores atuais do BTC e Brita
  useEffect(() => {
    async function getBtc() {
      try {
        await axios.get(CURRENT_BTC).then((res) => {
          setBtc(Number(res.data.ticker.last));
          setBtcLastUpdate(res.data.ticker.date);
        });
      } catch (err) {
        console.log(err);
      }
    }
    async function getBrita() {
      try {
        await axios.get(CURRENT_BRITA(britaQueryDate)).then((res) => {
          setBrita(res.data.value[0].cotacaoCompra);
          setBritaLastUpdate(res.data.value[0].dataHoraCotacao);
        });
      } catch (err) {
        console.log(err);
      }
    }
    getBtc();
    getBrita();
  }, []);

  const value = useMemo(
    () => ({
      currentBtc: btc,
      btcLastUpdate,
      currentBrita: brita,
      britaLastUpdate,
    }),
    [btc, brita, btcLastUpdate, britaLastUpdate]
  );

  return (
    <CurrentCryptoContext.Provider value={value}>
      {children}
    </CurrentCryptoContext.Provider>
  );
}
