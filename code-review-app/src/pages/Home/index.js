import React, { useContext, useEffect, useState } from 'react';
import app from '../../utils/base';
import { AuthContext } from "../../utils/Auth";
import api from '../../utils/api';
import axios from 'axios';
import styles from './styles.module.css';
import { IoMdSearch, IoMdSave } from 'react-icons/io';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [searchValue, setSearchValue] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [clicked, setClicked] = useState(0);
  const [savedQuestions, setSavedQuestion] = useState([]);


  const search = async () => {
    if (!searchValue) return;
    await axios.get(`https://api.stackexchange.com/2.2/search/advanced?pagesize=10&order=desc&sort=relevance&answers=1&title=${searchValue}&site=stackoverflow&filter=!6W.6dPFG_euye`)
      .then(async (response) => {
        const data = response.data.items.map(item => ({
          title: item.title,
          questionId: item.question_id,
          body: item.body,
          answers: item.answers.map(answer => ({ answerId: answer.answer_id, body: answer.body })),
          answersChat: [ item.body ].concat(item.answers.map(answer => answer.body ))
        }));
        setDataSearch(data);
      }, (error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    search();
    listData();
  }, [])


  const listData = async () => {
    await api.get(`/question?email=${currentUser.email}`).then(res => {
      setSavedQuestion(res.data.questionData);
    })
      .catch(err => console.log(err))
  }

  const save = async (questionId) => {
    const question = dataSearch.find(item => item.questionId === questionId);
    await api.post('/question', { ...question, userEmail: currentUser.email })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    await listData();
  }

  return (
    <div className={styles.container} style={{ height: window.innerHeight }}>
      <div className={styles.containerInside}>
        <div className={styles.side}>
          <div className={styles.header}>
            <div>
              <img src={currentUser.photoURL} alt='googleImg' />
            </div>
            <div><span onClick={() => app.auth().signOut()}>Sair</span></div>
          </div>
          <div className={styles.containerSearch}>
            <IoMdSearch onClick={() => search()} />
            <input
              placeholder="Search"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
            />
            <div className={styles.divisorInput} />
            <div style={{ height: `${(window.innerHeight - 120)}px` }} className={styles.questions}>
              {dataSearch.map((item,index) => (
                <div key={index} className={styles.containerQuestion}>
                  <div
                    className={styles.button}
                    style={{ backgroundColor: clicked === item.questionId ? '#474747' : 'transparent' }}
                    onClick={() => setClicked(item.questionId)}
                  >
                    <h4>{item.title}</h4>
                    <IoMdSave onClick={() => save(item.questionId)} />
                  </div>
                  <div className={styles.divisorHorizontal} />
                </div>
              ))}


              <div className={styles.divisorHorizontal} />
              {savedQuestions && savedQuestions.length ? 
                <>
                  <div className={styles.divisorHorizontal} />
                  <div className={styles.divisorHorizontal} />
                  <p>SAVED QUESTIONS</p>
                  <div className={styles.divisorInput} />
                  {savedQuestions.map((item,index) => (
                    <div key={index}>
                      <div
                        className={styles.button}
                        style={{ backgroundColor: clicked === item.questionId ? '#474747' : 'transparent' }}
                        onClick={() => setClicked(item.questionId)}
                      >
                        <h4>{item.title}</h4>
                      </div>
                      <div className={styles.divisorHorizontal} />
                    </div>
                  ))}
                </>
              : <></>
              }
            </div>
          </div>

        </div>
        <div className={styles.divisorVertical} />
        <div className={styles.content}>
          <div className={styles.header}>
            <nav className={styles.title}>
              <span>
                {dataSearch && dataSearch.length && dataSearch.find(item => item.questionId === clicked) ? dataSearch.find(item => item.questionId === clicked).title
                  : savedQuestions && savedQuestions.length && savedQuestions.find(item => item.questionId === clicked) ? savedQuestions.find(item => item.questionId === clicked).title
                  : 'Search a question'
                }
              </span>
            </nav>
          </div>
          <div className={styles.answers}>

            {dataSearch.find(item => item.questionId === clicked) && dataSearch && dataSearch.length ?
              dataSearch.find(item => item.questionId === clicked).answersChat.map((item,index) => (
                <div className={styles.balloon} key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))
            : savedQuestions.find(item => item.questionId === clicked) && savedQuestions && savedQuestions.length ?
              savedQuestions.find(item => item.questionId === clicked).answersChat.map((item,index) => (
                <div className={styles.balloon} key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))
            : <></>
            }         
            <div className={styles.absolute} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


