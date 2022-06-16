import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './state/store'

//import CodeCell from './components/CodeCell'
import TextEditor from './components/TextEditor'

const App = () => {
	return (
		// @ts-ignore
		<Provider store={store}>
			<TextEditor />
		</Provider>
	)
}

ReactDOM.render(<App />, document.querySelector('#root'))
