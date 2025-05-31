import React from 'react'
import Modal from 'react-modal'
import type { Props as ModalProps } from 'react-modal';

Modal.setAppElement('body');

const myModal = () => {

  const TypedModal = Modal as unknown as React.FC<ModalProps>;

  return (
    <TypedModal
      isOpen={true}
    >
     <h1>Hello</h1>
        
    </TypedModal>
  )
}

export default myModal;
