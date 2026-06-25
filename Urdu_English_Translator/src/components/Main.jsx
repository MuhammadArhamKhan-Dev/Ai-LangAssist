import React, { useState, useRef, useEffect } from 'react'
import Typed from 'typed.js'
import "../index.css"
import styles from "./Main.module.css"

const Main = ({ value, translate, english, setUrdu, load, result, task, setTask, copy, copyText }) => {

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

        <main className={styles.main}>
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
        </main>

    )
}

export default Main
