import { Select, Box } from "@radix-ui/themes";
import { useAppSelector, useAppDispatch } from "@/app/hooks";

export default function SelectLanguage() {
	// The `state` arg is correctly typed as `RootState` already
	const count = useAppSelector((state) => state.language.value);
	const dispatch = useAppDispatch();
	console.log(count);

	return (
		<Box mx={"3"}>
			<Select.Root defaultValue="en">
				<Select.Trigger />
				<Select.Content>
					<Select.Group>
						<Select.Label>Language</Select.Label>
						<Select.Item value="tr">TR</Select.Item>
						<Select.Item value="en">EN</Select.Item>
						<Select.Item value="de" disabled>
							DE
						</Select.Item>
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</Box>
	);
}
