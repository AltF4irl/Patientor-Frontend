import { useState } from 'react';
import { Diagnosis, HealthCheckRating, NewEntry } from '../../types';

interface EntryFormProps {
    patientId: string;
    addEntry: (id: string, entry: NewEntry) => void
}

const EntryForm = ({patientId, addEntry}: EntryFormProps) => {
  const [description, setDescritpion] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');

  const formSubmitHndler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagArray: Array<Diagnosis['code']> = diagnosisCode.split(',').map(part => part.trim());
    const entry: NewEntry = {
        description,
        date,
        specialist,
        healthCheckRating: healthCheckRating,
        diagnosisCodes: diagArray || [],
        type: 'HealthCheck'
    };
    addEntry(patientId, entry);
    setDescritpion('');
    setDate('');
    setSpecialist('');
    setDiagnosisCode('');
    setHealthCheckRating(HealthCheckRating.Healthy);
  };

  return (
    <div className='entryContainer'>
      <h3>New HealthCare entry</h3>
      <form className='entryForm' onSubmit={formSubmitHndler}>
        <div>
          <p>Description</p>
          <input
            type="text"
            name="description"
            value={description}
            onChange={({ target }) => setDescritpion(target.value)}
            required
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
          0<input
            type="radio"
            name="healthCheckRating"
            onChange={() => setHealthCheckRating(HealthCheckRating.Healthy)}
            required
            defaultChecked
          />
          1<input
            type="radio"
            name="healthCheckRating"
            onChange={() => setHealthCheckRating(HealthCheckRating.LowRisk)}
            required
          />
          2<input
            type="radio"
            name="healthCheckRating"
            onChange={() => setHealthCheckRating(HealthCheckRating.HighRisk)}
            required
          />
          3<input
            type="radio"
            name="healthCheckRating"
            onChange={() => setHealthCheckRating(HealthCheckRating.CriticalRisk)}
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
        <div className='formButtonGroup'>
            <button type='button'>CANCEL</button>
            <button type="submit">ADD</button>
        </div>
        
      </form>
    </div>
  );
};

export default EntryForm;
