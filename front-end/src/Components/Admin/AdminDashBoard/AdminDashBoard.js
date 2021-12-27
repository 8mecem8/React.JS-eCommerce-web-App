import React from 'react'

/* Custom Css */
import useStyles from './AdminDashBoardStyles'



import pic from './01.jpg';


function AdminDashBoard() {

    const sty = useStyles()

    return (
        <>
        <section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 70%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height: "100vw",zIndex:1}}>

            AdminDashBoard
        </section>
        </>
    )
}

export default AdminDashBoard
