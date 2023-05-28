import { Typography } from "@mui/material"
import Home from "./components/Home"

function App() {


  return (
    <>
      <header className="p-5">
    <Typography variant="h4" fontWeight="bold" className="text-purple-700	m-3">
      Welcome!
        </Typography>
        <main className="">
          <Home />
        </main>
      </header>
    </>
  )
}

export default App
