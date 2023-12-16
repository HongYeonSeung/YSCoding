import React, {useEffect, useState} from 'react';

const CountdownTimer = ({endTime}) => {
    const calculateTimeRemaining = () => {
        const now = new Date();
        const endTimeDate = new Date(endTime);
        const difference = endTimeDate - now;

        if (difference < 0) {
            return {hours: 0, minutes: 0, seconds: 0};
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {hours, minutes, seconds};
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const id = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
        }, 100);

        return () => clearInterval(id);
    }, [endTime]); // endTime이 변경될 때마다 useEffect가 다시 실행됨

    return (
        <span>
      {timeRemaining.hours}시간 {timeRemaining.minutes}분 {timeRemaining.seconds}초
    </span>
    );
};

export default CountdownTimer;