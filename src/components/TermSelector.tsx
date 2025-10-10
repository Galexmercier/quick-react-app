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
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

interface TermSelector {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TermSelector = ({term, setTerm}: TermSelector) => (
  <div className="flex items-center justify-center text-center">
  { 
    Object.values(terms)
      .map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />)
  }
  </div>
);

export default TermSelector;