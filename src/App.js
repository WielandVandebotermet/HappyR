

function Header() {
  return (
    <div>
      <h1>Simple Single Page Application</h1>
        <ul className="header">
          
        </ul>
    </div>
  );
}

function Main() {
  return (
    <div className="content">

    </div>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;