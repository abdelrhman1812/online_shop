import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import { Offline, Online } from "react-detect-offline";




import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContxet } from '../../userContext'
import SettingBox from '../SettingBox/SettingBox';


export default function Layout() {


  let { userToken, setUserToken } = useContext(UserContxet)






  return <>
    <Navbar />

    <SettingBox />

    <Outlet>

    </Outlet>




    <Footer />







  </>

}
