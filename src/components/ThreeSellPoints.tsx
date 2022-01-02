import React from "react"

interface Props extends React.HTMLProps<HTMLDivElement> {}

function Item({ title, children, ...props }: Props) {
  return (
    <div className="prose prose-md prose-light mb-16 mt-8" {...props}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}

const ThreeSellPoints = (props: Props) => {
  return (
    <div className="p-4 pt-8 bg-zinc-900 sm:grid sm:grid-cols-3 sm:gap-4">
      <Item title="Making the web awesome is my passion.">
        I am a Frontend / JavaScript engineer who loves to make interactive web
        applications. I believe web applications should function great, and look
        pleasing to the eye for the best user experience. When people get stuff
        done in the apps I have worked on, it really gives me that sense of
        nirvana, but it does not just stop there. I always try to improve apps
        and their experiences to be the best as possible as they can be.
      </Item>
      <Item title="I can work with anything... to make the web work.">
        In my career, I have also had to work on things unknown and challenging
        to me, even if it is not frontend oriented. I have contributed to web
        backend systems, automation platforms, and mobile applications of all
        kinds and sorts. Some of them were pleasant, some of them were
        frankensteined applications. For that, I always try to help contribute
        making other developer experiences great, so they dont have to suffer as
        I did.
      </Item>
      <Item title="While my code is compiling...">
        I love to play my guitar, thinking of that new, awesome guitar lick. I
        love to watch Japanese animation (anime) and further stimulate my
        creativity. Sometimes, I like to combine the two. I would end up with
        learning how to play that favorite theme song in that anime. A dream of
        mine is if I could combine some of my hobbies and my coding, I will give
        my 110% to make that experience totally awesome.
      </Item>
    </div>
  )
}

export default ThreeSellPoints
