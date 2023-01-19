import { useSearchParams } from "react-router-dom";
import { FlexBox } from "src/components/common/FlexBox";
import { MainLayout } from "src/components/common/MainLayout";
import { TodoDetail } from "src/components/main/TodoDetail";
import { TodoListMenu } from "src/components/main/TodoListMenu";

export const TodoPage = () => {
	const selectedId = useSearchParams()[0].get("selectedId") ?? "";

	return (
		<MainLayout>
			<FlexBox gap={"50px"} alignItems='baseline'>
				<TodoListMenu />

				{selectedId && <TodoDetail id={selectedId} />}
			</FlexBox>
		</MainLayout>
	);
};
