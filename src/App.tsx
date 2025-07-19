import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux';
import { store } from "../src/stores/store";

function App() {

  return (
    <>
      <Provider store={store}>
        <AppRoutes/>
      </Provider>  
    </>
  )
}

export default App
