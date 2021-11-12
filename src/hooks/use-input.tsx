import  {useState} from 'react'
import { useValidation } from './use-validation'

export function useInput(initialValue: any, validations: any){
    const [value, setValue] = useState<any>(initialValue)
    const [isDirty, setDirty] = useState<boolean>(false)
    const valid = useValidation(value, validations)

    function onChange(e: any){
        setValue(e.target.value)
    }
    function takeValue(value: any){
        setValue(value)
    }
    function onBlur(e: any){
        setDirty(true)
    }

    function onClear(){
        setValue('')
        setDirty(false)

    }

    return {
        value,
        isDirty,
        onChange,
        onBlur,
        onClear,
        takeValue,
        ...valid
    }
}