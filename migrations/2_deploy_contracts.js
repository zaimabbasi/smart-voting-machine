const Voting = artifacts.require("Voting");
const parties = [
    {
        name: "Pakistan Tehreek-e-Insaf",
        symbol: "PTI",
    },
    {
        name: "Awami Muslim League",
        symbol: "AML",
    },
    {
        name: "Awami National Party",
        symbol: "ANP",
    },
    {
        name: "Jamaat-e-Islami",
        symbol: "JI",
    },
    {
        name: "Jamiat Ulema-e-Islam",
        symbol: "JUI",
    },
    {
        name: "Pakistan Muslim League-Quaid",
        symbol: "PMLQ",
    },
    {
        name: "Muttahida Qaumi Movement",
        symbol: "MQM",
    },
    {
        name: "Pakistan People’s Party",
        symbol: "PPP",
    },
    {
        name: "Pakistan Muslim League-Nawaz",
        symbol: "PMLN",
    },
];

const startTime = Math.floor(new Date("2022-06-28T17:59:00").getTime() / 1000);
const endTime = Math.floor(new Date("2022-06-28T18:00:00").getTime() / 1000);

module.exports = (deployer) => {
    deployer.deploy(Voting, startTime, endTime).then(async (voting) => {
        for (const party of parties) {
            await voting.addParty(party.name, party.symbol);
        }
    });
};
