import React from 'react'
import Switch from '@mui/material/Switch';
import useTheme from '../context/ThemeContext';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function TogglrButton() {
  const{ themeMode, lightTheme, darkTheme } = useTheme();

  const chgThemeBtn = (e) => {
    const themeStatus = e.currentTarget.checked;
    if(themeStatus){
      darkTheme();
      console.log(themeStatus);
      
    }else {
      lightTheme();
    }
  }

  return (
    <Switch onChange={chgThemeBtn} {...label} checked={themeMode === 'dark'} />  
  )
}

export default TogglrButton;