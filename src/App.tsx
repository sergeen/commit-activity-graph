import { useContext } from 'react';
import './App.css';
import { CommitActivityContext } from './CommitActivityContext';
import CommitActivityChart from './Chart';

function App() {
  const context = useContext(CommitActivityContext);

  // Standar practice, check if the context is available
  if (!context) {
    return <div>App must be used within a CommitActivityContextProvider</div>;
  }

  const { data, loading } = context;

  return (
    <>
      <div>Commit activity graph</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CommitActivityChart data={data} />
      )}
    </>
  );
}

export default App;
