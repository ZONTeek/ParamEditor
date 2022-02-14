import React, { useState } from "react";
import './ParamsEditor/styles.css'
import './App.css';

export const mockData = {
  params: [
    {
      "id": 1,
      "name": "Назначение"
    },
    {
      "id": 2,
      "name": "Длина"
    }
  ],
  paramValues: [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "максимальная"
    }
  ]
}

const ParamsEditorContainer = ({data, setData}: ParamsEditorContainerProps): JSX.Element => {

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

const ParamsEditorComponent = ({id, name, value, changeParam, changeParamValue, deleteParam}
                                        : ParamsEditorComponentProps): JSX.Element => {
  const [paramEditMode, setParamEditMode] = useState(false);
  const [paramTempName, setParamTempName] = useState(name);

  const onSubmit = () => {
    changeParam(id, paramTempName);
    setParamEditMode(!paramEditMode);
  }

  return <div className={'params-list'}>
    {
      !paramEditMode ?
        <label onDoubleClick={()=> setParamEditMode(!paramEditMode)}>
          {name}
        </label>:
        <input className={'params-list__param'}
               onBlur={onSubmit}
               onSubmit={onSubmit}
               onChange={(event => setParamTempName(event.target.value))}
               value={paramTempName} />
    }
    <div>
      <input className={'params-list__value'}
             onChange={(event => changeParamValue(id, event.target.value))}
             value={value} />
      <button onClick={() => deleteParam(id)}>x</button>
    </div>
  </div>
}

function App() {
  const [data, setData] = useState(mockData);

  return (
    <div className="App">
      <ParamsEditorContainer data={data} setData={setData} />
    </div>
  );
}


export interface Param {
  id: number;
  name: string;
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

export interface Props {
  params: Param[];
  model: Model;
}

type ParamsEditorContainerProps = {
  data: {
    params: Param[],
    paramValues: ParamValue[]
  },
  setData: (value:  {
    params: Param[],
    paramValues: ParamValue[]
  }) => void
}

type ParamsEditorComponentProps = {
  id: number;
  name: string;
  value: string;
  changeParam: (id: number, value: string) => void;
  changeParamValue: (id: number, value: string) => void;
  deleteParam: (id: number) => void;
}