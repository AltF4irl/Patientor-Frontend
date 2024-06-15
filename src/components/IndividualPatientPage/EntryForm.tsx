import { useState } from 'react';
import { Diagnosis, HealthCheckRating, NewEntry } from '../../types';

interface EntryFormProps {
  patientId: string;
  addEntry: (id: string, entry: NewEntry) => Promise<void>;
}
interface Notification {
  visibility: boolean;
  message: string;
}

const EntryForm = ({ patientId, addEntry }: EntryFormProps) => {
  const [description, setDescritpion] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification>({
    visibility: false,
    message: '',
  });

  const formSubmitHndler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagArray: Array<Diagnosis['code']> = diagnosisCode
      .split(',')
      .map((part) => part.trim());
    const entry: NewEntry = {
      description,
      date,
      specialist,
      healthCheckRating: healthCheckRating,
      diagnosisCodes: diagArray || [],
      type: 'HealthCheck',
    };
    try {
      await addEntry(patientId, entry);
      setVisibility(false);
    } catch (err) {
      if (err instanceof Error) {
        setNotification({ visibility: true, message: err.message });
        setTimeout(() => {
          setNotification({
            visibility: false,
            message: '',
          });
        }, 5000);
      }
    }
  };

  if (visibility) {
    return (
      <div className="entryContainer">
        {notification.visibility && <p>{notification.message}</p>}
        <h3>New HealthCare entry</h3>
        <form
          className="entryForm"
          onSubmit={formSubmitHndler}
        >
          <div>
            <p>Description</p>
            <input
              type="text"
              name="description"
              value={description}
              onChange={({ target }) => setDescritpion(target.value)}
            />
          </div>
          <div>
            <p>Date</p>
            <input
              type="text"
              name="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
              required
            />
          </div>
          <div>
            <p>Specialist</p>
            <input
              type="text"
              name="specialist"
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
              required
            />
          </div>
          <div>
            <p>HealthCheck Rating</p>
            0
            <input
              type="radio"
              name="healthCheckRating"
              onChange={() => setHealthCheckRating(HealthCheckRating.Healthy)}
              required
              defaultChecked
            />
            1
            <input
              type="radio"
              name="healthCheckRating"
              onChange={() => setHealthCheckRating(HealthCheckRating.LowRisk)}
              required
            />
            2
            <input
              type="radio"
              name="healthCheckRating"
              onChange={() => setHealthCheckRating(HealthCheckRating.HighRisk)}
              required
            />
            3
            <input
              type="radio"
              name="healthCheckRating"
              onChange={() =>
                setHealthCheckRating(HealthCheckRating.CriticalRisk)
              }
              required
            />
          </div>
          <div>
            <p>Diagnosis Codes</p>
            <input
              type="text"
              name="diagnosisCode"
              value={diagnosisCode}
              onChange={({ target }) => setDiagnosisCode(target.value)}
            />
          </div>
          <div className="formButtonGroup">
            <button
              type="button"
              onClick={() => setVisibility(false)}
            >
              CANCEL
            </button>
            <button type="submit">ADD</button>
          </div>
        </form>
      </div>
    );
  } else if (!visibility) {
    return (
      <div>
        <button onClick={() => setVisibility(true)}>Create Entry</button>
      </div>
    );
  }
};

export default EntryForm;
