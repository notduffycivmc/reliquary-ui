import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"

import Close from '@mui/icons-material/Close'


interface HelpDrawerProps {
  isOpen: boolean
  closeFunc: () => void
}


const ulliStyle = { paddingLeft: '1.25rem', textIndent: '-1.3rem' };
const olliStyle = { paddingLeft: '1.25rem', textIndent: '-1.2rem' };


export default function HelpDrawer({ isOpen, closeFunc }: HelpDrawerProps) {



  return (
    <Drawer open={isOpen} anchor='right' sx={{'.MuiDrawer-paper': {width: '440px'}}}>
      <IconButton onClick={() => closeFunc()} sx={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px'}}>
        <Close />
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4, height: '100%' }} onClick={(e) => e.stopPropagation()}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginX: 10, marginTop: 4, marginBottom: 3, gap: 1}}>         
          <Typography variant="h4" sx={{ textAlign: 'center'}} >Help</Typography>
          <Divider/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 3, marginBottom: 1 }}>Getting Started</Typography>
          <Typography variant="body2">Welcome! This site lets you browse and purchase custom Minecraft player heads. Use the guide below to get started.</Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 3, marginBottom: 1 }}>Navigating the Site</Typography>
          <Typography variant="body2">The main page displays a collection of player heads you can purchase. Here's what you can do:</Typography>
          <ul style={{ listStylePosition: 'inside', paddingLeft: 0, margin: '8px 0 8px 0' }}>
            <li style={ulliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Search: Use the search bar to find heads by name or description</Typography></li>
            <li style={ulliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Filter: Narrow down results by rarity and tags to find the style you're looking for</Typography></li>
            <li style={ulliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>View Details: Click on any head card to view a 3D preview of the head (this feature is currently being improved)</Typography></li>
            <li style={ulliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Add to Cart: Use the "Add to Cart" button on each card to start building your order</Typography></li>
          </ul>

          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 3, marginBottom: 1 }}>Currency Exchange</Typography>
          <Typography variant="body2">Heads are priced in Minecraft currencies: <strong>Diamonds</strong>, <strong>Emeralds</strong>, and <strong>Iron Ingots</strong>.</Typography>
          <Typography variant="body2">To see the current exchange rates (what these items are worth relative to each other), click the <strong>Exchange Rates</strong> button. This will show you exactly how many of each resource equates to the others.</Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 3, marginBottom: 1 }}>Creating a Purchase Order</Typography>
          <Typography variant="body2">Once you've selected the heads you want:</Typography>
          <ol style={{ listStylePosition: 'inside', paddingLeft: 0, margin: '8px 0 8px 0' }}>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Click <strong>Open Cart</strong> to review your items</Typography></li>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>When you're ready to purchase, click the <strong>"Export Purchase Order"</strong> button</Typography></li>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>The order details will be copied to your clipboard</Typography></li>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Head to the <strong>Reliquary Discord server</strong> and navigate to the <strong>#submit-purchase-order</strong> channel</Typography></li>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Click the <strong>"Submit Order"</strong> button</Typography></li>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>Paste your order details into the form that appears</Typography></li>
            <li style={olliStyle}><Typography variant="body2" sx={{ display: 'inline' }}>A ticket will be created to process your order, where the team will handle the currency exchange with you</Typography></li>
          </ol>
          <Typography variant="body2">A member of the Reliquary team will work with you through the ticket to complete the transaction!</Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 3, marginBottom: 1 }}>Need More Help?</Typography>
          <Typography variant="body2">If you have questions or run into issues, reach out to us on Discord or check back here for updates.</Typography>
          <Box sx={{ height: '100px' }} />
        </Box>
      </Box>
      
    </Drawer>
  )
}