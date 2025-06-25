import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.action.js'
const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {
  const navigate = useNavigate()
  // const [user, setUser] = useState(userService.getLoggedinUser())

  const user = useSelector((state) => state.userModule.loggedInUser)

  function onLogout() {
    logout().catch((err) => {
      showErrorMsg('OOPs try again')
    })
  }

  // function onSetUser(user) {
  //   setUser(user)
  //   navigate('/')
  // }
  return (
    <header className='app-header full main-layout'>
      <section className='header-container'>
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <p>Balance: {user.balance} </p>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup />
          </section>
        )}
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/todo'>Todos</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
