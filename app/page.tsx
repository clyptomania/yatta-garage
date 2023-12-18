import React from "react";
import Link from "next/link";
import hiroLogo from "../public/svg/yatta_logo_hiro_white.svg";
import Image from "next/image";
import styles from './variables.module.scss'

export default function Home() {

  return (
    <main className="home flex flex-col items-center justify-center bg-black w-screen h-screen">
      <div className="flex">
        <Image
          className='hirLogo py-20'
          src={hiroLogo}
          alt="Content Section"
          style={{width: "100px"}}
        />
        <div className="my-auto ml-6 ">
          <h1 className="text-4xl leading-10 text-white font-bold">Yatta</h1>
          <h1 className="text-4xl leading-10 font-normal text-white">UI Prototypes</h1>       
        </div>
      </div>
      <div className={`link text-base ${styles.text}`}>
        <Link className={`text-lg text-white inline-block relative ${styles.link}`} href="/navbar">
          Website NavBar
          <svg  viewBox="0 0 70 36"
                className={styles.svg}
          >
            <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" 
            className={styles.path}
            />
          </svg>
        </Link>
        <Link className={`text-lg text-white inline-block relative ${styles.link}`} href="/vision">
          Platform Vision
          <svg  viewBox="0 0 70 36"
                className={styles.svg}
          >
            <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" 
            className={styles.path}
            />
          </svg>
        </Link>
        <Link className={`text-lg text-white inline-block relative ${styles.link}`} href="/globe">
          Manifesto Globe
          <svg  viewBox="0 0 70 36"
                className={styles.svg}
          >
            <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" 
            className={styles.path}
            />
          </svg>
        </Link>
      </div>
    </main>
  )
}
