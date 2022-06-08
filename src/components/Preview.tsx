import './Preview.css'
import { useEffect, useRef } from 'react'

interface PreviewProps {
	code: string
	bundlingStatus: string
}

const html = `
   <html>
	   <head></head>
		 <body>
		   <div id="root"></div>
			 <script>
				const handleError = (err) => {
					const root = document.querySelector('#root');
					root.innerHTML = '<div style="color: red;"><h4>Runtime Error: </h4>' + err + '</div>';
					console.error(err)
				}

				window.addEventListener('error', (event) => {
					event.preventDefault()
					handleError(event.error)
				})

			  window.addEventListener('message', (event) => {
				 try {
					 eval(event.data);
				 } catch (err) {
					 handleError(err)
				 }
				}, false)
			 </script>
		 </body>
	 </html>
`

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
	const iframe = useRef<any>()

	useEffect(() => {
		iframe.current.srcdoc = html

		// Timeout helps against lagging on code result display
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*')
		}, 50)
	}, [code])

	console.log(bundlingStatus)

	return (
		<div className='iframeWrapper'>
			<iframe
				style={{ backgroundColor: 'white', flexGrow: '1' }}
				ref={iframe}
				title='preview'
				sandbox='allow-scripts'
				srcDoc={html}
			/>
			{bundlingStatus && <div className='preview-error'>{bundlingStatus}</div>}
		</div>
	)
}

export default Preview
