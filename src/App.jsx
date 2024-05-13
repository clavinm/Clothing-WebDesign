import Home from "./features/Home"
import Trending from "./features/Trending"
import Latest from "./features/Latest"
import Navbar from "./features/navbar"
import About from "./features/About"
import Footer from "./features/Footer"

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <Trending />
      <Latest />
      <About />
      <Footer />
    </>
  )
}

export default App
