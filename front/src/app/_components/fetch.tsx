//管理画面用fetchでAPIリクエスト
// import { API_BASE_URL } from '../_utils/constants';
//.envに環境変数設定
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_API_BASE_URL;

const apiUrl = `${API_BASE_URL}quotes`; // APIのURL
const apiUrl2 = `${API_BASE_URL}encourages`; // APIのURLを修正
const apiUrl3 = `${API_BASE_URL}positives`; // APIのURLを修正

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

const deleteQuote = async (id: number, resourceType: string) => {
  let url;
  if (resourceType === 'encourage') {
    url = `${apiUrl2}/${id}`;
  } else if (resourceType === 'positive') {
    url = `${apiUrl3}/${id}`;
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
