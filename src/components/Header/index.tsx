import logoImg from '../../assets/logo.svg'
import Image from "next/image";
import Link from "next/link";
import { CenteredHeader, DrawerContainer, Header, HeaderCartIndicator } from "@/styles/pages/app";
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { ShoppingBagIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderComponentProps {
  isDrawerOpen: boolean,
  handleChangeDrawerVisibility: () => void
}

export default function HeaderComponent({handleChangeDrawerVisibility, isDrawerOpen}: HeaderComponentProps) {

    const {totalProductsAmount} = useContext(CartContext)

    const pathName = usePathname()

    if(pathName === '/success'){
      return(
        <CenteredHeader>
          <Link href='/'>
            <Image src={logoImg} alt="" />
          </Link>
        </CenteredHeader>
      )
    }
  
    return(
        <Header>
          <Link href='/'>
            <Image src={logoImg} alt="" />
          </Link>

          <HeaderCartIndicator onClick={handleChangeDrawerVisibility}>
            <ShoppingBagIcon height={32} width={32} strokeWidth={2} />
            <span>{totalProductsAmount}</span>
          </HeaderCartIndicator>        
        </Header>

    )
}