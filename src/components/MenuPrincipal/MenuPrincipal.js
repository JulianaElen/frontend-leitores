import React, { useState } from 'react'
import './MenuPrincipal.css'
import { Link } from 'react-router-dom'

export default function MenuPrincipal() {

    //menu aberto ou não
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
                {/* Se menu aberto abre a navegação */}
                <nav className={`menu ${isOpen ? 'open' : ''}`}> 
                    <ul>
                        <li onClick={toggleMenu}><Link to="/" className="home-link" >
                            Página Inicial
                        </Link></li>
                        <li onClick={toggleMenu}><Link to="/respostas" className="minhas-respostas-link" >
                            Minhas Respostas
                        </Link></li>
                        <li onClick={toggleMenu}><Link to="/resultados" className="resultados-link" > Resultados Gerais</Link></li>
                    </ul>
                    <div className="sobre-projeto">
                        <Link to="/sobre" className="footer-link" onClick={toggleMenu}>
                            Conheça o projeto
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}
