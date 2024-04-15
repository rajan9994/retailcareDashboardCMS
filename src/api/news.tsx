import { getUserDetails } from '../components/library/login-form/LoginForm';
const baseUrlRcare = 'https://erply.retailcare.com.au/retailcare-dashboard/api/';
export const getfromApi = async(endpoint, params) => {
  try {
    const response = await fetch(`${baseUrlRcare}${endpoint}`, {
      method: 'POST',
      body: params,
      credentials: 'include', // Include credentials (cookies) in the request
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};

export const getNews = async() => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    // formData.append('typeID', '3');
    const POS = await getfromApi('getNews.php?all=1', formData);
    if(POS.status == 'success')
    {
      return POS.newsData;
    }
    else
    {
      return null;
    }
  } catch (error) {
    console.error('Error fetching POS articles:', error);
    throw error;
  }
};

export const getPOSSpecific = async(id) => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('id', id);

    return await getfromApi('getText.php/', formData);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};

export const saveNews = async(POSData) => {
  try{
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('newsData', JSON.stringify(POSData));
    console.log('formData', formData);
    return await getfromApi('saveNews.php', formData);
  }
  catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};

export const deleteNews = async(id) => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('id', id);
    return await getfromApi('deleteNews.php', formData);
  }
  catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};
