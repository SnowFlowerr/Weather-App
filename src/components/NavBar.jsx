import React, { useEffect, useState } from 'react'
import styles from "./NavBar.module.css"
import logo from "./logo.png"

export default function NavBar({ setState }) {
    const [loc, setLoc] = useState("");
    

    function handleChange(e) {
        e.preventDefault();
        setLoc(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(loc.trim()!==""){
            localStorage.setItem("location",loc.trim())
        }
        setLoc("")
    }
    useEffect(()=>{
        if(localStorage.getItem("location")!==null){
            setState(localStorage.getItem("location"))
        }
    },[localStorage.getItem("location")])

    

    return (
        <div className={styles.NavBar}>
            
            <div className={styles.logo}><a href="https://github.com/SnowFlowerr" target='_blank'><img src={logo} alt="CodoPhilic" /></a></div>
            
            <form onSubmit={handleSubmit}>
                <input type="text" value={loc} placeholder='Enter the location in detail' onChange={handleChange} />
                <button onClick={handleSubmit}>Search</button>
            </form>
        </div>
    )
}
