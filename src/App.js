import React, { Component } from "react";
import axios from "axios";
import Nav from "./component/layout/Nav/Nav";
import Search from "./component/layout/Search/Search";
import Web3 from "aion-web3";

export default class App extends Component {
  state = {
    temp: "",
    humidity: "",
    waterPresure: "",
    pipeTemp: "",
    ctAddress:
      "0b2260914e069f3c38e1974bbdf0b7d7cfa3ecaf08622f917bed06f5d06cc194", //contract address,
    httpProvider:
      "wss://aion.api.nodesmith.io/v1/mastery/jsonrpc/ws?apiKey=3d43f91b0be047b790b7d45171eb26a0"
  };

  componentDidMount() {
    const url =
      "http://api.openweathermap.org/data/2.5/weather?id=6169141&APPID=5e44495b9cfe3a1b3fd292ac6f6596e1";

    axios
      .get(url)
      .then(function(response) {
        return response.data.main;
      })
      .then(data => {
        this.setState({
          humidity: data.humidity,
          waterPresure: data.pressure,
          temp: data.temp,
          pipeTemp: data.temp_max
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    setInterval(
      function() {
        if (window.aionweb3) {
          this.setState({
            aionweb3: window.aionweb3 //detect aiwa
          });
        }
      }.bind(this),
      1000
    );

    setInterval(this.getFunction, 1000);
  }

  // //send transaction to the smart contract
  // sendTransactionFunction = async mystring => {
  //   //set web3
  //   let web3 = new Web3(
  //     new Web3.providers.HttpProvider(this.state.httpProvider)
  //   );

  //   //set aiwa accouunt
  //   try {
  //     this.setState({
  //       account: window.aionweb3.account[0]
  //     });
  //   } catch (e) {
  //     console.error("no account for sending", e.message);
  //   }

  //   //the contract method you want to call
  //   let data = web3.avm.contract
  //     .method("setString")
  //     .inputs(["string"], [mystring])
  //     .encode();

  //   const txObject = {
  //     from: this.state.account,
  //     to: this.state.ctAddress,
  //     data: data,
  //     gas: 2000000,

  //     type: "0x1" //for any transaction except for java contract deployment
  //   };

  //   try {
  //     let txHash = await window.aionweb3
  //       .sendTransaction(txObject)
  //       .then(function(txHash) {
  //         console.log("txHash:", txHash);
  //       });

  //     setInterval(async function() {
  //       const receipt = await web3.eth
  //         .getTransactionReceipt(txHash)
  //         .then(console.log);
  //     }, 30000);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  componentWillUpdate(nextProps, nexState) {
    localStorage.setItem("tempUpdate", JSON.stringify(nexState.temp));
    localStorage.setItem("tempDate", Date.now);
  }

  render() {
    return (
      <div>
        <Nav />
        <Search />
      </div>
    );
  }
}
