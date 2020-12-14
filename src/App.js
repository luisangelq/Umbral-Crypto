import { useState, useEffect } from "react";

import Image from "./cryptomonedas.png";
import Form from "./components/Form";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";
import Axios from "axios";

function App() {
  const [coin, saveCoin] = useState("");
  const [crypto, saveCrypto] = useState("");
  const [result, saveResult] = useState({});
  const [loading, saveLoading] = useState(false);

  useEffect(() => {
    const quoteCrypto = async () => {
      //we avoid the first execution
      if (coin === "") return;

      //consult api to get quote
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

      const result = await Axios.get(url);

      //Show Spinner
      saveLoading(true);

      setTimeout(() => {
        saveLoading(false);

        saveResult(result.data.DISPLAY[crypto][coin]);
      }, 2000);
    };
    quoteCrypto();
  }, [coin, crypto]);

  return (
    <div className="App">
      <div>
        <img src={Image} alt="imageCrypto" />
      </div>
      <div>
        <h1>Cotiza Criptomonedas</h1>

        <Form saveCoin={saveCoin} saveCrypto={saveCrypto} />

        {loading ? <Spinner /> : <Quote result={result} />}
      </div>
    </div>
  );
}

export default App;
