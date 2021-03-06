import React, {useEffect, useState} from 'react';

import UserList from '../components/UsersList';
import ErrorModal from '../../shared/coponents/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/coponents/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <UserList items={loadedUsers} />;
    </React.Fragment>
  );
};

export default Users;