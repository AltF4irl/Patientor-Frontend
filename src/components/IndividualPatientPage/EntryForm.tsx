import { useState } from 'react';
import { HealthCheckRating, NewEntry } from '../../types';
import BasicSelect from './BasicSelect';
import MultipleSelect from './MultipleSelect';

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
  const [diagnosisCode, setDiagnosisCode] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification>({
    visibility: false,
    message: '',
  });
  const [employerName, setEmployerName] = useState<string>('');
  const [type, setType] = useState<string>('HealthCheck');

  // params for sickleave
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // params for discharge
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');

  const formSubmitHndler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const diagArray: Array<Diagnosis['code']> = diagnosisCode
    //   .split(',')
    //   .map((part) => part.trim());
    try {
      switch (type) {
        case 'HealthCheck': {
          const entry: NewEntry = {
            description,
            date,
            specialist,
            healthCheckRating: healthCheckRating,
            diagnosisCodes: diagnosisCode || [],
            type,
          };
          await addEntry(patientId, entry);
          break;
        }
        case 'Hospital': {
          const entry: NewEntry = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCode || [],
            type,
            discharge: {
              date: dischargeDate,
              criteria,
            },
          };
          await addEntry(patientId, entry);
          break;
        }
        case 'OccupationalHealthcare': {
          const entry: NewEntry = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCode || [],
            type,
            employerName,
            sickLeave:
              {
                startDate,
                endDate,
              } || '',
          };
          await addEntry(patientId, entry);
          break;
        }
      }

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

  const FormSelector = () => {
    console.log(type);

    switch (type) {
      case 'HealthCheck': {
        return (
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
                type="Date"
                name="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </div>
            <div>
              <p>Specialist</p>
              <input
                type="text"
                name="specialist"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
            </div>
            <div>
              <p>HealthCheck Rating</p>
              0
              <input
                type="radio"
                name="healthCheckRating"
                onChange={() => setHealthCheckRating(HealthCheckRating.Healthy)}
                defaultChecked
              />
              1
              <input
                type="radio"
                name="healthCheckRating"
                onChange={() => setHealthCheckRating(HealthCheckRating.LowRisk)}
              />
              2
              <input
                type="radio"
                name="healthCheckRating"
                onChange={() =>
                  setHealthCheckRating(HealthCheckRating.HighRisk)
                }
              />
              3
              <input
                type="radio"
                name="healthCheckRating"
                onChange={() =>
                  setHealthCheckRating(HealthCheckRating.CriticalRisk)
                }
              />
            </div>
            <div>
              <p>Diagnosis Codes</p>
              <MultipleSelect diagnosisCode={diagnosisCode} setDiagnosisCode={setDiagnosisCode} />
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
        );
      }
      case 'Hospital': {
        return (
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
                type="date"
                name="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </div>
            <div>
              <p>Specialist</p>
              <input
                type="text"
                name="specialist"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
            </div>
            <div>
              <p>Discharge Date</p>
              <input
                type="date"
                name="dischargeDate"
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
            </div>
            <div>
              <p>Criteria</p>
              <input
                type="text"
                name="criteria"
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
            </div>
            <div>
              <p>Diagnosis Codes</p>
              <MultipleSelect diagnosisCode={diagnosisCode} setDiagnosisCode={setDiagnosisCode} />
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
        );
      }
      case 'OccupationalHealthcare': {
        return (
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
                type="date"
                name="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </div>
            <div>
              <p>Specialist</p>
              <input
                type="text"
                name="specialist"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
            </div>
            <div>
              <p>Employer Name</p>
              <input
                type="text"
                name="employerName"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
            <div>
              <p>Start Date</p>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
              />
            </div>
            <div>
              <p>End Date</p>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
              />
            </div>
            <div>
              <p>Diagnosis Codes</p>
              <MultipleSelect diagnosisCode={diagnosisCode} setDiagnosisCode={setDiagnosisCode} />
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
        );
      }
    }
  };

  if (visibility) {
    return (
      <div className="entryContainer">
        {notification.visibility && <p>{notification.message}</p>}
        <h3>New HealthCare entry</h3>
        <BasicSelect
          key="fuckingPainInTheAss"
          setType={setType}
          type={type}
        />
        <FormSelector />
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
