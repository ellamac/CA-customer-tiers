import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
const INITIAL_CUSTOMER_TIERS = [
  { id: 1, name: 'gold', discount: 0.5 },
  { id: 2, name: 'silver', discount: 0.33 },
  { id: 3, name: 'platinum', discount: 0.75 },
];

function App() {
  const [customerTiers, setCustomerTiers] = useState(INITIAL_CUSTOMER_TIERS);
  const [newName, setNewName] = useState('');
  const [newTier, setNewTier] = useState({ name: '', discount: 0 });
  const [editedTier, setEditedTier] = useState({ name: '', discount: 0 });
  const [newDiscount, setNewDiscount] = useState(0);
  const [editTierWithId, setEditTierWithId] = useState(null);
  const [total, setTotal] = useState(80);
  const [chosenTier, setChosenTier] = useState(null);
  const create = (e) => {
    e.preventDefault();
    setCustomerTiers((prev) => [...prev, { ...newTier, id: uuidv4() }]);
    setNewTier({ name: '', discount: '' });
  };

  const edit = (e) => {
    e.preventDefault();
    setCustomerTiers((prev) =>
      prev.map((ct) =>
        ct.id === editTierWithId
          ? {
              id: ct.id,
              name: editedTier.name || ct.name,
              discount: editedTier.discount || ct.discount,
            }
          : ct
      )
    );
    setEditTierWithId(null);
    setEditedTier({ name: '', discount: '' });
  };
  return (
    <div className='App'>
      <section className='tiers'>
        <h2>All available customer tiers</h2>

        {customerTiers.map((ct, idx) => (
          <div
            key={`customer-tier-${ct.id}-${ct.name}-${idx}`}
            className='tier'
          >
            {editTierWithId === ct.id ? (
              <form onSubmit={edit}>
                <label>
                  Tier name:{' '}
                  <input
                    type='text'
                    name='name'
                    value={editedTier.name}
                    placeholder={ct.name}
                    onChange={(e) =>
                      setEditedTier((prev) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      })
                    }
                  />
                </label>
                <label>
                  Tier discount:{' '}
                  <input
                    type='number'
                    name='discount'
                    value={editedTier.discount}
                    placeholder={ct.discount}
                    min={0.05}
                    max={1}
                    step={0.05}
                    onChange={(e) =>
                      setEditedTier((prev) => {
                        return { ...prev, discount: e.target.value };
                      })
                    }
                  />
                </label>
                <button type='submit'>Save</button>
                <button type='button' onClick={() => setEditTierWithId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <p>
                Customer tier name: {ct.name}, tier discount: {ct.discount}{' '}
                <button type='button' onClick={() => setEditTierWithId(ct.id)}>
                  Edit
                </button>
              </p>
            )}
          </div>
        ))}
      </section>
      <section className='new-tier'>
        <h2>Add a customer tier</h2>
        <form onSubmit={create}>
          <label>
            Tier name:{' '}
            <input
              type='text'
              name='name'
              value={newTier.name}
              onChange={(e) =>
                setNewTier((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />
          </label>
          <label>
            Tier discount:{' '}
            <input
              type='number'
              name='discount'
              value={newTier.discount}
              min={0.05}
              max={1}
              step={0.05}
              onChange={(e) =>
                setNewTier((prev) => {
                  return { ...prev, discount: e.target.value };
                })
              }
            />
          </label>
          <button type='submit'>Create</button>
        </form>
      </section>

      <section className='cart'>
        <h2>Test Cart</h2>
        <p>total: {total} €</p>
        <form>
          <label for='tiers'>
            Choose tier:{' '}
            <select
              id='tiers'
              name='tiers'
              value={chosenTier}
              onChange={(e) => {
                console.log(e.target.value);

                setChosenTier(e.target.value);
              }}
            >
              {customerTiers.map((ct, idx) => (
                <option
                  key={`customer-tier-${ct.name}-${idx}`}
                  value={ct.discount}
                >
                  {ct.name}
                </option>
              ))}
            </select>
          </label>
        </form>
        <p>
          total after discount of {(chosenTier || 0) * 100}% :{' '}
          {total * (1 - chosenTier || 0)}
        </p>
      </section>
    </div>
  );
}

export default App;
