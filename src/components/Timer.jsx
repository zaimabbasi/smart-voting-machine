import React from "react";
import { Box, Typography } from "@mui/material";

import Loading from "./Loading";

const Timer = ({
    startTime,
    endTime,
    nowTime,
    setNowTime,
    handleVotingOver,
}) => {
    const timer = React.useRef();
    const [timeLeft, setTimeLeft] = React.useState({
        hours: "0",
        minutes: "0",
        seconds: "0",
    });

    React.useEffect(() => {
        timer.current = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer.current);
    }, [startTime, endTime]);

    const stopTimer = () => {
        clearInterval(timer.current);
        handleVotingOver();
    };

    const calculateTimeLeft = () => {
        let timeLeft = {};
        let difference = 0;
        const now = new Date();

        setNowTime(now);

        if (now < startTime) difference = startTime - now;
        else if (now < endTime) difference = endTime - now;
        else stopTimer();

        timeLeft = {
            hours: Math.floor((difference / (60 * 60 * 1000)) % 24).toString(),
            minutes: Math.floor((difference / (60 * 1000)) % 60).toString(),
            seconds: Math.floor((difference / 1000) % 60).toString(),
        };

        if (timeLeft.hours < 10) timeLeft.hours = "0" + timeLeft.hours;
        if (timeLeft.minutes < 10) timeLeft.minutes = "0" + timeLeft.minutes;
        if (timeLeft.seconds < 10) timeLeft.seconds = "0" + timeLeft.seconds;

        return timeLeft;
    };

    return (
        <Box mt={3} textAlign="center">
            {nowTime ? (
                <>
                    {nowTime < startTime ? (
                        <Typography variant="caption">
                            voting will start in
                        </Typography>
                    ) : nowTime < endTime ? (
                        <Typography>voting will end in</Typography>
                    ) : (
                        <Typography>voting is over</Typography>
                    )}
                    <Typography variant="h5">
                        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                    </Typography>
                </>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default Timer;
