import 'app/styles/index.scss'

import { withProviders } from 'pages/providers/withProviders'
import { Routing } from 'pages/routing'

const App = () => <Routing />

export default withProviders(App)
