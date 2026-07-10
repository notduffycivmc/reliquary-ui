import IconButton from '@mui/material/IconButton';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Tooltip from '@mui/material/Tooltip';


export default function ExchangeRatesButton() {

  return (
    <Tooltip title='Exchange Rates' placement='left'>
      <IconButton size='large'>
        <CurrencyExchangeIcon  />
      </IconButton>
    </Tooltip>
  )
};

