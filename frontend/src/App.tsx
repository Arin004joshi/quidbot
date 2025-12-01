import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateWorkflow, { type NodeKind } from './components/CreateWorkflow.tsx'
import TriggerSheet from './components/TriggerSheet.tsx'
import ActionSheet from './components/ActionSheet.tsx'
import { ReactFlowProvider } from "@xyflow/react";

const App = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <BrowserRouter>
        <ReactFlowProvider>
          <Routes>
            <Route path='/create-workflow' element={<CreateWorkflow />} />
            <Route path='/trigger-sheet' element={<TriggerSheet onSelect={function (kind: NodeKind): void {
              throw new Error('Function not implemented.')
            }} />} />
            <Route path='/action-sheet' element={<ActionSheet onSelect={function (kind: NodeKind): void {
              throw new Error('Function not implemented.')
            }} />} />
          </Routes>
        </ReactFlowProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
