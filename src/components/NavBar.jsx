import React, { useState } from 'react'
import styles from "./NavBar.module.css"

export default function NavBar({ setState }) {
    const [loc, setLoc] = useState("");
    function handleChange(e) {
        e.preventDefault();
        setLoc(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(loc.trim()!==""){
            setState(loc.trim())
        }
        setLoc("")
    }
    // function handleDark(e){
    // }
    return (
        <div className={styles.NavBar}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={loc} placeholder='Enter the location in detail' onChange={handleChange} />
                <button onClick={handleSubmit}>Search</button>
            </form>
            {/* <button className={styles.btn} onClick={handleDark}><i className="fa-solid
            fa-circle-half-stroke"></i></button> */}
        </div>
    )
}
