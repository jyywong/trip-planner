import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewDetailBody from '../../../Components/DetailBody/NewDetailBody';

describe('<NewDetailBody/>', () => {
	it('Renders correctly', () => {
		const newDetailBodyComp = render(
			<MemoryRouter>
				<NewDetailBody formValues={{ details: '' }} />
			</MemoryRouter>
		);
		newDetailBodyComp.getByText('Create');
		newDetailBodyComp.getByText('Cancel');
	});
});
