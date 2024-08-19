import { useContext } from "react";
import "./App.css";
import { CommitActivityContext } from "./CommitActivityContext";
import CommitActivityChart from "./Chart";

function App() {
  const context = useContext(CommitActivityContext);

  // Standar practice, check if the context is available
  if (!context) {
    return <div>App must be used within a CommitActivityContextProvider</div>;
  }

  const { data, loading } = context;

  return (
    <>
      <div>
        <h1>Commit activity graph</h1>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <CommitActivityChart data={data} />
          <div>
          <small>
            <a href="https://github.com/sergeen/commit-activity-graph">Github</a>
            <br />
            <a href="https://observablehq.com/d/3a24d2a8586e2701">Observable public notebook</a>
          </small>
          </div>
        </>
      )}
    </>
  );
}

export default App;
