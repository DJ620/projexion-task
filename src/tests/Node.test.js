import React from 'react';
import { render } from '@testing-library/react';
import Node from '../components/Node';

describe('Node component', () => {
  it('renders node title correctly', () => {
    const node = { id: '1', title: 'Test Node' };
    const { getByTestId } = render(<Node node={node} />);
    expect(getByTestId('node-title')).toHaveTextContent('Test Node');
  });

  it('renders with draggable attribute', () => {
    const node = { id: '1', title: 'Test Node' };
    const { getByTestId } = render(<Node node={node} />);
    expect(getByTestId('node-item')).toHaveAttribute('draggable');
  });

  it('renders with correct className', () => {
    const node = { id: '1', title: 'Test Node' };
    const { container } = render(<Node node={node} />);
    expect(container.firstChild).toHaveClass('bg-gray-300');
  });
});
