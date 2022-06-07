import './Resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
	direction: 'horizontal' | 'vertical'
	children: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const [innerHeight, setInnerHeight] = useState(window.innerHeight)
	const [width, setWidth] = useState(window.innerWidth * 0.75)

	let resizableProps: ResizableBoxProps

	useEffect(() => {
		let timer: any

		const listener = () => {
			if (timer) {
				clearTimeout(timer)
			}

			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth)
				setInnerHeight(window.innerHeight)
				// Hack for browser horizontal resize
				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75)
				}
			}, 100)
		}

		window.addEventListener('resize', listener)

		// Cleanup
		return () => {
			window.removeEventListener('resize', listener)
		}
	}, [width])

	if (direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			height: Infinity,
			width,
			resizeHandles: ['e'],
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			onResizeStop: (event, data) => {
				setWidth(data.size.width)
			},
		}
	} else {
		resizableProps = {
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight * 0.9],
		}
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
