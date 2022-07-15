import './CodeCell.css'
import { useEffect } from 'react'

import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Resizable from './Resizable'
import { Cell } from '../state'

import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'
import { useCumulativeCode } from '../hooks/use-cumulative-code'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions()
	const bundle = useTypedSelector(state => state.bundles[cell.id])
	const cumulativeCode = useCumulativeCode(cell.id)

	useEffect(() => {
		// Display preview window on load not after 1s
		if (!bundle) {
			createBundle(cell.id, cumulativeCode)
			return
		}

		const timer = setTimeout(async () => {
			createBundle(cell.id, cumulativeCode)
		}, 1000)

		// Called automaticaly the NEXT time useEffect is called
		return () => {
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, cell.id, createBundle])

	return (
		<Resizable direction='vertical'>
			<div className='code-cell-wrapper'>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={value => updateCell(cell.id, value)}
					/>
				</Resizable>
				<div className='progress-wrapper'>
					{
						!bundle || bundle.loading
							?
							<div className='progress-cover'>
								<progress className='progress is-small is-primary' max="100"></progress>
							</div>

							: <Preview code={bundle.code} bundlingStatus={bundle.err} />
					}
				</div>
			</div>
		</Resizable>
	)
}

export default CodeCell
