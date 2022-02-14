import React, { useState } from "react";
import './styles.css'


export const ParamsEditorComponent = ({id, name, value, changeParam, changeParamValue, deleteParam}
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

type ParamsEditorComponentProps = {
  id: number;
  name: string;
  value: string;
  changeParam: (id: number, value: string) => void;
  changeParamValue: (id: number, value: string) => void;
  deleteParam: (id: number) => void;
}
