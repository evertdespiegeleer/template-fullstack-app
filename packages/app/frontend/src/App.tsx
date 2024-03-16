import { useEffect, useState } from 'react'
import './App.css'
import { getConfig } from './config.js'
import { hellogetGreeting } from 'apiclient'

function App () {
  const [greeting, setGreeting] = useState<undefined | string>(undefined)

  useEffect(() => {
    (async () => {
      const greeting = (await hellogetGreeting()).data.greeting
      setGreeting(greeting)
    })().catch(console.error)
  }, [])

  return (
    <>
      Greeting from API: <i>{greeting ?? 'No greeting available'}</i>

      <br /><br />

      Frontend runtime env:
      <pre style={{
        textAlign: 'left',
        fontFamily: 'monospace',
        background: '#000',
        color: '#fff',
        padding: '2em',
        borderRadius: '1em'
      }}>
        {JSON.stringify(getConfig(), null, 4)}
      </pre>
    </>
  )
}

export default App
