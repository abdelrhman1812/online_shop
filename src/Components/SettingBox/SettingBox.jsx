import React, { useEffect, useRef } from 'react';

export default function SettingBox() {
  // const gearRef = useRef(null);

  // const openSettingBox = () => {
  //   const settingBox = document.querySelector('.setting-Box');
  //   if (settingBox) {
  //     settingBox.classList.toggle('open');
  //   }
  // };

  // function ulLi() {
  //   let listLi = Array.from(document.querySelectorAll('.ul li'));
  //   listLi.forEach((li) => {
  //     li.addEventListener('click', (e) => {
  //       const bgColor = e.target.dataset.color;
  //       const lightColor = e.target.dataset.light;

  //       document.documentElement.style.setProperty('--bg-color', bgColor);
  //       document.documentElement.style.setProperty('--light-color', lightColor);

  //       localStorage.setItem('color', bgColor);
  //       localStorage.setItem('lightColor', lightColor);
  //     });
  //   });
  // }

  // useEffect(() => {
  //   // Retrieve colors from local storage
  //   const storedColor = localStorage.getItem('color');
  //   const storedLightColor = localStorage.getItem('lightColor');

  //   if (storedColor) {
  //     document.documentElement.style.setProperty('--bg-color', storedColor);
  //     document.documentElement.style.setProperty('--light-color', storedLightColor);
  //   }

  //   ulLi();

  //   const gear = gearRef.current;
  //   if (gear) {
  //     gear.addEventListener('click', openSettingBox);

  //     // Cleanup event listener on component unmount
  //     return () => {
  //       gear.removeEventListener('click', openSettingBox);
  //     };
  //   }
  // }, []);

  // return (
  //   <div className='setting-Box'>
  //     <div className='box'>
  //       <ul className='ul'>
  //         <li className='active' data-color='#2d2d2d' data-light='#2d2d2d'></li>
  //       </ul>
  //     </div>
  //     <div className='box-gear'>
  //       <i className='fa-solid fa-gear' id='gear' ref={gearRef}></i>
  //     </div>
  //   </div>
  // );
}
