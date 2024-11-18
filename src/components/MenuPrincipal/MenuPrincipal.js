import React, { useState } from 'react'
import './MenuPrincipal.css'
import { Link } from 'react-router-dom'

export default function MenuPrincipal() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div className="menu-container">
                <div className='menu-icon'>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                    <p className="nome-empresa">Leitores</p>
                </div>
                <nav className={`menu ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/" className="home-link" >
                        Responder Perguntas
                        </Link></li>
                        <li><Link to="/respostas" className="minhas-respostas-link" >
                        Minhas Respostas
                        </Link></li>
                        <li><Link to="/resultados" className="resultados-link" > Resultados Gerais</Link></li>
                    </ul>
                    <div className="sobre-projeto">
                        <Link to="/sobre" className="footer-link" >
                            Conheça o projeto
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}
