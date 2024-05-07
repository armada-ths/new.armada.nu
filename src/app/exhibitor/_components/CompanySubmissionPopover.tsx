"use client"
import { Button } from "@/components/ui/button"
import * as Popover from "@radix-ui/react-popover"
import axios from "axios"
import { Headset, X } from "lucide-react"
import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export function CompanySubmissionPopover() {
	const [formData, setFormData] = useState({
		name: "",
		company: "",
		email: "",
		message: ""
	})
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [captchaFilled, setCaptchaFilled] = useState(false)
	const [formedFilled, setFormFilled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (
			formData.name !== "" &&
			formData.email !== "" &&
			formData.company !== "" &&
			formData.message !== "" &&
			captchaFilled
		) {
			setFormFilled(true)
		} else {
			setFormFilled(false)
		}
	}, [formData, captchaFilled])

	const handleChange = (event: { target: { name: any; value: any } }) => {
		const key = event.target.name
		const updatedFormValue = event.target.value
		const newFormData = { ...formData, [key]: updatedFormValue }
		setFormData(newFormData)
	}

	const sendMessage = () => {
		const msg = {
			text: `
        *Name:* ${formData.name}
        *Email:* ${formData.email}
        *Company:* ${formData.company}
        *Message:* ${formData.message}
      `
		}
		axios
			.post("https://slack.com/api/chat.postMessage", msg, {
				headers: {
					"Content-Type": "application/json",
					Authorization: ""
				}
			})
			.then(response => {
				console.log("Message sent successfully:", response.data)
				// Reset form fields
				setFormData({
					name: "",
					email: "",
					company: "",
					message: ""
				})
				setFormSubmitted(true)
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
						<Headset className="mr-1" />
						Contact Sales
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
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Your name"
									className="rounded-md border px-2 py-1"
								/>
							</fieldset>

							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="email">
									Email
								</label>
								<input
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Your email"
									className="rounded-md border px-2 py-1"
								/>
							</fieldset>

							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="company">
									Company
								</label>
								<input
									id="company"
									name="company"
									value={formData.company}
									onChange={handleChange}
									placeholder="Your company"
									className="rounded-md border px-2 py-1"
								/>
							</fieldset>

							<fieldset className="flex flex-col">
								<label className="text-sm" htmlFor="message">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									placeholder="Enter your message"
									rows={5}
									className="rounded-md border px-2 py-1"
								/>
							</fieldset>

							<ReCAPTCHA
								className="captcha"
								sitekey="6LdlSPwnAAAAADCALl0tmledXQ2NofF5J0Ssi1wH"
								onChange={() => {
									setCaptchaFilled(true)
								}}
							/>

							<div className="flex justify-end">
								<Button
									className="mt-4"
									onClick={sendMessage}
									disabled={!formedFilled}>
									Send
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
