import React, { useEffect, useRef } from 'react'
import '../index.css'
import styles from './Header.module.css'
import Typed from 'typed.js'


const Header = ({ value, translate, english, setUrdu, load, result, task, setTask, copy, copyText }) => {
  const elRef = useRef(null)

  useEffect(() => {
    if (!elRef.current) return
    const typed = new Typed(elRef.current, {
      strings: ['Want to Translate?', 'Want to Summarize?', 'Want to Write?', 'Just Ask'],
      typeSpeed: 50,
    })
    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      <header>
        <nav>
          <h2 className="montserrat-heading">
            AI LangAssist
          </h2>
        </nav>
      </header>
      <div className={styles.headerContainer}>
        <div>
          <span className="montserrat-heading" ref={elRef}></span>
        </div>
        <div>
          <select className="montserrat-body"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          >
            <option value="translate">Translate</option>
            <option value="summarize">Summarize</option>
            <option value="grammar">Grammar Fix</option>
            <option value="professional">Professional Writing</option>
          </select>
        </div>
        <div>
          <textarea
            onChange={(e) => setUrdu(e.target.value)}
            placeholder="Please select from dropdown and ask here..."
            value={value}
          >
          </textarea>
        </div>

        <div>
          <button onClick={translate} className="montserrat-body">
            Ask
          </button>
        </div>



        {
          !result ? '' :
            load ? <p className="montserrat-body">Please wait ...</p> :

              <div className={['montserrat-body', styles.resultContainer].join(' ')}>
                <p>{english}</p>
                <button onClick={copyText}>
                  {copy ? "Copied ✓" : "Copy"}
                </button>
              </div>
        }
           </div>
      <footer>
          <p className="montserrat-body">Built with React, FastAPI, LangChain & OpenRouter </p> 
        </footer>
    </>
  )
}

export default Header
