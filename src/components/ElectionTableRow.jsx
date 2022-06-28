import React from "react";
import {
    FormControlLabel,
    Radio,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";

const ElectionTableRow = ({
    value,
    name,
    symbol,
    selection,
    canVote,
    handleSelection,
}) => {
    return (
        <TableRow>
            <TableCell>
                <FormControlLabel
                    value={value}
                    control={<Radio />}
                    checked={selection === value}
                    disabled={!canVote}
                    label={
                        <img
                            src={`assets/symbol-${symbol.toLowerCase()}.png`}
                            alt="symbol"
                            width={32}
                            height={32}
                        />
                    }
                    onChange={(e) => handleSelection(e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Typography variant="body1">{name}</Typography>
            </TableCell>
            <TableCell>
                <img
                    src={`assets/flag-${symbol.toLowerCase()}.png`}
                    alt="flag"
                    width={32}
                    height={32}
                />
            </TableCell>
            <TableCell>
                <Typography variant="body1">{symbol}</Typography>
            </TableCell>
        </TableRow>
    );
};

export default ElectionTableRow;
