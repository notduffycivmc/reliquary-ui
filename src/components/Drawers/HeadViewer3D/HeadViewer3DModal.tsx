import { useState } from 'react'
import { Head } from '../../../types'
import { useHeadViewerScene } from '../../../hooks/useHeadViewerScene'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

interface HeadViewer3DModalProps {
  isOpen: boolean
  head: Head | null
  addFunc: (head: Head) => void
  closeFunc: () => void
}

export default function HeadViewer3DModal({ isOpen, head, addFunc, closeFunc }: HeadViewer3DModalProps) {
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null)

  useHeadViewerScene(canvasEl, head, isOpen)

  if (!head) return null

  return (
    <Dialog open={isOpen} onClose={closeFunc} maxWidth="sm">
      <Box sx={{ paddingX: 3, paddingTop: 10, paddingBottom: 6, position: 'relative' }}>
        <IconButton onClick={closeFunc} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Close />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            width: '90%',
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Typography variant="h5">{head.name}</Typography>
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
            {head.rarity}
          </Typography>
        </Box>

        <canvas
          ref={setCanvasEl}
          style={{
            width: 256,
            height: 256,
            borderRadius: '128px',
            backgroundColor: '#ffffff08',
          }}
        />

        <Button
          onClick={() => addFunc(head)}
          variant="outlined"
          size="small"
          sx={{
            color: 'white',
            borderColor: 'white',
            width: '66%',
            position: 'absolute',
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Add to Cart for ${head.price}
        </Button>
      </Box>
    </Dialog>
  )
}