import { createPortal } from 'react-dom';
import TextInput from '../../ui/TextInput';
import ModalBtton from '../../ui/ModalBtton';

export default function EditBoardModal() {
	return createPortal(
		<dialog id='edit_board_modal' className='modal'>
			<div className='modal-box modal-custom-container'>
				<h3 className='mb-8 text-base font-semibold'>Edit Board</h3>
				<div className='flex flex-col space-y-6'>
					<label className='flex flex-col w-full space-y-2 max-w-none form-control '>
						<div className='label'>
							<span className='text-xs font-bold text-text '>Name</span>
						</div>
						<TextInput />
					</label>
					<label className='flex flex-col w-full space-y-2 max-w-none form-control '>
						<div className='label'>
							<span className='text-xs font-bold text-text'>Columns</span>
						</div>
						<TextInput />
					</label>
					<div className='flex flex-col space-y-5 font-bold text-[14px] '>
						<ModalBtton color='secondary'> + Add New Column</ModalBtton>
						<ModalBtton color='primary'>Save Chagnes</ModalBtton>
					</div>
				</div>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>,
		document.body
	);
}