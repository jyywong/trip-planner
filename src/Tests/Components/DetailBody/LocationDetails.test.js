import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocationDetails from '../../../Components/DetailBody/LocationDetails';

describe('<LocationDetails/>', () => {
	it('Renders successfully', () => {
		const locationDetailsComp = render(
			<MemoryRouter>
				<LocationDetails
					placeDetails={{
						name: 'Testing',
						url: 'testing'
					}}
				/>
			</MemoryRouter>
		);
		locationDetailsComp.getByText('Testing');
		locationDetailsComp.getByText('Google Maps');
	});
});
