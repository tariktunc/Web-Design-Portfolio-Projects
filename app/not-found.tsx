import { Container, Heading, Text, Flex } from "@radix-ui/themes";
import Link from "next/link";
import Navbar from "@/app/Components/Navbar/Navbar";
import FadeInSection from "@/app/Components/FadeInSection";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Container size="2">
          <FadeInSection>
            <Flex
              direction="column"
              justify="center"
              align="center"
              py="9"
              gap="4"
            >
              <Heading as="h1" size="8">
                404
              </Heading>
              <Text as="p" size="4" color="gray">
                We could not find the page you were looking for.
              </Text>
              <Link href="/">
                <Text size="3" color="teal">
                  Go back to the home page
                </Text>
              </Link>
            </Flex>
          </FadeInSection>
        </Container>
      </main>
    </>
  );
}
