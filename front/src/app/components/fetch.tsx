//管理画面用fetchでAPIリクエスト
const apiUrl = 'http://localhost:5000/quotes'; //APIのURL

interface Quote {
  id?: number;
  quote: string;
  author?: string;
  comment?: string;
  emotion_id: number;
}

const getQuotes = async () => {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error('Quotes fetching failed');
    }
    return response.json();
  };
  
  const getQuoteById = async (id: number) => {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Quote fetching failed');
    }
    return response.json();
  };

const createQuote = async (quote: Quote) => {
  const response = await fetch(`${apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const updateQuote = async (id: number, quote: Quote) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const deleteQuote = async (id: number) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

export { getQuotes, getQuoteById, createQuote, updateQuote, deleteQuote };
