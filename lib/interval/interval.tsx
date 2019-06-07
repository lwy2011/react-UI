import {useEffect, useRef} from "react";


const useInterval = (setFn: () => void, delay: number, now: number) => {
    const timerRef = useRef({id: 0, set: () => console.log(0)});

    useEffect(
        () => {timerRef.current.set = setFn;}
    );
    useEffect(
        () => {
            const tick = () => {timerRef.current.set();};
            const {id} = timerRef.current;
            const timer = now > 0 && !id &&
                setInterval(
                    tick, delay * 1000
                );
            // @ts-ignore
            timer && !id && (timerRef.current.id = timer);
            now === 0 && id && clearTimeout(id);
            now === 0 && id && (timerRef.current.id = 0);
        }, [now]
    );
    useEffect(
        () => {
            const {id} = timerRef.current;
            id && clearInterval(id);
        }, []
    );
    return now;
};


export default useInterval;