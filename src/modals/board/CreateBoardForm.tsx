import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import { FormRow, TextInput, ModalButton } from '../../ui';
import { Board, Column } from '../../models';
import {
	createModalBoardId,
	modalCloseHandler,
	navigateModalBoardId,
} from '../../utils';
import CrossIcon from '../../assets/icon-cross.svg';
import useBoard from '../../hooks/useBoard';
import { addBoard, setActiveBoard } from '../../state/BoardsSlilce';
export type FormFields = {
	name: string;
	columnNumbers?: { column: string }[];
};
export default function createBoardModal() {
	const methods = useForm<FormFields>({
		defaultValues: {
			name: '',
			columnNumbers: [{ column: 'column 01' }],
		},
	});
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = methods;
	const dispatch = useDispatch();
	const { fields, append, remove } = useFieldArray({
		name: 'columnNumbers',
		control,
	});
	const { boards } = useBoard();
	const boardId = boards.length.toString();
	const onSubmit: SubmitHandler<FormFields> = (data) => {
		const columns: Column[] = (data.columnNumbers?.map((column) => {
			return {
				id: uuidv4(),
				column: column.column,
				tasks: [],
			};
		}) || []) as Column[];
		const board: Board = {
			id: boardId,
			name: data.name,
			columns: columns,
		};
		dispatch(addBoard(board));

		dispatch(setActiveBoard({ id: boardId }));
		reset();
		modalCloseHandler(createModalBoardId);
		modalCloseHandler(navigateModalBoardId);
	};
	return (
		<dialog id={createModalBoardId} className=' modal'>
			<div className='modal-box modal-custom-container'>
				<h3 className='mb-8 text-base font-bold text-text'>Add New Board</h3>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='flex flex-col space-y-6'>
							<label className='modal-label text-subTitle'>
								<div className='label'>
									<span className='text-xs font-bold '>Name</span>
								</div>
								<FormRow error={errors.name}>
									<TextInput
										name='name'
										validationRuels={{ required: 'board name required' }}
									/>
								</FormRow>
							</label>
							<label className='modal-label text-subTitle '>
								<div className='label'>
									<span className='text-xs font-bold'>Columns</span>
								</div>
							</label>
							{fields?.map((field, index) => {
								return (
									<div
										className='flex-row items-center space-x-4 form-control'
										key={field.id}>
										<FormRow error={errors.columnNumbers?.[index]?.column}>
											<TextInput
												validationRuels={{ required: 'column name required' }}
												name={`columnNumbers.${index}.column` as const}
											/>
										</FormRow>
										{fields.length > 1 && (
											<button onClick={() => remove(index)}>
												<img src={CrossIcon} />
											</button>
										)}
									</div>
								);
							})}
							<div className='flex flex-col space-y-4 font-bold text-[14px] '>
								<ModalButton
									color='secondary'
									type='button'
									onClick={() => append({ column: '' })}>
									{' '}
									Add New Column
								</ModalButton>
								<ModalButton color='primary' type='submit'>
									Create New Board
								</ModalButton>
							</div>
						</div>
					</form>
				</FormProvider>
			</div>
			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}
