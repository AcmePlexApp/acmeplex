import RedirectButton from "../components/RedirectButton";

function Profile() {


	return (
		<div className="flex flex-col items-center justify-start space-y-4">
			<div className="bg-offwhite border-4 border-black rounded-lg shadow-lg p-6 space-y-4">
				<div className="w-full max-w-xs flex justify-center">
					<RedirectButton
						name="My Account"
						redirect="/profile/myaccount"
						className="redirect-button w-full"
					/>
					</div>
					<div className="w-full max-w-xs flex justify-center">
					<RedirectButton
						name="My Tickets"
						redirect="/profile/mytickets"
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
			
			</div>
		</div>
	)
}

export default Profile;
