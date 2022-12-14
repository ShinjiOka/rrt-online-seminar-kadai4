import { FC } from 'react';
import { BaseModal } from '../BaseModal';
import styles from './index.module.css';

type Props = {
  isOpen: boolean;
  message?: string;
  onClickCancel?: () => void;
  onClickOk: () => void;
}

export const ConfirmModal: FC<Props> = ({
  onClickCancel,
  onClickOk,
  isOpen,
  message,
}) => {
  return (
    <BaseModal isOpen={isOpen}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonContainer}>
        <button 
          className={`${styles.button}`}
          onClick={(e) => {
            (e.target as HTMLInputElement).blur();
            if (!onClickCancel) return;

            onClickCancel();
          }}
        >
          いいえ
        </button>
        <button
          className={`${styles.button} ${styles.okButton}`}
          onClick={(e) => {
            (e.target as HTMLInputElement).blur();

            onClickOk();
          }}
        >
          はい
        </button>
      </div>
    </BaseModal>
  )
}