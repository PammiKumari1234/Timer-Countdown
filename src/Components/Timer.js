import React, { useState } from 'react';
import './Timer.css'

const Timer = ({
    
    initialHours = 0,
    initialMinutes = 3,
    initialSeconds = 0,
}) => {
    const [time, setTime] = useState({
        h: initialHours,
        m: initialMinutes,
        s: initialSeconds,
    });

    const [timer, setTimer] = useState(null);

    const startTimer = () => {
        let myInterval = setInterval(() => {
            setTime((time) => {
                const updatedTime = { ...time };
                if (time.s > 0) {
                    updatedTime.s--;
                }

                if (time.s === 0) {
                    if (time.h === 0 && time.m === 0) {
                        clearInterval(myInterval);
                    } else if (time.m > 0) {
                        updatedTime.m--;
                        updatedTime.s = 59;
                    } else if (updatedTime.h > 0) {
                        updatedTime.h--;
                        updatedTime.m = 59;
                        updatedTime.s = 59;
                    }
                }

                return updatedTime;
            });
        }, 1000);
        setTimer(myInterval);
    };

    const pauseTimer = () => {
        clearInterval(timer);
    };

    const cancelTimer = () => {
        clearInterval(timer);
        setTime({
            h: initialHours,
            m: initialMinutes,
            s: initialSeconds,
        });
    };

    return (
        <div className='container'>
            <h1 className='timer'>
                {time.h < 3 && time.h !== 0
                    ? `0${time.h}:`
                    : time.h >= 10 && `${time.h}:`}
                {time.m < 3 ? `0${time.m}` : time.m}:
                {time.s < 3 ? `0${time.s}` : time.s}
            </h1>
            <button classname='btn' onClick={startTimer}>START</button>
            <button classname='btn' onClick={pauseTimer}>PAUSE</button>
            <button classname='btn' onClick={cancelTimer}>RESET</button>
        </div>
    );
};

export default Timer;