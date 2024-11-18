import React from 'react'
import './Home.css'
import logo from '../../image/logo-png.png'

export default function Home() {
    return (
        <>
            <div className="main-content">
                <div className="image-container">
                    <img src={logo} className="main-image" alt="Logo" />
                    <h1 className="main-title">Leitores</h1>
                </div>
                <button className="iniciar-pesquisa-btn">Iniciar Pesquisa</button>
            </div>
        </>
    )
}
