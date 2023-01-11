import { useState } from "react";
import { Button } from "src/components/common/Button";
import Modal from "src/components/common/Modal/indext";

export const CreateTodoModal = () => {
	const [isShow, setIsShow] = useState(false);
	const onClickBackground = () => {};

	return (
		<Modal title='새로운 Todo 생성' onClickBackground={onClickBackground}>
			<Button label='생성' type='primary' />
			<Button label='취소' type='ghost' />
		</Modal>
	);
};
