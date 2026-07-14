import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import Close from '@mui/icons-material/Close'

export interface ExchangeRatesDrawerProps {
  isOpen: boolean
  closeFunc: () => void
}

interface ExchangeRate {
  paperAmount: number
  resourceIcon: string
  resourceName: string
  resourceAmount: number
}

export default function ExchangeRatesDrawer({ isOpen, closeFunc }: ExchangeRatesDrawerProps) {
  const exchangeRates: ExchangeRate[] = [
    { paperAmount: 1, resourceIcon: '/reliquary-ui/assets/iron_icon.png',    resourceName: 'Iron Ingot',  resourceAmount: 1 },
    { paperAmount: 4, resourceIcon: '/reliquary-ui/assets/emerald_icon.png', resourceName: 'Emerald',     resourceAmount: 1 },
    { paperAmount: 8, resourceIcon: '/reliquary-ui/assets/diamond_icon.png', resourceName: 'Diamond',     resourceAmount: 1 },
  ]

  return (
    <Drawer open={isOpen} anchor='right' sx={{'.MuiDrawer-paper': {width: '440px'}}}>
      <IconButton onClick={() => closeFunc()} sx={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px'}}>
        <Close />
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4, height: '100%' }} onClick={(e) => e.stopPropagation()}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginX: 10, marginTop: 4, marginBottom: 3, gap: 1}}>         
          <Typography variant="h6" sx={{ textAlign: 'center'}} >Currency Exchange</Typography>
          <Divider/>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 3}}>
          <Typography variant="body2">
            Below are the current exchange rates for Minecraft currencies. Use this chart to understand how many Duffy Dollars you'll receive when trading in each resource.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            The left side shows the resource you're trading in, and the right side shows the number of Duffy Dollars you'll receive.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Duffy Dollars can be purchased in the <strong>Reliquary shop</strong>.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignSelf: 'center', width: '80%'}}>
          <Card>
            {exchangeRates.map((rate, index) => (
              <CardContent key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: 1, height: '64px'}}>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{width: '100px'}}>{rate.resourceAmount} {rate.resourceName}</Typography>
                  <img src={rate.resourceIcon} alt={rate.resourceName} style={{ width: '32px', height: '32px' }} />
                </Box>

                <Typography sx={{ fontWeight: 'bold' }}>=</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src='/reliquary-ui/assets/paper_icon.png' alt='Paper' style={{ width: '32px', height: '32px' }} />
                  <Typography>${rate.paperAmount}</Typography>
                </Box>

              </CardContent>
          ))}
          </Card>
        </Box>
      </Box>
    </Drawer>
  )
}