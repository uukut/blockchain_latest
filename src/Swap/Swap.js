import { useState } from "react";
import SwapExchange from "./SwapExchange";
import { motion } from "framer-motion";
import Swap_Label from "./Swap_page/Components/Swap_Label";
import RefreshImg from "./Swap_page/Components/RefreshImg";
import LiquidityButton from "./Swap_page/Components/LiquidityButton";

function Swap() {
  const [refresh, setRefresh] = useState(1);
  const fakeData = () => {
    localStorage.setItem("TSWAP", ((Math.random() - 0.5) / 10).toFixed(2));
    localStorage.setItem("WETH", ((Math.random() - 0.5) / 10).toFixed(2));
    localStorage.setItem("USDT", ((Math.random() - 0.5) / 10).toFixed(2));
    localStorage.setItem("WBNB", ((Math.random() - 0.5) / 10).toFixed(2));
  }; // fake data of the tokens set to local storage to make them alive

  fakeData(); // run fake data

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main"
    >
      <div className="swap_main">
        <div className="main_header">
          <Swap_Label></Swap_Label>
          <div className="refresh_div">
            <button
              className="refresh_btn"
              onClick={() => setRefresh(refresh + 1)}
            >
              <RefreshImg></RefreshImg>
            </button>
          </div>
        </div>
        <SwapExchange props={refresh}></SwapExchange>
      </div>
      <LiquidityButton></LiquidityButton>
    </motion.div>
  );
} // return the sub-title of Swap

export default Swap;
