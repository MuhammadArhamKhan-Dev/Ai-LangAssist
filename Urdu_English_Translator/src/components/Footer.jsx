import React from 'react'
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className="montserrat-body">Built with React, FastAPI, LangChain & OpenRouter </p>
        </footer>
    )
}

export default Footer
