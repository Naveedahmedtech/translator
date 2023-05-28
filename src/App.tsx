import { Typography } from "@mui/material"
import Home from "./components/Home"

function App() {


  return (
    <>
      <header className="container max-auto px-2">
    <Typography variant="h4" fontWeight="bold" className="text-purple-700	m-3">
      Welcome!
      </Typography>
      <Home />
      </header>
    </>
  )
}

export default App
