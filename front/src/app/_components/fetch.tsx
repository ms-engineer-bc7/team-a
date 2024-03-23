//管理画面用fetchでAPIリクエスト
import { API_BASE_URL } from '../_utils/constants';

// const apiUrl = 'http://localhost:5000/quotes'; //APIのURL
// const apiUrl2 = 'http://localhost:5000/encourages'; // APIのURLを修正
// const apiUrl3 = 'http://localhost:5000/positives'; // APIのURLを修正
interface Quote {
  id?: number;
  quote: string;
  author?: string;
  comment?: string;
  emotion_id: number;
}

const getQuotes = async () => {
    const response = await fetch(`${API_BASE_URL}/quotes`);
    if (!response.ok) {
      throw new Error('Quotes fetching failed');
    }
    return response.json();
  };
  
  const getQuoteById = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/quotes/${id}`);
    if (!response.ok) {
      throw new Error('Quote fetching failed');
    }
    return response.json();
  };

const createQuote = async (quote: Quote) => {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
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
  const response = await fetch(`${API_BASE_URL}/quotes/${id}`, {
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

const deleteQuote = async (id: number, resourceType: string) => {
  let url;
  if (resourceType === 'encourage') {
    url = `${API_BASE_URL}/encourages/${id}`;
  } else if (resourceType === 'positive') {
    url = `${API_BASE_URL}/positives/${id}`;
  } else {
    throw new Error('Invalid resource type');
  }

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};




// const deleteQuote = async (id: number) => {
//   const response = await fetch(`${apiUrl2}/${id}`, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }

//   return response.json();
// };

// const deleteQuote2 = async (id: number) => {
//   const response = await fetch(`${apiUrl3}/${id}`, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     throw new Error('Something went wrong');
//   }

//   return response.json();
// };

export { getQuotes, getQuoteById, createQuote, updateQuote, deleteQuote };
