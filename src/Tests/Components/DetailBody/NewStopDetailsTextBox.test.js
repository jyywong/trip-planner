import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewStopDetailsTextBox from '../../../Components/DetailBody/NewStopDetailsTextBox';

describe('<NewStopDetailsTextBox/>', () => {
	it('Renders correctly', () => {
		const newStopDetailsTextBoxComp = render(
			<MemoryRouter>
				<NewStopDetailsTextBox formValues={{ details: 'Testing' }} />
			</MemoryRouter>
		);
		newStopDetailsTextBoxComp.getByText('Testing');
	});
	it('Triggers correct function when form closed', () => {
		const setFormValues = jest.fn();
		const newStopDetailsTextBoxComp = render(
			<MemoryRouter>
				<NewStopDetailsTextBox formValues={{ details: 'Testing' }} setFormValues={setFormValues} />
			</MemoryRouter>
		);
		const textfield = newStopDetailsTextBoxComp.getByText('Testing');
		fireEvent.change(textfield, { target: { value: 'Hello' } });
		expect(setFormValues.mock.calls).toBeCalled;
 	});
});
