import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from './UseForm';
import { timeParts } from "./utilities/conflicts";
import { updateData } from "./utilities/firebase";

const isValidMeets = (meets: string) => {
  const parts = timeParts(meets);
  return (meets === '' || (parts.days && !isNaN(parts.hours?.start) && !isNaN(parts.hours?.end)));
};

const validateCourseData = (key: string, val: string) => {
  switch (key) {
    case 'title': return val.length != 0 && /(^$|\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets': return isValidMeets(val) ? '' : 'must be days hh:mm-hh:mm';
    default: return '';
  }
};

const submit = async (values: any) => {
  if (window.confirm(`Change ${values.id} to ${values.title}: ${values.meets}`)) {
    try {
      await updateData(`courses/${values.id}/`, values);
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
  return false;
};

const EditForm = () => {
  const navigate = useNavigate();
  const { state: course } = useLocation();
  const [ errors, handleSubmit ] = useForm(validateCourseData, async (values: any) => {
    const ok = await submit(values);
    if (ok) navigate('/');
  });

  return (
    <form onSubmit={handleSubmit} noValidate className={errors ? 'was-validated' : undefined}>
      <input type="hidden" name="id" value={course.id} />
      <div className="mb-3">
      <label htmlFor="title" className="form-label block mb-2">Course Title</label>
      <input className="form-control border-2 border-gray-400 rounded-lg" id="title" name="title" defaultValue={course.title} />
      <div className="invalid-feedback" data-cy="title-error">{errors?.title}</div>
      </div>
      <div className="mb-3">
      <label htmlFor="meets" className="form-label block mb-2">Meeting Time</label>
      <input className="form-control border-2 border-gray-400 rounded-lg" id="meets" name="meets" defaultValue={course.meets}/>
      <div className="invalid-feedback" data-cy="meets-error">{errors?.meets}</div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Submit</button>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Cancel</button>
    </form>
  )
};

export default EditForm;