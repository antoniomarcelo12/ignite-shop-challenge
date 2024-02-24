import { stripe } from "@/lib/stripe";
import { ImageContainer, ImageWrapper, SingleImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
    totalQuantity: any,
    customerName: string
    products: {
        name: string,
        imageUrl: string
    }[]
}

export default function Success({customerName, products, totalQuantity}: SuccessProps) {
    return(
        <>
        <Head>
            <title>Ignite shop | Parabéns!</title>
            <meta name="robots" content="noindex" />
        </Head>
        <SuccessContainer>
            <h1>Compra efetuada!</h1>

                {
                    products.length > 1 ? (
                            <ImageWrapper>
                                {
                                    products.map((item, idx) => {
                                        return (
                                            <ImageContainer key={idx}>
                                                <Image src={item.imageUrl} height={130} width={130} alt="" />
                                            </ImageContainer>
                                        )
                                    })
                                }
                            </ImageWrapper>
                    ) : (
                        <ImageWrapper>
                            <SingleImageContainer>
                                <Image src={products[0].imageUrl} height={130} width={130} alt="" />
                            </SingleImageContainer>
                        </ImageWrapper>
                    )
                }
                
            
            {
                products.length > 1 && (<p>Uhull, <strong>{customerName}</strong>! Sua compra de <strong>{totalQuantity}</strong> camisetas já está a caminho da sua casa.</p>)
            }
            {
                products.length === 1 && (<p>Uhull, <strong>{customerName}</strong>! Sua <strong>{products[0].name}</strong> já está a caminho da sua casa.</p>)
            }
            

            <Link href='/'>Voltar ao catálogo</Link>
        </SuccessContainer>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    if(!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name
    const product = session.line_items?.data

    const totalQuantity = product?.reduce((acc, currentValue) => {
        return Number(acc) + Number(currentValue.quantity)
    }, 0)
            
    const productParsed = product?.map(item => {
        return {
            name: item.price?.product.name,
            imageUrl: item.price?.product.images[0]
        }
    })

    return {
        props: {
            totalQuantity,
            customerName,
            products: productParsed
        }
    }
}