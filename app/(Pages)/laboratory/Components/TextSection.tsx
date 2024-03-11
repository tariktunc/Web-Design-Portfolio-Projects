import * as React from "react";
import { Section, Text } from "@radix-ui/themes";
export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <Section size={"3"}>
      <Text as="p" size={"8"}>
        Our Laboratory
      </Text>
      <br />
      <Text as="p" size={"5"}>
        When creativity and technology come together, we have the power to
        transform our dreams into reality. Explore our projects and see how we
        can push the boundaries of creativity in the digital world together.
        Lets inspire each other on this journey and look towards the future with
        hope.
      </Text>
    </Section>
  );
}
