import { useRef, useState } from "react";

import { Button, ButtonText } from "./ui/button";
import { ScreenContainer } from "./ui/container";
import { P } from "./ui/text";

export function useRenderCount() {
  const count = useRef(0);

  count.current++;

  return count.current;
}

function Inner() {
  const renderCount = useRenderCount();

  return <P>Inner render count: {renderCount}</P>;
}

export function CompilerCheck() {
  const renderCount = useRenderCount();
  const [count, setCount] = useState(0);
  return (
    <ScreenContainer>
      <P>
        If the date and inner render count DO NOT update on every press of the
        button, then the compiler IS enabled.
      </P>
      <P>Now: {Date.now()}</P>
      <P>Render count: {renderCount}</P>
      <Button onPressIn={() => setCount(count + 1)} className="self-start">
        <ButtonText>Inc</ButtonText>
      </Button>
      <P>Count: {count}</P>

      <Inner />
    </ScreenContainer>
  );
}
