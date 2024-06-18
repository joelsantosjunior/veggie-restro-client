import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Menu from './routes/Menu'
import Modal from './modals/Modal'
import OrderModal from './modals/OrderModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from './store/store'
import { Locale, setLocale, setShowOrderModel } from './store/UISlice'
import { useEffect } from 'react'
import { setMenu } from './store/menuSlice'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />,
  },
])

function App() {
  const dispatch = useDispatch()

  const showOrderModal = useSelector(
    (state: AppState) => state.ui.showOrderModel
  )

  useEffect(() => {
    const initialLocale = 'pt' // (navigator?.language?.split('-')?.[0] as Locale) || 'en'

    dispatch(setLocale(initialLocale as Locale))
    dispatch(setMenu(initialLocale))
  })

  return (
    <>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
      {showOrderModal && (
        <Modal>
          <OrderModal
            onClose={() => {
              console.log('close')
              dispatch(setShowOrderModel(false))
            }}
          ></OrderModal>
        </Modal>
      )}
    </>
  )
}

export default App
