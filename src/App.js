import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import Voting from "./abis/Voting.json";

const App = () => {
    const [account, setAccount] = React.useState("");
    const [contract, setContract] = React.useState(null);
    const [web3, setWeb3] = React.useState(null);
    const [politicalParties, setPoliticalParties] = React.useState([]);

    React.useEffect(() => {
        startApp();

        return () => {
            if (web3) {
                web3.currentProvider.removeListener("accountsChanged");
                web3.currentProvider.removeListener("chainChanged");
            }
        };
    }, []);

    const startApp = async () => {
        // detect if there is an ethereum provider in the browser
        const provider = await detectEthereumProvider();

        if (provider) {
            // create a web3 instance
            const web3 = new Web3(provider);
            setWeb3(web3);

            // get the currenct network id
            const networkId = await web3.eth.net.getId();
            // load contract data for that netork id
            const contractData = Voting.networks[networkId];

            // check if the contract is deployed on that network
            if (contractData) {
                // create a contract instance
                const contract = new web3.eth.Contract(
                    Voting.abi,
                    contractData.address
                );

                // set contract as a state
                setContract(contract);
            } else {
                console.log("contract is not deployed on selected network");
            }

            // attach some callbacks for when account or chain is changed by user
            web3.currentProvider.on("accountsChanged", handleAccountsChanged);
            web3.currentProvider.on("chainChanged", handleChainChanged);
        } else {
            console.log(
                "non-ethereum browser detected, try installing metamask"
            );
        }
    };

    const loadBlockchainData = async (account) => {
        // check if the selected network id is valid for deployed contract
        if (contract) {
            // load blockchain data for the account
            const politicalParties = await contract.methods
                .getPoliticalParties()
                .call({ from: account });

            setPoliticalParties(politicalParties);
            console.log(politicalParties);
        }
    };

    const handleConnectWallet = () => {
        web3.currentProvider
            .request({ method: "eth_requestAccounts" })
            .then(handleAccountsChanged)
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            // set the first index account
            setAccount(accounts[0]);

            // load account data from blockchain
            loadBlockchainData(accounts[0]);
        } else {
            console.log("wallet is either locked or no accounts are present");
            setAccount(null);
        }
    };

    const handleChainChanged = (chainId) => {
        window.location.reload();
    };

    return (
        <div className="app">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "0 1rem",
                }}
            >
                <h3>Smart Voting</h3>
                {account ? (
                    <span>{account}</span>
                ) : (
                    <button
                        onClick={handleConnectWallet}
                        disabled={web3 ? false : true}
                    >
                        Connect wallet
                    </button>
                )}
            </div>
            <div style={{ textAlign: "center" }}>
                {contract ? (
                    account ? (
                        politicalParties?.map((party) => (
                            <div
                                key={`${party.symbol}`}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}
                            >
                                <p>{party.name}</p>
                                <p>{party.symbol}</p>
                            </div>
                        ))
                    ) : (
                        <p>please connect your wallet</p>
                    )
                ) : web3 ? (
                    <p>wrong network detected</p>
                ) : (
                    <p>
                        non-ethereum browser detected, try installing metamask
                    </p>
                )}
            </div>
        </div>
    );
};

export default App;
