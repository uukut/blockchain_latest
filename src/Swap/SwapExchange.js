import { useState } from "react";

function SwapExchange(props) {
  const money_set = [
    {
      name: "WBNB",
      no: 0,
      balance: 0,
      price: 1 + Number(localStorage.getItem("WBNB")),
    },
    {
      name: "USDT",
      no: 0,
      balance: 0,
      price: 1867 + Number(localStorage.getItem("USDT")),
    },
    {
      name: "WETH",
      no: 0,
      balance: 0,
      price: 1 + Number(localStorage.getItem("WETH")),
    },
    {
      name: "TSWAP",
      no: 0,
      balance: 0,
      price: 243 + Number(localStorage.getItem("TSWAP")),
    },
  ]; //local virtual data of the token
  const [left_index, setLeft_index] = useState(0);
  const [right_index, setRight_index] = useState(1);
  const [swap, setSwap] = useState(false);
  const [ava_data, setAva_data] = useState([]);
  const [left, setLeft] = useState(false);
  const [leftContent, setLeftContent] = useState(0);
  const [rightContent, setRightContent] = useState(0);
  const [rate, setRate] = useState(0);
  const data = [
    {
      key: 1,
      name: "WBNB",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png",
      id: 0,
      element: "WBNB_data",
      describe: "Wrapped BNB",
      no: 0,
    },
    {
      key: 2,
      name: "USDT",
      id: 1,
      element: "USDT_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      describe: "Tether USD",
      no: 0,
    },
    {
      key: 3,
      name: "WETH",
      id: 2,
      element: "WETH_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
      describe: "Wrapped Ether",
      no: 0,
    },
    {
      key: 4,
      name: "TSWAP",
      element: "TSWAP",
      icon: "https://s2.coinmarketcap.com/static/cloud/img/dex/default-icon-day.svg?_=f3bc762",
      id: 3,
      describe: "TSWAP",
      no: 0,
    },
  ]; //local pre-assigned tokens
  const [trade, setTrade] = useState(false);

  const Reset = () => {
    setSwap(swap);
  }; // reset data once refresh button is clicked

  const TokenAdd = (side) => {
    document.querySelector(".token_added_div").style.transition =
      "visibility 0.25s";
    document.querySelector(".token_added_div").style.visibility = "visible";
    document.querySelector(".center_div").style.transition = "visibility 0.25s";
    document.querySelector(".center_div").style.visibility = "visible";
    side ? setLeft(true) : setLeft(false);
  }; //pop a UI for adding tokens

  function Generate() {
    while (ava_data.length) {
      ava_data.pop();
    }
    for (var i = 0; i < data.length; i++) {
      if (i !== left_index && i !== right_index) {
        ava_data.push(data[i]);
      }
    }

    return ava_data.map((items) => {
      return (
        <div className="token_choice_div">
          <button
            id={items.element}
            onClick={() => {
              Close();
              left ? setLeft_index(items.id) : setRight_index(items.id);
            }}
          >
            <div className="button_choice_div">
              <div>
                <div>
                  <img src={items.icon} alt="icon"></img>
                  {items.name} - {items.describe}
                </div>
              </div>
              <div>{items.no}</div>
            </div>
          </button>
        </div>
      );
    });
  } // Generate the inner token choices

  function Close() {
    document.querySelector(".token_added_div").style.visibility = "hidden";
    document.querySelector(".center_div").style.visibility = "hidden";
  } // Close the UI once user finish changing

  function Generateleft() {
    var price = money_set[left_index].price;
    return (
      <div className="inner_swap">
        <div className="swap_label_div">
          <div>
            <label>Payment</label>
          </div>
          <div>
            <button
              className="change_btn"
              onClick={() => TokenAdd(true)}
            ></button>
          </div>
        </div>
        <div className="swap_exchange_div">
          <div className="exchange">
            <div className="inner_exchange">
              <img
                src={data[left_index].icon}
                height={"30px"}
                width={"30px"}
                alt=""
              ></img>
              {money_set[left_index].name}
            </div>
            <div>
              <input
                className="inner_input"
                id="left"
                placeholder={money_set[left_index].no}
                value={leftContent}
                onChange={(event) => {
                  handleChange(event, true);
                }}
              ></input>
            </div>
          </div>
          <div className="exchange">
            <div>balance: {money_set[left_index].balance}</div>
            <div>~ ${(price * leftContent).toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  } // Generate left token div

  function GenerateRight() {
    var price = money_set[right_index].price;
    return (
      <div className="inner_swap">
        <div className="swap_label_div">
          <div>
            <label>Payment</label>
          </div>
          <div>
            <button
              className="change_btn"
              onClick={() => TokenAdd(false)}
            ></button>
          </div>
        </div>
        <div className="swap_exchange_div">
          <div className="exchange">
            <div className="inner_exchange">
              <img
                src={data[right_index].icon}
                height={"30px"}
                width={"30px"}
                alt=""
              ></img>
              {money_set[right_index].name}
            </div>
            <div>
              <input
                className="inner_input"
                id="right"
                placeholder={money_set[right_index].no}
                value={rightContent}
                onChange={(event) => {
                  handleChange(event, false);
                }}
              ></input>
            </div>
          </div>
          <div className="exchange">
            <div>balance: {money_set[right_index].balance}</div>
            <div>~ ${(price * rightContent).toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  } // Gnereate right token div

  function swaping() {
    var temp = left_index;
    setLeft_index(right_index);
    setRight_index(temp);
    temp = leftContent;
    setLeftContent(rightContent);
    setRightContent(temp);
  } // Change two token div

  function switching() {
    setSwap(!swap);
  } // switch the tokens

  function Trade() {
    !swap
      ? setRate(rightContent / leftContent)
      : setRate(leftContent / rightContent);
    return (
      <div className="trade_info">
        <div>
          <h3>Trade Details</h3>
        </div>
        <div className="trade_content">
          <div className="trade_element">
            <div>Max slippage</div>
            <div>
              <select defaultValue={0.5}>
                <option>0.1%</option>
                <option value={0.5}>0.5%</option>
                <option>1%</option>
                <option>1.5%</option>
              </select>
            </div>
          </div>
          <div className="trade_element">
            <div>LP Fee</div>
            <div>Less than $0.0000001</div>
          </div>
          <div className="trade_element">
            <div>Rate</div>
            <div className="trade_rate">
              <div className="left_token">
                <div style={{ marginRight: "5px" }}>1</div>
                <div>
                  {!swap ? (
                    <div>{data[left_index].name}</div>
                  ) : (
                    <div>{data[right_index].name}</div>
                  )}
                </div>
              </div>
              <button>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpimXJzajN4wt4YpHVbFdUTtYFeN8qhi74JQ&usqp=CAU"
                  alt="none"
                  onClick={() => switching()}
                ></img>
              </button>
              <div className="right_token">
                <div style={{ marginRight: "5px" }}>
                  {rate ? rate.toFixed(4) : rate}
                </div>
                <div>
                  {swap ? (
                    <div>{data[left_index].name}</div>
                  ) : (
                    <div>{data[right_index].name}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="trade_element">
            <div>Minimum Receive</div>
            <div className="receiving">
              {!swap ? (
                <>
                  {Math.floor(rightContent)}
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[right_index].icon}
                    alt=""
                  ></img>
                </>
              ) : (
                <>
                  {Math.floor(leftContent)}
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[left_index].icon}
                    alt=""
                  ></img>
                </>
              )}
            </div>
          </div>
          <div className="trade_element">
            <div>Price impact</div>
            <div className="special">
              0.01%
              {!swap ? (
                <>
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[right_index].icon}
                    alt=""
                  ></img>
                </>
              ) : (
                <>
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[left_index].icon}
                    alt=""
                  ></img>
                </>
              )}
            </div>
          </div>
          <div className="trade_element">
            <div>Fee</div> <div>$0</div>
          </div>
        </div>
        <div className="trade_details">
          <button
            onClick={() => {
              setTrade(false);
            }}
          >
            <div>&#8592; Trade Details</div>
          </button>
        </div>
      </div>
    );
  } // return the details of the tokens

  function handleChange(event, left) {
    var result;
    if (swap || true) {
      if (left) {
        setLeftContent(event.target.value);
        result = (
          (
            document.getElementById("left").value * money_set[left_index].price
          ).toFixed(2) / money_set[right_index].price
        ).toFixed(2);
        setRightContent(result);
      } else {
        setRightContent(event.target.value);
        result = (
          (
            document.getElementById("right").value *
            money_set[right_index].price
          ).toFixed(2) / money_set[left_index].price
        ).toFixed(2);
        setLeftContent(result);
      }
      if (left) {
        setLeftContent(event.target.value);
        result = (
          (
            document.getElementById("left").value * money_set[left_index].price
          ).toFixed(2) / money_set[right_index].price
        ).toFixed(2);
        setRightContent(result);
      } else {
        setRightContent(event.target.value);
        result = (
          (
            document.getElementById("right").value *
            money_set[right_index].price
          ).toFixed(2) / money_set[left_index].price
        ).toFixed(2);
        setLeftContent(result);
      }
    } // handle the input chnages
  } // handle the input change of the amount of the tokens

  return (
    <div className="main_trade">
      <Reset></Reset>
      {!trade ? (
        <div>
          <div className="swap_label">
            <div className="inner_swap_container">
              <Generateleft></Generateleft>
            </div>
            <div className="convert_div">
              <button className="swap_btn" onClick={() => swaping()}>
                <img
                  title="swap"
                  className="convert"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1svB9Ngre0z1T_L1A13Ncgmc3r1YtE3tVQ&usqp=CAU"
                  alt="converter"
                ></img>
              </button>
            </div>
            <div className="inner_swap_container">
              <GenerateRight></GenerateRight>
            </div>
          </div>
          <div className="Trade">
            <button
              onClick={() => {
                setTrade(true);
              }}
            >
              Trade Details &#8594;
            </button>
            <div className="hr_div">
              <hr></hr>
            </div>
          </div>
        </div>
      ) : (
        <Trade></Trade>
      )}
      <div className="center_div">
        <div className="center_inner_div">
          <div>Change Tokens</div>
          <div>
            <button onClick={() => Close()}>X</button>
          </div>
        </div>
        <Generate></Generate>
      </div>
      <div className="token_added_div"></div>
    </div>
  ); //return the two tokens div
}
export default SwapExchange;
