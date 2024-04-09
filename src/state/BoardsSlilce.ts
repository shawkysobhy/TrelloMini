import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { boardsV1 } from '../mock/data';
import { Board, Column, Task } from './models';
export interface BoardsState {
	boards: Board[];
}
const initialState: BoardsState = {
	boards: boardsV1,
};

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		addBoard(state, action: PayloadAction<Board>) {
			state?.boards?.push(action.payload);
		},
		deleteBoard(state, action: PayloadAction<string>) {
			state.boards = state?.boards?.filter(
				(board) => board.id !== action.payload
			);
		},
		editBoard(
			state,
			action: PayloadAction<{
				boardId: string;
				name: string;
				columns?: Column[];
			}>
		) {
			const { boardId, name, columns } = action.payload;
			const index = state.boards.findIndex((board) => board.id === boardId);
			const currentColumn = current(state.boards[index].columns);
			const newColumns: Column[] =
				columns?.filter(
					(column) =>
						!currentColumn.some((currColumn) => currColumn.id === column.id)
				) || [];
			if (index !== -1) {
				state.boards[index].name = name ?? state.boards[index].name;
				state.boards[index].columns.push(...newColumns);
			}
		},
		addTask(
			state,
			action: PayloadAction<{
				boardId: string;
				task: Task;
				columnId: string;
			}>
		) {
			const { boardId, task, columnId } = action.payload;
			const boardIndex = state.boards.findIndex((board) => board.id == boardId);
			const columnIndex = state.boards[boardIndex].columns.findIndex(
				(column) => column.id === columnId
			);
			if (boardIndex !== -1 && columnIndex !== -1) {
				state.boards[boardIndex].columns[columnIndex].tasks?.push(task);
			}
		},
		editTask(state, action: PayloadAction<Task>) {
			const { columnId, boardId, id } = action.payload;
			const boardIndex = state.boards.findIndex(
				(board) => board.id === boardId
			);
			const columnIndex = state.boards[boardIndex]?.columns.findIndex(
				(column) => column.id === columnId
			);
			const taskIndex = state.boards[boardIndex].columns[
				columnIndex
			]?.tasks?.findIndex((task) => task.id === id);
			if (taskIndex === undefined) return;
			const board = state?.boards[boardIndex];
			const column = board?.columns[columnIndex];
			const tasks = column?.tasks;
			if (board && column && tasks) {
				tasks[taskIndex] = action.payload;
				state.boards[boardIndex].columns[columnIndex].tasks=tasks;
			}
		},
	},
});

export default boardsSlice.reducer;
export const { addBoard, deleteBoard, editBoard, addTask, editTask } =
	boardsSlice.actions;
