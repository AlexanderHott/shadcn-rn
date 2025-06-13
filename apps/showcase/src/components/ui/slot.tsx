/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import React from "react";
import { StyleSheet } from "react-native";

type AnyProps = Record<string, any>;
type SlotProps = { children?: ReactNode } & AnyProps;
export function Slot({ children, ...rest }: SlotProps) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, mergeProps(rest, children.props));
  }

  if (React.Children.count(children) > 1) {
    throw new Error("Only one child allowed.");
  }

  return null;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = StyleSheet.flatten([
        slotPropValue,
        childPropValue,
      ]);
    }
  }

  return { ...slotProps, ...overrideProps };
}
