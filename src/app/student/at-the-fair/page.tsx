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

          <ul className="mt-2 text-stone-400">
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

          <P>
            Remember that you are not chatting with an AI who just knows facts
            about the company, but with another person. Think of it as a date
            with a company!
          </P>
        </div>
        <br />
        <Page.Header tier="secondary">Example questions</Page.Header>
        <P>
          Below are some examples of questions you can ask the companies during
          Armada.
        </P>
        {/*INSERT QUESTION GENERATOR HERE*/}
        <div className="mt-2 flex min-h-48 min-w-48 rounded-2xl bg-green-950 p-5">
          <p className="absolute text-green-300 opacity-80">
            <i>Question</i>
          </p>
          <div className="flex-grow place-content-center justify-center">
            <p className="text-center text-3xl text-green-50 opacity-90">
              <i>
                If you could give your younger self advice about working in your
                field, what would it be?
              </i>
            </p>
          </div>
        </div>
      </Page.Boundary>
    </Page.Background>
  )
}
