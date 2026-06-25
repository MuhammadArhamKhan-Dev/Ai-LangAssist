import React from 'react'
import '../index.css'
import styles from './Header.module.css'

const Header = () => {

  return (
      
      <header className={styles.headerContainer}>
        <nav className = {styles.navContainer}>
          <h2 className="montserrat-heading">
            AI LangAssist
          </h2>
        </nav>
      </header>
      
           
  )
}

export default Header
