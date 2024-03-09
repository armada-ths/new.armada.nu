import { Button } from "@/components/ui/button"

export function RegisterPrompt() {
	//maybe remove
	return (
		<div className="mt-2">
			<a href="https://register.armada.nu/register">
				<Button>Signup to armada</Button>
			</a>
			<p className="text-xs">
				Or{" "}
				<a
					className="text-blue-600 hover:underline"
					href="mailto:sales@armada.nu">
					contact sales
				</a>{" "}
				if you have any questions
			</p>
		</div>
	)
}
