import type { Head } from "../../types";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AddToCartButton from "./AddToCartButton";


interface HeadCardProps {
  head: Head
  addFunc: (head: Head) => void
  viewFunc: (head: Head) => void
}


export default function HeadCard({ head, addFunc, viewFunc }: HeadCardProps) {
  return (
    <Card
      onClick={() => viewFunc(head)}
      sx={{ 
        width: 220, 
        maxWidth: 220, 
        height: 330, 
        maxHeight: 330,
        transition: 'all 0.2s ease-in-out',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          backgroundColor: '#ffffff11',
        },
      }}
    >
      {/* Head Name */}
      <Typography 
        sx={{
          marginY: 1, 
          paddingTop: 1, 
          paddingX: 1,
          display: 'flex', 
          flex: 1,
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          fontWeight: '500'
      }}>
        {head.name}
      </Typography>

      {/* Head Preview */}
      <Divider sx={{ width: "90%" }}/>
      
      <Tooltip title="Click here to preview in 3D">
        <CardMedia
          component="img"
          image={`/reliquary-ui/thumbnails/${head.uuid}.png`}
          sx={{ width: 'auto', height: 112, objectFit: 'contain',  marginY: 1 }}
        />
      </Tooltip>
      
      {/* Head Information */}
      <Divider sx={{ width: "90%" }}/>
      <Box sx={{padding: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flex: 2}}>
        <Typography variant="subtitle2" sx={{ color: 'redtext.secondary' }}>{head.rarity}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>({head.quantity} in stock)</Typography>
      </Box>

      {/* Purchase Option */}
      <Divider sx={{ width: "90%" }}/>
      <Box sx={{width: '100%', padding: 0, marginY: 1, display: 'flex', flex: 1, flexDirection: 'column'}}>
        <AddToCartButton head={head} addFunc={addFunc}/>
      </Box>
    </Card>
  );
};
