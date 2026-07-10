import { useState, useEffect } from 'react'

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';


export interface OpenCartButtonProps {
  openCart: (value: boolean) => void
  cartSize: number
}


export default function OpenCartButton({ openCart, cartSize } : OpenCartButtonProps) {
  const [hasItems, setHasItems] = useState(false);

  useEffect(() => {
    setHasItems(cartSize > 0);
  }, [cartSize]);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    openCart(hasItems);
  }

  return (
    <Tooltip title='Open Shopping Cart' placement='left'>
      <IconButton size='large' onClick={handleClick}>
        <Badge variant='dot' color='success' invisible={!hasItems}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  )
};

