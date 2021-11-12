import { useState, useEffect } from "react";

export function useValidation(value: any, validations: any) {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [isFullName, setFullName] = useState<boolean>(false);
  const [isContainsOnlyLetters, setContainsOnlyLetters] =
    useState<boolean>(false);
  const [isNumber, setNumber] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "isFullName":
          value.split(" ").length !== 3
            ? setFullName(false)
            : setFullName(true);
          break;
        case "isContainsOnlyLetters":
          Boolean(value.match(/^[а-яёА-Я Ёa-zA-Z]+$/))
            ? setContainsOnlyLetters(true)
            : setContainsOnlyLetters(false);
          break;
        case "isNumber":
          Boolean(value.match(/^[0-9]+$/)) ? setNumber(true) : setNumber(false);
          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isFullName,
    isContainsOnlyLetters,
    isNumber,
  };
}
