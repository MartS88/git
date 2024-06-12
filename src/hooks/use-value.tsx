import {useState} from "react";

export const useValue = (value:boolean) => {
    const [initialValue, setInitialValue] = useState<boolean>(false);
    const changeValue = setInitialValue((prevValue:boolean) => !prevValue);
    return {initialValue, changeValue};
}