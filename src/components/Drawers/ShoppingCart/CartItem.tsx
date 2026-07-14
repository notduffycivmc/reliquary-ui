import type { Head } from "../../../types"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import { useEffect, useState } from "react"


export interface CartItemProps {
    head: Head
    count: number
    addFunc: (uuid: Head) => void
    removeFunc: (uuid: Head) => void
}


export default function CartItem({ head, count, addFunc, removeFunc }: CartItemProps) {
  const [headCount, setHeadCount] = useState(0);

  useEffect(() => {
    setHeadCount(count)
  }, [count])

  const handleAddClick = () => {
    setHeadCount(headCount + 1);
    addFunc(head);
  }

  const handleRemoveClick = () => {
    setHeadCount(headCount - 1);
    removeFunc(head);
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, backgroundColor: "#ffffff11", borderRadius: 2, padding: 1, minWidth: '375px', maxWidth: '375px'}}>
      <Box sx={{ display: 'flex', flex: 7, justifyContent: 'flex-start', alignItems: 'center', paddingX: 1}}>
        <Typography variant="body1">{head.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flex: 4, justifyContent: 'space-between', alignItems: 'center', paddingX: 1}}>
        <IconButton size="small" onClick={handleRemoveClick}>
          <Remove />
        </IconButton>
        <Typography variant="body1" >{headCount}</Typography>
        <IconButton size="small" onClick={handleAddClick}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  )
}