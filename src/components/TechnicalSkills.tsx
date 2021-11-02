import React from "react"

interface Props {}

function TechnicalSection({
  title,
  children,
  ...props
}: Omit<React.HTMLProps<HTMLDivElement>, "title"> & {
  title: React.ReactElement
}) {
  return (
    <div className="mt-8 mb-8 pb-8" {...props}>
      <h2 className="text-3xl">{title}</h2>
      <div className="pt-8 leading-6">{children}</div>
    </div>
  )
}

function NestedList(props: React.HTMLProps<HTMLUListElement>) {
  return (
    <ul
      className="border-l-2 border-gray-700 pl-4 pt-4 pb-4 mt-2 mb-2"
      {...props}
    />
  )
}

const TechnicalSkills = (props: Props) => {
  return (
    <div className="pt-16 p-4 bg-blue-100">
      <h4 className="uppercase tracking-widest mb-3 text-gray-400">
        Experience... I Have.
      </h4>
      <h1 className="text-3xl font-medium">Technical Skills</h1>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4">
        <TechnicalSection
          title={<span className="bg-yellow-300 p-2">JavaScript</span>}
        >
          <ul>
            <li>Node.js</li>
            <li>React.js</li>
            <li>Next.js</li>
            <li>Webpack</li>
            <li>ESBuild / SWC</li>
            <li>...Vanilla</li>
          </ul>
        </TechnicalSection>

        <TechnicalSection
          title={
            <>
              <span className="bg-red-600 p-2 text-white">HTML</span> /{" "}
              <span className="bg-blue-600 p-2 text-white">CSS</span>
            </>
          }
        >
          <ul>
            <li>HTML5</li>
            <li>
              CSS3 / CSS Preprocessors
              <NestedList>
                <li>CSS in JS - Emotion / Styled Components / JSS</li>
                <li>Tailwind - Utility First</li>
                <li>SASS</li>
              </NestedList>
            </li>
          </ul>
        </TechnicalSection>

        <TechnicalSection title={<code>Other</code>}>
          <ul>
            <li>GraphQL</li>
            <li>
              NoSQL
              <NestedList>
                <li>Firebase Realtime Database</li>
                <li>MongoDB</li>
                <li>
                  <code>if its a Document Store, i can work with it.</code>
                </li>
              </NestedList>
            </li>
            <li>
              SQL
              <NestedList>
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>Google Cloud BigQuery</li>
              </NestedList>
            </li>
            <li>
              Other Cloud / Google Cloud Platform
              <NestedList>
                <li>Google Cloud Storage</li>
                <li>Google Cloud PubSub</li>
                <li>Cloudflare Workers</li>
                <li>Google Kubernetes Engine</li>
              </NestedList>
            </li>
            <li>
              Other Programming Languages
              <NestedList>
                <li>Python</li>
              </NestedList>
            </li>
          </ul>
        </TechnicalSection>
      </div>
    </div>
  )
}

export default TechnicalSkills
