import { Button, Flex, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function App() {
  return (
    <Flex justify={"start"} align={"center"}>
      <>
        <TextField.Root placeholder="Search the docs…">
          <TextField.Slot>
            <MagnifyingGlassIcon height="20" width="20" />
          </TextField.Slot>
        </TextField.Root>
      </>
    </Flex>
  );
}
