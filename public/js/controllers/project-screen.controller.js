import { createCard, createList } from '../api/project-screen.api.js';
import { navigateTo, renderRoute } from "../router.js";

export async function createListHandler(listName){
  try {
    const response = await createList(listName);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating list:', error);
    alert(error.message || 'Failed to create list.');
  }
}

export async function createCardHandler(cardDetails){
  try {
    const response = await createCard(cardDetails);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating list:', error);
    alert(error.message || 'Failed to create list.');
  }
}
