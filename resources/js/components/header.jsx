import '../../css/navbar.css'
import logo_light from '../../../public/assets/navbar/logo-black.png'
import logo_dark from '../../../public/assets/navbar/logo-white.png'
import toggle_light from '../../../public/assets/navbar/night.png'
import toggle_dark from '../../../public/assets/navbar/day.png'
import PropTypes from 'prop-types';

export default function Header({ theme, setTheme }) {
  
  const toggleMode = ()=>{
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <div className='navbar'>
      {/* Logo */}
      <img src={theme == 'light' ? logo_light : logo_dark} alt="" className='logo' />
      {/* Navigation */}
      <ul>
        <li>Home</li>
        <li>Information</li>
        <li>Tips</li>
        <li>About</li>
        <li>Suport Us</li>
      </ul>
      {/* Mode Slider */}
      <img onClick={()=>{toggleMode()}} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon' />
    </div>
  )
}

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};