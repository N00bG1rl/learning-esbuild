import { useState, useEffect } from 'react'

import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Bundle from '../bundler'
import Resizable from './Resizable'

const CodeCell = () => {
	const [input, setInput] = useState('')
	const [code, setCode] = useState('')

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await Bundle(input)
			setCode(output)
		}, 1000)

		// Called automaticaly the NEXT time useEffect is called
		return () => {
			clearTimeout(timer)
		}
	}, [input])

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue='const a = 1;'
						onChange={value => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	)
}

export default CodeCell
