import * as Styled from "./TodoListMenu.style";
import { Button } from "src/components/common/Button";
import { FlexBox } from "src/components/common/FlexBox";
import { PostModal } from "src/components/main/TodoListMenu/PostModal";
import { Todo } from "src/api/todo/getTodo";
import { useState } from "react";

interface TodoListMenuProps {
	todoList?: Todo[];
	onClickTodoDetail: (nextId: string) => void;
	afterAddTodo: () => Promise<void>;
}

export const TodoListMenu = ({
	todoList,
	onClickTodoDetail,
	afterAddTodo,
}: TodoListMenuProps) => {
	const [isShowModal, setIsShowModal] = useState(false);
	const onClickAddTodo = () => {
		setIsShowModal(true);
	};

	const hideModal = () => {
		setIsShowModal(false);
	};

	return (
		<>
			<Styled.Frame>
				<Styled.MenuHeader>목록</Styled.MenuHeader>
				<FlexBox flexDirection='column'>
					{todoList?.map((todo) => (
						<Styled.MenuItem
							key={todo.id}
							onClick={() => onClickTodoDetail(todo.id)}
						>
							{todo.title}
						</Styled.MenuItem>
					)) ?? "리스트가 없습니다."}

					<Button label='추가' width={"100%"} onClick={onClickAddTodo} />
				</FlexBox>
			</Styled.Frame>
			<PostModal
				isShow={isShowModal}
				hideModal={hideModal}
				afterAddTodo={afterAddTodo}
			/>
		</>
	);
};
