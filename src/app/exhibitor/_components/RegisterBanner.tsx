import { Button } from "@/components/ui/button"

export function RegisterBanner() {
	return (
		<div
			id="bottom-banner"
			tabIndex={-1}
			className="fixed bottom-0 start-0 z-50 flex w-full justify-between bg-melon-700">
			<div className="p-4">
				<a href="https://register.armada.nu/register">
					<Button>Signup to armada</Button>
				</a>
			</div>
		</div>
	)
}
