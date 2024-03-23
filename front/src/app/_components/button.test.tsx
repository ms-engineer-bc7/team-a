import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QuoteButton } from './button';


describe('QuoteButton', () => {
  //ボタンのレンダリングを確認するテスト
  it('renders the button with the correct emoji', () => {
    const { getByText } = render(<QuoteButton emotion="🥹" onQuoteFetch={() => {}} />);
    expect(getByText('🥹')).toBeInTheDocument();
  });

  //クリックイベントを確認するテスト
  it('calls onQuoteFetch when clicked', () => {
    const onQuoteFetch = jest.fn();
    const { getByText } = render(<QuoteButton emotion="🥹" onQuoteFetch={onQuoteFetch} />);
    
    fireEvent.click(getByText('🥹'));
    
    expect(onQuoteFetch).toHaveBeenCalled();
  });
});