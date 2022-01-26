import {render, screen} from '@testing-library/react';
import Homepage from "./components/pages/Homepage";


test( 'renders authorization page', () => {
	render( <Homepage/> );
	const authorization = screen.getAllText( /login/i )
	expect( authorization ).toBeInTheDocument()

} )
