function ErrorFallback({error, resetErrorBoundary}) {
	return (
		<div style={{
			backgroundColor: "white",
			width: 400,
		}}>
			<div role="alert">

				<p>{error.message}</p>
			</div>
		</div>

	)

}

export default ErrorFallback
