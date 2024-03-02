import * as React from "react";
import { Select, Box } from "@radix-ui/themes";

export default function SelectLanguage() {
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
