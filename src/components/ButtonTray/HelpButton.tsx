import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';


export default function HelpButton() {

  return (
    <Tooltip title='Help' placement='left'>
      <IconButton size='large'>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  )
};