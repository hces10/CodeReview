import React, { useContext, useEffect, useState } from 'react';
import app from '../../utils/base';
import { AuthContext } from "../../utils/Auth";
import api from '../../utils/api';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [note, setNote] = useState('');
  const [data, setData] = useState([]);
  const [textareaFocus, setTextareaFocus] = useState('');
  const [updateNote, setUpdateNote] = useState('');

  // const refs = useRef([]);

  // useEffect(() => {
  //   refs.current = refs.current.slice(0, data.length);
  // }, [data]);

  // useEffect(() => {
  //   listData();
  // }, [])

  const listData = async () => {
    await api.get(`/notes?email=${currentUser.email}`).then(res => {
      console.log(res);
      setData(res.data)
    })
      .catch(err => console.log(err))
  }

  const save = async () => {
    await api.post('/notes', {
      note,
      email: currentUser.email
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
     await listData();
  }

  const update = async id => {
    await api.post('/notes/1', {
      id,
      note: updateNote,
      email: currentUser.email
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    await listData();
  }

  const erase = async id => {
    await api.delete(`/notes?email=${currentUser.email}&id=${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    await listData();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 5%', height: '80px' }}>
        <h1>Home</h1>
        <button variant="primary" onClick={() => app.auth().signOut()}>Sair</button>
      </div>
      <div style={{ justifyContent: 'space-between', width: '100%', padding: '0 5%', display: 'flex' }}>
        <div style={{ minWidth: '40%', marginRight: '20px' }}>
          <textarea
            as="textarea"
            placeholder="Nota"
            style={{ height: '100px' }}
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button style={{ margin: '25px 0' }} onClick={save}>Salvar</button>
        </div>
        <div style={{ marginLeft: '20px', width: '100%' }}>
          {data.map((item, index) => {
            return (
              <div key={index} style={{
                border: '1px solid #000', borderRadius: '10px', marginBottom: '20px', display: 'flex',
                flexDirection: 'row', padding: '15px', justifyContent: 'space-between', width: '100%'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                  <h5>{currentUser.email}</h5>
                  <textarea
                    id={item.idDoc}
                    name={item.idDoc}
                    onBlur={() => setTimeout(() => setTextareaFocus(''), 1000)}
                    type='text'
                    disabled={!(textareaFocus === item.idDoc)}
                    onChange={e => setUpdateNote(e.target.value)}
                    value={textareaFocus === item.idDoc ? updateNote : item.note}
                    style={{
                      minWidth: '300px', color: '#000', border: 'none', minHeight: '100px',
                      backgroundColor: '#fff', width: '100%', position: 'relative',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                  <button
                    variant={textareaFocus === item.idDoc ? 'primary' : 'success'}
                    onClick={() => {
                      if (textareaFocus === item.idDoc) {
                        console.log('run update');
                        update(item.idDoc);
                        console.log('idDoc', item.idDoc);
                        console.log('textareaFocus', textareaFocus);
                      } else {
                        setTextareaFocus(item.idDoc)
                        setUpdateNote(item.note)
                        console.log('idDoc', item.idDoc);
                        console.log('textareaFocus', textareaFocus);
                      }
                    }}
                  >
                    {textareaFocus === item.idDoc ? 'Salvar' : 'Editar'}
                </button>
                <button onClick={() => erase(item.idDoc)} variant='danger'>Deletar</button>
              </div>
              </div>
            )
          })}
        </div>

    </div>
    </div >
  );
}

export default Home;


