import React from 'react'
import {BrowserMultiFormatReader, Result} from '@zxing/library'

const App: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const [codeReader] = React.useState(new BrowserMultiFormatReader())
  const [deviceId, setDeviceId] = React.useState('')
  const [result, setResult] = React.useState<Result | undefined>()

  React.useEffect(() => {
    codeReader
      .listVideoInputDevices()
      .then((devices) => {
        setDeviceId(devices[0].deviceId)
      })
  }, [])

  const handleClickStartButton = (): void => {
    codeReader.decodeFromVideoDevice(deviceId, 'video', (result) => {
      if (result) {
        setResult(result)
        draw(result)
      }
    })
  }

  const draw = (result: Result): void => {
    console.log(videoRef.current, canvasRef.current)
    if (!videoRef.current || !canvasRef.current) { return }

    const context = canvasRef.current.getContext("2d")
    console.log(context)
    if (!context) { return }

    context.clearRect(0, 0, 600, 400)
    context.drawImage(videoRef.current, 0, 0, 600, 400)

    const resultPoints = result.getResultPoints()
    console.log(resultPoints)
    if (!resultPoints || resultPoints.length < 2) { return }

    context.strokeStyle = 'red'
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(resultPoints[0].getX(), resultPoints[0].getY())
    context.lineTo(resultPoints[1].getX(), resultPoints[1].getY())
    context.stroke()
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: 600,
      margin: '0 auto'
    }}>
      <video
        ref={videoRef}
        id="video"
        width="600"
        height="400"
        style={{border: "1px solid gray"}} />
      <button onClick={handleClickStartButton}>
        start
      </button>
      {result &&
        <pre style={{border: '1px solid black', width: '100%'}}>
          {JSON.stringify(result, undefined, '  ')}
        </pre>
      }
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
      />
    </div>
  )
}

export default App