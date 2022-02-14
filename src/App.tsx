import React, { useState } from 'react';
import { ParamsEditorContainer } from "./ParamsEditor/ParamsEditor.Container";
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
      "value": "макси"
    }
  ]
}

function App() {
  const [data, setData] = useState(mockData);

  return (
    <div className="App">
      <ParamsEditorContainer data={data} setData={setData} />
    </div>
  );
}

export default App;
