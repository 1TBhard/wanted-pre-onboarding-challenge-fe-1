import * as Styled from "./TodoListMenu.style";
import UtilLocalStorage from "src/utils/UtilLocalStorage";
import { Button } from "src/components/common/Button";
import { CURRENT_TODO_CONTEXT } from "src/constants/LOCAL_STORAGE_KEY";
import { FlexBox } from "src/components/common/FlexBox";
import { PostModal } from "src/components/main/TodoListMenu/PostModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTodoListQuery } from "src/queries/todo";

export const TodoListMenu = () => {
	const { data: todoList } = useTodoListQuery();
	const navigate = useNavigate();

	const [isShowModal, setIsShowModal] = useState(false);
	const onClickAddTodo = () => {
		setIsShowModal(true);
	};

	const hideModal = () => {
		setIsShowModal(false);
	};

	const onClickTodoDetail = (nextId: string) => {
		UtilLocalStorage.remove(CURRENT_TODO_CONTEXT);
		navigate(`?selectedId=${nextId}`, {
			relative: "route",
			preventScrollReset: true,
		});
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
			<PostModal isShow={isShowModal} hideModal={hideModal} />
		</>
	);
};
