import React, {} from 'react'
import Modal from 'react-modal'
import Image from "next/image";
import style from '../modalAvatar/modal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom } from 'swiper/modules';
import 'swiper/css';

Modal.setAppElement('body');

export interface IModal {
  isOpen: boolean;
  setOpenModalAvatar: (openModal: boolean) => void;
  imageIdx?: number;
  images?: string[];
}

const ModalAvatar: React.FC<IModal> = ({ isOpen, setOpenModalAvatar }) => {

  return (
    <Modal
      isOpen={isOpen}
      className={style.modal}
      overlayClassName={style.overlay}
      onRequestClose={() => {
        setOpenModalAvatar(false)
      }}
    >
      <Swiper
        modules={[Zoom]}
        zoom
      >
        <SwiperSlide>
          <div className="swiper-zoom-container">
            <Image className={style.image} src={`/images/avatar/l-avatar.jpg`} height={300} width={380} alt={'Photos of Anya'} quality={100}/>
          </div>
        </SwiperSlide>
      </Swiper>

      <span className={style.closeBtn}>
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="white" strokeWidth="1"/>
          <path d="M9 9L15 15M15 9L9 15" stroke="white" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </span>
    </Modal>
  )
}

export default ModalAvatar;
