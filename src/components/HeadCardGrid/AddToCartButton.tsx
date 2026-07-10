import type { Head } from '../../types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


export default function AddToCartButton ({ head, addFunc }: { head: Head, addFunc(head: Head): void}) {

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Adding ${head.name} head to cart.`);
    addFunc(head);
  }

  const handleMouse = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  if (head.price < 1) {
    return (
      <Box sx={{height: '53px'}}>
        <Typography variant="caption" sx={{ fontSize: 10, color: 'text.secondary' }}>PRICE NOT SET</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Tooltip title="Click here to add to your cart!" onMouseEnter={handleMouse} onMouseOver={handleMouse}>
        <Button 
          onClick={handleClick}
          sx={{
            flexDirection: 'column', 
            color: 'white',
            '&:hover': {
              color: 'secondary.main', // Background color on hover
            },
          }}
        >
          <Typography variant='body2'>
            ${head.price}
          </Typography>
          <Typography variant="caption" sx={{fontSize: 11, display: 'flex', flex: 1, justifyContent: 'center', height: '24px'}}>
            ADD TO CART
          </Typography>
        </Button>
      </Tooltip>
    </Box>
  )
}
