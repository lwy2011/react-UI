import {
    useState
} from "react";

() => {
};

interface Actions {
    add?: number,
    multiply?: number,

    [propName: string]: any
}

const useN = () => {
    const [n, setN] = useState(1);
    return {
        n, setN
    };
};
const initial: { m: number, [propName: string]: any } = {m: 1};
const useM = () => {
    const [state, set] = useState(initial);
    const obj: { [propName: string]: (val: number) => void } = {
        add(val: number) {
            set({...state, m: state.m + val});
        },
        multiply(val: number) {
            set({...state, m: state.m * val});
        }
    };

    const dispatch = (action: Actions) => {
        const copy = {...state};
        for (let key in action) {
            let val = action[key];
            console.log(key);
            if (obj[key]) {
                obj[key](val);
            } else {
                copy[key] = val;
                set(copy);
            }
        }

    };
    return {
        state, dispatch
    };
};
export {useM};
export default useN;