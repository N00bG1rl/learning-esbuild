import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './state/store'

//import CodeCell from './components/CodeCell'
//import TextEditor from './components/TextEditor'
import CellList from './components/CellList'

const App = () => {
	return (
		// @ts-ignore
		<Provider store={store}>
			<CellList />
		</Provider>
	)
}

ReactDOM.render(<App />, document.querySelector('#root'))
