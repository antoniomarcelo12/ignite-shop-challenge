import { Heading1, X } from "lucide-react";
import { CloseDrawerButton, DrawerContainer, DrawerContent, DrawerProduct, DrawerSummary, DrawerSummaryCheckoutButton, DrawerSummaryItem, ImageContainer, ProductInfo } from "./styles";
import Image from "next/image";

import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import axios from "axios";

interface DrawerProps {
    handleChangeDrawerVisibility: () => void
}

export default function Drawer({handleChangeDrawerVisibility}: DrawerProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const {cart, onRemoveFromCart} = useContext(CartContext)

    const totalItens = cart.reduce(function (acc, currentValue){
        if(currentValue.amount){
            return acc + currentValue.amount
        }
        return 0
    }, 0)
    const totalCost = cart.reduce(function (acc, currentValue){
        if(currentValue.subTotalInCents){
            return acc + currentValue.subTotalInCents
        }
        return 0
    }, 0) / 100

    async function handlePurchase() {
        try {
                setIsCreatingCheckoutSession(true)

                const cartParsed = cart.map(item => {
                    return {
                        price: item.defaultPriceId,
                        quantity: item.amount
                    }
                })
                const response = await axios.post('/api/checkout', {cartParsed})

                const { checkoutUrl } = response.data

                window.location.href = checkoutUrl
        }catch(err){

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return(
        <DrawerContainer>
            <CloseDrawerButton onClick={handleChangeDrawerVisibility}> <X /> </CloseDrawerButton>
            <DrawerContent>
                <h1>Sacola de compras</h1>

                {
                    cart.length > 0 ? (
                    cart.map(item => {
                        return(
                            <DrawerProduct key={item.id}>
                                <ImageContainer>
                                    <Image src={item.imageUrl} width={100} height={93} alt="" />
                                </ImageContainer>
                                <ProductInfo>
                                    <p>{item.name}</p>
                                    <span>{item.price}</span>
                                    <span className="quantitySpan">Quantidade: {item.amount}</span>
                                    <button onClick={() => onRemoveFromCart(item)}>Remover</button>
                                </ProductInfo>
                            </DrawerProduct>
                        )
                    }) ) : (<h1 className="noProductsOnCart">Ainda não há itens no seu carrinho.</h1>)
                } 
            </DrawerContent>
            {
                cart.length > 0 && (
                    <DrawerSummary>
                        <DrawerSummaryItem>
                            <span>Quantidade</span>
                            <span>{totalItens} itens</span>
                        </DrawerSummaryItem>
                        <DrawerSummaryItem>
                            <span>Valor total</span>
                            <span>{ new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalCost) }</span>
                        </DrawerSummaryItem>
                        <DrawerSummaryCheckoutButton onClick={handlePurchase}>Finalizar compra</DrawerSummaryCheckoutButton>
                    </DrawerSummary>
                )
            }
            
        </DrawerContainer>
    );
}