import Box from "@mui/material/Box";
import ExchangeRatesButton, { ExchangeRatesButtonProps } from "./ExchangeRatesButton";
import HelpButton, { HelpButtonProps } from "./HelpButton";
import OpenCartButton, { OpenCartButtonProps } from "./OpenCartButton";


interface ButtonTrayProps {
  exchangeRatesButtonProps: ExchangeRatesButtonProps
  helpButtonProps: HelpButtonProps
  openCartButtonProps: OpenCartButtonProps
}


export default function ButtonTray({ exchangeRatesButtonProps, helpButtonProps, openCartButtonProps }: ButtonTrayProps) {
  return (
    <Box sx={{ 
      position: 'fixed', 
      top: '50%', 
      right: '7px', 
      paddingY: 1,
      paddingX: '1px',
      gap: 1,
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'space-between',
      transform: 'translateY(-50%)',
      backgroundColor: '#a0c9c933',
      borderRadius: 1,
      zIndex: 1000

    }}>
      <ExchangeRatesButton {...exchangeRatesButtonProps}/>
      <OpenCartButton {...openCartButtonProps}/>
      <HelpButton {...helpButtonProps}/>
    </Box>
  )
}