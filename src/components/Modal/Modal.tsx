import React from "react";
import styles from "../../sass/components/Modal.module.scss";

interface ModalProps {
  title: string;
  onClickTrue: () => void;
  onClickFalse: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClickTrue, onClickFalse }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.ModalClose}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.707153 0.707031L12.7072 12.707"
            stroke="#52555F"
            stroke-width="2"
          />
          <path
            d="M0.707153 12.707L12.7072 0.70703"
            stroke="#52555F"
            stroke-width="2"
          />
        </svg>
      </div>
      <h3 className={styles.ModalTitle}>{title}</h3>
      <ul className={styles.ModalListBtn}>
        <li className={styles.ModalBtn} onClick={onClickTrue}>
          Так
        </li>
        <li className={styles.ModalBtn} onClick={onClickFalse}>
          Ні
        </li>
      </ul>
    </div>
  );
};

export default Modal;
