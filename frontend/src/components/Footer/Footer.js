
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
                    <div>
                        <ul>
                            <li className='first-li'>Support</li>
                            <li>Help Center</li>
                            <li>Cancellation options</li>
                            <li>Safety information</li>
                            <li>Report a concern</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='first-li'>Community</li>
                            <li>EarthBnB.org: disaster relief housing</li>
                            <li>Support</li>
                            <li>Celebrating diversity and belonging</li>
                            <li>Combating discrimination</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='first-li'>Hosting</li>
                            <li>Try hosting</li>
                            <li>EarthCover: protection for Hosts</li>
                            <li>Explore hosting resources</li>
                            <li>Visit our community forum</li>
                            <li>How to host responsibly</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className='first-li'>About</li>
                            <li>Newsroom</li>
                            <li>Learn about new features</li>
                            <li>Letter from our founders</li>
                            <li>Careers</li>
                            <li>Investors</li>
                            <li>EarthBnB Luxe</li>
                        </ul>
                    </div>
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
                        <Link to={{ pathname: "https://github.com/VladimirRadovanovic" }} target="_blank"><img className='outside-link-image' src={github} alt='github link' /></Link>
                        <Link to={{ pathname: "https://www.linkedin.com/in/vladimir-radovanovic-476311224/" }} target="_blank"><img className='outside-link-image' src={linkedin} alt='linkedin link' /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;
