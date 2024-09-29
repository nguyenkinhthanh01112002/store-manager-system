import { AntProvider, QueryProvider } from './provider'
import RoutesList from './routes/RouteList'

function App() {
  return (
    <QueryProvider>
      <AntProvider>
        <RoutesList />
      </AntProvider>
    </QueryProvider>
  )
}

export default App
