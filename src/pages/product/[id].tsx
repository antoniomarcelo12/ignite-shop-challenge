import { CartContext } from "@/contexts/CartContext";
import { stripe } from "@/lib/stripe";
import { AddToCartButton } from "@/styles/pages/home";
import { ImageContainer, ProductActionsWrapper, ProductContainer, ProductDetails, ShopNowButton } from "@/styles/pages/product";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Stripe from "stripe";

interface ProductProps {
    product: {
            id: string,
            name: string,
            imageUrl: string,
            price: string,
            description: string,
            defaultPriceId: string
        },
        handleChangeDrawerVisibility: () => void
}

export default function Product({product, handleChangeDrawerVisibility}: ProductProps) {

    const {onAddToCart, cart} = useContext(CartContext)

    function handleAddToCart() {
        onAddToCart(product)
        handleChangeDrawerVisibility()
    }

    


    return (
        <>
        <Head>
            <title>Ignite shop | {product.name}</title>
        </Head>
        <ProductContainer>
            <ImageContainer>
                <Image alt="" src={product.imageUrl} width={520} height={480} />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>
                <p>{product.description}</p>

                <ProductActionsWrapper>
                    <ShopNowButton title="Comprar agora" onClick={handleAddToCart}>Comprar agora</ShopNowButton>
                    <AddToCartButton onClick={() => onAddToCart(product)} title="Adicionar ao carrinho" size='large'> <ShoppingBag height={32} width={32} /> </AddToCartButton>
                </ProductActionsWrapper>
            </ProductDetails>
        </ProductContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
      })
    
      const productIds = response.data.map(product => {
    
        return {
            params: {
                id: product.id,
            }
        }
      })

    return {
        paths: productIds,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<any, {id: string} > = async ({ params }) => {
    if(!params){
        throw new Error()
    }
    
    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return{

        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                nonFormattedPriceInCents: price.unit_amount,
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(price.unit_amount ? price.unit_amount / 100 : 0),
                description: product.description,
                defaultPriceId: price.id
              }
        },
        revalidate: 60 * 60 * 1 // one hour
    }
}