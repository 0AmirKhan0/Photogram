
export default function Layout({ children }) {
    return (
        <>
            <header className="container">
                <div className="main-header">
                    <nav className="header-icons">
                        <ul className="main-nav-list">
                            <li className="main-nav-link">
                                <a href="#">
                                    <ion-icon name="home-sharp" class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="home-outline"> --> */}
                                </a>
                            </li>

                            <li className="main-nav-link">
                                <a href="Explore.html"
                                ><ion-icon name="earth-outline" class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="earth-sharp"></ion-icon> --> */}
                                </a>
                            </li>
                            <li className="main-nav-link">
                                <a href="Add_post.html"
                                ><ion-icon
                                    name="add-circle-outline"
                                    class="list-icon"
                                ></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="add-circle-sharp"></ion-icon> --> */}
                                </a>
                            </li>

                            <li className="main-nav-link">
                                <a href="Message.html"><ion-icon name="navigate-outline" class="list-icon"></ion-icon>
                                    {/* <!-- for active part --> */}
                                    {/* <!-- <ion-icon name="navigate-sharp"></ion-icon> --> */}
                                </a>
                            </li>

                            <li className="main-nav-link">
                                <a href="Profile.html"
                                ><ion-icon
                                    name="person-circle-outline"
                                    class="list-icon"
                                ></ion-icon>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <a href="#"
                    ><ion-icon name="logo-instagram" class="main-logo"></ion-icon></a>
                </div>
            </header >
            {children}
        </>
    )
}
