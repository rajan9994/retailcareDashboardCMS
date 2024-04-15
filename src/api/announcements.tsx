import { getUserDetails } from '../components/library/login-form/LoginForm';
const baseUrlRcare = 'https://erply.retailcare.com.au/retailcare-dashboard/api/';
// function getUserDetails() {
//   console.log('getUser called');
//   const storedUserDetails = sessionStorage.getItem('userData');
//   let decoded = {
//     userID: 0,
//     sessionKey: '',
//   };
//   if (storedUserDetails != null) {
//     decoded = JSON.parse(storedUserDetails);
//   }

//   return {
//     userID: decoded.userID,
//     sessionKey: decoded.sessionKey,
//   };
// }

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

export const getAnnouncements = async() => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    const announcements = await getfromApi('getAnnouncements.php?all=1', formData);
    if(announcements.status == 'success')
    {
      return announcements.announcementsData;
    }
    else
    {
      return null;
    }
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

export const getAnnouncement = async(id) => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('id', id);

    return await getfromApi('getAnnouncements.php/', formData);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};

export const saveAnnouncement = async(announcementData) => {
  try{
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('announcementData', JSON.stringify(announcementData));
    // console.log('formData', formData);
    return await getfromApi('saveAnnouncments.php', formData);
  }
  catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};

export const deleteAnnouncement = async(id) => {
  try {
    const userDetails = getUserDetails();
    const formData = new FormData();
    formData.append('userID', String(userDetails.userID));
    formData.append('sessionKey', userDetails.sessionKey);
    formData.append('id', id);
    return await getfromApi('deleteAnnouncements.php', formData);
  }
  catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};
