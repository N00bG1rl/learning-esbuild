import { useState } from 'react'

import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Bundle from '../bundler'

const CodeCell = () => {
	const [input, setInput] = useState('')
	const [code, setCode] = useState('')

	const onClick = async () => {
		const output = await Bundle(input)
		setCode(output)
	}

	return (
		<div>
			<CodeEditor
				initialValue='const a = 1;'
				onChange={value => setInput(value)}
			/>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<Preview code={code} />
		</div>
	)
}

export default CodeCell
