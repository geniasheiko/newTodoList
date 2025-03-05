import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectThemeMode } from './app-selector'
import { getTheme } from '@/common/theme/theme'
import { Header } from '@/common/components/header/Header'
import { Main } from './main'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}



