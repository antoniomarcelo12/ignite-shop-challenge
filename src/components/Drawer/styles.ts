import { styled } from "@stitches/react";

export const DrawerContainer = styled('div', {
    height: '100vh',
    width: '452px',
    position: "absolute",
    right: 0,
    zIndex: 99999,
    background: '$gray800',
})

export const CloseDrawerButton = styled('button', {
    border: 0,
    padding: 4,
    position: 'absolute',
    background: 'transparent',
    top: '1rem',
    right: '1rem',
    color: '$gray300',
    fontWeight: 'bolder',
    cursor: 'pointer'
})

export const DrawerContent = styled('div', {
    width: '100%',
    height: '50%',
    padding: '3rem',
    marginTop: '3rem',

    h1: {
        fontSize: '1.5rem',
        marginBottom: '3rem',

        '&.noProductsOnCart': {
            fontSize: '1rem',
        }
    },

})

export const DrawerProduct = styled('div', {
    width: '100%',
    display: 'flex',
    gap: '2rem',
    marginBottom: '1.5rem'
    
})

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  img: {
    objectFit: 'cover',
  }
})

export const ProductInfo = styled('div', {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',

    p: {
        marginBottom: '10px'
    },

    span: {
        fontWeight: 'bolder',
        lineHeight: '.765rem',

        '&.quantitySpan': {
            fontSize: '.765rem',
            fontWeight: 'lighter',
            marginTop: '.5rem'
        }
    },

    button: {
        marginTop: 'auto',
        background: 'transparent',
        border: 0,
        color: '$green500',
        fontWeight: 'bold',
        fontSize: '1rem',
        width: '10px',

        cursor: 'pointer'
    }
})

export const DrawerSummary = styled('div', {
    marginTop: '200px',
    width: '100%',
    padding: '12px',
    display: 'flex', 
    flexDirection: 'column',
    gap: '1rem',
})

export const DrawerSummaryItem = styled('div', {
    display: "flex",
    justifyContent: 'space-between',
    margin: 'auto 1rem 0 1rem'
})

export const DrawerSummaryCheckoutButton = styled('button', {
    background: '$green500',
    border: 0,
    height: '70px',
    color: '$gray100',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: 8,
    margin: '1rem 1rem 0 1rem',
    cursor: 'pointer'
})