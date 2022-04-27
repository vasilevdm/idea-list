import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "./layout/layout.sass";
import IdeaList from "./features/idea/IdeaList";

function App() {
  return <div className="app">
    <Header />
    <IdeaList />
    <Footer />
  </div>
}

export default App;