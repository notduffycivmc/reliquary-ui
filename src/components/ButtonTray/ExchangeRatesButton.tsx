import IconButton from '@mui/material/IconButton';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Tooltip from '@mui/material/Tooltip';


export interface ExchangeRatesButtonProps {
  openHelp: () => void
}


export default function ExchangeRatesButton({ openHelp }: ExchangeRatesButtonProps) {

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    openHelp();
  }

  return (
    <Tooltip title='Exchange Rates' placement='left'>
      <IconButton size='large' onClick={handleClick}>
        <CurrencyExchangeIcon  />
      </IconButton>
    </Tooltip>
  )
};

