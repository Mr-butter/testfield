import React, { Fragment, useEffect, useState } from "react";
import GachaDappContract from "./contracts/GachaDapp.json";
import getWeb3 from "./getWeb3";

import "./App.css";

export default function App() {
    const [web3, setweb3] = useState(null);
    const [accounts, setaccounts] = useState(null);
    const [contract, setcontract] = useState(null);
    const [result, setresult] = useState([]);

    useEffect(async () => {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = GachaDappContract.networks[networkId];
        const instance = new web3.eth.Contract(GachaDappContract.abi, deployedNetwork && deployedNetwork.address);
        setweb3(web3);
        setaccounts(accounts);
        setcontract(instance);
    }, []);

    async function test() {
        console.log(await contract.methods.test().estimateGas({ from: accounts[0], value: 500 }));
        const gas = await contract.methods.test().estimateGas({ from: accounts[0], value: 500 });
        await contract.methods.test().send({ from: accounts[0], gas: gas, value: 500 });
    }

    return (
        <Fragment>
            <div>App</div>
            <button
                onClick={() => {
                    console.log(web3);
                    console.log(accounts);
                    console.log(contract);
                }}
            >
                버튼입니다.
            </button>
            <button onClick={() => test()}>뽑기버튼.</button>
        </Fragment>
    );
}
