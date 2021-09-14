import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocationSearchBar from '../../../Components/DetailBody/LocationSearchBar';

describe('<LocationSearchBar/>', () => {
	// it('Renders successfully', () => {
	// 	const locationSearchBarComp = render(
	// 		<MemoryRouter>
	// 			<LocationSearchBar
	// 				formValues={{
	// 					location: {
	// 						address: ''
	// 					}
	// 				}}
	// 			/>
	// 		</MemoryRouter>
	// 	);
	// 	locationSearchBarComp.getByPlaceholderText('Enter an address');
	// });
	it.todo('Google maps api makes unit and integration testing very difficult. Skip for now');
});
