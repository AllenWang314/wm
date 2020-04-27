import React from 'react';
import useDarkMode from 'use-dark-mode';
import { Switch } from "@material-ui/core";

const DarkModeToggle = (props) => {
  const darkMode = useDarkMode(false);
  return (
    <div>
      <Switch checked={darkMode.value} onChange={(e) => {darkMode.toggle(); props.onChange(e)}} />
    </div>
  );
};

export default DarkModeToggle;