import {useState} from "react";

export const useValue = (initialValue: boolean) => {
    const [value, setValue] = useState<boolean>(initialValue);
    const toggleValue = () => setValue((prevValue:boolean) => !prevValue);
    return {value, toggleValue};
}