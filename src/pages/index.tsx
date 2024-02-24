
import { useKeenSlider } from 'keen-slider/react'

import { AddToCartButton, CarrousselBackButton, CarrousselNextButton, HomeContainer, Product, ProductFooter, ProductInfoFooter } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { CartContext, ProductItemType } from '@/contexts/CartContext'
import Drawer from '@/components/Drawer/Drawer'

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    defaultPriceId: string,
    nonFormattedPriceInCents: number
  }[],
  isDrawerOpen: boolean,
  handleChangeDrawerVisibility: () => void
}

export default function Home({products, handleChangeDrawerVisibility, isDrawerOpen}: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const { onAddToCart } = useContext(CartContext)


  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  });

  function handleMoveCarrousselBack() {
    instanceRef.current?.prev()
  }

  function handleMoveCarrousselForward() {
    instanceRef.current?.next()
  }

  return (
    <>
    <Head>
      <title>Ignite shop | Home</title>
    </Head>
   

    <HomeContainer ref={sliderRef} className="keen-slider">
      <CarrousselBackButton onClick={handleMoveCarrousselBack}> <ArrowLeft height={32} width={32} /> </CarrousselBackButton>
      {
        products.map(product => {
          return(
            <Product key={product.id} title='Clique para mais informações sobre o produto' className="keen-slider__slide">
                <Link href={`/product/${product.id}`} prefetch={false}>
                  <Image priority src={product.imageUrl} width={520} height={480} alt="" />
                </Link>
                <ProductFooter>
                  <ProductInfoFooter onClick={(e) => e.preventDefault()}>
                    <strong>{product.name}</strong>
                    <span>{ product.price }</span>
                  </ProductInfoFooter>
                  <AddToCartButton onClick={() => onAddToCart(product)} size='small'> <ShoppingBag height={32} width={32} /> </AddToCartButton>
                </ProductFooter>
              </Product>
          )
        })
      }
      <CarrousselNextButton onClick={handleMoveCarrousselForward}> <ArrowRight height={32} width={32} /> </CarrousselNextButton>

    </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      nonFormattedPriceInCents: price.unit_amount,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}