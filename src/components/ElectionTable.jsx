import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import ElectionTableRow from "./ElectionTableRow";

const ElectionTable = ({
    canVote,
    citizenVote,
    politicalParties,
    handleVote,
}) => {
    const [selection, setSelection] = React.useState(citizenVote);

    React.useEffect(() => {
        setSelection(citizenVote);
    }, [citizenVote]);

    const handleSelection = (value) => {
        setSelection(value);
    };

    return (
        <Box mt={3}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="body1">Select</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">Name</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">Flag</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">Symbol</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {politicalParties.map((politicalParty, id) => (
                        <ElectionTableRow
                            key={`id-${politicalParty.symbol}`}
                            value={String(id + 1)}
                            name={politicalParty.name}
                            symbol={politicalParty.symbol}
                            selection={selection}
                            canVote={canVote}
                            handleSelection={handleSelection}
                        />
                    ))}
                </TableBody>
            </Table>
            <Button
                variant="contained"
                fullWidth
                disabled={!canVote || selection === "0"}
                sx={{ marginTop: "1rem" }}
                onClick={() => handleVote(selection)}
            >
                Vote
            </Button>
        </Box>
    );
};

export default ElectionTable;
