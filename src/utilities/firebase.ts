import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3zwARZ3XQJe_sPt8aXE26_rRVvKIgMFE",
  authDomain: "quick-react-app-94665.firebaseapp.com",
  databaseURL: "https://quick-react-app-94665-default-rtdb.firebaseio.com",
  projectId: "quick-react-app-94665",
  storageBucket: "quick-react-app-94665.firebasestorage.app",
  messagingSenderId: "550175717521",
  appId: "1:550175717521:web:aee62bf1b3c7d8cc68e730",
  measurementId: "G-Z9DXY6Y4CL"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const firebaseSignOut = () => signOut(getAuth(firebase));

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

export { firebaseSignOut as signOut };

export const useUserState = () => useAuthState(getAuth(firebase));

export const updateData = (path: string, value: any) => {
  return update(ref(database, path), {
    "title": value.title,
    "meets": value.meets
  });
};

export const useData = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};
