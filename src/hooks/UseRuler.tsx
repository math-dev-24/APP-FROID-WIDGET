import {useState} from "react";
import {DATA_FLUIDS} from "../data/fluid.tsx";


const useRuler = () => {
    const BASE_URL = "https://api-ovh.mathieu-busse.dev/v1/ruler"

    const [result , setResult] = useState<number>(0)
    const [inLoading, setInLoading] = useState<boolean>(false)
    const [error, setError] = useState<string|null>(null)
    const [infoFluid, setInfoFluid_state] = useState<string>("")

    const getResult = async (
        dataIn : {
            fluid: string,
            car_need: string,
            car_1: string,
            val_1: number,
            car_2: string,
            val_2: number
        }
    ): Promise<void>  =>
    {
        setInLoading(true)
        try {
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataIn)
            })
            const data = await res.json()
            setResult(data.result)
        } catch (e) {
            setError("Une erreur est survenue")
        } finally {
            setInLoading(false)
        }
    }

    const setInfoFluid = (fluid: string) => {
        const tmp_fluid = DATA_FLUIDS.find(f => f.ref_name === fluid);
        setInfoFluid_state(
            tmp_fluid ? `G${tmp_fluid.group} - ${tmp_fluid.classification} - GWP: ${tmp_fluid.gwp}` : "Fluid inconnu"
        )
    }

    return {
        result,
        error,
        inLoading,
        infoFluid,
        getResult,
        setInfoFluid
    }

}

export default useRuler