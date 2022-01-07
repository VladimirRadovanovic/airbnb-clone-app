import { NavLink } from "react-router-dom";
import './SplashPage.css'

function SplashPage(){
    return (
        <main className="main">
        <div className="black-box">
          <div className="splash-img-container">
            {/* <img src={splashImg} /> */}
            <div className="img-text-container">
              <h2>Not sure where to go? Perfect.</h2>

              <div className="spots-link-container">
                <NavLink className='explore-spots-link' to='/api/spots'>I'm flexible</NavLink>
              </div>

            </div>
          </div>

        </div>
        <div className="img2-container">
        <div className="splash-img-container2">
        <div className="img-text-container2">
              <h2>Share your home.</h2>

              <div className="host-link-container">
                <NavLink className='host-link' to='/api/spots'>Try hosting</NavLink>
              </div>

            </div>
              <div className="inner-img-container"></div>
          </div>

        </div>
        {/* <div className="white-box"></div> */}
      </main>
    )
}


export default SplashPage;
