import { FC } from 'react';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

export const BaseModal: FC<Props> = ({ children, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        {children}
      </div>
    </div>
  )
}