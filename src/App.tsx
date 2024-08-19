import { useContext } from 'react'
import './App.css'
import { CommitActivityContext } from './CommitActivityContext'

function App() {
  const { data, loading } = useContext(CommitActivityContext)

  return (
    <>
      <div>Commit actvity graph</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((week: any, index: number) => (
            <div key={index}>{week.total}</div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
