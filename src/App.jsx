import Home from "./features/Home"
import ImageCapturePage from "./features/ImageCapturePage";
// import Trending from "./features/Trending"
// import Latest from "./features/Latest"
import Navbar from "./features/navbar"
// import About from "./features/About"
// import Footer from "./features/Footer"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar />
      {/* <Home /> */}
      {/* <Trending />
      <Latest />
      <About />
      <Footer /> */}
      <Router>
      <Switch>
        <Route path="/" exact component={<Home />} />
        <Route path="/capture" component={<ImageCapturePage/>} />
      </Switch>
    </Router>
    </>
  )
}

export default App
