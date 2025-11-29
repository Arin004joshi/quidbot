import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateWorkflow, { type NodeKind } from './components/CreateWorkflow.tsx'
import TriggerSheet from './components/TriggerSheet.tsx'

const App = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path='/create-workflow' element={<CreateWorkflow />} />
          <Route path='/trigger-sheet' element={<TriggerSheet onSelect={function (kind: NodeKind): void {
            throw new Error('Function not implemented.')
          }} />} />
          <Route path='/action-sheet' element={<TriggerSheet onSelect={function (kind: NodeKind): void {
            throw new Error('Function not implemented.')
          }} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
