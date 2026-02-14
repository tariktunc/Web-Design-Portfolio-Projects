import { Container, Flex, Text } from "@radix-ui/themes";

export default function Footer() {
  return (
    <footer className="border-t mt-8" role="contentinfo">
      <Container size={"3"}>
        <Flex justify={"center"} align={"center"} py={"5"}>
          <Text as="p" size={"2"} color="gray">
            &copy; {new Date().getFullYear()} Tarik Tunç. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </footer>
  );
}
