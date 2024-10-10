import { Page } from "@/components/shared/Page"

export default async function AtFairPage() {
  return (
    <Page.Background withIndents>
      <Page.Boundary>
        <Page.Header>At the Fair</Page.Header>
        <div>
          <ul>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </ul>
        </div>
      </Page.Boundary>
    </Page.Background>
  )
}
