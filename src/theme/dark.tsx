/*
:root {
  --main-bg-color: #222;
  --text-color: #fff;
  --light-text-color: rgba(255,255,255,0.4);
  --font-family: 'Roboto Mono', monospace;
  --link-color: #ff5252;
  --border-color: rgba(255,255,255,0.4);
}
*/

export const defaults = {
  spacingUnit: 5,
  primaryColor: '#ff5252',
  bodyWidth: 1170
}

const theme = { 
  defaultPadding: `${defaults.spacingUnit * 4}px`,
  mainFontFamily: `'Roboto', sans-serif`,
  altFontFamily: `'Roboto Mono', monospace`,
  headerHeight: '64px',
  footerHeight: '48px',
  mainBgColor: '#222',
  textColor: '#fff',
  lightTextColor: 'rgba(255,255,255,0.4)',
  linkColor: defaults.primaryColor,
  borderColor: 'rgba(255,255,255,0.4)',
  ...defaults,
  bodyWidth: `${defaults.bodyWidth}px`
};

export default theme;