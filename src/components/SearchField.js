import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { getData } from '../config/ReqConfig';
import {
  DEFAULT_QUEUE,
  DEFAULT_TIER,
  DEFAULT_DIVISION,
} from '../config/RiotConstant';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));



export default function SearchField() {
  // const classes = useStyles();
  const initialMatchList = () => JSON.parse(localStorage.getItem('matchList')) || [];
  const [matchList, setMatchList] = useState(initialMatchList);
  const [summonersList, setSummonersList] = useState(initialMatchList);
  const [ isLoading, setIsLoading ] = useState(true);

  // const handleChange = username => event => {
  //   setValues({ ...values, [username]: event.target.value });
  // };

  useEffect(() => {
    async function getMatchList() {
      // setIsLoading(true);
      try {
        if (_.isNil(matchList) || _.isNull(matchList) || _.isEmpty(matchList)) {
          console.log('akjeazkebh --*q-dqsd');
          const res = await getData(`/lol/league/v4/entries/${DEFAULT_QUEUE}/${DEFAULT_TIER}/${DEFAULT_DIVISION}`);
          const data = await res.data;
          localStorage.setItem('matchList', JSON.stringify(res.data));
          setMatchList(data);
        }
      } catch(error) {
        console.log('error --> ', error);

      } finally {
        setIsLoading(false);
      }
    }

    async function getSummonersList() {
      // setIsLoading(true);
      const arraySumm = [];
      try {
        matchList.map((match) => {
          const res = getData(`/lol/summoner/v4/summoners/${match.summonerId}`);
          const data = res.data;
          arraySumm.push(data);
        });
        localStorage.setItem('summonersList', JSON.stringify(arraySumm));
        setSummonersList(arraySumm);
      } catch(error) {
        console.log('error --> ', error);
        
      } finally {
        setIsLoading(false);
      }
    }

    getMatchList();
    getSummonersList();
  }, [isLoading]);

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  return (
    isLoading
    ? <div>Loading... </div>
    : <h1>Wesh</h1>
  );
}
