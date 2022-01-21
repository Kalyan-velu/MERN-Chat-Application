function ErrorFallback({error, resetErrorBoundary}) {
	return (
		<div style={{
			top: "50%",
			left: '50%',
			transform: 'translate(-50%, -50%)',
			backgroundColor: "white",
			width: 400,
			border: '2px solid #000',
			boxShadow: 24,
			p: 4,
		}}>
			<div role="alert">

				<p>{error.message}</p>
				<button onClick={resetErrorBoundary}>try again</button>
			</div>
		</div>

	)

}

export default ErrorFallback
