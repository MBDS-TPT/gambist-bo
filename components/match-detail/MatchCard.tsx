import React from 'react';
import styled from 'styled-components';
import { Match } from '../../model/Model';
import TeamCard from './TeamCard';
import VersusDivider from './VersusDivider';

export interface MatchCardProps {
    className?: string;
    match?: Match;
}

const MatchCard:React.FC<MatchCardProps> = ({
    className='',
    match,
}) => {

    const getMatchTime = () => {
        const date = new Date(match?.matchDate);
        const hours  = date.getHours() < 10 ? '0'+date.getHours() : date.getHours(); 
        const minutes  = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes(); 
        return `${hours}:${minutes}`;
    }

    const getMatchDay = () => {
        const date = new Date(match?.matchDate);
        const tmp = date.toDateString().split(' ');
        return `${tmp[0]} ${tmp[2]}`;
    }

    const getMonthAndYear = () => {
        const date = new Date(match?.matchDate);
        const tmp = date.toDateString().split(' ');
        return `${tmp[1]} ${tmp[3]}`;
    }

    return (
        <Wrapper className={["match-card", className].join(' ')} >
            <div className="match-time">
                {match?.category?.label} - 
                <time dateTime={ getMatchTime() }>{ getMatchTime() }</time> 
            </div>
            <div className="match-title">
                {match?.category?.label} TOURNAMENT
            </div>
            <div className="teams">
                <TeamCard imageLink={match?.teamA?.logo} teamName={match?.teamA?.name} />
                <VersusDivider matchDay={ getMatchDay() } matchMonthAndYear={ getMonthAndYear() } />
                <TeamCard imageLink={match?.teamB?.logo} teamName={match?.teamB?.name} />
            </div>
            {/* <div className="match-card-footer">
                <div className="pointer"></div>
            </div> */}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.match-card {
        display: flex;
        flex-direction: column;
        background-color: var(--white);
        /*border: 1px solid var(--border-gray);*/
        width: 740px;
        min-height: 400px;
        padding-top: 46px; 
        margin: auto;
    }
    .match-time,
    .match-title {
        text-align: center;
        font-weight: 600;
    }
    .match-time {
        color: var(--gray);
    }
    .match-title {
        font-size: 34px;
        text-transform: uppercase;
        margin-bottom: 15px;
    }
    .teams {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 20px;
    }
    .match-card-footer {
        background-color: var(--dark-gray);
        height: 60px;
        display: flex;
    }
    .pointer {
        margin: auto;
        display : inline-block;
        height : 0;
        width : 0;
        border-right : 8px solid transparent;
        border-bottom : 8px solid var(--dark-gray);
        border-left : 8px solid transparent;
        margin-top: -8px;
    }
`;

export default MatchCard;