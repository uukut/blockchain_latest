import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Add_Header from "./AddPosition_page/Add_Header";
import AddPair from "./AddPosition_page/AddPair";
import Web3 from "web3";

function AddPosition() {
  var btn_clicked = 0;
  const [chosen, setChosen] = useState(false);
  const [token_chosen] = useState([]);
  const [left_inp, setLeft_inp] = useState(0);
  const [swaping, setSwaping] = useState(false);
  const deadline = 1691700000;
  const data = [
    {
      key: 1,
      class: "TBNB_btn",
      icon: "https://etherscan.io/images/main/empty-token.png",
      name: "TBNB",
      apr: 3.498,
      createdby: "0x426...d86",
      date: "2023/06/30",
      describe: "TBNB",
      rate: 1,
      amount: 0,
      contract: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    },
    {
      key: 2,
      class: "KC_btn",
      icon: "data:image/jpeg;base64,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",
      name: "KC",
      apr: 1.229,
      createdby: "0x70f...ad6",
      date: "2023/07/28",
      describe: "KC Coin",
      rate: 0.0000244,
      amount: 0,
      contract: "0xb9A5FF83d379a9B566365639E6d63157A2c9ab92",
    },
    {
      key: 3,
      class: "KC2022_btn",
      icon: "data:image/jpeg;base64,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",
      name: "KC 2022",
      apr: 1.229,
      createdby: "0x70f...ad6",
      date: "2023/07/28",
      describe: "KC 2022 Coin",
      rate: 0.00000001,
      amount: 0,
      contract: "0x5CD8Eae7dfee1F448c88f5B1CBce16612CFBcd75",
    },
    {
      key: 4,
      class: "KC2023_btn",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR1GB6fdbutDKG4fwjaS7t9bacrso2tlEx4axK6oUHtVgZsYAURIYrK-N7Ch8KwhjrxM&usqp=CAU",
      name: "KC 2023",
      apr: 2.752,
      createdby: "0xfb7...d8e",
      date: "2023/06/30",
      describe: "KC 2023 Coin",
      rate: 0.0000000002,
      amount: 0,
      contract: "0x353796176b83D076330D182F40Ebb2f1d0e99687",
    },
    {
      key: 5,
      class: "BUSD_btn",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEXywCT////xvADyvxv//vryvx/yvhT///3yvgz99+b546b//ff213z54Jv324rzwyz99N3203L77MX66br++/D43pX0yEX55a3++u3324vzxDL1zVj32YL779Pzxjr10GT202/44aD87sn0yk3768b66b71zVX202n66K/20nb88dj66Lb77c70ykP203xDzRUaAAAOjUlEQVR4nNWd6YKiOhCFgXRicHcad8VttKfR7vd/vMviAiSBSlKo9/ydaeTwka0qVBy3YQX+cH357K22m0MYDpxUYXg4fXV77b/R0A9aDd+A0+TF1//G35vJgnucEUKp8xClhDDm8cHP8nv8b99p8CaacdiaRcfuD+ecsaIzQYlTzr3wa7r2Pxq5lyYcRu3fJeGs0plglPPJqPengbtBdtjy/3YHLCan4e7hMv67r/MQ+ZVFdRicf3/02AkifLBtDzFvCs+h/2fjMDt7V5OMHNp4jRLL4WX+45m8mgqTfPD9iXRnKA796YFg0MuJMhKOUd5WBIfr3YTj2ruZHPT3b+Aw6lJkfHmPZHO07VotHe7nhDVkLxPhm+kLHQ67DftLPbLTp03HauFwPWfN+0s98q1FezR2GIyd5/hLPdKtcb9q6vAcNtJ/KsUGO8Mux8xhdCJP9eck/erkbLSUNHEYjCne9AUuwromr6qBw8upsQGwRiyc6veq2g47Y/4KgJmot/Wbdhgtn9eDykTCc6MOW23yOoCZKF/pdapaDjujp3ehErFl1JTD/eS1b+hNxNGZqmo4PC9e/YbeRMkY/qaCHXbm3hu8oTd5ywDbYfD9Hm/oTeQEbYxAh/7PexmMLZILpsNo8i5N8CG6gI2MIIfrF05j1KJeD8vhZfFGfUxeFGIR4PD4Tp1oUd68fkFV73DqvK3BuL/p2zucvi/BRF6/jmKdw/3grQ3GFOd2Di/YBOkC93oxxV41xWqH6xDZIAnXIw/3kg7dmTuMsONpZOK7rS724OpVDv1VDmcn5HshYRJK6mBTpIuqCVyFw84S2+AkC7KgU6SkInpT4XDFce8jI5g+u29kiuSkXkypHfYaItgIRbZRhhmVDvfYj3mSD+d2usiXV8/CVQ4j5HGChMWm0vrGfkVUeX+Fw84Gd8VbJNgERTpQhPwVDue4vUyZYEpxhEuRbeTRKbnDI+6PiwSboMjkM1SpwwB3uk0W8uEKmyKXbouTOWxtURuhnGBKcYVKMT8eVTtsoz5aFcEGniXrSpYZEocR6qJeTbABip5kyJA4/MJ8rmRQnfDDpUgnM4DDM+Y7Wk0w0Qfq9Jet6h0GmJOZOoIpRdR3hgk7bwSHfcRHWk8wpYg5DSen8rhfdnhBHAohBGMFW8x2wcq5xZLD1gjvlSEH0OaQDu7OAFp+rCWHZ7x3FEoQ8ZmmKnc2RYcfeDkmcgAZ7CyRIwnxYF7MLBYdfuIZVC1mygSxDcY/vSrMbAoOfbSRAkgwQCeYyFsrHe6wmgSQYKcBgsmvf6kczrAQyif5TyKY/H5+GZV3iLWmMCaIteWR5VtizmFwwPkBY4J0sUGy6OW605zDT5x3hixMCXrHjy3OYop1pQ5xWiGYYLlXo4M/eKFi+uhOHw5xok82BNN/wKHIdqLDD5RNT1CCQjg2JZgIhyL9ud/H3eEQ4bq55IsZwewfMSjy+xLj7rCPgNCC4PHxzygUyUFwiLArCEpwKxIsRDpRKN63vd0cIkRngARn1QSxKN4j4FeHrZX1SwokGNQRTCnaB/zpYVZw6Fu/pLLki4ygEHcSCCJRvD23q8Op7TODBZ1gBHEo3lYYV4e2uy5wCaYU7dM2HzmHM1uDQIJfQIIoFNk553Bq189ACQoRfDqo+CbdliLrPxy2fq0cmhOUZ/xusqRIs+eeOrSLz1Slz6oJOjVVBVp2sWJ+uTvc26wMoQQ3mgQT2VHMBv3Uoc1wT2EEA32CiVpbi7eLLu4ObYb7xbr6Hq8wRIIEVIxmdrC4Nza7OvSt+hkxYydKDN2DCMZa2dxaOl4kDv9ZOfT6tV+uGhP86Fv1pmlDTByOLUfDOooSgso9WkWt7EZEsglSh4FtDM9bVVIUky+UwgjabmOgSdAodji0DrJVUnwZQScbEWOHa/v4RQVFCUHnOQRjsXHqcIoQCVZSDL4Fg+xZBJOGmDr8wgjfKSi+lGAsljo0aYZiXSEpRUnYkJsSNKoB5wWJQ4OHRQ5TYR4koYhJkO9M4p3x1Ndxh/rNMEmfHYXdb8J3ZLLAL4xgX+DFx+6HsPqqF2vHDo/af5eFDS+CRa9boChJnw1gBMUVRRrCNggIxrMax23r/tktAfpZTbEj9qI2BFPr2mkb9hs7nGs6fAR+KymiE3RNKJJl4Oh+FpBPn1VQrEy+mBFML6tJkU58R3NWWgzdKykqEqB2BDOKWrcbz0wdvSVmOQH6KWz0Syk2RDClqJe2IZGjFYUSky8iRd5tVSRAq9XqCh07L+811Av487UzHGgYlCRfZG1RjMlACQodSYmgNkXv6ETwJyJPn4kUhTpEytB9mU49wez/we+ZT501eMBXpc+OdZtuK0L3hRsHEUyk8f0iGzsX6H9WJ0Brvmi3INhW/l8oRTZ3oPuEqgK/lRQtCKrLXoBDxaTrANe/1cmX/UD5TMEEBYNMRTD9/8CJCtk4sGlpXej+qLLYCMFEQIpQh/XpMwXFyvRZTpoE04cCSr7FDiG7ZiHJF2lbBBL8ED/yqCGYCESRnhzA0oKCEqB7seIFNHQvEiR1BBNBKNIDxCHZQm4zmJQhAtJniWQEd5A/dHf1E87YISSkz7r1BeB8oQIDmKBAgsAMQrqQ2CGop+Gjujo3s5MwF2WmyRcgwR6kiCNdAkeLuoKTvriaaJ4gZFEU96XAEZ+PqrIvs4OYm3gHgqlD6KyNVySYJJvx6FsQjC83cv5CZ95qisELCEJLGcfz0jV4IaKiKCFonD5joDJ6YILp2kIjt8ZHsu4mEOq2WoTuIQO9BsFk8udEYIMJRXHQeAVBjVq//FMvEiVSDISyn+9E0HG8i+MLk61Ki6WqBRKC5ukzfILxDUdOoFfvqkgRlSCs/HFPr8LaYOjo7nHkuU+KzAnWBn5V0iOYfFmin5l5UJyJBHFC92r1NFOBZDlz9PcL3ShKItu26bM6aX8hSbYdxz1rpx35NqH4PyB4zZDCQ8KPv+vKCSIlX1Ta6e9ViPtnx20Z7FTgo6E4k3k/gvGlj8leDJOCOyQUVvRvSDC+9jBxaLRxT4jJQAnCki+iNMfBq7IdQ5abLzODmOkzmXZG507Qn9QhODdTcSW8BKjCoFmt2KQKSLL70rokDZAgPH1WFjBkISgZn2OHM9tKrObJl2YJxoqyXdCWH8iiJ0DLMiXo0KT+SOJQe1dU8TLm6bOmCbJfN3Not0kYStAk+ZLIohZu+lV++kWJTZE9AjtlwiB9lqltsYOZrW8ObXYJ02/Abb6EYHxv7s2hVf0rDkjbvIRgusv76tBuRKxN25glQBMZ96KpslE6ddix/M6vhqIkdA8laGPwWlk4+0q2ZzciVlK0Sb5Y3RXJwi2Zw73lrKaKYuPJF5WuTf36tbptwQFl2qbx9Jla12L7V4fWlU1UKdSXEbxXN7k6HFqvEaUUn5A+U9/QtOCwY/9pkCz5Jobun0UwnqYNCw4tZ9+phLTNk5IvcpHbA785xCiiVKb4hASoWvf58r3GEMYXbAWKLyXo0MVtiL47/ItRjy6ffHtS+kyhR5H9u0PNLJtCd4qvJRjrvtfwUZEOp7TnjaJIEDjZRiHosO97l/Bw2ME5AzClaEEQ54gp+ijrnaubKC7ijJQk356VAFWJho9L5hz6SCcG8O5Tky/SW8jlMXMOESqaZRJPtm4qAaq6gUPu+Kd8DVr74LdCTyZYPDeoUCkZu3j4VU2mz2SiYX5uVax23ciBnM8mWDrHo+BQEni3V6PpM5nIobACKNZkH+Kfi9toAlSq0ra60skBmKdbpHo6wRhhcYVTchj84EIEp88Qf7L09Uv5BA/kk5CeEfgt/WT5RCThFBasouHpr21rS0hlBPEMUqEWteDQYAORWrUlpLAJOt6ufHnxNKQ55nvK6wuBYRKUHKQjcTjDO6fEKdZ/VxBE/DXZ7lbJmV171GG/hqJV+kz8McnYJDtZDndmU0kR9zjXwpqiyuEM6RiIq7j6EHu79FlZdCAc2KVwiH2OLFf1qMgH8nrSQyzlp3RibHXLSUERl6BDltLkkNwh9oHVUorIBKmi5IPiLNkh8kpRQhEjdF/4iX9yK6oTjz+Rl1ECRdSZjOwH6hy6Y+R1VIkiNkG2UZ09rj55HPlU5+JDttwaIajiGDu1Qx93VEwoNkaQLmQjYZ1D/ODi/eM+pOTLQ17F5roKh5LCgZa6UkQK3eeuW7XQrnLonpEPsc8oohOUffgJdIjeISQU0QkycU0Id+jusCmSH4ptUPp1Mtiha1BRs1rYAVkW1mz+rHOIe+QyvtQjPdSh+yHUU38n1RIEOMSqWdyI6glCHMq+p3sTsUm9QYhD7HARmup6UQ2Hbs9rKDtsI28DMQh06J7VJedeJTYGpQygDt0/i/eySD1Y0gfu0B3iHoFuKRKCvkXScujONu/TpbLJpf6GtR3ih1aMxUaAUcLEoftn8A5vKuE9WB9j4FBStOwFBifqiIW9Q7fT817bp1JvCzpBy9ih666bOhAdJBae66r/WTt0O2OjszQwRPkGdMabpUPXjSbYkRaYWDjVBWjo0O3syPN7HOJ1NVughcMY45e4ibRRUXb4YwDQ3KHrfi6fuN6gLGyDFhKYDt1OO3xSc6RsoTOJQXMYj//jxRM8Uuas9HtQHIeuG6ya9kjZ4Ms3a4AoDuMVx3iBm40v+bPjh+Ew9ribNNSvErbY2vHDcRhrOuL4Lyvhy51p/5kXikP3I+rHTxxzBx5ztn/N+8+8cBzGCo7dAcd5W+PWt53aNr+70BzGIP3piTBLkpQwEvaGGK/nVYgOE82mq4l5m6TMC0dtNHqZkB26bsuP5gfGmGZMJ2bH2KK79xHpZUJ3mKpz7I0mjge0SRln4df8bLR0qFUzDt2kVUaf/RP1OEuAEiHzSyklMTfOPXJYTSPMlldUYw6v6qzPu/nvZjkJBw7j3lWMDMLJafPbH//bzxq+g6YdZuoEvj+M1g9Fw6E/awxbQf8BwLDuIs0gcksAAAAASUVORK5CYII=",
      name: "BUSD",
      apr: 2.151,
      createdby: "0xd50...697",
      date: "2023/07/28",
      describe: "Binance USD",
      rate: 0.000001,
      amount: 0,
      contract: "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814",
    },
  ]; //virtual data set, no api for now
  const ABI = require("../abi.json");
  const contract_address = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";

  const swap = () => {
    setSwaping(!swaping);
  }; // swap the rate and pool supply

  function Close() {
    document.querySelector(".token_added_div").style.transition = "hidden 0.5s";
    document.querySelector(".center_div").style.transition = "hidden 0.5s";
    document.querySelector(".token_added_div").style.visibility = "hidden";
    document.querySelector(".center_div").style.visibility = "hidden";
    document.querySelector("body").style.overflowY = "scroll";
  } // Close the UI once user finish changing

  function Generate() {
    return data.map((items, index) => {
      return (
        <div className="token_choice_div">
          <button
            id={items.name}
            onClick={() => {
              document.getElementById(items.name).disabled = "disabled";
              document.getElementById(items.name).style.pointerEvents = "none";
              btn_clicked++;
              token_chosen.push(index);
              if (btn_clicked === 2) {
                Close();
                btn_clicked = 0;
                setChosen(true);
              }
            }}
          >
            <div className="button_choice_div">
              <div>
                <div>
                  <img src={items.icon} alt="icon"></img>
                  {items.name} - {items.describe}
                </div>
              </div>
              <div>{items.amount}</div>
            </div>
          </button>
        </div>
      );
    });
  } // generate the tokens for the user to choose

  function ChangeHandler(event) {
    setLeft_inp(event.target.value);
  }

  function ChooseTokenLeft() {
    return (
      <div className="detail_div">
        <div>
          <div style={{ textAlign: "center" }}>
            <img
              className="token_icon"
              alt="token"
              src={data[token_chosen[0]].icon}
            ></img>
            {data[token_chosen[0]].name}
          </div>
          <div>
            <input
              className="user_input"
              id="left_input"
              placeholder="0"
              value={left_inp}
              autoComplete="off"
              onChange={(event) => ChangeHandler(event)}
            ></input>
          </div>
        </div>
        <div>
          <div>{data[token_chosen[0]].describe}</div>
          <div>$ {(data[token_chosen[0]].rate * left_inp).toFixed(2)}</div>
        </div>
      </div>
    );
  } // generate left token chosen by the user

  function ChooseTokenRight() {
    return (
      <div className="detail_div">
        <div>
          <div style={{ textAlign: "center" }}>
            <img
              className="token_icon"
              alt="token"
              src={data[token_chosen[1]].icon}
            ></img>
            {data[token_chosen[1]].name}
          </div>
          <div>
            <input
              className="user_input"
              id="left_input"
              placeholder="0"
              autoComplete="off"
              defaultValue={(
                (left_inp * data[token_chosen[0]].rate) /
                data[token_chosen[1]].rate
              ).toFixed(2)}
            ></input>
          </div>
        </div>
        <div>
          <div>{data[token_chosen[1]].describe}</div>
          <div>$ {(data[token_chosen[0]].rate * left_inp).toFixed(2)}</div>
        </div>
      </div>
    );
  } // generate right token chosen by the user

  async function Apply() {
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    const contract_used = new web3.eth.Contract(ABI, contract_address, {
      from: your_acc,
      gasPrice: "30000",
      gas: "50000",
    });
    const TokenB = data[token_chosen[1]].contract; // no problem
    const AmountB = web3.utils.toWei(
      (
        (left_inp * data[token_chosen[0]].rate) /
        data[token_chosen[1]].rate
      ).toFixed(0),
      "ether"
    ); // no problem
    await contract_used.methods
      .addLiquidityETH(
        TokenB,
        web3.utils.toWei(String(AmountB), "ether"),
        web3.utils.toWei(String(AmountB), "ether"),
        0,
        your_acc,
        deadline
      )
      .call()
      .catch((err) => {
        console.log(err);
        alert("Not enough WBNB for transaction");
      });
    console.log(contract_used);
    console.log("Token Address: ", TokenB);
    console.log("Amount Transfer: ", AmountB, " in Wei");
    console.log("Your account: ", your_acc);
  }

  function TokenDetail() {
    return (
      <div className="tk_detail">
        <div className="tk_detail_inner_div">
          <div>APR</div>
          <div>
            {(data[token_chosen[0]].apr / data[token_chosen[1]].apr).toFixed(7)}
            %
          </div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Rate</div>
          <div style={{ display: "flex" }}>
            <div id="left_token">
              1{" "}
              {!swaping
                ? data[token_chosen[0]].name
                : data[token_chosen[1]].name}
            </div>
            <button>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpimXJzajN4wt4YpHVbFdUTtYFeN8qhi74JQ&usqp=CAU"
                alt="none"
                onClick={() => swap()}
              ></img>
            </button>
            <div id="right_token">
              {swaping
                ? (
                    data[token_chosen[1]].rate / data[token_chosen[0]].rate
                  ).toFixed(4)
                : (
                    data[token_chosen[0]].rate / data[token_chosen[1]].rate
                  ).toFixed(4)}{" "}
              {swaping
                ? data[token_chosen[0]].name
                : data[token_chosen[1]].name}
            </div>
          </div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Slippage Tolerance</div>
          <div>
            <select defaultValue={0.5}>
              <option>0.1%</option>
              <option value={0.5}>0.5%</option>
              <option>1%</option>
              <option>1.5%</option>
            </select>
          </div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Created By</div> <div>You</div>
        </div>
        <div className="tk_detail_inner_div">
          <div>Created At</div> <div>{new Date().toLocaleDateString()}</div>
        </div>
        <div className="apply_div">
          <div>
            <Link to="/Liquidity">
              <button className="apply_button" onClick={() => Apply()}>
                Apply
              </button>
            </Link>
          </div>
          <div>
            <Link to="/Liquidity">
              <button className="cancel_button">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } // generate the tokens detail

  function PairDetail() {
    return (
      <>
        {chosen ? (
          <div style={{ display: "block" }}>
            <div className="chosen_token">
              <ChooseTokenLeft></ChooseTokenLeft>
              <ChooseTokenRight></ChooseTokenRight>
            </div>
          </div>
        ) : null}
      </>
    );
  } // print the tokens detail to UI

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main position_main"
    >
      <div className="add_main">
        <Add_Header></Add_Header>
        <div className="main_add">{!chosen ? <AddPair></AddPair> : <></>}</div>
        <div>{chosen ? <PairDetail></PairDetail> : <></>}</div>
        <div className="container_tk">
          {chosen ? <TokenDetail></TokenDetail> : <></>}
        </div>
      </div>
      <div>
        <div className="center_div">
          <div className="center_inner_div">
            <div>Add Token pairs</div>
            <div>
              <button onClick={() => Close()}> X </button>
            </div>
          </div>
          <Generate></Generate>
        </div>
        <div className="token_added_div"></div>
      </div>
    </motion.div>
  ); // return the UI of Add position
}

export default AddPosition;
