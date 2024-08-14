import { NavLink } from 'react-router-dom'

const MainHeader = () => {
  return (          // creating navigation link to move from one page to another
    <>
        <header id="main-header">
            <h1>FitTrack</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({isActive})=>isActive ? 'active' : ''} >DashBoard</NavLink>
                        <NavLink to="create" className={({isActive})=>isActive ? 'active' : ''} >Create Challenge</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
  )
}

export default MainHeader