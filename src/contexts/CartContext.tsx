import { ReactNode, createContext, useEffect, useState } from "react"

interface CartProviderProps {
    children: ReactNode
}

export interface ProductItemType {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description?: string,
    defaultPriceId: string
    amount: number,
    subTotalInCents: number,
    nonFormattedPriceInCents: number
}

interface CartContextType {
    cart: ProductItemType[],
    totalProductsAmount: number,
    onAddToCart: (product: ProductItemType) => void,
    onRemoveFromCart: (product: ProductItemType) => void
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export default function CartProvider({children}: CartProviderProps) {

    const [cart, setCart] = useState<ProductItemType[]>([])
    const [totalProductsAmount, setTotalProductsAmount] = useState(0)

    function onAddToCart(product: ProductItemType) {
        const isProductInCart = cart.some((item) => item.id === product.id)


        if(!isProductInCart) {
            setCart([
                ...cart,
                {
                    ...product,
                    amount: 1,
                    subTotalInCents: product.nonFormattedPriceInCents,

                }
            ])
            setTotalProductsAmount(totalProductsAmount + 1)
        } else {
            setCart(
                cart.map((item) => item.id === product.id && item.amount && item.subTotalInCents ? {...item, amount: item.amount + 1, subTotalInCents: item.subTotalInCents + item.nonFormattedPriceInCents } : item)
            )
            setTotalProductsAmount(totalProductsAmount + 1)
        }

    }

    function onRemoveFromCart(product: ProductItemType) {
        const updatedCart = [...cart]
        const index = updatedCart.findIndex(item => item.id === product.id)
        
        if(index !== -1) {
            if(product.amount > 1){
                updatedCart[index] = {
                    ...product,
                    amount: product.amount - 1,
                    subTotalInCents: product.subTotalInCents - product.nonFormattedPriceInCents
                }
                
            } else {
                updatedCart.splice(index, 1)
            }
            setCart(updatedCart)
            setTotalProductsAmount(totalProductsAmount - 1)
        }
    } 
        

    return(
        <CartContext.Provider value={{cart, onAddToCart, onRemoveFromCart, totalProductsAmount }}>
            { children }
        </CartContext.Provider>
    )
}