import { Flex } from "@radix-ui/themes";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <Flex wrap={"wrap"} align={"center"}>
      {/* global.css */}
      <span className="loader" />
      <span className="loader" />
      <span className="loader" />
      <span className="loader" />
      <span className="loader" />
      <span className="loader" />
    </Flex>
  );
}
