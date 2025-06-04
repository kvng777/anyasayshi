import React, {} from 'react'
import Modal from 'react-modal'
import Image from "next/image";
import style from '../modal/modal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom } from 'swiper/modules';
import 'swiper/css';

Modal.setAppElement('body');

export interface IModal {
  isOpen: boolean;
  setOpenModal: (openModal: boolean) => void;
  imageIdx: number;
  images: string[];
}

const MyModal: React.FC<IModal> = ({
  isOpen,
  setOpenModal,
  imageIdx,
  images
}) => {

  return (
    <Modal
      isOpen={isOpen}
      className={style.modal}
      overlayClassName={style.overlay}
      // contentLabel="onRequestClose"
      onRequestClose={() => {
        setOpenModal(false)
        // console.log('on req close click?')
      }}
    >
     <p className={style.caption}>Double tap to zoom in & out!</p> 
      <Swiper
        modules={[Zoom]}
        slidesPerView={1.4}
        initialSlide={imageIdx}
        centeredSlides
        spaceBetween={12}
        zoom
        breakpoints={{
          475: {
            slidesPerView: 2.2,
          },
          700: {
            slidesPerView: 2.8,
          },
          1200: {
            slidesPerView: 3.2,
            spaceBetween: 30,
          },
        }}
      >
        { images.map((img, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className="swiper-zoom-container">
                <Image className={style.image} src={`/images/large/${img}`} height={200} width={280} alt={'Photos of Anya'} quality={100}/>
              </div>
            </SwiperSlide>
          )})
        }
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

export default MyModal;
