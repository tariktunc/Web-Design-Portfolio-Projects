import { Container, Flex, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <footer className="border-t mt-8">
      <Container size={"3"}>
        <Flex justify={"center"} align={"center"} py={"5"}>
          <Text as="p" size={"2"} color="gray">
            &copy; {new Date().getFullYear()} Tarik Tun&ccedil;. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </footer>
  );
}
