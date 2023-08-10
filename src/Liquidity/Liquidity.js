import { motion } from "framer-motion";
import Head_Liq from "./Liquidity_page/Head_Liq";
import Main_liq from "./Liquidity_page/Main_liq";
import SwapButton from "./Liquidity_page/Components/SwapButton";

function liquidity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="liquidity_main"
    >
      <Head_Liq></Head_Liq>
      <Main_liq></Main_liq>
      <SwapButton></SwapButton>
    </motion.div>
  );
} // return liquidity page

export default liquidity;
