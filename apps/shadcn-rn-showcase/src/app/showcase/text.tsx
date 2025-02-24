import { cn } from "@/lib/utils";
import type { TextProps as RNTextProps, ViewProps } from "react-native";
import { Text as RNText, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { LinkProps as ExpoLinkProps } from "expo-router";
import { Link as ExpoLink } from "expo-router";

const FONT_WEIGHTS: Record<string, string> = {
  "font-black": "Black",
  "font-extrabold": "ExtraBold",
  "font-bold": "Bold",
  "font-semibold": "SemiBold",
  "font-medium": "Medium",
  "font-normal": "Regular",
  "font-light": "Light",
  "font-extralight": "ExtraLight",
  "font-thin": "Thin",
};

const DEFAULT_FAMILY = "Geist";
const MONO_FAMILY = "GeistMono";
const DEFAULT_WEIGHT = "Regular";

function getFontFamily(className?: string) {
  if (!className) return `font-[${DEFAULT_FAMILY}-${DEFAULT_WEIGHT}]`;

  let classes = className.split(" ").filter((cls) => !cls.startsWith("font-"));
  const isMono = className?.includes("font-mono") ?? false;

  const fontPrefix = isMono ? MONO_FAMILY : DEFAULT_FAMILY;
  const weightKey = Object.keys(FONT_WEIGHTS).find((key) =>
    className?.includes(key),
  );
  const newFontClass = `font-[${fontPrefix}${weightKey ? `-${FONT_WEIGHTS[weightKey]}` : `-${DEFAULT_WEIGHT}`}]`;

  classes.push(newFontClass);
  return classes.join(" ");
}

export type TextProps = RNTextProps;
export function Text({ className, ...rest }: RNTextProps) {
  const newClassName = getFontFamily(className);
  return (
    <RNText className={cn("font-[Geist-Regular]", newClassName)} {...rest} />
  );
}

export type H1Props = TextProps;
export function H1({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl",
        className,
      )}
      {...rest}
    />
  );
}

export type H2Props = TextProps;
export function H2({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors",
        className,
      )}
      {...rest}
    />
  );
}

export type H3Props = TextProps;
export function H3({ className, ...rest }: H1Props) {
  return (
    <Text
      className={cn(
        "mt-10 scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...rest}
    />
  );
}

export type PProps = TextProps;
export function P({ className, ...rest }: PProps) {
  return <Text className={cn("leading-7 mt-6", className)} {...rest} />;
}

export type LinkProps = ExpoLinkProps;
export function Link({ className, ...rest }: LinkProps) {
  return (
    <ExpoLink
      className={cn(
        "font-medium text-primary underline underline-offset-4 ",
        className,
      )}
      {...rest}
    />
  );
}

export type UlProps = ViewProps;
export function Ul({ className, ...rest }: UlProps) {
  return <View className={cn("pl-4", className)} {...rest} />;
}

export type OlProps = ViewProps;
export function Ol({ className, ...rest }: OlProps) {
  return <View className={cn("pl-4", className)} {...rest} />;
}

export type LiProps = TextProps;
export function Li({ className, ...rest }: LiProps) {
  return (
    <View className="flex-row items-start mb-1">
      <Text selectable={false} className="mr-2">
        •
      </Text>
      <Text className={cn(className)} {...rest} />
    </View>
  );
}

export type OliProps = TextProps & { index: number };
export function Oli({ index, className, ...rest }: OliProps) {
  return (
    <View className="flex-row items-start mb-1">
      <Text selectable={false} className="mr-2">
        {index}.
      </Text>
      <Text className={cn(className)} {...rest} />
    </View>
  );
}

export type BlockquoteProps = TextProps;
export function Blockquote({ className, ...rest }: BlockquoteProps) {
  return (
    <Text
      className={cn("mt-6 border-l-2 border-gray-300 pl-6 italic", className)}
      {...rest}
    />
  );
}

export default function TextShowcaseScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="m-4">
          <H1>G The Joke Tax Chronicles</H1>
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
