import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import "./App.css";

function App() {

  const [urdu, setUrdu] = useState("");
  const [english, setEnglish] = useState("");
  const [result, setResult] = useState(false);
  const [load, setLoad] = useState(true);
  const [task, setTask] = useState("translate");
  const [copy, setCopy]  = useState(false);

  const translate = async () => {
    setResult(true);
    setLoad(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: urdu,
        task: task
      })
    });

    const data = await res.json();
    setEnglish(data.result);
    setLoad(false);
  }

  const copyText = async () => {
    await navigator.clipboard.writeText(english);
    setCopy(true);
    setTimeout( () => {
      setCopy(false);
    }, 2000)
  }

  return (
    <div className="app">
    <Header />
    <Main value={urdu} translate={translate} english={english} setUrdu={setUrdu} load={load} result={result} task={task} setTask={setTask} copy={copy} copyText={copyText}/>
    <Footer />
    </div>
  );
}

export default App;