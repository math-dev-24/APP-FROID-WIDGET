import { useState } from "react"
import SelectData from "../types/selectType";

interface SelectProp {
    label: string,
    value: string,
    setValue: (value: string) => void,
    options: SelectData[]
}


export default function SelectCustom({label, value, setValue, options} : SelectProp) {
    const [show, setShow ] = useState<boolean>(false)

    const handleChange = (newValue: string) => {
        setValue(newValue);
        setShow(false);
    }

    const toggleDropdown = () => {
        setShow((prevShow) => !prevShow);
    }

    return (
        <div className="custom_dropdown">
            <div onClick={toggleDropdown}>{label}</div>
            <div onClick={toggleDropdown} className="value">{value}</div>
            {
                show ?
                <div className="options">
                    <ul>
                        {options.map(o => <li key={o.key} className={value == o.key ? "selected" : ""} onClick={() => handleChange(o.key)}>{o.label}</li>)}
                    </ul>
                </div>
                :
                ""
            }
        </div>
    )
}