import { navigateTo, renderRoute } from '../router.js';
import { API_BASE } from './auth.js'

const API_LIST = 'http://localhost:3000/api/v1/list'
const API_CARD = 'http://localhost:3000/api/v1/card'

export async function createList(userData){
  const response = await fetch(`${API_LIST}/create-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: userData}),
  });
  if (!response.ok) {
    throw new Error(await response.json() || 'Failed to create list');
  }
  return response;
}

export async function updateList(listName){
  const response = await fetch(`${API_LIST}/update-list`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listName),
  });
  if (!response.ok) {
    throw new Error(await response.json() || 'Failed to create list');
  }
  return response;
}

export async function deleteList(listName){
  const response = await fetch(`${API_LIST}/delete-list`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listName),
  });
  if (!response.ok) {
    throw new Error(await response.json() || 'Failed to create list');
  }
  return response;
}

export async function getAllLists(){
  const response = await fetch(`${API_LIST}/`, {
    method: 'GET',
  });
  const data = response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get all lists');
  }
  return data;
}

export async function createCard(cardDetails){
  console.log(cardDetails);
  const response = await fetch(`${API_CARD}/create-card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardDetails),
  });
  if (!response.ok) {
    throw new Error(await response.json() || 'Failed to create card');
  }
  return response;
}

export async function deleteCard(cardName){
  const response = await fetch(`${API_CARD}/delete-card`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardName),
  });
  if (!response.ok) {
    throw new Error(await response.json() || 'Failed to create list');
  }
  return response;
}

export async function updateCard(cardName){
  console.log('this is cardName', cardName);
  const response = await fetch(`${API_CARD}/update-card`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardName),
  });
  if (!response.ok) {
    throw new Error(await response.json() || 'Failed to create list');
  }
  return response;
}
