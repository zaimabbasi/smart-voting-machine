const Voting = artifacts.require("Voting");
const parties = [
    {
        name: "Pakistan Tehreek-e-Insaf",
        symbol: "PTI",
        flagUrl: "",
        imageUrl: "",
    },
    {
        name: "Awami National Party",
        symbol: "ANP",
        flagUrl: "",
        imageUrl: "",
    },
    {
        name: "Pakistan Muslim League-Quaid",
        symbol: "PML-Q",
        flagUrl: "",
        imageUrl: "",
    },
    {
        name: "Muttahida Qaumi Movement",
        symbol: "MQM",
        flagUrl: "",
        imageUrl: "",
    },
    {
        name: "Pakistan People’s Party",
        symbol: "PPP",
        flagUrl: "",
        imageUrl: "",
    },
    {
        name: "Pakistan Muslim League-Nawaz",
        symbol: "PML-N",
        flagUrl: "",
        imageUrl: "",
    },
];

const startTime = Math.floor(new Date("2022-05-22T00:00:00Z").getTime() / 1000);
const endTime = Math.floor(new Date("2022-05-23T00:00:00Z").getTime() / 1000);

module.exports = (deployer) => {
    deployer.deploy(Voting, startTime, endTime).then(async (voting) => {
        for (const party of parties) {
            await voting.addParty(party.name, party.symbol, "", "");
        }
    });
};
