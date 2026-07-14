import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';


export interface HelpButtonProps {
  openHelp: () => void
}


export default function HelpButton({ openHelp }: HelpButtonProps) {

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    openHelp();
  }

  return (
    <Tooltip title='Help' placement='left'>
      <IconButton size='large' onClick={handleClick}>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  )
};