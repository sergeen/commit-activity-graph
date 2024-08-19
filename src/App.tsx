import { useContext } from 'react';
import './App.css';
import { CommitActivityContext } from './CommitActivityContext';

function App() {
  const context = useContext(CommitActivityContext);

  if (!context) {
    return <div>Error: CommitActivityContext is undefined</div>;
  }

  const { data, loading } = context;

  return (
    <>
      <div>Commit activity graph</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((week, index) => (
            <div key={index}>{week.total}</div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
