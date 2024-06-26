import styled from 'styled-components'
import UIButton from '../ui/Button'
import { GenericModal, ModalActions } from './GenericModalStyles'
import useOrder from '../../hooks/useOrder'
import useTotal from '../../hooks/useTotal'
import { resetOrder } from '../../store/menuSlice'
import { useDispatch } from 'react-redux'
import LocalizeText from '../LocalizeText'

const ModalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1em;

  h1:first-child {
    line-height: 1.2em;
    margin-right: 1em;
    margin-bottom: 1em;
  }

  p {
    font-size: 1.2em;
    max-width: 80%;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  ul:nth-child(3) {
    margin-top: auto;
  }

  li {
    list-style: none;
    margin: 0.5em 0;
    display: flex;
    justify-content: space-between;
  }

  li:not(:last-child) {
    border-bottom: 1px dashed var(--color-primary);
  }
`

interface OrderModalProps {
  onClose: () => void
}

const OrderModal = ({ onClose }: OrderModalProps) => {
  const items = useOrder()
  const total = useTotal()
  const dispatch = useDispatch()

  const handleFinishOrder = () => {
    onClose()
  }

  const handleCancelOrder = () => {
    dispatch(resetOrder())
    onClose()
  }

  return (
    <GenericModal
      style={{
        minHeight: '32em',
        maxHeight: '80vh',
        overflowY: 'scroll',
      }}
    >
      <div onClick={onClose} className="close-button">
        <img src="/img/close.svg" alt="" />
      </div>
      <ModalContent>
        <h1>
          <LocalizeText>page.menu.modal.order.title</LocalizeText>
        </h1>

        <ul>
          {items.map((item) => (
            <li key={item.name}>
              <p>
                {item.qtd}x {item.name}
              </p>
              <h3>R$ {item.price}</h3>
            </li>
          ))}
        </ul>

        <ul>
          <li>
            <h3>
              <LocalizeText>page.menu.modal.order.total</LocalizeText>
            </h3>
            <h3>R$ {total}</h3>
          </li>
        </ul>

        <br />
        <ModalActions
          style={{
            marginTop: '0',
          }}
        >
          <UIButton type="" onClick={handleCancelOrder}>
            <LocalizeText>page.menu.modal.button.clean</LocalizeText>
          </UIButton>
          <UIButton onClick={handleFinishOrder}>
            <LocalizeText>page.menu.modal.button.finish</LocalizeText>
          </UIButton>
        </ModalActions>
      </ModalContent>
    </GenericModal>
  )
}

export default OrderModal
