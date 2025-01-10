// 'use client'

// import React, { useEffect, useRef } from 'react'
// // import * as PIXI from 'pixi.js'
// // import { Stage, Container, Graphics } from '@inlet/react-pixi'

// interface PieChartData {
//   category: string
//   amount: number
//   color: number
// }

// interface PixiPieChartProps {
//   data: PieChartData[]
//   width: number
//   height: number
// }

// const PixiPieChart: React.FC<PixiPieChartProps> = ({ data, width, height }) => {
//   const totalAmount = data.reduce((sum, item) => sum + item.amount, 0)
//   const containerRef = useRef<PIXI.Container>(null)

//   useEffect(() => {
//     if (containerRef.current) {
//       const container = containerRef.current
//       container.removeChildren()

//       let startAngle = 0
//       data.forEach((item) => {
//         const slice = new PIXI.Graphics()
//         const endAngle = startAngle + (item.amount / totalAmount) * Math.PI * 2

//         slice.beginFill(item.color)
//         slice.moveTo(0, 0)
//         slice.arc(0, 0, Math.min(width, height) / 2, startAngle, endAngle)
//         slice.lineTo(0, 0)
//         slice.endFill()

//         container.addChild(slice)

//         startAngle = endAngle
//       })
//     }
//   }, [data, width, height, totalAmount])

//   return (
//     <Stage width={width} height={height} options={{ backgroundColor: 0xffffff }}>
//       <Container ref={containerRef} x={width / 2} y={height / 2} />
//     </Stage>
//   )
// }

// export default PixiPieChart

export default function PixiPieChart() {
  return <div>hi</div>;
}
