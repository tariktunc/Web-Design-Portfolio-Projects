import { Section, Text, Heading } from "@radix-ui/themes";

export default function TextSection() {
  return (
    <Section size={"3"}>
      <Heading as="h1" size={{ initial: "7", xs: "8" }} mb="4">
        Our Laboratory
      </Heading>
      <Text as="p" size={{ initial: "3", xs: "5" }} color="gray">
        When creativity and technology come together, we have the power to
        transform our dreams into reality. Explore our projects and see how we
        can push the boundaries of creativity in the digital world together.
        Lets inspire each other on this journey and look towards the future with
        hope.
      </Text>
    </Section>
  );
}
