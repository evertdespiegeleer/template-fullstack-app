import './App.css'
import { getAllConfig } from './config.js'

function App () {
  return (
    <>
      Runtime env:
      <pre style={{
        textAlign: 'left',
        fontFamily: 'monospace',
        background: '#000',
        color: '#fff',
        padding: '2em',
        borderRadius: '1em'
      }}>
        {JSON.stringify(getAllConfig(), null, 4)}
      </pre>
    </>
  )
}

export default App
