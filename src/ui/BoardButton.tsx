import React from 'react';
import BoardIcon from '../assets/icon-board';
type BoardButtonProps = {
	children: React.ReactNode;
	active?: boolean;
};
export default function AddBoardButton({
	children,
	active = false,
}: BoardButtonProps) {
	return (
		<button
			className={`flex items-center w-[90%] py-4 space-x-4 text-base font-bold  rounded-r-full pl-14  ${
				active ? 'text-white bg-brand' : 'text-gray'
			}`}>
			<BoardIcon color={`${active ? 'white' : 'gray'}`} />
			<p>{children}</p>
		</button>
	);
}