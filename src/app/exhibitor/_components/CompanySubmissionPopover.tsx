"use client"
import { Button } from "@/components/ui/button"
import * as Popover from "@radix-ui/react-popover"
import axios from "axios"
import { NavigationIcon, X } from "lucide-react"
import { useState } from "react"

export function CompanySubmissionPopover() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [company, setCompany] = useState("")
	const [question, setQuestion] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	const sendMessage = () => {
		const message = {
			text: `
        *Name:* ${name}
        *Email:* ${email}
        *Company:* ${company}
        *Question:* ${question}
      `
		}
		axios
			.post("https://slack.com/api/chat.postMessage", message, {
				headers: {
					"Content-Type": "application/json",
					Authorization: ""
				}
			})
			.then(response => {
				console.log("Message sent successfully:", response.data)
				// Reset form fields
				setName("")
				setEmail("")
				setCompany("")
				setQuestion("")
			})
			.catch(error => {
				console.error("Error sending message:", error)
			})
		setIsOpen(false)
	}

	return (
		<div className="fixed bottom-0 mb-6 ml-auto mr-auto md:left-0 md:m-8 md:mx-auto md:ml-16">
			<Popover.Root open={isOpen}>
				<Popover.Trigger>
					<div
						className=" mb-6 mr-8 mt-6 flex flex-row rounded-md bg-white p-2 text-black"
						onClick={e => setIsOpen(!isOpen)}>
						<NavigationIcon className="mr-1" />
						Leave a Contact
					</div>
				</Popover.Trigger>
				<Popover.Content side="top" side-offset="5">
					<div className=" rounded-lg p-4 shadow-md filter dark:bg-liqorice-700">
						<div className="flex flex-col gap-2 p-2">
							<p className="text-l font-semibold">Contact</p>
							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="name">
									Name
								</label>
								<input
									className="rounded-md border px-2 py-1"
									id="name"
									defaultValue=""
									onChange={e => setName(e.target.value)}
									placeholder="Your name"
								/>
							</fieldset>
							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="email">
									Email
								</label>
								<input
									className="rounded-md border px-2 py-1"
									id="email"
									defaultValue=""
									onChange={e => setEmail(e.target.value)}
									placeholder="Your email"
								/>
							</fieldset>
							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="company">
									Company
								</label>
								<input
									className="rounded-md border px-2 py-1"
									id="company"
									defaultValue=""
									onChange={e => setCompany(e.target.value)}
									placeholder="Your company"
								/>
							</fieldset>
							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="question">
									Question
								</label>
								<textarea
									className="rounded-md border px-2 py-1"
									id="question"
									onChange={e => setQuestion(e.target.value)}
									placeholder="Enter your question"
									rows={5}
								/>
							</fieldset>
							<div className="flex justify-end">
								<Button className="mt-4" onClick={sendMessage}>
									Connect
								</Button>
							</div>
							<X
								className="absolute right-[5px] top-[5px] cursor-default hover:cursor-pointer"
								onClick={e => setIsOpen(false)}></X>
							<Popover.PopoverArrow className="fill-white" />
						</div>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	)
}
