import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',

    position: 'relative'
})

export const CenteredHeader = styled('header', {
    padding: '2rem 2rem',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'center',
    position: "relative"

})

export const Header = styled('header', {
    padding: '2rem 2rem',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'space-between',
    position: "relative"

})

export const DrawerContainer = styled('div', {
    height: '100vh',
    width: '356px',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    zIndex: 9999,
})


export const HeaderCartIndicator = styled('button', {

    position: 'relative',
    background: '$gray800',
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    color: '$white',
    cursor: 'pointer',
    span: {
        position: 'absolute',
        top: -10,
        right: -10,

        border: '$gray900 solid 4px',

        padding: '6px',
        height: 32,
        width: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '$green500',
        color: '$white',
        fontWeight: 'bold',
        borderRadius: '100%',
    }
})