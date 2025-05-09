import { SafeAreaView, ScrollView, View } from "react-native";

import { Blockquote, H1, H2, H3, Li, Link, P, Ul } from "@/components/ui/text";

export default function TextShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="m-4">
          <H1>The Joke Tax Chronicles</H1>
          <P>
            G Once upon a time, in a far-off land, there was a very lazy king
            who spent all day lounging on his throne. One day, his advisors came
            to him with a problem: the kingdom was running out of money.
          </P>
          <H2>The King's Plan</H2>
          <P>
            The king thought long and hard, and finally came up with{" "}
            <Link href="/showcase/text">a brilliant plan</Link>: he would tax
            the jokes in the kingdom.
          </P>
          <Blockquote>
            "After all," he said, "everyone enjoys a good joke, so it's only
            fair that they should pay for the privilege."
          </Blockquote>
          <H3>The Joke Tax</H3>
          <P>
            The king's subjects were not amused. They grumbled and complained,
            but the king was firm:
          </P>
          <Ul>
            <Li>1st level of puns: 5 gold coins</Li>
            <Li>2nd level of jokes: 10 gold coins</Li>
            <Li>3rd level of one-liners : 20 gold coins</Li>
          </Ul>
          <P>
            As a result, people stopped telling jokes, and the kingdom fell into
            a gloom. But there was one person who refused to let the king's
            foolishness get him down: a court jester named Jokester.
          </P>
          <H3>Jokester's Revolt</H3>
          <P>
            Jokester began sneaking into the castle in the middle of the night
            and leaving jokes all over the place: under the king's pillow, in
            his soup, even in the royal toilet. The king was furious, but he
            couldn't seem to stop Jokester.
          </P>
          <P>
            And then, one day, the people of the kingdom discovered that the
            jokes left by Jokester were so funny that they couldn't help but
            laugh. And once they started laughing, they couldn't stop.
          </P>
          <H3>The People's Rebellion</H3>
          <P>
            The people of the kingdom, feeling uplifted by the laughter, started
            to tell jokes and puns again, and soon the entire kingdom was in on
            the joke.
          </P>
          {/*  <Table>
          <Thead>
            <Tr>
              <Th>King's Treasury</Th>
              <Th>People's happiness</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Empty</Td>
              <Td>Overflowing</Td>
            </Tr>
            <Tr>
              <Td>Modest</Td>
              <Td>Satisfied</Td>
            </Tr>
            <Tr>
              <Td>Full</Td>
              <Td>Ecstatic</Td>
            </Tr>
          </Tbody>
        </Table>
*/}
          <P>
            The king, seeing how much happier his subjects were, realized the
            error of his ways and repealed the joke tax. Jokester was declared a
            hero, and the kingdom lived happily ever after.
          </P>
          <P>
            The moral of the story is: never underestimate the power of a good
            laugh and always be careful of bad ideas.
          </P>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
