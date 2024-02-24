import { globalStyles } from "@/styles/globals";
import "@/styles/globals";
import type { AppProps } from "next/app";
import { Container } from "@/styles/pages/app";
import CartProvider from "@/contexts/CartContext";
import HeaderComponent from "@/components/Header";
import { useState } from "react";
import Drawer from "@/components/Drawer/Drawer";

globalStyles()
export default function App({ Component, pageProps }: AppProps) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function handleChangeDrawerVisibility(){
      setIsDrawerOpen(!isDrawerOpen)
  }


  return (
    <Container>
      <CartProvider>
       {
        isDrawerOpen && <Drawer handleChangeDrawerVisibility={handleChangeDrawerVisibility} />
      }
    
        <HeaderComponent  isDrawerOpen={isDrawerOpen} handleChangeDrawerVisibility={handleChangeDrawerVisibility} />
        <Component isDrawerOpen={isDrawerOpen} handleChangeDrawerVisibility={handleChangeDrawerVisibility} {...pageProps} />
      </CartProvider>
    </Container>
  )
}
