import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Head } from "../../../types"

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
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const meshRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationIdRef = useRef<number | null>(null)

  // Rotation state
  const spinAngleRef = useRef(0)

  useEffect(() => {
    if (!isOpen || !head || !canvasEl) return

    // Initialize Three.js scene
    const canvas = canvasEl
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      45,
      512 / 512,
      0.1,
      1000
    )
    camera.position.set(0.5, 1, 3)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(256, 256)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    rendererRef.current = renderer

    const imageLoader = new THREE.ImageLoader()
    const texturePath = `/reliquary-ui/textures/${head.uuid}.png`

    imageLoader.load(
      texturePath,
      (img) => {
        const faceTex = (image: HTMLImageElement, sx: number, sy: number) => {
          const canvas = document.createElement('canvas')
          canvas.width = 8
          canvas.height = 8

          const ctx = canvas.getContext('2d')!
          ctx.drawImage(image, sx, sy, 8, 8, 0, 0, 8, 8)

          const t = new THREE.CanvasTexture(canvas)
          t.magFilter = THREE.NearestFilter
          t.minFilter = THREE.NearestFilter
          t.colorSpace = THREE.SRGBColorSpace
          return t
        }

      const HEAD_COORDS = [[0, 8], [16, 8], [8, 0], [16, 0], [8, 8], [24, 8]]
      const HAT_COORDS = [[32, 8], [48, 8], [40, 0], [48, 0], [40, 8], [56, 8]]

      const buildMaterials = (img: HTMLImageElement, coords: number[][]) => {
        return coords.map(([sx, sy]) =>
          new THREE.MeshBasicMaterial({
            map: faceTex(img, sx, sy),
            transparent: true,
            alphaTest: 0.05,
            side: THREE.DoubleSide,
          })
        )
      }

      const headGeo = new THREE.BoxGeometry(1, 1, 1)
      const hatGeo = new THREE.BoxGeometry(1.125, 1.125, 1.125)
      const headMesh = new THREE.Mesh(headGeo, buildMaterials(img, HEAD_COORDS))
      const hatMesh = new THREE.Mesh(hatGeo, buildMaterials(img, HAT_COORDS))

      const group = new THREE.Group()
      group.add(headMesh)
      group.add(hatMesh)
      scene.add(group)
      meshRef.current = group
    },
    undefined,
    (error) => {
      console.error('Failed to load texture:', error)
    }
    )

    const WORLD_Y = new THREE.Vector3(0, 1, 0)

    camera.updateMatrixWorld(true)

    const SPIN_SPEED = 0.01 // positive = clockwise

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!meshRef.current) {
        renderer.render(scene, camera)
        return
      }

      spinAngleRef.current += SPIN_SPEED
      meshRef.current.quaternion.setFromAxisAngle(WORLD_Y, spinAngleRef.current)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on unmount
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      renderer.dispose()
      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose()
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose())
            } else {
              obj.material.dispose()
            }
          }
        })
      }
      spinAngleRef.current = 0;
    }
  }, [isOpen, head, canvasEl])

  if (!head) return null

  return (
    <Dialog open={isOpen} onClose={closeFunc} maxWidth="sm">
      <Box sx={{ paddingX: 3, paddingTop: 10, paddingBottom: 6 }}>

        <IconButton onClick={closeFunc} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Close />
        </IconButton>
        {/* Head Information */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            textAlign: 'center',
            width: '90%',
            position: 'absolute', 
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -15%)',
          }}
        >
          <Typography variant='h5'>{head.name}</Typography>
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>{head.rarity}</Typography>
        </Box>
        {/* Head Viewer WebGL Canvas */}
        <canvas
          ref={setCanvasEl} 
          style={{ 
            width: 256, 
            height: 256, 
            borderRadius: '128px', 
            backgroundColor: '#ffffff08'
          }}
        />
        {/* Add to Cart Button */}
        <Button
          onClick={() => addFunc(head)}
          variant='outlined' 
          size='small' 
          sx={{
            color: 'white', 
            borderColor: 'white',
            width: '66%', 
            position: 'absolute',
            bottom: '8%',
            left: '50%',
            transform: 'translate(-50%, -8%)',
          }}
        >
          Add to Cart for ${head.price}
        </Button>
      </Box>
    </Dialog>
  )
}