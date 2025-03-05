import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import { getTheme } from '@/common/theme/theme'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import Container from '@mui/material/Container'
import { changeThemeModeAC } from '@/app/app-reducer'
import { selectThemeMode } from '@/app/app-selector'
import { containerSx } from '@/features/todolists/ui/Todolists/TodolistItem/TodoListItem.styles'
import { NavButton } from '../NavButton/NavButton'


export const Header = () => {
     const dispatch = useAppDispatch()
     const themeMode = useAppSelector(selectThemeMode)
     const theme = getTheme(themeMode)
     const changeMode = () => {
        dispatch(changeThemeModeAC(themeMode === 'light' ? 'dark' : 'light'))
      }
return(
    <AppBar position="static" sx={{ mb: '30px' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Container maxWidth={'lg'} sx={containerSx}>
      <IconButton color="inherit">
        <MenuIcon />
      </IconButton>
      <NavButton>Sign in</NavButton>
      <NavButton>Sign up</NavButton>
      <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
      <Switch color={'default'} onChange={changeMode} />
      </Container>
    </Toolbar>
  </AppBar>
)    
}