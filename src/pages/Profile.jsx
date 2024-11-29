import RedirectButton from "../components/RedirectButton";

function Profile() {


	return (
		<div className="flex flex-col items-center justify-start space-y-4">
			<div className="bg-offwhite border-4 border-black rounded-lg shadow-lg p-6 space-y-4">
				<div className="w-full max-w-xs flex justify-center">
					<RedirectButton
						name="User Info"
						redirect="/profile/edit/userinfo"
						className="redirect-button w-full"
					/>
					</div>
					<div className="w-full max-w-xs flex justify-center">
					<RedirectButton
						name="Update Payment"
						redirect="/profile/edit/paymentinfo"
						className="redirect-button w-full"
					/>
					</div>
					<div className="w-full max-w-xs flex justify-center">
					<RedirectButton
						name="Become Premium"
						redirect="/profile/premium"
						className="redirect-button w-full"
					/>
					</div>
					<div className="w-full max-w-xs flex justify-center">
					<RedirectButton
						name="Change Notifications"
						redirect="/profile/notifications"
						className="redirect-button w-full"
					/>
				</div>
			</div>
		</div>
	)
}

export default Profile;
