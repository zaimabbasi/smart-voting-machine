import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

import { Error, Loading, Main, Navbar } from "./components";
import Voting from "./abis/Voting.json";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [account, setAccount] = React.useState(null);
    const [contract, setContract] = React.useState(null);
    const [web3, setWeb3] = React.useState(null);

    React.useEffect(() => {
        startApp();

        return () => {
            web3?.currentProvider.removeListener(
                "accountsChanged",
                handleAccountsChanged
            );
            web3?.currentProvider.removeListener(
                "chainChanged",
                handleChainChanged
            );
        };
    }, []);

    const startApp = async () => {
        const provider = await detectEthereumProvider();

        if (provider) {
            const web3 = new Web3(provider);
            setWeb3(web3);

            const networkId = await web3.eth.net.getId();
            const contractData = Voting.networks[networkId];

            if (contractData) {
                const contract = new web3.eth.Contract(
                    Voting.abi,
                    contractData.address
                );

                setContract(contract);
            } else {
                console.log("contract is not deployed on selected network");
            }

            web3.currentProvider.on("accountsChanged", handleAccountsChanged);
            web3.currentProvider.on("chainChanged", handleChainChanged);
        } else {
            console.log(
                "non-ethereum browser detected, try installing metamask"
            );
        }

        setIsLoading(false);
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
            setAccount(accounts[0]);
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
            <Navbar
                account={account}
                handleConnectWallet={handleConnectWallet}
            />
            {isLoading ? (
                <Loading />
            ) : contract ? (
                <Main account={account} contract={contract} />
            ) : (
                <Error
                    message={
                        web3
                            ? "contract is not deployed on selected network"
                            : "non-ethereum browser detected, try installing metamask"
                    }
                />
            )}
        </div>
    );
};

export default App;
