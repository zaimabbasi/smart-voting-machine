import React from "react";
import { Box, Container, Typography } from "@mui/material";

import ElectionTable from "./ElectionTable";
import Timer from "./Timer";

const Main = ({ account, contract }) => {
    const [nowTime, setNowTime] = React.useState(null);
    const [citizenVote, setCitizenVote] = React.useState(0);
    const [politicalParties, setPoliticalParties] = React.useState([]);
    const [electionResults, setElectionResults] = React.useState([]);
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    React.useEffect(() => {
        if (contract) {
            getPoliticalParties();
            getStartTime();
            getEndTime();
        }
    }, [contract]);

    React.useEffect(() => {
        if (account && contract) getCitizenVote();
    }, [account, contract]);

    const getPoliticalParties = async () => {
        await contract.methods
            .getPoliticalParties()
            .call()
            .then((response) => {
                console.log("getPoliticalParties: ", response);
                setPoliticalParties(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getStartTime = async () => {
        await contract.methods
            .startTime()
            .call()
            .then((response) => {
                const startTime = new Date(response * 1000);
                console.log("startTime: ", startTime);
                setStartTime(startTime);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getEndTime = async () => {
        await contract.methods
            .endTime()
            .call()
            .then((response) => {
                const endTime = new Date(response * 1000);
                console.log("endTime: ", endTime);
                setEndTime(endTime);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCitizenVote = async () => {
        await contract.methods
            .getCitizenVote()
            .call({ from: account })
            .then((response) => {
                console.log("getCitizenVote: ", response);
                setCitizenVote(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getElectionResults = async () => {
        await contract.methods
            .getResults()
            .call()
            .then((response) => {
                console.log("getResults: ", response);
                setElectionResults(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleVote = async (partyId) => {
        console.log("handleVote: ", partyId);
        await contract.methods
            .vote(partyId)
            .send({ from: account })
            .then((response) => {
                console.log("vote: ", response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const canVote = () => {
        return (
            account &&
            citizenVote === "0" &&
            nowTime >= startTime &&
            nowTime < endTime
        );
    };

    return (
        <Box mt={3}>
            <Container>
                <Timer
                    startTime={startTime}
                    endTime={endTime}
                    nowTime={nowTime}
                    setNowTime={setNowTime}
                    handleVotingOver={getElectionResults}
                />
                <ElectionTable
                    canVote={canVote()}
                    citizenVote={citizenVote}
                    politicalParties={politicalParties}
                    electionResults={electionResults}
                    handleVote={handleVote}
                />
            </Container>
        </Box>
    );
};

export default Main;
