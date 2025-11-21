import { signInWithGoogle, signOut, useUserState } from '../utilities/firebase';

const terms = ['Fall', 'Winter', 'Spring'];

interface TermProps {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
  checked: boolean;
}

const TermButton = ({term, setTerm, checked}: TermProps) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off"
      checked={checked} onChange={() => setTerm(term)}/>
    <label className="btn btn-success m-1 p-2" htmlFor={term} data-cy={term}>
    { term }
    </label>
  </>
);

const SignInButton = () => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      onClick={() => signInWithGoogle()}>
    Sign In
  </button>
);

const SignOutButton = () => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      onClick={() => signOut()}>
    Sign Out
  </button>
);

interface TermSelector {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TermSelector = ({term, setTerm}: TermSelector) => {
  const [user] = useUserState();
  return (
  <div className="btn-toolbar text-center justify-content-between">
    <div className="flex items-center justify-center">
    { 
      Object.values(terms)
        .map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />)
    }
    </div>
    { user ? <SignOutButton /> : <SignInButton /> }
  </div>
  )
};

export default TermSelector;