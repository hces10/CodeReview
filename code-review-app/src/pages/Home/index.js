import React, { useContext, useEffect, useState } from 'react';
import app from '../../utils/base';
import { AuthContext } from "../../utils/Auth";
import api from '../../utils/api';
import axios from 'axios';
import styles from './styles.module.css';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [note, setNote] = useState('');
  const [data, setData] = useState([]);

  const getQuestionsAnswers = async () => {
    await axios.get(`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&answers=1&title=404 node&site=stackoverflow&filter=!6W.6dPFG_euye`)
      .then(async (response) => {
        console.log('response.data.items', response.data.items);
        const data = response.data.items.map(item => ({
          title: item.title,
          questionId: item.question_id,
          body: item.body,
          answers: item.answers.map(answer => ({ answerId: answer.answer_id, body: answer.body }))
        }));
        setData(data)
        console.log('data', data);
      }, (error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getQuestionsAnswers();
  }, [])


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
      note: '',
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
    <div className={styles.container} style={{ height: window.innerHeight }}>
      <div className={styles.containerInside}>
        <div className={styles.side}>
          <div className={styles.header}>
            <div />
            <span>{currentUser.displayName}</span>
          </div>
          <div className={styles.containerSearch}>
            <input
              placeholder="Digite uma busca"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <div className={styles.divisorInput} />
            <div className={styles.questions}>


              <a>
                <h4>Erro 404 - Node JS Api Erro 404 - Node JS Api Erro 404 - Node JS Api Erro 404 - Node JS Api  </h4>
                <p></p>
              </a>
              <div className={styles.divisorHorizontal} />
              <a>
                <h4>Scroll em div caso seja necessário </h4>
                <p></p>
              </a>
              <div className={styles.divisorHorizontal} />
              <a>
                <h4>Erro 404 - Node JS Api Erro 404 - Node JS Api Erro 404 - Node JS Api Erro 404 - Node JS Api  Api Erro 404 - Node JS Api  Api Erro 404 - Node JS Api  </h4>
                <p></p>
              </a>

              <div className={styles.divisorHorizontal} />
              <div className={styles.divisorHorizontal} />
              <div className={styles.divisorHorizontal} />
              <p>SAVED QUESTIONS</p>
              <div className={styles.divisorInput} />

              <a>
                <h4>Scroll em div caso seja necessário </h4>
                <p></p>
              </a>
              <div className={styles.divisorHorizontal} />


            </div>
          </div>

        </div>
        <div className={styles.divisorVertical} />
        <div className={styles.content}>
          <div className={styles.header}>
            <div />
            <span>{currentUser.displayName}</span>
          </div>
          <div className={styles.answers}>
            
            <div className={styles.balloon}>
              <p>I am making a simple login page in react which should get connected to a database by an ajax call to a node js file.</p>

              <p>This is the node js code that I have:</p>

              <pre><code>var express=require('express');
                var app=express();
                var db=require('./db');
                var bodyParser=require('body-parser');
                var server=require('http').Server(app);
                app.set('port',process.env.PORT||8080);

                app.use(bodyParser.json());

                app.set('views','views');
                app.set('view engine','html');

                app.use(express.static('./public'));

                app.use(bodyParser.urlencoded(
                extended:true
                ))

                app.use(express.json());
                app.use(express.urlencoded());

                app.post('/newuser',function(req,res)
                console.log(req.body.username);
                console.log(req.body.password);
                )
              </code></pre>

              <p>And the ajax call from the react file looks something like this:</p>

              <pre><code>import React from 'react';
                import ReactDOM from 'react-dom';
                import $ from 'jquery';
                import MusicApp from './music-app.js';

              </code></pre>

              <p>So, when I run the whole code on port number 8080, it gives me a 404 for xhr request not found.
                The folder structure that I have is something like this:
              </p>

              <p>What am I missing?</p>
              "
            </div>

            <div className={styles.balloon}>
              <p>So, when I run the whole code on port number 8080, it gives me a 404 for xhr request not found.
                The folder structure that I have is something like this:
              </p>

              <p>What am I missing?</p>
            </div>

            <div className={styles.balloon}>
              <p>So, when I run the whole code on port number 8080, it gives me a 404 for xhr request not found.
                The folder structure that I have is something like this:
              </p>

              <p>What am I missing?</p>
            </div>

            <div className={styles.balloon}>
              <p>So, when I run the whole code on port number 8080, it gives me a 404 for xhr request not found.
                The folder structure that I have is something like this:
              </p>

              <p>What am I missing?</p>
            </div>
            <div className={styles.absolute}>
            </div>
          </div>
          {/* <button variant="primary" onClick={() => app.auth().signOut()}>Sair</button> */}
        </div>
      </div>
    </div>
  );
}

export default Home;


