
import copyRight from '../../images/copyright.svg'
import github from '../../images/github.svg'
import linkedin from '../../images/linkedin.svg'
import { Link } from "react-router-dom";
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className='footer-main-container'>
                <div className="top-container">

                </div>
                <div className='bottom-container' >
                    <div className='copyright-container'>
                        <span className='copyright-span'>
                            <img className='copyright-image' src={copyRight} alt='copy right protection' />
                            <span className='copyright-text'> 2022 EarthBnB</span>
                        </span>
                        <span>Privacy | Terms | Sitemap</span>
                    </div>
                    <div className="outside-links-container">
                        <Link to={{ pathname: "https://github.com/VladimirRadovanovic" }}  target="_blank"><img className='outside-link-image' src={github} alt='github link'/></Link>
                        <Link to={{ pathname: "https://www.linkedin.com/in/vladimir-radovanovic-476311224/" }} target="_blank"><img className='outside-link-image' src={linkedin} alt='linkedin link'/></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;
