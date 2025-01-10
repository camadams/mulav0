'use client'

import React, { useEffect, useRef } from 'react'

interface PieChartData {
  category: string
  amount: number
  color: string
}

interface CanvasPieChartProps {
  data: PieChartData[]
  width: number
  height: number
}

const CanvasPieChart: React.FC<CanvasPieChartProps> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0)
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 10

    let startAngle = 0
    data.forEach((item) => {
      const sliceAngle = (item.amount / totalAmount) * 2 * Math.PI
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      // Add labels
      const middleAngle = startAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(middleAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(middleAngle) * (radius * 0.7)

      ctx.fillStyle = '#000000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(item.category, labelX, labelY)

      startAngle = endAngle
    })
  }, [data, width, height])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default CanvasPieChart

