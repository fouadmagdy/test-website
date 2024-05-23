'use client'
import * as React from 'react';
import { animated,useSpring } from '@react-spring/web';


/**
 * Represents the properties of a counter component.
 */
export interface ICounterProps {
    n:number
    enabled:boolean
}

/**
 * A counter component that animates a number from 0 to a given value.
 * @param {ICounterProps} props - The props object containing the initial number and enabled state.
 * @returns The JSX element representing the counter component.
 */
export default function Counter ({n,enabled}: ICounterProps) {
    const {number} =useSpring({
        from: {number:0},
        number:n,
        delay:1000,
        config:{mass:.5,tension:20,friction:10}
    })
  return (
    <animated.span>
     {enabled && number.to((n:number)=> n.toFixed(0))}
    </animated.span>
  );
}
