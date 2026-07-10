import { Head } from "../../types"

import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import Close from '@mui/icons-material/Close'

import ShoppingCart from '../../services/ShoppingCart'

import CartItem from "./CartItem"


interface CartDrawerProps {
  isOpen: boolean
  cart: ShoppingCart
  closeFunc: () => void
  addFunc: (head: Head) => void
  removeFunc: (head: Head) => void
  clearFunc: () => void
}


export default function CartDrawer({ isOpen, cart, closeFunc, addFunc, removeFunc, clearFunc }: CartDrawerProps) {

  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseOrder, setPurchaseOrder] = useState('');

  useEffect(() => {
    setTotalPrice(cart.totalPrice);
  }, [cart.size]);

  useEffect(() => {
    if (!isOpen) setPurchaseOrder('');
  }, [isOpen]);

  const handleAddClick = (head: Head) => {
    addFunc(head);
    setTotalPrice(cart.totalPrice);
  }

  const handleRemoveClick = (head: Head) => {
    removeFunc(head);
    setTotalPrice(cart.totalPrice);
  }

  const handleClearClick = () => {
    clearFunc();
    setPurchaseOrder('');
    closeFunc();
  }

  const handleExportClick = () => {
    setPurchaseOrder(cart.exportData())
  }

  const handleClipboardClick = () => {
    navigator.clipboard.writeText(purchaseOrder);
  }

  const handleCloseClick = () => {
    setPurchaseOrder('');
    closeFunc();
  }

  return (
    <Drawer open={isOpen} anchor='right'>
      {/* Close Cart Button */}
      <IconButton onClick={handleCloseClick} sx={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px'}}>
        <Close />
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4, height: '100%' }} onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginX: 10, marginTop: 4, marginBottom: 3, gap: 1}}>         
          <Typography variant="h6" sx={{ textAlign: 'center'}} >Shopping Cart</Typography>
          <Divider/>
        </Box>
        {/* Cart Items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
          {
            Array.from(cart.items).map(([key, value]) => (
              <CartItem key={key} {...value} addFunc={handleAddClick} removeFunc={handleRemoveClick}/>
            ))
          }
        </Box>
        {/* Clear Cart Button */}
        <Button variant='outlined' color='error' sx={{ fontWeight: 'bold', margin: 4}} onClick={handleClearClick}>
          Clear Cart
        </Button>
        {/* Total Price */}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginX: 10, marginTop: 1, marginBottom: 3, gap: 1}}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>Total Price</Typography>
          <Divider/>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'space-between', gap: 2, margin: 2}}>
            <Typography variant='body1'>{totalPrice} Duffy Dollars</Typography>
          </Box>
        </Box>
        {/* Export Button */}
        <Button variant='outlined' color='secondary' sx={{ fontWeight: 'bold' }} onClick={handleExportClick}>
          Export Purchase Order
        </Button>
        {/* Purchase Order Section */}
        {
          purchaseOrder.length > 0 && (
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginTop: 4,
                padding: 2,
                bgcolor: 'background.paper', 
                borderRadius: 2, 
                width: '320px', 
                alignSelf: 'center'
              }}
            >
              {/* Purchase Order Display */}
              <Typography component="code" sx={{fontFamily: 'monospace'}}>
                {purchaseOrder}
              </Typography>
              {/* Copy Purchase Order to Clipboard Button */}
              <Button onClick={handleClipboardClick}>Copy to Clipboard</Button>
            </Box>
          )
        }
      </Box>
    </Drawer>
  )
};