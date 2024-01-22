import React, { useContext } from 'react'




import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContxet } from '../../userContext'
import SettingBox from '../SettingBox/SettingBox';


export default function Layout() {








  return <>
    <Navbar />
    <Outlet>
    </Outlet>
    <Footer />







  </>

}
