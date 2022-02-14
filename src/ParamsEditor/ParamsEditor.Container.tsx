import React from "react";
import { ParamsEditorComponent } from "./ParamsEditor.Component";
import { Param, ParamValue } from "../types/types";

export const ParamsEditorContainer = ({data, setData}: ParamsEditorContainerProps): JSX.Element => {

  const changeParamValue = (id: number, value: string): void => {
    setData({
      params: [...data.params],
      paramValues: data.paramValues.map(paramValue => {
        if (paramValue.paramId === id) paramValue.value = value;
        return paramValue;
      })
    })
  }

  const changeParam = (id: number, value: string): void => {
    setData({
      paramValues: [...data.paramValues],
      params: data.params.map(param => {
        if (param.id === id) param.name = value;
        return param;
      })
    })
  }

  const deleteParam = (id: number): void => {
    setData({
      paramValues: data.paramValues.filter((paramValue) => paramValue.paramId!==id),
      params: data.params.filter((param) => param.id!==id)
    })
  }

  const getParams = (): JSX.Element => {
    return (<>
      {data.params.map(param => {
        return data.paramValues.map(paramValue =>  {
          if (param.id === paramValue.paramId)
            return <ParamsEditorComponent id={param.id}
                                          name={param.name}
                                          value={paramValue.value}
                                          changeParam={changeParam}
                                          changeParamValue={changeParamValue}
                                          deleteParam={deleteParam}
                                          key={param.name} />
          else return <></>
        })
      })}
    </>)
  }


  return (<div>
    {getParams()}
  </div>)
}

type ParamsEditorContainerProps = {
  data: {
    params: Param[],
    paramValues: ParamValue[]
  },
  //TODO change type
  setData: (value:  {
    params: Param[],
    paramValues: ParamValue[]
  }) => void
}