import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import './styles.css';

interface IConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: IConfirmationModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.modal')) return;
      onCancel();
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
        <h2 className="text-lg font-medium text-gray-900">Confirmation</h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
