
import { Link, useLocation } from "react-router-dom"

export default function Layout({ children }) {
    const location = useLocation()
    return (
        <>
            <header className="container">
                <div className="main-header">
                    <nav className="header-icons">
                        <ul className="main-nav-list">
                            <li className="main-nav-link">
                                <Link to="/">
                                    <ion-icon name={`home-${location.pathname === "/" ? "sharp" : "outline"}`} class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="home-outline"> --> */}
                                </Link>
                            </li>

                            <li className="main-nav-link">
                                <Link to="/explore">
                                    <ion-icon name={`earth-${location.pathname === "/explore" ? "sharp" : "outline"}`} class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="earth-sharp"></ion-icon> --> */}
                                </Link>
                            </li>
                            <li className="main-nav-link">
                                <Link to="/add"><ion-icon name={`add-circle-${location.pathname === "/add" ? "sharp" : "outline"}`} class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="add-circle-sharp"></ion-icon> --> */}
                                </Link>
                            </li>

                            <li className="main-nav-link">
                                <Link to="/message"><ion-icon name={`navigate-${location.pathname === "/message" ? "sharp" : "outline"}`} class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="navigate-sharp"></ion-icon> --> */}
                                </Link>
                            </li>

                            <li className="main-nav-link">
                                <Link to="/profile">
                                    <ion-icon name={`person-circle-${location.pathname === "/profile" ? "sharp" : "outline"}`} class="list-icon" ></ion-icon>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <Link to="/generator"
                    ><ion-icon name="logo-instagram" class="main-logo"></ion-icon></Link>
                </div>
            </header >
            {children}
        </>
    )
}
