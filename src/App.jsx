import Hero from "./Components/Hero/Hero";
import './App.css'
import Companies from "./Components/Companies/Companies";
import Residencies from "./Components/Residencies/Residencies";
import Value from "./Components/Value/Value";
import Contact from "./Components/Contact/Contact";
import GetStarted from "./Components/GetStarted/GetStarted";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Component from "./Components/Component/Component";
import Pain from "./Components/Pain/Pain";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Companies />
      <Residencies />
      <Component />
      <Value />
      <Pain />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
