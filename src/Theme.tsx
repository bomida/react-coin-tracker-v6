import { DefaultTheme } from "styled-components"


const colors = {
    primary: '#E2E247',
    primaryTxt: '#4D5161',
    red: '#DE6453',
    green: '#4D8863',
    white: '#FFFFFF',
    TxtBlack: '#222222',
    panelBlack: '#222327',
    ddd: '#DDDDDD',
    999: '#999999',
    333: '#333333',
    bg: '#141518',
}

const fontSize = {
    xxl: '40rem',
    xl: '24rem',
    lg: '18rem',
    md: '16rem',
    rg: '14rem',
    sm: '12rem'
}

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

const theme: DefaultTheme = {
    colors,
    fontSize,
}

export default theme;