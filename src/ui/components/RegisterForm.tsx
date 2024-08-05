import Link from "next/link";
import { getServerAuthClient } from "@/app/config";

export async function RegisterForm() {
	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<form
				className="rounded border p-8 shadow-md"
				action={async (formData) => {
					"use server";

					const email = formData.get("email")?.toString();
					const password = formData.get("password")?.toString();

					if (!email || !password) {
						throw new Error("Email and password are required");
					}

					const { data } = await getServerAuthClient().signIn({ email, password }, { cache: "no-store" });

					if (data.tokenCreate.errors.length > 0) {
						// setErrors(data.tokenCreate.errors.map((error) => error.message));
						// setFormValues(DefaultValues);
					}
				}}
			>
				<div className="mb-2">
					<label className="sr-only" htmlFor="firstName">
						First Name
					</label>
					<input
						type="text"
						name="firstName"
						placeholder="First Name"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
						required
					/>
				</div>
				<div className="mb-2">
					<label className="sr-only" htmlFor="lastName">
						Last Name
					</label>
					<input
						type="text"
						name="lastName"
						placeholder="Last Name"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
						required
					/>
				</div>
				<div className="mb-2">
					<label className="sr-only" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="sr-only" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoCapitalize="off"
						autoComplete="off"
						className="w-full rounded border bg-neutral-50 px-4 py-2"
						required
					/>
				</div>
				<button
					className="rounded bg-neutral-800 px-4 py-2 text-neutral-200 hover:bg-neutral-700"
					type="submit"
				>
					Register
				</button>{" "}
				<Link href="login" className="right rounded px-4 py-2 text-neutral-200 hover:bg-neutral-700">
					Already have an account? Signin
				</Link>
			</form>
			<div></div>
		</div>
	);
}
