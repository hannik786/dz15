import { useState } from 'react';
import PropTypes from 'prop-types';
function CredentialsView({ login, password, onEdit }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <dl>
        <dt>Логін</dt><dd>{login}</dd>
        <dt>Пароль</dt><dd>{visible ? password : '•'.repeat(password.length)}</dd>
      </dl>
      <p>
        <button type="button" onClick={onEdit}>Змінити</button>
        <button type="button" className="secondary" onClick={() => setVisible(!visible)}>
          {visible ? 'Сховати пароль' : 'Показати пароль'}
        </button>
      </p>
    </>
  );
}
CredentialsView.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};
function CredentialsForm({ initialLogin, initialPassword, minLength, onSave, onCancel }) {
  const [login, setLogin] = useState(initialLogin);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login.trim()) return setError('Введіть логін');
    if (password.length < minLength) return setError(`Пароль має містити щонайменше ${minLength} символів`);
    setError('');
    onSave({ login: login.trim(), password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логін
        <input value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="username" />
      </label>
      <label>
        Пароль
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit">Зберегти</button>
      {onCancel && <button type="button" className="secondary" onClick={onCancel}>Скасувати</button>}
    </form>
  );
}
CredentialsForm.propTypes = {
  initialLogin: PropTypes.string,
  initialPassword: PropTypes.string,
  minLength: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
CredentialsForm.defaultProps = { initialLogin: '', initialPassword: '', minLength: 6, onCancel: null };
function Credentials({ title, minPasswordLength }) {
  const [data, setData] = useState(null); 
  const [editing, setEditing] = useState(true);
  const save = (values) => { setData(values); setEditing(false); };
  return (
    <section className="card">
      <h2>{title}</h2>
      {editing ? (
        <CredentialsForm
          initialLogin={data?.login}
          initialPassword={data?.password}
          minLength={minPasswordLength}
          onSave={save}
          onCancel={data ? () => setEditing(false) : null}
        />
      ) : (
        <CredentialsView login={data.login} password={data.password} onEdit={() => setEditing(true)} />
      )}
    </section>
  );
}
Credentials.propTypes = {
  title: PropTypes.string,
  minPasswordLength: PropTypes.number,
};
Credentials.defaultProps = { title: 'Логін і пароль', minPasswordLength: 6 };
export default Credentials;
