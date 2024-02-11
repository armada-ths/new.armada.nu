import { RecruitmentList } from "@/app/recruitment/RecruitmentList"
import { Page } from "@/components/shared/Page"

export default async function RecruitmentPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary>
				<Page.Header>Armada Recruitment</Page.Header>
				<RecruitmentList />
			</Page.Boundary>
		</Page.Background>
	)
}
