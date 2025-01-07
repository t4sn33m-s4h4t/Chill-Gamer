import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { Slide } from "react-awesome-reveal";
export default function Title({ text }) {
  return (
    <div>

      <Slide delay={5} cascade triggerOnce={true} damping={1e-1}>
        <h2 className="lg:py-14 py-8  lg:text-4xl text-2xl font-bold text-center dark:text-white">
          {text}
          <Typewriter
            words={[' (Play)', ' (Enjoy)', ' (Explore)', ' (Again Play)!']}
            loop={false}
            cursor
            cursorStyle='_'
          />
        </h2>
      </Slide>

    </div>
  )
}
