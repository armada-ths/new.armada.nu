import { P } from "@/app/_components/Paragraph"
import { Page } from "@/components/shared/Page"

export default async function AtFairPage() {
  return (
    <Page.Background withIndents>
      <Page.Boundary>
        <Page.Header>At the Fair</Page.Header>
        <div>
          <P>
            Walking up to a representative of a company you really want to work
            for can be intimidating! But don't fret, below we’ve collected some
            tips on how to get the most out of your conversation.
          </P>
          <P>
            <ul>
              <li>
                <i>· Formulate your sentences and speak clearly.</i>
              </li>
              <li>
                <i>· Treat it like a friendly chat.</i>
              </li>
              <li>
                <i>· Show interest and ask questions.</i>
              </li>
            </ul>
          </P>
          <P>
            Remember that you are not chatting with an AI who just knows facts
            about the company, but with another person. Think of it as a date
            with a company!
          </P>
        </div>
        <br />
        <Page.Header tier="secondary">Example questions</Page.Header>
        {/*INSERT QUESTION GENERATOR HERE*/}
      </Page.Boundary>
    </Page.Background>
  )
}
