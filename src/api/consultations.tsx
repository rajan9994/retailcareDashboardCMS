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

export const getConsultations = async() => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    // formData.append('typeID', '3');
    const POS = await getfromApi('getConsultations.php?all=1', formData);
    if(POS.status == 'success')
    {
      return POS.consultationData;
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

export const saveConsultations = async(POSData) => {
  try{
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('consultationData', JSON.stringify(POSData));
    // console.log('formData', formData);
    return await getfromApi('saveConsultationsAdmin.php', formData);
  }
  catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};

export const deleteConsultations = async(id) => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('id', id);
    return await getfromApi('deleteConsultations.php', formData);
  }
  catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};
