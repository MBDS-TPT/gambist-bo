import { Input } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Match } from '../../model/Model';
import MatchCard from '../match-detail/MatchCard';
import { Loader } from '../svg-icons/Icons';

export interface EndMatchFormProps {
    className?: string;
    match: Match;
    onEditScore: any;
    onEndMatch: any;
    showLoader?: Boolean;
    showEndMatchLoader?: Boolean;
}

const EndMatchForm: React.FC<EndMatchFormProps> = ({
    className='',
    match,
    onEditScore,
    onEndMatch,
    showLoader=false,
    showEndMatchLoader=false
}) => {
    
    const [teamAScore, setTeamAScore] = useState<number>(match.scoreA ? match.scoreA : 0);
    const [teamBScore, setTeamBScore] = useState<number>(match.scoreB ? match.scoreB : 0);
    const [editBtnEnabled, setEditBtnEnabled] = useState<Boolean>(true);

    const onChangeScore = (event: any) => {
        if(event.target.id == "teamA") {
            setTeamAScore(parseInt(event.target.value));
        } else {
            setTeamBScore(parseInt(event.target.value));
        }
    }

    const onSubmit = (event: any) => {
        match.scoreA = teamAScore;
        match.scoreB = teamBScore;
        const params = {
            id: match.id,
            scoreA: teamAScore,
            scoreB: teamBScore
        }
        if(onEditScore) onEditScore(params);
    }

    const _onEndMatch = (event: any) => {
        if(onEndMatch) onEndMatch(match);
    }

    useEffect(() => {
        const date = new Date(match.matchDate);
        
        setEditBtnEnabled(date.getTime() > new Date().getTime());
    }, []);

    return (
        <Wrapper className={[className, 'end-match'].join(' ')}>
            <MatchCard match={match} />
            <form className="end-match-form">
                <div className="score">
                    <TextField
                        id="teamA"
                        label="Team A Score"
                        variant="outlined"
                        onChange={onChangeScore}
                        type="number"
                        className="score-input"
                        value={teamAScore}
                        />
                    <TextField
                        id="teamB"
                        label="Team B Score"
                        variant="outlined"
                        onChange={onChangeScore}
                        type="number"
                        className="score-input"
                        value={teamBScore}
                    />
                </div>
                <Button 
                    variant="contained" 
                    onClick={onSubmit} 
                    color="primary" 
                    className="edit-match-btn" 
                    disabled={Boolean(editBtnEnabled)}
                    startIcon={showLoader && <Loader width={35} color='var(--white)' bgColor={'transparent'}/>}>
                        Edit Score
                </Button>
                <Button 
                    variant="contained" 
                    onClick={_onEndMatch} 
                    color="primary" 
                    className="end-match-btn" 
                    disabled={Boolean(editBtnEnabled)}
                    startIcon={showEndMatchLoader && <Loader width={35} color='var(--white)' bgColor={'transparent'}/>}>
                        End Match
                </Button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .end-match-form {
        display: flex;
        flex-direction: column;
        width: 740px;
        margin: auto;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
    }
    .score {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .score-input {
        margin: 20px 30px;
        width: 200px;
        input {
            font-size: 40px;
            text-align: center;
        }
    }
    .end-match-btn, 
    .edit-match-btn {
        font-weight: 600;
        width: 200px;
        margin: 5px 0;
    }
    .end-match-btn {
        background-color: var(--yellow);
    }
`;

export default EndMatchForm;